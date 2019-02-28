package com.augurit.gzsw.sms.service;

import com.augurit.gzsw.domain.SMS;
import com.augurit.gzsw.domain.SMSUser;
import com.augurit.gzsw.sms.entity.SMSSendResults;
import com.github.qcloudsms.SmsMultiSenderResult;

import java.util.List;

/**
 * <b><code>SMSService</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/2/20 14:49.
 *
 * @author virvil
 * @since awater ${PROJECT_VERSION}
 */
public interface SMSService {
    SMS getSMS(String id) throws Exception;

    List<SMS> listSMSs(List<String> ids,SMS sms)throws Exception;

    void saveSMS(SMS sms, SMSSendResults smsSendResults, List<SmsMultiSenderResult.Detail> details)throws Exception;

    int updSMS(String id,String sendTime,String status)throws Exception;

    void delSMSs(List<String> ids) throws Exception;

    List<SMSUser> listSMSUsers(String smsId,String searchText)throws Exception;

    void resendSMS(SMS sms, SMSSendResults smsSendResults, List<SmsMultiSenderResult.Detail> details)throws Exception;
}
