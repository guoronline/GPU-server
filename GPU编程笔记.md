# GPU编程笔记



# 一、FORTRAN编译

### 1. 采用PGI FORTRAN

#### 查看编译器版本

```
fgf90 -V
```

#### 普通编译

命令：pgf90、pgf95、pgfortran

```
pgf90 -o test01 test01 .f90
```

执行：

```
./test01
```

#### 并行编译

需要CPU并行时，需要参数 -mp

```
pgf90 -mp -o t1 t1.f90
pgf90 -mp -o t2 t2.f90
```

执行：

```
./t1
```



### 2. 采用GFORTRAN

命令：gfortran

```
gfortran -o test01 test01 .f90
```

执行：

```
./test01
```



### 3. 采用intel FORTRAN

Intel Fortran编译器支持F77/90/95标准并与CFV(Compaq Visual Fortran)兼容。

命令：ifort

```
ifort -o test01 test01 .f90
```

执行：

```
./test01
```

例，f.f90

```
program f
print *, "Hello"
stop
end
```

编译：ifort -c f.f90 -o f.o

链接：ifort f.o -o f

运行：./f

编译与连接同样由ifort来完成。

#### ifort常用命令行参数：

-o 输出文件命名

-I include路径

-L lib路径

-l 包含的lib名

-c 仅生成目标文件(*.o),不链接

-On n=0,1,2,3 编译器优化选项，n=0关闭编译器优化，n=3使用最激进的优化

-std90 使用F90标准编译

-std95 使用F 95标准编译

-f77rtl 编译使用F77运行方式的代码（用于解决特殊问题）

These options optimize application performance for a particular Intel? processor or family of processors. The compiler generates code that takes advantage of features of the specified processor.

Option

Description
tpp5 or G5 Optimizes for Intel? Pentium? and Pentium? with MMX? technology processors.
tpp6 or G6 Optimizes for Intel? Pentium? Pro, Pentium? II and Pentium? III processors.
tpp7 or G7 Optimizes for Intel? Pentium? 4, Intel? Xeon?, Intel? Pentium? M processors, and Intel? Pentium? 4 processors with Streaming SIMD Extensions 3 (SSE3) instruction support.
On Intel? EM64T systems, only option tpp7 (Linux) or G7 (Windows) is valid.

About tpp:

http://www.ncsa.illinois.edu/UserInfo/Resources/Software/Intel/Compilers/9.0/main_for/mergedProjects/copts_for/common_options/option_tpp567_g567.htm

https://wiki.duke.edu/display/SCSC/Compilers+and+Libraries

Intel Fortran Compiler Options: http://geco.mines.edu/guide/ifort.html

Intel(R) Fortran Compiler Options: http://www.rcac.purdue.edu/userinfo/resources/common/compile/compilers/intel/man/ifort.txt

ifort编译器提供了非常多的优化参数

$ ifort --help | more 查看就可以
也可以定位到某个参数

$ifort --help | grep -5 '-mkl'
-5表示显示查找到的行及下面5行的内容。

#### 参考例子

