<template>
  <header class="header" :style="head_pic_url" v-if="poiInfo">
    <div class="top-wrapper">
      <div class="back-wrapper">
        <i class="iconfont icon-arrow-left"></i>
      </div>
      <form action="" class="search-wrapper">
        <i class="iconfont icon-search searchIcon"></i>
        <input type="text" name="" id="" placeholder="搜索店内商品。。。" class="search">
      </form>

      <div class="more-wrapper">
        <a href="#" class="spelling-btn">拼单</a>
        <div class="more-btn">
          <i class="iconfont icon-more"></i>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="picUrl" :style="pic_url"></div>
      <div class="name">
        <h3>{{poiInfo.name}}</h3>
      </div>
      <div class="collect">
        <i class="iconfont icon-xing"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <img :src="poiInfo.discounts2[0].icon_url" alt="">
      <span>{{poiInfo.discounts2[0].info}}</span>
      <div class="detail" @click="showBulletin">
        <span>{{discountsNum}}个活动</span>
        <i class="iconfont icon-tubiaozhizuo"></i>
      </div>
    </div>
    <transition v-show="isShow" name="bulletin">
      <div class="bulletin-detail">
        <div class="detail-wrapper">
          <div class="main-wrapper" :style="poi_back_pic_url">
            <div class="top-icon" :style="pic_url"></div>
            <h3 class="name">{{poiInfo.name}}</h3>
            <div class="score">
              <Star :score="poiInfo.wm_poi_score"></Star>
              <span>{{poiInfo.wm_poi_score}}</span>
            </div>
            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i> {{poiInfo.shipping_fee_tip}} <i>|</i> {{poiInfo.delivery_time_tip}}
            </p>
            <p class="time">
              配送时间：{{poiInfo.shipping_time}}
            </p>
            <div class="discounts" v-if="poiInfo.discounts2">
              <p>
                <img :src="poiInfo.discounts2[0].icon_url">
                <span>{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <div class="close-btn" @click="closeBulletin">
            <i class="iconfont icon-cross-fill"></i>
          </div>
        </div>
      </div>
    </transition>

  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Star from './Star'
export default {
  data () {
    return {
      isShow: false
    }
  },
  components: {
    Star
  },
  computed: {
    ...mapGetters(['poiInfo']),
    head_pic_url () {
      if (this.poiInfo) {
        return `background-image: url(${this.poiInfo.head_pic_url})`
      }
    },
    pic_url () {
      if (this.poiInfo) {
        return `background-image: url(${this.poiInfo.pic_url})`
      }
    },
    poi_back_pic_url () {
      if (this.poiInfo) {
        return `background-image: url(${this.poiInfo.poi_back_pic_url})`
      }
    },
    discountsNum () {
      if (this.poiInfo) {
        return this.poiInfo.discounts2.length;
      }
    }
  },
  methods: {
    showBulletin () {
      this.isShow = true;
    },
    closeBulletin () {
      this.isShow = false;
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 130px;
  padding-top: 20px;
  background-size: 100% 135%;
  background-position: center -12px;
  .top-wrapper {
    position: relative;
    .back-wrapper {
      position: absolute;
      width: 50px;
      height: 31px;
      line-height: 31px;
      color: white;
      text-align: center;
    }
    .search-wrapper {
      height: 31px;
      padding: 0 130px 0 50px;
      .searchIcon {
        position: absolute;
        width: 28px;
        height: 31px;
        line-height: 31px;
        text-align: center;
      }
      .search {
        width: 100%;
        height: 29px;
        padding-left: 28px;
        border: none;
        border-radius: 25px;
        background-color: #ccc;
        outline: none;
      }
    }
    .more-wrapper {
      display: flex;
      position: absolute;
      width: 65px;
      height: 31px;
      right: 15px;
      top: 0;
      text-align: center;
      .spelling-btn {
        height: 17px;
        padding: 1px 3px;
        margin-top: 5px;
        border: 1px solid #fff;
        line-height: 17px;
        color: #fff;
        font-size: 10px;
        text-decoration: none;
      }
      .more-btn {
        margin-left: 13px;
        margin-top: 5px;
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .content-wrapper {
    display: flex;
    height: 50px;
    padding: 17px 10px 11px;
    color: #fff;
    align-items: center;
    .picUrl {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      background-size: 135% 100%;
      background-position: center;
    }
    .name {
      margin-left: 18px;
    }
    .collect {
      width: 25px;
      height: 37px;
      margin-left: 105px;
      margin-top: 3px;
      font-size: 12px;
      text-align: center;
      .iconfont {
        display: inline-block;
        margin-bottom: 4px;
      }
    }
  }
  .bulletin-wrapper {
    display: flex;
    height: 16px;
    padding: 0 10px;
    line-height: 16px;
    color: #fff;
    font-size: 11px;
    img {
      width: 16px;
      height: 16px;
    }
    span {
      margin-left: 6px;
    }
    .detail {
      margin-left: 3px;
      .iconfont {
        font-size: 11px;
      }
    }
  }
  .bulletin-detail {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(98, 98, 98, 0.8);
    z-index: 100;
    .detail-wrapper {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 43px 20px 125px;
      .main-wrapper {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-size: 100% 100%;
        text-align: center;
        .top-icon {
          display: inline-block;
          width: 60px;
          height: 60px;
          margin-top: 40px;
          border-radius: 5px;
          background-size: 135% 100%;
          background-position: center;
        }
        .name {
          margin-top: 13px;
          color: #fff;
          font-size: 15px;
        }
        .score {
          height: 16px;
          margin-top: 8px;
          font-size: 0;
          text-align: center;
          .star {
            display: inline-block;
          }
          span {
            display: inline-block;
            color: white;
            font-size: 10px;
          }
        }
        .tip {
          margin-top: 8px;
          color: #bababc;
          font-size: 11px;
          i {
            margin: 0 7px;
          }
        }
        .time {
          margin-top: 13px;
          color: #bababc;
          font-size: 11px;
        }
        .discounts {
          padding: 0 20px;
          margin-top: 20px;
          p {
            padding-top: 20px;
            border-top: 1px solid #bababc;
            img {
              width: 16px;
              height: 16px;
              margin-right: 6px;
              vertical-align: middle;
            }
            span {
              font-size: 11px;
              line-height: 16px;
              color: white;
            }
          }
        }
      }
      .close-btn {
        display: inline-block;
        position: absolute;
        bottom: 60px;
        left: 50%;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(140, 140, 140, 0.9);
        border-radius: 50%;
        background: rgba(118, 118, 118, 0.7);
        line-height: 38px;
        color: white;
        font-size: 14px;
        text-align: center;
        transform: translateX(-50%);
      }
    }
  }
}

.bulletin-enter-from,
.bulletin-leave-to {
  opacity: 0;
}
.bulletin-leave-from,
.bulletin-enter-to {
  opacity: 1;
}
.bulletin-enter-active,
.bulletin-leave-active {
  transition: opacity 1s ease-out;
}
</style>