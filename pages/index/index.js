Page({

	/**
	 * 页面的初始数据
	 */
	data: {
			show: false
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			this.setData({
				show: true
			})
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
		setTimeout(function(){
			if(wx.getStorageSync('nickname')){
				wx.switchTab({
					url: '/pages/college-circle/college-circle',
				})
			}
			else{
				wx.navigateTo({
					url: '/pages/home/home',
				})
			}
		},4000)
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
