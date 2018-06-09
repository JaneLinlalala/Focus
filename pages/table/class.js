//--Food定义
var foodNum=8;
var nameArr=new Array("水饺","饭团","法式面包","日式拉面","皮蛋瘦肉粥","章鱼小丸子","牛排","三文鱼刺身");
var levelArr=new Array(1,1,1,2,3,4,5,6);
var rootSrc="../../image/food/"
function Food(id,name,level,img){
  this.id=id;
  this.name=name;
  this.level=level;
  this.img=img;
}
//--
var foodArr=new Array(foodNum);
function initiateFood(){
  for(var i=0;i<foodNum;i++){
    foodArr[i] = new Food(i,nameArr[i],levelArr[i],rootSrc+nameArr[i]+".png");
  }
}
//--
//--
module.exports = {
  foodNum: foodNum,
  foodArr: foodArr,
  initiateFood:initiateFood
}
