package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import xjtu.spider.dao.EnterpriseOwlMapper;
import xjtu.spider.entity.EnterpriseOwl;
import xjtu.spider.entity.MatchResult;
import xjtu.spider.service.ServiceMatchService;

import java.io.IOException;
import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-22 20:56:48
 **/
@RestController
public class ServiceMatchController {
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    @Autowired
    ServiceMatchService serviceMatchService;
    @RequestMapping(method = RequestMethod.GET,value ="/serviceMatch/getMROOfOWL")
    public List<MatchResult> getMROOfOWL(@ModelAttribute EnterpriseOwl enterpriseOwl) throws IOException {
        List<MatchResult> matchResultList=serviceMatchService.getMROOfOWL(enterpriseOwl);
        LOGGER.info("服务匹配结果："+matchResultList);
        return matchResultList;
    }

}
