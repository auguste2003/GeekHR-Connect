package fr.afrogeek.getthrconnet.controller;

import fr.afrogeek.getthrconnet.entity.Employee;
import fr.afrogeek.getthrconnet.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
/**
Avec ceci , il y'aura toujours certaines requettes existantes chez swagger
 */
@RestController  // Qui va traiter des réquettes http
@RequestMapping("/employees") // Toutes réquettes seront dirigées ici
@RequiredArgsConstructor // lambock génere un constructeur
public class EmployeeController {
    private final EmployeeService employeeService;
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee); // Crée et retourne un employé
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees(); //
    }
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable UUID id) {
        return employeeService.getEmployeeById(id); // returner un employée
    }
    @PutMapping("/{ID}")
    public Employee updateEmployee(@PathVariable UUID ID, @RequestBody Employee employee) {
        return employeeService.updateEmployee(ID, employee); // On fait un update des employees
    }
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id); // Supprimer un employé
    }
}
