package fr.afrogeek.getthrconnet.filter;


import fr.afrogeek.getthrconnet.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthentificationFilter extends OncePerRequestFilter {
    private  final JwtService jwtService;
    private final UserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        if(isAuthEndpoint(request)){
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = extractJwtFromRequest(request);
        if(jwt == null){
            filterChain.doFilter(request, response);
            return;
        }

        String userEmail = jwtService.extractUsername(jwt);
        if(userEmail != null && isUserNotAuthenticated()){
            authenticateUser(request, jwt, userEmail); // On envoit l'adresse email de l'user pour l'authentifier
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Vérifie si l'utilisateur
     * @return
     */
    private boolean isUserNotAuthenticated() {
        return SecurityContextHolder.getContext().getAuthentication() == null;
    }

    /**
     * Methode pour extraire le jwt
     * @param request
     * @return
     */
    private String extractJwtFromRequest(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.substring(7);
    }

    private boolean isAuthEndpoint(HttpServletRequest request) {
        return request.getServletPath().contains("/auth");
    }

    /**
     * Fait l'authentification de l'utilisateur en vérifiant si le tocken est valide .
     * @param request
     * @param jwt
     * @param userEmail
     */
    private void authenticateUser(HttpServletRequest request, String jwt, String userEmail) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
        if (jwtService.isTokenValid(jwt, userDetails)) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

}
