package xjtu.spider.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import xjtu.spider.entity.EvaluateIndex;
import xjtu.spider.entity.IndexsOfTask;

import java.util.List;

@Repository
@Mapper
public interface EvaluateIndexMapper {
    /***
     * @函数功能：添加指标
     * @param evaluateIndex:
     * @return：void
     */
    @Select("INSERT INTO evaluate_index (index_id_for_identify,index_name,index_desc,min_value,max_value,index_type) VALUES (#{indexIdForIdentify},#{indexName},#{indexDesc},#{minValue},#{maxValue},#{indexType})")
    public void addIndex(EvaluateIndex evaluateIndex);
    /***
     * @函数功能：获取所有指标
     * @param :
     * @return：java.util.List<xjtu.spider.entity.EvaluateIndex>
     */
    @Select("SELECT * FROM evaluate_index")
    public List<EvaluateIndex> getAllIndexs();
    /***
     * @函数功能：查询当前指标个数
     * @param :
     * @return：int
     */
    @Select("SELECT MAX(index_id_for_identify) FROM evaluate_index")
    public int getMaxIndexIdForIdentify();
    /***
     * @函数功能：删除指标
     * @param indexIdForIdentify:
     * @return：void
     */
    @Select("DELETE FROM evaluate_index where index_id_for_identify=#{indexIdForIdentify}")
    public void deleteIndex(int indexIdForIdentify);
    @Select("SELECT * FROM evaluate_index where index_id_for_identify=#{ indexIdForIdentify}")
    public EvaluateIndex getIndexsForTaskId(Long  indexIdForIdentify);
}
