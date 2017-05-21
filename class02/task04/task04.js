/**
 * getId方法
 * 封装getElementById()方法，通过x=getId(x)调用
 * 返回对拥有指定 ID 的第一个对象的引用
 */
function getId(x) {
    if (typeof x == "string") {
        return document.getElementById(x);
    }else {
        return false;
    }
    //return x;
}
/**
 * createDOM方法
 * 创建子节点
 * 返回创建的子节点
 */
function createDom(data) {
    var text_li=data;
    var node_li=document.createElement("li");
    var textnode_li = document.createTextNode(text_li);
    node_li.appendChild(textnode_li);
    var atr=document.createAttribute("class");
    atr.nodeValue="li_style";
    node_li.setAttributeNode(atr);
    node_li.id=String(data);
    return node_li;
}
/**
 * getDomNum方法
 * 获取要删除的子节点的内容
 * 返回要删除的子节点内容，int
 */
function getDomNum(data) {
    var dom_num=getId(data).innerHTML;
    return dom_num;
}
/**
 * LeftIn
 * 点击"左侧入"，将input中输入的数字从左侧插入队列中
 */
function LeftIn(data) {
    var node_li=createDom(data);
    var ul=getId("ul");
    ul.insertBefore(node_li,ul.childNodes[0]);
}
/**
 * RightIn
 * 点击"右侧入"，将input中输入的数字从右侧插入队列中
 */
function RightIn(data) {
    var node_li=createDom(data);
    var ul=getId("ul");
    ul.appendChild(node_li);
}
/**
 * LeftOut
 * 点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值
 */
function LeftOut(data) {
    var dom_num=getDomNum(data);
    var ul=getId("ul");
    ul.removeChild(ul.childNodes[0]);
    alert(dom_num);
}
/**
 * RightOut
 * 点击"右侧出"，读取并删除队列右侧第一个元素，并弹窗显示元素中数值
 */
function RightOut(data) {
    var dom_num=getDomNum(data);
    var ul=getId("ul");
    var last_dom=ul.lastElementChild ? ul.lastElementChild : ul.lastChild;
    ul.removeChild(last_dom);
    alert(dom_num);
}
/**
 * Delete
 * 点击队列中任何一个元素，则该元素会被从队列中删除
 */
function Delete(data) {
    var ul=getId("ul");
    ul.removeChild(data);
}
/**
 * btnHandle
 * 总处理函数
 */
function btnHandle(xid) {
    switch (xid){ //根据不同按钮id选择不同处理方法
        case "left_in":
            LeftIn(xid);
            break;
        case "right_in":
            RightIn(xid);
            break;
        case "left_out":
            LeftOut(xid);
            break;
        case "right_out":
            RightOut(xid);
            break;
        default:
            Delete(xid);
            break;
    }
}
/**
 * init
 * 给x元素绑定一个点击事件，点击时触发btnHandle函数
 */
function init(x) {
    var xtag=getId("x");
    if(xtag!=false){
        var xid=xtag.id;//获取按钮id
        xtag.addEventListener('click',btnHandle(xid),false);
    }else {
        createDom("请输入正确数字");
    }
}
init();
