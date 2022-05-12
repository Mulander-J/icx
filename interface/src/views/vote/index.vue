<template>
  <div class="p-5">
    <h2 class="pix-h2">      
      <span>Vote [DEMO]</span>
    </h2>
    <ul>
      <li class="voteRow" v-for="n in list" :key="n.id">
        <div>
          <strong class="mr-4">{{n.case}}</strong>
          <span>{{n.title}}</span>
        </div>        
        <p><label>Reason: </label>{{n.reason}}</p>
       <div>
          <div class="voteBar" v-for="(v,vi) in n.votes" :key="vi">
            <div class="flex">
              <label>{{v.key}}/{{v.count}}</label>
              <rt-btn class="mx-2" title="Vote" :hover="true" icon="gi-mailed-fist" />
            </div>
            <div class="line">
              <div class="track" :style="{width:`${calcW(n,v)}%`}"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
const list = new Array(6).fill(0).map((_,i)=>({
  id: i,
  title: `Title_${String.fromCharCode(i+65)}#${i}`,
  case: 'Frozen',
  reason: i%2===0 ? 'We think this collection deserves to be frozen.':'We love this collection.',
  votes: [
    {
      key: 'yes',
      count: Math.round(Math.random()*100)+i
    },
    {
      key: 'no',
      count: Math.round(Math.random()*100)+i
    },
  ]
}))

const calcW = (n:any,v:any)=>{
  const tol = n.votes.reduce((t:number,i:any)=> t+i.count,0)
  return Math.round(100 * v.count / tol)
}
</script>
<style scoped>
.voteRow{
  @apply my-4 p-4 rounded-xl grid gap-y-2 bg-gradient-to-r from-white/[.3] dark:from-black/[.3];
}
.voteBar label{
  @apply capitalize
}
.voteBar .line{
  @apply my-2 w-4/5 h-4 rounded-lg relative overflow-hidden bg-gray-700/[.6] dark:bg-gray-400/[.6];
}
.voteBar .line .track{
  @apply absolute top-0 left-0 rounded-lg h-full bg-gradient-to-r
  from-indigo-600/[.8] via-purple-600/[.8] to-pink-600/[.8]
  dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500;
}

</style>