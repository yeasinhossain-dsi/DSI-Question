package com.dsi.questionBank.api.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserInfo {
    private String id;
    private String name;
    private String email;
    private String hd;
    private String picture;
}
