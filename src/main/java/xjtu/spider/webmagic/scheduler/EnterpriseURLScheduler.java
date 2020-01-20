package xjtu.spider.webmagic.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.Request;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.scheduler.DuplicateRemovedScheduler;
import us.codecraft.webmagic.scheduler.MonitorableScheduler;
import xjtu.spider.dao.URLMapper;
import xjtu.spider.entity.SearchURL;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-09 10:20:07
 **/
@Component
public class EnterpriseURLScheduler extends DuplicateRemovedScheduler implements MonitorableScheduler {
    @Autowired
    private URLMapper urlMapper;
    private Logger LOGGER = LoggerFactory.getLogger(getClass()) ;
    private BlockingQueue<Request> queue=new LinkedBlockingDeque<>();
    private AtomicBoolean inited=new AtomicBoolean(false);
    /***
     * @函数功能：初始化，向待爬取队列中添加链接
     * @param :
     * @return：void
     */
    private void init(){
        LOGGER.info("初始化待爬取队列");
        List<String> urls=urlMapper.getURLsOfZeroState("search_url_start");// 获取`search_url_start`表中状态为0的搜索链接
        urls.forEach(url->queue.add(new Request(url)));
        LOGGER.info("当前需要爬取的企业种类有"+queue.size()+"种");
        inited.set(true);
        LOGGER.info("初始化完成");
    }
    @Override
    public int getLeftRequestsCount(Task task) {
        if(!inited.get()){
            init();
        }
        return queue.size();
    }

    @Override
    public int getTotalRequestsCount(Task task) {
        if(!inited.get()){
            init();
        }
        return getDuplicateRemover().getTotalRequestsCount(task);
    }

    @Override
    public Request poll(Task task) {
        if(!inited.get()){
            init();
        }
        return queue.poll();
    }
}
