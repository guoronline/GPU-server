# 生成.lib与.dll

参考：[Win32 SDK基础(二)之关于cl.exe和link.exe编译和连接程序的详解](https://www.php.cn/windows-364039.html)

源代码的编译过程共分为两个步骤：

一是编译过程，主要工作是把我们的源代码翻译成中间文件，这在windows中就是cl.exe的作用，它将我们的.c文件或者.cpp文件翻译成中间.obj文件；

二是连接过程，主要工作是将多种中间文件、库文件连接生成可执行文件，这在windows中就是link.exe的作用，它将.obj文件和库文件等链接成exe程序。

## 一、Microsoft C/C++编译器

cl.exe是Microsoft C/C++[编译器](https://baike.baidu.com/item/编译器/8853067)。link.exe是Microsoft C/C++的[连接器](https://blog.csdn.net/u011471873/article/details/53129603)。

#### 1. 在命令行中使用cl，生成目标文件\*.obj、\*.exe

```
cl.exe main.c
```

#### 2. 在命令行中使用cl，生成目标文件\*.obj 

```
cl.exe /c sub.c
cl.exe /c csource.cpp
```

####  3.使用lib.exe，生成静态库\*.lib.

```
lib.exe /OUT: sub.lib sub.obj
lib.exe /OUT:my.lib csource.obj
```

可用lib /list my.lib查看静态库里的目标文件obj



#### 4.使用 link.exe 创建 \*.dll 文件

```
link -dll mylib.obj
link -dll csource.obj
```

#### 5. 用cl /LD生成目标文件\*.obj、 \*.dll

```
cl /LD mylib.c 
cl /LD csource.cpp 
cl /LDd csource.cpp 
```

 

## 二、intel编译器

#### 1. 在命令行中使用icl，生成目标文件\*.obj、\*.exe

```
icl.exe /c main.c
```

#### 2. 在命令行中使用icl，生成目标文件\*.obj 

```
icl /c mylib.c
icl /c csource.cpp 
icl /c main.c
```

####  3. 用icl /LD生成目标文件\*.obj、 \*.dll

```bash
icl /LD mylib.c 
icl /LD csource.cpp 
```

####  4. 在命令行中使用xilink，生成main.exe

```
xilink main.obj
```



# 参考文章：

[在Intel Visual Fortran中混合编程一：使用Fortran调用C语言静态库_jpfalan的博客-CSDN博客](https://blog.csdn.net/jpfalan/article/details/104562193)

[C++ / vs 如何生成自己的静态库(lib)文件 - 程序员大本营 (pianshen.com)](https://www.pianshen.com/article/388260710/)

[几种Fortran+编译器 - 百度文库 (baidu.com)](https://wenku.baidu.com/view/ca4ea34de518964bcf847ca8.html)

  

[Tutorial: Using C/C++ and Fortran together](http://www.yolinux.com/TUTORIALS/LinuxTutorialMixingFortranAndC.html)

 

[C/C++/Fortran混合编程浅谈（一）直接链接方式](https://www.cnblogs.com/xunxun1982/archive/2010/08/25/1808512.html)

[VS中创建静态库&C/C++静态库的使用](https://blog.csdn.net/chunyexiyu/article/details/31014221)

 

# gcc系强制链接静态库（同时有.so和.a）

 

 [gcc系强制链接静态库（同时有.so和.a）](https://blog.csdn.net/youqika/article/details/54617525)

