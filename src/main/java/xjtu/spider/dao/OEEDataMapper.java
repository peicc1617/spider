package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.OEEData;

import java.util.List;

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
    @Select("INSERT INTO oee_data (task_id,description,data,user_name) VALUES(#{taskId},#{description},#{data},#{userName})")
    public void saveOEEDataByTaskId(OEEData oeeData);
    /*** 
     * @函数功能：
     * @param taskId:
     * @return：xjtu.spider.entity.OEEData
     */
    @Select("SELECT description,data FROM oee_data WHERE task_id=#{taskId}")
    public OEEData getOEEDataByTaskId(int taskId);
    /***
     * @函数功能：根据用户名和任务ID获取数据
     * @param taskId:
     * @param userName:
     * @return：xjtu.spider.entity.OEEData
     */
    @Select("SELECT description,data FROM oee_data WHERE task_id=#{taskId} AND user_name=#{userName}")
    public OEEData getOEEDataByTaskIdAndUserName(int taskId,String userName);
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
    /***
     * @函数功能：根据用户名获取任务列表
     * @param :
     * @return：java.util.List<xjtu.spider.entity.OEEData>
     */
    @Select("SELECT * FROM oee_data WHERE user_name=#{userName}")
    public List<OEEData> getTaskListByUserName(String userName);
    /***
     * @函数功能：根据用户名查询任务列表
     * @param userName:
     * @return：java.util.List<java.lang.Integer>
     */
    @Select("SELECT task_id FROM oee_data WHERE user_name=#{userName}")
    public List<Integer> getTaskIdByUserName(String userName);
}
