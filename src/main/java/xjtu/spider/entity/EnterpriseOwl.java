package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-15 17:21:54
 **/
@Data
public class EnterpriseOwl {
    private int id;
    private int companyId;
    private String companyName;
    private String name;
    private String description;
    private String num;//区间[a,b]
    private String time;//区间
    private String addInfo;
    private double cost;
    private double speed;
    private double reliability;
    private double reputation;
}
