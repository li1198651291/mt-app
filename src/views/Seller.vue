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
    ...mapActions(["getSeller"])
  },
  created () {
    this.getSeller()
  },
  updated () {
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
}
</script>

<style scoped>
.iconfont {
  margin-right: 10px;
  color: #999999;
}
.seller {
  position: absolute;
  left: 0;
  top: 191px;
  bottom: 0;
  width: 100%;
  background-color: #f4f4f4;
  overflow: hidden;
}
.seller .seller-wrapper {
  background-color: #fff;
}
.seller .seller-view {
  padding-left: 15px;
}
.seller .seller-view .address-wrapper {
  display: flex;
  height: 50px;
  padding: 16px 0;
  border-bottom: 1px solid #f4f4f4;
}
.seller .seller-view .address-wrapper .address-left {
  display: flex;
  flex: 1;
  align-items: center;
  padding-right: 25px;
  font-size: 15px;
  line-height: 20px;
}
.seller .seller-view .address-wrapper .address-right {
  flex: 0 0 60px;
  border-left: 1px solid #999999;
  text-align: center;
  line-height: 50px;
}
.seller .seller-view .address-wrapper .address-right .iconfont {
  margin-right: 0;
  font-size: 25px;
}
.seller .seller-view .pics-wrapper {
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;
  white-space: nowrap;
  overflow: hidden;
}
.seller .seller-view .pics-wrapper .pics-item {
  display: inline-block;
  width: 93px;
  height: 75px;
  margin-right: 11px;
}
.seller .seller-view .pics-wrapper .pics-item img {
  width: 100%;
  height: 100%;
}
.seller .seller-view .safety-wrapper {
  position: relative;
  font-size: 14px;
}
.seller .seller-view .safety-wrapper .right {
  position: absolute;
  right: 15px;
}

.seller .tip-wrapper {
  padding-left: 15px;
  font-size: 14px;
}
.seller .tip-wrapper .delivery-wrapper {
  border-bottom: 1px solid #f4f4f4;
}

.seller .other-wrapper {
  padding-left: 15px;
  font-size: 14px;
}
.seller .other-wrapper .server-wrapper {
  display: flex;
  border-bottom: 1px solid #f4f4f4;
}
.seller .other-wrapper .server-wrapper .left {
  flex: 0 0 100px;
}
.seller .other-wrapper .server-wrapper .poi-server img,
.seller .other-wrapper .discounts-wrapper .discounts-item img {
  margin-right: 10px;
  vertical-align: middle;
}
.seller .other-wrapper .server-wrapper .poi-server span,
.seller .other-wrapper .discounts-wrapper .discounts-item span {
  vertical-align: middle;
}

.item-padding {
  padding: 15px 15px 15px 0;
}
</style>