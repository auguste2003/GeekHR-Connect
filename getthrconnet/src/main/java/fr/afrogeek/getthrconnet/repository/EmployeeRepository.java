package fr.afrogeek.getthrconnet.repository;

import fr.afrogeek.getthrconnet.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository  // L'interface de repository
@RepositoryRestResource(exported = false) // Auccune des requettetes ne sera générée automatiquement
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

}
