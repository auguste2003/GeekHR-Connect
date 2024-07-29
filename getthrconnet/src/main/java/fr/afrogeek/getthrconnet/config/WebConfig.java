package fr.afrogeek.getthrconnet.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // une classe de configuration
public class WebConfig implements WebMvcConfigurer { //Configurer le backend pour ppermetre sont utilisation au niveau du frontend
    @Override
    public void addCorsMappings(CorsRegistry registry) { // on utilise lcette méthode pour fixer l'adresse du backend
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // on accepter cette origin pour le frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE") // diférentes méthodes
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
