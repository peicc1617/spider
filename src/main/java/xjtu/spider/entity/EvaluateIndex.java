package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-04 16:27:32
 **/
@Data
public class EvaluateIndex {
    private int indexIdForIdentify;//指标唯一标识
    private String indexName;
    private String indexDesc;
    private double minValue;
    private double maxValue;
}
