package xjtu.spider.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

import java.util.Arrays;

/**
 * @基本功能:
 * @program:spider
 * @author:peicc
 * @create:2020-02-13 21:19:27
 **/
@Component
public class UserNameAspect {
    @Pointcut("execution(* xjtu.spider.controller.*.*(..))")
    public void servicePointerCut(){}
    @Before("servicePointerCut()")
    public void doBefore(JoinPoint joinPoint) throws InterruptedException{
        Class aClass = joinPoint.getThis().getClass();
        System.out.println("@Before：模拟权限检查...");
        System.out.println("@Before：目标方法为：" +
                joinPoint.getSignature().getDeclaringTypeName() +
                "." + joinPoint.getSignature().getName());
        System.out.println("@Before：参数为：" + Arrays.toString(joinPoint.getArgs()));
        System.out.println("@Before：被织入的目标对象为：" + joinPoint.getTarget());

    }
}
