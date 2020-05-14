package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.OEEData;
import xjtu.spider.entity.Task;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-05-14 16:12:59
 **/
@Repository
@Mapper
public interface TaskListMapper {
    /***
     * @函数功能：根据用户名获取任务列表
     * @param :
     * @return：java.util.List<xjtu.spider.entity.OEEData>
     */
    @Select("SELECT task_id,description FROM ${tableName} WHERE user_name=#{userName} ORDER BY task_id")
    public List<Task> getTaskListByUserName(String tableName,String userName);
}
