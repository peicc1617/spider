package xjtu.spider.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xjtu.spider.dao.MRORequestMapper;
import xjtu.spider.dao.MROSupplierMapper;
import xjtu.spider.entity.MRORequest;
import xjtu.spider.entity.MROSupplier;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-03-31 17:28:02
 **/
@Service
public class ScheduleService {
    @Autowired
    private MRORequestMapper requestMapper;
    @Autowired
    private MROSupplierMapper mroSupplierMapper;
    /***
     * @函数功能：保存MRO服务需求信息
     * @param :
     * @return：void
     */
    public void addRequest(MRORequest mroRequest){
        requestMapper.add(mroRequest);
    }
    public MRORequest getRequest(Long taskId){
        return requestMapper.getRequest(taskId);
    }
    /***
     * @函数功能：保存MRO服务提供商信息
     * @param mroSupplier:
     * @return：void
     */
    public void addSupplier(MROSupplier mroSupplier){
        mroSupplierMapper.add(mroSupplier);
    }
    public MROSupplier getSupplier(Long taskId){
        return mroSupplierMapper.getSupplier(taskId);
    }
}
