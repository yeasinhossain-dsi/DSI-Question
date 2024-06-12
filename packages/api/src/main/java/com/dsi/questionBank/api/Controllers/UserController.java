package com.dsi.questionBank.api.Controllers;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dsi.questionBank.api.DTO.AuthenticationResponse;
import com.dsi.questionBank.api.Domains.User;
import com.dsi.questionBank.api.Services.AuthenticationService;
import com.dsi.questionBank.api.Services.JwtService;
import com.dsi.questionBank.api.Services.UserServices;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserServices userServices;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public UserController(UserServices userServices, JwtService jwtService,
            AuthenticationService authenticationService) {
        this.userServices = userServices;
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/info")
    public AuthenticationResponse getUserDetails(@RequestHeader(value = "Authorization") String authorizationHeader) {
        final String jwt = authorizationHeader.substring(7);
        String email = jwtService.extractEmail(jwt);

        Optional<User> user = userServices.findByEmail(email);
        String jwtToken = authenticationService.generateToken(user.get());

        return new AuthenticationResponse(jwtToken, user.get());
    }

    @GetMapping("/picture/{userId}")
    public ResponseEntity<byte[]> getPicture(@PathVariable UUID userId) throws NotFoundException {
        byte[] image = userServices.getPicture(userId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"user-profile\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

}
