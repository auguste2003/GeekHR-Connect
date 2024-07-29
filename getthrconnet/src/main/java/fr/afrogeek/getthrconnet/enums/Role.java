package fr.afrogeek.getthrconnet.enums;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public enum Role {
    USER,
    ADMIN;


// Methode pour obtenir les autorisations pour chaque role

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> simpleGrantedAuthority = new ArrayList<SimpleGrantedAuthority>();
        simpleGrantedAuthority.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return simpleGrantedAuthority;
     }
    }