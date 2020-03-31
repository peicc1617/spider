package xjtu.spider.entity;

import lombok.Data;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-03-31 20:13:20
 **/
@Data
public class MROSupplier {
    private long id;
    private long  taskId;//任务id
    private String supplierContent;//MRO服务提供商
}
