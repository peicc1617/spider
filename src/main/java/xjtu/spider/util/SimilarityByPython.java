package xjtu.spider.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-04-23 13:53:21
 **/
public class SimilarityByPython {
    public static void main(String[] args) throws IOException {
        Map<String,String> params=new HashMap<>();
        params.put("para1","滚动轴承");
        params.put("para2","机床");
        String res=HttpUtil.sendHttpRequest("http://127.0.0.1:5000/python/serviceCapability/",params);
    }
    public  static double getSimilarity(String str1,String str2) throws IOException {
        Map<String,String> params=new HashMap<>();
        params.put("para1",str1);
        params.put("para2",str2);
        String res=HttpUtil.sendHttpRequest("http://127.0.0.1:5000/python/serviceCapability/",params);
        return Double.valueOf(res);
    }
}
