// pages/order_store_des/order_store_des.js
const { $Message } = require('../../dist/base/index');
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aresid:null,
    storeMes:"",
    aresname:"",
    aresmobile:"",
    aresmessage:"",
    date:"",
    visible5: false,
    visible6: false,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '处理',
        color: '#ed3f14',
        loading: false
      }
    ],
    actions6: [
      {
        name: '取消'
      },
      {
        name: '忽略',
        color: '#ed3f14',
        loading: false
      }
    ]
  },

  handleOpen5() {
    this.setData({
      visible5: true
    });
  },

  handleOpen6() {
    this.setData({
      visible6: true
    });
  },

  handleClick5({ detail }) {
    if (detail.index === 0) {
      this.setData({
        visible5: false
      });
    } else {
      const action = [...this.data.actions5];
      action[1].loading = true;

      this.setData({
        actions5: action
      });
      var that = this;
      wx.request({
        url: requestIP + '/assistant/handleAreaReservation',
        data: {
          aresid: that.data.aresid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'userid': app.globalData.userid
        },
        success(res) {
          console.log(res.data.data);
          if (res.data.resultCode == '101') {
            setTimeout(() => {
              action[1].loading = false;
              this.setData({
                visible5: false,
                actions5: action
              });

              $Message({
                content: '操作成功！',
                type: 'success'
              });
            }, 2000);
            wx.redirectTo({
              url: '/pages/order/order',
            })
          }
          else {
            setTimeout(() => {
              action[1].loading = false;
              this.setData({
                visible5: false,
                actions5: action
              });

              $Message({
                content: '操作失败！',
                type: 'error'
              });
            }, 2000);
          }
        },
        fail(res) {
          setTimeout(() => {
            action[1].loading = false;
            this.setData({
              visible5: false,
              actions5: action
            });

            $Message({
              content: '操作失败！',
              type: 'error'
            });
          }, 2000);
        }
      })

    }
  },

  handleClick6({ detail }) {
    if (detail.index === 0) {
      this.setData({
        visible6: false
      });
    } else {
      const action = [...this.data.actions5];
      action[1].loading = true;

      this.setData({
        actions6: action
      });
      var that = this;
      wx.request({
        url: requestIP + '/assistant/cancelAreaReservation',
        data: {
          aresid: that.data.aresid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'userid': app.globalData.userid
        },
        success(res) {
          console.log(res.data.data);
          if (res.data.resultCode == '101') {
            setTimeout(() => {
              action[1].loading = false;
              this.setData({
                visible5: false,
                actions5: action
              });

              $Message({
                content: '操作成功！',
                type: 'success'
              });
            }, 2000);
            wx.redirectTo({
              url: '/pages/order/order',
            })
          }
          else {
            setTimeout(() => {
              action[1].loading = false;
              this.setData({
                visible5: false,
                actions5: action
              });

              $Message({
                content: '操作失败！',
                type: 'error'
              });
            }, 2000);
          }
        },
        fail(res) {
          setTimeout(() => {
            action[1].loading = false;
            this.setData({
              visible5: false,
              actions5: action
            });

            $Message({
              content: '操作失败！',
              type: 'error'
            });
          }, 2000);
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var aresid= that.options.aresid;
    that.setData({
      aresid: aresid
    })
    that.getAreaReservationDetail();
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
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
    var that = this;
    that.getAreaReservationDetail();
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

  },

  //处理


  //忽略

//获取预约信息
  getAreaReservationDetail:function(e){
    var that = this;
    var aresid = that.data.aresid;
    wx.request({
      url: requestIP + '/assistant/getAreaReservationDetail',
      data: {
        aresid: aresid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log(res.data.data);
        if (res.data.resultCode == '101') {
          var storeMes = res.data.data.province + res.data.data.city + res.data.data.areaname + res.data.data.location;
          var date = res.data.data.dateString + res.data.data.dateTime
          that.setData({
            storeMes: storeMes,
            date: date,
            aresname: res.data.data.aresname,
            aresmobile: res.data.data.aresmobile,
            aresmessage: aresmessage
          });
        }
      },
      fail(res) {

      }
    })
  },

  call:function(e){
    var that = this;
    var phonenumber = that.data.aresmessage;
    wx.makePhoneCall({
      phoneNumber: phonenumber
    })
  }
})