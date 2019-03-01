<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap v-for="i in 10" :key="i">
      <v-flex v-for="i in 12" :key="`6${i}`" xs2 px-1>
        <material-my-card>
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
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4081015935,3089942480&fm=26&gp=0.jpg"
    };
  }
};
</script>
