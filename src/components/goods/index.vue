<template>
  <div class="goods">
    <header-t></header-t>
    <router-view></router-view>
  </div>
</template>
<script>
import { baseUrl, imgUrl } from '@/api/env'
import { mapMutations, mapState } from 'vuex'
import headerT from '@/components/org/header'
export default {
  data() {
    return {
      value: ""
    }
  },
  methods: {

  },
  components: {
    headerT
  },
  method() {},
  created() {

  }
}

</script>
<style scoped>


</style>
