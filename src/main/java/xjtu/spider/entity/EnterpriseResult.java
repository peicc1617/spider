package xjtu.spider.entity;

import lombok.Data;

import java.util.Date;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-01-15 10:29:04
 **/
@Data
public class EnterpriseResult {
    private long id;
    private long companyId;
    private String companyName;
    private String description;//经营范围
    private String result;
    private Date createTime;
}
