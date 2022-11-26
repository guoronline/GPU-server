# Fortran源程序生成静态库与动态库

# 静态库

参考：

[Creating Static Libraries (intel.com)](https://software.intel.com/content/www/us/en/develop/documentation/fortran-compiler-oneapi-dev-guide-and-reference/top/compiler-reference/libraries/creating-static-libraries.html)





## 一、Windows

#### （一）方式一

To build a static library from the integrated development environment (IDE), select the **Fortran Static Library** project type.

#### （二）方式二

To build a static library using the command line:

1. Use option c to generate object files from the source files:

   ```
   ifort /c my_source1.f90 my_source2.f90
   ```

2. Use the Intel® xilib tool to create the library file from the object files:

   ```
   xilib /out:my_lib.lib my_source1.obj my_source2.obj
   ```

3. Compile and link your project with your new library:

   ```
   ifort main.f90 my_lib.lib
   ```

## 二、Linux

1. Use the c option to generate object files from the source files:

   ```
   ifort -c my_source1.f90 my_source2.f90 my_source3.f90
   ifort -c ex0842s.f90
   ```

2. Use the Intel® xiar tool to create the library file from the object files:

   ```
   xiar rc my_lib.a my_source1.o my_source2.o my_source3.o
   xiar rc ex0842s.a ex0842s.o
   ```

3. Compile and link your project with your new library:

   ```
   ifort main.f90 my_lib.a
   ifort ex0842m.f90 ex0842s.a
   ```

If your library file and source files are in different directories, use the -Ldir option to indicate where your library is located:

```
ifort -L/for/libs main.f90 my_lib.a
```



# 动态库

## 一、Windows

参考：

[Creating and Using DLLs (intel.com)](https://software.intel.com/content/www/us/en/develop/documentation/using-visual-fortran-windows-applications/top/creating-and-using-dlls.html)



您不能将快速温应用程序制作成 DLL

（一）微软集成开发环境 （IDE） 构建 DLL

要在集成开发环境中构建 DLL，应指定 Fortran 动态链接库项目类型。

（二）从命令行构建 DLL

如果您从命令行构建 DLL 或使用假文件，则必须指定 /dll 选项。例如，如果 Fortran DLL 源代码在文件sub.f90中，请使用以下命令行：

```
ifort /dll sub.f90
```

此命令创建：

- 一个DLL名为f90arr.dll。

采用/dll选项时， DLL 运行时间库作为默认值支持多线程操作。

windows下生成动态库dll文件：（在混合编程里这个方式有效）

```bash
ifort –c sub.f90  –o sub.dll
```



## 检查DLL的 Symbol Export Table

DUMPBIN是在Windows平台下用于显示COFF格式文件信息的一个命令行工具。你可以使用DUMPBIN去显示COFF格式的文件信息，比如像vc编译器生成的目标文件（obj），可执行文件（exe）和动态链接库（DLLs）等。参考：[Dumpbin工具参数详解](https://blog.csdn.net/zw514159799/article/details/8186792)

To make sure that everything that you want to be visible shows up in the export table, look at the export information of an existing DLL file by using QuickView in the Windows Explorer File menu or the following DUMPBIN command:

```
  DUMPBIN /exports file.dll
```



## 二、Linux

参考：

[Creating Shared Libraries (intel.com)](https://software.intel.com/content/www/us/en/develop/documentation/fortran-compiler-oneapi-dev-guide-and-reference/top/compiler-reference/libraries/creating-shared-libraries.html)

[linux下利用ifort编译DLL](http://blog.sciencenet.cn/blog-271986-277035.html)

有多种方式生成动态库。

#### （一）方式一

You can create a shared library file with a single ifort command:

```fortran
ifort -shared -fpic octagon.f90
```

The -shared option is required to create a shared library. The name of the source file is octagon.f90. You can specify multiple source files and object files.

Because the -o option was omitted, the name of the shared library file is octagon.so.

You can use the -static-intel option to force the linker to use the static versions of the Intel-supplied libraries.

#### （二）方式二

You can also create a shared library file with a combination of ifort and ld commands:

First, create the .o file, such as octagon.o in the following example:

```fortran
ifort -c -fpic octagon.f90
ifort -c -fpic ex0842s.f90
```

The file octagon.o is then used as input to the ld command to create the shared library. The following example shows the command to create a shared library named octagon.so on a Linux operating system:



```
export LD_LIBRARY_PATH=/public/software/compiler/intel/composer_xe_2016.3.210/compiler/lib/intel64_lin/
```



```fortran
ld -shared octagon.o \
     -lifport -lifcoremt -limf -lm -lcxa \
     -lpthread -lirc -lunwind -lc -lirc_s
ld -shared ex0842s.o \
     -lifport -lifcoremt -limf -lm -lcxa \
     -lpthread -lirc -lunwind -lc -lirc_s
```

Note the following:

- When you use ld, you need to list all Intel® Fortran libraries. It is easier and safer to use the ifort command. 
- The name of the object file is octagon.o. You can specify multiple object (.o) files.
- The -lifport option and subsequent options are the standard list of libraries that the ifort command would have otherwise passed to ld. When you create a shared library, all symbols must be resolved.

## 安装动态库（Shared Libraries）

Once the shared library is created, it must be installed for private or system-wide use before you run a program that refers to it:

- To install a *private* shared library (when you are testing, for example), set the environment variable LD_LIBRARY_PATH, as described in ld(1). 

  

- To install a *system-wide* shared library, place the shared library file in one of the standard directory paths used by ld .





## 源程序

ex0842m.f90为主程序文件，ex0842s.f90为子程序文件。

 

!-------------ex0842m.f90-----------

program ex0842m
 implicit none
 call sub()
 stop
end

!-------------------------------------------

 

!-----------ex0842s.f90---------------

subroutine sub()
 implicit none
 write(*,*) "This is subroutine"
 return
end

!----------------------------------------