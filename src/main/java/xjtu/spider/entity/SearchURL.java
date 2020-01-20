package xjtu.spider.entity;

import lombok.Data;

import java.util.Date;

/**
 * @基本功能:待爬取链接实体
 * @program:spider
 * @author:peicc
 * @create:2020-01-08 17:44:04
 **/
@Data
public class SearchURL {
    private int id;
    private String href;
    private int state;
    private String searchKey;
    private Date createTime;
}
