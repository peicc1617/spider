package xjtu.spider.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-02-11 13:32:50
 **/
@Controller
public class TestController {
    @RequestMapping("/test")
    public void test(){
        System.out.println("测试出书");
    }
    @RequestMapping("/testStr")
    @ResponseBody
    public String test1(){
        System.out.println("返回字符串");
        return "12345";
    }
}
