# C源程序生成静态库与动态库

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

```bash
cl.exe /c sub.c
cl.exe /c csource.cpp
```

####  3.使用lib.exe，生成静态库\*.lib、\*.dll 文件.

```bash
lib.exe /OUT: sub.lib sub.obj
lib.exe /OUT: sub.dll sub.obj
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



## 三、GNU编译器

 参考：

[Linux基础——gcc编译、静态库与动态库（共享库）](https://blog.csdn.net/daidaihema/article/details/80902012)

 [gcc系强制链接静态库（同时有.so和.a）](https://blog.csdn.net/youqika/article/details/54617525)





# 参考文章：

 [linux函式库管理](http://cn.linux.vbird.org/linux_basic/0520source_code_and_tarball_5.php#library)

[C++ / vs 如何生成自己的静态库(lib)文件](https://www.pianshen.com/article/388260710/)

[VS中创建静态库&C/C++静态库的使用](https://blog.csdn.net/chunyexiyu/article/details/31014221)

 

