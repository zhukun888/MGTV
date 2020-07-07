/**
 * +----------------------------------------------------------------------
 * | InitAdmin/vue-admin [ InitAdmin渐进式模块化通用后台 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2018-2019 http://initadmin.net All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * +----------------------------------------------------------------------
 * | Author: jry <ijry@qq.com>
 * +----------------------------------------------------------------------
 */

import vue from '../main.js'
import config from '../config.js'
let util = {};
// request
util.request = function({
	method = "GET",
	url,
	data,
	success,
	fail,
	complete
}) {
	// 请求
	if (0 != url.indexOf("http")) {
		url = config.baseurl + url
	}
	var header = {
		'content-type': 'application/json'
	}
	data = data || {}
	const userInfo = uni.getStorageSync('userInfo');
	if (userInfo.token) {
		data["token"] = userInfo.token;
		data["uid"] = userInfo.uid;
	}
	var timestamp = Date.parse(new Date()); //时间戳
	data["timestamp"] = timestamp;
	return new Promise((resolve, reject) => {
			uni.request({
					url: url,
					method: method,
					data: data,
					header: header,
					dataType: 'json',
					success: success,
					fail: (res) => {
						uni.showToast({
							title: '服务器错误',
							icon: "none"
						})
					},
					complete: (res) => {
						if (res.statusCode != 200) {
							uni.showToast({
								title: '服务器接口或网络异常',
								icon: "none"
							})
						} else if (res.data.code != 200) {
							if(res.data.code == 402){
								uni.showToast({
									icon: 'none',
									title: '登录失败，请重新登录'
								})
								try {
								    uni.removeStorageSync('userInfo');
								} catch (e) {
								    // error
								}
							}
							else{
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								});
							}
							//reject(res)
						}
						// else if (res.data.code == 402) { //登录失败
						// 	uni.removeStorage({
						// 		key: 'uerInfo'
						// 	})
						// 	uni.showToast({
						// 		icon: 'none',
						// 		title: '登录失败，请重新登录'
						// 	});
						//let vue = new Vue();
						// uni.navigateTo({ url: '/pages/login/login'   })  
						//vue.$routeUtil.reLaunch('main');
					else {
						resolve(res.data)
					}
				}
			})
	}).catch((e) => {});
};

export default util;
