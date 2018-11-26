package com.augurit.asip.watermap.sc.subject.dao;

import com.augurit.asip.watermap.domain.subject.*;
import com.common.dbcp.DBHelper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Repository
public class SubjectDao {

    /**
     * 分页查询河道信息
     *
     * @param page
     * @return
     * @throws Exception
     */
    public List<Map> listStRiverRPage(Object page) throws Exception {
        String sql = "select t.* from st_river_r t";
        List<Map> list = DBHelper.findPage("spring.datasource", page, sql, null);
        //Pager e = PageUtil.initPager(page);
        return list;
    }

    /**
     * 根据id获取水库信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    public Map getReservoirById(Integer id) throws Exception {
        String sql = "select s.*, b.x, b.y, b.stnm from skxx s, sde_sw.st_stbprp_b b where s.czbm = b.stcd(+) and s.id =" + id;
        Map map = DBHelper.findFirst("spring.datasource", sql, null);
        return map;
    }

    /**
     * 根据id查询一条降雨量信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    public Map<String, Object> getStPptnRById(Integer id) throws Exception {
        String sql = "select s.*, b.x, b.y, b.stnm from st_pptn_r s, sde_sw.st_stbprp_b b where s.stcd = b.stcd(+) and s.id =" + id;
        Map map = DBHelper.findFirst("spring.datasource", sql, null);
        return map;
    }

    /**
     * 查询过去一周的水库水位情况
     *
     * @param map
     * @return
     * @throws Exception
     */
    public List<Map> queryLastweekWaterStage(Map<String, Object> map) throws Exception {
        String sql = "select * from skxx where zm = '" + map.get("zm") + "' and sbsj in"
                + " (to_date(?, 'yyyy-mm-dd'), to_date(?, 'yyyy-mm-dd'), to_date(?, 'yyyy-mm-dd'), to_date(?, 'yyyy-mm-dd'),"
                + " to_date(?, 'yyyy-mm-dd'), to_date(?, 'yyyy-mm-dd'), to_date(?, 'yyyy-mm-dd'))";
        List<Map> list = DBHelper.find("spring.datasource", sql, (List) map.get("dateList"));
        return list;
    }

    /**
     * 查询测站点近五天的降雨情况
     *
     * @param map
     * @return
     * @throws Exception
     */
    public List<Map> queryRecentRainfall(Map<String, Object> map) throws Exception {
        String sql = "select * from st_pptn_r where stcd = '" + map.get("stcd") + "' and tm in"
                + " (to_date(?, 'yyyy-mm-dd'), to_date(?, 'yyyy-mm-dd'), to_date(?, 'yyyy-mm-dd'), to_date(?, 'yyyy-mm-dd'),"
                + " to_date(?, 'yyyy-mm-dd'))";
        List<Map> list = DBHelper.find("spring.datasource", sql, (List) map.get("dateList"));
        return list;
    }

    /*
     * 查询河涌
     *
     */
    public List<Map> listRiversPage(SlgRv slgRv, Object pager) throws Exception {
        String sql = "select * from WRP_RVR_BSIN";
        //String sql = "select OBJECTID,RVCD,RVNM,ALIAS,RVTP,DWWT,DWWTCD,HWPS,HWEL,ESPS,ESEL,DTPL,RVLEN,AVGG,CTAR,AVANRNAM,ANRNSTDV,DTUPDT,SSLYDM,SSLYMC,HDDJ,XZQ,HCFL,HZ_SHI,HZ_QU,ISKQY,F35,F187,F1368,SJFHBZ,SJPLBZ,SGNYJQ,SGNEJQ,SGNQSZMB,HLPJKD,SMMJ,XGR,XGBM,XGRQ,HZRV,RVOV,HZ_JIEDAO,REMARK from WRP_RVR_BSIN ";
        //String sql = "select RVCD,RVNM,ALIAS,RVTP,DWWT,DWWTCD,HWPS,HWEL,ESPS,ESEL,DTPL,RVLEN,AVGG from WRP_RVR_BSIN";
        List params = new ArrayList();
        if (slgRv != null) {

            String subSql = "";

            if (!slgRv.getRvcdnm().equals("")) {
                //'%' || #{zm} || '%'
                subSql = " (rvcd like '%'||?||'%' or rvnm like '%'||?||'%') ";
                params.add(slgRv.getRvcdnm());
                params.add(slgRv.getRvcdnm());
            }

            if (!slgRv.getRvcd().equals("")) {
                subSql += "and rvcd like '%'||?||'%' ";
                params.add(slgRv.getRvcd());
            }

            if (!slgRv.getRvnm().equals("")) {
                subSql += "and rvnm like '%'||?||'%' ";
                params.add(slgRv.getRvnm());
            }

            if (!slgRv.getRvlen1().equals("")) {
                subSql += "and rvlen >= ? ";
                params.add(slgRv.getRvlen1());
            }

            if (!slgRv.getRvlen2().equals("")) {
                subSql += "and rvlen <= ? ";
                params.add(slgRv.getRvlen2());
            }

            if (!slgRv.getXzq().equals("")) {
                subSql += "and xzq like '%'||?||'%' ";
                params.add(slgRv.getXzq());
            }

            if (!slgRv.getSslymc().equals("")) {
                subSql += "and sslymc like '%'||?||'%' ";
                params.add(slgRv.getSslymc());
            }


            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by rvcd asc ";

        }
        System.out.println(sql);
        System.out.println(params.size());
        //List<Map> list = DBHelper.find("spring.datasource", sql, params);


        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        if (list != null) {
            int i = 0;
            for (i = 0; i < list.size(); i++) {
                Object DTUPDT = list.get(i).get("DTUPDT");
                if (DTUPDT != null && DTUPDT.toString().length() > 10)
                    list.get(i).put("DTUPDT", DTUPDT.toString().substring(0, 10));
            }
        }

        return list;

    }

