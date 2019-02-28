package com.augurit.gzsw.sms.service.impl;

import com.augurit.gzsw.domain.SMS;
import com.augurit.gzsw.domain.SMSUser;
import com.augurit.gzsw.sms.entity.SMSSendResults;
import com.augurit.gzsw.sms.mapper.SMSMapper;
import com.augurit.gzsw.sms.mapper.SMSUserMapper;
import com.augurit.gzsw.sms.service.SMSService;
import com.github.qcloudsms.SmsMultiSenderResult;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <b><code>SMSServiceImpl</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/2/20 14:50.
 *
 * @author virvil
 * @since awater ${PROJECT_VERSION}
 */
@Service
public class SMSServiceImpl implements SMSService {

    private static final String REMAIN = "0";  //保存短信
    private static final String ALL_SUCCESS = "1"; //全部发送成功
    private static final String ALL_FAIL = "2"; //全部发送失败
    private static final String HAS_FAIL = "3"; //部分发送失败

    @Autowired
    private SMSMapper smsMapper;

    @Autowired
    private SMSUserMapper smsUserMapper;

    @Override
    public SMS getSMS(String id) throws Exception {

        SMS sms = smsMapper.getSMS(id);
        if (sms != null){
            sms.setReceivers(smsUserMapper.listSMSUsers(sms.getId(),null));
        }
        return sms;
    }

    @Override
    public List<SMS> listSMSs(List<String> ids, SMS sms) throws Exception {
        List<SMS> smsList = smsMapper.listSMSs(ids, sms);
        for (SMS smsItem : smsList){
            smsItem.setReceivers(smsUserMapper.listSMSUsers(smsItem.getId(),null));
        }
        return smsList;
    }

    @Override
    public void saveSMS(SMS sms, SMSSendResults smsSendResults, List<SmsMultiSenderResult.Detail> details)throws Exception {

        for(SMSSendResults.SMSSendResult result : smsSendResults.getResults()) {
            String mobile = result.getMobile();
            String status = "0";// 保存短信

            // 用户为空且没有手机号码的情况，一般是不会存在这样的情况
            if(result.getReciever() == null && StringUtils.isEmpty(mobile)) {
                continue;
            }

            // 特殊处理没有手机号码的用户
            if(result.getReciever() != null && StringUtils.isEmpty(mobile)) {
                status = "3";

                if(!smsSendResults.isHasFailed()) {
                    smsSendResults.setHasFailed(true);
                }

                // 用户没有保留手机号码，所以result的isSuccess为true，因为没有短信发送失败一说
                result.setResultMsg("用户没有保留手机号码");

                // 保存信息
                SMSUser smsUser = new SMSUser();
                smsUser.setSmsId(sms.getId());
                smsUser.setReceiverId(result.getReciever().getUserId());
                smsUser.setPhone(mobile);
                smsUser.setStatus(status);
                smsUser.setErrorMsg(result.getResultMsg());
                smsUserMapper.saveSMSUser(smsUser);
                continue;
            }

            if(details != null) {// 发送了短信
                status = "2";
                for(SmsMultiSenderResult.Detail detail : details) {
                    if(detail.mobile.equals(mobile)) {
                        if(detail.result == 0) {
                            status = "1";

                            if(smsSendResults.isAllFailed()) {
                                smsSendResults.setAllFailed(false);
                            }
                        } else {// 短信发送失败
                            if(!smsSendResults.isHasFailed()) {
                                smsSendResults.setHasFailed(true);
                            }

                            // 记录描述状态
                            result.setSuccess(false);
                            result.setResultMsg(detail.errmsg);
                        }
                        //处理完对应手机号码的用户退出循环
                        break;
                    }
                }
            }

            SMSUser smsUser = new SMSUser();
            smsUser.setSmsId(sms.getId());
            smsUser.setReceiverId(result.getReciever() == null? "": result.getReciever().getUserId());
            smsUser.setPhone(mobile);
            smsUser.setStatus(status);
            smsUser.setErrorMsg(StringUtils.defaultIfEmpty(result.getResultMsg(), ""));
            smsUserMapper.saveSMSUser(smsUser);

        }


        // 最后保存短信内容
        if(details != null) {// 非保存短信情况下处理
            if(smsSendResults.isAllFailed()){
                sms.setStatus(ALL_FAIL);
            } else if(smsSendResults.isHasFailed()) {
                sms.setStatus(HAS_FAIL);
            } else {
                sms.setStatus(ALL_SUCCESS);
            }
        }else{
            //保存短信
            sms.setStatus(REMAIN);
        }
        smsMapper.saveSMS(sms);
    }

    @Override
    public int updSMS(String id, String sendTime, String status) throws Exception {
        return smsMapper.updSMS(id, sendTime, status);
    }

    public void delSMSs(List<String> ids)throws Exception{

        if(CollectionUtils.isNotEmpty(ids)){
            for (String id : ids){
                smsMapper.delSMS(id);
                smsUserMapper.delSMSUser(id);
            }
        }
    }

    @Override
    public List<SMSUser> listSMSUsers(String smsId,String searchText)throws Exception{
        return smsUserMapper.listSMSUsers(smsId, searchText);
    }

    @Override
    public void resendSMS(SMS sms, SMSSendResults smsSendResults, List<SmsMultiSenderResult.Detail> details) throws Exception {
        for(SMSSendResults.SMSSendResult result : smsSendResults.getResults()) {
            String mobile = result.getMobile();
            String recieverId = result.getRecieverId();

            // 特殊处理没有手机号码的用户
            if(StringUtils.isNotEmpty(recieverId) && StringUtils.isEmpty(mobile)) {
                continue;
            }

            String status = "2";// “失败”标识
            for(SmsMultiSenderResult.Detail detail : details) {
                if(detail.mobile.equals(mobile)) {
                    if(detail.result == 0) {
                        if(smsSendResults.isAllFailed()) {
                            smsSendResults.setAllFailed(false);
                        }
                        status = "1";
                    } else {// 短信发送失败
                        // 记录描述状态
                        result.setSuccess(false);
                        result.setResultMsg(detail.errmsg);
                        if(!smsSendResults.isHasFailed()) {
                            smsSendResults.setHasFailed(true);
                        }
                    }

                    break;
                }
            }
            SMSUser smsUser = new SMSUser();
            smsUser.setSmsId(sms.getId());
            smsUser.setReceiverId(recieverId);
            smsUser.setPhone(mobile);
            smsUser.setStatus(status);
            smsUser.setErrorMsg( StringUtils.defaultIfEmpty(result.getResultMsg(), ""));
            smsUserMapper.updSMSUser(smsUser);
        }

        // 更新短信的状态信息
        if(smsSendResults.isAllFailed()){
            sms.setStatus(ALL_FAIL);
        } else if(smsSendResults.isHasFailed()) {
            sms.setStatus(HAS_FAIL);
        } else {
            sms.setStatus(ALL_SUCCESS);
        }
        smsMapper.updSMS(sms.getId(),sms.getSendTime(),sms.getStatus());
    }
}
