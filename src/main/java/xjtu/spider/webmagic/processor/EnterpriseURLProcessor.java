package xjtu.spider.webmagic.processor;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.selector.Html;
import xjtu.spider.entity.SearchURL;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-08 17:25:05
 **/
public class EnterpriseURLProcessor implements PageProcessor {
    private Logger LOGGER = LoggerFactory.getLogger(getClass()) ;
    Site site = new Site()
            .me()
            .setTimeOut(10000)
            .setRetryTimes(3)
            .setSleepTime(3000)
            .setCycleRetryTimes(3)
            .setUserAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36");
    @Override
    public void process(Page page) {
        LOGGER.info("正在解析待爬取URL");
        //获取html
        Html html = page.getHtml();
        //解析前五页的链接（天眼查超过五页需要VIP才能查看）
        List<SearchURL> urlList=html.css(".pagination a").all().subList(0,5).stream().map(a->{
            SearchURL searchURL=new SearchURL();
            Element e =  Jsoup.parse(a).select("a").first();
            if (e!=null) {
                searchURL.setHref(e.attr("href"));
            }
            return searchURL;
        }).collect(Collectors.toList());
        page.putField("urlList",urlList);

    }

    @Override
    public Site getSite() {
        return site;
    }
}
