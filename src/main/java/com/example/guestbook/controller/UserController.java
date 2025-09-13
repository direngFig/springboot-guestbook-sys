package com.example.guestbook.controller;

import com.example.guestbook.domain.Message;
import com.example.guestbook.domain.User;
import com.example.guestbook.domain.VO.RMessage;
import com.example.guestbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/index.do")
    public ModelAndView main(HttpSession session) {
        User user = (User) session.getAttribute("user");
        System.out.println("session取值：" + user);
//        List<Message> messageAll = userService.toMessageAll();
        ModelAndView mv = new ModelAndView();
//        mv.addObject("messageAll",messageAll);
        mv.addObject("user", user.getNickname());
        mv.setViewName("index.html");
        return mv;
    }

    @RequestMapping("/login")
    @ResponseBody
    public Map login(@RequestBody Map map, HttpSession session) {
        String name = (String) map.get("name");
        String password = (String) map.get("password");
        //调用业务层
        User user = userService.login(name);
        List<Message> messageAll = userService.toMessageAll();
        Map<String, Object> jsonmap = new HashMap<>();
        if (user != null) {
            if (name.equals(user.getUser_account()) && password.equals(user.getPassword())) {
                jsonmap.put("result", user);
                jsonmap.put("messageAll", messageAll);
                session.setAttribute("user", user);
            } else {
                jsonmap.put("result", "用户名或密码错误");
            }
        }
        return jsonmap;
    }

    @RequestMapping("/regedit")
    @ResponseBody
    public String regedit(@RequestBody Map map) {
        String nickname = (String) map.get("nickname");
        String name = (String) map.get("name");
        String password = (String) map.get("password");
        //调用业务层
        userService.regedit(nickname, name, password);
        return "注册成功！！！";
    }

    @RequestMapping("/message")
    @ResponseBody
    public String saveMessage(@RequestBody Map map, HttpSession session) {
        String nickname = (String) map.get("nickname");
        String message = (String) map.get("message");
        User user = (User) session.getAttribute("user");
        String users = user.getUser_account();
        //调用业务层
        userService.saveMessage(nickname, users, message);
        return "发布成功";
    }

    @RequestMapping("/msgall")
    @ResponseBody
    public List<RMessage> toMessageAll() {
        List<Message> messageAll = userService.toMessageAll();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        List<RMessage> rMessageList = new ArrayList<>();
        for (Message message : messageAll) {
            String update_time = sdf.format(message.getUpdate_date());
            RMessage rMessage = new RMessage(
                    message.getNickname(),
                    message.getUsers(),
                    message.getMessage(),
                    update_time
            );
            rMessageList.add(rMessage);
        }
        rMessageList.forEach(System.out::println);
        return rMessageList;
    }

}
