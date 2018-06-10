const util = require('../../utils/util.js')
const c = require("../../utils/class.js");
var app = getApp()

c.initiateFood();
const defaultLogName = {
  work: '专注'
}
const actionName = {
  stop: '停止',
  start: '开始'
}

const initDeg = {
  left: 45,
  right: -45,
}

Page({

  data: {
    foodId:-1,
    foodArr:c.foodArr,
    //
    remainTimeText: '',
    timerType: 'work',
    log: {},
    completed: false,
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
    array: [10, 30, 45, 60, 90, 120, 150, 180, 210, 240],
    objectArray: [
      {
        id: 0,
        name: '10'
      },
      {
        id: 1,
        name: '30'
      },
      {
        id: 2,
        name: '45'
      },
      {
        id: 3,
        name: '60'
      },
      {
        id: 4,
        name: '90'
      },
      {
        id: 5,
        name: '120'
      },
      {
        id: 6,
        name: '150'
      },
      {
        id: 7,
        name: '180'
      },
      {
        id: 8,
        name: '210'
      },
      {
        id: 9,
        name: '240'
      },
    ],
    index: 0,
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.setStorage({
      key: 'WorkTime',
      data: this.data.array[e.detail.value]
    })
    this.onShow({})
  },


  onShow: function() {
    if (this.data.isRuning) return
    let workTime = util.formatTime(wx.getStorageSync('WorkTime'), 'HH')
    this.setData({
      workTime: workTime,
      remainTimeText: workTime + ':00'
    })
  },

  startTimer: function(e) {
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let timerType = e.target.dataset.type
    let showTime = this.data[timerType + 'Time']
    let keepTime = showTime * 60 * 1000//
    let logName = this.logName || defaultLogName[timerType]

    if (!isRuning) {
      this.timer = setInterval((function() {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.stopTimer()
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: timerType,
      remainTimeText: showTime + ':00',
      taskName: logName
    })

    this.data.log = {
      name: logName,
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
      type: timerType
    }

    this.saveLog(this.data.log)
  },

  startNameAnimation: function() {
    let animation = wx.createAnimation({
      duration: 450
    })
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      nameAnimation: animation.export()
    })
  },

  stopTimer: function() {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })

    // clear timer
    this.timer && clearInterval(this.timer)
  },

  updateTimer: function() {
    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
    let halfTime

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime <= 0) {
      //
      var level = this.generateFood();
      var id=parseInt(Math.random()*100);
      var tempFoo=[];
      for(var i=0;i<c.foodNum;i++){
        if(c.foodArr[i].level==level){
          tempFoo.push(i);
        }
      }
      id=id%tempFoo.length;
      id=tempFoo[id];
      this.setData({
        completed: true,
        foodId:id
      })
      let foods = wx.getStorageSync('foods');
      if(foods){
        foods[id]++;
      }
      else{
        foods=new Array(c.foodNum);
        for(var i=0;i<c.foodNum;i++){
          foods[id]=0;
        }
        foods[id]++;
      }
      wx.setStorage({
        key: 'foods',
        data: foods,
      })
      //
      getApp().data.food=c.foodArr[id];
      getApp().data.time=this.data.objectArray[this.data.index].name;
      this.stopTimer();
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },

  changeLogName: function(e) {
    this.logName = e.detail.value
  },

  saveLog: function(log) {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(log)
    wx.setStorageSync('logs', logs)
  },

  generateFood:function(){
    var workId=this.data.index;
    workId=parseInt(workId);
    var randNum=Math.random();
    var division=[1,1,1,1,1];
    switch(workId){
      case 0: case 1: division = [0.6, 0.8, 0.9, 0.95, 0.99];break;
      case 2: division = [0.2, 0.7, 0.85, 0.95, 0.99];break;
      case 3: division = [0.1, 0.4, 0.8, 0.9, 0.95];break;
      case 4: division = [0.05, 0.25, 0.4, 0.85, 0.95];break;
      case 5: division = [0.01, 0.1, 0.3, 0.65, 0.9];break;
      case 6: case 7: case 8: case 9:division = [0.01, 0.05, 0.2, 0.5, 0.8];break;
    }
    if(randNum<=division[0]){
      return 1;
    }
    else if(randNum<=division[1]){
      return 2;
    }
    else if(randNum<=division[2]){
      return 3;
    }
    else if(randNum<=division[3]){
      return 4;
    }
    else if(randNum<=division[4]){
      return 5;
    }
    else{
      return 6;
    }
  },
})
