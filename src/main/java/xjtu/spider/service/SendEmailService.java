package xjtu.spider.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.MimeMessage;
import java.io.File;

/**
 * @基本功能: 发送邮件
 * @program:spider
 * @author:peicc
 * @create:2020-05-20 16:49:42
 **/
@Service
public class SendEmailService {
    private Logger LOGGER= LoggerFactory.getLogger(getClass());
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private MailProperties mailProperties;
    @Autowired
    private TemplateEngine templateEngine;
    public void sendEmail(String email){
        MimeMessage mimeMessage=null;
        try {
            mimeMessage=javaMailSender.createMimeMessage();
            MimeMessageHelper helper=new MimeMessageHelper(mimeMessage,true);
            //设置发件人邮箱
            helper.setFrom(this.mailProperties.getUsername());
            //设置收件人邮箱
            helper.setTo(email);
            // 设置邮件主题
            helper.setSubject("MRO运行监控");
            // 设置邮件内容
            Context context=new Context();
            context.setVariable("userName","裴长城");
            context.setVariable("email","email");
            String content=this.templateEngine.process("mail",context);
            helper.setText(content,true);
            String filePath="C:\\Users\\peicc\\Desktop\\MRO运行监控.png";
            FileSystemResource fileSystemResource = new FileSystemResource(new File(filePath));
            String fileName = filePath.substring(filePath.lastIndexOf(File.separator));
            helper.addAttachment(fileName, fileSystemResource);
            helper.addInline("imageId",fileSystemResource);
            this.javaMailSender.send(mimeMessage);
            LOGGER.info("发送邮件成功");
        } catch (Exception e) {
            LOGGER.error("发送邮件失败");
        }

    }
}
