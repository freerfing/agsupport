/*  1:   */ package com.augurit.agcom.sc.index.service.impl;
/*  2:   */ 
/*  3:   */ import com.augurit.agcloud.frame.json.JsonUtils;
/*  4:   */ import com.augurit.agcom.domain.Menu;
/*  5:   */ import com.augurit.agcom.sc.index.service.IIndex;
/*  6:   */ import java.io.InputStream;
/*  7:   */ import java.util.ArrayList;
/*  8:   */ import java.util.List;
/*  9:   */ import java.util.Scanner;
/* 10:   */ import org.springframework.beans.factory.annotation.Value;
/* 11:   */ import org.springframework.core.io.Resource;
/* 12:   */ import org.springframework.stereotype.Service;
/* 13:   */ 
/* 14:   */ @Service
/* 15:   */ public class IndexImpl
/* 16:   */   implements IIndex
/* 17:   */ {
/* 18:   */   @Value("classpath:index.json")
/* 19:   */   private Resource index;
/* 20:   */   
/* 21:   */   public List<Menu> getIndexMenu()
/* 22:   */   {
/* 23:28 */     List<Menu> menus = new ArrayList();
/* 24:29 */     Scanner scanner = null;
/* 25:30 */     StringBuilder buffer = new StringBuilder();
/* 26:   */     try
/* 27:   */     {
/* 28:32 */       InputStream inputStream = this.index.getInputStream();
/* 29:33 */       scanner = new Scanner(inputStream, "utf-8");
/* 30:34 */       while (scanner.hasNextLine()) {
/* 31:35 */         buffer.append(scanner.nextLine());
/* 32:   */       }
/* 33:37 */       menus = JsonUtils.listFromJson(buffer.toString(), Menu.class);
/* 34:   */     }
/* 35:   */     catch (Exception e)
/* 36:   */     {
/* 37:39 */       e.printStackTrace();
/* 38:   */     }
/* 39:   */     finally
/* 40:   */     {
/* 41:41 */       if (scanner != null) {
/* 42:42 */         scanner.close();
/* 43:   */       }
/* 44:   */     }
/* 45:45 */     return menus;
/* 46:   */   }
/* 47:   */ }


/* Location:           D:\code\svn\agcloud\agsupport_5.0\src\lib\agsupport-5.0.jar
 * Qualified Name:     com.augurit.agcom.sc.index.service.impl.IndexImpl
 * JD-Core Version:    0.7.0.1
 */