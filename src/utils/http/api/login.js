import http from "../http";
import urlList from "./urlList";

export default {
  login: function(obj, data) {
    const url = urlList.getLoginUrl;
    http.nlyPost(url, data).then(
      response => {
        const { token } = response;
        obj.$store.commit("setLoginUserInfo", token);
        obj.$router.push(obj.$route.query.redirect || "/");
      },
      err => {
        http.nlyCheckCode(obj, err);
        const { msg } = err;
        obj.loginBoxMsg = msg;
      }
    );
  }
};
