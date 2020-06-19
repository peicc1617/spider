package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.MRORequest;
import xjtu.spider.entity.MROSupplier;

import java.util.List;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-03-31 20:16:22
 **/
@Repository
@Mapper
public interface MROSupplierMapper {
    @Select("REPLACE INTO supplier_info (task_id,supplier_content,user_name) VALUES (#{taskId},#{supplierContent},#{userName})")
    public void add(MROSupplier mroSupplier);
    /***
     * @函数功能：根据任务ID获取MRO服务提供商
     * @param taskId:
     * @return：java.lang.String
     */
    @Select("SELECT * FROM supplier_info WHERE task_id=#{taskId}" )
    public MROSupplier getSupplier(Long taskId);
    /***
     * @函数功能：根据任务ID和用户名获取MRO服务提供商
     * @param taskId:
     * @return：java.lang.String
     */
    @Select("SELECT * FROM supplier_info WHERE task_id=#{taskId} AND user_name=#{userName}" )
    public MROSupplier getSupplierByTaskIdAndUserName(Long taskId,String userName);
    /***
     * @函数功能：根据用户名查询任务列表
     * @param userName:
     * @return：java.util.List<java.lang.Integer>
     */
    @Select("SELECT task_id FROM supplier_info WHERE user_name=#{userName}")
    public List<Long> getTaskIdByUserName(String userName);
}
