package com.dsi.questionBank.api.Services;

import java.io.IOException;
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

    @Autowired
    ImageService imageService;

    public UserInfo getUserInfo(String accessToken) {
        UserInfo userInfo = null;
        try {
            userInfo = googleApi.getUserInfo(accessToken);
        } catch (Exception ex) {
            throw new UnauthorizedException(ErrorCode.UN_AUTHENTICATED);
        }
        return userInfo;
    }

    public User upsert(UserInfo userInfo) throws IOException {
        User userModel;
        Optional<User> user = userServices.findByEmail(userInfo.getEmail());
        byte[] picture = imageService.fetchImageFromUrl(userInfo.getPicture());

        if (user.isPresent()) {
            userModel = user.get();
        } else {
            userModel = new User(userInfo.getName(), userInfo.getEmail(), userInfo.getId());
        }
        userModel.setPicture(picture);
        return userServices.save(userModel);
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("details", user.getId());
        return jwtService.generateToken(claims, user);
    }

    public AuthenticationResponse authenticate(String accessToken) throws IOException {
        UserInfo userInfo = getUserInfo(accessToken);
        User user = upsert(userInfo);
        String jwtToken = generateToken(user);
        return new AuthenticationResponse(jwtToken, user);
    }

}
