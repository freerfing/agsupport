package com;

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
@MapperScan( basePackages = "com.augurit.agcloud.spatial.dao",sqlSessionFactoryRef = "spatialSessionFactory")
public class SpatialDB {

    @Bean(name = "spatialDS")
    @ConfigurationProperties(prefix = "spatialdb")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "spatialSessionFactory")
    public SqlSessionFactory sqlSessionFactoryBean(@Qualifier("spatialDS") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setTypeAliasesPackage("com.augurit.agcloud.spatial.domain");
        try {
            return bean.getObject();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
