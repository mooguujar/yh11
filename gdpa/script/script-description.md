# 脚本目录相关脚本说明

## 若新增脚本，需在此处添加相应脚本说明

### 1. samename.cjs--------查看同名文件

#### 作用：查看目标目录下的(类)同名文件

#### 执行：`node script/samename.cjs src/assets/images dist/assets`

#### 说明： 参数 1：同名文件目录，参数 2：类同名文件目录

### 2. replace.cjs--------替换打包后已压缩的图片到项目资源目录 src/assets/images

#### 作用：减少后续打包时间

#### 执行：`node script/replace.cjs dist/assets src/assets/images`

#### 说明：参数 1：打包后已压缩的图片目录，参数 2：项目工程图片资源目录，执行该命令前，先运行`node script/samename.cjs src/assets/images dist/assets`，看有没有同名文件，备份好结果中的同命文件，再做后续替换
