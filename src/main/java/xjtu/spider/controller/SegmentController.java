package xjtu.spider.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import xjtu.spider.service.SegmentService;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-15 10:13:39
 **/
@RestController
@RequestMapping("/segment")
public class SegmentController {
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    @Autowired
    SegmentService segmentService;
    /***
     * @函数功能：对企业经营范围进行分词
     * @param :
     * @return：void
     */
    @RequestMapping(method = RequestMethod.GET,value = "/start")
    public void segmentWords(){
        segmentService.segmentWords();
    }
    /***
     * @函数功能：重置
     * @param :
     * @return：void
     */
    @RequestMapping(method = RequestMethod.GET,value = "/reset")
    public void reset(){
        segmentService.reset();
    }
    @RequestMapping(method = RequestMethod.POST,value = "/cutWordsOnLine")
    public String cutWordsOnLine(String originStr){
        return segmentService.cutWordsOnLine(originStr);
    }
}
