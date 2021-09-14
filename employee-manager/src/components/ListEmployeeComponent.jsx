import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        };

        this.addEmployee = this.addEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees : res.data });
        })
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    updateEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployeeById(id).then((res) => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {
        return (
            <div style={{marginTop: "3%"}}>
                <h2 className="text-center">Employee List</h2>
                <div className = "row justify-content-center">
                    <div className="col-auto">
                        <table className="table table-boarded">
                            <thead className="table-light">
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee =>
                                        <tr key = {employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.emailID}</td>
                                            <td>
                                                <button onClick= {() => this.updateEmployee(employee.id)} className="btn btn-info">Update</button>
                                                <button onClick= {() => this.deleteEmployee(employee.id)} className="btn btn-info" style={{marginLeft: "10px"}}>Delete</button>
                                                <button onClick= {() => this.viewEmployee(employee.id)} className="btn btn-info" style={{marginLeft: "10px"}}>View</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>    
                        </table>

                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="button" onClick={this.addEmployee}>Add Employee</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;