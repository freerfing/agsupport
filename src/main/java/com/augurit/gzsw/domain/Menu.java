package com.augurit.gzsw.domain;

public class Menu {
	private String id;
	private String name;
	private String url;
	private String normalIconUrl;
	private String hoverIconUrl;
	private String path;
	private String authorizeCode;
	private Integer dispOrder;
	private String isDisplay;
	private String remark;
	private String pid;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getNormalIconUrl() {
		return normalIconUrl;
	}

	public void setNormalIconUrl(String normalIconUrl) {
		this.normalIconUrl = normalIconUrl;
	}

	public String getHoverIconUrl() {
		return hoverIconUrl;
	}

	public void setHoverIconUrl(String hoverIconUrl) {
		this.hoverIconUrl = hoverIconUrl;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getAuthorizeCode() {
		return authorizeCode;
	}

	public void setAuthorizeCode(String authorizeCode) {
		this.authorizeCode = authorizeCode;
	}

	public Integer getDispOrder() {
		return dispOrder;
	}

	public void setDispOrder(Integer dispOrder) {
		this.dispOrder = dispOrder;
	}

	public String getIsDisplay() {
		return isDisplay;
	}

	public void setIsDisplay(String isDisplay) {
		this.isDisplay = isDisplay;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}
}
