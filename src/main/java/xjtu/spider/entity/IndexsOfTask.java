package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-04 20:18:22
 **/
@Data
public class IndexsOfTask {
    private int id;
    private int taskId;
    private String evaluateName;
    private String evaluateDesc;
    private String evaluateIndexs;
    private String value;//指标取值
    private String weight;//权重
}
