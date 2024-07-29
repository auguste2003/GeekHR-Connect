package fr.afrogeek.getthrconnet.entity;


import fr.afrogeek.getthrconnet.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Valeur définie alléatoirement
    private long id;

    // Le mail doit etre unique et pas vide .
    @Column(unique = true, nullable = false)
    private String email;

    @Column( nullable = false)
    private String password;

    @Column( nullable = false) // Il s'agit d'un ENUM
    @Enumerated(EnumType.STRING)
    private Role role;




    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }


    public String getUsername() {
        return email;
    }


    public boolean isAccountNonExpired() {
        return true; // Le compte n'est pas expiré
    }


    public boolean isAccountNonLocked() {
        return true; // Le compte n'est püas bloqué
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return true;  // Deactuvé le compte et l'user ne pourra plus se connecter .
    }


}
