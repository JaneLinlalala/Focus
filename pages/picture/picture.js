const util = require('../../utils/util.js')
const c = require("../../utils/class.js");
var app = getApp()

Page({
  onShow: function () {
    //canvas绘制文字和图片
    const cvs = wx.createCanvasContext('myCanvas');
    cvs.drawImage("../../image/share.png", 0, 0);
    var tFood = getApp().data.food;
    var level = tFood.level;
    var size = 40 + level * 10;
    cvs.drawImage(tFood.img, 170 - size, 205 - size);
    cvs.setFontSize(35);
    cvs.setFillStyle("#6ABFEC");
    cvs.fillText(getApp().data.time, 120, 446);
    //
    cvs.setFontSize(16);
    cvs.setFillStyle("#818181");
    //
    var date = new Date();
    if (date.getMonth() + 1 < 10) {
      var myDate = date.getFullYear() + '-' + '0' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    else {
      var myDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
    //
    cvs.fillText(myDate, 120, 520);
    cvs.draw();
  },

  save: function () {
    var that = this;
    //canvas绘制文字和图片
    const ctx = wx.createCanvasContext('myCanvas');
    //
    ctx.draw(true, setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 340,
        height: 540,
        destWidth: 340,
        destHeight: 540,
        canvasId: 'myCanvas',
        success: function (res) {
          console.log(res.tempFilePath);
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              console.log("保存图片：success");
              wx.showToast({
                title: '保存成功',
              });
            },
            fail(res) {
              console.log("保存图片：fail");
              console.log(res);
              if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                console.log("用户一开始拒绝了，再次发起授权")
                console.log('打开设置窗口')
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      console.log('获取权限成功')
                      wx.showToast({
                        title: '获取权限成功，再次点击图片保存到相册',
                      });
                    } else {
                      console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      wx.showToast({
                        title: '获取权限失败，无法保存到相册',
                      });
                    }
                  }
                })
              }
            }
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }, 100))
  }
})