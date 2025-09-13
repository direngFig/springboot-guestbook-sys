package com.example.guestbook.domain.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RMessage implements Serializable {
    private String nickname;
    private String users;
    private String message;
    private String update_date;
}
