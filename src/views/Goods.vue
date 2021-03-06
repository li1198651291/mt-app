<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li class="menu-item" :class="{'current': currentIndex === 0}" @click="selectMenu(0)"
          v-if="goods.container_operation_source">
          <p class="text">
            <img :src="goods.container_operation_source.tag_icon" alt="">
            {{goods.container_operation_source.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="(foodSpuTag,index) in goods.food_spu_tags" :key="index"
          :class="{'current': currentIndex == index + 1}" @click="selectMenu(index + 1)">
          <p class="text">
            <img :src="foodSpuTag.icon" alt="" v-if="foodSpuTag.icon">
            {{foodSpuTag.name}}
          </p>
          <i class="num" v-show="calculateCount(foodSpuTag.spus)">
            {{calculateCount(foodSpuTag.spus)}}
          </i>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodScroll">
      <ul ref="ul">
        <li class="operation-list food-list-hook" v-if="goods.container_operation_source">
          <ul>
            <li class="operation-item"
              v-for="(operationItem, index) in goods.container_operation_source.operation_source_list" :key="index">
              <img :src="operationItem.pic_url" alt="">
            </li>
          </ul>
        </li>
        <li class="food-list food-list-hook" v-for="(foodSpuTag,index) in goods.food_spu_tags" :key="index">
          <h3 class="title">{{foodSpuTag.name}}</h3>
          <ul>
            <li class="food-item" v-for="(spu,index) in foodSpuTag.spus" :key="index" @click="goDetail(spu.id)">
              <img :src="spu.picture" alt="" class="food-picture" width="95" height="75">
              <div class="content">
                <h3 class="name">{{spu.name}}</h3>
                <div class="extra">
                  <span class="saled">{{spu.month_saled_content}}</span>
                  <span class="praise">{{spu.praise_content}}</span>
                </div>
                <img :src="spu.product_label_picture" alt="" class="product">
                <p class="price">
                  <span class="text">￥{{spu.min_price}}</span>
                  <span class="unit">{{spu.unit}}</span>
                </p>
                <div class="control-wrapper">
                  <Cartcontrol :selectedfood="spu"></Cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcart></Shopcart>
  </div>

</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import BScroll from 'better-scroll';
import Cartcontrol from '../components/Cartcontrol';
import Shopcart from '../components/Shopcart';

export default {
  name: 'Goods',
  data () {
    return {
      menuScroll: null,
      foodScroll: null,
      scrollY: 0,
      listHeight: [],
    }
  },
  components: {
    Cartcontrol,
    Shopcart
  },
  computed: {
    ...mapState(["goods"]),
    calculateCount () {
      return function (spus) {
        let count = 0;
        spus.forEach(food => {
          if (food.count > 0) {
            count += food.count
          }
        })
        return count
      }
    },
    currentIndex () {
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
  },
  methods: {
    ...mapMutations(["getFood"]),
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true,
        mouseWheel: true,//开启鼠标滚轮
        disableMouse: false,//启用鼠标拖动
        disableTouch: false//启用手指触摸
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true,
        probeType: 3,
        mouseWheel: true,//开启鼠标滚轮
        disableMouse: false,//启用鼠标拖动
        disableTouch: false//启用手指触摸
      })
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight () {
      let foodList = document.querySelectorAll(".food-list-hook");
      if (foodList.length !== 0) {
        let height = 0;
        this.listHeight = [];
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    selectMenu (index) {
      let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      let element = foodList[index];
      this.foodScroll.scrollToElement(element, 250)
    },
    goDetail (id) {
      this.$router.push({ name: "GoodDetail", params: { id: id } });
    }
  },
  watch: {
    goods (data) {
      this.$nextTick(() => {
        this.menuScroll.refresh();
        this.foodScroll.refresh();
        this.calculateHeight();
      })
      
    }
  },
  mounted () {
    this.initScroll();
    this.calculateHeight();
  },
}
</script>

<style scoped lang="scss">
@mixin wrap($num) {
  display: -webkit-box;
  -webkit-line-clamp: $num;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods {
  display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 85px;
    background: #f4f4f4;
    .menu-item {
      position: relative;
      padding: 16px 23px 15px 10px;
      border-bottom: 1px solid #e4e4e4;
      &.current {
        margin-top: -1px;
        background: white;
        font-weight: bold;
      }
      &:first-child.current {
        margin-top: 1px;
      }
      img {
        width: 15px;
        height: 15px;
        vertical-align: middle;
      }
      .text {
        line-height: 17px;
        color: #333333;
        font-size: 13px;
        @include wrap(2);
      }
      .num {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: red;
        line-height: 13px;
        color: white;
        font-size: 7px;
        text-align: center;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .operation-list {
      padding: 11px 11px 0 11px;
      border-bottom: 1px solid #e4e4e4;
      height: 205px;
      img {
        width: 100%;
        margin-bottom: 11px;
        border-radius: 5px;
      }
    }
    .food-list {
      padding: 11px;
      .title {
        height: 13px;
        padding-left: 7px;
        margin-bottom: 12px;
        background: url("../assets/img/btn_yellow_highlighted@2x.png") no-repeat
          left center;
        background-size: 2px 10px;
        font-size: 13px;
      }
      .food-item {
        display: flex;
        position: relative;
        margin-bottom: 25px;
        .food-picture {
          flex: 0 0 95px;
          margin-right: 11px;
        }
        .content {
          flex: 1;
          position: relative;
          .name {
            margin-bottom: 10px;
            padding-right: 27px;
            line-height: 21px;
            color: #333333;
            font-size: 16px;
          }
          .extra {
            margin-bottom: 7px;
            color: #bfbfbf;
            font-size: 10px;
            .saled {
              margin-right: 14px;
            }
          }
          .product {
            height: 15px;
            margin-bottom: 6px;
          }
          .price {
            font-size: 0;
            .text {
              color: #fb4e44;
              font-size: 14px;
            }
            .unit {
              color: #bfbfbf;
              font-size: 12px;
            }
          }
          .control-wrapper {
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>