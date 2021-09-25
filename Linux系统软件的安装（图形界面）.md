# Linux系统软件的安装（图形界面）

## 一、概述

实现环境：Redhat 6.7、Comsol 5.2a、Matlab R2018b

本文所述操作均在Root权限下操作，安装前一定要检查版本的兼容性（以官网为准）！！！

## 二、单个iso文件的安装（以Comsol为例）

相较于Windows下软件的安装，Linux系统只是多了iso文件的加载与卸载，具体步骤如下（以下命令均在终端输入）：

### 1、新建目录用于挂载

`cd ~`

`mkdir /home/caoqiufeng/gzcomsol`

### 2、挂载iso文件到新建的文件夹下

命令构成为：

`mount -o loop -t iso9660 +iso文件目录 +挂载目录`

例：

`mount -o loop -t iso9660 /home/caoqiufeng/comsol52.iso /home/caoqiufeng/gzcomsol`

### 3、安装

进入挂载点文件夹，执行安装程序，之后的步骤同win下安装Comsol一样：

`cd /home/caoqiufeng/gzcomsol`

`./setup`

Comsol默认的安装路径为：

`cd /usr/local/comsol52`

### 4、启动设置

启动程序的路径为：

``cd /usr/local/comsol52/multiphysics/bin/`

在此目录下的终端中输入以下命令即可启动Comsol:

`./comsol`

为方便使用，将comsol添加到搜索路径，命令构成为：

`ln -s +启动程序路径  +搜索路径`

例：

`ln -s /usr/local/comsol52/multiphysics/bin/comsol /usr/bin/comsol`

这样在 /usr/bin 目录下即可启动comsol。

### 5、卸载

这步很重要，否则文件夹无法删除，命令构成为：

`umount +iso文件目录`

例：

`umount  /home/caoqiufeng/comsol52.iso`

## 三、多个iso文件的安装（以matlab为例）

其他步骤同上，在安装程序提示插入disk2时，只需另开一个终端，输入以下命令：

`mount -o loop -t iso9660 /home/caoqiufeng/dvd2.iso /home/caoqiufeng/gzmatlab`









