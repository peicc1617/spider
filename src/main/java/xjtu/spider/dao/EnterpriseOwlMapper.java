package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.EnterpriseOwl;

import java.util.List;

@Repository
@Mapper
public interface EnterpriseOwlMapper {
    @Select("REPLACE INTO enterprise_owl (companyId,companyName,name,description,num,time,addInfo,cost,speed,reliability,reputation)" +
            "VALUES (#{companyId},#{companyName},#{name},#{description},#{num},#{time},#{addInfo},#{cost},#{speed},#{reliability},#{reputation})")
    public void add(EnterpriseOwl enterpriseOwl);
    @Select("SELECT * FROM enterprise_owl")
    public List<EnterpriseOwl> getAllMROsOfOWL();
    @Select("SELECT * FROM enterprise_owl WHERE companyId=#{companyId}")
    public EnterpriseOwl getEnterpriseOwlByCompanyId(int companyId);
}
