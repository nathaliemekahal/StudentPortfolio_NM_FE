import React, { Component } from 'react'

 class Details extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              student:[],
              photo:''
         }
     }
     saveImage=async(e)=>{
        e.preventDefault()
        this.setState({photo:e.target.files[0]},async()=>{
            const data = new FormData()
            data.append("avatar", this.state.photo)
            let response =await fetch("http://127.0.0.1:3002/students/"+this.props.match.params.id+'/uploadPhoto/',{
                method:'POST',
                body:data
              
                
               
            }
           )
           if(response.ok){
            let response= await fetch("http://127.0.0.1:3002/students/"+this.props.match.params.id,{
                headers: new Headers({'content-type': 'application/json'})
            })
            let othername=await response.json()
          
            this.setState({student:othername})
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
               <img src={this.state.student.ImageUrl}/>
              {this.state.student.name}
       
              
            </div>
        )
    }
}

export default Details
