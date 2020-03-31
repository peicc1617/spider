package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.MRORequest;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-03-31 17:14:00
 **/
@Repository
@Mapper
public interface MRORequestMapper {
    @Select("INSERT INTO request_info (task_id,machine,description,request_content) VALUES (#{taskId},#{machine},#{description},#{requestContent})")
    public void add(MRORequest mroRequest);
    /***
     * @函数功能：根据任务ID获取MRO服务需求
     * @param taskId:
     * @return：java.lang.String
     */
    @Select("SELECT * FROM request_info WHERE task_id=#{taskId}" )
    public MRORequest getRequest(Long taskId);
}
