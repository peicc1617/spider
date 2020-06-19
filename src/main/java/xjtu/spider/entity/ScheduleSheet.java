package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-01 19:03:42
 **/
@Data
public class ScheduleSheet {
    private Long id;
    private Long taskId;
    private String data;//数据
    private String userName;
}
