package xjtu.spider.controller;

import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import xjtu.spider.dao.EnterpriseMapper;
import xjtu.spider.dao.EnterpriseResultMapper;
import xjtu.spider.entity.Enterprise;

import javax.servlet.http.HttpSession;

/**
 * @基本功能:视图接口
 * @program:spider
 * @author:peicc
 * @create:2020-01-15 17:14:47
 **/
@Controller
public class ViewController {
    @Autowired
    EnterpriseResultMapper enterpriseResultMapper;
    @Autowired
    EnterpriseMapper enterpriseMapper;
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    /***
     * @函数功能：查看profile.html页面
     * @param session:
     * @param model:
     * @return：java.lang.String
     */
    @RequestMapping("/profile.html")
    public String viewProfile(HttpSession session, Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        LOGGER.info("进入profile.html页面："+user.toString());
        //将相关参数暴露给视图
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("nickName",user.get("nickName"));
        model.addAttribute("email",user.get("email"));
        model.addAttribute("jobNumber",user.get("jobNumber"));
        model.addAttribute("phoneNumber",user.get("phoneNumber"));
        model.addAttribute("domain",user.get("domain"));
        model.addAttribute("domainName",user.get("domainName"));
        model.addAttribute("permission",user.get("permission"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        return "profile";
    }
    /***
     * @函数功能：查看serviceRegister（服务注册）页面
     * @param :
     * @return：java.lang.String
     */
    @RequestMapping("/serviceRegister.html")
    public String viewServiceRegister(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        LOGGER.info("进入serviceRegister.html页面");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        return "serviceRegister";
    }
    /***
     * @函数功能：查看serviceCluster（服务聚类）页面
     * @param :
     * @return：java.lang.String
     */
    @RequestMapping("/serviceCluster.html")
    public  String viewServiceCluster(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        if (Integer.parseInt((String)user.get("permission"))==1) {
            LOGGER.info("进入serviceCluster.html页面");
            return "serviceCluster";
        } else {
            LOGGER.info("权限不足");
            return "unauthorized";
        }

    }
    /***
     * @函数功能：查看serviceRecommend（服务推荐）页面
     * @param :
     * @return：java.lang.String
     */
    @RequestMapping("/serviceRecommend.html")
    public String viewServiceRecommend(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        LOGGER.info("进入serviceRecommend.html页面");
        return "serviceRecommend";
    }
    /***
     * @函数功能：查看服务运行调度页面
     * @param session:
     * @param model:
     * @return：java.lang.String
     */
    @RequestMapping("/serviceSchedule.html")
    public String viewServiceSchedule(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        LOGGER.info("进入serviceSchedule.html页面");
        return "serviceSchedule";
    }
    /***
     * @函数功能：查看服务评价
     * @param session:
     * @param model:
     * @return：java.lang.String
     */
    @RequestMapping("/serviceEvaluate.html")
    public String viewServiceEvaluate(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        LOGGER.info("进入serviceEvaluate.html页面");
        return "serviceEvaluate";
    }
    /***
     * @函数功能：运行监控
     * @param session:
     * @param model:
     * @return：java.lang.String
     */
    @RequestMapping("/serviceMonitor.html")
    public String viewServiceMonitor(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        LOGGER.info("进入serviceMonitor.html页面");
        return "serviceMonitor";
    }
    /***
     * @函数功能：OEE历史数据分析
     * @param session:
     * @param model:
     * @return：java.lang.String
     */
    @RequestMapping("/oee.html")
    public String viewOEE(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        LOGGER.info("进入oee.html页面");
        return "oee";
    }
    /***
     * @函数功能：进入爬虫页面
     * @param session:
     * @param model:
     * @return：java.lang.String
     */
    @RequestMapping("/spider.html")
    public String viewSpider(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        if (Integer.parseInt((String)user.get("permission"))==1) {
            LOGGER.info("进入spider.html页面");
            return "spider";
        } else {
            LOGGER.info("权限不足");
            return "unauthorized";
        }
    }
    /***
     * @函数功能：开启中文分词
     * @param session:
     * @param model:
     * @return：java.lang.String
     */
    @RequestMapping("/segment.html")
    public String viewSegment(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        if (Integer.parseInt((String)user.get("permission"))==1) {
            LOGGER.info("进入segment.html页面");
            return "segment";
        } else {
            LOGGER.info("权限不足");
            return "unauthorized";
        }

    }
    @RequestMapping("mroList.html")
    public String viewMROList(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        if (Integer.parseInt((String)user.get("permission"))==1) {
            model.addAttribute("MROList",enterpriseResultMapper.getEnterpriseResult());
            LOGGER.info("进入mroList.html页面");
            return "mroList";
        } else {
            LOGGER.info("权限不足");
            return "unauthorized";
        }

    }
    /***
     * @函数功能：MRO服务提供商预览
     * @param session:
     * @param model:
     * @return：java.lang.String
     */
    @RequestMapping("/mroProfile.html")
    public String viewMROProfile(HttpSession session,Model model){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        LOGGER.info("进入mroProfile.html页面");
        return "mroProfile";
    }
    @RequestMapping("mro/{MROID}")
    public String viewMROData(HttpSession session, Model model, @PathVariable("MROID") long MROID){
        JSONObject user=(JSONObject)session.getAttribute("userInfo");
        model.addAttribute("userName",user.get("userName"));
        model.addAttribute("userPhoto",user.get("userPhoto"));
        Enterprise enterprise=enterpriseMapper.getEnterpriseById(MROID);
        model.addAttribute("mro",enterprise);
        return "mroData";
    }

}
