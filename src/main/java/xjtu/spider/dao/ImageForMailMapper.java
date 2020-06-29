package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-06-29 16:19:48
 **/
@Repository
@Mapper
public interface ImageForMailMapper {
    @Select("REPLACE INTO image_mail (image,task_id) VALUES (#{image},#{taskId})")
    public void saveImageForMail(String image,long taskId);
    @Select("SELECT image FROM image_mail WHERE task_id=#{taskId}")
    public String getImageForMail(long taskId);
}
