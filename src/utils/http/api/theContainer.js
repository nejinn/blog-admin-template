import http from "../http";
import urlList from "./urlList";

export default {
  userInfo: function(obj, data) {
    const url = urlList.getUserInfo;
    http.nlyGetList(url, data).then(
      response => {
        const { user_info, user_sidebar } = response;
        obj.userInfo = user_info;
        obj.userSidebar = user_sidebar;
      },
      err => {
        if (!http.nlyCheckCode(obj, err)) {
          console.log(22, err);
          // const { msg } = err;
          // obj.loginBoxMsg = msg;
        }
      }
    );
  }
};
