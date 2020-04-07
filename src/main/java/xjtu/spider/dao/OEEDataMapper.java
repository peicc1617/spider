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
    @Select("SELECT * FROM oee_data WHERE task_id=#{taskId}")
    public OEEData getOEEDataByTaskId(int taskId);
}
