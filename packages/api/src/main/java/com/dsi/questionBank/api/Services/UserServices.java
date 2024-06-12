package com.dsi.questionBank.api.Services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.dsi.questionBank.api.Domains.User;
import com.dsi.questionBank.api.reposotories.UserRepository;

@Service
public class UserServices {

    @Autowired
    UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findById(UUID uuid) {
        return userRepository.findById(uuid);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public byte[] getPicture(UUID userId) throws NotFoundException {
        User user = findById(userId).orElseThrow(NotFoundException::new);
        return user.getPicture();
    }

}
