package com.example.guestbook.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message implements Serializable {

    private String nickname;
    private String users;
    private String message;
    private Date update_date;

}
