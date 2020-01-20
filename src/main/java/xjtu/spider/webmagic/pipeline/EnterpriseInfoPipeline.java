package xjtu.spider.webmagic.pipeline;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.ResultItems;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.pipeline.Pipeline;
import xjtu.spider.dao.EnterpriseMapper;
import xjtu.spider.dao.URLMapper;
import xjtu.spider.entity.Enterprise;

import java.util.List;

/**
 * @基本功能: 保存Enterprise到Mysql
 * @program:spider
 * @author:peicc
 * @create:2020-01-08 15:44:04
 **/
@Component
public class EnterpriseInfoPipeline implements Pipeline {
    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Autowired
    EnterpriseMapper enterpriseMapper;
    @Autowired
    URLMapper urlMapper;
    @Override
    public void process(ResultItems resultItems, Task task) {
        String url=resultItems.getRequest().getUrl();//获取当前处理页面的url
        String searchKey=urlMapper.getSearchKey("search_url",url);//获取当前处理页面对应的搜索关键字
        List<Enterprise> enterpriseList=resultItems.get("enterpriseList");
        if (enterpriseList!=null) {
            LOGGER.info("成功获取以下企业基本信息："+enterpriseList);
            enterpriseList.forEach(enterprise -> {
                if (!enterpriseMapper.containsCompany(enterprise.getCompanyName(),enterprise.getHref())) {// 不包含该企业
                    enterprise.setSearchKey(searchKey);//设置当前企业的搜索关键字
                    enterpriseMapper.add(enterprise);
                } else {
                    LOGGER.info("当前企业已存在"+enterprise.toString());
                }
            });
        }
        //将当前searchURL设置为已爬取
        urlMapper.delete("search_url",url);
    }
}
