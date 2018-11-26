package com.augurit.asip.watermap.sc.base;

import org.apache.log4j.Logger;

/**
 * 重要水库,河道编码
 * @author caisj
 * @date 2012-12-31
 */
public class ImportantUtil {
	private static Logger log = Logger.getLogger(ImportantUtil.class);
	private ImportantUtil(){
		
	}
	 /**
	  * 重要水库的编码
	  */
	public static String importantReservoir="'C440184041','C440184011','C440183011','C440111031','C440116211','C440116031',"
			+ "'C440114021','C440114071','C440114121','C440114031','C440114041','C440184051',"
			+ "'C440184121','C440184111','C440183181','C440183151','C440183191','C440183211','C440183201','C440183221'";
			
	/**
	 * 重要江河的编码
	 */
	public static String importantRiver="'C440100201','C440100211','C440111011','C440100021','C440112011','C440113011','C440113041',"
			+ "'C440114101','C440114051','C440183141','C440184061','C440184151','C440184161','C440111021','C440183051','C440183101',"
			+ "'C440183381','C440183071','C440183131'";
	
}
