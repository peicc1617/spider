package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xjtu.spider.dao.OEEDataMapper;
import xjtu.spider.entity.OEEData;
import xjtu.spider.util.DES;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-07 21:28:53
 **/
@RestController
public class OEEController {
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    @Autowired
    private OEEDataMapper oeeDataMapper;
    @RequestMapping("/oee/saveOEEDataByTaskId")
    public void saveOEEDataByTaskId(OEEData oeeData){
        oeeDataMapper.saveOEEDataByTaskId(oeeData);
    }
    /***
     * @函数功能：
     * @param taskId:
     * @return：xjtu.spider.entity.OEEData
     */
    @RequestMapping("/oee/getOEEDataByTaskId")
    public OEEData getOEEDataByTaskId(int taskId){
        OEEData oeeData=oeeDataMapper.getOEEDataByTaskId(taskId);
        LOGGER.info("加载OEE数据:"+oeeData);
        return oeeData;
    }
    /***
     * @函数功能：OEE预测
     * @param data:
     * @return：double[]
     */
    @RequestMapping("/oee/predictOEE")
    public double[] predictOEE(String data,double aerf,double beta){
        String[] str=data.replace("[","").replace("]","").replaceAll("\"","").split(",");
        double[] oeeData=new double[str.length];
        for (int i = 0; i <str.length ; i++) {
            oeeData[i]=Double.parseDouble(str[i]);
        }
        double[] predictData=DES.predictOEE(oeeData,aerf,beta);
        LOGGER.info("预测结果为："+predictData);
        return predictData;
    }
    /***
     * @函数功能：
     * @param taskId:
     * @param indexs:
     * @return：void
     */
    @RequestMapping("/oee/saveIndexsByTaskId")
    public void saveIndexsByTaskId(int taskId,String indexs){
        LOGGER.info("保存OEE指标计算结果"+indexs);
        oeeDataMapper.saveIndexsByTaskId(taskId,indexs);
    }
    /***
     * @函数功能：获取监控指标
     * @param taskId:
     * @return：java.lang.String
     */
    @RequestMapping("/oee/getIndexsByTaskId")
    public String getIndexsByTaskId(int taskId){
        String str=oeeDataMapper.getIndexsByTaskId(taskId);
        LOGGER.info("保存OEE指标计算结果"+str);
        return str;
    }
    @RequestMapping("/oee/getTaskListByUserName")
    public List<OEEData> getTaskListByUserName(String userName){
        List<OEEData> oeeDataList=oeeDataMapper.getTaskListByUserName(userName);
        return oeeDataList;
    }
}
