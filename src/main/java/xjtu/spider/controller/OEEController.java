package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xjtu.spider.dao.OEEDataMapper;
import xjtu.spider.entity.OEEData;

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
}
