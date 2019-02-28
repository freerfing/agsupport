package com.augurit.gzsw.domain;

import java.util.List;

public class SMS {
	private String id;
	private String senderId;
	private String recieverIds;
	private String content;
	private String type; //类型信息，0：公告短信 1：其他
	private String createTime;
	private String sendTime;
	private String randomCode;
	private String status; //状态：0-保存，1-发送成功，2，全部失败，3-部分失败
	private User sender;// 发送人
	private List<SMSUser> receivers;// 接收人列表
	private String statusType;// 状态查询使用： 0：全部 1: 已发送 2：未发送

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSenderId() {
		return senderId;
	}

	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}

	public String getRecieverIds() {
		return recieverIds;
	}

	public void setRecieverIds(String recieverIds) {
		this.recieverIds = recieverIds;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getSendTime() {
		return sendTime;
	}

	public void setSendTime(String sendTime) {
		this.sendTime = sendTime;
	}

	public String getRandomCode() {
		return randomCode;
	}

	public void setRandomCode(String randomCode) {
		this.randomCode = randomCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public List<SMSUser> getReceivers() {
		return receivers;
	}

	public void setReceivers(List<SMSUser> receivers) {
		this.receivers = receivers;
	}

	public String getStatusType() {
		return statusType;
	}

	public void setStatusType(String statusType) {
		this.statusType = statusType;
	}
}
