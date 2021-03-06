package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.EvaluateIndex;
import xjtu.spider.entity.IndexsOfTask;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-04 20:21:04
 **/
@Repository
@Mapper
public interface IndexOfTaskMapper {
    /***
     * @函数功能：判断用户名下taskId是否存在
     * @param taskId:
     * @param userName:
     * @return：boolean
     */
    @Select("SELECT COUNT(*) FROM indexs_of_task WHERE task_id=#{taskId} AND user_name=#{userName}")
    public boolean isExistByTaskId(Long taskId,String userName);
    @Select("INSERT INTO indexs_of_task (task_id,evaluate_name,description,evaluate_indexs,user_name) VALUES(#{taskId},#{evaluateName},#{description},#{evaluateIndexs},#{userName})")
    public void addIndexsByTaskId(IndexsOfTask indexsOfTask);
    @Select("SELECT * FROM indexs_of_task WHERE task_id=#{taskId} AND user_name=#{userName}")
    public IndexsOfTask getIndexsByTaskId(long taskId,String userName);
    @Select("UPDATE indexs_of_task SET value=#{indexValues},weight=#{indexWeights} WHERE task_id=#{taskId} AND user_name=#{userName}")
    public void saveValueAndWeight(Long taskId,String indexValues,String indexWeights,String userName);
}
