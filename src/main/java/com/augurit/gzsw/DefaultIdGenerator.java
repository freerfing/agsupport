package com.augurit.gzsw;

import java.util.UUID;

/**
 * 默认的ID生成器
 */
public class DefaultIdGenerator {
	public static String getIdForStr() {
		return UUID.randomUUID().toString().replace("-", "");
	}
}
