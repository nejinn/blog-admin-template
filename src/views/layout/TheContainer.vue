<template>
  <nly-wrapper
    side-mini
    layout="fixed"
    wrapper-class="XXXX"
    container-class="zzz"
  >
    <the-header :user-info="userInfo" v-if="userInfo"> </the-header>
    <the-sidebar v-if="userSidebar" :sidebar="userSidebar" />
    <the-main v-if="userInfo" />
    <the-footer v-if="userInfo" />
  </nly-wrapper>
</template>

<script>
import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";
import TheFooter from "./TheFooter";
import TheMain from "./TheMain";
export default {
  name: "TheContainer",
  components: {
    TheHeader,
    TheSidebar,
    TheFooter,
    TheMain
  },
  data() {
    return {
      userInfo: undefined,
      userSidebar: undefined
    };
  },
  created() {
    document.body.classList.add("text-sm");
  },
  beforeCreate() {
    const obj = this;
    this.$api.HttpsUerInfo.userInfo(obj, {});
  }
};
</script>
