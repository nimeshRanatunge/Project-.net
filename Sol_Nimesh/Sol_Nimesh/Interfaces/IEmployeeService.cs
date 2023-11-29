using Sol_Nimesh.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IEmployeeService
{
    Task<IEnumerable<Employee>> GetEmployeesAsync();
    Task<Employee> GetEmployeeByIdAsync(int id);
    Task<Employee> AddEmployeeAsync(Employee employee);
    Task UpdateEmployeeAsync(int id, Employee employee);
    Task DeleteEmployeeAsync(int id);
}
