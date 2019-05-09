<template>
  <v-toolbar
    id="core-toolbar"
    flat
    prominent
    style="background: #eee;">
    <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <v-btn
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer/>
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2>
        <el-tooltip
          class="item"
          effect="dark"
          content="查看作品"
          placement="bottom">
          <router-link
            v-ripple
            class="toolbar-items"
            to="/pixel">
            <v-icon color="tertiary">mdi-view-dashboard</v-icon>
          </router-link>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="上传新作品"
          placement="bottom">
          <router-link
            v-ripple
            class="toolbar-items"
            to="/upload">
            <v-icon color="tertiary">mdi-arrow-up-bold</v-icon>
          </router-link>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="退出登录"
          placement="bottom">
          <v-btn
            flat
            color="pink"
            @click="logout">
            <v-icon color="pink">mdi-logout-variant</v-icon>
          </v-btn>
        </el-tooltip>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    title: null,
    responsive: false,
    responsiveInput: false
  }),

  watch: {
    $route (val) {
      this.title = val.name
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    },
    logout () {
      this.$confirm('确认退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已注销账户'
          })
          window.localStorage.clear()
          location.reload()
        })
        .catch(() => {})
    }
  }
}
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
