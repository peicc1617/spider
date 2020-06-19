package xjtu.spider.entity;

import lombok.Data;

import java.util.Date;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-03-31 17:11:02
 **/
@Data
public class MRORequest {
    private long id;
    private long taskId;//任务id
    private String machine;//工业产品
    private String description;// 服务任务描述
    private String requestContent;//MRO服务需求内容
    private String userName;//用户名
}
