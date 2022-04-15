<template>
  <div class="icoBtn slate-btn dn-text">
    <v-icon v-bind="iconVal" />
  </div>
</template>
<script lang="ts">
import { computed } from 'vue'
export default {
  props:{
    icon:{type:String,default:'md-refresh'},
    loading:{type:Boolean}
  },
  setup(props:any) {
    const iconVal = computed(()=>{
      const {icon,loading} = props
      return loading?{name:icon,animation:'spin'}:{name:icon}
    })
    return {
      iconVal
    }
  }
}
</script>