    /*
     * 查询河涌35条黑臭河涌
     *
     */
    public List<Map> listRiversPage_35(SlgRv slgRv, Object pager) throws Exception {
        String sql = "select * from WRP_RVR_BSIN where F35 is not null";
        List params = new ArrayList();
        if (slgRv != null) {
            String subSql = "";
            if (!slgRv.getRvcdnm().equals("")) {
                subSql = "and (rvcd like '%'||?||'%' or rvnm like '%'||?||'%') ";
                params.add(slgRv.getRvcdnm());
                params.add(slgRv.getRvcdnm());
            } else {
                if (!slgRv.getRvcd().equals("")) {
                    subSql += "and rvcd like '%'||?||'%' ";
                    params.add(slgRv.getRvcd());
                }
                if (!slgRv.getRvnm().equals("")) {
                    subSql += "and rvnm like '%'||?||'%' ";
                    params.add(slgRv.getRvnm());
                }
                if (!slgRv.getRvlen1().equals("")) {
                    subSql += "and rvlen >= ? ";
                    params.add(slgRv.getRvlen1());
                }
                if (!slgRv.getRvlen2().equals("")) {
                    subSql += "and rvlen <= ? ";
                    params.add(slgRv.getRvlen2());
                }
                if (!slgRv.getXzq().equals("")) {
                    subSql += "and xzq like '%'||?||'%' ";
                    params.add(slgRv.getXzq());
                }
                if (!slgRv.getSslymc().equals("")) {
                    subSql += "and sslymc like '%'||?||'%' ";
                    params.add(slgRv.getSslymc());
                }
            }
            sql += (subSql.equals("") ? "" : " ") + subSql + " order by rvcd asc ";
        }
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);
        if (list != null) {
            int i = 0;
            for (i = 0; i < list.size(); i++) {
                Object DTUPDT = list.get(i).get("DTUPDT");
                if (DTUPDT != null && DTUPDT.toString().length() > 10)
                    list.get(i).put("DTUPDT", DTUPDT.toString().substring(0, 10));
            }
        }
        return list;
    }
    /*
         * 查询152条黑臭河涌
         *
         */
    public List<Map> listRiversPage_152(SlgRv slgRv, Object pager) throws Exception {
        String sql = "select * from WRP_RVR_BSIN where F187 is not null and F35 is null";
        List params = new ArrayList();
        if (slgRv != null) {
            String subSql = "";
            if (!slgRv.getRvcdnm().equals("")) {
                subSql = "and (rvcd like '%'||?||'%' or rvnm like '%'||?||'%') ";
                params.add(slgRv.getRvcdnm());
                params.add(slgRv.getRvcdnm());
            } else {
                if (!slgRv.getRvcd().equals("")) {
                    subSql += "and rvcd like '%'||?||'%' ";
                    params.add(slgRv.getRvcd());
                }
                if (!slgRv.getRvnm().equals("")) {
                    subSql += "and rvnm like '%'||?||'%' ";
                    params.add(slgRv.getRvnm());
                }
                if (!slgRv.getRvlen1().equals("")) {
                    subSql += "and rvlen >= ? ";
                    params.add(slgRv.getRvlen1());
                }
                if (!slgRv.getRvlen2().equals("")) {
                    subSql += "and rvlen <= ? ";
                    params.add(slgRv.getRvlen2());
                }
                if (!slgRv.getXzq().equals("")) {
                    subSql += "and xzq like '%'||?||'%' ";
                    params.add(slgRv.getXzq());
                }
                if (!slgRv.getSslymc().equals("")) {
                    subSql += "and sslymc like '%'||?||'%' ";
                    params.add(slgRv.getSslymc());
                }
            }
            sql += (subSql.equals("") ? "" : " ") + subSql + " order by rvcd asc ";
        }
        System.out.println(sql);
        System.out.println(params.size());
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);
        if (list != null) {
            int i = 0;
            for (i = 0; i < list.size(); i++) {
                Object DTUPDT = list.get(i).get("DTUPDT");
                if (DTUPDT != null && DTUPDT.toString().length() > 10)
                    list.get(i).put("DTUPDT", DTUPDT.toString().substring(0, 10));
            }
        }
        return list;
    }
    /*
     * 查询187条黑臭河涌
     *
     */
    public List<Map> listRiversPage_187(SlgRv slgRv, Object pager) throws Exception {
        String sql = "select * from WRP_RVR_BSIN where F187 is not null";
        List params = new ArrayList();
        if (slgRv != null) {
            String subSql = "";
            if (!slgRv.getRvcdnm().equals("")) {
                subSql = "and (rvcd like '%'||?||'%' or rvnm like '%'||?||'%') ";
                params.add(slgRv.getRvcdnm());
                params.add(slgRv.getRvcdnm());
            } else {
                if (!slgRv.getRvcd().equals("")) {
                    subSql += "and rvcd like '%'||?||'%' ";
                    params.add(slgRv.getRvcd());
                }
                if (!slgRv.getRvnm().equals("")) {
                    subSql += "and rvnm like '%'||?||'%' ";
                    params.add(slgRv.getRvnm());
                }
                if (!slgRv.getRvlen1().equals("")) {
                    subSql += "and rvlen >= ? ";
                    params.add(slgRv.getRvlen1());
                }
                if (!slgRv.getRvlen2().equals("")) {
                    subSql += "and rvlen <= ? ";
                    params.add(slgRv.getRvlen2());
                }
                if (!slgRv.getXzq().equals("")) {
                    subSql += "and xzq like '%'||?||'%' ";
                    params.add(slgRv.getXzq());
                }
                if (!slgRv.getSslymc().equals("")) {
                    subSql += "and sslymc like '%'||?||'%' ";
                    params.add(slgRv.getSslymc());
                }
            }
            sql += (subSql.equals("") ? "" : " ") + subSql + " order by rvcd asc ";
        }
        System.out.println(sql);
        System.out.println(params.size());
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);
        if (list != null) {
            int i = 0;
            for (i = 0; i < list.size(); i++) {
                Object DTUPDT = list.get(i).get("DTUPDT");
                if (DTUPDT != null && DTUPDT.toString().length() > 10)
                    list.get(i).put("DTUPDT", DTUPDT.toString().substring(0, 10));
            }
        }
        return list;
    }

    /**
     * 查询水闸
     *
     * @param wrpBluBsinGate
     * @return
     */
    public List<Map> listGatesPage(WrpBluBsinGate wrpBluBsinGate, Object pager) {
        String sql = "select * from WRP_SLU_BSIN";
        List params = new ArrayList();
        if (wrpBluBsinGate != null) {

            String subSql = "";

            if (!wrpBluBsinGate.getSlcdnm().equals("")) {
                //'%' || #{zm} || '%'
                subSql = " ( slcd like '%'||?||'%' or slnm like '%'||?||'%' ) ";
                params.add(wrpBluBsinGate.getSlcdnm());
                params.add(wrpBluBsinGate.getSlcdnm());
            }

            if (!wrpBluBsinGate.getSlcd().equals("")) {
                subSql += "and slcd like '%'||?||'%' ";
                params.add(wrpBluBsinGate.getSlcd());
            }

            if (!wrpBluBsinGate.getSlnm().equals("")) {
                subSql += "and slnm like '%'||?||'%' ";
                params.add(wrpBluBsinGate.getSlnm());
            }

            if (!wrpBluBsinGate.getXzq().equals("")) {
                subSql += "and xzq like '%'||?||'%' ";
                params.add(wrpBluBsinGate.getXzq());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by slcd asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }

    /**
     * 查询泵站
     *
     * @param wrpIdsBsinPump
     * @return
     */
    public List<Map> listPumpsPage(WrpIdsBsinPump wrpIdsBsinPump, Object pager) {
        String sql = "select * from WRP_IDS_BSIN";
        List params = new ArrayList();
        if (wrpIdsBsinPump != null) {

            String subSql = "";

            if (!wrpIdsBsinPump.getIdstcdnm().equals("")) {
                //'%' || #{zm} || '%'
                subSql = "( idstcd like '%'||?||'%' or idstnm like '%'||?||'%' ) ";
                params.add(wrpIdsBsinPump.getIdstcdnm());
                params.add(wrpIdsBsinPump.getIdstcdnm());
            }

            if (!wrpIdsBsinPump.getIdstcd().equals("")) {
                subSql += "and idstcd like '%'||?||'%' ";
                params.add(wrpIdsBsinPump.getIdstcd());
            }

            if (!wrpIdsBsinPump.getIdstnm().equals("")) {
                subSql += "and idstnm like '%'||?||'%' ";
                params.add(wrpIdsBsinPump.getIdstnm());
            }

            if (!wrpIdsBsinPump.getXzq().equals("")) {
                subSql += "and xzq like '%'||?||'%' ";
                params.add(wrpIdsBsinPump.getXzq());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by idstcd asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }

    /**
     * 查询湖泊
     *
     * @param slgLake
     * @return
     */
    public List<Map> listLakesPage(SlgLake slgLake, Object pager) {
        String sql = "select * from WRP_LAK_BSIN";
        List params = new ArrayList();
        if (slgLake != null) {

            String subSql = "";

            if (!slgLake.getLkcdnm().equals("")) {
                //'%' || #{zm} || '%'
                subSql = " ( lkcd like '%'||?||'%' or lknm like '%'||?||'%' ) ";
                params.add(slgLake.getLkcdnm());
                params.add(slgLake.getLkcdnm());
            }

            if (!slgLake.getLkcd().equals("")) {
                subSql += "and lkcd like '%'||?||'%' ";
                params.add(slgLake.getLkcd());
            }

            if (!slgLake.getLknm().equals("")) {
                subSql += "and lknm like '%'||?||'%' ";
                params.add(slgLake.getLknm());
            }

            if (!slgLake.getXzq().equals("")) {
                subSql += "and xzq like '%'||?||'%' ";
                params.add(slgLake.getXzq());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by lkcd asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }

    /**
     * 查询堤防
     *
     * @param wrpLevBsinDike
     * @return
     */
    public List<Map> listDikesPage(WrpLevBsinDike wrpLevBsinDike, Object pager) {
        String sql = "select * from WRP_LEV_BSIN";
        List params = new ArrayList();
        if (wrpLevBsinDike != null) {

            String subSql = "";

            if (!wrpLevBsinDike.getLvcdnm().equals("")) {
                //'%' || #{zm} || '%'
                subSql = " (lvcd like '%'||?||'%' or lvnm like '%'||?||'%' ) ";
                params.add(wrpLevBsinDike.getLvcdnm());
                params.add(wrpLevBsinDike.getLvcdnm());
            }

            if (!wrpLevBsinDike.getLvcd().equals("")) {
                subSql += "and lvcd like '%'||?||'%' ";
                params.add(wrpLevBsinDike.getLvcd());
            }

            if (!wrpLevBsinDike.getLvnm().equals("")) {
                subSql += "and lvnm like '%'||?||'%' ";
                params.add(wrpLevBsinDike.getLvnm());
            }


            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by lvcd asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }

    /**
     * 查询水库
     *
     * @param wrpRsrBsinRes
     * @return
     */
    public List<Map> listRessPage(WrpRsrBsinRes wrpRsrBsinRes, Object pager) {
        String sql = "select * from WRP_RSR_BSIN";
        List params = new ArrayList();
        if (wrpRsrBsinRes != null) {

            String subSql = "";

            if (!wrpRsrBsinRes.getRscdnm().equals("")) {
                //'%' || #{zm} || '%'
                subSql = " ( rscd like '%'||?||'%' or rsnm like '%'||?||'%' ) ";
                params.add(wrpRsrBsinRes.getRscdnm());
                params.add(wrpRsrBsinRes.getRscdnm());
            }
            
            if (!wrpRsrBsinRes.getRscd().equals("")) {
                subSql += "and rscd like '%'||?||'%' ";
                params.add(wrpRsrBsinRes.getRscd());
            }

            if (!wrpRsrBsinRes.getRsnm().equals("")) {
                subSql += "and rsnm like '%'||?||'%' ";
                params.add(wrpRsrBsinRes.getRsnm());
            }
            
            if (!wrpRsrBsinRes.getAddvcd().equals("")) {
                subSql += "and addvcd = ? ";
                params.add(wrpRsrBsinRes.getAddvcd());
            }
            
            if (!wrpRsrBsinRes.getXzq().equals("")) {
                subSql += "and xzq = ? ";
                params.add(wrpRsrBsinRes.getXzq());
            }
            
            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by rscd asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }


    /**
     * 水质监测站
     *
     * @param wqWqsinfB
     * @return
     */
    public List<Map> listWqsinfBPage(WqWqsinfB wqWqsinfB, Object pager) {
        String sql = "select * from WQ_WQSINF_B";
        List params = new ArrayList();
        if (wqWqsinfB != null) {

            String subSql = "";

            subSql = " where sttp = ? ";
            params.add(wqWqsinfB.getSttp());

            if (!wqWqsinfB.getStcdnm().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (stcd like '%'||?||'%' or stnm like '%'||?||'%') ";
                params.add(wqWqsinfB.getStcdnm());
                params.add(wqWqsinfB.getStcdnm());
            }

            if (!wqWqsinfB.getStcd().equals("")) {
                subSql += "and stcd like '%'||?||'%' ";
                params.add(wqWqsinfB.getStcd());
            }

            if (!wqWqsinfB.getStnm().equals("")) {
                subSql += "and stnm like '%'||?||'%' ";
                params.add(wqWqsinfB.getStnm());
            }

            if (!wqWqsinfB.getAddvcd().equals("")) {
                subSql += "and addvcd = ? ";
                params.add(wqWqsinfB.getAddvcd());
            }

            sql += subSql + " order by stcd asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }


    /**
     * 测站点分页
     *
     * @param stStbprpB
     * @return
     */
    public List<Map> listStStbprpBPage(StStbprpB stStbprpB, Object pager) {
        String sql = "select * from ST_STBPRP_B";
        List params = new ArrayList();
        if (stStbprpB != null) {

            String subSql = "";
            
            if(stStbprpB.getSttp().equals("PP"))
            {
            	sql = "select * from ST_STBPRP_B where nvl(usfl,1)!=0 and COOX is not null and COOY is not null and stcd in(select distinct stcd from ST_STITEM_B where mnit = 3) ";
            }
            else 
            {
                subSql = " where sttp = ? ";
                params.add(stStbprpB.getSttp());
			}
            
            if (!stStbprpB.getStcdnm().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (stcd like '%'||?||'%' or stnm like '%'||?||'%') ";
                params.add(stStbprpB.getStcdnm());
                params.add(stStbprpB.getStcdnm());
            }

            if (!stStbprpB.getStcd().equals("")) {
                subSql += "and stcd like '%'||?||'%' ";
                params.add(stStbprpB.getStcd());
            }

            if (!stStbprpB.getStnm().equals("")) {
                subSql += "and stnm like '%'||?||'%' ";
                params.add(stStbprpB.getStnm());
            }

            if (!stStbprpB.getAddvcd().equals("")) {
                subSql += "and addvcd = ? ";
                params.add(stStbprpB.getAddvcd());
            }
            
            if (!stStbprpB.getUsfl().equals("")) {
                subSql += "and LNNVL(usfl = ?) ";
                params.add(stStbprpB.getUsfl());
            } 

            sql += subSql + " order by stcd asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }


    public void updateRiverData(WrpRvrBsin rvrBsin) throws Exception {
        String[] pks = {"rvcd"};
        DBHelper.save("spring.datasource", "WRP_RVR_BSIN", pks, Arrays.asList(rvrBsin));
    }

    public void updateLakeData(WrpLakBsin lakBsin) throws Exception {
        String[] pks = {"lkcd"};
        DBHelper.save("spring.datasource", "WRP_LAK_BSIN", pks, Arrays.asList(lakBsin));
    }

    public void updateRessData(WrpRsrBsin rsrBsin) throws Exception {
        String[] pks = {"rscd"};
        DBHelper.save("spring.datasource", "WRP_RSR_BSIN", pks, Arrays.asList(rsrBsin));
    }

    public void updateGatesData(WrpSluBsin sluBsin) throws Exception {
        String[] pks = {"slcd"};
        DBHelper.save("spring.datasource", "WRP_SLU_BSIN", pks, Arrays.asList(sluBsin));
    }

    public void updatePumpsData(WrpIdsBsin idsBsin) throws Exception {
        String[] pks = {"idstcd"};
        DBHelper.save("spring.datasource", "WRP_IDS_BSIN", pks, Arrays.asList(idsBsin));
    }

    public List<WrpSluBsin> getGatesById(String Id) {
        String sql = "SELECT * FROM WRP_SLU_BSIN t where t.SLCD = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", WrpSluBsin.class, sql, values);
    }

    public List<WrpIdsBsin> getPumpsById(String Id) {
        String sql = "SELECT * FROM WRP_IDS_BSIN t where t.IDSTCD = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", WrpIdsBsin.class, sql, values);
    }

    public void updateWaterQuality(WqWqsinfB wqWqsinfB) throws Exception {
        String[] pks = {"stcd"};
        DBHelper.save("spring.datasource", "WQ_WQSINF_B", pks, Arrays.asList(wqWqsinfB));
    }

    public List<WqWqsinfB> getWaterQualityById(String Id, String type) {
        String sql = "SELECT * FROM WQ_WQSINF_B t where t.STCD = ? and t.STTP = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        values.add(type);
        return DBHelper.find("spring.datasource", WqWqsinfB.class, sql, values);
    }

    public void updateDike(WrpLevBsin wrpLevBsin) throws Exception {
        String[] pks = {"lvcd"};
        DBHelper.save("spring.datasource", "WRP_LEV_BSIN", pks, Arrays.asList(wrpLevBsin));
    }

    public List<WrpLevBsin> getDikeById(String Id) {
        String sql = "SELECT * FROM WRP_LEV_BSIN t where t.LVCD = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", WrpLevBsin.class, sql, values);
    }


    public List<StStbprpB> getStationByStcdAndSttp(String stcd, String sttp) {
        String sql = "";
        List<Object> values = new ArrayList<Object>();
        values.add(stcd);
        if (!("PP").equals(sttp)) {
            sql = "SELECT * FROM ST_STBPRP_B t where t.STCD = ? and t.STTP = ?";
            values.add(sttp);
        } else {
            sql = "SELECT * FROM ST_STBPRP_B t where t.STCD = ?";
        }
        return DBHelper.find("spring.datasource", StStbprpB.class, sql, values);
    }

    public void updateStation(StStbprpB stStbprpB) {
        String[] pks = {"stcd"};
        DBHelper.save("spring.datasource", "ST_STBPRP_B", pks, Arrays.asList(stStbprpB));
    }


    /**
     * 排水设施开始
     */

    /**
     * 雨水口
     *
     * @param psCombZy
     * @return
     */
    public List<Map> listPsCombZyPage(PsCombZy psCombZy, Object pager) {
        String sql = "select * from PS_COMB_ZY";
        List params = new ArrayList();
        if (psCombZy != null) {

            String subSql = "";

            if (!psCombZy.getUsidAndName().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or NAME like '%'||?||'%') ";
                params.add(psCombZy.getUsidAndName());
                params.add(psCombZy.getUsidAndName());
            }

            if (!psCombZy.getUsid().equals("")) {
                subSql += "and USID like '%'||?||'%' ";
                params.add(psCombZy.getUsid());
            }

            if (!psCombZy.getName().equals("")) {
                subSql += "and NAME like '%'||?||'%' ";
                params.add(psCombZy.getName());
            }

            if (!psCombZy.getDistrict().equals("")) {
                subSql += "and DISTRICT = ? ";
                params.add(psCombZy.getDistrict());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by USID desc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }


    /**
     * 水闸
     *
     * @param psDraingateZy
     * @return
     */
    public List<Map> listPsDraingateZyPage(PsDraingateZy psDraingateZy, Object pager) {
        String sql = "select * from PS_DRAINGATE_ZY";
        List params = new ArrayList();
        if (psDraingateZy != null) {

            String subSql = "";

            if (!psDraingateZy.getUsidAndName().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or NAME like '%'||?||'%') ";
                params.add(psDraingateZy.getUsidAndName());
                params.add(psDraingateZy.getUsidAndName());
            }

            if (!psDraingateZy.getUsid().equals("")) {
                subSql += "and USID like '%'||?||'%' ";
                params.add(psDraingateZy.getUsid());
            }

            if (!psDraingateZy.getName().equals("")) {
                subSql += "and NAME like '%'||?||'%' ";
                params.add(psDraingateZy.getName());
            }

            if (!psDraingateZy.getDistrict().equals("")) {
                subSql += "and DISTRICT = ? ";
                params.add(psDraingateZy.getDistrict());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by USID asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }


    /**
     * 管线
     *
     * @param psPipeZy
     * @return
     */
    public List<Map> listPsPipeZyPage(PsPipeZy psPipeZy, Object pager) {
        String sql = "select * from PS_PIPE_ZY";
        List params = new ArrayList();
        if (psPipeZy != null) {

            String subSql = "";

            if (!psPipeZy.getUsidAndName().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or NAME like '%'||?||'%') ";
                params.add(psPipeZy.getUsidAndName());
                params.add(psPipeZy.getUsidAndName());
            }

            if (!psPipeZy.getUsidAndAddr().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or ADDR like '%'||?||'%') ";
                params.add(psPipeZy.getUsidAndAddr());
                params.add(psPipeZy.getUsidAndAddr());
            }

            if (!psPipeZy.getUsid().equals("")) {
                subSql += "and USID like '%'||?||'%' ";
                params.add(psPipeZy.getUsid());
            }

            if (!psPipeZy.getName().equals("")) {
                subSql += "and NAME like '%'||?||'%' ";
                params.add(psPipeZy.getName());
            }

            if (!psPipeZy.getAddr().equals("")) {
                subSql += "and ADDR like '%'||?||'%' ";
                params.add(psPipeZy.getAddr());
            }

            if (!psPipeZy.getDistrict().equals("")) {
                subSql += "and DISTRICT = ? ";
                params.add(psPipeZy.getDistrict());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by USID desc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }

    /**
     * 泵站
     *
     * @param psPumpingStationZy
     * @return
     */
    public List<Map> listPsPumpingStationZyPage(PsPumpingStationZy psPumpingStationZy, Object pager) {
        String sql = "select * from PS_PUMPING_STATION_ZY";
        List params = new ArrayList();
        if (psPumpingStationZy != null) {

            String subSql = "";

            if (!psPumpingStationZy.getUsidAndName().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or NAME like '%'||?||'%') ";
                params.add(psPumpingStationZy.getUsidAndName());
                params.add(psPumpingStationZy.getUsidAndName());
            }

            if (!psPumpingStationZy.getUsid().equals("")) {
                subSql += "and USID like '%'||?||'%' ";
                params.add(psPumpingStationZy.getUsid());
            }

            if (!psPumpingStationZy.getName().equals("")) {
                subSql += "and NAME like '%'||?||'%' ";
                params.add(psPumpingStationZy.getName());
            }

            if (!psPumpingStationZy.getDistrict().equals("")) {
                subSql += "and DISTRICT = ? ";
                params.add(psPumpingStationZy.getDistrict());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by USID asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }


    /**
     * 拍门
     *
     * @param psPmZy
     * @return
     */
    public List<Map> listPsPmZyPage(PsPmZy psPmZy, Object pager) {
        String sql = "select * from PS_PM_ZY";
        List params = new ArrayList();
        if (psPmZy != null) {

            String subSql = "";

            if (!psPmZy.getUsidAndName().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or NAME like '%'||?||'%') ";
                params.add(psPmZy.getUsidAndName());
                params.add(psPmZy.getUsidAndName());
            }

            if (!psPmZy.getUsid().equals("")) {
                subSql += "and USID like '%'||?||'%' ";
                params.add(psPmZy.getUsid());
            }

            if (!psPmZy.getName().equals("")) {
                subSql += "and NAME like '%'||?||'%' ";
                params.add(psPmZy.getName());
            }

            if (!psPmZy.getDistrict().equals("")) {
                subSql += "and DISTRICT = ? ";
                params.add(psPmZy.getDistrict());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by USID asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }


    /**
     * 污水处理厂
     *
     * @param psSewagefarmZy
     * @return
     */
    public List<Map> listPsSewagefarmZyPage(PsSewagefarmZy psSewagefarmZy, Object pager) {
        String sql = "select * from PS_SEWAGEFARM_ZY";
        List params = new ArrayList();
        if (psSewagefarmZy != null) {

            String subSql = "";

            if (!psSewagefarmZy.getUsidAndName().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or NAME like '%'||?||'%') ";
                params.add(psSewagefarmZy.getUsidAndName());
                params.add(psSewagefarmZy.getUsidAndName());
            }

            if (!psSewagefarmZy.getUsid().equals("")) {
                subSql += "and USID like '%'||?||'%' ";
                params.add(psSewagefarmZy.getUsid());
            }

            if (!psSewagefarmZy.getName().equals("")) {
                subSql += "and NAME like '%'||?||'%' ";
                params.add(psSewagefarmZy.getName());
            }

            if (!psSewagefarmZy.getDistrict().equals("")) {
                subSql += "and DISTRICT = ? ";
                params.add(psSewagefarmZy.getDistrict());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by USID asc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }


    /**
     * 排放口
     *
     * @param psSpoutZy
     * @return
     */
    public List<Map> listPsSpoutZyPage(PsSpoutZy psSpoutZy, Object pager) {
        String sql = "select * from PS_SPOUT_ZY";
        List params = new ArrayList();
        if (psSpoutZy != null) {

            String subSql = "";

            if (!psSpoutZy.getUsidAndName().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or NAME like '%'||?||'%') ";
                params.add(psSpoutZy.getUsidAndName());
                params.add(psSpoutZy.getUsidAndName());
            }

            if (!psSpoutZy.getUsidAndAddr().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or ADDR like '%'||?||'%') ";
                params.add(psSpoutZy.getUsidAndAddr());
                params.add(psSpoutZy.getUsidAndAddr());
            }

            if (!psSpoutZy.getUsid().equals("")) {
                subSql += "and USID like '%'||?||'%' ";
                params.add(psSpoutZy.getUsid());
            }

            if (!psSpoutZy.getName().equals("")) {
                subSql += "and NAME like '%'||?||'%' ";
                params.add(psSpoutZy.getName());
            }

            if (!psSpoutZy.getDistrict().equals("")) {
                subSql += "and DISTRICT = ? ";
                params.add(psSpoutZy.getDistrict());
            }

            if (!psSpoutZy.getAddr().equals("")) {
                subSql += "and ADDR = ? ";
                params.add(psSpoutZy.getAddr());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by USID desc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }

    /**
     * 排放口
     *
     * @param psWellZy
     * @return
     */
    public List<Map> listPsWellZyPage(PsWellZy psWellZy, Object pager) {
        String sql = "select * from PS_WELL_ZY";
        List params = new ArrayList();
        if (psWellZy != null) {

            String subSql = "";

            if (!psWellZy.getUsidAndName().equals("")) {
                //'%' || #{zm} || '%'
                subSql += "and (USID like '%'||?||'%' or NAME like '%'||?||'%') ";
                params.add(psWellZy.getUsidAndName());
                params.add(psWellZy.getUsidAndName());
            }

            if (!psWellZy.getUsid().equals("")) {
                subSql += "and USID like '%'||?||'%' ";
                params.add(psWellZy.getUsid());
            }

            if (!psWellZy.getName().equals("")) {
                subSql += "and NAME like '%'||?||'%' ";
                params.add(psWellZy.getName());
            }

            if (!psWellZy.getDistrict().equals("")) {
                subSql += "and DISTRICT = ? ";
                params.add(psWellZy.getDistrict());
            }

            if (subSql.startsWith("and")) {
                subSql = subSql.substring(3);
            }

            sql += (subSql.equals("") ? "" : " where ") + subSql + " order by USID desc ";

        }
        System.out.println(sql);
        List<Map> list = DBHelper.findPage("spring.datasource", pager, sql, params);

        return list;
    }

    public List getCombById(String Id) {
        String sql = "SELECT * FROM PS_COMB_ZY t where t.USID = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", PsCombZy.class, sql, values);
    }

    public List getDraingateById(String Id) {
        String sql = "SELECT * FROM PS_DRAINGATE_ZY t where t.USID = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", PsDraingateZy.class, sql, values);
    }

    public List getPipeById(String Id) {
        String sql = "SELECT * FROM PS_PIPE_ZY t where t.USID = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", PsPipeZy.class, sql, values);
    }

    public List getPmById(String Id) {
        String sql = "SELECT * FROM PS_PM_ZY t where t.USID = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", PsPmZy.class, sql, values);
    }

    public List getPumpingStationById(String Id) {
        String sql = "SELECT * FROM PS_PUMPING_STATION_ZY t where t.USID = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", PsPumpingStationZy.class, sql, values);
    }

    public List getSewagefarmById(String Id) {
        String sql = "SELECT * FROM PS_SEWAGEFARM_ZY t where t.USID = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", PsSewagefarmZy.class, sql, values);
    }

    public List getSpoutById(String Id) {
        String sql = "SELECT * FROM PS_SPOUT_ZY t where t.USID = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", PsSpoutZy.class, sql, values);
    }

    public List getWellById(String Id) {
        String sql = "SELECT * FROM PS_WELL_ZY t where t.USID = ?";
        List<Object> values = new ArrayList<Object>();
        values.add(Id);
        return DBHelper.find("spring.datasource", PsWellZy.class, sql, values);
    }


}
