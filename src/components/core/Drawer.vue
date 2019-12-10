<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    clipped
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
      <v-layout
        class="fill-height"
        tag="v-list"
        column>
        <v-divider/>
        <v-list-tile v-if="responsive">
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"/>
        </v-list-tile>

        <template v-if="authority == 'root' || authority == 'admin' ">
          <v-list-tile
            v-for="(adminlink, i) in adminlinks"
            :key="i"
            :to="adminlink.to"
            active-class="myprimary"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ adminlink.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="adminlink.text"/>
          </v-list-tile>
        </template>
        <template v-if="authority == 'user'">
          <v-list-tile
            v-for="(link, i) in userlinks"
            :key="i"
            :to="link.to"
            active-class="myprimary"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="link.text"/>
          </v-list-tile>
        </template>
        <template v-if="!authority">
          <v-list-tile
            v-for="(link, i) in visitorlinks"
            :key="i"
            :to="link.to"
            active-class="myprimary"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="link.text"/>
          </v-list-tile>
        </template>
      </v-layout>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    logo: './img/vuetifylogo.png',
    adminlinks: [
      {
        // add pixel by keith
        to: '/pixel',
        icon: 'mdi-atom',
        text: 'Pixel'
      },
      {
        to: '/search/all',
        icon: 'mdi-image-search',
        text: '探索'
      },
      {
        to: '/admin-user',
        icon: 'mdi-account',
        text: '用户管理'
      },
      {
        to: '/admin-comment',
        icon: 'mdi-comment-multiple-outline',
        text: '评论管理'
      },
      {
        to: '/user-profile/' + window.localStorage.uid + '/type/info',
        icon: 'mdi-account',
        text: '管理员信息'
      }
    ],
    userlinks: [
      {
        // add pixel by keith
        to: '/pixel',
        icon: 'mdi-atom',
        text: 'Pixel'
      },
      {
        to: '/search/all',
        icon: 'mdi-image-search',
        text: '探索'
      },
      {
        to: '/upload',
        icon: 'mdi-cloud-upload',
        text: '上传新作品'
      },
      {
        to: '/user-profile/' + window.localStorage.uid + '/type/info',
        icon: 'mdi-account',
        text: '我的作品'
      }
    ],
    visitorlinks: [
      {
        // add pixel by keith
        to: '/pixel',
        icon: 'mdi-atom',
        text: 'Pixel'
      },

      {
        to: '/search/all',
        icon: 'mdi-image-search',
        text: '探索'
      },
      {
        // add login by keith
        to: '/login',
        icon: 'mdi-account',
        text: '登录'
      }
    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    },
    authority: {
      get () {
        // 重新检查用户权限
        return window.localStorage.authority
      }
    }
  },
  // 重新渲染 dom 的时候触发的事件
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
