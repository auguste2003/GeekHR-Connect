package fr.afrogeek.getthrconnet.service;


import fr.afrogeek.getthrconnet.dto.AuthenticationRequest;
import fr.afrogeek.getthrconnet.dto.AuthenticationResponce;
import fr.afrogeek.getthrconnet.entity.User;
import fr.afrogeek.getthrconnet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationsService {
    // Fair l'authentification d'un utilisateur
    private  final JwtService jwtService;
    private final AuthenticationsService authenticationsService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponce authenticate(AuthenticationRequest authenticationRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );
        User user = userRepository.findByEmail(authenticationRequest.getEmail()) ;
        String token = jwtService.generateToken(user);

        return new AuthenticationResponce(token);
    }
}
