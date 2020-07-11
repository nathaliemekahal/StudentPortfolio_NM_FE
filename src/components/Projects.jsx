import React, { Component } from 'react'

class Projects extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                {this.props.student.projects&&
                <div>
                  {this.props.student.projects.map(
                    project=><h5>{project.name}</h5>
                  )}
                </div>}
            </div>
        )
    }
}

export default Projects
