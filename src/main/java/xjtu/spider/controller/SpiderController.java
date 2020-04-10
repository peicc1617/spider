package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xjtu.spider.service.SpiderService;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-06 20:25:08
 **/
@RestController
@RequestMapping("/spider")
public class SpiderController {
    private Logger LOGGER = LoggerFactory.getLogger(getClass()) ;
    @Autowired
    SpiderService spiderService;
    /***
     * @函数功能：开启爬虫
     * @param :
     * @return：void
     */
    @RequestMapping(method = RequestMethod.POST)
    public void startSpider(){
    }
    /***
     * @函数功能：开启爬虫(第一阶段：获取待爬取链接)
     * @param :
     * @return：void
     */
    @RequestMapping(method = RequestMethod.GET,value = "/start")
    public void startGetURL(){
        spiderService.startEnterpriseURLSpider();
    }
    /***
     * @函数功能：开启爬虫（第二阶段：爬虫页面，获取企业信息）
     * @param :
     * @return：void
     */
    @RequestMapping(method = RequestMethod.GET,value = "/start/getEnterprise")
    public void startGetEnterprise(){
        spiderService.startEnterpriseInfoSpider();
    }
    /***
     * @函数功能：服务注册：新增待爬取企业类别(`search_url_start`表中增加数据)
     * @param :
     * @return：void
     */
    @RequestMapping(method = RequestMethod.POST,value = "/add")
    public String addNewEnterpriseCategory(@RequestParam(name="searchKey") String searchKey){
        spiderService.addNewEnterpriseCategory(searchKey);
        return "注册成功";
    }

}
