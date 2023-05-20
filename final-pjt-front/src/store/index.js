import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
    articles: [
    ],
    comments: [
    ],
    depositData: null,
    currentDetail: null,
    userInfo: null
  },
  getters: {
    isLogin(state){
      return state.token ? true : false
    },
  },
  mutations: {
    LOGIN(state,payload){
      state.token = payload
      console.log('logintoken이 잘들어갔나요?',this.state.token)
    },
    LOGOUT(state) {
      state.token = null
    },
    SIGNUP(state, payload){
      state.token = payload
      console.log('signuptoken 잘들어갔나요?',this.state.token)
    },
    GET_ARTICLES(state, articles){
      state.articles = articles
    },
    GET_COMMENTS(state, comments){
      state.comments = comments
      // console.log(state.comments)
    },
    GET_DEPOSIT_DATA(state, depositData) {
      state.depositData = depositData
    },
    GET_CURRENT_DETAIL(state, currentDetail) {
      state.currentDetail = currentDetail
    },
    USERINFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    getArticles(context){
      axios({
        method: 'get',
        url : `${API_URL}/articles/`,
        headers : {
              Authorization: `Token ${context.state.token}`
        }
      })
      .then((res)=> {
        context.commit('GET_ARTICLES',res.data)
      })
      .catch(err => console.log(err))
    },
    getComments(context){
      axios({
        method: 'get',
        url:  `${API_URL}/articles/comments/`
      })
      .then((res)=>{
        // console.log(res)
        context.commit('GET_COMMENTS',res.data)
      })
      .catch(err => console.log(err))
    },
    signUp(context, payload) {
      return new Promise((resolve, reject) => {
        const username = payload.username
        const password1 = payload.password1
        const password2 = payload.password2
        const age = payload.age
        const gender = payload.gender
        const salary = payload.salary
        const wealth = payload.wealth
        const tendency = payload.tendency

        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/accounts/signup/',
          data: {
            username, password1, password2, age, gender, salary, wealth, tendency
          }
        })
        .then((res)=>{
          // console.log('토큰이actions까지는 잘옴',res.data.key)
          const token = res.data.key
          context.commit('SIGNUP',token)
          // context.dispatch('saveTokenState')
          resolve()
        })
        .catch((err)=> {
          console.log(err)
          reject(err)
        })

      }
      )
    },
    login(context, payload){
      return new Promise((resolve, reject) => {
        const username = payload.username
        const password = payload.password
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/accounts/login/',
          data: {
            username, password
          }
        })
        .then((res)=>{
          console.log('왜이게안나오지?',res.data.key)
          const token = res.data.key
          context.commit('LOGIN', token)
          // context.dispatch('saveTokenState')
          resolve()
        })
        .catch((err)=> {
          console.log(err)
          reject(err)
        })
      })
      
    },
    getUserInfo(context) {
      const token = context.state.token
      
      axios({
        methods: 'get',
        url: 'http://127.0.0.1:8000/accounts/user_info/',
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then((res)=>{
        console.log('잘받아와졌다면',res)
        console.log(res.data)
        const userInfo = res.data
        context.commit('USERINFO',userInfo)
      })
      .then((err)=>{
        console.log(err)
      })
    },
    logOut(context) {
      context.commit('LOGOUT')
    }
  },
  modules: {
  }
})