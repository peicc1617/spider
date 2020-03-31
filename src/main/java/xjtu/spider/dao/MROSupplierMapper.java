package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.MRORequest;
import xjtu.spider.entity.MROSupplier;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-03-31 20:16:22
 **/
@Repository
@Mapper
public interface MROSupplierMapper {
    @Select("INSERT INTO supplier_info (task_id,supplier_content) VALUES (#{taskId},#{supplierContent})")
    public void add(MROSupplier mroSupplier);
    /***
     * @函数功能：根据任务ID获取MRO服务提供商
     * @param taskId:
     * @return：java.lang.String
     */
    @Select("SELECT * FROM supplier_info WHERE task_id=#{taskId}" )
    public MROSupplier getSupplier(Long taskId);
}
