@echo off
@REM 配置jdk的安装目录 如：set JAVA_HOME=C:\j2sdk1.4.2
set JAVA_HOME=%JAVA_HOME%

@REM 配置数据交换接口系统的安装目录 如:set IDE_HOME=D:\aicide
set ANT_HOME=%ANT_HOME%

if not exist ./log md log

%ANT_HOME%\bin\ant -f build.xml -l log/build.log
