# carousel-pointer
<h1>带焦点框的轮播图<h1>
 https://longteng33.github.io/carousel-pointer/<br>
1,焦点框使用绝对定位定位在小图片上，通过改变transform: translateY(0)，和transition实现动画移动<br>
2，通过js改变元素的style属性，那么原来的style属性就被覆盖了，所以可以使用 pointer.style=pointer.style.cssText+";transform: translateY("+y+"px)" 的方式，拼接了一段css样式，而不覆盖原来的css样式<br>