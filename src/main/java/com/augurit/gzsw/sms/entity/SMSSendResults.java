package com.augurit.gzsw.sms.entity;
import com.augurit.gzsw.domain.User;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class SMSSendResults {
	private boolean isAllFailed = true;
	private boolean hasFailed = false;
	private List<SMSSendResult> results = new ArrayList<SMSSendResult>();

	public List<SMSSendResult> getFailedResults() {
		List<SMSSendResult> retResults = new ArrayList<SMSSendResult>();
		if(CollectionUtils.isNotEmpty(results)) {
			for(SMSSendResult result : results) {
				if(!result.isSuccess() && StringUtils.isNotEmpty(result.getMobile())) {
					retResults.add(result);
				}
			}
		}

		return retResults;
	}

	public void addResult(SMSSendResult result) {
		if(result != null) {
			if(results == null) {
				results = new ArrayList<SMSSendResult>();
			}

			results.add(result);
		}
	}

	public void addResult(User reciever, String mobile) {
		SMSSendResult result = new SMSSendResult();
		result.setReciever(reciever);
		result.setMobile(mobile);

		results.add(result);
	}

	public void addResultIfMobileNotExisted(String mobile) {
		boolean isExisted = false;

		if(CollectionUtils.isNotEmpty(results)) {
			for(SMSSendResult result : results) {
				if(StringUtils.isNotEmpty(result.getMobile()) && result.getMobile().equals(mobile)) {
					isExisted = true;
					break;
				}
			}
		}

		if(!isExisted) {
			SMSSendResult result = new SMSSendResult();
			result.setMobile(mobile);

			results.add(result);
		}
	}

	public List<String> exportMobiles() {
		List<String> mobiles = new ArrayList<String>();

		if(CollectionUtils.isNotEmpty(results)) {
			for(SMSSendResult result : results) {
				if(StringUtils.isNotEmpty(result.getMobile())) {
					mobiles.add(result.getMobile());
				}
			}
		}

		return mobiles;
	}

	public boolean isAllFailed() {
		return isAllFailed;
	}

	public void setAllFailed(boolean allFailed) {
		isAllFailed = allFailed;
	}

	public boolean isHasFailed() {
		return hasFailed;
	}

	public void setHasFailed(boolean hasFailed) {
		this.hasFailed = hasFailed;
	}

	public List<SMSSendResult> getResults() {
		return results;
	}

	public void setResults(List<SMSSendResult> results) {
		this.results = results;
	}

	public static class SMSSendResult {
		private User reciever;
		private String recieverId;// 短信重发的时候利用此字段，不用每次都查询用户信息
		private String mobile;
		private String resultMsg;
		private boolean isSuccess = true;

		public User getReciever() {
			return reciever;
		}

		public void setReciever(User reciever) {
			this.reciever = reciever;
		}

		public String getRecieverId() {
			return recieverId;
		}

		public void setRecieverId(String recieverId) {
			this.recieverId = recieverId;
		}

		public String getMobile() {
			return mobile;
		}

		public void setMobile(String mobile) {
			this.mobile = mobile;
		}

		public String getResultMsg() {
			return resultMsg;
		}

		public void setResultMsg(String resultMsg) {
			this.resultMsg = resultMsg;
		}

		public boolean isSuccess() {
			return isSuccess;
		}

		public void setSuccess(boolean success) {
			isSuccess = success;
		}
	}

}
