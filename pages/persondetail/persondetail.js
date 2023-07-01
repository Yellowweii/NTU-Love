// pages/persondetail/persondetail.js
var get = require('../../utils/xingzuo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menutop: 0,
    menuright: '',
    menuheight: 0,
    statusheight: 0,
    nickname: '',
    picture: [],
    sex: '',
    school: '',
    grade: '',
    hometown: '',
    birthday: '',
    height: '',
    year: 0,
    month: '',
    day: '',
    currentyear: 0,
    xingzuo: '',
    sheng: '',
    shi: '',
    onemessage: {},
    contentheight: 0
  },
  before(){
      this.data.birthday.substring
      // wx.navigateBack()
      wx.switchTab({
        url: '/pages/me/me',
      })
  },
  enlarge(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [...e.currentTarget.dataset.id],
    })
  },
  toallmessage(e){
      wx.navigateTo({
        url: `/pages/all-message/all-message?number=${e.currentTarget.dataset.number}`,
      })
  },
  publish(){
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },
  addlove(){
    wx.showToast({
      title: '仅可在动态界面点赞哦 ！',
      icon: 'none'
    })
  },
  todongtai(e){
    wx.navigateTo({
      url: `/pages/comment/comment?id=${e.currentTarget.dataset.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'https://yellowwei.cn:443/publish/two',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        number: wx.getStorageSync('number')
      },
      success: res => {
        this.setData({
          onemessage: res.data
        })
      }
    })
    const resone = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: restwo => {
        this.setData({
          menuheight: resone.height * 2 ,
          menutop: resone.top * 2 + 6,
          menuright: (restwo.windowWidth - resone.right) * 2 + 'rpx' ,
          statusheight: restwo.statusBarHeight * 2 ,
          nickname: wx.getStorageSync('nickname'),
          picture: wx.getStorageSync('picture'),
          sex: wx.getStorageSync('sex'),
          school: wx.getStorageSync('school'),
          grade: wx.getStorageSync('grade'),
          hometown: wx.getStorageSync('hometown'),
          birthday: wx.getStorageSync('birthday'),
          height: wx.getStorageSync('height'),
        })
      }
    })
    this.setData({
      year: parseInt(this.data.birthday.substring(0,4)),
      month: parseInt(this.data.birthday.substring(5,7)),
      day: parseInt(this.data.birthday.substring(8,9)),
      currentyear: new Date().getFullYear(),
      sheng: this.data.hometown.substring(0,2),
      shi: this.data.hometown.substring(3,5)
    })
    this.setData({
      xingzuo: get.getxingzuo(this.data.month,this.data.day)
    })
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query.select('.content').boundingClientRect(rect=>{
        if(rect.height){
          this.setData({
            contentheight: rect.height
          })
        }
        }).exec();
      }, 500)
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

  }
})