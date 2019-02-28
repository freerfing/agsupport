package com.augurit.gzsw.sms.mapper;

import com.augurit.gzsw.domain.SMSUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <b><code>SMSUser</code></b>
 * <p/>
 * Description
 * <p/>
 * <b>Creation Time:</b> 2019/2/21 11:18.
 *
 * @author virvil
 * @since awater ${PROJECT_VERSION}
 */
@Mapper
public interface SMSUserMapper {
    List<SMSUser> listSMSUsers(@Param("smsId") String smsId, @Param("searchText") String searchText) throws Exception;
    int saveSMSUser(SMSUser smsUser) throws Exception;
    int delSMSUser(String smsId)throws Exception;
    int updSMSUser(SMSUser smsUser)throws Exception;
}
