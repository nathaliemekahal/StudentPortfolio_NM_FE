import React, { Component } from 'react'
import {Button,Table, Container,Modal,Form,Row} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import{Link} from 'react-router-dom'


class List extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             students:[],
             showModal:false,
             student:{},
             editmode:false,
             pagesize:2,
             page:0
    
        }
    }
    
    
    componentDidMount=async()=>{
        let response= await fetch(`http://127.0.0.1:3456/students?limit=${this.state.pagesize}&offset=${this.state.page*this.state.pagesize}`,{
            headers: new Headers({'content-type': 'application/json'})
        })
        let students=await response.json()
        this.setState({students})
        
     }
     addStudent=async()=>{
        let response= await fetch("http://127.0.0.1:3456/students",{
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
      this.setState({student},()=>{
        console.log(this.state.student)
      })
      
    }
    saveNewStudent=async()=>{
     
      if(this.state.editmode===false){
        let response= await fetch("http://127.0.0.1:3456/students/",{
          method:'POST',
          body: JSON.stringify(this.state.student),
          headers: new Headers({'content-type': 'application/json'})
      })
      if(response.ok){
        this.setState({showModal:false})
        let response= await fetch(`http://127.0.0.1:3456/students?limit=${this.state.pagesize}&offset=${this.state.page*this.state.pagesize}`,{
          headers: new Headers({'content-type': 'application/json'})
      })
      let students=await response.json()
      this.setState({students})
      }
      }
      if(this.state.editmode===true){
        let response= await fetch("http://127.0.0.1:3456/students/"+this.state.student._id,{
          method:'PUT',
          body: JSON.stringify(this.state.student),
          headers: new Headers({'content-type': 'application/json'})
      })
      if(response.ok){
        this.setState({showModal:false,editmode:false})
        let response= await fetch("http://127.0.0.1:3456/students",{
              headers: new Headers({'content-type': 'application/json'})
          })
          let students=await response.json()
          this.setState({students})
        
      }
      }
     
    }
    setPage=async(page)=>{
      this.setState({page:page},async()=>{
        await this.paginate()
      })
    }
    paginate=async()=>{
      let response= await fetch(`http://127.0.0.1:3456/students?limit=${this.state.pagesize}&offset=${this.state.page*this.state.pagesize}`,{
        headers: new Headers({'content-type': 'application/json'})
    })
    let students=await response.json()
    this.setState({students})
    }
    deleteStudent=async(id)=>{
      let response= await fetch("http://127.0.0.1:3456/students/"+id,{
        method:'DELETE',
        // body: JSON.stringify(this.state.student),
        headers: new Headers({'content-type': 'application/json'})
    }
   
    )
    if(response.ok){
    
      let response= await fetch(`http://127.0.0.1:3456/students?limit=${this.state.pagesize}&offset=${this.state.page*this.state.pagesize}`,{
        headers: new Headers({'content-type': 'application/json'})
    })
    let students=await response.json()
    this.setState({students})
    }
    let parsedJson=await response.json()
    console.log('PARSEDJSON',parsedJson)
    
    }
    editStudent=async(id)=>{
      this.setState({editmode:true,showModal:true})
      
      let response= await fetch("http://127.0.0.1:3456/students/"+id,{
        method:'Get',
        // body: JSON.stringify(this.state.student),
        headers: new Headers({'content-type': 'application/json'})
    })
    let parsedJson=await response.json()
    this.setState({student:parsedJson[0]})
    }
    // showDetails=(id)=>{
    //   console.log("id",id)
    //   this.setState({SelectedID:id})
    //   this.props.history.push("/details/:id")
    // }

  
    render() {
       
        return (
            <Container>
              <Row className='pagination-btns justify-content-center my-3'>
              <Button className='mr-3' onClick={()=>this.setPage(this.state.page+1)}>+</Button>
              {this.state.page>0&&<Button onClick={()=>this.setPage(this.state.page-1)}>-</Button>}
              </Row>
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
             <Form.Label>ID</Form.Label>
             <Form.Control type="text" placeholder="Enter ID" id='_id'onChange={this.catchInput} />
            
           </Form.Group>
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
           <Form.Group>
             <Form.Label>DOB</Form.Label>
             <Form.Control type="date" id='dob' placeholder="Enter Date"onChange={this.catchInput} />
           
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
             <Form.Label>ID</Form.Label>
             <Form.Control type="text"  value={this.state.student._id}  id='_id' onChange={this.catchInput} />
            
           </Form.Group>
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
           <Form.Group>
             <Form.Label>DOB</Form.Label>
             {this.state.student.dob&& <Form.Control type="date" id='dob'
              value={this.state.student.dob.slice(0,-14)}onChange={this.catchInput} />}

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
