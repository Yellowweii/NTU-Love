// pages/confirm/confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom: 50,
    keyheight: 0,
    flagone: true,
    valueone: '',
    focus: false,
    id: 0,
    valuetwo: '',
    flagtwo: true,
    arr: ['启秀校区','啬园校区','钟秀校区','启东校区'],
    arr1: ['大一','大二','大三','大四','研究生'],
    valuethree: '',
    flagthree: true,
    showmodal: false,
    menutop: '',
    menuright: '',
    menuheight: ''
  },
  inputone(e){
    this.setData({
      valueone: e.detail.value
    })
    if(this.data.valueone.trim() !== ''){
      this.setData({
        flagone: false
      })
      wx.setStorageSync('name', this.data.valueone.trim())
    }
    else{
      this.setData({
        flagone: true
      })
    }
  },
  inputtwo(e){
    this.setData({
      valuetwo: e.detail.value
    })
    if(this.data.valuetwo.trim() !== ''){
      this.setData({
        flagtwo: false
      })
      wx.setStorageSync('number', this.data.valuetwo.trim())
    }
    else{
      this.setData({
        flagtwo: true
      })
    }
  },
  inputthree(e){
    this.setData({
      valuethree: e.detail.value
    })
    if(this.data.valuethree.trim() !== ''){
      this.setData({
        flagthree: false
      })
      wx.setStorageSync('profession', this.data.valuethree.trim())
    }
    else{
      this.setData({
        flagthree: true
      })
    }
  },
  focus(e){
    this.setData({
      keyheight: e.detail.height
    })
  },
  blur(){
    this.setData({
      keyheight: 0
    })
  },
  after(){
      this.setData({
        id: this.data.id + 1
      })
  },
  bindchangeone(e){
    wx.setStorageSync('school', this.data.arr[e.detail.value[0]])
  },
  bindchangetwo(e){
    console.log(e);
    wx.setStorageSync('grade', this.data.arr1[e.detail.value[0]])
  },
  before(){
    this.setData({
      id: this.data.id - 1
    })
  },
  toconfirm(){
      wx.navigateTo({
        url: '/pages/enter/enter',
      })
  },
  submit(){
    wx.setStorageSync('status', '待审核')
        this.setData({
          showmodal: true
        })
       wx.request({
        url: 'https://yellowwei.cn:443/NTU',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          sex:  wx.getStorageSync('sex'),
          height: wx.getStorageSync('height'),
          birthday: wx.getStorageSync('birthday'),
          hometown: wx.getStorageSync('hometown'),
          nickname: wx.getStorageSync('nickname'),
          picture: wx.getStorageSync('picture'),
          name: wx.getStorageSync('name'),
          number: wx.getStorageSync('number'),
          school: wx.getStorageSync('school'),
          grade: wx.getStorageSync('grade'),
          profession: wx.getStorageSync('profession'),
          status: wx.getStorageSync('status')
        },
        success: res => {
          console.log(res.data);
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      focus: true
    })
    wx.setStorageSync('school', '啬园校区')
    wx.setStorageSync('grade', '大二')
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

  }
})