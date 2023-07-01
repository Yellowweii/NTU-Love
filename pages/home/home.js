var years = []
for (var i = 150; i <= 190; i++) {
  years.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
      select: '',
      flag: true,
      flagtwo: true,
      id: 0,
      keyheight: 0,
      bottom: 50,
      year: '',
      month: '',
      day: '',
      years,
      region: ['江苏省', '苏州市', '相城区'],
      menutop: '',
      menuright: '',
      menuheight: ''
  },
  click(e){
    this.setData({
      select: e.currentTarget.dataset.select,
      flag: false
    })
    wx.setStorageSync('sex', this.data.select === 1 ? '男' : '女')
  },
  after(){
      if(this.data.id === 3){
          wx.setStorageSync('hometown', this.data.region[0] +  this.data.region[1] +  this.data.region[2])
          wx.navigateTo({
            url: '/pages/nickname/nickname',
          })
      }
      else{
        this.setData({
          id: this.data.id + 1
        })
      }
  },
  aftertwo(){
      wx.setStorageSync('birthday', this.data.year + '年' + this.data.month + '月' + this.data.day + '日')
     if(this.data.year && this.data.month && this.data.day){
      this.setData({
        id: this.data.id + 1
      })
     }
     else{
       wx.showToast({
         title: '信息没有填写完整哦！',
         icon: 'none'
       })
       return
     }
  },
  getheight(e){
    this.setData({
      keyheight: e.detail.value
    })
  },
  getyear(e){
    this.setData({
      year: e.detail.value
    })
  },
  getmonth(e){
    this.setData({
      month: e.detail.value
    })
  },
  getday(e){
    this.setData({
      day: e.detail.value
    })
    if(this.data.year && this.data.month && this.data.day){
        this.setData({
          flagtwo: false
        })
    }
  },
  getlength(e){
      console.log(this.data.years[e.detail.value[0]] + 'cm');
      wx.setStorageSync('height', this.data.years[e.detail.value[0]] + 'cm')
  },
  bindRegionChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  before(){
    this.setData({
      id: this.data.id - 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setStorageSync('height', 175 + 'cm')
    const resone = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: restwo => {
        this.setData({
          menuheight: resone.height * 2 + 'rpx',
          menutop: resone.top * 2 + 'rpx',
          menuright: (restwo.windowWidth - resone.right) * 2 + 'rpx' 
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
    return {
      title: 'picker-view',
      path: 'page/component/pages/picker-view/picker-view'
    }
  }
})