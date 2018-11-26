
title awater
@echo off
set JAVA_HOME="%JAVA_HOME%"
@REM 设置环境变量:引用jar包
set CLASSPATH=src/main/resources;build/classes/main
@REM 将应用依赖的jar包事先下载下来存放在文件夹内
for %%i in (src\lib\*.jar) do call :apcp %%i
@REM 启动程序
%JAVA_HOME%\bin\java -Dfile.encoding=UTF-8 -cp %CLASSPATH% com.MainApplication
pause
::**************************************************************
::              追加jar到CLASSPATH中
::**************************************************************
:apcp
	if "%1" == "" goto end
	set CLASSPATH=%CLASSPATH%;%1
goto :eof
