package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-01 21:39:13
 **/
@Data
public class GAPara {
    private Long id;
    private String time;
    private String cost;
    private int requestNum;//MRO需求数
    private int supplierNum;//MRO服务提供商数
    private int populationNumber;
    private double crossProbability;
    private double mutationProbabilit;
}
