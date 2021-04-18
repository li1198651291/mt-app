import { createStore } from 'vuex';
import axios from 'axios';
import { nextTick } from 'vue'
axios.defaults.baseURL = 'http://localhost:8080/'

export default createStore({
  state: {
    seller: {},
    goods: {},
    ratings: {},
    selectedFood: {}
  },
  getters: {
    commentNum (state) {
      return state.ratings.comment_num
    },
    poiInfo (state) {
      return state.goods.poi_info
    },
    // operation (state) {
    //   return state.goods.container_operation_source
    // },
    // foodSpuTags (state) {
    //   return state.goods.food_spu_tags
    // },
    selectedFoods (state) {
      let result = [];
      if (state.goods.food_spu_tags) {
        state.goods.food_spu_tags.forEach(item => {
          item.spus.forEach(item => {
            if (item.count > 0) {
              result.push(item)
            }
          });
        })
      }
      return result
    },
    totalCount (state, getters) {
      let result = 0;
      getters.selectedFoods.forEach(item => {
        result += item.count
      })
      return result
    },
    totalPrice (state, getters) {
      let result = 0;
      getters.selectedFoods.forEach(item => {
        result += item.count * item.min_price
      })
      return result
    },
    getFood: (state) => (id) => {
      let result;
      if (state.goods.food_spu_tags) {
        for (let i = 0; i < state.goods.food_spu_tags.length; i++) {
          result = state.goods.food_spu_tags[i].spus.filter(item => item.id == id)
          if (result.length !== 0) {
            return result[0];
          }
        }
      }
    }
  },
  mutations: {
    setSeller (state, payload) {
      state.seller = payload
    },
    setGoods (state, payload) {
      state.goods = payload
    },
    setRatings (state, payload) {
      state.ratings = payload
    }
  },
  actions: {
    getSeller ({ state, commit }) {
      axios.get("data/seller.json")
        .then(res => res.data)
        .then(res => {
          commit('setSeller', res.data)
        })
    },
    getGoods ({ state, commit }) {
      axios.get("data/goods.json")
        .then(res => res.data)
        .then(res => {
          if (res.code === 0) {
            commit('setGoods', res.data);
          }
        })
    },
    getRatings ({ state, commit }) {
      axios.get("data/ratings.json")
        .then(res => res.data)
        .then(res => {
          if (res.code == 0) {
            commit('setRatings', res.data)
          }
        })
    }
  },
  modules: {
  }
})
