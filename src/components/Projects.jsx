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
                {this.props.student.projects&&console.log(this.props.student.projects)}
            </div>
        )
    }
}

export default Projects
