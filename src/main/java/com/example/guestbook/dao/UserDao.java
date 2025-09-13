package com.example.guestbook.dao;

import com.example.guestbook.domain.Message;
import com.example.guestbook.domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserDao {

    User login(String name);

    List<Message> toMessageAll();

    void regedit(String nickname, String name, String password);
    void saveMessage(String nickname, String name, String message);
}
