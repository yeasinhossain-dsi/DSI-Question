package com.dsi.questionBank.api.Controllers;

import com.dsi.questionBank.api.DTO.AuthenticationResponse;
import com.dsi.questionBank.api.DTO.UserInfo;
import com.dsi.questionBank.api.Domains.User;
import com.dsi.questionBank.api.Services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("")
    public AuthenticationResponse authenticate(@RequestParam("accessToken") String accessToken) throws IOException {
        return authenticationService.authenticate(accessToken);
    }

}
