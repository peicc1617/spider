package xjtu.spider.webmagic.processor;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.selector.Html;
import xjtu.spider.webmagic.Utils;
import xjtu.spider.entity.Enterprise;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-06 20:51:07
 **/
public class EnterpriseInfoProcessor implements PageProcessor {
    private Logger LOGGER = LoggerFactory.getLogger(getClass()) ;
    Site site = new Site()
            .me()
            .setTimeOut(10000)
            .setRetryTimes(3)
            .setDomain(".tianyancha.com")
            .setSleepTime(3000)
            .setCycleRetryTimes(3)
            .setUserAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36")
            .addCookie("CT_TYCID","9f51a214866345d1b84c54f42f61536f")
            .addCookie("Hm_lpvt_e92c8d65d92d534b0fc290df538b4758","1578456901")
            .addCookie("Hm_lvt_e92c8d65d92d534b0fc290df538b4758","1578401275,1578402552,1578449931,1578452363")
            .addCookie("RTYCID","e2bf1034758947658b1f641896309fdf")
            .addCookie("TYCID","21c676a0312f11ea9a4b1107d69c7d50")
            .addCookie("_ga","GA1.2.529609208.1578388912")
            .addCookie("_gid","GA1.2.1486928458.1578388912")
            .addCookie("_utm","3da4aea75cac421daeef258fad9b6bd7")
            .addCookie("aliyungf_tc","AQAAALKpGDtVHwYAn2TOOqUeCZanXLXq")
            .addCookie("aliyungf_tc","AQAAADI3ixqioAgAn2TOOq8jFr/rBQpy")
            .addCookie("auth_token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzY2OTE4MzUyMSIsImlhdCI6MTU3ODQ1Njg5OCwiZXhwIjoxNjA5OTkyODk4fQ.HWpzEs06IpmR0ANaS8K6eA5qPLMRiQLduZZXiSB_uJRisSK6XLFYYmPW0Bc398dqTTSAKHB4vJLiX0qbNJDr6g")
            .addCookie("bannerFlag","undefined")
            .addCookie("csrfToken","DpQmf-p8wlmaHXK2ehS65QSn")
            .addCookie("jsid","SEM-BAIDU-PZ2001-SY-000001")
            .addCookie("ssuid","9223659684")
            .addCookie("token","7ede34d1829c4b318e31fcd1809cbf12")
            .addCookie("tyc-user-info","%257B%2522claimEditPoint%2522%253A%25220%2522%252C%2522myAnswerCount%2522%253A%25220%2522%252C%2522myQuestionCount%2522%253A%25220%2522%252C%2522signUp%2522%253A%25220%2522%252C%2522explainPoint%2522%253A%25220%2522%252C%2522privateMessagePointWeb%2522%253A%25220%2522%252C%2522nickname%2522%253A%2522%25E8%2580%25B6%25E5%25BE%258B%25E5%25BE%25B7%25E5%2585%2589%2522%252C%2522integrity%2522%253A%25220%2525%2522%252C%2522privateMessagePoint%2522%253A%25220%2522%252C%2522state%2522%253A%25220%2522%252C%2522announcementPoint%2522%253A%25220%2522%252C%2522isClaim%2522%253A%25220%2522%252C%2522bidSubscribe%2522%253A%2522-1%2522%252C%2522vipManager%2522%253A%25220%2522%252C%2522discussCommendCount%2522%253A%25220%2522%252C%2522monitorUnreadCount%2522%253A%25220%2522%252C%2522onum%2522%253A%25220%2522%252C%2522claimPoint%2522%253A%25220%2522%252C%2522token%2522%253A%2522eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzY2OTE4MzUyMSIsImlhdCI6MTU3ODQ1Njg5OCwiZXhwIjoxNjA5OTkyODk4fQ.HWpzEs06IpmR0ANaS8K6eA5qPLMRiQLduZZXiSB_uJRisSK6XLFYYmPW0Bc398dqTTSAKHB4vJLiX0qbNJDr6g%2522%252C%2522pleaseAnswerCount%2522%253A%25220%2522%252C%2522redPoint%2522%253A%25220%2522%252C%2522bizCardUnread%2522%253A%25220%2522%252C%2522vnum%2522%253A%25220%2522%252C%2522mobile%2522%253A%252213669183521%2522%257D")
            .addCookie("tyc-user-phone","%255B%252213669183521%2522%255D")
            .addCookie("undefined","21c676a0312f11ea9a4b1107d69c7d50")
            ;

    @Override
    public void process(Page page) {
        LOGGER.info("正在解析当前爬取页面:"+page.getUrl());
        Html html=page.getHtml();//获取html对象
        List<Enterprise> enterpriseList= html.css(".result-list .search-item").all().stream().map(a->{
            Enterprise enterprise=new Enterprise();
            Element e= Jsoup.parse(a).select("img").first();//公司名称
            if (e!=null) {
                enterprise.setCompanyName(Utils.correctCompanyName(e.attr("alt")));
            }
            e=Jsoup.parse(a).select(".site").first();//公司所属地区
            if (e!=null) {
                enterprise.setArea(e.text());
            }
            e=Jsoup.parse(a).select(".-normal-bg").first();//公司状态
            if (e!=null) {
                enterprise.setState(e.text());
            }
            e=Jsoup.parse(a).select(".tag-list .-new").first();//公司标签
            if (e!=null) {
                enterprise.setLabel(e.text());
            }
            e=Jsoup.parse(a).select(".score .score-num").first();//得分
            if (e!=null) {
                enterprise.setScore(Integer.parseInt(e.text()));
            }
            e=Jsoup.parse(a).select(".header a").first();//链接
            if (e!=null) {
                enterprise.setHref(e.attr("href"));
            }
            e=Jsoup.parse(a).select(".match span").last();//经营范围
            if (e!=null) {
                enterprise.setDescription(e.text());
            }

            return enterprise;
        }).collect(Collectors.toList());
        page.putField("enterpriseList", enterpriseList);
    }

    @Override
    public Site getSite() {
        return site;
    }
}
