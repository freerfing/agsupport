package com.augurit.asip.watermap.sc.video.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/video"})
public class VideoController {
	
	/**
     * 下载视频控件
     * @param request
     * @param response
     * @param id
     * @throws Exception
     */
    @RequestMapping("/downOCX")
    public void downOCX(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try{
			String realPath = request.getRealPath("")+"view\\app\\watermap\\topic\\video\\installOCX.rar";	       
	        if(new File(realPath).exists()){
	        	 String fileName = realPath.substring(realPath.lastIndexOf("\\")+1);//获取要下载的文件名  
	 	        //设置content-disposition响应头控制浏览器以下载的形式打开文件，中文文件名要使用URLEncoder.encode方法进行编码，否则会出现文件名乱码  
	 	        response.setHeader("content-disposition", "attachment;filename="+URLEncoder.encode(fileName, "UTF-8"));  
	        	InputStream in = new FileInputStream(realPath);
		        int len = 0;  
		        byte[] buffer = new byte[1024];  
		        OutputStream out = response.getOutputStream();  
		        while ((len = in.read(buffer)) > 0) {  
		            out.write(buffer,0,len);
		        }  
		        in.close();  
	        }else{
	        	System.out.println("下载的视频控件不存在！");
	        }
		}catch(Exception e){
			e.printStackTrace();
		}		
    }
    
    /**
     * 下载IE Tab控件
     * @param request
     * @param response
     * @param id
     * @throws Exception
     */
    @RequestMapping("/downIETab")
    public void downIETab(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try{
			String realPath = request.getRealPath("")+"view\\app\\watermap\\topic\\video\\videoforchrome.rar";	       
	        if(new File(realPath).exists()){
	        	 String fileName = realPath.substring(realPath.lastIndexOf("\\")+1);//获取要下载的文件名  
	 	        //设置content-disposition响应头控制浏览器以下载的形式打开文件，中文文件名要使用URLEncoder.encode方法进行编码，否则会出现文件名乱码  
	 	        response.setHeader("content-disposition", "attachment;filename="+URLEncoder.encode(fileName, "UTF-8"));  
	        	InputStream in = new FileInputStream(realPath);
		        int len = 0;  
		        byte[] buffer = new byte[1024];  
		        OutputStream out = response.getOutputStream();  
		        while ((len = in.read(buffer)) > 0) {  
		            out.write(buffer,0,len);
		        }  
		        in.close();  
	        }else{
	        	System.out.println("下载的IE Tab控件不存在！");
	        }
		}catch(Exception e){
			e.printStackTrace();
		}		
    }
}
