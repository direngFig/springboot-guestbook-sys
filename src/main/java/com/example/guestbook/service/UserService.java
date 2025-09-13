package com.example.guestbook.service;

import com.example.guestbook.dao.UserDao;
import com.example.guestbook.domain.Message;
import com.example.guestbook.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public User login(String name) {
        return userDao.login(name);
    }

    public List<Message> toMessageAll(){
        return userDao.toMessageAll();
    }

    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void regedit(String nickname, String name, String password) {
        userDao.regedit(nickname, name, password);
    }

    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void saveMessage(String nickname, String name, String message) {
        userDao.saveMessage(nickname, name, message);
    }
}
