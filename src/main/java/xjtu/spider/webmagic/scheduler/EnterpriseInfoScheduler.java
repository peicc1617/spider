package xjtu.spider.webmagic.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import us.codecraft.webmagic.Request;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.scheduler.DuplicateRemovedScheduler;
import us.codecraft.webmagic.scheduler.MonitorableScheduler;
import us.codecraft.webmagic.scheduler.component.DuplicateRemover;
import xjtu.spider.dao.URLMapper;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @基本功能:自定义Scheduler，将爬虫链接保存到数据库
 * @program:spider
 * @author:peicc
 * @create:2020-01-07 14:42:17
 **/
public class EnterpriseInfoScheduler extends DuplicateRemovedScheduler implements MonitorableScheduler{
    private Logger LOGGER = LoggerFactory.getLogger(getClass()) ;
    URLMapper urlMapper;
    String tableName;
    private AtomicBoolean inited=new AtomicBoolean(false);
    private AtomicInteger hasProcess=new AtomicInteger(0);
    private BlockingQueue<Request> queue=new LinkedBlockingDeque<>();

    public EnterpriseInfoScheduler(URLMapper urlMapper, String tableName) {
        this.urlMapper = urlMapper;
        this.tableName = tableName;
    }
    private void init(Task task){
        readDB();
        this.inited.set(true);
    }
    /***
     * @函数功能：将当前未爬取的链接读取到待爬取队列中
     * @param :
     * @return：void
     */
    private void readDB(){
        List<String> urls=urlMapper.getURLsOfZeroState(this.tableName);
        urls.forEach(url->queue.add(new Request(url)));
    }
    /***
     * @函数功能：
     * @param task:
     * @return：int 剩余爬取的链接数目
     */
    @Override
    public int getLeftRequestsCount(Task task) {
        return queue.size();
    }

    @Override
    public int getTotalRequestsCount(Task task) {
        return getDuplicateRemover().getTotalRequestsCount(task);
    }
    /***
     * @函数功能：从待爬取的队列中获取待爬取链接
     * @param task:
     * @return：us.codecraft.webmagic.Request
     */
    @Override
    public Request poll(Task task) {
        if(!inited.get()){
            init(task);
        }
        Request request = queue.poll();
        if(request!=null){
            hasProcess.getAndIncrement();//已处理+1
            LOGGER.info("当前已处理页面列表："+hasProcess.get()+",待处理页面列表:"+queue.size());
        }else{
            LOGGER.info("页面列表处理完成！");
            return null;
        }
        return request;
    }
}
