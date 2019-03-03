<template>
  <material-card  @click="test">
    <img :src="url" class="mypic">
  </material-card>
</template>

<style>
.mypic {
  border-radius: 15px;
}
</style>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '../../../public/img/my.png'
    }
  },
  methods: {
    test(){
      console.log("go")
    }
  }
}
</script>
