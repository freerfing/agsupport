package com.augurit.asip.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.augurit.asip.domain.Student;

@Mapper
public interface StudentMapper {

	/**
	 * 查询学生列表
	 * @param student
	 * @return
	 * @throws Exception
	 */
	List<Student> listStudent(Student student) throws Exception;
	/**
	 * 插入一条学生信息
	 * @param student
	 * @throws Exception
	 */
	void insertStudent(Student student) throws Exception;
	/**
	 * 根据编号获取学生信息
	 * @param code
	 * @return
	 * @throws Exception
	 */
	Student getStudentByCode(@Param("code") String code) throws Exception;
	/**
	 * 修改一条学生信息
	 * @param student
	 * @throws Exception
	 */
	void updateStudent(Student student) throws Exception;
	/**
	 * 根据code删除一条学生信息
	 * @param code
	 * @throws Exception
	 */
	void deleteStudent(@Param("code") String code) throws Exception; 
}
