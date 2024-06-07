package com.dsi.questionBank.api.Services;

import com.dsi.questionBank.api.DTO.UserInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class GoogleApi {

    public UserInfo getUserInfo(String accessToken) throws Exception{
        String url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
        StringBuilder result = new StringBuilder();
        HttpURLConnection connection = null;
        BufferedReader reader = null;

        URL urlObj = new URL(url);
        connection = (HttpURLConnection) urlObj.openConnection();
        connection.setRequestMethod("GET");

        reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String line;
        while ((line = reader.readLine()) != null) {
            result.append(line);
        }

        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(result.toString(), UserInfo.class);
    }

}
