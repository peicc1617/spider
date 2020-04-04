package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xjtu.spider.dao.EvaluateIndexMapper;
import xjtu.spider.dao.IndexOfTaskMapper;
import xjtu.spider.entity.EvaluateIndex;
import xjtu.spider.entity.IndexsOfTask;

import java.util.ArrayList;
import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-04 16:34:37
 **/
@RestController
public class ServiceEvaluateController {
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    @Autowired
    private EvaluateIndexMapper evaluateIndexMapper;
    @Autowired
    private IndexOfTaskMapper indexOfTaskMapper;
    /***
     * @函数功能：添加指标
     * @param evaluateIndex:
     * @return：void
     */
    @RequestMapping("/evaluate/addIndex")
    public void addIndex(EvaluateIndex evaluateIndex){
        LOGGER.info("添加指标："+evaluateIndex);
        evaluateIndexMapper.addIndex(evaluateIndex);
    }
    @RequestMapping("/evaluate/getMaxIndexIdForIdentify")
    public int getIndexNum(){
        return evaluateIndexMapper.getMaxIndexIdForIdentify();
    }
    /***
     * @函数功能：加载当前指标
     * @param :
     * @return：java.util.List<xjtu.spider.entity.EvaluateIndex>
     */
    @RequestMapping("/evaluate/getAllIndexs")
    public List<EvaluateIndex> getAllIndexs(){
        List<EvaluateIndex> evaluateIndexList=evaluateIndexMapper.getAllIndexs();
        LOGGER.info("获取所有指标："+evaluateIndexList);
        return evaluateIndexList;
    }
    /***
     * @函数功能：删除指标
     * @param indexIdForIdentify:
     * @return：void
     */
    @RequestMapping("/evaluate/deleteIndex")
    public void deleteIndex(int indexIdForIdentify){
        evaluateIndexMapper.deleteIndex(indexIdForIdentify);
        LOGGER.info("删除指标完成");
    }
    /***
     * @函数功能：根据索引唯一标识获取索引
     * @param :
     * @return：java.util.List<xjtu.spider.entity.EvaluateIndex>
     */
    @RequestMapping("evaluate/getIndexsForTaskId")
    public List<EvaluateIndex> getIndexsForTaskId(String indexs){
        String[] indexsArray=indexs.replaceAll("\\[","").replaceAll("\\]","").split(",");
        List<EvaluateIndex> evaluateIndexList=new ArrayList<>();
        for (int i = 0; i <indexsArray.length ; i++) {
            evaluateIndexList.add(evaluateIndexMapper.getIndexsForTaskId(Long.parseLong(indexsArray[i])));
        }
        return evaluateIndexList;
    }
    /***
     * @函数功能：
     * @param taskId:
     * @return：boolean
     */
    @RequestMapping("evaluate/isExistByTaskId")
    public boolean isExistByTaskId(Long taskId){
        return indexOfTaskMapper.isExistByTaskId(taskId);
    }
    @RequestMapping("evaluate/addIndexsByTaskId")
    public void addIndexsByTaskId(IndexsOfTask indexsOfTask){
        indexOfTaskMapper.addIndexsByTaskId(indexsOfTask);
    }
    @RequestMapping("evaluate/getIndexsByTaskId")
    public IndexsOfTask getIndexsByTaskId(Long taskId){
        return indexOfTaskMapper.getIndexsByTaskId(taskId);
    }
    /***
     * @函数功能：保存输入的指标值及其权重
     * @param taskId:
     * @param :
     * @return：void
     */
    @RequestMapping("evaluate/saveValueAndWeight")
    public void saveValueAndWeight(Long taskId,String indexValues,String indexWeights){
        indexOfTaskMapper.saveValueAndWeight(taskId,indexValues,indexWeights);
    }
}
