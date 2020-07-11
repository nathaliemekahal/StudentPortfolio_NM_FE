import React, { Component } from 'react'
import {Row,Col,Container,Spinner} from 'react-bootstrap'
import Projects from './Projects'

 class Details extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              student:[],
              photo:'',
              isLoading:true
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
          
            this.setState({student:othername,isLoading:false})
           }
          
       
           
        })
        
       
     }
     
    componentDidMount=async()=>{
        let response= await fetch("http://127.0.0.1:3002/students/"+this.props.match.params.id,{
            headers: new Headers({'content-type': 'application/json'})
        })
        let othername=await response.json()
      
        this.setState({student:othername,isLoading:false})
        
     }
    render() {
        return (
            <Container>
            <Row className='d-flex justify-content-center'>
                <Col className='col_container' md={6}>
               <h2 className='mb-2'>{this.state.student.name}</h2> 
               {this.state.isLoading===true
               &&<Spinner animation="border" role="status">
               <span className="sr-only">Loading...</span>
             </Spinner>}
                {this.state.isLoading===false&&<img className='profile-imgClass'src={this.state.student.ImageUrl}/>}
                <input className='upload-btnClass'type="file" onChange={this.saveImage} accept='image/png,image/jpeg'/>

                {this.state.student.projects&&this.state.student.projects.length===0&&
                   <h3>NO PROJECTS</h3> 
                } 
                {this.state.student.projects&&this.state.student.projects.length>0&&
               <Projects student={this.state.student}/>} 
                </Col>
              
              
        
            
               
            </Row>
            </Container>
        )
    }
}

export default Details
