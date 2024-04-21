package fr.afrogeek.getthrconnet.entity;

import fr.afrogeek.getthrconnet.enums.Position;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "employees")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// Ajouter une clé primaire
public class Employee {
    // Pour sécurité
    @Id
    @GeneratedValue  // Valeur générée automatiquement
    private UUID id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false,unique = true)
    private String phone;

    @Column(nullable = false)
    private String gender ;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private String city ;

    @Column(nullable = false)
    private String country ;

    @Column(nullable = false)
    private int remainingVacationDays ;

    @Column(nullable = false)
    private boolean isOnVocation ;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING) // Enrégistrer des valeurs
    private Position position ;
    // Utiliser Lombock pour les getter und Setter
}
