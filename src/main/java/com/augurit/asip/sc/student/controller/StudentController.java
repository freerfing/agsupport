package com.augurit.asip.sc.student.controller;

import java.security.InvalidParameterException;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.augurit.agcloud.frame.json.JsonUtils;
import com.augurit.agcloud.frame.ui.result.ContentResultForm;
import com.augurit.agcloud.frame.ui.result.ResultForm;
import com.augurit.asip.domain.Student;
import com.augurit.asip.sc.student.service.IStudent;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping({"/student"})
public class StudentController {

	private static Logger logger = LoggerFactory.getLogger(StudentController.class);
	@Autowired
	private IStudent iStudent;
	
	@RequestMapping({"/index.do"})
	public ModelAndView indexStudent(Student student) {
		return new ModelAndView("/agcom/student/student");
	}
	
	@RequestMapping({"/list"})
	public PageInfo<Student> listStudent(Student student, Page<Student> page) throws Exception {
		logger.debug("分页查询，过滤条件为{}，查询关键字为{}", student);
		System.out.println(student.getAddress());
		return iStudent.listStudent(student, page);
	}

	@RequestMapping({"/listinfo"})
	public String listinfoStudent(String code) throws Exception {
		if (code != null) {
			logger.debug("根据ID获取Student对象，ID为：{}", code);
			return JsonUtils.toJson(new ContentResultForm<Student>(true, iStudent.getStudentByCode(code),"true"));
		} else {
			logger.debug("构建新的Student对象");
			return JsonUtils.toJson(new ContentResultForm<Student>(true, new Student(),"false"));
		}
	}
	
	@RequestMapping({"/save"})
	public String saveStudent(Student student, BindingResult result) throws Exception {
		//参数验证
		if (result.hasErrors()) {
			logger.error("保存Form对象出错");
			throw new InvalidParameterException();
		} else {
			if (student.getCode() != null && !"".equals(student.getCode())) {
				iStudent.updateStudent(student);
			} else {
				student.setCode(UUID.randomUUID().toString());
				iStudent.saveStudent(student);
			}

			return JsonUtils.toJson(new ContentResultForm<Student>(true, student));
		}
	}
	@RequestMapping({"/get"})
	public Student getStudentByCode(String code) throws Exception {
		if (code != null) {
			logger.debug("根据ID获取Student对象，ID为：{}", code);
			return iStudent.getStudentByCode(code);
		} else {
			logger.debug("构建新的Student对象");
			return new Student();
		}
	}
	@RequestMapping({"/deleteByCode"})
	public String deleteAgDemoById(String code) throws Exception {
		logger.debug("删除Form对象，对象id为：{}", code);
		if (code != null) {
			iStudent.deleteStudent(code);
		}

		return JsonUtils.toJson(new ResultForm(true));
	}
	
}
