package com.augurit.asip.sc.student.service;

import com.augurit.asip.domain.Student;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;

public interface IStudent {

	/**
	 * 分页查询
	 * @param student
	 * @param page
	 * @return
	 * @throws Exception
	 */
	PageInfo<Student> listStudent(Student student, Page<Student> page) throws Exception;
	/**
	 * 保存学生信息
	 * @param student
	 * @throws Exception
	 */
	void saveStudent(Student student) throws Exception;
	/**
	 * 修改学生信息
	 * @param student
	 * @throws Exception
	 */
	void updateStudent(Student student) throws Exception;
	/**
	 * 根据学生的编号获取学生信息
	 * @param code
	 * @return
	 * @throws Exception
	 */
	Student getStudentByCode(String code) throws Exception; 
	/**
	 * 根据code删除学生信息
	 * @param code
	 * @throws Exception
	 */
	void deleteStudent(String code) throws Exception;
}
