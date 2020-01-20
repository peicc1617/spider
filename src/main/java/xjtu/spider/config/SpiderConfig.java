package xjtu.spider.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import us.codecraft.webmagic.Spider;
import xjtu.spider.dao.URLMapper;
import xjtu.spider.webmagic.pipeline.EnterpriseInfoPipeline;
import xjtu.spider.webmagic.pipeline.EnterpriseURLPipeline;
import xjtu.spider.webmagic.processor.EnterpriseInfoProcessor;
import xjtu.spider.webmagic.processor.EnterpriseURLProcessor;
import xjtu.spider.webmagic.scheduler.EnterpriseInfoScheduler;
import xjtu.spider.webmagic.scheduler.EnterpriseURLScheduler;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-06 20:22:28
 **/
@Configuration
public class SpiderConfig {
    @Autowired
    URLMapper urlMapper;
    @Autowired
    EnterpriseInfoPipeline enterpriseInfoPipeline;
    @Autowired
    EnterpriseURLPipeline enterpriseURLPipeline;
    @Autowired
    EnterpriseURLScheduler enterpriseURLScheduler;
    @Bean(name = "enterpriseInfoSpider")
    public Spider enterpriseSpider(){
        return  Spider.create(new EnterpriseInfoProcessor())
                .setScheduler(new EnterpriseInfoScheduler(urlMapper,"search_url"))
                .addPipeline(enterpriseInfoPipeline)
                .thread(4);
    }
    @Bean(name = "enterpriseURLSpider")
    public Spider enterpriseURLSpider(){
        return  Spider.create(new EnterpriseURLProcessor())
                .setScheduler(enterpriseURLScheduler)
                .addPipeline(enterpriseURLPipeline)
                .thread(4);
    }
}
