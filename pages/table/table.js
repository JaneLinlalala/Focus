// pages/table/table.js
const c=require("./class.js");
c.initiateFood();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    myTable:new Array(c.foodNum),
    foodArr:c.foodArr,
    foodNum:c.foodNum
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let foods= wx.getStorageSync('foods')
    if(foods){

    }
    else{
      for(var i=0;i<this['data']['myTable'].length;i++){
        this['data']['myTable'][i]=0;
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的餐桌'
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})