package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-22 21:58:00
 **/
@Data
public class MatchResult {
    private int companyId;
    private String companyName;
    private String name;
    private String addInfo;
    private String num;
    private String time;
    private double serviceCapability;
    private double qos;
    private double all;
}
