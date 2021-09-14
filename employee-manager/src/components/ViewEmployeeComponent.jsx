import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            id: this.props.match.params.id,
            employee: []
        };


        this.back = this.back.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            this.setState({ employee : res.data });
        })
    }

    back() {
        this.props.history.push("/employees");
    }

    render() {
        return (
            <div style={{marginTop: "3%"}}> 
                <div className="container">
                    <div className="row vertical-center-row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h2 className="text-center border-bottom">Employee Details</h2>
                            
                            <h4 className="text-center">First Name : {this.state.employee.firstName}</h4>
                            <h4 className="text-center">Last Name : {this.state.employee.lastName}</h4>
                            <h4 className="text-center">Email Address : {this.state.employee.emailID}</h4>

                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button" onClick={this.back} style={{marginBottom: "2%"}}>Back</button>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;