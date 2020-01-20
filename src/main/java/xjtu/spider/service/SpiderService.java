package xjtu.spider.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import us.codecraft.webmagic.Spider;
import xjtu.spider.dao.URLMapper;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-08 18:23:54
 **/
@Service
public class SpiderService {
    private Logger LOGGRER= LoggerFactory.getLogger(getClass());
    @Autowired
    Spider enterpriseURLSpider;
    @Autowired
    Spider enterpriseInfoSpider;
    @Autowired
    URLMapper urlMapper;
    /***
     * @函数功能：开启爬虫
     * @param :
     * @return：void
     */
    public void startEnterpriseURLSpider(){
        this.enterpriseURLSpider.start();
    }
    public void startEnterpriseInfoSpider(){
        this.enterpriseInfoSpider.start();
    }
    /***
     * @函数功能：向search_url_start中插入一条待爬取记录
     * @param :
     * @return：boolean
     */
    public boolean addNewEnterpriseCategory(String searchKey){
        String webSite="https://www.tianyancha.com/search";
        String url=webSite+"?"+"key="+searchKey;
        String tableName="search_url_start";
        if (!urlMapper.containsURL(tableName,url)) {
            urlMapper.add(tableName,url,searchKey);
            LOGGRER.info("新增爬取企业类型："+searchKey+"搜索链接为："+url);
            return true;
        }
        LOGGRER.warn("新增爬取企业类型已存在："+searchKey+"搜索链接为："+url);
        return false;
    }

}
