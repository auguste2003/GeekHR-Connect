package fr.afrogeek.getthrconnet.repository;

import fr.afrogeek.getthrconnet.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository  // L'interface de repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

}
