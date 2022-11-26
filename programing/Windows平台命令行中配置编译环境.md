# Windows平台命令行中使用vcvarsall.bat配置编译环境

## 一、VS配置命令行编译环境

先了解一下VS的命令行编译选项：

```
===========================================================================
Command File命令文件	Host and Target architectures主机和目标体系结构
------------------------------------------------------------------------
vcvars32.bat	使用32位x86本机工具来生成32位x86代码。 
vcvars64.bat	使用64位x64本机工具来生成64位x64代码。 
vcvarsx86_amd64.bat	使用32位x86本机跨工具生成64位x64代码。 
vcvarsamd64_x86.bat	使用64位x64本机跨工具生成32位x86代码。 
vcvarsx86_arm.bat	使用32位x86本机跨工具生成ARM代码。 
vcvarsamd64_arm.bat	使用64位x64本机跨工具生成ARM代码。 
vcvarsall.bat	使用参数来指定主机和目标体系结构，以及SDK和平台选择。
```

现在，我们一般机子都是64位的，就执行vcvarsx86_amd64.bat生成32位x86代码：

```
D:\vs2019\enterprise\VC\Auxiliary\Build\vcvarsamd64_x86.bat
```

注：本机VS安装在D:\vs2019\目录下。



## 二、FORTRAN2020配置命令行编译环境

在老版本中， IVF安装好后，默认的命令行编译环境可以在命令菜单中找到。例如：你需要安装好 Intel visual fortran 2019后，菜单就有Compiler ...：

![默认编译器](E:\OneDrive\文档\GPU-server\images\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2NTEzMDk3,size_16,color_FFFFFF,t_70)

在IVF2020中，该菜单就不再有了。但可以在安装目录中找到ipsxe-comp-vars.bat批处理文件，然后执行以下命令：

```
D:\Intel Parallel Studio XE 2020\compilers_and_libraries_2020\windows\bin\ipsxe-comp-vars.bat" intel64 vs2019"
```

因为文件名称Intel Parallel Studio XE 2020中有空格，所以执行不了。可以修改为：

```
D:
cd D:\Intel Parallel Studio XE 2020\compilers_and_libraries_2020\windows\bin\
call ipsxe-comp-vars.bat -arch intel64 -platform vs2019
```

D:
cd D:\works

注：本机安装的是FORTRAN2020，安装在D:\Intel Parallel Studio XE 2020\目录下，VS是2019版。



## 二、采用批处理文件快速配置命令行编译环境

用文本编辑器生成文件Fortran.bat，写入：

```
call "D:\vs2019\enterprise\VC\Auxiliary\Build\vcvarsamd64_x86.bat"
D:
cd D:\Intel Parallel Studio XE 2020\compilers_and_libraries_2020\windows\bin\
call ipsxe-comp-vars.bat -arch intel64 -platform vs2019
D:
cd D:/works
%comspec%
```

注：fortran源程序放在工作目录D:/works/下，该目录自己根据需要修改。

