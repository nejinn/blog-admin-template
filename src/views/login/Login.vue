<template>
  <div
    class="login-page"
    :style="{
      'min-height': '512.391px',
      background: 'url(' + loginBg + ')',
      'background-size': '100% 100%'
    }"
  >
    <div class="login-box">
      <div class="login-logo">
        <a class="text-white"
          ><b>{{ this.$renderContext.loginContext.loginLog[0] }}</b
          >{{ this.$renderContext.loginContext.loginLog[1] }}</a
        >
      </div>
      <nly-card>
        <nly-card-body class="login-card-body">
          <p :class="loginBoxMsgText">
            {{ this.loginBoxMsg }}
          </p>
          <nly-input-group class="mb-3">
            <nly-form-input
              v-model="username"
              trim
              @blur="usernameCheck"
              :valid="usernameState"
              :placeholder="
                this.$renderContext.loginContext.loginInputPlaceholder[0]
              "
            ></nly-form-input>
            <template v-slot:append>
              <nly-input-group-text>
                <nly-icon icon="fas fa-user" />
              </nly-input-group-text>
            </template>
          </nly-input-group>

          <nly-input-group class="mb-3">
            <nly-form-input
              v-model="password"
              trim
              type="password"
              @blur="passwordCheck"
              :valid="passwordState"
              :placeholder="
                this.$renderContext.loginContext.loginInputPlaceholder[1]
              "
            ></nly-form-input>
            <template v-slot:append>
              <nly-input-group-text>
                <nly-icon icon="fas fa-lock" />
              </nly-input-group-text>
            </template>
          </nly-input-group>

          <nly-row>
            <nly-col xs="8">
              <div class="icheck-primary">
                <nly-row>
                  <nly-col sm="2">
                    <nly-switch v-model="rememberState" />
                  </nly-col>
                  <nly-col sm="10">
                    <label class="text-sm">
                      {{ this.$renderContext.loginContext.rememberMe }}
                    </label>
                  </nly-col>
                </nly-row>
              </div>
            </nly-col>
            <nly-col xs="4">
              <nly-button variant="primary" block size="sm" @click="login">
                {{ this.$renderContext.loginContext.loginButtom }}
              </nly-button>
            </nly-col>
          </nly-row>
        </nly-card-body>
      </nly-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginBoxMsg: undefined,
      username: undefined,
      usernameState: "novalid",
      password: undefined,
      passwordState: "novalid",
      rememberState: false,
      loginBg: undefined
    };
  },
  created() {
    this.loginBoxMsg = this.$renderContext.loginContext.loginBoxMsg;
    this.usernameInvalid = this.$renderContext.loginContext.usernameInvalid;
    this.loginBg = require("../../assets/static/login_bg.jpg");
  },
  mounted() {},
  computed: {
    loginBoxMsgText() {
      return this.loginBoxMsg != this.$renderContext.loginContext.loginBoxMsg
        ? "login-box-msg text-danger"
        : "login-box-msg";
    }
  },
  methods: {
    usernameCheck() {
      this.username.length > 0
        ? (this.usernameState = "valid")
        : (this.usernameState = "invalid");
    },
    passwordCheck() {
      this.password.length >= 6
        ? (this.passwordState = "valid")
        : (this.passwordState = "invalid");
    },
    login() {
      const loginData = {
        username: this.username,
        password: this.password
      };
      const obj = this;
      if (this.username === undefined || this.username.length === 0) {
        const toastVnode = {
          title: this.$renderContext.loginContext.loginError.title,
          message: this.$renderContext.loginContext.loginError.usernameMsg,
          content: this.$renderContext.loginContext.loginError.usernameContent,
          variant: this.$renderContext.loginContext.loginError.variant
        };
        this.$toast(obj, toastVnode);
        return;
      }
      if (this.password === undefined || this.password.length === 0) {
        const toastVnode = {
          title: this.$renderContext.loginContext.loginError.title,
          message: this.$renderContext.loginContext.loginError.passwordMsg,
          content: this.$renderContext.loginContext.loginError.passwordContent,
          variant: this.$renderContext.loginContext.loginError.variant
        };
        this.$toast(obj, toastVnode);
        return;
      }
      this.$api.HttpsLogin.login(obj, loginData);
    }
  }
};
</script>
