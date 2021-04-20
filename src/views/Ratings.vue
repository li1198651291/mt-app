<template>
  <div class="ratings" ref="ratingView">
    <div class="ratings-wrapper">
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <span class="score">{{ratings.comment_score}}</span>
            <span class="text">商家评分</span>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span>口味</span>
              <Star :score="ratings.quality_score"></Star>
              <span class="score">{{ratings.quality_score}}</span>
            </div>
            <div class="pack-score item">
              <span>包装</span>
              <Star :score="ratings.pack_score"></Star>
              <span class="score">{{ratings.pack_score}}</span>
            </div>
          </div>
        </div>
        <div class="overview-right">
          <span class="score">{{ratings.delivery_score}}</span>
          <span class="text">配送评分</span>
        </div>
      </div>
      <Split></Split>
      <div class="content">
        <div class="rating-select" v-if="ratings.tab">
          <span class="item" @click="selectType(0)"
            :class="{'active': type == 0}">{{ratings.tab[0].comment_score_title}}</span>
          <span class="item" @click="selectType(1)"
            :class="{'active': type == 1}">{{ratings.tab[1].comment_score_title}}</span>
          <span class="item" @click="selectType(2)" :class="{'active': type == 2}">
            <img src="../assets/img/icon_sub_tab_dp_normal@2x.png" alt="" v-show="type !== 2">
            <img src="../assets/img/icon_sub_tab_dp_highlighted@2x.png" alt="" v-show="type == 2">
            {{ratings.tab[2].comment_score_title}}
          </span>
        </div>
        <div class="labels-view">
          <span class="item" v-for="label in ratings.labels" :key="label.label_id"
            :class="{'highlight': label.label_star > 0}">
            {{label.content}}
            {{label.label_count}}
          </span>
        </div>
        <div class="rating-list">
          <ul>
            <li v-for="(comment, index) in selectComments" :key="index" class="comment-item">
              <div class="comment-header">
                <img :src="comment.user_pic_url" v-if="comment.user_pic_url">
                <img src="../assets/img/anonymity.png" v-if="!comment.user_pic_url">
              </div>
              <div class="comment-main">
                <div class="user">{{comment.user_name}}</div>
                <div class="time">{{formatDate(comment.comment_time)}}</div>
                <div class="star-wrapper clearfix">
                  <span class="text">评分</span>
                  <Star :score="comment.order_comment_score" class="star"></Star>
                </div>
                <ul class="pic-wrapper">
                  <li v-for="(commentPic, index) in comment.comment_pics" :key="index" class="pic">
                    <img :src="commentPic.thumbnail_url" alt="">
                  </li>
                </ul>
                <div class="comment-content">{{comment.comment}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Star from '../components/Star';
import Split from '../components/Split';
import BScroll from 'better-scroll';

export default {
  name: 'Ratings',
  data () {
    return {
      type: 0,
    }
  },
  components: {
    Star,
    Split
  },
  computed: {
    ...mapState(["ratings"]),
    selectComments () {
      if (this.type == 0) {
        return this.ratings.comments
      } else if (this.type == 1) {
        return this.ratings.comments.filter(comment => {
          return comment.comment_pics.length !== 0
        });
      } else {
        return this.ratings.comments_dp.comments
      }
    },
    formatDate () {
      return function (time) {
        let date = new Date(time * 1000);
        let fmt = 'yyyy.MM.dd';
        if (/(y+)/.test(fmt)) { // 年
          let year = date.getFullYear().toString();
          fmt = fmt.replace(RegExp.$1, year);
        }
        if (/(M+)/.test(fmt)) { // 月
          let mouth = date.getMonth() + 1;
          if (mouth < 10) {
            mouth = '0' + mouth;
          }
          fmt = fmt.replace(RegExp.$1, mouth);
        }
        if (/(d+)/.test(fmt)) { // 日
          let mydate = date.getDate();
          if (mydate < 10) {
            mydate = '0' + mydate;
          }
          fmt = fmt.replace(RegExp.$1, mydate);
        }
        return fmt;
      }
    }
  },
  methods: {
    selectType (num) {
      this.type = num
    },
  },
  watch: {
    ratings () {
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.ratingView, {
      click: true,
      mouseWheel: true,//开启鼠标滚轮
      disableMouse: false,//启用鼠标拖动
      disableTouch: false//启用手指触摸
    })
  },
}
</script>

<style scoped lang="scss">
.ratings {
  position: absolute;
  left: 0;
  top: 191px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 20px 0 10px 0;
    .overview-left {
      display: flex;
      flex: 1;
      padding-left: 26px;
      .comment-score {
        flex: 0 0 48px;
        margin-right: 26px;
        text-align: center;
        .score {
          display: block;
          margin-bottom: 9px;
          color: #ffb000;
          font-size: 23px;
          font-weight: 800;
        }
      }
      .text {
        display: block;
        font-size: 11px;
        color: #666666;
      }
      .other-score {
        flex: 1;
        margin-top: 3px;
        .item {
          display: flex;
          height: 11px;
          margin-bottom: 14px;
          color: #666666;
          font-size: 11px;
          .star {
            margin-left: 11px;
            transform: translateY(-3px);
          }
          .score {
            margin-left: 11px;
            color: #ffb000;
          }
        }
      }
    }
    .overview-right {
      flex: 0 0 80px;
      height: 45px;
      border-left: 1px solid #9d9d9d;
      color: #999999;
      text-align: center;
      .score {
        display: block;
        margin-top: 3px;
        margin-bottom: 10px;
        font-size: 19px;
        font-weight: 500;
      }
      .text {
        display: block;
        font-size: 11px;
      }
    }
  }
  .content {
    padding: 16px;
    .rating-select {
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 11px;
      border: 1px solid #ffb000;
      border-right: 0;
      border-radius: 3px;
      .item {
        display: inline-block;
        box-sizing: border-box;
        width: 33.3%;
        height: 33px;
        border-right: 1px solid #ffb000;
        line-height: 33px;
        color: #ffb000;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        &:last-child {
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          img {
            height: 14px;
            vertical-align: middle;
          }
        }
        &.active {
          background-color: #ffb000;
          color: black;
        }
      }
    }
    .labels-view .item {
      display: inline-block;
      height: 27px;
      padding: 0 10px;
      margin: 0 6px 6px 0;
      border-radius: 3px;
      background: #f4f4f4;
      line-height: 27px;
      color: #999999;
      font-size: 12px;
      &.highlight {
        color: #656565;
      }
    }
    .rating-list .comment-item {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      padding: 16px 16px 16px 0;
      border-bottom: 1px solid #f4f4f4;
      .comment-header {
        flex: 0 0 35px;
        margin-right: 11px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
      .comment-main {
        position: relative;
        flex: 1;
        .user {
          width: 50%;
          color: #333333;
          font-size: 11px;
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          color: #666666;
          font-size: 9px;
          text-align: right;
        }
        .star-wrapper {
          width: 100%;
          margin-top: 12px;
          .text {
            float: left;
            color: #999999;
            font-size: 11px;
          }
          .star {
            float: left;
            margin-left: 7px;
            margin-top: -3px;
          }
        }
        .pic-wrapper {
          margin-top: 10px;
          .pic {
            width: 70px;
            height: 90px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .comment-content {
          width: 100%;
          margin-top: 5px;
          line-height: 19px;
          font-size: 13px;
        }
      }
    }
  }
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>