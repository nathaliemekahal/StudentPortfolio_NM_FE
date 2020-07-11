import React, { Component } from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import Projects from './Projects'

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
            e.preventDefault()
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
            <Container>
            <Row className='d-flex justify-content-center'>
                <Col className='col_container' md={6}>
               <h2 className='mb-2'>{this.state.student.name}</h2> 
                <img className='profile-imgClass'src={this.state.student.ImageUrl}/>
                <input className='upload-btnClass'type="file" onChange={this.saveImage} accept='image/png,image/jpeg'/>

                {this.state.student.projects&&this.state.student.projects.length===0&&<h1>NOT OK</h1>} 
                </Col>
              
               {this.state.student.projects&&this.state.student.projects.length>0&&
               <Projects student={this.state.student}/>} 
        
            
               
            </Row>
            </Container>
        )
    }
}

export default Details
