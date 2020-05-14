package xjtu.spider.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xjtu.spider.dao.EnterpriseOwlMapper;
import xjtu.spider.entity.EnterpriseOwl;
import xjtu.spider.entity.MatchResult;
import xjtu.spider.util.CompareStrSimUtil;
import xjtu.spider.util.SimilarityByPython;
import xjtu.spider.util.VectorSimilarity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-22 21:34:42
 **/
@Service
public class ServiceMatchService {
    @Autowired
    private EnterpriseOwlMapper enterpriseOwlMapper;
    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    public List<MatchResult> getMROOfOWL(EnterpriseOwl enterpriseOwl) {
        double[] qos_mro=new double[4];
        qos_mro[0]=1;
        qos_mro[1]=enterpriseOwl.getSpeed();
        qos_mro[2]=enterpriseOwl.getReliability();
        qos_mro[3]=enterpriseOwl.getReputation();
        List<EnterpriseOwl> enterpriseOwlList=enterpriseOwlMapper.getMROs();
        List<MatchResult> resultList=new ArrayList<>();
        for (EnterpriseOwl enterpriseOwl1:enterpriseOwlList) {
            MatchResult matchResult=new MatchResult();
            matchResult.setCompanyId(enterpriseOwl1.getCompanyId());
            matchResult.setCompanyName(enterpriseOwl1.getCompanyName());
            matchResult.setName(enterpriseOwl1.getName());
            matchResult.setAddInfo(enterpriseOwl1.getAddInfo());
            matchResult.setNum(enterpriseOwl1.getNum());
            matchResult.setTime(enterpriseOwl1.getTime());
            //服务质量参数匹配
            double[] qos_supplier=new double[4];
            if (enterpriseOwl.getCost()>=enterpriseOwl1.getCost()) {//比较成本
                qos_supplier[0]=1;
            }else {
                qos_supplier[0]=0;
            }
            qos_supplier[1]=enterpriseOwl1.getSpeed();
            qos_supplier[2]=enterpriseOwl1.getReliability();
            qos_supplier[3]=enterpriseOwl1.getReputation();
            //计算服务质量相似度
            double qos= VectorSimilarity.calculateSimilarity(qos_mro,qos_supplier);
            matchResult.setQos(qos);
            //服务能力相似度计算
            double[] serviceCapability=new double[3];
            //判断服务时间
           serviceCapability[2]= VectorSimilarity.calculateTimeInterval(enterpriseOwl.getTime(),enterpriseOwl1.getTime());
            //判断数量
            serviceCapability[1]= VectorSimilarity.calcaulteNumInterval(Integer.parseInt(enterpriseOwl.getNum()),enterpriseOwl1.getNum());
            //判断资源名称相似度，调用python
            LOGGER.info("调用python接口");
            double temp= 0;
            try {
                temp = SimilarityByPython.getSimilarity(enterpriseOwl.getName(),enterpriseOwl1.getName());
                LOGGER.info("python接口返回结果："+temp);
            }
            catch (IOException e) {
                LOGGER.error("python服务调用异常,即将使用字符串编辑距离比较语义相似度");
            }
            if (temp==0) {
                temp=CompareStrSimUtil.getSimilarityRatio(enterpriseOwl.getName(),enterpriseOwl1.getName(),true);
                LOGGER.info("python接口结果不理想，语义编辑距离："+temp);
            }
            serviceCapability[0]=temp;
            //计算服务能力匹配度
            double service= VectorSimilarity.calculateSimilarity(new double[]{1,1,1},serviceCapability);
            matchResult.setServiceCapability(service);
            matchResult.setAll(matchResult.getQos()*0.3+matchResult.getServiceCapability()*0.7);
            resultList.add(matchResult);
        }
        return resultList;
    }
}
