package com.dsi.questionBank.api.DTO;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "question is required")
    private String content;

}
