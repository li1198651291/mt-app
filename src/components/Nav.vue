<template>
  <nav class="nav">
    <router-link class="nav-item" :to="{name: 'Goods'}">
      点餐
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item" :to="{name: 'Ratings'}">
      评价({{commentNum}})
      <i class="line"></i>
    </router-link>
    <router-link class="nav-item" :to="{name: 'Seller'}">
      商家
      <i class="line"></i>
    </router-link>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['commentNum'])
  },
  methods: {
    ...mapActions(['getRatings'])
  },
  mounted () {
    this.getRatings()
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e4e4e4;
  line-height: 40px;
}
.nav-item {
  flex: 1;
  position: relative;
  color: #666666;
  font-size: 13px;
  text-decoration: none;
  text-align: center;
}
.nav .active {
  color: #ffbb22;
}
.active .line {
  display: inline-block;
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 20px;
  height: 2px;
  margin-left: -10px;
  background: #ffbb22;
}
</style>