[[Linux] icc与ifort编译器的选项](https://blog.csdn.net/weixin_39845406/article/details/116627958?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0.control&spm=1001.2101.3001.4242)

[linux+fortran +openmp+pgf90的测试小例子](http://blog.sina.com.cn/s/blog_b291c26c0102vhas.html)

[linux ifort编译命令,linux下编译fortran程序](https://blog.csdn.net/weixin_36473057/article/details/116627945)



# 二、C编译器

### Intel C/C++编译器

Intel C/C++编译器接受遵守ANSI C/C++ , ISO C/C++ standards,GNU inline ASM for IA-32 architecture标准的输入。与linux下常用的gcc兼容并支持更大的C语言扩展，包括源文件、命令行参数、目标文件。不支持gcc的inline方式的汇编。例，f.c

\#include<stdio.h>

int main(int argc, char* argv[]){

printf("Hello\n");

return 0;

}

编译：icc -c f.cpp -o f.o

链接：icc f.o -o f

运行：./f

注意，编译与链接都由icc来完成，icc常用命令行参数：

-o 输出文件命名

-I include路径

-L lib路径

-l 包含的lib名

-c 仅生成目标文件(*.o),不链接

-On n=0,1,2,3 编译器优化选项，n=0关闭编译器优化，n=3使用最激进的优化

-c99[-] 打开/关闭 c99规范的支持

详细的请参照icc的manpage.



### Intel MKL数学库

Intel MKL数学库针对Intel系列处理器进行了专门的优化，主要包含的库有：

基本线形代数运算(BLAS)

向量与向量、向量与矩阵、矩阵与矩阵的运算

稀疏线形代数运算

快速傅立叶变换(单精度/双精度)

LAPACK(求解线形方程组、最小方差、特征值、Sylvester方程等)

向量数学库(VML)

向量统计学库(VSL)

高级离散傅立叶变换

编译:

icc multi.c -I/opt/intel/mkl/include –L/intel/mkl/lib –lmpi_ipf –o multi



### MPI程序编译

消息传递接口(MPI)并行程序设计模型程序的编译命令。例，f.c

include<stdio.h>

\#include<mpi.h>

main(argc,argv)

int argc;

char *argv[];

{

char name[BUFSIZ];

int length;

MPI_Init(&argc,&argv);

MPI_Get_processor_name(name, &length);

printf("%s: hello world\n", name);

MPI_Finalize();

}

编译与连接均使用mpicc,参数与mpicc中定义的编译器相同，这里与icc相同。

mpicc –c hello.c –o hello.o

mpicc hello.o –o hello

运行使用mpirun 命令，将运行需要的节点定义在文件中并在-machinfile中制定。

文件: nodelist

node1

node1

node2

node3

运行：

$mpirun –machefile nodelist –np 4 ./hello

node1: hello world

node1: hello world

node2: hello world

node3: hello world



### 32位向64位的移植

32位程序到64位移植中应注意的常见问题：

数据截断：

由于long类型变量的运算（赋值、比较、移位等）产生。long定义在x86上为32bits,而在ia64上为64bits.容易在与int型变量运算时出现异常。

处理方法：尽量避免不同类型变量间的运算,避免将长度较长的变量赋值到较短的变量中，统一变量长度可以解决这个问题。简单的对于32位转移到64位可以将所有long定义转换为int定义。





# 参考资料：

[香港浸会大学的PGI Workstation User's Guide](https://www.math.hkbu.edu.hk/parallel/pgi/doc/pgiws_ug/pgi32u_t.htm)

[PGI Documentation](https://docs.nvidia.com/hpc-sdk/pgi-compilers/20.4/x86/index.htm#pgi-compilers)

[PGI Compiler User's Guide](https://docs.nvidia.com/hpc-sdk/pgi-compilers/20.4/x86/pgi-user-guide/index.htm#abstract)  ([PDF](https://docs.nvidia.com/hpc-sdk/pgi-compilers/20.4/pdf/pgi20ug-x86.pdf))



[CUDA Fortran Programming Guide](https://docs.nvidia.com/hpc-sdk/pgi-compilers/20.4/x86/cuda-fortran-prog-guide/index.htm#abstract)  ([PDF](https://docs.nvidia.com/hpc-sdk/pgi-compilers/20.4/pdf/pgi20cudaforug.pdf)) 

[PGI Fortran CUDA Library Interfaces](https://docs.nvidia.com/hpc-sdk/pgi-compilers/20.4/x86/pgi-cuda-interfaces/index.htm#abstract) ([PDF](https://docs.nvidia.com/hpc-sdk/pgi-compilers/20.4/pdf/pgi20cudaint.pdf))



Pgf90 编译的优化参数

http://www.math.hkbu.edu.hk/parallel/pgi/doc/pgiws_ug/pgi32u08.htm#Heading107

 http://www.360doc.com/content/12/1213/10/143605_253741926.shtml

 

编译的多种选项

http://tsubame.gsic.titech.ac.jp/docs/guides/tsubame2/html_en/programming.html

 系统测试

HPL与High Performance Linpack

https://wenku.baidu.com/view/b62d1d0db9f3f90f77c61b00.html?from=search

