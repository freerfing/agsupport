package com.augurit.gzsw;

import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Stopwatch;
import com.google.common.collect.Lists;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.concurrent.TimeUnit;

/**
 * 响应报文核心处理类
 */
@Component
@Aspect
public class ReqAndRespMsgHandler {
	public static final Logger log = LoggerFactory.getLogger(ReqAndRespMsgHandler.class);

	@Pointcut("execution(* com.augurit.gzsw.*.*.controller.*.*(..)) && !execution(* com.augurit.gzsw.*.*.controller.*.index(..))")
	public void pointCut() { }

	@Around("pointCut()")
	@ResponseBody
	public ApiResponse handleControllerMethod(ProceedingJoinPoint pjp) throws Throwable{
		Stopwatch stopwatch = Stopwatch.createStarted();

		ApiResponse response = null;

		try {
			log.info("执行Controller开始: " + pjp.getSignature() + " 参数：" + Lists.newArrayList(pjp.getArgs()).toString());
			Object ret = pjp.proceed(pjp.getArgs());
			try{
				if(ret.getClass().isAssignableFrom(ApiResponse.class)) {
					response = (ApiResponse) ret;
				} else {
					response = new ApiResponse(ret);
				}
				log.info("执行Controller结束: " + pjp.getSignature() + "， 返回值：" + JSONObject.toJSONString(response));
				//此处将日志打印放入try-catch是因为项目中有些对象实体bean过于复杂，导致序列化为json的时候报错，但是此处报错并不影响主要功能使用，只是返回结果日志没有打印，所以catch中也不做抛出异常处理
			}catch (Exception ex){
				log.error(pjp.getSignature()+" 接口记录返回结果失败！，原因为：{}", ex.getMessage());
			}
			Long consumeTime = stopwatch.stop().elapsed(TimeUnit.MILLISECONDS);
			log.info("耗时：" + consumeTime + "(毫秒).");
			// TODO 当接口调用花费超过一定时间，需要入库进行分析
		} catch (Exception throwable) {
			response = handlerException(pjp, throwable);
		}

		return response;
	}

	private ApiResponse handlerException(ProceedingJoinPoint pjp, Throwable e) {
		ApiResponse response;
		if(e.getClass().isAssignableFrom(ApiException.class) ){
			//ApiException为自定义异常类，项目中Controller层会把所有的异常都catch掉，并手工封装成ProjectException抛出来，这样做的目的是ProjectException会记录抛出异常接口的路径，名称以及请求参数等等，有助于错误排查
			ApiException apiException = (ApiException) e;
			//log.error("捕获到ProjectException异常:", JSONObject.toJSONString(apiException.getDcErrorEntity()));
			//RabbitMQMessageTarget mqTarget = RabbitMQMessageTarget.createFanoutTarget(ProjectConstants.DC_KEY_EXCHANGE_INTERFACE_ERROR, new String[] { ProjectConstants.DC_KEY_QUEUE_INTERFACE_ERROR});
			//rabbitMQService.send(mqTarget, JSON.toJSONString(dataCenterException.getDcErrorEntity()));
			response = new ApiResponse(apiException.getDepository(), e);
		} else if (e instanceof RuntimeException) {
			log.error("RuntimeException{方法：" + pjp.getSignature() + "， 参数：" + pjp.getArgs() + ",异常：" + e.getMessage() + "}", e);
			response = new ApiResponse(RespCodeMsgDepository.SERVER_INTERNAL_ERROR, e);
		} else {
			log.error("异常{方法：" + pjp.getSignature() + "， 参数：" + pjp.getArgs() + ",异常：" + e.getMessage() + "}", e);
			response = new ApiResponse(RespCodeMsgDepository.SERVER_INTERNAL_ERROR, e);
		}

		return response;
	}
}
