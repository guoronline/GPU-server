# C/C++/Fortran混合编程（命令行形式）

参考：**[C/C++/Fortran混合编程](https://www.cnblogs.com/xunxun1982/archive/2010/08/25/1808512.html)**

[Standard Fortran and C Interoperability (intel.com)](https://software.intel.com/content/www/us/en/develop/documentation/fortran-compiler-oneapi-dev-guide-and-reference/top/compiler-reference/mixed-language-programming/standard-fortran-and-c-interoperability.html)

[Mixed Language Programming (intel.com)](https://software.intel.com/content/www/us/en/develop/documentation/fortran-compiler-oneapi-dev-guide-and-reference/top/compiler-reference/mixed-language-programming.html)



# 一、概述

20210128郭

## 实现环境：

windows环境：win10、gcc-6.3.0、IVF Version 19.0.0.117

Linux环境：redhat6.5



**C和Fortran混合编程中，注意程序的子程序名不一样。**

## intel编译器

- **在windows下，c主程序调用的Fortran子程序名必须大写；Fortran调C时c子程序名必须大写。**

- **在linux下，子程序名大小写跟GNU编译器一样。**

## GNU版本编译器：

- **C调Fortran的算例中，c主程序调用的Fortran子程序名的程序名大小写不影响，但要名字后要加下划线。**

- **Fortran调C的算例中，c程序中的子程序名大小写不影响，但要名字后要加下划线。**



现今流行很多编程语言，在编译型语言中，C/C++/Fortran语言应用非常广泛，C以其效率高效底层操作为著称，C++以其很好的面向对象类框架泛型编程为特点，Fortran则以现世存有大量的计算程序而占有重要的位置，在编程中，集合他们三者的长处是个很好的做法。混合编程有很多方法，以下介绍一下基本方法。

对于各个编译器，如果编译中间的二进制文件.o或.obj的结构相同，则可以直接链接混合编程。

遵循约定：C/C++默认传值，Fortran传址。

一般来说，尽量采用相同编译器家族：GNU家族（gcc\gfortran版本）是这样；但Intel家族（Intel C Compiler和Intel Fortran Compiler版本）不一样。

intel编译器在windows中，c调fortran时，编译器都采用intel的ifort和icl；但fortran调C时，只能用微软的c编译器cl和intel的编译器ifort。**深坑**



# 二、C调用Fortran

## （一） gcc\gfortran版本

### 1. 源程序

**main.c**

```c
#include <stdio.h>
void sub_fortran_(int *,float *,double *);
double function_fortran_(double *);
 
int main()
{
      int num_int;
      float num_float;
      double num_double;
      double num;
      num_int=3;
      num_float=5.0;
      sub_fortran_(&num_int,&num_float,&num_double);
      num=function_fortran_(&num_double);
      printf("num_int=%d\nnum_float=%f\nnum_double=%f\nnum=%f",num_int,num_float,num_double,num);
      return 0;
}
```

**sub.f90**

```fortran
subroutine Sub_Fortran(NumInt,NumFloat,NumDouble)
      implicit none
      integer :: NumInt
      real :: NumFloat
      real(8) :: NumDouble
      NumDouble=NumFloat**NumInt
end subroutine
 
real(8) function Function_Fortran(NumDouble)
      implicit none
      real(8) :: NumDouble
      Function_Fortran=sqrt(NumDouble)
end function
```

**sub.f90(F2003方式)**

```fortran
subroutine Sub_Fortran(NumInt,NumFloat,NumDouble)
      use ISO_C_BINDING
      implicit none
      integer(c_int) :: NumInt
      real(c_float) :: NumFloat
      real(c_double) :: NumDouble
      NumDouble=NumFloat**NumInt
end subroutine
 
real(c_double) function Function_Fortran(NumDouble)
      use ISO_C_BINDING
      implicit none
      real(c_double) :: NumDouble
      Function_Fortran=sqrt(NumDouble)
end function
```



### 2. 混合编程方式一

分别生成二进制程序后，一起连接成可执行程序。

#### （1）windows下：

```bash
gcc –o main.obj –c main.c
gfortran –o sub.obj –c sub.f90
gcc –o main.exe main.obj sub.obj
```

或者直接

```bash
gcc –o main.exe main.c sub.f90
```

####  （2）linux下：

```bash
gcc –o main.o –c main.c
gfortran –o sub.o –c sub.f90
gcc –o main main.o sub.o
```



### 3. 混合编程方式二

linux下，采用静态库和动态库的方式。

 参考：[gcc编译、静态库与动态库（共享库）](https://blog.csdn.net/daidaihema/article/details/80902012)



#### （1）采用静态库

**第一步：生成与位置无关的.o文件**

```bash
gfortran -o sub.o -c sub.f90
```

**第二步：创建静态库**

将所有.o文件打包为静态库，r将文件插入静态库中，c创建静态库，不管库是否存在，s写入一个目标文件索引到库中，或者更新一个存在的目标文件索引。

```bash
ar rcs libMyTest.a sub.o        
mkdir lib
mv libMyTest.a ./lib         #将静态库文件放置lib文件夹下
nm ./lib/libMyTest.a         #查看库中包含的函数等信息
```

**第三步：使用静态库**

第一种方法：成功！！！
gcc + 源文件 + -L 静态库路径 + -l静态库名 + -I头文件目录 + -o 可执行文件名

```bash
gcc main.c -L lib -l MyTest -o app
./app
```

第二种方法：成功！！！
gcc + 源文件 + -I头文件 + libxxx.a + -o 可执行文件名

```bash
gcc main.c lib/libMyTest.a -o app
./app
```



#### （2）采用动态库

**第一步：生成与位置无关的.o文件**

```bash
gfortran -fPIC -o sub.o -c sub.f90   #参数-fPIC表示生成与位置无关代码
```

**第二步：创建动态库**

```bash
gcc -shared -o libMyTest.so sub.o    #参数：-shared 制作动态库 -o：重命名生成的新文件
或 gfortran -shared -o libMyTest.so sub.o	
mkdir lib
mv libMyTest.so ./lib
nm ./lib/libMyTest.so         		#查看库中包含的函数等信息
```

**第三步：使用动态库**

**第一种方法**：

一开始不成功，后来添加环境变量后成功了！！！
gcc + 源文件 + -L 动态库路径 + -l动态库名 + -I头文件目录 + -o 可执行文件名

```bash
gcc main.c -L lib -lMyTest -o app
./app
```

执行后显示如下错误。

```
./app: error while loading shared libraries: libMyTest.so: cannot open shared object file: No such file or directory
```

（执行失败，找不到链接库）

**最终解决办法**

将lib文件夹添加到环境变量LD_LIBRARY_PATH中。

```bash
var=$(pwd)
echo $var/lib
export LD_LIBRARY_PATH=$var/lib:$LD_LIBRARY_PATH
或 export LD_LIBRARY_PATH=/root/CFortran/GNU_VER/Fortran_call_C/lib:$LD_LIBRARY_PATH
```



**第二种方法**：成功！！！
gcc + 源文件 + -I头文件 + libxxx.so + -o 可执行文件名

```bash
gcc main.c -I include lib/libMyTest.so -o app
./app
```

（执行成功，已经指明了动态库的路径）



## （二） Intel版本

**开始实验不成功！！！后来发现问题：ifort编译生成的sub.obj中，子程序的名称全部是用的大写，因此c程序中，调用Fortran的子程序时，子程序名必须为大写。**

### 1. 源程序

**main.c**

```c
#include <stdio.h>
void SUB_FORTRAN(int *, float *, double *);
double FUNCTION_FORTRAN(double *);
int main()
{
       int num_int;
       float num_float;
       double num_double;
       double num;
       num_int = 3;
       num_float = 5.0;
       SUB_FORTRAN(&num_int, &num_float, &num_double);
       num = FUNCTION_FORTRAN(&num_double);
       printf("num_int=%d\nnum_float=%f\nnum_double=%f\nnum=%f", num_int, num_float, num_double, num);
       return 0;
}
```

**sub.f90**

```fortran
subroutine sub_fortran(NumInt,NumFloat,NumDouble)
      use ISO_C_BINDING
      implicit none
      integer(c_int) :: NumInt
      real(c_float) :: NumFloat
      real(c_double) :: NumDouble
      NumDouble=NumFloat**NumInt
end subroutine
 
real(c_double) function function_fortran(NumDouble)
      use ISO_C_BINDING
      implicit none
      real(c_double) :: NumDouble
      Function_Fortran=sqrt(NumDouble)
end function
```

### 2. 混合编程方式一

分别生成二进制程序后，一起连接成可执行程序。

#### （1）windows下：

**执行命令：**

```bash
icl –o main.obj –c main.c
ifort –c sub.f90  –o sub.obj 
icl main.obj sub.obj –o main.exe
```

#### （2）linux下：

**一开始，没有成功。后来采用GNU版本（在（一）1中的源程序）中的main.c和sub.f90，就成功了。因为在linux下，即使采用intel编译器，子程序在定义时候和调用时，名字一定要一致。**

```bash
icc -c main.c -o main.o
ifort -c sub.f90 -o sub.o
icc main.o sub.o -o main
```

显示以下错误：

```bash
for_main.c:(.text+0x2e): undefined reference to `MAIN__'
main.o: In function `main':
main.c:(.text+0x41): undefined reference to `SUB_FORTRAN'
main.c:(.text+0x4a): undefined reference to `FUNCTION_FORTRAN'
```



### 3. 混合编程方式二

采用静态库和动态库的方式。

#### （1）windows下：

windows下生成静态库lib和动态库dll文件：

```bash
ifort –c sub.f90  –o sub.lib
ifort –c sub.f90  –o sub.dll
```



##### 采用静态库

**第一步：创建静态库**

```bash
ifort –c sub.f90 –o sub.lib
mkdir lib
move sub.lib ./lib         将静态库文件放置lib文件夹下
```

**第二步：使用静态库**

第一种方法：不成功！！！
icl+ 源文件 + -L 静态库路径 + -l静态库名 + -I头文件目录 + -o 可执行文件名

```bash
icl main.c -L lib -l sub.lib -o main.exe
main.exe
```

第二种方法：成功！！！
icl+ 源文件 + -I头文件 + xxx.lib + -o 可执行文件名

```bash
icl main.c lib/sub.lib -o main.exe
main.exe
```



##### 采用动态库

**第一步：创建动态库**

```bash
ifort –c sub.f90  –o sub.dll  	#不能采用 ifort /dll sub.f90  生成。
mkdir lib
move sub.dll ./lib         		#将静态库文件放置lib文件夹下
nm ./lib/sub.dll         		#查看库中包含的函数等信息（windows中没法用）
```

**第二步：使用动态库**

**第一种方法**：

不成功，可能是选项没写对！！！
icl+ 源文件 + -L 动态库路径 + -l动态库名 + -I头文件目录 + -o 可执行文件名

```bash
icl main.c -L lib -l sub.dll -o main.exe
main
```

**第二种方法**：成功！！！
icl + 源文件 + -I头文件 + xxx.dll + -o 可执行文件名

```bash
icl main.c lib/sub.dll -o main.exe
main
```

（执行成功，已经指明了动态库的路径）



#### （2）linux下：

**一开始，没有成功。后来采用GNU版本中的main.c和sub.f90，就成功了。因为在linux下，即使采用intel编译器，子程序在定义时候和调用时，子程序的名字命名方式跟GNU版本的一样。**



##### 采用静态库

**第一步：创建静态库**

```bash
ifort -c sub.f90 -o sub.lib
mkdir lib
mv sub.lib ./lib         #将静态库文件放置lib文件夹下
nm ./lib/sub.lib
```

或采用.a

```bash
ifort -c sub.f90 -o libsub.a
mkdir lib
mv libsub.a ./lib         #将静态库文件放置lib文件夹下
```

**第二步：使用静态库**

第一种方法：成功！！！
icl+ 源文件 + -L 静态库路径 + -l静态库名 + -I头文件目录 + -o 可执行文件名

```bash
icc main.c -L lib -l sub -o main
./app
```

第二种方法：成功！！！
icl+ 源文件 + -I头文件 + xxx.lib + -o 可执行文件名

```bash
icc main.c lib/sub.lib -o main
或 icc main.c lib/libsub.a -o main
./main
```



##### 采用动态库

**第一步：创建动态库**

```bash
ifort -c sub.f90 -o libsub.so
mkdir lib
mv libsub.so ./lib         将动态库文件放置lib文件夹下
nm ./lib/libsub.so         查看库中包含的函数等信息
```

**第二步：使用动态库**

**第一种方法**：

一开始不成功，后来添加环境变量后成功了！！！
gcc + 源文件 + -L 动态库路径 + -l动态库名 + -I头文件目录 + -o 可执行文件名

```bash
icc main.c -L lib -lsub -o app
```

将lib文件夹添加到环境变量LD_LIBRARY_PATH中。

```bash
var=$(pwd)
echo $var/lib
export LD_LIBRARY_PATH=$var/lib:$LD_LIBRARY_PATH
或 
export LD_LIBRARY_PATH=/root/CFortran/GNU_VER/Fortran_call_C/lib:$LD_LIBRARY_PATH
```

执行

```
./app
```

**第二种方法**：成功！！！
gcc + 源文件 + -I头文件 + libxxx.so + -o 可执行文件名

```bash
icc main.c lib/libsub.so -o app
./app
```

也需要将lib文件夹添加到环境变量LD_LIBRARY_PATH中。



# 三、Fortran调用C

## （一） gcc\gfortran版本

### 1. 源程序

**main.f90**

```fortran
program main
      implicit none
      interface 
            subroutine sub_c(n1,n2,n3)
                  integer :: n1
                  real :: n2
                  real(8) :: n3
            end subroutine
 
            real(8) function func_c(n3)
                  real(8) :: n3
            end function
      end interface
      integer :: n1
      real :: n2
      real(8) :: n3,n4
      n1=3
      n2=5.0
      call sub_c(n1,n2,n3)
      n4=func_c(n3)
      write(*,*) "n1=",n1
      write(*,*) "n2=",n2
      write(*,*) "n3=",n3
      write(*,*) "n4=",n4
end program
main.f90(F2003方式)
program main
      use ISO_C_BINDING
      implicit none
      interface 
            subroutine sub_c(n1,n2,n3)
                  use ISO_C_BINDING
                  integer(c_int) :: n1
                  real(c_float) :: n2
                  real(c_double) :: n3
            end subroutine
 
            real(c_double) function func_c(n3)
                  use ISO_C_BINDING
                  real(c_double) :: n3
            end function
      end interface
      integer(c_int) :: n1
      real(c_float) :: n2
      real(c_double) :: n3,n4
      n1=3
      n2=5.0
      call sub_c(n1,n2,n3)
      n4=func_c(n3)
      write(*,*) "n1=",n1
      write(*,*) "n2=",n2
      write(*,*) "n3=",n3
      write(*,*) "n4=",n4
end program
```

**sub.c**

```c
#include <math.h>
void sub_c_(int *,float *,double *);
double func_c_(double *);
 
void sub_c_(int *n1,float *n2,double *n3)
{
      *n3=pow(*n2,*n1);
}
double func_c_(double *n3)
{
      double n4;
      n4=sqrt(*n3);
      return n4;
}
```

### 2. 混合编程方式一

分别生成二进制程序后，一起连接成可执行程序。

#### （1）windows下：

```bash
gcc –o sub.obj  sub.c
gfortran –o main.obj main.f90
gfortran –o main.exe main.obj sub.obj
```

或是直接

```bash
gfortran –o main.exe main.f90 sub.c
```

####  （2）linux下：

```bash
gcc –o sub.o sub.c
gfortran –o main.o main.f90
gfortran –o main main.o sub.o
```



### 3. 混合编程方式二

linux下，采用静态库和动态库的方式。

 参考：[gcc编译、静态库与动态库（共享库）](https://blog.csdn.net/daidaihema/article/details/80902012)



#### （1）采用静态库

**第一步：生成与位置无关的.o文件**

```bash
gcc -o sub.o -c sub.c
```

**第二步：创建静态库**

将所有.o文件打包为静态库，r将文件插入静态库中，c创建静态库，不管库是否存在，s写入一个目标文件索引到库中，或者更新一个存在的目标文件索引。

```bash
ar rcs libMyTest.a sub.o
mkdir lib
mv libMyTest.a ./lib         将静态库文件放置lib文件夹下
nm ./lib/libMyTest.a         查看库中包含的函数等信息
```

**第三步：使用静态库**

第一种方法：成功！！！
gcc + 源文件 + -L 静态库路径 + -l静态库名 + -I头文件目录 + -o 可执行文件名

```bash
gfortran main.f90 -L lib -l MyTest -o app
./app
```

第二种方法：成功！！！
gcc + 源文件 + -I头文件 + libxxx.a + -o 可执行文件名

```bash
gfortran main.f90 lib/libMyTest.a -o app
./app
```



#### （2）采用动态库

**第一步：生成与位置无关的.o文件**

```bash
gcc -fPIC -o sub.o -c sub.c   参数-fPIC表示生成与位置无关代码
```

**第二步：创建动态库**

```bash
gcc -shared -o libMyTest.so sub.o        参数：-shared 制作动态库 -o：重命名生成的新文件
gfortran -shared -o libMyTest.so sub.o
mkdir lib
mv libMyTest.so ./lib
nm ./lib/libMyTest.so         查看库中包含的函数等信息
```

**第三步：使用动态库**

第一种方法：不成功！！！
gcc + 源文件 + -L 动态库路径 + -l动态库名 + -I头文件目录 + -o 可执行文件名

```bash
gfortran main.f90 -L lib -lMyTest -o app
```

将lib文件夹添加到环境变量LD_LIBRARY_PATH中。

```bash
var=$(pwd)
echo $var/lib
export LD_LIBRARY_PATH=$var/lib:$LD_LIBRARY_PATH
```

执行

```
./app
```



第二种方法：成功！！！
gcc + 源文件 + -I头文件 + libxxx.so + -o 可执行文件名

```bash
gfortran main.f90 lib/libMyTest.so -o app
./app
```

（执行成功，已经指明了动态库的路径）

 

## （二） Intel版本

### 1. 源程序

**main.f90**

```fortran
program main
          implicit none
          interface 
                subroutine sub_c(n1,n2,n3)
                      integer :: n1
                      real :: n2
                      real(8) :: n3
                end subroutine
 
                real(8) function func_d(var2d)
                      real(8) :: var2d(2,3)
                end function
                
                real(8) function func_c(n3)
                      real(8) :: n3
                end function
          end interface
          
          integer :: n1
          real :: n2
          real(8) :: n3,n4
          real(8) :: var2d(2,3)
          
          n1=3
          n2=5.0
          call sub_c(n1,n2,n3)
          n4=func_c(n3)
          write(*,*) "n1=",n1
          write(*,*) "n2=",n2
          write(*,*) "n3=",n3
          write(*,*) "n4=",n4
          
          var2d=0
          var2d(1,1)=dble(n1)
          var2d(1,2)=dble(n2)          
          write(*,*) "var2d(1,:): ",var2d(1,:)
          write(*,*) "var2d(2,:): ",var2d(2,:)
          n2=func_d(var2d)
          write(*,*) "var2d(1,:): ",var2d(1,:)
          write(*,*) "var2d(2,:): ",var2d(2,:)
end program main
```

**sub.c**

```
#include <math.h>
#include <stdio.h>
 
void SUB_C(int *, float *, double *);
double FUNC_C(double *);
double FUNC_D(double[][2]);
 
void SUB_C(int *n1, float *n2, double *n3)
{
          *n3 = pow(*n2, *n1);
}
 
double FUNC_C(double *n3)
{
          double n4;
          n4 = sqrt(*n3);
          return n4;
}
 
double FUNC_D(double var2d[3][2])
{
          double NN;
          NN = 77.0;
          printf("%5.2f %5.2f %5.2f \n", var2d[0][0], var2d[1][0], var2d[2][0]);
          printf("%5.2f %5.2f %5.2f \n", var2d[0][1], var2d[1][1], var2d[2][1]);
          var2d[1][0] = NN;
          printf("%5.2f %5.2f %5.2f \n", var2d[0][0], var2d[1][0], var2d[2][0]);
          printf("%5.2f %5.2f %5.2f \n", var2d[0][1], var2d[1][1], var2d[2][1]);
          return NN;
}
```

### 2. 混合编程方式一

分别生成二进制程序后，一起连接成可执行程序。

#### （1）windows下：

```
icl -c sub.c -o sub.obj
ifort -c main.f90 -o main.obj
ifort main.obj sub.obj -o main.exe 
```

####  （2）linux下：

**一开始，没有成功。后来采用GNU版本中的main.f90和sub.c，就成功了。因为在linux下，即使采用intel编译器，子程序在定义时候和调用时，名字一定要一致。**

```bash
icl -c sub.c -o sub.o
ifort -c main.f90 -o main.o
ifort main.o sub.o -o main
```

采用intel版本中的文件，显示如下错误：

```
main.o: In function `MAIN__':
main.f90:(.text+0x51): undefined reference to `sub_c_'
main.f90:(.text+0x5b): undefined reference to `func_c_'
main.f90:(.text+0x34c): undefined reference to `func_d_'
```

主要是由于子程序名字不一致！



### 3. 混合编程方式二

采用静态库和动态库的方式。

#### （1）windows下：

windows下生成静态库lib和动态库dll文件：

##### 采用静态库

**第一步：创建静态库**

**大坑大坑大坑大坑大坑大坑！！！！！**

一开始用icl生成lib，结果在连接的时候总是出错。

```bash
icl -LD sub.c -o sub.lib		#生成静态库sub.lib  -LD和/LD都行
md lib
move sub.lib ./lib         		#将静态库文件放置lib文件夹下
```

出错：

```
lib\sub.lib : fatal error LNK1107: 文件无效或损坏: 无法在 0x320 处读取
lib\sub.dll : fatal error LNK1107: 文件无效或损坏: 无法在 0x320 处读取
```

**解决办法，只能采用Microsoft C/C++编译器**

cl.exe是Microsoft C/C++[编译器](https://baike.baidu.com/item/编译器/8853067)。link.exe是Microsoft C/C++的[连接器](https://blog.csdn.net/u011471873/article/details/53129603)。

1.用VC下的cl.exe  先将mylib.c  生成mylib.obj  中间文件

```
cl.exe /c sub.c
```

2.用lib.exe  生成mylib.lib文件就是你要的文件了.

```
lib.exe  /OUT:sub.lib  sub.obj
```

```
md lib
move sub.lib ./lib         将静态库文件放置lib文件夹下
```

**第二步：使用静态库**

第一种方法：不成功，可能是选项没写对！！！
ifort+ 源文件 + -L 静态库路径 + -l静态库名 + -I头文件目录 + -o 可执行文件名

```bash
ifort main.f90 -L lib -l sub.lib -o main.exe  #出错，参数不对
main.exe
```

第二种方法：成功
ifort+ 源文件 + -I头文件 + xxx.lib + -o 可执行文件名

```bash
ifort main.f90 lib\sub.lib -o main.exe
main.exe
```



##### 采用动态库

**第一步：创建动态库**

**注意注意注意：不能采用icl编译！！！**

```bash
icl -LD sub.c					#生成动态库sub.dll
```

采用icl生成的dll，在后边ifort使用的时候出错：

```
lib\sub.dll : fatal error LNK1107: 文件无效或损坏: 无法在 0x320 处读取
```



**采用Microsoft C/C++编译器**

1.用VC下的cl.exe  先将mylib.c  生成mylib.obj  中间文件

```bash
cl.exe /c sub.c
```

2.使用 link.exe 创建 \*.dll 文件

```bash
link -dll sub.obj				#采用这个方法生成的dll，使用的时候出错
```

采用cl和link生成的dll，在后边ifort使用的时候出错：

```
sub.dll : fatal error LNK1107: 文件无效或损坏: 无法在 0x2F0 处读取
```

3.使用 lib.exe 创建 \*.dll 文件

```bash
lib.exe /OUT:sub.dll sub.obj	#这个方式有效
```

然后，移动dll到lib文件夹下

```bash
md lib
move sub.dll ./lib         		#将动态库文件放置lib文件夹下
```



**第二步：使用动态库**

**第一种方法**：

不成功，可能是选项没写对！！！
ifort+ 源文件 + -L 动态库路径 + -l动态库名 + -I头文件目录 + -o 可执行文件名

```bash
ifort main.f90 -L lib -l sub.dll -o main.exe  #出错
main
```

**第二种方法**：成功
ifort+ 源文件 + -I头文件 + xxx.dll + -o 可执行文件名

```bash
ifort main.f90 lib/sub.dll -o main.exe
#或
ifort -c main.f90
link main.obj lib/sub.dll /OUT:main.exe /SUBSYSTEM:CONSOLE
```



#### （2）linux下：

**一开始，没有成功。后来采用GNU版本中的main.f90和sub.c，就成功了。因为在linux下，即使采用intel编译器，子程序在定义时候和调用时，子程序的名字命名方式跟GNU版本的一样。**



##### 采用静态库

**第一步：创建静态库**

```bash
icc -c sub.c -o libsub.lib
mkdir lib
mv libsub.lib ./lib         将静态库文件放置lib文件夹下
nm ./lib/libsub.lib
```

或采用.a

```
icc -c sub.c -o libsub.a
mkdir lib
mv libsub.a ./lib         将静态库文件放置lib文件夹下
```

**第三步：使用静态库**

第一种方法：成功！！！
ifort+ 源文件 + -L 静态库路径 + -l静态库名 + -I头文件目录 + -o 可执行文件名

必须先生成：./lib/libsub.a

```bash
ifort main.f90 -L lib -l sub -o main
./app
```

第二种方法：成功！！！
ifort+ 源文件 + -I头文件 + xxx.lib + -o 可执行文件名

```bash
ifort main.f90 lib/libsub.lib -o main
或 ifort main.f90 lib/libsub.a -o main
./main
```



##### 采用动态库

**第一步：创建动态库**

```bash
icc -c sub.c -o libsub.so
mkdir lib
mv libsub.so ./lib         将动态库文件放置lib文件夹下
nm ./lib/libsub.so         查看库中包含的函数等信息
```

**第二步：使用动态库**

**第一种方法**：

一开始不成功，后来添加环境变量后成功了！！！
ifort+ 源文件 + -L 动态库路径 + -l动态库名 + -I头文件目录 + -o 可执行文件名

```bash
ifort main.f90 -L lib -lsub -o app
```

将lib文件夹添加到环境变量LD_LIBRARY_PATH中。

```bash
var=$(pwd)
echo $var/lib
export LD_LIBRARY_PATH=$var/lib:$LD_LIBRARY_PATH
#或 
export LD_LIBRARY_PATH=/root/CFortran/GNU_VER/Fortran_call_C/lib:$LD_LIBRARY_PATH
```

执行

```
./app
```

**第二种方法**：成功！！！
ifort+ 源文件 + -I头文件 + libxxx.so + -o 可执行文件名

```bash
ifort main.f90 lib/libsub.so -o app
./app
```

也需要将lib文件夹添加到环境变量LD_LIBRARY_PATH中。

 

# 参考文章：

[Intel C/C++ Fortran编译器的使用](http://scc.ustc.edu.cn/zlsc/pxjz/201408/W020140804356091396413.pdf)

[Tutorial: Using C/C++ and Fortran together](http://www.yolinux.com/TUTORIALS/LinuxTutorialMixingFortranAndC.html)

 [C/C++/Fortran混合编程浅谈（一）直接链接方式](https://www.cnblogs.com/xunxun1982/archive/2010/08/25/1808512.html)

[INTEL C++ COMPILER之常用的编译器选项](https://software.intel.com/content/www/cn/zh/develop/articles/book-programming-on-intel-platform_commonly_used_compiler_options.html)



 

 

 

