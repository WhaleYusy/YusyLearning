一、目录/文件命名规范
1.1 项目命名
全部采用小写字母，以中划线分割
正例：mall-management-system
反例：mall_managementSystem
1.2 目录命名
全部采用小写方式，以中划线分割，有复数结构时，要采用复数命名法，缩写不用复数
正例：styles / components / images / utils / demo-test/ img / doc
反例：style / component / imgs / docs
1.3 文件名命名
代码文件命名：包括但不限于 html、js、css 文件，使用小驼峰命名
正例：renderDom.js / signUp.css / index.html
反例：RenderDom.js / sign-up.css / INDEX.html
组件文件命名：如 react、vue 组件，使用大驼峰命名
正例：RenderDom.jsx / MyFamily.vue
反例：renderDom.jsx / my-family.vue
资源文件命名：包括但不限于图片、字体、音频、视频文件，使用下划线连接命名
正例：flower.png / pa18_activity_background.png
反例：Flower.png / pa18-actitvityBackground.png

二、代码命名规范
2.1 变量命名
驼峰命名，变量语义化
正例：let dogName
反例：let dogname, dog*name, DOGNAME, d, name
2.2 布尔值命名
使用 is、are 或者 has 作为前缀
正例：let isBark, areIdeal, hasOwner
反例：let bark, ideal, owner
2.3 函数命名 / 方法命名
使用驼峰命名，使用描述性名词和动词作为前缀
正例：function getName(){}
反例：function name(){}
2.4 常量命名
应该大写，如包含多个单词使用下划线分割
正例：const LEG = 4, DAYS_UNTIL_TOMORROW = '星期一'
反例：const leg = 4， days_untilTomorrow = 'Monday'
2.5 类命名
正例：class DogCartoon{}
反例：class dogCartoon{}
2.6 组件命名
使用大驼峰式命名
正例：function DogCartoon(){} / <DogCartoon />
反例：function dogcartoon(){} / <dogcartoon />
2.7 私有函数命名
下划线或者#作为前缀
2.8 全局变量
可变的以 global 作前缀加驼峰式大小写，不可变的以 GLOBAL*作前缀加下划线大写
2.9 HTML 命名
标签名和属性用小写，属性值用双引号闭合，id 用下划线连接，class 用中划线连接

三、JS 常用名字推荐
3.1 动词推荐
get 获取数据
set 设置数据
reset 还原数据
fetch 请求数据
remove 移除数据
delete 删除数据
compose 组合数据
init 初始化数据
handle 处理数据
