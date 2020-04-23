package xjtu.spider.util;

import java.util.Scanner;

/**
 * @基本功能:
 * @program:summary
 * @author:peicc
 * @create:2020-03-26 21:40:34
 **/
public class Similarity {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("请输入向量维数：");
        int n=sc.nextInt();
        String str0=sc.next();
        String[] arr0=str0.split(",");
        double[] num0=new double[n];
        double sum0=0;
        for (int i = 0; i <arr0.length ; i++) {
            num0[i]=Double.parseDouble(arr0[i]);
            sum0+=num0[i]*num0[i];
        }
        while (sc.hasNext()) {
            String str2=sc.next();
            String[] arr2=str2.split(",");
            double[] num2=new double[n];
            double sum1=0;
            double sum=0;
            for (int i = 0; i <arr2.length ; i++) {
                num2[i]=Double.parseDouble(arr2[i]);
                sum1+=num2[i]*num2[i];
                sum+=num0[i]*num2[i];
            }
            double res=(double) (sum/Math.sqrt(sum0*sum1));
            System.out.println(res);
        }
    }
}
