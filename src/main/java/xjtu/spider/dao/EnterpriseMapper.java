package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.Enterprise;
import xjtu.spider.entity.EnterpriseStatistics;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-08 15:49:03
 **/
@Repository
@Mapper
public interface EnterpriseMapper {
    @Select("INSERT INTO enterprise (companyName,href,label,score,state,area,description,searchKey) VALUES (#{companyName},#{href},#{label},#{score},#{state},#{area},#{description},#{searchKey})")
    void add(Enterprise enterprise);
    /***
     * @函数功能：判断数据库中是否存在该企业（考虑到公司有重名的可能，故加上链接一起判断公司是否重复）
     * @param href:
     * @return：boolean
     */
    @Select("SELECT count(1) FROM enterprise WHERE companyName=#{companyName} AND href=#{href}")
    boolean containsCompany(@Param("companyName") String companyName,@Param("href") String href);

    @Select("SELECT * FROM enterprise WHERE segment=0 ")
    List<Enterprise> getAllOfZeroSegment();

    @Select("UPDATE enterprise set segment=1 where id=#{id}")
    void update(@Param("id") long id);

    /***
     * @函数功能：重置
     * @param :
     * @return：void
     */
    @Select("UPDAT enterprise set segment=0")
    void reset();

    @Select("SELECT companyName,description,area,score FROM enterprise WHERE searchKey=#{searchWord} or description like CONCAT('%',#{searchWord},'%') UNION SELECT companyName,description,area,score FROM enterprise1 WHERE description like CONCAT('%',#{searchWord},'%') ORDER BY score DESC")
    List<Enterprise> getEnterpriseBySearchWord(@Param("searchWord") String searchWord);
    @Select("SELECT searchKey as 'type', COUNT(searchKey) as 'num' from enterprise GROUP BY searchKey ")
    List<EnterpriseStatistics> getAllOfStatistics();
    @Select("SELECT area as 'type', COUNT(area) as 'num' from enterprise GROUP BY area ")
    List<EnterpriseStatistics> getAllOfStatisticsByProvince();
}
