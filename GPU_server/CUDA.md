### 查看GPU型号

lspci | grep -i nvidia

```
07:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
08:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
0d:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
0e:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
11:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
12:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
86:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
87:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
8a:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
8b:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
90:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
91:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
94:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)
95:00.0 3D controller: NVIDIA Corporation GK210GL [Tesla K80] (rev a1)

```



nvidia-smi

```
Tue Oct 18 22:14:22 2022       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 460.27.04    Driver Version: 460.27.04    CUDA Version: 11.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  Tesla K80           Off  | 00000000:07:00.0 Off |                    0 |
| N/A   28C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   1  Tesla K80           Off  | 00000000:08:00.0 Off |                    0 |
| N/A   24C    P8    29W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   2  Tesla K80           Off  | 00000000:0D:00.0 Off |                    0 |
| N/A   26C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   3  Tesla K80           Off  | 00000000:0E:00.0 Off |                    0 |
| N/A   24C    P8    30W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   4  Tesla K80           Off  | 00000000:11:00.0 Off |                    0 |
| N/A   29C    P8    25W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   5  Tesla K80           Off  | 00000000:12:00.0 Off |                    0 |
| N/A   23C    P8    30W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   6  Tesla K80           Off  | 00000000:86:00.0 Off |                    0 |
| N/A   26C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   7  Tesla K80           Off  | 00000000:87:00.0 Off |                    0 |
| N/A   22C    P8    31W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   8  Tesla K80           Off  | 00000000:8A:00.0 Off |                    0 |
| N/A   26C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   9  Tesla K80           Off  | 00000000:8B:00.0 Off |                    0 |
| N/A   22C    P8    30W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|  10  Tesla K80           Off  | 00000000:90:00.0 Off |                    0 |
| N/A   25C    P8    25W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|  11  Tesla K80           Off  | 00000000:91:00.0 Off |                    0 |
| N/A   23C    P8    30W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|  12  Tesla K80           Off  | 00000000:94:00.0 Off |                    0 |
| N/A   26C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|  13  Tesla K80           Off  | 00000000:95:00.0 Off |                    0 |
| N/A   24C    P8    29W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+

```

### TESLA K80 加速器特性和优势

- 具有 4992 个 NVIDIA CUDA 核心，采用双 GPU 设计
- 借助 NVIDIA GPU Boost 使双精度浮点运算能力高达 2.91 万亿次
- 借助 NVIDIA GPU Boost 使单精度浮点运算能力高达 8.73 万亿次
- 24 GB 的 GDDR5 显存
- 480 GB/s 的总显存带宽
- 提供 ECC 保护，可增强可靠性
- 服务器经过优化，可在数据中心实现最佳吞吐量



14个K80拥有14X4992核 =69888核

查找一些软件在不在
lsmod |grep nvidia

whereis cuda

#### CUDA的安装目录

\usr\local\cuda-11.2\

\usr\local\cuda\



/usr/local/cuda/bin/nvcc -ccbin g++ -I../../common/inc  -m64    --threads 0 -gencode arch=compute_35,code=sm_35 -gencode arch=compute_37,code=sm_37 -gencode arch=compute_50,code=sm_50 -gencode arch=compute_52,code=sm_52 -gencode arch=compute_60,code=sm_60 -gencode arch=compute_61,code=sm_61 -gencode arch=compute_70,code=sm_70 -gencode arch=compute_75,code=sm_75 -gencode arch=compute_80,code=sm_80 -gencode arch=compute_86,code=sm_86 -gencode arch=compute_86,code=compute_86 -o matrixMul.o -c matrixMul.cu





export PATH=//usr/local/cuda-11.2/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-11.2/lib64$LD_LIBRARY_PATH

### Linux系统中安装CUDA和cuDNN教程并检查安装成功

