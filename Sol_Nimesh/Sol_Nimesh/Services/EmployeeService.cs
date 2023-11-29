using Microsoft.EntityFrameworkCore;
using Sol_Nimesh.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public class EmployeeService : IEmployeeService
{
    private readonly EmployeeContext _employeeContext;

    public EmployeeService(EmployeeContext employeeContext)
    {
        _employeeContext = employeeContext;
    }

    public async Task<IEnumerable<Employee>> GetEmployeesAsync()
    {
        return await _employeeContext.Employees.ToListAsync();
    }

    public async Task<Employee> GetEmployeeByIdAsync(int id)
    {
        return await _employeeContext.Employees.FindAsync(id) ?? throw new Exception("Employee not found");
    }

    public async Task<Employee> AddEmployeeAsync(Employee employee)
    {
        _employeeContext.Employees.Add(employee);
        await _employeeContext.SaveChangesAsync();
        return employee;
    }

    public async Task UpdateEmployeeAsync(int id, Employee employee)
    {
        if (id != employee.ID)
        {
            throw new ArgumentException("Employee ID mismatch");
        }

        _employeeContext.Entry(employee).State = EntityState.Modified;
        await _employeeContext.SaveChangesAsync();
    }

    public async Task DeleteEmployeeAsync(int id)
    {
        var employee = await _employeeContext.Employees.FindAsync(id);
        if (employee != null)
        {
            _employeeContext.Employees.Remove(employee);
            await _employeeContext.SaveChangesAsync();
        }
    }
}
