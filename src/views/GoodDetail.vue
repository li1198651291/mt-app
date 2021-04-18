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
      this.$router.push({name: "Goods"})
    }
  },
  mounted () {
    this.foodScroll = new BScroll(this.$refs.foodView, {
      click: true,
      mouseWheel: true,//开启鼠标滚轮
      disableMouse: false,//启用鼠标拖动
      disableTouch: false//启用手指触摸
    })
  },
  updated () {
    this.foodScroll.refresh();
  }
}
</script>

<style scoped>
.food {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  bottom: 51px;
  background: white;
}

.food .food-wrapper .food-content .img-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.img-wrapper .food-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.img-wrapper .btn-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  margin: 20px;
  color: #999999;
}
.img-wrapper .btn-wrapper .iconfont {
  font-size: 28px;
}
.img-wrapper .btn-wrapper .icon-share {
  position: absolute;
  right: 80px;
}
.img-wrapper .btn-wrapper .icon-bmore {
  position: absolute;
  right: 40px;
}

.food .food-wrapper .food-content .content-wrapper {
  position: relative;
  padding: 0 0 16px 16px;
}
.content-wrapper .name {
  font-size: 15px;
  color: #333333;
  line-height: 30px;
  font-weight: bold;
}
.content-wrapper .saled {
  font-size: 11px;
  color: #9d9d9d;
  margin-bottom: 10px;
}
.content-wrapper .desc {
  font-size: 12px;
  color: #666666;
  margin-bottom: 10px;
}
.content-wrapper .product {
  height: 15px;
  margin-bottom: 10px;
}
.content-wrapper .price {
  font-size: 0;
}
.content-wrapper .price .text {
  font-size: 17px;
  color: #fb4e44;
}
.content-wrapper .price .unit {
  font-size: 11px;
  color: #9d9d9d;
}
.food-content .cartcontrol-wrapper {
  position: absolute;
  right: 12px;
  bottom: 10px;
  padding: 2px;
}

.food .food-wrapper .rating-wrapper {
  padding-left: 16px;
}
.rating-wrapper .rating-title {
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 16px 0;
}
.rating-title .like-ratio .title {
  font-size: 13px;
}
.rating-title .like-ratio .ratio {
  font-size: 11px;
}
.rating-title .like-ratio .ratio i {
  color: #fb4e44;
  font-size: 11px;
}

.rating-title .snd-title .text,
.rating-title .snd-title .iconfont {
  display: inline-block;
  color: #9d9d9d;
  font-size: 13px;
}
.rating-title .snd-title .icon {
  margin-left: 12px;
}

.food .food-wrapper .rating-wrapper .comment-item {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 14px 17px 0;
  border-bottom: 1px solid #f4f4f4;
}
.comment-item .comment-header {
  flex: 0 0 41px;
  margin-right: 10px;
}
.comment-item .comment-header img {
  width: 41px;
  height: 41px;
  border-radius: 50%;
}

.comment-item .comment-main {
  flex: 1;
  margin-top: 6px;
}
.comment-item .comment-main .user {
  width: 50%;
  float: left;
  font-size: 12px;
  color: #333333;
}
.comment-item .comment-main .time {
  width: 50%;
  float: right;
  text-align: right;
  font-size: 10px;
  color: #666666;
}
.comment-item .comment-main .content {
  margin-top: 20px;
  font-size: 13px;
  line-height: 19px;
}
</style>