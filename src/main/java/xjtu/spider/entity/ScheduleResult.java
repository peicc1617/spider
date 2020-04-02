package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-02 16:16:24
 **/
@Data
public class ScheduleResult {
    private String request;
    private String subRequest;
    private String supplier;
    private int startTime;
    private int endTime;
}
