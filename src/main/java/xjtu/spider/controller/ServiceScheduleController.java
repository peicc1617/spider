package xjtu.spider.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xjtu.spider.entity.*;
import xjtu.spider.service.ScheduleService;

import java.util.List;

/**
 * @基本功能:MRO运行调度
 * @program:spider
 * @author:peicc
 * @create:2020-03-30 15:31:22
 **/
@RestController
public class ServiceScheduleController {
    @Autowired
    ScheduleService scheduleService;
    /***
     * @函数功能：添加MRO服务需求
     * @param mroRequest:
     * @return：void
     */
    @RequestMapping("/schedule/addRequest")
    public String  addRequest(MRORequest mroRequest){
        return scheduleService.addRequest(mroRequest);
    }
    @RequestMapping("/schedule/getRequest")
    public MRORequest getRequest(Long taskId,String userName){
        return scheduleService.getRequest(taskId,userName);
    }
    /***
     * @函数功能：添加MRO服务提供商
     * @param mroSupplier:
     * @return：void
     */
    @RequestMapping("/schedule/addSupplier")
    public String addSupplier(MROSupplier mroSupplier){
        return scheduleService.addSupplier(mroSupplier);
    }
    @RequestMapping("/schedule/getSupplier")
    public MROSupplier getSupplier(Long taskId,String userName){
        return scheduleService.getSupplier(taskId, userName);
    }
    /***
     * @函数功能：
     * @param scheduleSheet:
     * @return：void
     */
    @RequestMapping("/schedule/addSheet")
    public void addSheet(ScheduleSheet scheduleSheet){
        scheduleService.addSheet(scheduleSheet);
    }
    /***
     * @函数功能：
     * @param taskId:
     * @return：xjtu.spider.entity.ScheduleSheet
     */
    @RequestMapping("/schedule/getSheet")
    public ScheduleSheet getSheet(Long taskId,String userName){
        return scheduleService.getSheet(taskId,userName);
    }
    @RequestMapping("/schedule/go")
    public List<ScheduleResult> go(GAPara gaPara){
        return scheduleService.go(gaPara);
    }
}
