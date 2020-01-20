package xjtu.spider.service;

import me.midday.FoolNLTK;
import me.midday.lexical.LexicalAnalyzer;
import me.midday.lexical.Word;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xjtu.spider.dao.EnterpriseMapper;
import xjtu.spider.dao.EnterpriseResultMapper;
import xjtu.spider.entity.Enterprise;
import xjtu.spider.entity.EnterpriseResult;
import xjtu.spider.webmagic.Utils;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @基本功能: 中文分词
 * @program:spider
 * @author:peicc
 * @create:2020-01-14 17:56:22
 **/
@Service
public class SegmentService {
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    @Autowired
    EnterpriseMapper enterpriseMapper;
    @Autowired
    EnterpriseResultMapper enterpriseResultMapper;
    private boolean isLoading=false;//停用词是否已加载
    private Set<String> stopWords= null;
    private AtomicInteger count=new AtomicInteger(1);
    //中文分词
    public void segmentWords(){
        LOGGER.info("------------------开始分词------------------");
        //加载停用词
        if (!isLoading) {
            String path="C:\\Users\\peicc\\OneDrive\\毕业论文\\大论文\\APP\\spider\\src\\main\\resources\\segment\\chineseStopWords.txt";
            try {
                LOGGER.info("正在加载停用词");
                stopWords = Utils.getStopWords(path);
                isLoading=true;
            }
            catch (IOException e1) {
                LOGGER.error("加载停用词错误");
                e1.printStackTrace();
            }
        }
        List<Enterprise> enterpriseList=enterpriseMapper.getAllOfZeroSegment();
        LOGGER.info("当前需要处理"+enterpriseList.size()+"条数据");
        enterpriseList.forEach(enterprise -> {
            LOGGER.info("开始处理第"+count.getAndIncrement()+"条数据");
            EnterpriseResult enterpriseResult=new EnterpriseResult();
            enterpriseResult.setId(enterprise.getId());
            enterpriseResult.setCompanyName(enterprise.getCompanyName());
            enterpriseResult.setDescription(enterprise.getDescription());
            //开始分词
            String strLabel=enterprise.getLabel();
            String strDescription=enterprise.getDescription();
            String oldStr="";
            String newStr="";
            if (strLabel!=null) {
                oldStr=oldStr+strLabel;
            }
            if (strDescription!=null) {
                oldStr=oldStr+strDescription;
            }
            newStr=oldStr .replaceAll("；","")// 过滤';'
                    .replaceAll("、","")// 过滤'、'
                    .replaceAll("。","")
                    .replaceAll("[.]+","")// 过滤'.'
                    .replaceAll("\\*","")// 过滤'*'
                    .replaceAll("=","")// 过滤'='
                    .replaceAll("\\（\\S*\\）","")// 过滤'()'
                    .replaceAll("【\\S*","");// 过滤'【'
            LOGGER.info("当前分词----->原始字符串："+oldStr+"预处理后字符串："+newStr);
            // 调用分词工具
            LexicalAnalyzer lexicalAnalyzer= FoolNLTK.getLSTMLexicalAnalyzer();
            try {
                lexicalAnalyzer.addUserDict("C:\\Users\\peicc\\OneDrive\\毕业论文\\大论文\\APP\\spider\\src\\main\\resources\\segment\\dictionary.txt");
            }
            catch (IOException e) {
                LOGGER.error("自定义分析词典使用异常");
                e.printStackTrace();
            }
            List<List<Word>> words= lexicalAnalyzer.cut(newStr);// 分词
            StringBuilder sb=new StringBuilder();
            for (List<Word> ws:words) {
                ws.forEach(word -> {
                    //分词结果处理
                   if (!stopWords.contains(word.toString())) {// 当前字符串不在停用词集合中
                       sb.append(word).append(" ");
                   }
                });
            }
            enterpriseResult.setResult(sb.toString().trim());
            LOGGER.info("分词结果："+sb.toString().trim());
            LOGGER.info("----------------------------------------");
            // 向enterpriseResult表中插入分词结果
            enterpriseResultMapper.add(enterpriseResult);
            // 将enterprise中的数据标记为已分词
            enterpriseMapper.update(enterprise.getId());

        });
    }
    //重置
    public void reset(){
        enterpriseMapper.reset();
        LOGGER.info("待分词数据已重置");
    }
}
