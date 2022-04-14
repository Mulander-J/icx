<template>
  <button class="rtBtn slate-btn">
    <v-icon :name="icon" :animation="loading?'spin':''"/>
  </button>
</template>
<script lang="ts">
export default {
  props:{
    icon:{type:String,default:'io-refresh'},
    loading:{type:Boolean}
  }
}
</script>
<style>
	.rtBtn {
		@apply absolute top-5 right-5 rounded-lg flex items-center justify-center p-2;
    min-height: 2rem;
    min-width: 2rem;
	}
</style>