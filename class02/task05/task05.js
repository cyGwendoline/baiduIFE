/**
 * 给各个按钮分别绑定一个点击事件
 */
getId("left_in").onclick=function () {add("left");};
getId("right_in").onclick=function () {add("right");};
getId("left_out").onclick=function () {remove("left");};
getId("right_out").onclick=function () {remove("right");};
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
    countChildNode("show");
    toNumber(data,dir);
}
/**
 * remove
 * 删除子节点，并显示该子节点内容
 */
function remove(dir) {
    var childs=getId("show").childNodes;
    var childnotes=childs.length;
    var ul=getId("show");
    if(childnotes>0){
        var id_left=ul.firstChild.id;
        var id_right=ul.lastChild.id;
        var dom_left=ul.firstChild.innerHTML;
        var dom_right=ul.lastChild.innerHTML;
        if(dir=="left"){
            if(parseInt(id_left)>0){
                ul.removeChild(ul.firstChild);
                removeToMove(childs);
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
    node_li.style.left="0px";
    node_li.style.height=data+"px";//数字大小以高度表示
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
    DelToMove(thisnode);
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
/**
 * toNumber
 * 判断输入的是否是10~100之间的数字
 * 若符合要求增加子节点，否则弹出提示框
 */
function toNumber(obj,dir) {
    var reg =new RegExp("^[0-9]*$");
    if (!reg.test(obj)) {
        alert("请输入10~100之间的数字");
        return false;
    }else {
        var data=obj.replace(/[^0-9]+/g, '');/*将数字字符串转成数值型*/
        if(data>=10 && data <=100) {
            var node_li = createDom(data);
            var ul = getId("show");
            if(dir=="left") {
                var childs=getId("show").childNodes;
                if(childs.length==1 && node_li.id=="1") {
                    ul.insertBefore(node_li,ul.firstChild);
                    ul.removeChild(ul.childNodes[1]);
                }else {
                    addToMove(childs);
                    ul.insertBefore(node_li,ul.firstChild);
                }
            }else if(dir=="right"){
                var count_all=getId("show").childNodes.length;
                node_li.style.left=count_all*30+"px";
                ul.appendChild(node_li);
            }
        }else{
            alert("请输入10~100之间的数字");
            return false;
        }
    }
}
/**
 * countChildNode
 * 统计队列元素数量
 * 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
 */
function countChildNode(father) {
    var count=getId(father).childNodes.length;
    if(count>60){
        alert("您已达到最大上限60个");
    }else {
        return true;
    }
}
/**
 * addToMove
 * 左插入时，将队列中的元素向右移动一位
 */
function addToMove(childN) {
    var count=childN.length;
    for(var i=count-1;i>-1;i--) {
        var now_child_left=childN[i].style.left;
        now_child_left=parseInt(now_child_left);
        var re_child_left=(now_child_left+30);
        childN[i].style.left=re_child_left+"px";
    }
}
/**
 * removeToMove
 * 左删除时，将队列中的元素向左移动一位
 */
function removeToMove(childN) {
    var count=childN.length;
    for(var i=0;i<count;i++) {
        var now_child_left=childN[i].style.left;
        now_child_left=parseInt(now_child_left);
        var re_child_left=(now_child_left-30);
        childN[i].style.left=re_child_left+"px";
    }
}
/**
 * DelToMove
 * 删除任一元素时，将元素右侧的所有元素向左移动一位
 */
function DelToMove(node) {
    var childN=getId("show").childNodes;
    var count=childN.length;
    if(count>1) {
        var start=parseInt(node.style.left)/30;
        for(var i=start;i<count;i++) {
            var now_child_left=childN[i].style.left;
            now_child_left=parseInt(now_child_left);
            var re_child_left=(now_child_left-30);
            childN[i].style.left=re_child_left+"px";
        }
    }

}

/**
 * sort
 * 冒泡排序
 */
getId("sort").onclick=function () {Sort();};
function Sort() {
    var nodes=getId("show").childNodes;
    var len=nodes.length;
    if(len==0) {
        alert("没有可排序元素，请先插入1");
    }else if(len==1) {
        if(!nodes.id) {
            alert("没有可排序元素，请先插入2");
        }else {
            alert("元素已排序");
        }
    }else {
        bubbleSort(len);
        return;
    }
}

function bubbleSort(len) {
    var groups=[];
    for (var g=0;g<len;g++){
        groups[g]=[];
        groups[g][0]=getId("show").childNodes[g];
        groups[g][1]=getId("show").childNodes[g].innerHTML;

    }
    for(var i=0;i<len;i++) {
        for(var j=0;j<len-i-1;j++){
            var len_1 = parseInt(groups[j][1]);
            var len_2 = parseInt(groups[j+1][1]);
            if (len_1 > len_2) {
                var class_ch = groups[j][0].style.left;
                groups[j][0].style.left = groups[j+1][0].style.left;
                groups[j+1][0].style.left = class_ch;
                var g_ch=groups[j];
                groups[j]=groups[j+1];
                groups[j+1]=g_ch;
            }
        }
    }
}