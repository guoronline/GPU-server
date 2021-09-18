# 常用命令

[![Linux 命令大全](https://www.runoob.com/images/up.gif) Linux 命令大全](https://www.runoob.com/linux/linux-command-manual.html)

### 查看系统版本号和系统位数

如果是i386或者i686就是32位的，如果是x86_64就是64位的

```bash
# cat /etc/redhat-release
# uname -a
```

### 查看系统的numa状态：

```bash
numactl --hardware
numastat
```



### 检测系统glibc版本

(适用于没有进行过libc升级或者降级操作的机器)

(getconf -a获取全部系统信息|grep glibc -i 提取有glibc字符（-i 不分大小写）相关的行数)

```bash
getconf -a |grep glibc -i 
```

出现如下所示，版本号为：2.12，则需要升级为2.14版本

```bash
# GNU_LIBC_VERSION                   glibc 2.12
```

### 查看`libc.so.6`模块

查看当前系统中是否有`libc.so.6`模块以及支持glibc版本：

```bash
find / -name libc.so.6
/lib64/libc.so.6
/lib/i686/nosegneg/libc.so.6
/lib/libc.so.6

```

```bash
strings /lib64/libc.so.6 | grep GLIB
strings /lib/libc.so.6 | grep GLIB
strings /lib/i686/nosegneg/libc.so.6 | grep GLIB
strings /lib/i686/nosegneg/libc.so.6 | grep GLIB
```

### 检查动态库

```
strings /usr/lib64/libstdc++.so.6 | grep GLIBC
```



###  检测动态库所在目录下的libc.so.6软连接的动态库

a、查看当前系统所设定的动态库路径

```
# env | grep LD_LIBRARY_PATH
```

### Linux 快速删除已输入的命令

直接按Ctrl + c

### 一些快捷键：

```
ctrl + w 往回删除一个单词，光标放在最末尾
ctrl + u 删除光标以前的字符
ctrl + k 删除光标以后的字符
ctrl + a 移动光标至的字符头
ctrl + e 移动光标至的字符尾
ctrl + l 清屏
```

### 简单介绍一下vim的语法

```
默认vim打开后是不能录入的，需要按键才能操作，具体如下：
开启编辑：按“i”或者“Insert”键
退出编辑：“Esc”键
退出vim：“:q”
保存vim：“:w”
保存退出vim：“:wq”
不保存退出vim：“:q!”
```



### 查看端口占用情况

Linux 查看端口占用情况可以使用 **lsof** 和 **netstat** 命令。

------

#### lsof

lsof(list open files)是一个列出当前系统打开文件的工具。

lsof 查看端口占用语法格式：

```
lsof -i:端口号
```

更多 lsof 的命令如下：

```
lsof -i:8080：查看8080端口占用
lsof abc.txt：显示开启文件abc.txt的进程
lsof -c abc：显示abc进程现在打开的文件
lsof -c -p 1234：列出进程号为1234的进程所打开的文件
lsof -g gid：显示归属gid的进程情况
lsof +d /usr/local/：显示目录下被进程开启的文件
lsof +D /usr/local/：同上，但是会搜索目录下的目录，时间较长
lsof -d 4：显示使用fd为4的进程
lsof -i -U：显示所有打开的端口和UNIX domain文件
```

------

#### netstat

**netstat -tunlp** 用于显示 tcp，udp 的端口和进程等相关情况。

netstat 查看端口占用语法格式：

```
netstat -tunlp | grep 端口号
```

- -t (tcp) 仅显示tcp相关选项
- -u (udp)仅显示udp相关选项
- -n 拒绝显示别名，能显示数字的全部转化为数字
- -l 仅列出在Listen(监听)的服务状态
- -p 显示建立相关链接的程序名

例如查看 8000 端口的情况，使用以下命令：

```
# netstat -tunlp | grep 8000
tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      26993/nodejs   
```

更多命令：

```
netstat -ntlp   //查看当前所有tcp端口
netstat -ntulp | grep 80   //查看所有80端口使用情况
netstat -ntulp | grep 3306   //查看所有3306端口使用情况
```

------

#### kill

在查到端口占用的进程后，如果你要杀掉对应的进程可以使用 kill 命令：

```
kill -9 PID
```

如上实例，我们看到 8000 端口对应的 PID 为 26993，使用以下命令杀死进程：

```
kill -9 26993
```



### IP 地址

#### 内部 IP 地址

在 Linux 中，用于显示和配置网络接口的标准命令是 ip 。

要显示所有网络接口和相关 IP 地址的列表，请键入以下命令：

```
ip addr
```

您还可以使用以下命令显示内部 IP 地址：

```
hostname -I
ifconfig
```

#### 公共 IP 地址

有许多在线 HTTP/HTTPS 服务可以使用您的公共 IP 地址进行响应。这里是其中的一些：

- ```
  curl -s http://tnx.nl/ip
  ```

- ```
  curl -s https://checkip.amazonaws.com
  ```

- ```
  curl -s api.infoip.io/ip
  ```

- ```
  curl -s ip.appspot.com
  ```

- ```
  wget -O - -q https://icanhazip.com/
  ```



### yum命令

```
yum clean all               ##清除原有yum缓存
yum repolist                ##列出仓库信息
yum install software    	##安装
yum update                 	##更新
yum list software          	##查看软件
yum list all              	##查看所有软件
yum list installed     		##列出已安装软件
yum list available     		##列出可安装软件
yum reinstall software      ##重新安装
yum remove software         ##卸载
yum info software           ##查看软件信息
yum search software       	##根据软件信息查找软件
yum whatprovides file     	##根据文件找出包含此文件的软件
yum history             	##查看系统中软件管理信息
yum history info 数字       ##对该数字为id的信息进行显示
yum groups list            	##列出软件组 
yum groups info           	##查看软件组的信息
yum groups install sfgroup  ##安装软甲组
yum groups remove sfgroup   ##卸载软件组
```

### export 命令

Linux export 命令用于设置或显示环境变量。

在 shell 中执行程序时，shell 会提供一组环境变量。export 可新增，修改或删除环境变量，供后续执行的程序使用。export 的效力仅限于该次登陆操作。

#### 语法

```bash
export [-fnp][变量名称]=[变量设置值]
```

**参数说明**：

- -f 　代表[变量名称]中为函数名称。
- -n 　删除指定的变量。变量实际上并未删除，只是不会输出到后续指令的执行环境中。
- -p 　列出所有的shell赋予程序的环境变量。

[![Linux 命令大全](https://www.runoob.com/images/up.gif) Linux 命令大全](https://www.runoob.com/linux/linux-command-manual.html)



###  echo 命令

用于字符串的输出。命令格式：

```
echo string
```

 echo $PATH



### source命令详解

[参考](https://www.cnblogs.com/shuiche/p/9436126.html)

source命令用法

```
source FileName
```

 source命令作用

在当前bash环境下读取并执行FileName中的命令。

*注：该命令通常用命令“.”来替代。

使用范例：

```
source filename 
# 中间有空格
. filename
```

 source命令（从 C Shell 而来）是bash shell的内置命令。点命令，就是个点符号，（从Bourne Shell而来）是source的另一名称。

source（或点）命令通常用于重新执行刚修改的初始化文档，如 .bash_profile 和 .profile 这些配置文件。



### find

find / -name "dbus-daemon"

### 查看CUDA版本

cat /usr/local/cuda-10.2/version.txt

### 查看CUDNN版本

cat /usr/local/cuda-10.2/include/cudnn.h | grep CUDNN_MAJOR -A 2

### 配置文件执行过程

在刚登录Linux时，

首先启动 /etc/profile 文件，

然后再启动用户目录下的 ~/.bash_profile、 ~/.bash_login或 ~/.profile文件中的其中一个，用户主目录下文件的执行的顺序为：

　　　　　　　　　　~/.bash_profile -> ~/.bash_login -> ~/.profile。

## ./configure、make、make install 命令

参考：[Linux 命令详解（三）./configure、make、make install 命令](https://blog.csdn.net/qq756684177/article/details/81519021?utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromMachineLearnPai2~default-12.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromMachineLearnPai2~default-12.control)



root：~/.bash_profile --> ~/.bashrc -->  /etc/bashrc 

## 系统信息查询大全

原文链接：https://blog.csdn.net/qq_31278903/article/details/83146031

##### 常用命令

uname -a # 查看内核/操作系统/CPU信息 

head -n 1 /etc/issue # 查看操作系统版本 

cat /proc/cpuinfo # 查看CPU信息 

hostname # 查看计算机名 

lspci -tv # 列出所有PCI设备 

lsusb -tv # 列出所有USB设备 

lsmod # 列出加载的内核模块 

env # 查看环境变量资源 

free -m # 查看内存使用量和交换区使用量 

df -h # 查看各分区使用情况 

du -sh <目录名> # 查看指定目录的大小 

grep MemTotal /proc/meminfo # 查看内存总量 

grep MemFree /proc/meminfo # 查看空闲内存量 

uptime # 查看系统运行时间、用户数、负载 

cat /proc/loadavg # 查看系统负载磁盘和分区 

0mount | column -t # 查看挂接的分区状态 

fdisk -l # 查看所有分区 

swapon -s # 查看所有交换分区 

hdparm -i /dev/hda # 查看磁盘参数(仅适用于IDE设备) 

dmesg | grep IDE # 查看启动时IDE设备检测状况网络 

ifconfig # 查看所有网络接口的属性 

iptables -L # 查看防火墙设置 

route -n # 查看路由表 

netstat -lntp # 查看所有监听端口 

netstat -antp # 查看所有已经建立的连接 

netstat -s # 查看网络统计信息进程 

ps -ef # 查看所有进程 

top # 实时显示进程状态用户 

w # 查看活动用户 

id <用户名> # 查看指定用户信息 

last # 查看用户登录日志 

cut -d: -f1 /etc/passwd # 查看系统所有用户 

cut -d: -f1 /etc/group # 查看系统所有组 

crontab -l # 查看当前用户的计划任务服务 

chkconfig –list # 列出所有系统服务 

chkconfig –list | grep on # 列出所有启动的系统服务程序 

rpm -qa # 查看所有安装的软件包

##### 系统时间

查看/proc/uptime文件计算系统启动时间：

cat /proc/uptime
输出: 5113396.94 575949.85

第一数字即是系统已运行的时间5113396.94秒，运用系统工具date即可算出系统启动时间

date -d "$(awk -F. '{print $1}' /proc/uptime) second ago" +"%Y-%m-%d %H:%M:%S"

输出: 2018-01-02 06:50:52

查看/proc/uptime文件计算系统运行时间

cat /proc/uptime| awk -F. '{run_days=$1 / 86400;run_hour=($1 % 86400)/3600;run_minute=($1 % 3600)/60;run_second=$1 % 60;printf("系统已运行：%d天%d时%d分%d秒",run_days,run_hour,run_minute,run_second)}'

输出:系统已运行：1天1时36分13秒

##### 物理CPU

Linux查看物理CPU个数、核数、逻辑CPU个数

总核数 = 物理CPU个数 X 每颗物理CPU的核数 

总逻辑CPU数 = 物理CPU个数 X 每颗物理CPU的核数 X 超线程数

查看物理CPU个数

cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l
2

###### 查看每个物理CPU中core的个数(即核数)

cat /proc/cpuinfo| grep "cpu cores"| uniq
cpu cores       : 2

###### 查看逻辑CPU的个数

cat /proc/cpuinfo| grep "processor"| wc -l


###### 查看CPU信息（型号）

cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
      4  Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz



输入命令cat /proc/cpuinfo 查看physical id有几个就有几个物理cpu；查看processor有几个就有几个逻辑cpu。
(一)概念
① 物理CPU
实际Server中插槽上的CPU个数
物理cpu数量，可以数不重复的physical id有几个
② 逻辑CPU 
/proc/cpuinfo用来存储cpu硬件信息的
信息内容分别列出了processor 0 –processor n 的规格。这里需要注意，n+1是逻辑cpu数
一般情况，我们认为一颗cpu可以有多核，加上intel的超线程技术(HT), 可以在逻辑上再分一倍数量的cpu core出来
逻辑CPU数量=物理cpu数量 x cpu cores 这个规格值 x 2(如果支持并开启ht)    
备注一下：Linux下top查看的CPU也是逻辑CPU个数
 ③ CPU核数
一块CPU上面能处理数据的芯片组的数量、比如现在的i5 760,是双核心四线程的CPU、而 i5 2250 是四核心四线程的CPU
一般来说，物理CPU个数×每颗核数就应该等于逻辑CPU的个数，如果不相等的话，则表示服务器的CPU支持超线程技术

lscpu命令，查看的是cpu的统计信息

##### 内存

概要查看内存情况  free  -m    详细情况：cat /proc/meminfo

查看硬盘和分区分布： lsblk

如果要看硬盘和分区的详细信息：fdisk -l

使用“df -k”命令，以KB为单位显示磁盘使用量和占用率，-m则是以M为单位显示磁盘使用量和占用率

##### 网卡

查看网卡硬件信息

lspci | grep -i 'eth'

02:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8111/8168B PCI Express Gigabit Ethernet controller (rev 06)

查看系统的所有网络接口：ifconfig -a

如果要查看某个网络接口的详细信息，例如eth0的详细参数和指标：ethtool eth0

查看pci信息，即主板所有硬件槽信息：lspci

如果要更详细的信息:lspci -v 或者 lspci -vv

如果要看设备树:lspci -t

#####  Linux /proc目录详解

1. /proc目录
   Linux 内核提供了一种通过 /proc 文件系统，在运行时访问内核内部数据结构、改变内核设置的机制。proc文件系统是一个伪文件系统，它只存在内存当中，而不占用外存空间。它以文件系统的方式为访问系统内核数据的操作提供接口。
   用户和应用程序可以通过proc得到系统的信息，并可以改变内核的某些参数。由于系统的信息，如进程，是动态改变的，所以用户或应用程序读取proc文件时，proc文件系统是动态从系统内核读出所需信息并提交的。下面列出的这些文件或子文件夹，并不是都是在你的系统中存在，这取决于你的内核配置和装载的模块。另外，在/proc下还有三个很重要的目录：net，scsi和sys。 Sys目录是可写的，可以通过它来访问或修改内核的参数，而net和scsi则依赖于内核配置。例如，如果系统不支持scsi，则scsi 目录不存在。
   除了以上介绍的这些，还有的是一些以数字命名的目录，它们是进程目录。系统中当前运行的每一个进程都有对应的一个目录在/proc下，以进程的 PID号为目录名，它们是读取进程信息的接口。而self目录则是读取进程本身的信息接口，是一个link。

2. 子文件或子文件夹
   /proc/buddyinfo 每个内存区中的每个order有多少块可用，和内存碎片问题有关
   /proc/cmdline 启动时传递给kernel的参数信息
   /proc/cpuinfo cpu的信息
   /proc/crypto 内核使用的所有已安装的加密密码及细节
   /proc/devices 已经加载的设备并分类
   /proc/dma 已注册使用的ISA DMA频道列表
   /proc/execdomains Linux内核当前支持的execution domains
   /proc/fb 帧缓冲设备列表，包括数量和控制它的驱动
   /proc/filesystems 内核当前支持的文件系统类型
   /proc/interrupts x86架构中的每个IRQ中断数
   /proc/iomem 每个物理设备当前在系统内存中的映射
   /proc/ioports 一个设备的输入输出所使用的注册端口范围
   /proc/kcore 代表系统的物理内存，存储为核心文件格式，里边显示的是字节数，等于RAM大小加上4kb
   /proc/kmsg 记录内核生成的信息，可以通过/sbin/klogd或/bin/dmesg来处理
   /proc/loadavg 根据过去一段时间内CPU和IO的状态得出的负载状态，与uptime命令有关
   /proc/locks 内核锁住的文件列表
   /proc/mdstat 多硬盘，RAID配置信息(md=multiple disks)
   /proc/meminfo RAM使用的相关信息
   /proc/misc 其他的主要设备(设备号为10)上注册的驱动
   /proc/modules 所有加载到内核的模块列表
   /proc/mounts 系统中使用的所有挂载
   /proc/mtrr 系统使用的Memory Type Range Registers (MTRRs)
   /proc/partitions 分区中的块分配信息
   /proc/pci 系统中的PCI设备列表
   /proc/slabinfo 系统中所有活动的 slab 缓存信息
   /proc/stat 所有的CPU活动信息
   /proc/sysrq-trigger 使用echo命令来写这个文件的时候，远程root用户可以执行大多数的系统请求关键命令，就好像在本地终端执行一样。要写入这个文件，需要把/proc/sys/kernel/sysrq不能设置为0。这个文件对root也是不可读的
   /proc/uptime 系统已经运行了多久
   /proc/swaps 交换空间的使用情况
   /proc/version Linux内核版本和gcc版本
   /proc/bus 系统总线(Bus)信息，例如pci/usb等
   /proc/driver 驱动信息
   /proc/fs 文件系统信息
   /proc/ide ide设备信息
   /proc/irq 中断请求设备信息
   /proc/net 网卡设备信息
   /proc/scsi scsi设备信息
   /proc/tty tty设备信息
   /proc/net/dev 显示网络适配器及统计信息
   /proc/vmstat 虚拟内存统计信息
   /proc/vmcore 内核panic时的内存映像
   /proc/diskstats 取得磁盘信息
   /proc/schedstat kernel调度器的统计信息
   /proc/zoneinfo 显示内存空间的统计信息，对分析虚拟内存行为很有用

以下是/proc目录中进程N的信息
/proc/N pid为N的进程信息
/proc/N/cmdline 进程启动命令
/proc/N/cwd 链接到进程当前工作目录
/proc/N/environ 进程环境变量列表
/proc/N/exe 链接到进程的执行命令文件
/proc/N/fd 包含进程相关的所有的文件描述符
/proc/N/maps 与进程相关的内存映射信息
/proc/N/mem 指代进程持有的内存，不可读
/proc/N/root 链接到进程的根目录
/proc/N/stat 进程的状态
/proc/N/statm 进程使用的内存的状态
/proc/N/status 进程状态信息，比stat/statm更具可读性
/proc/self 链接到当前正在运行的进程



## conda环境的开关

```
 conda activate
 conda deactivate
```



## 批量生成账号的方法

username.txt

```
zhangrui
lihuan
gaiwenhai
zhangwenyan
liyue
suyangming
liuguangying
zhaokuiyu
lijianfei
zenxing
caoqiufeng
maochao
zhangqinmin
tangli
raojie
lizijun
wanglihui
```

方法1：批量添加的脚本文件adduser.sh

```
cat username.txt | while read line
do
echo  "creat user:  $line  ................."
useradd -m -d /data/home/voronoi/$line $line
##生成密码文件
echo ""$line":"$line"" >>serc.txt
done
##批处理模式下更新密码
chpasswd < serc.txt
##将上述的密码转换到密码文件和组文件
pwconv
##结束验证信息
echo "OK 新建完成"
```

执行该脚本文件，查看执行过程

```
sh adduser.sh
```



方法2：批量添加的脚本文件aa.sh

```
##添加用户，并且在/home/ 下为用户生成用户目录。
cat < username.txt | xargs -n 1 useradd -m
##批处理模式下更新密码
chpasswd < serc.txt
##将上述的密码转换到密码文件和组文件
pwconv
##结束验证信息
echo "OK 新建完成"
```

执行该脚本文件，查看执行过程

```
sh aa.sh
```





