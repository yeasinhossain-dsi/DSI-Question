package com.dsi.questionBank.api.Controllers;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
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

}
