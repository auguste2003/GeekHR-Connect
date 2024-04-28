package fr.afrogeek.getthrconnet.exception;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice // Control du controller
@Slf4j // Fait des log
public class GlobalExceptionHandler {

    // Manager les exceptios sur la console

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeekHRConnectException(Exception e) {
        Map<String, Object> body = new LinkedHashMap<>();
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        body.put("timestamp", LocalDateTime.now());
        if (e instanceof EntityNotFoundException) {
            httpStatus = HttpStatus.NOT_FOUND;
            body.put("message", e.getMessage());
        }else if(e instanceof MethodArgumentNotValidException ex) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage()));

            httpStatus = HttpStatus.BAD_REQUEST;
            body.put("message", errors); // Méssage d'érreur du body
        }else{
            body.put("message", e.getMessage());
        }
        log.error(e.getMessage());
        return new ResponseEntity<>(body, httpStatus);
    }
}
