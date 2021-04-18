<template>
  <appHeader></appHeader>
  <appNav></appNav>
  <router-view v-slot=" { Component }">
    <keep-alive include="Goods,Ratings,Seller">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <!-- <router-view></router-view> -->
</template>
<script>
import Header from './components/Header';
import Nav from './components/Nav'
import { mapActions } from 'vuex';

export default {
  components: {
    appHeader: Header,
    appNav: Nav,
  },

  methods: {
    ...mapActions(["getGoods"])
  },
  created () {
    this.getGoods()
  }
}
</script>

<style>
</style>
