package com;

import com.augurit.asip.sc.student.service.IStudent;
import com.augurit.asip.sc.student.service.impl.StudentImpl;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import javax.sql.DataSource;

@Configuration
@MapperScan(basePackages = {"com.**.mapper"}, sqlSessionFactoryRef = "defaultSessionFactory")
public class DefaultDB {
    @Primary
    @Bean(name = "defaultDS")
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource1() {
        return DataSourceBuilder.create().build();
    }

    @Primary
    @Bean(name = "defaultSessionFactory")
    public SqlSessionFactory sqlSessionFactoryBean1(@Qualifier("defaultDS") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
        Resource config = resourcePatternResolver.getResource("classpath:mybatis.xml");
        bean.setConfigLocation(config);
        try {
            return bean.getObject();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
