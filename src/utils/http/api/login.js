import http from "../http";
import urlList from "./urlList";

export default {
  login: function(obj, data) {
    const url = urlList.getLoginUrl;
    http.nlyPost(url, data).then(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
  }
};
