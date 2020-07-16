import React, { Component } from 'react'
import {Form} from 'react-bootstrap'

class Projects extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
               
                {this.props.project&&console.log('ad',this.props.projects)}
                {this.props.projects&&
                <div>
                  {this.props.projects.map(
                    project=><h5>{project.name}</h5>
                  )}
                </div>}

                <Form.Group >
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" id='repoUrl' 
                        placeholder='ENTER repoUrl' onChange={this.catchInput}/>
                        
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" id='emailaddress' 
                        placeholder='ENTER EMAIL ADDRESS' onChange={this.catchInput}/>
                        
                    </Form.Group>
            </div>
        )
    }
}

export default Projects
