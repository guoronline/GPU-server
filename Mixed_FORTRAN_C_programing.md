# C/C++/Fortran混合编程（命令行形式）

参考：**[C/C++/Fortran混合编程](https://www.cnblogs.com/xunxun1982/archive/2010/08/25/1808512.html)**



# 一、混合编程

20210128郭

实现环境：win10、gcc-6.3.0、IVF Version 19.0.0.117

**算例全都通过验证，用GNU版本（gcc和gfortran）和intel版本（Icl和ifort）没问题，但注意两种情况下，c程序的子程序名不一样。**

**C调Fortran的算例**

**1、intel版本中，c主程序调用的Fortran子程序名必须大写。**

**2、GNU版本中，c主程序调用的Fortran子程序名的程序名大小写不影响，但要名字后要加下划线。**

**Fortran调C的算例**

**1、intel版本中，c子程序名必须大写。**

**2、GNU版本中，c程序中的子程序名大小写不影响，但要名字后要加下划线。**

现今流行很多编程语言，在编译型语言中，C/C++/Fortran语言应用非常广泛，C以其效率高效底层操作为著称，C++以其很好的面向对象类框架泛型编程为特点，Fortran则以现世存有大量的计算程序而占有重要的位置，在编程中，集合他们三者的长处是个很好的做法。混合编程有很多方法，以下介绍一下基本方法。

对于各个编译器，如果编译中间的二进制文件.o或.obj的结构相同，则可以直接链接混合编程。

遵循约定：C/C++默认传值，Fortran传址。

一般来说，尽量采用相同编译器家族：GNU家族（gcc\gfortran版本）或Intel家族（Intel C Compiler和Intel Fortran Compiler版本）。



# 二、C调用Fortran

## 1. gcc\gfortran版本

#### main.c

```
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

#### sub.f90

```
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

#### sub.f90(F2003方式)

```
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

#### 编译连接

##### windows下：

```bash
gcc –o main.o –c main.c
gfortran –o sub.o –c sub.f90
gcc –o main.exe main.o sub.o
```

**或者直接**

```bash
gcc –o main.exe main.c sub.f90
```

#####  linux下：

```
gcc –o main.o –c main.c
gfortran –o sub.o –c sub.f90
gcc –o main main.o sub.o
```

 

## 2. Intel版本

**开始实验不成功！！！后来发现问题：ifort编译生成的sub.obj中，子程序的名称全部是用的大写，因此c程序中，调用Fortran的子程序时，子程序名必须为大写。**

**main.c**

```
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

```
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

**执行命令：**

**windows下：**

```
icl –o main.obj –c main.c
ifort –c sub.f90  –o sub.obj 
ifort main.obj sub.obj –o main.exe
```

**linux下：**

```
icl –o main.o –c main.c
ifort –c sub.f90  –o sub.o 
ifort main.o sub.o –o main
```

windows下生成静态库lib和动态库dll文件：

```
ifort –c sub.f90  –o sub.lib
ifort –c sub.f90  –o sub.dll
```



# 三、Fortran调用C

## 1. gcc\gfortran版本

**main.f90**

```
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

```
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

**执行命令：**

**windows下：**

```
gcc –o sub.o sub.c
gfortran –o main.o main.f90
gfortran –o main.exe main.o sub.o
```

**或是直接**

```
gfortran –o main.exe main.f90 sub.c
```

 **linux下：**

```
gcc –o sub.o sub.c
gfortran –o main.o main.f90
gfortran –o main main.o sub.o
```

 

## 2. Intel版本

**main.f90**

```
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

**执行命令：**

 **windows下：**

```
icl -c sub.c -o sub.obj
ifort -c main.f90 -o main.obj
ifort main.obj sub.obj -o main.exe 
```

 **linux下：**（没成功）

```bash
icc -c sub.c -o sub.o
ifort -c main.f90 -o main.o
ifort main.o sub.o -o main
```

显示如下错误：

```
main.o: In function `MAIN__':
main.f90:(.text+0x51): undefined reference to `sub_c_'
main.f90:(.text+0x5b): undefined reference to `func_c_'
main.f90:(.text+0x34c): undefined reference to `func_d_'
```



windows下生成静态库lib和动态库dll文件：

```bash
icl /LD sub.c					#生成动态库sub.dll
icl -LD sub.c -o sub.lib		#生成静态库sub.lib  -LD和/LD都行
```



# 参考文章：

[在Intel Visual Fortran中混合编程一：使用Fortran调用C语言静态库_jpfalan的博客-CSDN博客](https://blog.csdn.net/jpfalan/article/details/104562193)

[C++ / vs 如何生成自己的静态库(lib)文件 - 程序员大本营 (pianshen.com)](https://www.pianshen.com/article/388260710/)

[几种Fortran+编译器 - 百度文库 (baidu.com)](https://wenku.baidu.com/view/ca4ea34de518964bcf847ca8.html)

[Intel C/C++ Fortran编译器的使用](http://scc.ustc.edu.cn/zlsc/pxjz/201408/W020140804356091396413.pdf)

[Tutorial: Using C/C++ and Fortran together](http://www.yolinux.com/TUTORIALS/LinuxTutorialMixingFortranAndC.html)

 

[C/C++/Fortran混合编程浅谈（一）直接链接方式](https://www.cnblogs.com/xunxun1982/archive/2010/08/25/1808512.html)

[VS中创建静态库&C/C++静态库的使用](https://blog.csdn.net/chunyexiyu/article/details/31014221)

 

 

 

