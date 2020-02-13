package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

/**
 * @基本功能:注销
 * @program:spider
 * @author:peicc
 * @create:2020-02-09 00:34:35
 **/
@Controller
public class LoginOutController {
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    @RequestMapping("/logOut")
    @ResponseBody
    public String logOut(HttpSession session){
        LOGGER.info("客户端退出登录");
        //销毁客户端session信息
        session.invalidate();
        return "退出登录";
    }
}
