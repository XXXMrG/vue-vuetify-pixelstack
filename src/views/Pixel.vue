<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap v-for="i in 10" :key="i">
      <v-flex v-for="i in 12" :key="`6${i}`" xs3 px-3 py-3>
        <material-my-card :url="myPic">
        </material-my-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      myPic:
        "../../public/img/my.png"
    };
  }
};
</script>
