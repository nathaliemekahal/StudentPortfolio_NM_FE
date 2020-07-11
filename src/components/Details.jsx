import React, { Component } from 'react'
import {Row,Col,Container,Spinner,Button,Modal,Form} from 'react-bootstrap'
import Projects from './Projects'

 class Details extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              student:[],
              photo:'',
              isLoading:true,
              showModal:false,
              project:{}
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
    catchInput=(e)=>{
        let field=e.currentTarget.id
        let project=this.state.project
        project[field]=e.currentTarget.value
        this.setState({project})

     }

     saveNewProject=async()=>{
        this.setState({showModal:true})
        let response= await fetch('http://localhost:3002/students/projects/'+this.props.match.params.id,{
            method:"POST",
            body:JSON.stringify(this.state.project),
            headers:new Headers({"Content-Type":"application/json"})
        })
        if(response.ok){
            this.setState({showModal:false})
            let response= await fetch("http://127.0.0.1:3002/students/"+this.props.match.params.id,{
                headers: new Headers({'content-type': 'application/json'})
            })
            let othername=await response.json()
          
            this.setState({student:othername,isLoading:false})
            
        }
     }
     
    componentDidMount=async()=>{
        let response= await fetch("http://127.0.0.1:3002/students/"+this.props.match.params.id,{
            headers: new Headers({'content-type': 'application/json'})
        })
        let othername=await response.json()
      
        this.setState({student:othername,isLoading:false})
        
     }
     handleShow=()=>{
        this.setState({showModal:true})
     }
     handleClose=()=>{
         this.setState({showModal:false})
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
               <Button onClick={this.handleShow}>Add Project</Button> 
               <Modal show={this.state.showModal}  onHide={this.handleClose} >
               <Modal.Body>
                <Form.Group >
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text"  placeholder='ENTER PROJECT NAME' id='name'onChange={this.catchInput} />
                
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control type="text" id='description' 
                        placeholder='ENTER DESCRIPTION' onChange={this.catchInput}/>
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date"id='start'onChange={this.catchInput} />
                    
                    </Form.Group>

                 
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date"id='end'onChange={this.catchInput} />
                    
                    </Form.Group>
            
        
                </Modal.Body>    
                <Modal.Footer>
                <Button variant="primary" onClick={this.saveNewProject}>Save Project</Button>
         </Modal.Footer>
         </Modal>
        </Col>
              
              
        
            
               
            </Row>
            </Container>
        )
    }
}

export default Details
