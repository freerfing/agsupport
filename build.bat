@echo off
@REM ����jdk�İ�װĿ¼ �磺set JAVA_HOME=C:\j2sdk1.4.2
set JAVA_HOME=%JAVA_HOME%

@REM �������ݽ����ӿ�ϵͳ�İ�װĿ¼ ��:set IDE_HOME=D:\aicide
set ANT_HOME=%ANT_HOME%

if not exist ./log md log

%ANT_HOME%\bin\ant -f build.xml -l log/build.log
