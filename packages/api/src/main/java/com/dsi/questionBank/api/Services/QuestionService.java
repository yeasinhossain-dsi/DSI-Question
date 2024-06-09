package com.dsi.questionBank.api.Services;

import java.util.Set;
import java.util.UUID;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dsi.questionBank.api.Config.ErrorCode;
import com.dsi.questionBank.api.DTO.QuestionRequest;
import com.dsi.questionBank.api.Domains.Question;
import com.dsi.questionBank.api.Domains.User;
import com.dsi.questionBank.api.Exceptions.CustomException;
import com.dsi.questionBank.api.reposotories.QuestionRepository;

@Service
public class QuestionService {

    public enum QuestionType {
        latest, approved
    }

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;

    }

    public Question save(Question question) {
        return questionRepository.save(question);
    }

    public Question save(QuestionRequest questionFormData, User author) {
        Question question = new Question();
        if (null != questionFormData.getId())
            question = questionRepository.findById(questionFormData.getId()).orElse(new Question());
        question.setTitle(questionFormData.getTitle());
        question.setContent(questionFormData.getContent());
        question.setAuthor(author);
        return questionRepository.save(question);
    }

    public Set<Question> findAllByAuthor(User user) {
        return questionRepository.findAllByAuthor(user);
    }

    public Set<Question> findAllByApproveStatus(QuestionType questionType) {
        if (questionType.equals(QuestionType.approved))
            return questionRepository.findApprovedQuestions();
        return questionRepository.findUnapprovedQuestions();
    }

    @Transactional
    public Question approve(UUID questionId, User approver) throws NotFoundException, CustomException {
        Question question = questionRepository.findById(questionId).orElseThrow(NotFoundException::new);

        if (question.getAuthor().getId().equals(approver.getId()))
            throw new CustomException(ErrorCode.CANNOT_APPROVE_OWN_QUESTION);
        if (question.getApprovers().contains(approver))
            throw new CustomException(ErrorCode.CANNOT_APPROVE_APPROVED_QUESTION);

        question.addApprover(approver);
        return save(question);
    }

    public void remove(UUID questionId, User remover) {
        questionRepository.deleteById(questionId);
    }

}
