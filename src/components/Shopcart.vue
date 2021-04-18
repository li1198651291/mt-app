<template>
  <div class="shopcart" :class="{'highlight': totalCount > 0}">
    <div class="shopcart-wrapper">
      <div class="left">
        <div class="logo-wrapper" :class="{'highlight': totalCount > 0}" @click="toggleList">
          <i class="iconfont icon-gouwuchekong" :class="{'highlight': totalCount > 0}"></i>
          <i class="num" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="desc-wrapper">
          <p class="total-price" v-if="totalPrice">￥{{totalPrice}}</p>
          <p class="tip" :class="{'highlight': totalCount > 0}">另需配送￥9</p>
        </div>
      </div>
      <div class="right" :class="{'highlight': totalCount > 0}">{{payStr}}</div>
      <div class="shopcart-list" :class="{'show': !fold}" v-show="!fold">
        <div class="list-top" v-if="poiInfo">{{poiInfo.discounts2[0].info}}</div>
        <div class="list-header">
          <h3 class="title">1号口袋</h3>
          <div class="empty" @click="clearAll()">
            <i class="iconfont icon-shanchu"></i>
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food-item" v-for="food in selectedFoods" :key="food.id" @click="goDetail(food.id)">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{food.name}}</p>
                  <p class="unit" v-show="!food.description">{{food.unit}}</p>
                  <p class="description" v-show="food.description">{{food.description}}</p>
                </div>
                <div class="desc-right">
                  ￥{{food.min_price}}
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <Cartcontrol :selectedfood="food"></Cartcontrol>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom"></div>
      </div>
    </div>
    <div class="shopcart-mask" v-show="!fold" @click="hideMask"></div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Cartcontrol from './Cartcontrol';
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      fold: true,
      shopScroll: null
    }
  },
  components: {
    Cartcontrol
  },
  computed: {
    ...mapGetters(["totalPrice", "totalCount", "poiInfo", "selectedFoods"]),
    payStr () {
      if (this.totalCount > 0) {
        return "去结算"
      } else {
        if (this.poiInfo) {
          return this.poiInfo.min_price_tip
        }

      }
    }
  },
  watch: {
    fold: function (newVal, oldVal) {
      if (!newVal) {
        this.$nextTick(() => {
          if (!this.shopScroll) {
            this.shopScroll = new BScroll(this.$refs.listContent, {
              click: true,
              mouseWheel: true,//开启鼠标滚轮
              disableMouse: false,//启用鼠标拖动
              disableTouch: false//启用手指触摸
            })
          } else {
            this.shopScroll.refresh()
          }
        })
      }
    }
  },
  methods: {
    ...mapMutations(["getFood"]),
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold;
    },
    clearAll () {
      this.selectedFoods.forEach(food => {
        food.count = 0;
      })
      this.fold = true;
    },
    hideMask () {
      this.fold = true;
    },
    goDetail(id) {
      this.$router.push({name: "GoodDetail", params: {id: id}})
      // this.getFood(id)
    }
  }
}
</script>

<style scoped>
.shopcart-wrapper {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 51px;
  background: #514f4f;
  z-index: 99;
}
.shopcart-wrapper .left {
  flex: 1;
}
.shopcart-wrapper .right {
  flex: 0 0 110px;
  line-height: 51px;
  color: #bab9b9;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}
.left .logo-wrapper {
  position: relative;
  top: -14px;
  left: 10px;
  float: left;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #666666;
  text-align: center;
}
.logo-wrapper .icon-gouwuchekong {
  line-height: 50px;
  color: #c4c4c4;
  font-size: 28px;
}
.left .desc-wrapper {
  float: left;
  margin-left: 25px;
}
.desc-wrapper .tip {
  line-height: 51px;
  font-size: 12px;
  color: #bab9b9;
}

.left .logo-wrapper.highlight {
  background: #ffd161;
}
.left .logo-wrapper .icon-gouwuchekong.highlight {
  color: #2d2b2a;
}
.left .logo-wrapper .num {
  position: absolute;
  right: 0;
  top: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: red;
  line-height: 15px;
  color: white;
  font-size: 9px;
}
.left .desc-wrapper .tip.highlight {
  line-height: 12px;
}
.left .desc-wrapper .total-price {
  line-height: 33px;
  color: white;
  font-size: 18px;
}
.shopcart-wrapper .right.highlight {
  background: #ffd161;
  color: #2d2b2a;
}
.shopcart-wrapper .shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
}
.shopcart-wrapper .shopcart-list.show {
  transform: translateY(-100%);
}
.shopcart-list .list-top {
  height: 30px;
  background: #f3e6c6;
  line-height: 30px;
  color: #646158;
  font-size: 11px;
  text-align: center;
}
.shopcart-list .list-header {
  height: 30px;
  background: #f4f4f4;
}
.list-header .title {
  float: left;
  padding-left: 6px;
  border-left: 4px solid #53c123;
  line-height: 30px;
  font-size: 12px;
}
.list-header .empty {
  float: right;
  height: 30px;
  margin-right: 10px;
  line-height: 30px;
  cursor: pointer;
}
.list-header .empty span {
  margin-left: 5px;
  font-size: 12px;
  vertical-align: middle;
}
.shopcart-list .list-content {
  max-height: 360px;
  background: white;
  overflow: hidden;
}
.list-content .food-item {
  height: 38px;
  padding: 12px 12px 10px 12px;
  border-bottom: 1px solid #f4f4f4;
}
.food-item .desc-wrapper {
  float: left;
  width: 240px;
}
.desc-wrapper .desc-left {
  float: left;
  width: 170px;
}
.desc-wrapper .desc-left .name {
  height: 16px;
  margin-bottom: 8px;
  font-size: 16px;

  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.desc-wrapper .desc-left .unit {
  color: #b4b4b4;
  font-size: 12px;
}

.desc-wrapper .desc-left .description {
  height: 12px;
  color: #b4b4b4;
  font-size: 12px;
  overflow: hidden;
}

.desc-wrapper .desc-right {
  float: right;
  width: 70px;
  line-height: 39px;
  text-align: right;
}
.desc-wrapper .desc-right .price {
  font-size: 12px;
  line-height: 38px;
}

.food-item .cartcontrol-wrapper {
  float: right;
  margin-top: 6px;
}

.shopcart .shopcart-mask {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.6);
  z-index: 98;
}
</style>