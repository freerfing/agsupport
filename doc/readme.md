###注意说明
1. oracle驱动包安装到本地
mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc6 -Dversion=11.2.0.3 -Dpackaging=jar -Dfile=D:\Idea_project\aoge\awater\awater\doc\ojdbc6-11.2.0.3.jar
2. agcas客户端包安装到本地
mvn install:install-file -DgroupId=org.jasig.cas.client -DartifactId=agcom-cas-client-core -Dversion=3.2.1 -Dpackaging=jar -Dfil
e=C:\Users\heng\Desktop\agcom-cas-client-core-3.2.1.jar