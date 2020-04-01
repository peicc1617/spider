package xjtu.spider.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xjtu.spider.entity.GAPara;
import xjtu.spider.entity.MRORequest;
import xjtu.spider.entity.MROSupplier;
import xjtu.spider.entity.ScheduleSheet;
import xjtu.spider.service.ScheduleService;

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
    public void  addRequest(MRORequest mroRequest){
        scheduleService.addRequest(mroRequest);
    }
    @RequestMapping("/schedule/getRequest")
    public MRORequest getRequest(Long taskId){
        return scheduleService.getRequest(taskId);
    }
    /***
     * @函数功能：添加MRO服务提供商
     * @param mroSupplier:
     * @return：void
     */
    @RequestMapping("/schedule/addSupplier")
    public void  addSupplier(MROSupplier mroSupplier){
        scheduleService.addSupplier(mroSupplier);
    }
    @RequestMapping("/schedule/getSupplier")
    public MROSupplier getSupplier(Long taskId){
        return scheduleService.getSupplier(taskId);
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
    public ScheduleSheet getSheet(Long taskId){
        return scheduleService.getSheet(taskId);
    }
    @RequestMapping("/schedule/run")
    public void run(GAPara gaPara){
        scheduleService.run(gaPara);
    }
}
