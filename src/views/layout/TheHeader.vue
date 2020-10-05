<template>
  <nly-navbar variant="white" header border size="sm" :dark="false">
    <nly-navbar-nav>
      <nly-nav-item v-nly-sidebar-collapse.navitem>
        <nly-icon icon="nlyfont nly-icon-logo-windows" />
      </nly-nav-item>
      <nly-nav-item
        active
        class="d-none d-sm-inline-block"
        :to="{ name: 'collapse' }"
        >首页</nly-nav-item
      >

      <nly-nav-dropdown
        id="menudropdon1"
        :popup="true"
        :dropdown-toggle="true"
        menu-class="border-0"
        size="xl"
        class="d-none d-sm-inline-block"
      >
        <template slot="linkcontent">
          测试
          <nly-icon icon="nlyfont nly-icon-notification-fill" />
        </template>
        <template slot="menucontent">
          <nly-nav-item :nav-item="false" dropdown-item to="/"
            >我是nav-item="false"</nly-nav-item
          >
          <nly-nav-item :nav-item="false" dropdown-item to="nav"
            >dropdown-item</nly-nav-item
          >

          <nly-nav-item :nav-item="false" dropdown-item to="/" disabled
            >我是disabled</nly-nav-item
          >
          <nly-nav-item :nav-item="false" dropdown-item to="nav" append
            >我是append</nly-nav-item
          >

          <nly-nav-dropdown
            id="menudropdon2"
            hover
            :nav-item="false"
            submenu
            :nav-link="false"
            dropdown-item
            dropdown-toggle
            size="lg"
            direction="none"
          >
            <template slot="linkcontent">我是悬浮菜单</template>
            <template slot="menucontent">
              <nly-nav-item
                :nav-item="false"
                dropdown-item
                :to="{ name: 'button' }"
                >我是nav-item="false"</nly-nav-item
              >
              <nly-nav-item :nav-item="false" dropdown-item
                >dropdown-item</nly-nav-item
              >

              <nly-nav-dropdown
                :nav-item="false"
                submenu
                :nav-link="false"
                dropdown-item
                dropdown-toggle
                direction="none"
                id="menudropdon3"
              >
                <template slot="linkcontent">我是三级</template>
                <template slot="menucontent">
                  <nly-nav-item
                    :nav-item="false"
                    dropdown-item
                    :to="{ name: 'button' }"
                    >我是nav-item="false"</nly-nav-item
                  >
                  <nly-nav-item :nav-item="false" dropdown-item
                    >dropdown-item</nly-nav-item
                  >
                </template>
              </nly-nav-dropdown>
            </template>
          </nly-nav-dropdown>
        </template>
      </nly-nav-dropdown>

      <nly-nav-dropdown
        :popup="true"
        :dropdown-toggle="true"
        menu-class="border-0"
        size="xl"
        hover
        item-class="d-none d-sm-inline-block"
      >
        <template slot="linkcontent">我是悬浮菜单</template>
        <template slot="menucontent">
          <nly-nav-item :nav-item="false" dropdown-item to="/"
            >我是nav-item="false"</nly-nav-item
          >
          <nly-nav-item :nav-item="false" dropdown-item to="nav"
            >dropdown-item</nly-nav-item
          >
        </template>
      </nly-nav-dropdown>
    </nly-navbar-nav>
    <nly-navbar-nav class="ml-auto">
      <nly-nav-dropdown
        :popup="true"
        menu-class="border-0"
        size="lg"
        menu-direction="right"
      >
        <template slot="linkcontent">
          <nly-icon icon="nlyfont nly-icon-notification-fill" />
        </template>
        <template slot="menucontent">
          <nly-nav-item :nav-item="false" dropdown-item to="/"
            >我是nav-item="false"</nly-nav-item
          >
          <nly-nav-item :nav-item="false" dropdown-item to="nav"
            >dropdown-item</nly-nav-item
          >
        </template>
      </nly-nav-dropdown>

      <nly-nav-dropdown
        :popup="true"
        menu-class="border-0"
        size="lg"
        menu-direction="right"
      >
        <template slot="linkcontent">
          <nly-icon icon="nlyfont nly-icon-mail-fill" />
          <nly-badge bg-variant="fuchsia" badge-class="navbar-badge"
            >12</nly-badge
          >
        </template>
        <template slot="menucontent">
          <nly-nav-item :nav-item="false" dropdown-item to="/"
            >我是nav-item="false"</nly-nav-item
          >
          <nly-nav-item :nav-item="false" dropdown-item to="nav"
            >dropdown-item</nly-nav-item
          >
        </template>
      </nly-nav-dropdown>

      <nly-nav-dropdown
        :popup="true"
        menu-class="border-0"
        size="lg"
        menu-direction="right"
        class="user-menu"
        v-if="userInfo"
      >
        <template slot="linkcontent">
          <img
            :src="userInfo.user_pic"
            class="user-image img-circle elevation-2"
          />
          <span class="d-none d-md-inline">{{ userInfo.username }}</span>
        </template>
        <template slot="menucontent">
          <li class="user-header bg-primary" v-if="userInfo">
            <img
              :src="userInfo.user_pic"
              class="img-circle elevation-2"
              alt="User Image"
            />

            <p>
              {{ userInfo.username }} - Web Developer
              <small>Member since {{ userInfo.create_date }}</small>
            </p>
          </li>
          <li class="user-body">
            <div class="row">
              <div class="col-4 text-center">
                <a href="#">Followers</a>
              </div>
              <div class="col-4 text-center">
                <a href="#">Sales</a>
              </div>
              <div class="col-4 text-center">
                <a href="#">Friends</a>
              </div>
            </div>
            <!-- /.row -->
          </li>
          <li class="user-footer">
            <nly-button
              flat
              bg-gradient-variant="warning"
              @click="logout"
              button-class="btn-flat"
              >修改资料</nly-button
            >
            <nly-button
              flat
              button-class="float-right btn-flat"
              bg-gradient-variant="danger"
              @click="logout"
              >退出登录</nly-button
            >
          </li>
        </template>
      </nly-nav-dropdown>

      <nly-nav-item>
        <nly-icon icon="nlyfont nly-icon-setting-fill" />
      </nly-nav-item>
    </nly-navbar-nav>
  </nly-navbar>
</template>

<script>
export default {
  name: "TheHeader",
  props: {
    userInfo: {
      type: [Object],
      default: null
    }
  },
  methods: {
    logout() {
      this.$router.push({
        name: "Login"
      });
      this.$store.commit("clearLoginUserInfo");
    }
  }
};
</script>
