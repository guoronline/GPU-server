# Qt操作

比较好的Qt资源：

[Qt,编程笔记](https://blog.csdn.net/GoForwardToStep)

[Qt汇总](https://www.cnblogs.com/luoxiang/p/13533422.html)

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

使用 Qt 自带的发布程序工具 windeployqt.exe，可以生成所依赖的 dll 文件。







## （一）程序发布

找到 “qtenv2.bat” 运行文件（D:\Qt\5.15.2\mingw81_64\bin\qtenv2.bat）;

按win+r键，打开运行对话框。键入cmd，回车，进入DOS界面，运行qtenv2.bat；（快捷键win+r是指**Windows徽标键+R键**）

执行 `cd D:\VoronoiMeshApp` 命令，进入Qt可执行程序exe 文件所在目录, 再执行 `dir` 命令查看目录，最后执行windeployqt VoronoiMeshApp.exe。 

```bash
D:\Qt\5.15.2\mingw81_64\bin\qtenv2.bat
cd D:\VoronoiMeshApp
dir
windeployqt VoronoiMeshApp.exe
```

 Qt 就会自动把该程序所需要的所有 dll 拷贝过来。

![image-20211108134936327](..\images\Qt\relea01.png)

## （二）补充动态库dll

还需添加：Qt5Charts.dll、Qt5OpenGL.dll。最后保留的动态库如下：

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



# PyQt5 图片兼容性问题

参考：[PyQt5 图片兼容性问题："libpng warning: bKGD: invalid."](https://blog.csdn.net/qq_38161040/article/details/89072022)



# Qt界面

[Qt界面外观之一：Qt风格与特殊效果窗体](https://www.cnblogs.com/linuxAndMcu/p/10133983.html)

[pyqt5学习笔记3: 使用QPalette(调色板)](https://www.cnblogs.com/gaiqingfeng/p/13274916.html)

[Qt实战6.万能的无边框窗口](https://www.cnblogs.com/luoxiang/p/13528745.html)

## QMainWindow窗体应用

[QT之QMainWindow窗体应用 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/52507776)



## QToolBar

[PyQt5基本控件详解之QToolBar(二十五)](https://blog.csdn.net/jia666666/article/details/81589803)

[去掉Qmenu和QToolbar的分割线](https://blog.csdn.net/zxy5691419/article/details/107117397)



## 停靠窗口控件QDockWidget

[实战PyQt5: 052-停靠窗口控件QDockWidget](https://www.codenong.com/cs109839219/)

[第三十一章、containers容器类部件QDockWidget停靠窗功能介绍 ](https://www.cnblogs.com/LaoYuanPython/p/12634949.html)

[Qt小技巧2.停靠区域的占据角设置](https://www.cnblogs.com/luoxiang/p/13548209.html)



## QSettings使用

[QSettings使用 - 简书 (jianshu.com)](https://www.jianshu.com/p/3dd59c9d4882)



## 标签控件QLabel

[GUI学习之三十一—QLabel学习总结](https://www.cnblogs.com/yinsedeyinse/p/11607421.html)



## [VS2019+OpenGL配置：绘制3维图](https://blog.csdn.net/qq_41498261/article/details/109331819)
