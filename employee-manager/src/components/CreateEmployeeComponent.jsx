import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        };

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.addOrUpdateEmployee = this.addOrUpdateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return;
        }

        EmployeeService.getEmployeeById(this.state.id).then( (res) => {
            let employee = res.data;
            this.setState({ firstName: employee.firstName,
                            lastName: employee.lastName,    
                            emailId: employee.emailID })
        });
    }

    addOrUpdateEmployee(e) {
        e.preventDefault();

        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailID: this.state.emailId};

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then((res) => {
                this.cancel();
            });
        }
        else {
            EmployeeService.updateEmployeeById(employee, this.state.id).then(res => {
                this.cancel();
            });
        }
    }

    cancel() {
        this.props.history.push('/employees');
    }
    
    changeFirstNameHandler = (event) => {
        this.setState({firstName : event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName : event.target.value});
    }

    changeEmailIdHandler = (event) => {
        this.setState({emailId : event.target.value});
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h2 className="text-center" style={{marginTop: "3%"}}>Add Employee</h2>
        }
        else {
            return <h2 className="text-center" style={{marginTop: "3%"}}>Update Employee</h2>
        }
    }

    getButton() {
        if (this.state.id === '_add') {
            return <button className="btn btn-success" onClick={this.addOrUpdateEmployee} style={{marginTop: "5%"}}>Add</button>
        }
        else {
            return <button className="btn btn-success" onClick={this.addOrUpdateEmployee} style={{marginTop: "5%"}}>Update</button>
        }
    }

    render() {
        return (
            <div> 
                <div className="container" style={{marginTop: "3%"}}>
                    <div className="row vertical-center-row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            { this.getTitle() }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input placeholder="Email Address" name="emailId" className="form-control" 
                                            value={this.state.emailId} onChange={this.changeEmailIdHandler} />
                                    </div>
                                    
                                    { this.getButton() }
                                    <button className="btn btn-danger" onClick={this.cancel} style={{marginLeft: "1%", marginTop: "5%"}}>Cancel</button>
                                </form>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;