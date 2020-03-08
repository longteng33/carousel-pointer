function Carousel(carouselObj) {
    this.box = carouselObj.box;
    this.img = carouselObj.img;
    this.dots = carouselObj.dots;
    this.prev = carouselObj.prev;
    this.next = carouselObj.next;
    this.intervalTime = carouselObj.intervalTime;
    this.gradualTime = carouselObj.gradualTime;
    this.className = carouselObj.className;
    this.path=carouselObj.path;
    this.pointer=carouselObj.pointer;
    this.size = this.path.length;
    this.i = 0;
    // new时执行如下函数
    this.init();
    // 在setInterval和setTimeout中传入函数时，函数中的this会指向window对象
    // 这是由于setTimeout()调用的代码运行在与所在函数完全分离的执行环境上。这会导致这些代码中包含的 this 关键字会指向 window (或全局)对象
    this.timer = setInterval(this.move.bind(this), this.intervalTime, 1);
}

Carousel.prototype = {

    // toArray方法把类数组转为真数组
    toArray: function (eles) {
        return Array.prototype.slice.call(eles)
    },
    move: function (n) {
        var _this = this;
        this.i += n;
        if (this.i == this.size) {
            this.i = 0;
        };
        if (this.i == -1) {
            this.i = this.size - 1
        };

        if (this.dots) {
            var dotsArr = this.toArray(this.dots);
            dotsArr.forEach(function (item) {
                item.classList.remove(_this.className)
            });
           
            this.dots[this.path[this.i]].classList.add(_this.className);
            var y=this.dots[this.path[this.i]].offsetTop
            this.pointer.style=this.pointer.style.cssText+";transform: translateY("+y+"px)";
        }
        
        var imgArr = this.toArray(this.img);
        imgArr.forEach(function (item) {
            item.classList.remove(_this.className)
        });
        this.img[this.path[this.i]].classList.add(_this.className);
    },

    init: function () {
        var _this = this;
        this.toArray(this.img).forEach(function(item){
            item.style="transition-duration:"+_this.gradualTime+"ms"
        })
        this.pointer.style.cssText="transition-duration:"+_this.gradualTime+"ms"
        // 点击上下键
        if (this.prev) {
            this.prev.onclick = function () {
                _this.move(-1)
            };
        }
        if (this.next) {
            this.next.onclick = function () {
                _this.move(1)
            };
        }

        // mouseover每个小圆点
        if (this.dots) {
            var dotsArr = this.toArray(this.dots);
            dotsArr.forEach(function (item, index) {
                item.index = index;
                item.onmouseover = function (e) {
                    _this.i = e.currentTarget.index - 1;
                    // 因为执行move(1)时i会加1，所以先减一
                    _this.move(1)
                };
            })


        }

        // // 进入时清楚计时器；离开时重启计时器
        this.box.onmouseenter = function () {
            clearInterval(_this.timer);
        };
        this.box.onmouseleave = function () {
            _this.timer = setInterval(_this.move.bind(_this), _this.intervalTime, 1);
        };

    }
}