# ABAQUS中Fortran子程序调用方法

## 第一种方法：


1. 建立工作目录

2. 将Abaqus安装目录\6.4-pr11\site下的aba_param_dp.inc（双精度）或aba_param_sp.inc（单精度）拷贝到工作目录，并改名为aba_param.inc；

3. 将编译的fortran程序拷贝到工作目录；

4. 将.obj文件拷贝到工作目录；

5. 建立好输入文件.inp；

6. 运行abaqusjob=inp_name user=fortran name即可。

   


```
abaqus job=Job-1 user=BI_UMAT_code

abaqus job=Job-Lam-Stress user=UMAT-Stress
```



## 第二种方法：

在Job模块里，创建工作，在EditJob对话框中选择General选项卡，在Usersubroutine file中点击Select 按钮，从弹出对话框中选择你要调用的子程序文件（后缀为.for或.f）。



以下是网上摘录的资料，供参考：

用户进行二次开发时，要在命令行窗口执行下面的命令：

 abaqus job=job_name user=sub_name

ABAQUS会把用户的源程序编译成obj文件，然后临时生成一个静态库standardU.lib和动态库standardU.dll，还有其它一些临时文件，而它的主程序（如standard.exe和explicit.exe等）则没有任何改变，由此看来ABAQUS是通过加载上述2个库文件来实现对用户程序的连接，而一旦运行结束则删除所有的临时文件。这种运行机制与ANSYS、LS-DYNA、marc等都不同。

这些生成的临时文件要到文件夹C:\Documentsand Settings\Administrator\Local Settings\Temp\中才能找到，这也是6楼所说的藏了一些工作吧，大家不妨试一下。

子程序格式(程序后缀是.f; .f90; .for;.obj??)

答：我试过，.for格是应该是不可以的，至少6.2和6.3版本应该是不行，其他的没用过，没有发言权。

在Abaqus中，运行abaqusj=jobname user=username时，默认的用户子程序后缀名是.for（.f,.f90应该都不行的，手册上也有讲过），只有在username.for文件没有找到的情况下，才会去搜索username.obj，如果两者都没有，就会报错误信息。

如果username包括扩展名for或obj，那么就根据各自的扩展名ABAQUS会自动选择进行操作。

2CAE中如何调用？Command下如何调用？

答：CAE中在creat job的jobmanager中的general中可以指定子程序；

Command下用命令:abaqus j=jobnameuser=userfilename （无后缀）；

3若有多个子程序同时存在，如何处理

答：将其写在一个文件中即可，然后用一个总的子程序调用（具体参见手册）

4我对VF不是很熟，是否可以用VC，C＋＋编写子程序？

A: 若要在vf中调试，那么应该根据需要把SITE文件夹中的ABA_PARAM_DP.INC（双精度）或ABA_PARAM_SP.INC（单精度）拷到相应的位置，并改名为ABA_PARAM.INC即可。

据说6.4的将可以，6.3的你可以尝试着将VC，C＋＋程序编译为obj文件，没试过。在你的工作目录下应该已经存在ufield.obj和uvarm.obj这两个文件（这两个文件应该是你分别单独调试ufield.FOR和uvarm.FOR时自动编译生成的，你可以将他们删掉试试看），但是由于你的FOR文件中已经有了UV ARM 和UFIELD这两个subroutine，显然会造成重复定义，请查实。

## 用户子程序的使用

假设你的输入文件为：a.inp b.for

那么在ABAQUS Command 中的命令应该是这样的：

abaqus job=a user=b

对于abaqus64pr11，command中输入：

abq64pr11job=a user=b就可以了。

当然首先你要用cd 命令进入输入文件所在的当前文件目录。

强烈建议使用command来操作。

子程序文件名后缀应为.for，而不是.f

# ABAQUS/CAE处理有两个程序：

### ①内核程序；

内核程序实际上就是它的脚本语言，它采用的是Python语言，同时扩展了Python语言，额外提供了大约500个对象模型，对象模型之间的关系复杂。

### ②GUI (graphical user interface—图形用户界面)程序。

GUI程序（图像用户界面程序）是一个方便用户输入或选择参数的图形用户接口。ABAQUS/CAE是采用IPC协议来完成内核程序和GUI程序的通信的。

ABAQUS有限元程序通过集成Python语言向二次开发者提供了很多库函数，通过ABAQUS脚本接口(ABAQUSScripting Interface)，Python语言调用这些库函数来增强ABAQUS的交互式操作功能。它允许用户绕过ABAQUS/CAE的GUI(graphicaluser interfaces)直接与内核交互，可以大大提高工作效率或完成ABAQUS/CAE没有提供的功能。但是因为它没有通过GUI，显的不那么直观，而且如想改变某些参数就不得不修改脚本程序，这些对一般用户来说就显的比较麻烦。因此，对ABAQUS二次开发一般应先开发出GUI后，让用户输入或选择有关参数后，然后生成ABAQUS的脚本语言来自动处理。ABAQUS的GUI 是用ABAQUSGUI Toolkit来编写，它也是对FOXGUI Toolkit的拓展，它在编写程序时也是遵循Python 语言的格式。

# ABAQUS二次开发有如下几种途径：

①通过用户子程序可以开发新的模型，控制ABAQUS计算过程和计算结果；

②通过环境初始化文件可以改变ABAQUS的许多缺省设置；

③通过内核脚本可以实现前处理建模和后处理分析计算结果；

④通过GUI脚本可以创建新的图形用户界面和用户交互。

目前使用较多的是第1种方法和第3种方法。

# 仿真论坛上的帖子：

Abaqus中python的二次开发都是基于前后处理的（差不多就是和CAE进行交流的），要么直接利用Python 生成自己需要的模型或者INP（前处理），要么就是利用Python从已有的*.odb中高效地读取自己想要的数据（后处理）。

ABAQUS的自适应网格不改变网格的拓扑结构（单元和连接的关系），它结合了纯拉格朗日分析（网格随材料移动）和欧拉分析（网格位置固定，材料在网格中流动），被称为“任意拉格朗日-欧拉分析（ALE）”。它通常比纯拉格朗日分析更高效、更精确和更稳定。


abaqus中子程序很多，常见的有材料本构子程序umat，常变量子程序USDFLD

，用户单元子程序uel，蠕变creep等。

就umat开发来说，首先需要在纸面上推导清楚所要开发本构模型的积分和迭代求解格式，然后进行程序实现，最后进行调试。建议先从简单的线弹性开始，慢慢有弹性到塑性到更高级的模型。

这个过程中，用fortran实现是最简单的一环，理清思路是最为重要的。

本构模型积分算法的基本思路是假定某时刻t (即第n增量步)的所有变量值已经给出，并给定了时间步长增量和总应变增量(为弹性应变增量与非弹性应变增量之和)，在此基础上通过数学算法寻求满足离散本构方程的精确应力解。就弹塑性模型来说，普遍做法主要有4步，即弹性预测、状态判断、塑性修正、塑性迭代平衡后进行应力、应变等变量更新，核心方法是Newton-Raphson法求解非线性方程组。



