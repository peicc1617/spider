package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.ScheduleSheet;

/**
 * @基本功能:排程表
 * @program:spider
 * @author:peicc
 * @create:2020-04-01 19:01:08
 **/
@Repository
@Mapper
public interface ScheduleSheetMapper {
    @Select("REPLACE INTO schedule_sheet (task_id,data,user_name) VALUES (#{taskId},#{data},#{userName})")
    public void addSheet(ScheduleSheet scheduleSheet);
    @Select("SELECT data FROM schedule_sheet WHERE task_id=#{taskId} AND user_name=#{userName}")
    public ScheduleSheet getDataByTaskId(Long taskId,String userName);
}
