//app.js
const util = require('utils/util.js')
const c = require("utils/class.js");
const defaultTime = {
  defaultWorkTime: 10
}

App({
  data:{
    food:null,
    time:"",
  },
  onLaunch: function() {
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }
  }
})
