package com.example.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exception.ResourceNotFoundException;
import com.example.model.Employee;
import com.example.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController 
{
	@Autowired
	private EmployeeRepository employeeRepository;
	
	/*
	 * Get all employees 
	 */
	@GetMapping("/employees")
	public List<Employee> getAllEmployee()
	{
		return employeeRepository.findAll();
	}
	
	/*
	 * Create employee
	 */
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	/*
	 * Get employee by id
	 */
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist. ID : " + id));
		
		return ResponseEntity.ok(employee);
	}
	
	/*
	 * Update employee by id
	 */
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployeeById(@PathVariable Long id, @RequestBody Employee employeeDetails) {
		Employee employee = getEmployeeById(id).getBody();
		
		employee.setEmailID(employeeDetails.getEmailID());
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		
		Employee updatedEmployee = createEmployee(employee);
		
		return ResponseEntity.ok(updatedEmployee);
	}
	
	/*
	 * delete employee by id
	 */
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<HashMap<String, Boolean>> deleteEmployeeById(@PathVariable Long id) {
		employeeRepository.deleteById(id);
		
		HashMap<String, Boolean> response = new HashMap<String, Boolean>();
		response.put("Deleted", Boolean.TRUE);
		
		return ResponseEntity.ok(response);
	}
}
