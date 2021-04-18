<template>
  <div class="cartcontrol">
    <i class="iconfont icon-jian" @click.stop="decrease(selectedfood)" v-show="isSelected"></i>
    <span class="num" v-show="isSelected">{{selectedfood.count}}</span>
    <i class="iconfont icon-wuuiconxiangjifangda" @click.stop="increase(selectedfood)"></i>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    selectedfood: {
      type: Object
    }
  },
  computed: {
    isSelected () {
      if (this.selectedfood.count > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    increase () {
      if (!this.selectedfood.count) {
        this.selectedfood.count = 1
      } else {
        this.selectedfood.count++
      }
    },
    decrease () {
      this.selectedfood.count--
    },
  }
}
</script>

<style scoped>
.num {
  margin: 0 8px;
  line-height: 26px;
  font-size: 12px;
  vertical-align: top;
}
.iconfont {
  font-size: 26px;
}
.icon-jian {
  color: #b4b4b4;
}
.icon-wuuiconxiangjifangda {
  color: #ffd161;
}
</style>