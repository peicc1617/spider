/*
package xjtu.spider.run;

import me.midday.FoolNLTK;
import me.midday.lexical.AnalysisResult;
import me.midday.lexical.Entity;
import me.midday.lexical.LexicalAnalyzer;
import me.midday.lexical.Word;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.logging.LoggerGroup;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

*/
/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-10 12:05:38
 **//*

public class LSTMLexicalParserDemo {
    private static Logger LOGGER = LoggerFactory.getLogger(LSTMLexicalParserDemo.class);
    public static void main(String[] args) throws IOException {
        String text = "北京欢迎你";
        String text2 = "我妈不让我跟傻子玩";
        String text1="(生产精密数控加工用高速超硬刀具);销售.自产...产品;从事...【依法须经批准的项目，经相关部门批准后方可开展经营活动】....刀具;五金;机电;钢材;建筑材料;机械设备的进出口业务;佣金代理;按国家有关规定办理申请;并提供上述产品的售后服务;信息咨询服务";
        //预处理
        String str=text1.replaceAll(";","")// 过滤';'
                .replaceAll("、","")// 过滤'、'
                .replaceAll("[.]+","")// 过滤'.'
                .replaceAll("\\*","")// 过滤'*'
                .replaceAll("=","")// 过滤'='
                .replaceAll("\\(\\S*\\)","")// 过滤'()'
                .replaceAll("【\\S*","");// 过滤'【'
        String text3="各类通用机床、专用机床、机床辅具、刀具零配件的制造、销售、维修、来料加工；房屋、场地租赁(依法须经批准的项目，经相关部门批准后方可开展经营活动)。";
        String str3=text3.replaceAll("、"," ");
        LexicalAnalyzer lexicalAnalyzer= FoolNLTK.getLSTMLexicalAnalyzer();
//        lexicalAnalyzer.addUserDict("C:\\Users\\peicc\\OneDrive\\毕业论文\\大论文\\APP\\spider\\src\\main\\resources\\segment\\dictionary.txt");
        //分词
        LOGGER.info("分词");
        List<List<Word>> words= lexicalAnalyzer.cut(str3);
        for (List<Word> ws:words) {
            ws.forEach(System.out::println);
        }
        */
/*//*
/ 词性标注
        LOGGER.info("词性标注");
        List<List<Word>> posWords = lexicalAnalyzer.pos(text);
        for(List<Word> ws: posWords){
            ws.forEach(System.out::println);
        }
        // 实体识别
        LOGGER.info("实体识别");
        List<List<Entity>>  entities = lexicalAnalyzer.ner(text);
        for(List<Entity> ents :entities){
            ents.forEach(System.out::println);
        }
        // 分词，词性，实体识别
        LOGGER.info("词，词性，实体识别");
        List<AnalysisResult>  results = lexicalAnalyzer.analysis(text);
        results.forEach(System.out::println);
        //多文本
        LOGGER.info("--------多文本---------");
        List<String> docs = new ArrayList<>();
        docs.add(text);
        docs.add(text2);
        List<List<Word>> dWords = lexicalAnalyzer.cut(docs);
        for(List<Word> ws: dWords){
            ws.forEach(System.out::println);
        }
        List<List<Word>> dPosWords = lexicalAnalyzer.pos(docs);
        for(List<Word> ws: dPosWords){
            ws.forEach(System.out::println);
        }*//*

    }
}
*/
