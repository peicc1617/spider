package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import xjtu.spider.dao.DocumentTopicMapper;
import xjtu.spider.dao.EnterpriseMapper;
import xjtu.spider.dao.EnterpriseOwlMapper;
import xjtu.spider.dao.RegistedEnterpriseMapper;
import xjtu.spider.entity.*;

import java.util.List;

/**
 * @基本功能:API
 * @program:spider
 * @author:peicc
 * @create:2020-01-15 19:11:26
 **/
@RestController
@RequestMapping("/api")
public class APIController {
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    @Autowired
    DocumentTopicMapper documentTopicMapper;
    @Autowired
    EnterpriseMapper enterpriseMapper;
    @Autowired
    RegistedEnterpriseMapper registedEnterpriseMapper;
    @Autowired
    EnterpriseOwlMapper enterpriseOwlMapper;
    /***
     * @函数功能：返回文档主题向量
     * @param :
     * @return：java.util.List<xjtu.spider.entity.DocumentTopic>
     */
    @RequestMapping(method = RequestMethod.GET,value = "/getDocumentTopics")
    public List<DocumentTopic> getDocumentTopics(){
       List<DocumentTopic> documentTopicList=documentTopicMapper.getAll();
       LOGGER.info("获取文档主题向量："+documentTopicList);
       return documentTopicList;
    }
    /***
     * @函数功能：根据输入的MRO服务需求返回推荐列表
     * @param searchWord:
     * @return：java.util.List<xjtu.spider.entity.Enterprise>
     */
    @RequestMapping(method = RequestMethod.POST,value = "/getEnterpriseForRecommend")
    public List<Enterprise> getEnterpriseForRecommend(@RequestParam(name="searchWord") String searchWord){
        List<Enterprise> enterpriseList=enterpriseMapper.getEnterpriseBySearchWord(searchWord);
        return enterpriseList;
    }
    /***
     * @函数功能：用户注册MRO服务
     * @param :
     * @return：boolean
     */
    @RequestMapping(method = RequestMethod.POST,value = "/registerEnterprise")
    public String registerEnterprise(@ModelAttribute RegistedEnterprise registedEnterprise){
        LOGGER.info("注册新的企业:"+registedEnterprise);
        registedEnterpriseMapper.add(registedEnterprise);
        return "注册成功:"+registedEnterprise.toString();
    }
    /***
     * @函数功能：用户注册MRO服务本体
     * @param :
     * @return：boolean
     */
    @RequestMapping(method = RequestMethod.POST,value = "/registerEnterpriseOwl")
    public String registerEnterpriseOwl(@ModelAttribute EnterpriseOwl enterpriseOwl){
        LOGGER.info("注册新的企业:"+enterpriseOwl);
        enterpriseOwlMapper.add(enterpriseOwl);
        return "本体注册成功:"+enterpriseOwl.toString();
    }
    /***
     * @函数功能：获取MRO服务提供商本体信息
     * @param companyId:
     * @return：xjtu.spider.entity.EnterpriseOwl
     */
    @RequestMapping(method = RequestMethod.GET,value = "/getEnterpriseOwlByCompanyId")
    public EnterpriseOwl getEnterpriseOwlByCompanyId(@RequestParam(name="companyId") int companyId){
        return enterpriseOwlMapper.getEnterpriseOwlByCompanyId(companyId);
    }

    /***
     * @函数功能：统计MRO服务提供商类型及其数量
     * @param :
     * @return：java.util.List<xjtu.spider.entity.EnterpriseStatistics>
     */
    @RequestMapping(method = RequestMethod.GET,value = "/getAllOfStatistics")
    public List<EnterpriseStatistics> getAllOfStatistics(){
        List<EnterpriseStatistics> enterpriseStatisticsList=enterpriseMapper.getAllOfStatistics();
        return enterpriseStatisticsList;
    }
    /***
     * @函数功能：统计MRO服务提供商地区及数量
     * @param :
     * @return：java.util.List<xjtu.spider.entity.EnterpriseStatistics>
     */
    @RequestMapping(method = RequestMethod.GET,value = "/getAllOfStatisticsByProvince")
    public List<EnterpriseStatistics> getAllOfStatisticsByProvince(){
        List<EnterpriseStatistics> enterpriseStatisticsList=enterpriseMapper.getAllOfStatisticsByProvince();
        return enterpriseStatisticsList;
    }

}
