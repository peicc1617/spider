package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.SearchURL;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-07 15:14:42
 **/
@Repository
@Mapper
public interface URLMapper {
    @Select("SELECT url FROM ${tableName} WHERE state=0")
    List<String> getURLsOfZeroState(@Param("tableName") String tableName);

    @Select("SELECT * FROM ${tableName}")
    List<SearchURL> getAll(@Param("tableName") String tableName);

    @Select("SELECT * FROM ${tableName} WHERE state=0")
    List<SearchURL> getAllOfZeroState(@Param("tableName") String tableName);

    @Select("insert into ${tableName} (url,searchKey) values (#{url},#{searchKey})")
    void add(@Param("tableName") String tableName,@Param("url") String url,@Param("searchKey") String searchKey);

    @Select("update ${tableName} set state=1 where url=#{url}")
    void delete(@Param("tableName") String tableName,@Param("url") String url);

    /***
     * @函数功能：取出该条链接对应的搜索关键字
     * @param tableName:
     * @param url:
     * @return：java.lang.String
     */
    @Select("SELECT searchKey from ${tableName} WHERE url=#{url} Limit 1")
    String getSearchKey(@Param("tableName") String tableName,@Param("url") String url);
    /***
     * @函数功能：判断待爬取链searchKey接是否已经存在
     * @param tableName:
     * @param url:
     * @return：boolean
     */
    @Select("select count(1) from ${tableName} where url=#{url}")
    boolean containsURL(@Param("tableName") String tableName,@Param("url") String url);

    @Select("update ${tableName} set state=0")
    void reset(@Param("tableName") String tableName);

    @Select("select count(1) from ${tableName} where state=1")
    int size(@Param("tableName") String tableName);
    /***
     * @函数功能：主要用于获取已爬出链接数量和未爬虫链接数量，用来填充spider.html页面
     * @param tableName:
     * @param state:
     * @return：int
     */
    @Select("select count(1) from ${tableName} where state=#{state}")
    int getDataPOfSpider(@Param("tableName") String tableName,@Param("state") int state);
}
