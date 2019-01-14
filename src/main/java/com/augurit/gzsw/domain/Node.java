package com.augurit.gzsw.domain;

import com.google.common.collect.Lists;

import java.util.List;

public class Node {
	private String id;
	private String name;
	private String path;
	private String pid;
	private String type;
	private String checkedStatus;
	private List<Node> children = Lists.newArrayList();

	public Node(Org org) {
		if(org == null) {
			throw new IllegalArgumentException("非法参数");
		}

		this.id = org.getId();
		this.name = org.getName();
		//this.path = org.getXpath();
		this.pid = org.getPid();
		this.type = "1";
	}

	public Node(User user) {
		if(user == null) {
			throw new IllegalArgumentException("非法参数");
		}

		this.id = user.getUserId();
		this.name = user.getUserName();
		this.type = "2";
	}

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

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getCheckedStatus() {
		return checkedStatus;
	}

	public void setCheckedStatus(String checkedStatus) {
		this.checkedStatus = checkedStatus;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Node> getChildren() {
		return children;
	}

	public void setChildren(List<Node> children) {
		this.children = children;
	}
}
