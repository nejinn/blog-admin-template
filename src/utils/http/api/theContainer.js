import http from "../http";
import urlList from "./urlList";
import RenderContext from "../../../utils/render-context/context";

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
          const { code, msg } = err;
          const toastVnode = {
            title: RenderContext.allUseContext.title,
            message: msg,
            content: code,
            variant: RenderContext.allUseContext.variant
          };
          obj.$toast(obj, toastVnode);
        }
      }
    );
  }
};
