import React, { Component } from 'react'

 class Details extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              student:[],
              photo:'',
              imgURL:''
         }
     }
     saveImage=async(e)=>{
         
        this.setState({photo:e.target.files[0]},async()=>{
            const data = new FormData()
            data.append("avatar", this.state.photo)
            let response =await fetch("http://127.0.0.1:3002/students/"+this.props.match.params.id+'/uploadPhoto/',{
                method:'POST',
                body:data
               
            }
           )
           if(response.ok){
            let response2 =await fetch("http://127.0.0.1:3002/students/"+this.props.match.params.id+'/getPhoto/'
           )
           
           this.setState({imgURL:response2.url})
           }
          
       
           
        })
        
       
     }
     
    componentDidMount=async()=>{
        let response= await fetch("http://127.0.0.1:3002/students/"+this.props.match.params.id,{
            headers: new Headers({'content-type': 'application/json'})
        })
        let othername=await response.json()
       
        this.setState({student:othername})
        
     }
    render() {
        return (
            <div>
                <input type="file" name='file' onChange={this.saveImage} accept='image/png,image/jpeg'/>
                <img src={this.state.imgURL}/>
              {this.state.student.name}
       
              
            </div>
        )
    }
}

export default Details
