package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-07 21:19:30
 **/
@Data
public class OEEData {
    private int id;
    private int taskId;
    private String description;
    private String data;
    private String indexs;
    private String userName;
}
