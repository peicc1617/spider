package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.EnterpriseResult;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-15 10:35:01
 **/
@Mapper
@Repository
public interface EnterpriseResultMapper {
    @Select("INSERT INTO enterpriseResult (companyId,companyName,description,result) VALUES (#{companyId},#{companyName},#{description},#{result})")
    public void add(EnterpriseResult enterpriseResult);
    @Select("SELECT * FROM enterpriseresult")
    public List<EnterpriseResult> getEnterpriseResult();
}
