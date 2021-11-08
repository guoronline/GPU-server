# Qt操作



## QVector容器内元素排序和去重简单用法

参考：

[QVector容器内元素排序和去重简单用法（sort、vector、unique、erase）](https://blog.csdn.net/naibozhuan3744/article/details/98883143)

```c++
    std::sort(nodesForDelete.begin(),nodesForDelete.end());     //去重前需要排序
    auto it= std::unique(nodesForDelete.begin(),nodesForDelete.end());   //去除容器内重复元素
    nodesForDelete.erase(it,nodesForDelete.end());
```



# 程序发布

参考：[Qt之程序发布以及打包成exe安装包](https://www.cnblogs.com/linuxAndMcu/p/10974927.html)



## （一）程序发布

执行 `cd F:\VoronoiMeshApp` 命令进入exe 文件所在目录下, 再执行 `dir` 命令查看目录，最后执行 `windeployqt VoronoiMeshApp.exe` 命令，Qt 就会自动把该程序所需要的所有 dll 拷贝过来。

![image-20211108134936327](..\images\Qt\relea01.png)

## （二）补充动态库dll

还需添加：resultTable.dll、Qt5OpenGL.dll。最后保留的动态库如下：

![image-20211108135202424](..\images\Qt\relea02.png)



## （三）程序运行时加载的动态库

参考：

[Linux和windows 查看程序、进程的依赖库的方法](https://www.cnblogs.com/youxin/p/10098982.html)

[process explorer 查看句柄或者加载的dll](https://blog.csdn.net/yasi_xi/article/details/39295843)

在process explorer 查看VoronoiMeshApp.exe的句柄或者加载的dll如下：

### Qt提供的动态库:

![image-20211108142723993](E:\OneDrive\文档\GPU-server\images\Qt\relea05.png)

### 系统提供的动态库：

![image-20211108142409498](..\images\Qt\relea03.png)

![image-20211108142627986](..\images\Qt\relea04.png)

## 其他重要动态库：

C:\Windows\System32\opengl32.dll

C:\Windows\System32\glu32.dll

C:\Windows\System32\umpdc.dll  [解决找不到umpdc.dll的问题](https://www.jb51.net/dll/umpdc.dll.html)

C:\Windows\System32\TextInputFramework.dll  （微软新一代输入法框架）



