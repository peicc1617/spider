package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.MRORequest;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-03-31 17:14:00
 **/
@Repository
@Mapper
public interface MRORequestMapper {
    @Select("REPLACE INTO request_info (task_id,machine,description,request_content,user_name) VALUES (#{taskId},#{machine},#{description},#{requestContent},#{userName})")
    public void add(MRORequest mroRequest);
    /***
     * @函数功能：根据任务ID获取MRO服务需求
     * @param taskId:
     * @return：java.lang.String
     */
    @Select("SELECT * FROM request_info WHERE task_id=#{taskId}" )
    public MRORequest getRequest(Long taskId);
    /***
     * @函数功能：根据任务ID和用户名获取MRO服务需求
     * @param taskId:
     * @return：java.lang.String
     */
    @Select("SELECT * FROM request_info WHERE task_id=#{taskId} AND user_name=#{userName}" )
    public MRORequest getRequestByTaskIdAndUserName(Long taskId,String userName);
    /***
     * @函数功能：根据用户名查询任务列表
     * @param userName:
     * @return：java.util.List<java.lang.Integer>
     */
    @Select("SELECT task_id FROM request_info WHERE user_name=#{userName}")
    public List<Long> getTaskIdByUserName(String userName);
}
