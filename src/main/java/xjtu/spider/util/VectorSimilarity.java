package xjtu.spider.util;

/**
 * @基本功能:向量余弦相似度计算
 * @program:spider
 * @author:peicc
 * @create:2020-04-22 22:40:21
 **/
public class VectorSimilarity {
    public static double calculateSimilarity(double[] num1,double[] num2){
        double sum=0;//存储两两乘积
        double sum1=0;//存储num1的平方和
        double sum2=0;//存储num2的平方和
        for (int i = 0; i <num1.length ; i++) {
            sum+=num1[i]*num2[i];
            sum1+=num1[i]*num1[i];
            sum2+=num2[i]*num2[i];
        }
        double res=(double) (sum/Math.sqrt(sum1*sum2));
        return res;
    }
    /***
     * @函数功能：计算时间区间
     * @param str1:需求参数
     * @param str2:服务提供商参数
     * @return：double
     */
    public static double calculateTimeInterval(String str1,String str2){
        double res=0;
        double[] request=parseInterval(str1);
        double[] supplier=parseInterval(str2);
        if (request[1]<supplier[0]) {
            res=0;
        } else if (request[1]>supplier[1]) {
            res=1;
        } else {
            double a=request[1]-supplier[0]+1;
            double b=supplier[1]-supplier[0]+1;
            res=a/b;
        }
        return res;
    }
    /***
     * @函数功能：计算数量
     * @param num:需求数量
     * @param str2:
     * @return：double
     */
    public static double calcaulteNumInterval(int num,String str2){
        double[] num2=parseInterval(str2);
        if (num<=num2[1]) {
            return 1;
        } else {
            return 0;
        }
    }

    /***
     * @函数功能：解析区间型数值
     * @param str:
     * @return：double
     */
    public static double[] parseInterval(String str){
        double res[]=new double[2];
        int a=str.indexOf("[");
        int b=str.indexOf(",");
        int c=str.indexOf("]");
        res[0]=Double.valueOf(str.substring(a+1,b));
        String temp=str.substring(b+1,c);
        if (temp.equals("+")) {
            res[1]=Double.MAX_VALUE;
        } else {
            res[1]=Double.valueOf(temp);
        }
        return res;
    }
}
