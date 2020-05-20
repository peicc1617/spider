package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import xjtu.spider.dao.*;
import xjtu.spider.entity.*;
import xjtu.spider.service.SendEmailService;

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
    @Autowired
    TaskListMapper taskListMapper;
    @Autowired
    URLMapper urlMapper;
    @Autowired
    EnterpriseResultMapper enterpriseResultMapper;
    @Autowired
    UserMapper userMapper;
    @Autowired
    SendEmailService sendEmailService;
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
     * @函数功能：返回所有的MRO服务提供商本体模型
     * @param :
     * @return：java.util.List<xjtu.spider.entity.EnterpriseOwl>
     */
    @RequestMapping("/getAllEnterpriseOwl")
    public List<EnterpriseOwl> getAllEnterpriseOwl(){
        return enterpriseOwlMapper.getAllMROsOfOWL();
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
    /***
     * @函数功能：根据用户名获取任务列表
     * @param tableName:
     * @param userName:
     * @return：java.util.List<xjtu.spider.entity.Task>
     */
    @RequestMapping("/getTaskListByUserName")
    public List<Task> getTaskListByUserName(String tableName,String userName){
        if (tableName==null||tableName.equals("")) {
            tableName="oee_data";
        }
        if (userName==null||userName.equals("")) {
            userName="裴长城";
        }
        List<Task> taskList=taskListMapper.getTaskListByUserName(tableName,userName);
        return taskList;
    }
    /***
     * @函数功能：返回spider.html页面所需数据
     * @param :
     * @return：java.lang.String
     */
    @RequestMapping("/getDataOfSpider")
    public String getDataOfSpider(){
        int num1=urlMapper.getDataPOfSpider("search_url_start",0);
        int num2=urlMapper.getDataPOfSpider("search_url_start",1);
        int num3=urlMapper.getDataPOfSpider("search_url",0);
        int num4=enterpriseMapper.getNum();
        return new StringBuilder().append(num1).append(":").append(num2).append(":").append(num3).append(":").append(num4).toString();
    }
    /***
     * @函数功能：返回spider.html页面所需数据
     * @param :
     * @return：java.lang.String
     */
    @RequestMapping("/getDataOfSegment")
    public String getDataOfSegment(){
        int num1=enterpriseMapper.getDataOfSegment(0);
        int num2=enterpriseMapper.getDataOfSegment(1);
        return new StringBuilder().append(num1).append(":").append(num2).toString();
    }
    /***
     * @函数功能：获取分词结果，用于segment.html页面
     * @param :
     * @return：java.util.List<xjtu.spider.entity.EnterpriseResult>
     */
    @RequestMapping("/getEnterpriseResult")
    public List<EnterpriseResult> getEnterpriseResult(){
        return enterpriseResultMapper.getEnterpriseResult();
    }

    /***
     * @函数功能：获取用户列表，用于给用户发送邮件
     * @param :
     * @return：java.util.List<xjtu.spider.entity.User>
     */@RequestMapping("/getAllUsers")
    public List<User> getAllUsers(){
        List<User> userList=userMapper.getAllUser();
        LOGGER.info("获取用户列表："+userList);
        return userList;
    }
    @RequestMapping("/sendEmail")
    public String sendEmail(String email){
        sendEmailService.sendEmail(email);
         return "发送成功";
    }

}
