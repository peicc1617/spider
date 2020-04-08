package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.OEEData;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-07 21:23:41
 **/
@Repository
@Mapper
public interface OEEDataMapper {
    /*** 
     * @函数功能：
     * @param oeeData:
     * @return：void
     */
    @Select("REPLACE INTO oee_data (task_id,description,data) VALUES(#{taskId},#{description},#{data})")
    public void saveOEEDataByTaskId(OEEData oeeData);
    /*** 
     * @函数功能：
     * @param taskId:
     * @return：xjtu.spider.entity.OEEData
     */
    @Select("SELECT description,data FROM oee_data WHERE task_id=#{taskId}")
    public OEEData getOEEDataByTaskId(int taskId);
    /***
     * @函数功能：保存OEE计算结果
     * @param taskId:
     * @param indexs:
     * @return：void
     */
    @Select("UPDATE oee_data SET indexs=#{indexs} WHERE task_id=#{taskId}")
    public void saveIndexsByTaskId(int taskId,String indexs);
    /***
     * @函数功能：根据服务任务id获取OEE指标，用于监控
     * @param taskId:
     * @return：java.lang.String
     */
    @Select("SELECT indexs FROM oee_data WHERE task_id=#{taskId}")
    public String getIndexsByTaskId(int taskId);
}
