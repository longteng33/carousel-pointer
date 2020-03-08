var box=document.getElementsByClassName("banner-box")[0];
var tags=document.getElementsByClassName("tag-item");
var img=document.getElementsByClassName("banner-item");
var pointer=document.getElementsByClassName("pointer")[0];

var carouselObj = new Carousel({
    box: box,
    img: img,
    dots: tags,
    // prev: prev,
    // next: next,
    intervalTime: 1200,//自动轮播间隔
    gradualTime: 800,//渐变时间
    className: "active",
    path:[0,1,2,1],//轮播顺序
    pointer:pointer,
})

function toArray(obj){
    return Array.prototype.slice.call(obj)
}
toArray(tags).forEach(function(item){
    item.onmouseenter=function(e){
        var y=e.currentTarget.offsetTop;
        pointer.style=pointer.style.cssText+";transform: translateY("+y+"px)";
    }
})



