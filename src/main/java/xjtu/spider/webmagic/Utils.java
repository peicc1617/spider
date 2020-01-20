package xjtu.spider.webmagic;

import java.io.*;
import java.util.HashSet;
import java.util.Set;

/**
 * @基本功能:工具类
 * @program:spider
 * @author:peicc
 * @create:2020-01-08 16:34:27
 **/
public class Utils {
    //公司名称处理
    public static String correctCompanyName(String companyName){
        String regex="<\\S*>";// 正则表达式，匹配<em>、</em>
        String[] str=companyName.split(regex);
        String res="";
        if (str.length>1) {
            for (int i = 0; i <str.length ; i++) {
                res=res+str[i];
            }
        } else {
            res=companyName;
        }
        return res;
    }
    //加载停用词
    public static Set getStopWords(String path) throws IOException {
        HashSet<String> set=new HashSet<>();
        BufferedReader br = null;
        br = new BufferedReader(new InputStreamReader(new FileInputStream(path), "utf-8"));

        String line;
        while((line = br.readLine()) != null) {
            set.add(line);
        }
        br.close();
        return set;
    }
}
