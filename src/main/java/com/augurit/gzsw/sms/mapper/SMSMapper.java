package com.augurit.gzsw.sms.mapper;

import com.augurit.gzsw.domain.SMS;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * <b><code>SMSMapper</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/2/21 11:14.
 *
 * @author virvil
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface SMSMapper {
    SMS getSMS(String id) throws Exception;

    List<SMS> listSMSs(@Param("ids") List<String> ids, @Param("sms") SMS sms)throws Exception;

    int saveSMS(SMS sms) throws Exception;

    int updSMS(@Param("id")String id, @Param("sendTime")String sendTime, @Param("status")String status)throws Exception;

    int delSMS(String id)throws Exception;
}
