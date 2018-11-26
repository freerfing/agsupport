package com.augurit.asip.sc.student.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.augurit.agcloud.frame.ui.pager.PageHelper;
import com.augurit.asip.domain.Student;
import com.augurit.asip.mapper.StudentMapper;
import com.augurit.asip.sc.student.service.IStudent;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

@Service
public class StudentImpl implements IStudent {

	private static Logger logger = LoggerFactory.getLogger(StudentImpl.class);
	@Autowired
	private StudentMapper studentMapper;
	
	@Override
	public PageInfo<Student> listStudent(Student student, Page<Student> page) throws Exception {
		PageHelper.startPage(page);
		List<Student> list = studentMapper.listStudent(student);
		logger.debug("成功执行分页查询");
		return new PageInfo<Student>(list);
	}

	@Override
	public void saveStudent(Student student) throws Exception {
		studentMapper.insertStudent(student);
		logger.debug("保存数据成功");
	}

	@Override
	public void updateStudent(Student student) throws Exception {
		studentMapper.updateStudent(student);
		logger.debug("修改数据成功");
	}

	@Override
	public Student getStudentByCode(String code) throws Exception {
		
		return studentMapper.getStudentByCode(code);
	}

	@Override
	public void deleteStudent(String code) throws Exception {
		studentMapper.deleteStudent(code);
		logger.debug("删除数据成功");
		
	}

	
	
}
