package com.dsi.questionBank.api.Controllers;

import java.util.Set;
import java.util.UUID;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsi.questionBank.api.Config.ErrorCode;
import com.dsi.questionBank.api.DTO.QuestionRequest;
import com.dsi.questionBank.api.Domains.Question;
import com.dsi.questionBank.api.Domains.User;
import com.dsi.questionBank.api.Exceptions.ValidationException;
import com.dsi.questionBank.api.Services.JwtService;
import com.dsi.questionBank.api.Services.QuestionService;
import com.dsi.questionBank.api.Services.QuestionService.QuestionType;

import jakarta.validation.Valid;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/question")
public class QuestionController {

    private final QuestionService questionService;
    private final JwtService jwtService;

    public QuestionController(QuestionService questionService, JwtService jwtService) {
        this.questionService = questionService;
        this.jwtService = jwtService;
    }

    @GetMapping("")
    public Set<Question> getQuestions(@RequestParam(required = false) QuestionType questionType)
            throws UsernameNotFoundException {

        if (null == questionType) {
            User user = jwtService.getUserFromJWT();
            if (null == user)
                throw new UsernameNotFoundException(ErrorCode.USER_NOT_FOUND);

            return questionService.findAllByAuthor(user);
        }
        return questionService.findAllByApproveStatus(questionType);

    }

    @PostMapping("")
    public ResponseEntity<Question> saveQuestion(@Valid @RequestBody QuestionRequest question,
            BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new ValidationException(bindingResult.getAllErrors().toString());

        User user = jwtService.getUserFromJWT();
        if (null == user)
            throw new UsernameNotFoundException(ErrorCode.USER_NOT_FOUND);

        Question savedQuestion = questionService.save(question, user);
        return ResponseEntity.ok(savedQuestion);
    }

    @GetMapping("/approve/{questionId}")
    public Question approveQuestion(@PathVariable UUID questionId) throws NotFoundException {
        User approver = jwtService.getUserFromJWT();
        return questionService.approve(questionId, approver);
    }

    @GetMapping("/remove/{questionId}")
    public void remove(@PathVariable UUID questionId) {
        User remover = jwtService.getUserFromJWT();
        questionService.remove(questionId, remover);
    }

}
