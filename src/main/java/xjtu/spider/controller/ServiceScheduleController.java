package xjtu.spider.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @基本功能:MRO运行调度
 * @program:spider
 * @author:peicc
 * @create:2020-03-30 15:31:22
 **/
@RestController
public class ServiceScheduleController {
    @RequestMapping("/schedule")
    public String serviceSchedule(){
        return "";
    }
}
