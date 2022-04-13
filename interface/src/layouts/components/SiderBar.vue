<template>
  <div class="bg-red-400 fixed h-full flex-col">
    <ul class="grow">
      <router-link v-for="men in menus" :key="men.name" :to="men" custom v-slot="{navigate, isActive, isExactActive}">
        <li class="cursor-pointer" @click="navigate" :class="{active: isActive, exactActive: isExactActive}">{{men.name}}</li>
      </router-link>
    </ul>
    <div>
      <div>Cycle</div>
      <div>Power</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {appRoutes} from '@/router'
const menus = appRoutes
</script>
<style>
.active{
  background: blue;
}
.exactActive{
  background: orange;
}
</style>