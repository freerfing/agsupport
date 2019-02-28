package com.augurit.gzsw.sms.controller;

import com.augurit.gzsw.ApiResponse;
import com.augurit.gzsw.DefaultIdGenerator;
import com.augurit.gzsw.RespCodeMsgDepository;
import com.augurit.gzsw.base.role.service.UserRoleService;
import com.augurit.gzsw.domain.SMS;
import com.augurit.gzsw.domain.SMSUser;
import com.augurit.gzsw.domain.User;
import com.augurit.gzsw.domain.UserRole;
import com.augurit.gzsw.manager.user.service.UserService;
import com.augurit.gzsw.sms.entity.SMSSendResults;
import com.augurit.gzsw.sms.service.SMSService;
import com.augurit.gzsw.util.SMSSender;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.qcloudsms.SmsMultiSenderResult;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * <b><code>SMSController</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/2/20 14:45.
 *
 * @author virvil
 * @since awater ${PROJECT_VERSION}
 */
@RestController
@RequestMapping("sms")
public class SMSController {

    private static final Logger logger = LoggerFactory.getLogger(SMSController.class);

    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    @Autowired
    private SMSService smsService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRoleService userRoleService;

    /**
     * 发送短信
     * @param sms
     * @param phones
     * @return
     */
    @RequestMapping("send")
    public ApiResponse send(SMS sms,String phones)throws Exception{

        String nowTimeStr = dateTimeFormatter.format(LocalDateTime.now());
        ObjectMapper object = new ObjectMapper();
        System.out.println(object.writeValueAsString(sms));
        System.out.println(phones);
        try {
            User sender = userService.getUser(sms.getSenderId());
            if (null == sender){
                return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL,"未找到发送人信息");
            }
            sms.setSender(sender);
        }catch(Exception e){
            logger.error("通过用户ID[" + sms.getSenderId() + "]找不到发送人信息", e);
            return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL,"未找到发送人信息");
        }
        sms.setId(DefaultIdGenerator.getIdForStr());
        sms.setCreateTime(nowTimeStr);
        sms.setSendTime(nowTimeStr);
        // 短信发送结果对象
        SMSSendResults results = new SMSSendResults();

        List<String> userIds = new ArrayList<String>();
        if(StringUtils.isNotEmpty(sms.getRecieverIds())) {
            userIds = Lists.newArrayList(sms.getRecieverIds().split(","));
        }

        try {
            if (CollectionUtils.isNotEmpty(userIds)) {
                List<User> receivers = userService.listUsers(userIds);
                for (User receiver : receivers){
                    results.addResult(receiver, receiver.getTel());
                }
            }

            if (StringUtils.isNotBlank(phones)){
                String[] mobiles = phones.split(",");
                for (String mobile : mobiles){
                    results.addResultIfMobileNotExisted(mobile);
                }
            }

            SmsMultiSenderResult smsMultiSenderResult = SMSSender.sendSms((ArrayList<String>) results.exportMobiles(), sms.getSender().getUserName() + ": " + sms.getContent());
            if (smsMultiSenderResult == null || smsMultiSenderResult.details == null){
                return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL);
            }

            //保存信息到数据库并设置记录results中每个用户的接收情况
            smsService.saveSMS(sms, results, smsMultiSenderResult.details);

            List<SMSSendResults.SMSSendResult> failedResults = results.getFailedResults();
            if (CollectionUtils.isNotEmpty(failedResults)){
                if (failedResults.size() == results.getResults().size()){
                    //全失败
                    return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL);
                }else if(failedResults.size() <= 3){
                    //少数失败，展示失败的接收人列表
                    String resultMsg = "发送短信部分失败，失败接收人列表：";
                    boolean isFirstTime = true;
                    for(SMSSendResults.SMSSendResult result : failedResults) {
                        if(isFirstTime) {
                            isFirstTime = false;
                        } else {
                            resultMsg += ",";
                        }
                        resultMsg += (result.getReciever() == null ? result.getMobile() : result.getReciever().getUserName());
                        return new ApiResponse(RespCodeMsgDepository.SMS_SEND_HAS_FAIL,resultMsg);
                    }
                }else{
                    String resultMsg = "短信发送存在" + failedResults.size() + "次失败, 请进入“短信管理”查看发送详情";
                    return new ApiResponse(RespCodeMsgDepository.SMS_SEND_HAS_FAIL,resultMsg);
                }
            }

        }catch (Exception e){
            logger.error("发送短信出现异常",e);
            return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL);
        }
        return new ApiResponse("发送短信成功");
    }

    /**
     * 保存短信
     * @param sms
     * @param phones
     * @return
     * @throws Exception
     */
    @RequestMapping("save")
    public ApiResponse save(SMS sms,String phones){
        String nowTimeStr = dateTimeFormatter.format(LocalDateTime.now());

        try {
            User sender = userService.getUser(sms.getSenderId());
            if (null == sender){
                return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL,"未找到发送人信息");
            }
        }catch(Exception e){
            logger.error("通过用户ID[" + sms.getSenderId() + "]找不到用户信息", e);
            return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL,"未找到发送人信息");
        }
        sms.setId(DefaultIdGenerator.getIdForStr());
        sms.setCreateTime(nowTimeStr);
        sms.setSendTime(nowTimeStr);
        // 短信发送结果对象
        SMSSendResults results = new SMSSendResults();

        List<String> userIds = new ArrayList<String>();
        if(StringUtils.isNotEmpty(sms.getRecieverIds())) {
            userIds = Lists.newArrayList(sms.getRecieverIds().split(","));
        }

        try {
            if (CollectionUtils.isNotEmpty(userIds)) {
                List<User> receivers = userService.listUsers(userIds);
                for (User receiver : receivers){
                    results.addResult(receiver, receiver.getTel());
                }
            }

            if (StringUtils.isNotBlank(phones)){
                String[] mobiles = phones.split(",");
                for (String mobile : mobiles){
                    results.addResultIfMobileNotExisted(mobile);
                }
            }

            //保存信息到数据库
            smsService.saveSMS(sms, results, null);

        }catch (Exception e){
            logger.error("保存短信出现异常",e);
            return new ApiResponse(RespCodeMsgDepository.SMS_KEEP_FAIL,"短信发送失败");
        }
        return new ApiResponse("保存短信成功");
    }

    @RequestMapping("remove")
    public ApiResponse removeSMS(String ids) throws Exception{

        List<String> smsIds = new ArrayList<>();
        if (StringUtils.isNotBlank(ids)){
            smsIds = Arrays.asList(ids.split(","));
        }
        smsService.delSMSs(smsIds);
        return new ApiResponse("删除短信成功");
    }

    /**
     * 查看短信列表根据短信ids，短信状态，短信内容模糊查询
     * @param ids 暂时作为保留字段，信息id，以，分割
     * @param sms
     * @param pageNum
     * @param pageSize
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("list")
    public ApiResponse listSMSs(String ids, SMS sms, Integer pageNum, Integer pageSize, HttpServletRequest request)
            throws Exception{
        List<String> smsids = null;
        if(StringUtils.isNotEmpty(ids)) {
            smsids = Arrays.asList(ids.split(","));
        }

        //获取正在操作的用户
        User sender = null;
        if(StringUtils.isNotEmpty(sms.getSenderId())) {
            sender = userService.getUser(sms.getSenderId());
        } else {
//            sender = userService.getUserByUserName(CasLoginHelpClient.getLoginName(req));
//            sms.setSenderId(sender.getUserId());
        }
        // 获取正在操作的用户的角色， 判断是否具备查询所有用户短信发送的权限
        List<UserRole> userRoles = userRoleService.listByUserId(sender.getUserId());
        for(UserRole userRole : userRoles) {
            // 平台管理员、超级管理员、管理员（信息中心）
            if(userRole.getRoleId().equals("5317bade-5c74-4aad-bbc7-7365b5b44db0")
                    || userRole.getRoleId().equals("2")
                    || userRole.getRoleId().equals("c80d80c4-9840-4081-ab52-a7924af75004")) {
                //sms的senderId不为null时，则只可查看该senderId对应的短信，否则可查看所有短信
                sms.setSenderId(null);
                break;
            }
        }
        PageHelper.startPage(pageNum, pageSize);
        List<SMS> smsList = smsService.listSMSs(smsids, sms);

        // 设置短信发送人对象信息
        for(SMS ssmItem : smsList) {

            if(sender.getUserId().equals(ssmItem.getSenderId())) {
                ssmItem.setSender(sender);
                continue;
            }

            if(ssmItem.getSender() == null) {
                ssmItem.setSender(userService.getUser(ssmItem.getSenderId()));
            }
        }
        PageInfo pageInfo = new PageInfo(smsList);
        return new ApiResponse(pageInfo);
    }

    @RequestMapping("getSMS")
    public ApiResponse getSMS(String id) throws Exception{
        SMS sms = smsService.getSMS(id);
        return new ApiResponse(sms);
    }

    @RequestMapping("listSMSUser")
    public ApiResponse listSMSUser(String smsId,String searchText,Integer pageNum,Integer pageSize)throws Exception{
        PageHelper.startPage(pageNum, pageSize);
        List<SMSUser> smsUsers = smsService.listSMSUsers(smsId, searchText);
        PageInfo pageInfo = new PageInfo(smsUsers);
        return new ApiResponse(pageInfo);
    }

    @RequestMapping("resendSMS")
    public ApiResponse resendSMS(String senderId, String smsId, String ids, HttpServletRequest req) throws Exception {
        String nowTimeStr = dateTimeFormatter.format(LocalDateTime.now());
        // 短信发送结果对象
        SMSSendResults results = new SMSSendResults();
        // ids: xxx_15112080342,yyyy_15112080342,...
        String[] userIdAndPhones = ids.split(",");
        for(String userIdAndPhone : userIdAndPhones) {
            String[] items = userIdAndPhone.split("_");
            SMSSendResults.SMSSendResult result = new SMSSendResults.SMSSendResult();
            result.setRecieverId(items[0]);
            result.setMobile(items[1]);
            results.addResult(result);
        }

        SMS sms = smsService.getSMS(smsId);
        // 设置短信发送人相关信息
        User sender = null;
        if(StringUtils.isNotEmpty(senderId)) {
            sender = userService.getUser(senderId);
        } else {
//            sender = iswUser.findUserByName(CasLoginHelpClient.getLoginName(req));
        }
        sms.setSender(sender);
        sms.setSendTime(nowTimeStr);
        SmsMultiSenderResult result = SMSSender.sendSms((ArrayList<String>) results.exportMobiles(), sms.getSender().getUserName() + ": " + sms.getContent());

        if (result == null || result.details == null) {
            return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL,"重新发送短信失败");
        }

        try {

            smsService.resendSMS(sms, results, result.details);

            List<SMSSendResults.SMSSendResult> failedResults = results.getFailedResults();
            if(CollectionUtils.isNotEmpty(failedResults)) {
                if(failedResults.size() == results.getResults().size()) {// 全失败
                    return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL);
                } else if(failedResults.size() <= 3) {
                    String resultMsg = "重新发送短信部分失败，失败接收人号码列表：";
                    boolean isFirstTime = true;

                    for(SMSSendResults.SMSSendResult item : failedResults) {
                        if(isFirstTime) {
                            isFirstTime = false;
                        } else {
                            resultMsg += ",";
                        }

                        resultMsg += item.getMobile();
                    }
                    return new ApiResponse(RespCodeMsgDepository.SMS_SEND_HAS_FAIL,resultMsg);
                } else {
                    String resultMsg = "重发短信发送存在" + failedResults.size() + "次失败, 请进入“短信管理”查看发送详情";
                    return new ApiResponse(RespCodeMsgDepository.SMS_SEND_HAS_FAIL,resultMsg);
                }
            }

        } catch (Exception e) {
            logger.error("重发短信异常",e);
            return new ApiResponse(RespCodeMsgDepository.SMS_SEND_FAIL,"重发短信出现异常");
        }

        return new ApiResponse("发送短信成功");
    }
}
