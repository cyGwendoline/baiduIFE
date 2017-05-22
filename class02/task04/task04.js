/**
 * 给各个按钮分别绑定一个点击事件
 */
var leftin=getId("left_in");
var rightin=getId("right_in");
var leftout=getId("left_out");
var rightout=getId("right_out");
leftin.onclick=function () {add("left");};
rightin.onclick=function () {add("right");};
leftout.onclick=function () {remove("left");};
rightout.onclick=function () {remove("right");};
/**
 * getId方法
 * 封装getElementById()方法，通过x=getId(x)调用
 * 返回对拥有指定 ID 的第一个对象的引用
 */
function getId(x) {
    if (typeof x == "string") return document.getElementById(x);
    return x;
}
/**
 * add
 * 将input中输入的数字插入队列中
 */
function add(dir) {
    var data=getId("number").value;
    if(data!="") {
        var node_li = createDom(data);
        var ul = getId("show");
        if(dir=="left") {
            ul.insertBefore(node_li,ul.firstChild);
        }else if(dir=="right"){
            ul.appendChild(node_li);
        }
    }
}
/**
 * remove
 * 删除子节点，并显示该子节点内容
 */
function remove(dir) {
    var childnotes=getId("show").childNodes.length;
    var ul=getId("show");
    if(childnotes>0){
        var id_left=ul.firstChild.id;
        var id_right=ul.lastChild.id;
        var dom_left=ul.firstChild.innerHTML;
        var dom_right=ul.lastChild.innerHTML;
        if(dir=="left"){
            if(parseInt(id_left)>0){
                ul.removeChild(ul.firstChild);
                alert(dom_left);
            }else {
                ul.removeChild(ul.firstChild);
            }
        }else if(dir=="right"){
            if(parseInt(id_right)>0){
                ul.removeChild(ul.lastChild);
                alert(dom_right);
            }else {
                ul.removeChild(ul.lastChild);
            }
        }
    }
}
/**
 * createDOM方法
 * 创建子节点
 * 返回创建的子节点
 */
function createDom(data) {
    var node_li=document.createElement("li");
    node_li.innerHTML=data;
    node_li.setAttribute("class","li_style");

    var child_id=Counter();
    node_li.id=String(child_id);
    node_li.onclick=function () {Del(String(child_id));};
    return node_li;
}
/**
 * Del
 * 删除指定子节点
 */
function Del(code) {
    var ul=getId("show");
    var thisnode=getId(code);
    ul.removeChild(thisnode);
}
/**
 * Counter
 * 计数器
 * 返回总插入次数
 */
var Counter=(function(){
    //赋初值
    var count=0;
    //外部调用时形成闭包
    return function(){
        return ++count;
    }
})() ;