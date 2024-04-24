const fs = require('fs')
const path = require('path')

// 读取命令行参数
const targetDir1 = process.argv[2]
const targetDir2 = process.argv[3]
const result1 = {}
const result2 = {}

// 递归遍历目录，找出目标目录1下的同名文件
function walkDir1(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      walkDir1(filePath)
    } else {
      const fileName = path.basename(file)
      if (!filePath.includes('merchant')) {
        if (!result1[fileName]) {
          result1[fileName] = [filePath]
        } else {
          result1[fileName].push(filePath)
        }
      }
    }
  })
}

// 递归遍历目录，找出目标目录2下的近似同名文件
function walkDir2(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      walkDir2(filePath)
    } else {
      const fileName = path.basename(file)
      const baseName = path.basename(file, path.extname(file))
      const extName = path.extname(file)
      const similarFiles = fs
        .readdirSync(dir)
        .filter(f => f.startsWith(baseName) && f.endsWith(extName))
      if (similarFiles.length > 1) {
        result2[fileName] = similarFiles.map(f => path.join(dir, f))
      }
    }
  })
}

// 开始处理
walkDir1(targetDir1)
walkDir2(targetDir2)

// 筛选目标目录1下的同名文件数组
const filteredResult1 = Object.keys(result1)
  .filter(key => result1[key].length > 1)
  .reduce((obj, key) => {
    obj[key] = result1[key]
    return obj
  }, {})

// 输出结果
console.log('目标目录1下的同名文件:')
console.log(filteredResult1)
console.log('目标目录2下的近似同名文件:')
console.log(result2)
