package xjtu.spider.entity;

import lombok.Data;

import java.util.Date;

/**
 * @基本功能:企业实体
 * @program:spider
 * @author:peicc
 * @create:2020-01-07 12:45:11
 **/
@Data
public class Enterprise {
    private long id;
    private String companyName;
    private String href;
    private String label;// 标签
    private int score;//得分
    private String state;//经营状态
    private String area;//地区
    private String description;//经营范围
    private String searchKey;//搜索关键字
    private Date createTime;//爬取时间
    private int segment;// 是否已分词
    public Enterprise() {
    }

}
