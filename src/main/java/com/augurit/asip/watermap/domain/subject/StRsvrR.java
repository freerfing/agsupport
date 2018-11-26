package com.augurit.asip.watermap.domain.subject;

import java.util.Date;

/**
 * Created by ac on 2017-07-20.
 *
 * 水库水情实体类
 */
public class StRsvrR {

    /**
     * 编号(主键)
     */
    private Long id;

    /**
     * 测站编码
     */
    private String stcd;

    /**
     * 时间
     */
    private Date tm;

    /**
     * 库上水位
     */
    private String rz;

    /**
     * 入库流量
     */
    private String inq;

    /**
     * 蓄水量
     */
    private String w;

    /**
     * 库下水位
     */
    private String blrz;

    /**
     * 出库流量
     */
    private String otq;

    /**
     * 库水特征码
     */
    private String rwchrcd;

    /**
     * 库水水势
     */
    private String rwptn;

    /**
     * 入流时段长
     */
    private String inqdr;

    /**
     * 测流方法
     */
    private String msqmt;
}
