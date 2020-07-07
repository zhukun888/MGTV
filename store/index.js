import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		change(state){
			state.hasLogin = true;
			console.log(222222)
		},
		// login(state, provider) {
			
		// 	if(provider.token){
		// 		state.hasLogin = true;
		// 	}
			
		// 	// state.uerInfo.token = provider.token  
		// 	// state.uerInfo.uid = provider.uid  
		// 	state.userInfo = provider;
		// 	uni.setStorageSync(//缓存用户登陆状态
		// 	     'userInfo',  
		// 	    provider 
		// 	) 
		// 	console.log(state.userInfo);
		// },
		login(state, provider) {
		    state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorageSync(//缓存用户登陆状态
			     'userInfo',  
			      provider 
			) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
	            key: 'userInfo'  
	        })
		}
	},
})

export default store
