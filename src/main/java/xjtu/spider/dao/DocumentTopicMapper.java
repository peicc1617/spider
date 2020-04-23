package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.DocumentTopic;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-15 19:13:08
 **/
@Repository
@Mapper
public interface DocumentTopicMapper {
    @Select("Select * FROM enterprisetopics")
    List<DocumentTopic> getAll();
}
