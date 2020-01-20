package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.RegistedEnterprise;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-17 16:23:19
 **/
@Repository
@Mapper
public interface RegistedEnterpriseMapper {
    /***
     * @函数功能：向数据库中插入一条企业注册信息
     * @param registedEnterprise:
     * @return：boolean
     */
    @Select("INSERT INTO registed_enterprise (company_name,label,state,area,description,search_key) VALUES (#{companyName},#{label},#{state},#{area},#{description},#{searchKey})")
    void add(RegistedEnterprise registedEnterprise);
}
