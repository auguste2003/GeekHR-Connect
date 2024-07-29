package fr.afrogeek.getthrconnet.service;

import fr.afrogeek.getthrconnet.entity.Employee;
import fr.afrogeek.getthrconnet.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

// Le service connait le repository
// le controlleur connait le service 
@Service
@RequiredArgsConstructor  // lombock génere un cnstructeur 
public class EmployeeService {

  //   @Autowired  Spring boot injecte les dependances seule
    private final EmployeeRepository employeeRepository ; // Pour la manipulation des données .

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee); // Renvoit et met á jour un employé 
    }
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }
    public Employee getEmployeeById(UUID id) { // Récuppérer un Employé  avec son id
        return employeeRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Employee with id " + id + " not found")  // Un lambda qui regette un  exception si l'employé n'existe pas .
        );
    }
    // On change les informations de l'employé
    public Employee updateEmployee(UUID id, Employee employeeDetails) {
        Employee employee = this.getEmployeeById(id);
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setPhone(employeeDetails.getPhone());
        employee.setGender(employeeDetails.getGender());
        employee.setDateOfBirth(employeeDetails.getDateOfBirth());
        employee.setCity(employeeDetails.getCity());
        employee.setCountry(employeeDetails.getCountry());
        employee.setRemainingVacationDays(employeeDetails.getRemainingVacationDays());
        employee.setOnVacation(employeeDetails.isOnVacation());
        employee.setPosition(employeeDetails.getPosition());
        return employeeRepository.save(employee);
    }
    // Retirer un employé
    public void deleteEmployee(UUID id) {
        employeeRepository.deleteById(id);
    }
}
