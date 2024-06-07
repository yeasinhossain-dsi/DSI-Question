package com.dsi.questionBank.api.reposotories;

import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dsi.questionBank.api.Domains.Question;
import com.dsi.questionBank.api.Domains.User;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {
    Set<Question> findAllByAuthor(User user);

    @Query("SELECT q FROM Question q WHERE q.approvers IS EMPTY")
    Set<Question> findUnapprovedQuestions();

    @Query("SELECT q FROM Question q WHERE q.approvers IS NOT EMPTY")
    Set<Question> findApprovedQuestions();

}
