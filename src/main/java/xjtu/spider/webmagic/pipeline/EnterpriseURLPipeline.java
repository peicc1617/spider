package xjtu.spider.webmagic.pipeline;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.ResultItems;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.pipeline.Pipeline;
import xjtu.spider.dao.URLMapper;
import xjtu.spider.entity.SearchURL;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-08 17:52:52
 **/
@Component
public class EnterpriseURLPipeline implements Pipeline {
    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Autowired
    URLMapper urlMapper;
    @Override
    public void process(ResultItems resultItems, Task task) {
        String url=resultItems.getRequest().getUrl();//获取当前处理页面的url
        String searchKey=urlMapper.getSearchKey("search_url_start",url);//获取当前处理页面对应的搜索关键字
        List<SearchURL> urlList=resultItems.get("urlList");
        if (urlList!=null) {
            LOGGER.info("成功获取以下待爬取链接："+urlList);
            urlList.forEach(searchURL -> {
                //将待爬取链接保存到数据库中
                if (!urlMapper.containsURL("search_url",searchURL.getHref())) { //确定数据库中不存在待爬取的链接
                    urlMapper.add("search_url",searchURL.getHref(),searchKey);
                    LOGGER.info("待爬取链接成功存入数据库："+searchKey+","+searchURL.getHref());
                } else {
                    LOGGER.info("待爬取链接已存在："+searchKey+":"+searchURL.getHref());
                }
            });
        }
        urlMapper.delete("search_url_start",resultItems.getRequest().getUrl());//标记初始待爬取链接状态为已爬取
        //输出已爬取类别
        LOGGER.info(searchKey+"搜索链接已爬取完毕");
    }
}
