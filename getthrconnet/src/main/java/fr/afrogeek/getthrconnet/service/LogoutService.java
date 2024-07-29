package fr.afrogeek.getthrconnet.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    // on a besoin de netoyer le context
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");  // Vérifier si l'lutilisateur était connecté
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return;
        }
        SecurityContextHolder.clearContext(); // On deconnecte l'utilisateur directement .
    }


}
