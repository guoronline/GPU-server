# Abaqus输入文件中材料属性的定义



## 一、为单元指定材料

### 关键字：*SOLID SECTION

参考：[ABAQUS 关键字详解 *SOLID SECTION](http://blog.sina.com.cn/s/blog_6817db3a01014f0j.html)

### 作用：

为实体、无限、声和杆单元指定截面属性

### 基本形式：

```
*SOLID SECTION，ELSET=单元集名，MATERIAL=材料名
```

ELSET：设置该参数等于要定义材料属性的单元集名
MATERIAL：材料名

### 例如：

单元集ONE中的单元，材料为CRYSTAL。

```
*SOLID SECTION, ELSET=ONE, MATERIAL=CRYSTAL
```

必须在输入文件中定义单元集ONE，如下：

```
*ELSET,ELSET=ONE
1
```



## 二、定义材料

### 关键字：*MATERIAL：材料名

```
*MATERIAL,NAME=CRYSTAL
**
*USER MATERIAL,CONSTANTS=160,UNSYMM
......
**
*Depvar
    125,
```



后边有两部分：

### 1、状态独立参数数（Depvar）

```
*Depvar
    125,
```

状态独立参数必须大于等于总滑移系统数的十倍，外加5，加用户引入的状态变量数。

number of state dependent variables, must be larger than (or equal to) ten times total number of slip systems in all sets, plus five, plus the additional number of state variables users introduced for their own single crystal model
例如： {110}<111> 有12个滑移系统（slip systems），共有12X10+5=125状态独立参数（ state dependent variables）

### 2、用户材料参数（USER MATERIAL）

```
*USER MATERIAL,CONSTANTS=160,UNSYMM
```

此后接材料参数，数值必须是实数形式。（All the constants below must be real numbers!）

参考数据卡，每行8个材料参数。

#### （一）一般材料的参数（1-3行）

前三行是一般材料的参数。

###### a. 对于各向同性材料 isotropic: 

```
     E    ,  Nu      (Young's modulus and Poisson's ratio)
     0.
     0.
```

###### b. 对于立方体材料 cubic:

三个晶体主轴方向的弹性常数（   1 -- [100],  2 -- [010],  3 -- [001] .  ）

```
     c11  ,  c12  ,  c44
     0.
     0.
```

###### c. 正交各向异性材料orthotropic:

```
     D1111,  D1122,  D2222,  D1133,  D2233,  D3333,  D1212,  D1313,  
     D2233
     0.
```

###### d. 各向异性材料anisotropic:

```
     D1111,  D1122,  D2222,  D1133,  D2233,  D3333,  D1112,  D2212,
     D3312,  D1212,  D1113,  D2213,  D3313,  D1213,  D1313,  D1123,
     D2223,  D3323,  D1223,  D1323,  D2323
```

例如：

```
    168400., 121400., 75400. ,
**    c11  ,   c12  ,   c44  , (elastic constants of copper crystal)
**    MPa  ,   MPa  ,   MPa  , 
```

eight constants each line (data card)



#### （二）滑动系的定义（4-7行）

##### 说明：

滑动系的数量，后边三行为每个滑动系的滑动面法线方向和滑动方向。

```
      1.   ,
** number of sets of slip systems
**    --   ,
**
      1.   ,   1.   ,   1.   ,   1.   ,   1.   ,   0.   ,
**    normal to slip plane   ,      slip direction      , of the 1st set
**    --   ,   --   ,   --   ,   --   ,   --   ,   --   ,
**
      0.   ,
**    normal to slip plane   ,      slip direction      , of the 2nd set
**    --   ,   --   ,   --   ,   --   ,   --   ,   --   ,
**
      0.   ,
**    normal to slip plane   ,      slip direction      , of the 3rd set
**    --   ,
**
```

##### 例如：

```
     1.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
     1.,     1.,     1.,     1.,     1.,     0.,     0.,     0.
     0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
     0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
```



#### （三）总体坐标系里的晶体方向（8-9行）

给定晶体上的两个方向在总体坐标系中的方向。

##### 说明：

```
      -1.  ,   0.   ,   1.   ,   0.   ,   0.   ,   1.   ,
** direction in local system ,      global system       , of the 1st vector
**    ---  ,   --   ,   --   ,   --   ,   --   ,   --   ,
** (the first vector to determine crystal orientation in global system)
**
      0.   ,   1.   ,   0.   ,   0.   ,   1.   ,   0.   ,
** direction in local system ,      global system       , of the 2nd vector
**    --   ,   --   ,   --   ,   --   ,   --   ,   --   ,
** (the second vector to determine crystal orientation in global system)
```

 constraint:  The angle between two non-parallel vectors in the local and global systems should be the same.  The relative difference must be less than 0.1%. 

##### 例如：

```
    -1.,     0.,     1.,     0.,     0.,     1.,     0.,     0.
     0.,     1.,     0.,     0.,     1.,     0.,     0.,     0.
```



#### （四）硬化指数和系数（10-12行）

##### 率相关的晶体材料硬化理论

![image-20211017020342113](..\..\images\hardening2.png)



n：为率敏感指数。

adot ：为参考应变率

gammadot = adot * ( tau / g ) ** n

三个滑动系的硬化指数和系数

```
      10.  ,  .001  ,
**     n   ,  adot  , of 1st set of slip systems
**    ---  ,  1/sec ,
      0.   ,   0.
**    n    ,  adot  , of 2nd set of slip systems
**    ---  ,  1/sec ,
**
      0.   ,   0.   ,
**    n    ,  adot  , of 3rd set of slip systems
**    --   ,  1/sec ,
```

 Users who want to use their own constitutive relation may change the function subprograms F and DFDX called by the subroutine STRAINRATE and provide the necessary data (no more than 8) in the above line (data card).

##### 例如：

```
    10.,  0.001,     0.,     0.,     0.,     0.,     0.,     0.
     0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
     0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
```



#### （五）初始硬化模量、应力和初始临界分切应力（13-18行）

##### 强度的演化

![image-20211017013943178](..\..\images\hardening.png)

##### 自、潜硬化模量的确定

###### 确定方式一：

![image-20211017014515002](..\..\images\hardening0.png)

###### 确定方式二：

![image-20211017015444894](..\..\images\hardening1.png)

##### 参数：

每个滑动系有两行参数，共六行：

```
**    h0   ,  taus  ,  tau0  , of 1st set of slip systems
**    q    ,   q1   , Latent hardening of 1st set of slip systems
```



```
     541.5 ,  109.5 ,  60.8  ,
**    h0   ,  taus  ,  tau0  , of 1st set of slip systems
**    MPa  ,   MPa  ,   MPa  ,
** (initial hardening modulus, saturation stress and initial critical 
**  resolved shear stress)
**  H = H0 * { sech [ H0 * gamma / (taus - tau0 ) ] } ** 2
      1.   ,   1.   ,
**    q    ,   q1   , Latent hardening of 1st set of slip systems
**    --   ,   --   ,
** (ratios of latent to self-hardening in the same and different sets 
**   of slip systems)
```

用户定义自己的硬化准则

Users who want to use their own self-hardening law may change the function subprogram HSELF called by the subroutine LATENTHARDEN  and provide the necessary data (no more than 8) in the above line  (data card).

##### 例如：

```
  541.5,  109.5,   60.8,     0.,     0.,     0.,     0.,     0.
     1.,     1.,     0.,     0.,     0.,     0.,     0.,     0.
     0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
     0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
     0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
     0.,     0.,     0.,     0.,     0.,     0.,     0.,     0.
```



#### （六）积分参数和几何非线性选项（19行）

##### 向前梯度时间积分方案

![image-20211017001859275](E:\OneDrive\文档\GPU-server\images\integration_parameter.png)

##### 参数：

- ##### THETA:  积分参数（implicit integration parameter）, between 0 and 1

- ##### NLGEOM:  该参数确定是否考虑有限变形（考虑几何非线性）

  - ##### 为0，小变形

  - ##### 为1，有限旋转和有限应变，同时必须在*STEP卡中declare "NLGEOM" （finite rotation and finite strain,  Users must declare "NLGEOM" in the input file, at the *STEP card.）如：

  ```
  *STEP,INC=500,NLGEOM
  ```

##### 例如：

```
    0.5,     1.,     0.,     0.,     0.,     0.,     0.,     0.
```



#### （六）迭代选项（20行）

##### 定义：

```
      1.   ,   10.  , 1.E-5  ,
**  ITRATN , ITRMAX , GAMERR ,
```

##### 参数：

- #####  ITRATN:  是否迭代选项，parameter determining whether iteration method is used to solve increments of stresses and state variables in terms of  strain increments

  - #####  ITRATN=0. --- no iteration

  - ##### otherwise --- iteration

- ##### ITRMAX:  最大迭代次数，maximum number of iterations

- ##### GAMERR:  剪应变的绝对误差，absolute error of shear strains in slip systems

##### 例如：

```
     1.,    10.,  1e-05,     0.,     0.,     0.,     0.,     0.
```

