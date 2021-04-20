<template>
  <div class="seller" ref="sellerView">
    <div class="seller-wrapper">
      <Split></Split>
      <div class="seller-view">
        <div class="address-wrapper">
          <div class="address-left">
            <i class="iconfont icon-position"></i>
            <span class="text">{{seller.address}}</span>
          </div>
          <div class="address-right">
            <i class="iconfont icon-phone"></i>
          </div>
        </div>
        <div class="pics-wrapper" ref="picsView">
          <ul ref="picsList" v-if="seller.poi_env">
            <li ref="picsItem" class="pics-item" v-for="(pic,index) in seller.poi_env.thumbnails_url_list" :key="index">
              <img :src="pic" alt="">
            </li>
          </ul>
        </div>
        <div class="safety-wrapper item-padding">
          <i class="iconfont icon-safe"></i>
          <span>查看食品安全档案</span>
          <i class="iconfont icon-tubiaozhizuo right"></i>
        </div>
      </div>
      <Split></Split>
      <div class="tip-wrapper">
        <div class="delivery-wrapper item-padding">
          <i class="iconfont icon-paper"></i>
          <span class="text">配送服务：{{seller.app_delivery_tip}}</span>
        </div>
        <div class="shipping-wrapper item-padding">
          <i class="iconfont icon-time"></i>
          <span class="text">配送时间：{{seller.shipping_time}}</span>
        </div>
      </div>
      <Split></Split>
      <div class="other-wrapper">
        <div class="server-wrapper item-padding">
          <div class="left">
            <i class="iconfont icon-duihao"></i>
            <span>商家服务</span>
          </div>
          <div class="poi-server" v-for="(item, index) in seller.poi_service" :key="index">
            <img :src="item.icon" width="16" height="16">
            <span>{{item.content}}</span>
          </div>
        </div>
        <div class="discounts-wrapper item-padding">
          <div class="discounts-item" v-for="(item, index) in seller.discounts2" :key="index">
            <img :src="item.icon_url" alt="" width="16" height="16">
            <span>{{item.info}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Split from '../components/Split';
import BScroll from 'better-scroll';

export default {
  name: "Seller",
  data () {
    return {
      picsScroll: null,
      sellerScroll: null,
    }
  },
  components: {
    Split
  },
  computed: {
    ...mapState(["seller"]),
  },
  methods: {
    ...mapActions(["getSeller"]),
    initScroll () {
      if (this.seller.poi_env.thumbnails_url_list) {
        let imgW = this.$refs.picsItem.clientWidth;
        let marginR = 11;
        let width = (imgW + marginR) * this.seller.poi_env.thumbnails_url_list.length;

        this.$refs.picsList.style.width = width + 'px';
        this.picsScroll = new BScroll(this.$refs.picsView, {
          scrollX: true,
          disableMouse: false,//启用鼠标拖动
          disableTouch: false//启用手指触摸
        })
      }
      this.sellerScroll = new BScroll(this.$refs.sellerView, {
        click: true,
        mouseWheel: true,//开启鼠标滚轮
        disableMouse: false,//启用鼠标拖动
        disableTouch: false//启用手指触摸
      })
    }
  },
  mounted () {
    this.getSeller()
  },
  watch: {
    seller () {
      this.$nextTick(() => {
        this.initScroll()
      })
    }
  },
}
</script>

<style scoped lang="scss">
.iconfont {
  margin-right: 10px;
  color: #999999;
}
@mixin img-span {
  img {
    margin-right: 10px;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
}
$bg-f4: "#f4f4f4";
$pt-15: 15px;
$font-14: 14px;

.seller {
  position: absolute;
  left: 0;
  top: 191px;
  bottom: 0;
  width: 100%;
  background-color: $bg-f4;
  overflow: hidden;
  .seller-wrapper {
    background-color: #fff;
  }
  .seller-view {
    padding-left: $pt-15;
    .address-wrapper {
      display: flex;
      height: 50px;
      padding: 16px 0;
      border-bottom: 1px solid $bg-f4;
      .address-left {
        display: flex;
        flex: 1;
        align-items: center;
        padding-right: 25px;
        font-size: 15px;
        line-height: 20px;
      }
      .address-right {
        flex: 0 0 60px;
        border-left: 1px solid #999999;
        text-align: center;
        line-height: 50px;
        .iconfont {
          margin-right: 0;
          font-size: 25px;
        }
      }
    }
    .pics-wrapper {
      padding: 10px 0;
      border-bottom: 1px solid $bg-f4;
      white-space: nowrap;
      overflow: hidden;
      .pics-item {
        display: inline-block;
        width: 93px;
        height: 75px;
        margin-right: 11px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .safety-wrapper {
      position: relative;
      font-size: $font-14;
      .right {
        position: absolute;
        right: 15px;
      }
    }
  }
  .tip-wrapper {
    padding-left: $pt-15;
    font-size: $font-14;
    .delivery-wrapper {
      border-bottom: 1px solid $bg-f4;
    }
  }
  .other-wrapper {
    padding-left: $pt-15;
    font-size: $font-14;
    .server-wrapper {
      display: flex;
      border-bottom: 1px solid $bg-f4;
      .left {
        flex: 0 0 100px;
      }
      .poi-server {
        @include img-span;
      }
    }
    .discounts-wrapper {
      .discounts-item {
        @include img-span;
      }
    }
  }
}

.item-padding {
  padding: 15px 15px 15px 0;
}
</style>