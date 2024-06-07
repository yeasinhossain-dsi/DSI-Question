package com.dsi.questionBank.api.Services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsi.questionBank.api.Config.ErrorCode;
import com.dsi.questionBank.api.DTO.AuthenticationResponse;
import com.dsi.questionBank.api.DTO.UserInfo;
import com.dsi.questionBank.api.Domains.User;
import com.dsi.questionBank.api.Exceptions.UnauthorizedException;

@Service
public class AuthenticationService {

    @Autowired
    GoogleApi googleApi;

    @Autowired
    UserServices userServices;

    @Autowired
    JwtService jwtService;

    public UserInfo getUserInfo(String accessToken) {
        UserInfo userInfo = null;
        try {
            userInfo = googleApi.getUserInfo(accessToken);
        } catch (Exception ex) {
            throw new UnauthorizedException(ErrorCode.UN_AUTHENTICATED);
        }
        return userInfo;
    }

    public User upsert(UserInfo userInfo) {
        Optional<User> user = userServices.findByEmail(userInfo.getEmail());
        if (user.isPresent()) {
            return user.get();
        } else {
            User newUser = new User(userInfo.getName(), userInfo.getEmail(), userInfo.getPicture(),
                    userInfo.getId());
            return userServices.save(newUser);
        }
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("details", user);
        return jwtService.generateToken(claims, user);
    }

    public AuthenticationResponse authenticate(String accessToken) {
        UserInfo userInfo = getUserInfo(accessToken);
        User user = upsert(userInfo);
        String jwtToken = generateToken(user);
        return new AuthenticationResponse(jwtToken, user);
    }

}
