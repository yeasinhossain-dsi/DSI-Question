package com.dsi.questionBank.api.DTO;

import com.dsi.questionBank.api.Domains.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticationResponse {

    String jwtToken;
    User userDetails;

}
