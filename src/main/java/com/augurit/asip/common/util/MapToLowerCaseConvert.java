package com.augurit.asip.common.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.github.pagehelper.Page;
/**
 * Map的key的转换类
 * @author huzy
 *
 */
public class MapToLowerCaseConvert {
	
	/**
	 * 把List<Map>中map的key转为驼峰命名字符串
	 * @param list
	 * @return
	 */
	public static List<Map<String,Object>> mapToLowerCase(List<Map<String,Object>> list){
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		for(Map<String, Object> map : list) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap = mapToLowerCase(map);
			resultList.add(resultMap);
		}
		return resultList;
	}
	/**
	 * 把page的key从大写下画线命名方式转为驼峰命名方式
	 * @param list
	 * @param pageNum
	 * @return
	 */
	public static Page<Map<String, Object>> mapToLowerCase(Page<Map<String, Object>> list, int pageNum) {
		Page<Map<String, Object>> page = new Page<Map<String, Object>>(list.getPageNum(),list.getPageSize());
		for(Map<String, Object> map : list) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap = mapToLowerCase(map);
			page.add(resultMap);
		}
		page.setStartRow(list.getStartRow());
		page.setEndRow(list.getEndRow());
		page.setTotal(list.getTotal());
		page.setOrderBy(list.getOrderBy());
		page.setPageSizeZero(list.getPageSizeZero());
		return page;
	}
	/**
	 * 把map的key转为驼峰命名字符串
	 * @param paramMap
	 * @return
	 */
	public static Map<String,Object> mapToLowerCase(Map<String,Object> paramMap){		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		for (Map.Entry<String, Object> entry : paramMap.entrySet()) {
			resultMap.put(camelName((String)entry.getKey()), entry.getValue());
	    }		
		return resultMap;
	}
	
	//未改
	public static List<Map<String,Object>> MapToLowerCase2(List<Map<String,Object>> list){		
		List<Map<String, Object>> resultList = new ArrayList<Map<String,Object>>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> map = new HashMap<String, Object>();
		String key = null;
		for (int i = 0; i < list.size(); i++) {
			map  =list.get(i);
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				key = (String)entry.getKey();	
				if(key.equals("PID")){
					resultMap.put("pId", entry.getValue());
				}else{
					resultMap.put(key.toLowerCase(), entry.getValue());
				}
		    }
			 resultList.add(resultMap);
			 resultMap = new HashMap<String, Object>();
		}
		
		return resultList;
	}

	public static Page<Map<String, Object>> mapToLowerCase2(Page<Map<String, Object>> list, int pageNum) {
		Page<Map<String, Object>> page = new Page<Map<String, Object>>(list.getPageNum(),list.getPageSize());
		for(Map<String, Object> map : list) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap = mapToLowerCase2(map);
			page.add(resultMap);
		}
		page.setStartRow(list.getStartRow());
		page.setEndRow(list.getEndRow());
		page.setTotal(list.getTotal());
		page.setOrderBy(list.getOrderBy());
		page.setPageSizeZero(list.getPageSizeZero());
		return page;
	}

	public static Map<String,Object> mapToLowerCase2(Map<String,Object> paramMap){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		for (Map.Entry<String, Object> entry : paramMap.entrySet()) {
			resultMap.put(((String)entry.getKey()).toLowerCase(), entry.getValue());
		}
		return resultMap;
	}

	/**
	 * 将驼峰式命名的字符串转换为下划线大写方式。
	 * 例如：helloWorld->HELLO_WORLD
	 * @param name 转换前的驼峰式命名的字符串
	 * @return 转换后下划线大写方式命名的字符串
	 */
	public static String underscoreName(String name) {
	    StringBuilder result = new StringBuilder();
	    if (name != null && name.length() > 0) {
	        // 将第一个字符处理成大写
	        result.append(name.substring(0, 1).toUpperCase());
	        // 循环处理其余字符
	        for (int i = 1; i < name.length(); i++) {
	            String s = name.substring(i, i + 1);
	            // 在大写字母前添加下划线
	            if (s.equals(s.toUpperCase()) && !Character.isDigit(s.charAt(0))) {
	                result.append("_");
	            }
	            // 其他字符直接转成大写
	            result.append(s.toUpperCase());
	        }
	    }
	    return result.toString();
	}
	
	/**
	 * 将下划线命名的字符串转换为驼峰命名（小驼峰）字符串。
	 * 例如：HELLO_WORLD->helloWorld
	 * @param name 转换前的字符串
	 * @return 转换后的驼峰式命名的字符串
	 */
	public static String camelName(String name) {
	    StringBuilder result = new StringBuilder();
	    // 快速检查
	    if (name == null || name.isEmpty()) {
	        // 没必要转换
	        return "";
	    } else if (!name.contains("_")) {
	    	//不含下划线转为小写
	    	return name.toLowerCase();
	    }
	    // 用下划线将原始字符串分割
	    String camels[] = name.split("_");
	    for (String camel :  camels) {
	        // 跳过原始字符串中开头、结尾的下换线或双重下划线
	        if (camel.isEmpty()) {
	            continue;
	        }
	        // 处理真正的驼峰片段
	        if (result.length() == 0) {
	            // 第一个驼峰片段，全部字母都小写
	            result.append(camel.toLowerCase());
	        } else {
	            // 其他的驼峰片段，首字母大写
	            result.append(camel.substring(0, 1).toUpperCase());
	            result.append(camel.substring(1).toLowerCase());
	        }
	    }
	    return result.toString();
	}
	
	//测试
/*	public static void main(String[] args) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ONE_ONE", 1);
		map.put("TWO_TWO", 2);
		map.put("three_three", 3);
		System.out.println(mapToLowerCase(map));
		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("FOUR_FOUR", 1);
		map2.put("FIVE_FIVE", 2);
		map2.put("six_six", 3);
		System.out.println(mapToLowerCase(map2));
		list.add(map);
		list.add(map2);
		System.out.println(mapToLowerCase(list));
	}*/
}
