一、基本规范
所有名称小写，class 和 id 如有多个变量用中划线连接，只使用名词，语义化
二、模块化编写实践
2.1 语义化
2.2 模块内部类名需继承自父级
whale-yusy ==> whale-yusy-title
2.3 避免不必要的 css 选择符嵌套
正例：
.whale-yusy{}
.whale-yusy-title{}
反例：
.whale-yusy .whale-yusy-title{}
三、命名注意事项
语义化，不要使用 red、left 等表象的词命名
常用状态有：hover,current,selected,disabled,focus,blur,checked,success,error
四、代码风格
4.1 代码格式化
紧凑格式
.pafe { display: block; width: 50px; }
展开格式
.pafe {
display: block;
width: 50px;
}
4.2 代码大小写
建议全部小写字母书写
正例：.pafe { display: block; }
反例：.PAFE { display: BLOCK; }
4.3 选择器
尽量少用通用选择器*，不使用 ID 选择器，不使用无具体语义化的标签选择器
正例：.pafe{} / .pafe li {} / .pafe li p {}
反例：*{} / #pafe{} / .pafe div {}
4.4 代码缩进
统一使用两个空格缩进
4.5 分号
每个属性末尾都要加分号
4.6 代码易读性
左括号与类名之间一个空格，冒号与属性值之间一个空格；逗号分隔的取值，逗号之后一个空格；为单个 css 选择器或新申请开启新行；
颜色值 rgb、rgba、hsl、hsla、rect 不需要空格且取值必须包含前导 0;属性值十六进制数值能简写尽量用简写；不要为 0 指明单位；
正例：
.pafe {
display: block;
box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
color: rgba(255, 255, 255, 0.5);
color: #fff;
margin: 0 10px;
}
.pafe,
.pafe_logo,
.pafe_hd{
color: #ff0;
}
.nav{
color: #fff;
}
反例：
.pafe{display:block;box-shadow: 1px 1px 1px #333,2px 2px 2px #ccc;color:rgba(255, 255, 255, .5);color: #ffffff;margin: 0px 10px;}
.pafe,.pafe_logo,.pafe_hd{colorL #ff0;}.nav{color: #fff;}
4.7 属性值引号
统一要单引号
正例：.pafe { font-family: 'SB'; }
反例：.pafe{font-family:'SB';}
4.8 属性书写顺序
建议遵循以下顺序；
1、布局定位属性：display / position / float / clear / visibility / overflow
2、自身属性：width / height / margin / padding / border / background
3、文本属性：color / font / text-decoration / text-align / vertical-align / white-space / break-word
4、其他属性（css3）：content / cursor / border-radius / box-shadow / text-shadow / background: linear-gradient...
.pafe{
display: block;
position: relative;
float: left;
width: 100px;
height: 100px;
margin: 0 auto;
padding: 20px 0;
font-family: Arial;
color: #333;
background: rgba(0, 0, 0, 0.5);
border-radius: 10px;
}
4.9 CSS3 浏览器私有前缀
