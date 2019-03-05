<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img :src="image" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img :src="logo" height="34" contain/>
          </v-list-tile-avatar>
          <v-list-tile-title class="title">Pixel Stack</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile v-if="responsive">
          <v-text-field class="purple-input search-input" label="Search..." color="purple"/>
        </v-list-tile>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text"/>
        </v-list-tile>
        <template v-if="authority == 'root' ">
          <v-list-tile
            v-for="(adminlink, i) in adminlinks"
            :key="i"
            :to="adminlink.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{adminlink.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="adminlink.text"/>
          </v-list-tile>
        </template>
        <!-- deleted the upgrade to pro at 2019/2/27-->
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    logo: "./img/vuetifylogo.png",
    adminlinks: [
      {
        to: "/admin-user",
        icon: "mdi-account",
        text: "管理用户"
      }
    ],
    links: [
      {
        // add pixel by keith
        to: "/pixel",
        icon: "mdi-atom",
        text: "Pixel"
      },
      {
        to: "/dashboard",
        icon: "mdi-view-dashboard",
        text: "Dashboard"
      },
      {
        to: "/user-profile/" + window.localStorage.uid,
        icon: "mdi-account",
        text: "User Profile"
      },
      {
        to: "/table-list",
        icon: "mdi-clipboard-outline",
        text: "Table List"
      },
      {
        to: "/typography",
        icon: "mdi-format-font",
        text: "Typography"
      },
      {
        to: "/icons",
        icon: "mdi-chart-bubble",
        text: "Icons"
      },
      {
        to: "/maps",
        icon: "mdi-map-marker",
        text: "Maps"
      },
      {
        to: "/notifications",
        icon: "mdi-bell",
        text: "Notifications"
      },
      {
        // add login by keith
        to: "/login",
        icon: "mdi-account",
        text: "Login"
      }
    ],
    responsive: false
  }),
  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    },
    items() {
      return this.$t("Layout.View.items");
    },
    authority: {
      get() {
        // 重新检查用户权限
        return window.localStorage.authority;
      }
    }
  },
  // 重新渲染 dom 的时候触发的事件
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  }
};
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
