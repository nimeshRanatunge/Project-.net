using Microsoft.AspNetCore.Mvc;
using Sol_Nimesh.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        var employees = await _employeeService.GetEmployeesAsync();
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(int id)
    {
        var employee = await _employeeService.GetEmployeeByIdAsync(id);
        if (employee == null)
        {
            return NotFound();
        }
        return Ok(employee);
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
    {
        var addedEmployee = await _employeeService.AddEmployeeAsync(employee);
        return CreatedAtAction(nameof(GetEmployee), new { id = addedEmployee.ID }, addedEmployee);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> PutEmployee(int id, Employee employee)
    {
        try
        {
            await _employeeService.UpdateEmployeeAsync(id, employee);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEmployee(int id)
    {
        await _employeeService.DeleteEmployeeAsync(id);
        return Ok();
    }
}
