// pages/nickname/nickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom: 50,
    keyheight: 0,
    src: 'https://www.yellowwei.cn/img/Group3.png',
    flag: true,
    value: '',
    showmodal: false,
    bdr: '0rpx',
    pictures: []
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
  upload(){
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album','camera'],
      sizeType: 'compressed',
      success: res => {
        this.setData({
          src: res.tempFiles[0].tempFilePath,
          bdr: '92rpx'
        })
        wx.uploadFile({
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          header: {
            "content-type": "multipart/form-data"
          },
          url: 'https://yellowwei.cn:443/upload',
          success: res => {
              console.log(res.data);
              this.data.pictures[0] = res.data
              wx.setStorageSync('picture', this.data.pictures)
          }
        })
        if(this.data.value.trim() !== '' && this.data.src !== 'https://www.yellowwei.cn/img/Group3.png'){
        this.setData({
          flag: false
        })
      }
      else{
        this.setData({
          flag: true
        })
      }
      }
    })
  },
  input(e){
    this.setData({
      value: e.detail.value
    })
    if(this.data.value.trim() !== '' && this.data.src !== 'https://www.yellowwei.cn/img/Group3.png'){
        this.setData({
          flag: false
        })
      }
      else{
        this.setData({
          flag: true
        })
      }
  },
  submit(){
      wx.setStorageSync('nickname', this.data.value)
      this.setData({
        showmodal: true
      })
  },
  toconfirm(){
      wx.navigateTo({
        url: '/pages/confirm/confirm',
      })
  },
  no(){
    wx.navigateTo({
      url: '/pages/enter/enter',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    
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