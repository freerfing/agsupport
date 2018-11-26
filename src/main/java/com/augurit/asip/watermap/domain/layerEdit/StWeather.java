package com.augurit.asip.watermap.domain.layerEdit;

import java.util.Date;

/**
 * 天气预报的数据,需要去气象局里面抓取数据
 * @author Administrator
 *
 */
public class StWeather {
	private Date tm;
	private String content;
	private String title;
	public StWeather(){}
	public StWeather(Date tm,String content,String title){
		this.tm = tm;
		this.content = content;
		this.title = title;
	}
	public Date getTm() {
		return tm;
	}
	public void setTm(Date tm) {
		this.tm = tm;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
}
