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
    public void addRequest(MRORequest mroRequest){
        requestMapper.add(mroRequest);
    }
    public MRORequest getRequest(Long taskId){
        return requestMapper.getRequest(taskId);
    }
    /***
     * @函数功能：保存MRO服务提供商信息
     * @param mroSupplier:
     * @return：void
     */
    public void addSupplier(MROSupplier mroSupplier){
        mroSupplierMapper.add(mroSupplier);
    }
    public MROSupplier getSupplier(Long taskId){
        return mroSupplierMapper.getSupplier(taskId);
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
    public ScheduleSheet getSheet(Long taskId){
        return scheduleSheetMapper.getDataByTaskId(taskId);
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
