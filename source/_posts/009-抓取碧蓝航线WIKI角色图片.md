---
title: 抓取碧蓝航线WIKI角色图片
pid: 9
date: 2018-07-07 23:55:32
tags:
  - 爬虫
  - Node
categories:
  - 大前端
---

试玩一下JS爬虫
从碧蓝WIKI抓取角色图片
用到`superagent`, `cheerio`, `request`等库

<!-- more -->

先上代码地址 : [Github](https://github.com/chess99/blhx-spider)

# 实现步骤

## 步骤1 : 获取角色首页

[舰娘首页](http://wiki.joyme.com/blhx/%E8%88%B0%E5%A8%98)有全部角色的列表

用`superagent`获取该页

```JavaScript
  superagent
    .get(jianniangHomeUrl)
    .end(function (err, res) { ... }
```

`superagent`用法参照[文档](https://visionmedia.github.io/superagent/)

## 步骤2 : 分析角色首页

在一个`id="FlourPackage"`的`div`下面,
有一系列`class="Flour"`的`div`, 分别各为一个角色的小图框,
再下面, `a`标签中有角色名和链接

![FlourPackage.png](FlourPackage.png)

用`cheerio`取出这些信息

```JavaScript
  var $ = cheerio.load(data)  // 此处data为上一步读取回来的整个页面
  let characterList = []
  $('#FlourPackage').find('.Flour').each(function () {
    let title = $(this).find('a').attr('title')  // 角色名
    let href = $(this).find('a').attr('href') // 角色链接
    characterList.push([title, href])
  })
```

`cheerio`用法参照[文档](https://visionmedia.github.io/superagent/), 基本和JQuery一致

## 步骤3 : 获取各角色图片链接

一个角色页的[栗子](http://wiki.joyme.com/blhx/%E6%AC%A7%E6%A0%B9%E4%BA%B2%E7%8E%8B)

图片链接在各类似如下的元素里

```HTML
<img alt="欧根亲王立绘.jpg" src="http://p9.qhimg.com/dr/350__/t012066ae5fe5a20298.jpg" ... />
```

图片链接无明显规律, 参照步骤1的方法, 获取每个角色页, 然后用`cheerio`取出图片链接

```JavaScript
  let imgLinks = []
  let imgTypes = ['立绘', '换装', '换装2', '改造', '誓约']
  imgTypes.forEach(type => {
    let selector = `img[alt*="${type}"]`
    let element = $(selector)
    let src = element.attr('src')
    let imgName = element.attr('alt')
    if (imgName && src) {
      imgLinks.push([imgName, src])
    }
  })
```

这里用了正则形式的属性选择器`img[alt*="xxxx"]`, 选出 有alt属性且alt属性含有xxxx子串的img标签
参考[CSS选择器中的正则表达式](https://www.zhangxinxu.com/wordpress/2016/08/regular-expression-in-css-selector/)

## 步骤4 : 下载保存图片

```JavaScript
  request(url)
    .on('error', function (err) {
      callback(null, err)
    })
    .pipe(fs.createWriteStream(savePath))
    .on('close', function () {
      callback(null, url);
    });
```

`request`用法参照[文档](https://github.com/request/request)

## 其他

使用了`async`控制并发数
`async`用法参照[文档](https://caolan.github.io/async/docs.html)

# 后续优化

添加抓取间隔等 ( 现在连续抓取后会被暂时屏蔽 )

# 最后

然而这些图片图像质量并不好..

# 链接

[superagent](https://visionmedia.github.io/superagent/)
[cheerio](https://github.com/cheeriojs/cheerio)
[request](https://github.com/request/request)
[async](https://caolan.github.io/async/docs.html)
[fs.createWriteStream](http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options)
[CSS选择器中的正则表达式](https://www.zhangxinxu.com/wordpress/2016/08/regular-expression-in-css-selector/)