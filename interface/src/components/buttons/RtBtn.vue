<template>
  <div class="btn icoBtn slate-widget dn-text">
    <v-icon v-bind="iconVal" />
  </div>
</template>
<script lang="ts">
import { computed } from 'vue'
export default {
  props:{
    icon:{type:String,default:'md-refresh'},
    loading:{type:Boolean},
    hover:{type:Boolean},
  },
  setup(props:any) {
    const iconVal = computed(()=>{
      const {icon,loading,hover} = props
      if(loading){
        return {name:icon,animation:'spin'}
      }else if(hover){
        return {name:icon,animation:'ring',hover:true}
      }
      return {name:icon}
    })
    return {
      iconVal
    }
  }
}
</script>