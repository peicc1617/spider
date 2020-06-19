package xjtu.spider.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xjtu.spider.dao.MRORequestMapper;
import xjtu.spider.dao.MROSupplierMapper;
import xjtu.spider.dao.ScheduleSheetMapper;
import xjtu.spider.entity.*;
import xjtu.spider.util.GeneticAlgorithm;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-03-31 17:28:02
 **/
@Service
public class ScheduleService {
    @Autowired
    private MRORequestMapper requestMapper;
    @Autowired
    private MROSupplierMapper mroSupplierMapper;
    @Autowired
    private ScheduleSheetMapper scheduleSheetMapper;
    /***
     * @函数功能：保存MRO服务需求信息
     * @param :
     * @return：void
     */
    public String addRequest(MRORequest mroRequest){
        List<Long> taskIdList=requestMapper.getTaskIdByUserName(mroRequest.getUserName());
        if (!taskIdList.contains(mroRequest.getTaskId())) {
            requestMapper.add(mroRequest);
            return "MRO服务需求保存成功";
        } else {
            return "该MRO服务需求对应的MRO服务任务ID已存在，请查正后重试";
        }
    }
    public MRORequest getRequest(Long taskId,String userName){
        return requestMapper.getRequestByTaskIdAndUserName(taskId, userName);
    }
    /***
     * @函数功能：保存MRO服务提供商信息
     * @param mroSupplier:
     * @return：void
     */
    public String addSupplier(MROSupplier mroSupplier){
        List<Long> taskIdList=mroSupplierMapper.getTaskIdByUserName(mroSupplier.getUserName());
        if (!taskIdList.contains(mroSupplier.getTaskId())) {
            mroSupplierMapper.add(mroSupplier);
            return "MRO服务提供商保存成功";
        } else {
            return "该MRO服务提供商对应的MRO服务任务ID已存在，请查正后重试";
        }

    }
    public MROSupplier getSupplier(Long taskId,String userName){
        return mroSupplierMapper.getSupplierByTaskIdAndUserName(taskId, userName);
    }
    /***
     * @函数功能：保存排程表
     * @param scheduleSheet:
     * @return：void
     */
    public void addSheet(ScheduleSheet scheduleSheet){
        scheduleSheetMapper.addSheet(scheduleSheet);
    }
    /***
     * @函数功能：加载排程表
     * @param taskId:
     * @return：xjtu.spider.entity.ScheduleSheet
     */
    public ScheduleSheet getSheet(Long taskId,String userName){
        return scheduleSheetMapper.getDataByTaskId(taskId,userName);
    }
    public List<ScheduleResult> go(GAPara gaPara){
        JSONArray time=JSON.parseArray(gaPara.getTime());
        List<List<Integer[]>> job=new ArrayList<>();
        for (int i = 0; i <time.size() ; i++) {//MRO服务需求
            JSONArray subTime=(JSONArray)time.get(i);
            ArrayList<Integer[]> list=new ArrayList();
            for (int j = 0; j < subTime.size() ; j++) {//MRO服务子需求
                int a=(Integer) ((JSONObject) subTime.get(j)).get("supplier");
                int b=Integer.parseInt((String)((JSONObject) subTime.get(j)).get("time"));
                list.add(new Integer[]{a,b});
            }
            job.add(list);
        }
        int n=gaPara.getRequestNum();//MRO需求数
        int m=gaPara.getSupplierNum();//MRO服务提供商
        int populationNumber=gaPara.getPopulationNumber();
        double crossProbability=gaPara.getCrossProbability();
        double mutationProbabilit=gaPara.getMutationProbabilit();
        List<ScheduleResult> list=GeneticAlgorithm.go(job,n,m,populationNumber,crossProbability,mutationProbabilit);
        return list;
    }
}
