import React, { Component } from 'react'
import {Button,Table, Container,Modal,Form} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import{Link} from 'react-router-dom'


class List extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             students:[],
             showModal:false,
             student:{},
             editmode:false
    
        }
    }
    
    
    componentDidMount=async()=>{
        let response= await fetch("http://127.0.0.1:3002/students",{
            headers: new Headers({'content-type': 'application/json'})
        })
        let students=await response.json()
        this.setState({students})
        
     }
     addStudent=async()=>{
        let response= await fetch("http://127.0.0.1:3002/students",{
            headers: new Headers({'content-type': 'application/json'})
        })
        let students=await response.json()
     }
     handleShow=()=>{
         this.setState({showModal:true})
     }
     handleClose=()=>{
        this.setState({showModal:false})
    }
    catchInput=(e)=>{
      let field=e.currentTarget.id
      let student=this.state.student
      student[field]=e.currentTarget.value
      this.setState({student})
      
    }
    saveNewStudent=async()=>{
      if(this.state.editmode===false){
        let response= await fetch("http://127.0.0.1:3002/students",{
          method:'POST',
          body: JSON.stringify(this.state.student),
          headers: new Headers({'content-type': 'application/json'})
      })
      if(response.ok){
        this.setState({showModal:false})
        let response= await fetch("http://127.0.0.1:3002/students",{
              headers: new Headers({'content-type': 'application/json'})
          })
          let students=await response.json()
          this.setState({students})
      }
      }
      if(this.state.editmode===true){
        let response= await fetch("http://127.0.0.1:3002/students/"+this.state.student._id,{
          method:'PUT',
          body: JSON.stringify(this.state.student),
          headers: new Headers({'content-type': 'application/json'})
      })
      if(response.ok){
        this.setState({showModal:false,editmode:false})
        let response= await fetch("http://127.0.0.1:3002/students",{
              headers: new Headers({'content-type': 'application/json'})
          })
          let students=await response.json()
          this.setState({students})
        
      }
      }
     
    }
    deleteStudent=async(id)=>{
      let response= await fetch("http://127.0.0.1:3002/students/"+id,{
        method:'DELETE',
        // body: JSON.stringify(this.state.student),
        headers: new Headers({'content-type': 'application/json'})
    }
   
    )
    if(response.ok){
    
      let response= await fetch("http://127.0.0.1:3002/students",{
            headers: new Headers({'content-type': 'application/json'})
        })
        let students=await response.json()
        this.setState({students})
        console.log('sfhnis')
    }
    let parsedJson=await response.json()
    console.log('PARSEDJSON',parsedJson)
    
    }
    editStudent=async(id)=>{
      this.setState({editmode:true,showModal:true})
      
      let response= await fetch("http://127.0.0.1:3002/students/"+id,{
        method:'Get',
        // body: JSON.stringify(this.state.student),
        headers: new Headers({'content-type': 'application/json'})
    })
    let parsedJson=await response.json()
    this.setState({student:parsedJson})
    }
    // showDetails=(id)=>{
    //   console.log("id",id)
    //   this.setState({SelectedID:id})
    //   this.props.history.push("/details/:id")
    // }

  
    render() {
       
        return (
            <Container>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {this.state.students.map((student)=>
              
                 <tr>
                <td> <Link to ={"/details/"+student._id}>{student._id}</Link></td>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{student.email}</td>
                <td>
                  <Button className="mr-2"variant="warning" onClick={()=>this.editStudent(student._id)}>Edit</Button>
                <Button variant="danger" onClick={()=>this.deleteStudent(student._id)}>Delete</Button></td>
              </tr>
              )}
            </tbody>
          </Table>
          <Button onClick={this.handleShow}>Add Student</Button>
          <Modal show={this.state.showModal}  onHide={this.handleClose}  >
            {this.state.editmode===false&&
            <>
             <Modal.Body>
             <Form.Group >
             <Form.Label>Name</Form.Label>
             <Form.Control type="text" placeholder="Enter name" id='name'onChange={this.catchInput} />
            
           </Form.Group>
           <Form.Group >
             <Form.Label>Surname</Form.Label>
             <Form.Control type="text" id='surname' placeholder="Enter Surname" onChange={this.catchInput}/>
            
           </Form.Group>
             <Form.Group>
             <Form.Label>Email address</Form.Label>
             <Form.Control type="email"id='email' placeholder="Enter email"onChange={this.catchInput} />
           
           </Form.Group>
   
        
           </Modal.Body>
           <Modal.Footer>
           <Button variant="primary" onClick={this.saveNewStudent}>Save changes</Button>
         </Modal.Footer>
         </>
         }
         {this.state.editmode===true&&
            <>
             <Modal.Body>
             <Form.Group >
             <Form.Label>Name</Form.Label>
             <Form.Control type="text"  value={this.state.student.name} id='name'onChange={this.catchInput} />
            
           </Form.Group>
           <Form.Group >
             <Form.Label>Surname</Form.Label>
             <Form.Control type="text" id='surname' value={this.state.student.surname} onChange={this.catchInput}/>
            
           </Form.Group>
             <Form.Group>
             <Form.Label>Email address</Form.Label>
             <Form.Control type="email"id='email' value={this.state.student.email}onChange={this.catchInput} />
           
           </Form.Group>
   
        
           </Modal.Body>
           <Modal.Footer>
           <Button variant="primary" onClick={this.saveNewStudent}>Save Edits</Button>
         </Modal.Footer>
         </>
         }
         
        </Modal>
            </Container>
        )
    }
}


export default withRouter(List)
