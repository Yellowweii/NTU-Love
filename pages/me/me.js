// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateheight: '',
    picture: [],
    id: 0,
    vip: 0,
    vipswitch: 0,
    showmodal: false,
    width: 0
  },
  toconfirm(){
    wx.navigateTo({
      url: '/pages/confirm/confirm',
    })
  },
  getvip(){
    this.setData({
      vip: 1
    })
  },
  exit(){
    wx.showModal({
      title: '提示',
      content: '确定要注销账户吗？',
      complete: (res) => {
        if (res.confirm) {
            wx.request({
              url: 'https://yellowwei.cn:443/NTU',
              method: 'DELETE',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                name: wx.getStorageSync('name'),
                number: wx.getStorageSync('number')
              },
              success: res => {
                console.log(res.data);
              }
            })
            wx.request({
              url: 'https://yellowwei.cn:443/publish/two',
              method: 'DELETE',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                number: wx.getStorageSync('number')
              },
              success: res => {
                  console.log(res.data);
              }
            })
            wx.clearStorage()
            wx.navigateTo({
              url: '/pages/index/index',
            })
        }
      }
    })
  },
  contact(){
    this.setData({
      showmodal: true
    })
  },
  close(){
    this.setData({
      showmodal: false
    })
  },
  enlargehw(){
    wx.previewImage({
      urls: ['https://www.yellowwei.cn/img/hw.jpg'],
    })
  },
  enlargetlw(){
    wx.previewImage({
      urls: ['https://www.yellowwei.cn/img/tlw.jpg'],
    })
  },
  edit(){
    if(!wx.getStorageSync('number')){
        wx.showToast({
          title: '你还没有实名认证，快去实名认证吧！',
          icon: 'none'
        })
    }
    else{
      wx.navigateTo({
        url: '/pages/edit/edit',
      })
    }
  },
  todetail(){
      wx.navigateTo({
        url: '/pages/persondetail/persondetail',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'https://yellowwei.cn:443/NTU',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        number: wx.getStorageSync('number')
      },
      success: res => {
        wx.setStorageSync('status', res.data.status)
      }
    })
    const resone = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: restwo => {
        this.setData({
          navigateheight: (resone.top + resone.height + resone.top) * 2 + 'rpx',
          picture: wx.getStorageSync('picture'),
          nickname: wx.getStorageSync('nickname'),
          width: restwo.screenWidth * 2
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.request({
      url: 'https://yellowwei.cn:443/NTU',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        number: wx.getStorageSync('number')
      },
      success: res => {
        wx.setStorageSync('status', res.data.status)
      }
    })
    this.setData({
      picture: wx.getStorageSync('picture'),
      nickname: wx.getStorageSync('nickname')
    })
    if(this.data.vipswitch === 0){
      if(this.data.vip === 1){
        this.setData({
          vipswitch: 1
        })
    wx.showToast({
      title: '恭喜您，获得了vip！',
      icon: 'none'
    })
  }
}
    if(wx.getStorageSync('number') && wx.getStorageSync('status') === '审核成功'){
      this.setData({
        id: 4
      })
    }
    if(wx.getStorageSync('number') && wx.getStorageSync('status') === '审核失败'){
      this.setData({
        id: 3
      })
    }
    if(wx.getStorageSync('number') && wx.getStorageSync('status') === '待审核'){
       this.setData({
         id: 2
       })
    }
    if(!wx.getStorageSync('number')){
      this.setData({
        id: 1
      })
   }
   if(this.data.id === 3){
     wx.showModal({
       title: '您的信息审核未通过',
       content: '即将跳转到修改页面',
       complete: (res) => {
         if (res.confirm) {
           wx.navigateTo({
             url: '/pages/confirm/confirm',
           })
         }
       },
      showCancel: false
     })
   }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})