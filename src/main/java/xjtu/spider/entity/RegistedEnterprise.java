package xjtu.spider.entity;

import lombok.Data;

import java.util.Date;

/**
 * @基本功能:注册的企业
 * @program:spider
 * @author:peicc
 * @create:2020-01-17 14:57:01
 **/
@Data
public class RegistedEnterprise {
    private long id;
    private long ownerId;// 所属企业
    private String companyName;
    private String label;// 标签
    private int score;//得分
    private String state;//经营状态
    private String area;//地区
    private String description;//经营范围
    private String searchKey;//搜索关键字
    private String phoneNumber;//联系方式
    private Date gmtCreate;//主动插入时间
    private Date gmtModified;//被动修改时间
    private int isSegment;// 是否已分词

}
