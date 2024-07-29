package fr.afrogeek.getthrconnet.service;

import fr.afrogeek.getthrconnet.entity.Employee;
import fr.afrogeek.getthrconnet.exception.GeekHRConnectException;
import fr.afrogeek.getthrconnet.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.stereotype.Repository;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class EmployeeServiceTest {
    // On interagiet pas avec la base de donnée

    @Mock // pour simuler des comportements
    private EmployeeRepository employeeRepository;

    @InjectMocks // recupérer les
    private EmployeeService employeeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void testCreateEmployeeWithNoId(){ // Comment cela ce passe ?
        Employee employee = new Employee();
        employee.setFirstName("John");
 when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

 Employee savedEmployee = employeeService.createEmployee(employee);
 assertNotNull(savedEmployee);
 verify(employeeRepository).save(employee);

    }

    @Test
    void testCreateEmployeeWithIdThrowsException() {
        Employee emp = new Employee();
        emp.setId(UUID.randomUUID());
        assertThrows(GeekHRConnectException.class, () -> employeeService.createEmployee(emp));
    }

    @Test
    void testGetEmployeeByIdFound() {
        UUID id = UUID.randomUUID();
        Employee emp = new Employee();
        when(employeeRepository.findById(id)).thenReturn(Optional.of(emp));
        Employee foundEmployee = employeeService.getEmployeeById(id);
        assertEquals(emp, foundEmployee);
    }

    @Test
    void testGetEmployeeByIdNotFound() {
        UUID id = UUID.randomUUID();
        when(employeeRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> employeeService.getEmployeeById(id));
    }

    @Test
    void testGetAllEmployees() {
        List<Employee> employees = Arrays.asList(new Employee(), new Employee());
        when(employeeRepository.findAll()).thenReturn(employees);
        List<Employee> allEmployees = employeeService.getAllEmployees();
        assertFalse(allEmployees.isEmpty());
        assertEquals(2, allEmployees.size());
    }

    @Test
    void testUpdateEmployee() {  // NotEquals
        UUID id = UUID.randomUUID();
        Employee existingEmployee = new Employee();
        existingEmployee.setId(id);

        Employee newDetails = new Employee();
        newDetails.setFirstName("Jane");
        newDetails.setId(id);

        when(employeeRepository.findById(id)).thenReturn(Optional.of(existingEmployee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(existingEmployee);

        Employee updatedEmployee = employeeService.updateEmployee(id, newDetails);
        assertEquals(newDetails.toString(), updatedEmployee.toString());
        verify(employeeRepository).save(existingEmployee);
    }

    @Test
    void testDeleteEmployee() {
        UUID id = UUID.randomUUID();
        Employee emp = new Employee();
        emp.setId(id);

        when(employeeRepository.findById(id)).thenReturn(Optional.of(emp));
        doNothing().when(employeeRepository).delete(emp);

        employeeService.deleteEmployee(id);
        verify(employeeRepository).delete(emp);
    }

}
