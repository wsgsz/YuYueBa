<template>
  <div class="mpas">
    <el-amap vid="amapDemo" :zoom="zoom" :center="center" :plugin="plugin" class="amap-demo">
      <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
export default {
  props: [
    'lng', 'lat'
  ],
  data() {
    return {

      zoom: 12,
      center: [this.lng, this.lat],
      markers: [{
        position: [this.lng, this.lat],
        events: {
       
          dragend: (e) => {
            this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
          }
        },
        visible: true,
        draggable: false,
        template: '<span>1</span>',
      }],
      plugin: [{
        pName: 'ToolBar',
        direction: false,
        locate: false,
        liteStyle: true,
        events: {
          init(instance) {
         
            // console.log(instance);
          }
        }
      }]
    }
  },
  computed: {}
}

</script>
<style scoped>
.mpas {
  height: 100%;
}

</style>
