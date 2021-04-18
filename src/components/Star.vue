<template>
  <div class="star">
    <i class="iconfont" :class="itemClass" v-for="(itemClass, index) in starArr" :key="index"></i>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    starArr () {
      var fullNums, halfNums, result=[];
      fullNums = Math.floor(this.score);
      if (this.score === Math.floor(this.score)) {
        halfNums = null;
      } else {
        halfNums = fullNums + 1;
      }
      for (let i = 1; i < 6; i++) {
        if(i <= fullNums) {
          result.push("icon-xing-full")
        }
        if(i > fullNums) {
          if(halfNums) {
            result.push("icon-xing-half");
            halfNums = null;
          } else {
            result.push("icon-xing-empty")
          }
        }
      }
      return result
    }
  },
}
</script>

<style scoped>
.star {
  color: #ffc600;
}
.star .iconfont {
  margin-left: -3px;
  font-size: 16px;
}
</style>