[ Linux系统中安装CUDA和cuDNN教程并检查安装成功](https://blog.csdn.net/erdaidai/article/details/125846275)

Linux系统中安装CUDS和cuDNN教程


##### 首先要查看服务器中显卡驱动支持的最大cuda版本。

在服务器中输入：nvidia-smi，得到如下版本信息。

```
Tue Oct 18 22:14:22 2022       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 460.27.04    Driver Version: 460.27.04    CUDA Version: 11.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  Tesla K80           Off  | 00000000:07:00.0 Off |                    0 |
| N/A   28C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   1  Tesla K80           Off  | 00000000:08:00.0 Off |                    0 |
| N/A   24C    P8    29W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   2  Tesla K80           Off  | 00000000:0D:00.0 Off |                    0 |
| N/A   26C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   3  Tesla K80           Off  | 00000000:0E:00.0 Off |                    0 |
| N/A   24C    P8    30W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   4  Tesla K80           Off  | 00000000:11:00.0 Off |                    0 |
| N/A   29C    P8    25W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   5  Tesla K80           Off  | 00000000:12:00.0 Off |                    0 |
| N/A   23C    P8    30W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   6  Tesla K80           Off  | 00000000:86:00.0 Off |                    0 |
| N/A   26C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   7  Tesla K80           Off  | 00000000:87:00.0 Off |                    0 |
| N/A   22C    P8    31W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   8  Tesla K80           Off  | 00000000:8A:00.0 Off |                    0 |
| N/A   26C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   9  Tesla K80           Off  | 00000000:8B:00.0 Off |                    0 |
| N/A   22C    P8    30W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|  10  Tesla K80           Off  | 00000000:90:00.0 Off |                    0 |
| N/A   25C    P8    25W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|  11  Tesla K80           Off  | 00000000:91:00.0 Off |                    0 |
| N/A   23C    P8    30W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|  12  Tesla K80           Off  | 00000000:94:00.0 Off |                    0 |
| N/A   26C    P8    26W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|  13  Tesla K80           Off  | 00000000:95:00.0 Off |                    0 |
| N/A   24C    P8    29W / 149W |      0MiB / 11441MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+

```

第一行可以看到，最大支持cuda 11.2。

##### 安装包下载

在[cuda官网](https://developer.nvidia.cn/cuda-toolkit-archive)选择合适的版本。

根据如图选择配置。

![在这里插入图片描述](E:\OneDrive\文档\GPU-server\images\fb9f356761d3411c8856b4a7e27dbc12.png)

安装成功会出现安装路径。

![在这里插入图片描述](https://img-blog.csdnimg.cn/dc92757ad4a148d3ae11575f6a4c6c1c.png)

##### 配置环境变量

打开配置文件

```
vi /etc/profile
```

在配置文件末尾加上（注意这里的/usr/local/cuda-11.5路径和上面安装截图里面的路径一直）

```
export PATH=//usr/local/cuda-11.2/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-11.2/lib64$LD_LIBRARY_PATH
```


source一下配置文件

```
source /etc/profile
```

##### 检查是否安装完成

使用nvcc -V检查CUDA是否安装成功，出现一下提示代表安装成功。

![在这里插入图片描述](E:\OneDrive\文档\GPU-server\images\46c85f35c13e4ca4b134c1fb25775dad.png)

编译并执行CUDA样例程序，出现pass代表CUDA和GPU运行正常。

```
cd /usr/local/cuda-11.5/samples/1_Utilities/deviceQuery
sudo make
./deviceQuery
```



##### 安装cuDNN

到 官网下载与CUDA匹配的

![在这里插入图片描述](E:\OneDrive\文档\GPU-server\images\240b7e2d68a4488a8824bb5fabb4851a.png)

我是在本地下载好了后，上传到服务器首目录下，然后解压。

![在这里插入图片描述](E:\OneDrive\文档\GPU-server\images\3a53dc1a65af4310bb63927fac0f0ad9.png)

解压cuDNN文件，并进入解压出来的文件，拷贝文件到/usr/local/cuda-11.2中

	tar -xvf cudnn-linux-x86_64-8.4.0.27_cuda11.6-archive.tar.xz
	cd cudnn-linux-x86_64-8.4.0.27_cuda11.6-archive
	sudo cp lib/* /usr/local/cuda-11.2/lib64/
	sudo cp include/* /usr/local/cuda-11.2/include/
	sudo chmod a+r /usr/local/cuda-11.2/lib64/*
	sudo chmod a+r /usr/local/cuda-11.2/include/*
查看cuDNN版本，cat /usr/local/cuda/include/cudnn_version.h | grep CUDNN_MAJOR -A 2

![image-20221019010508513](E:\OneDrive\文档\GPU-server\images\image-20221019010508513.png)

![在这里插入图片描述](E:\OneDrive\文档\GPU-server\images\a97e09a7870d43d0883c8bfa6d41bd14.png)

版本：805000