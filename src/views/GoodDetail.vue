<template>
  <div class="food" ref="foodView">
    <div class="food-wrapper">
      <div class="food-content" v-if="food">
        <div class="img-wrapper">
          <img :src="food.picture" class="food-img">
          <div class="btn-wrapper">
            <i class="iconfont icon-cross-border" @click="goback()"></i>
            <i class="iconfont icon-share"></i>
            <i class="iconfont icon-bmore"></i>
          </div>
        </div>
        <div class="content-wrapper">
          <h3 class="name">{{food.name}}</h3>
          <p class="saled">{{food.month_saled_content}}</p>
          <p class="desc">{{food.description}}</p>
          <img :src="food.product_label_picture" class="product" v-show="food.product_label_picture">
          <p class="price">
            <span class="text">￥{{food.min_price}}</span>
            <span class="unit">/{{food.unit}}</span>
          </p>

          <div class="cartcontrol-wrapper">
            <Cartcontrol :selectedfood="food"></Cartcontrol>
          </div>
        </div>
      </div>
      <Split></Split>
      <!-- 评价 -->
      <div class="rating-wrapper" v-if="food">
        <div class="rating-title">
          <div class="like-ratio" v-if="food.rating">
            <span class="title">{{food.rating.title}}</span>
            <span class="ratio">
              (
              {{food.rating.like_ratio_desc}}
              <i>{{food.rating.like_ratio}}</i>
              )
            </span>
          </div>
          <div class="snd-title" v-if="food.rating">
            <span class="text">{{food.rating.snd_title}}</span>
            <i class="iconfont icon-tubiaozhizuo"></i>
          </div>
        </div>
        <ul class="rating-content" v-if="food.rating">
          <li v-for="(comment, index) in food.rating.comment_list" :key="index" class="comment-item">
            <div class="comment-header">
              <img :src="comment.user_icon" v-if="comment.user_icon">
              <img src="../assets/img/anonymity.png" v-if="!comment.user_icon">
            </div>
            <div class="comment-main">
              <div class="user">{{comment.user_name}}</div>
              <div class="time">{{comment.comment_time}}</div>
              <div class="content">{{comment.comment_content}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Shopcart></Shopcart>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Shopcart from '../components/Shopcart';
import Split from '../components/Split';
import Cartcontrol from '../components/Cartcontrol';
import BScroll from 'better-scroll';

export default {
  data () {
    return {
      foodScroll: null,
      // img: require('../assets/img/anonymity.png')
    }
  },
  components: {
    Shopcart,
    Split,
    Cartcontrol
  },
  computed: {
    food () {
      return this.$store.getters.getFood(this.$route.params.id)
    }
  },
  methods: {
    goback () {
      this.$router.push({ name: "Goods" })
    }
  },
  watch: {
    food (data) {
      if (data) {
        this.$nextTick(() => {
          if (this.foodScroll) {
            this.foodScroll.refresh()
          } else {
            this.foodScroll = new BScroll(this.$refs.foodView, {
              click: true,
              mouseWheel: true,//开启鼠标滚轮
              disableMouse: false,//启用鼠标拖动
              disableTouch: false//启用手指触摸
            })
          }
        })
      }
    }
  },
  mounted () {
    if (this.food) {
      if (this.foodScroll) {
        this.foodScroll.refresh()
      } else {
        this.foodScroll = new BScroll(this.$refs.foodView, {
          click: true,
          mouseWheel: true,//开启鼠标滚轮
          disableMouse: false,//启用鼠标拖动
          disableTouch: false//启用手指触摸
        })
      }
    }
  },
}
</script>

<style scoped lang="scss">
// @mixin postion()
.food {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  bottom: 51px;
  background: white;
  .food-wrapper {
    .food-content {
      .img-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        .food-img {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }
        .btn-wrapper {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          margin: 20px;
          color: #999999;
          .iconfont {
            font-size: 28px;
          }
          .icon-share {
            position: absolute;
            right: 80px;
          }
          .icon-bmore {
            position: absolute;
            right: 40px;
          }
        }
      }
      .content-wrapper {
        position: relative;
        padding: 0 0 16px 16px;
        .name {
          font-size: 15px;
          color: #333333;
          line-height: 30px;
          font-weight: bold;
        }
        .saled {
          font-size: 11px;
          color: #9d9d9d;
          margin-bottom: 10px;
        }
        .desc {
          font-size: 12px;
          color: #666666;
          margin-bottom: 10px;
        }
        .product {
          height: 15px;
          margin-bottom: 10px;
        }
        .price {
          font-size: 0;
          .text {
            font-size: 17px;
            color: #fb4e44;
          }
          .unit {
            font-size: 11px;
            color: #9d9d9d;
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 12px;
          bottom: 10px;
          padding: 2px;
        }
      }
    }
    .rating-wrapper {
      padding-left: 16px;
      .rating-title {
        display: flex;
        justify-content: space-between;
        padding: 16px 16px 16px 0;
        .like-ratio {
          .title {
            font-size: 13px;
          }
          .ratio {
            font-size: 11px;
            i {
              color: #fb4e44;
              font-size: 11px;
            }
          }
        }
        .snd-title {
          .text {
            color: #9d9d9d;
            font-size: 13px;
          }
          .iconfont {
            color: #9d9d9d;
            font-size: 13px;
          }
        }
      }
      .rating-content {
        .comment-item {
          display: flex;
          box-sizing: border-box;
          width: 100%;
          padding: 15px 14px 17px 0;
          border-bottom: 1px solid #f4f4f4;
          .comment-header {
            flex: 0 0 41px;
            margin-right: 10px;
            img {
              width: 41px;
              height: 41px;
              border-radius: 50%;
            }
          }
          .comment-main {
            flex: 1;
            margin-top: 6px;
            .user {
              width: 50%;
              float: left;
              font-size: 12px;
              color: #333333;
            }
            .time {
              width: 50%;
              float: right;
              text-align: right;
              font-size: 12px;
              color: #666666;
            }
            .content {
              margin-top: 20px;
              font-size: 13px;
              line-height: 19px;
            }
          }
        }
      }
    }
  }
}
</style>