import http from "../http";
import urlList from "./urlList";

export default {
  getReturnData: function(obj, data) {
    const url = urlList.getReturnDataUrl;
    http.nlyPost(url, data).then(
      response => {
        const deepStep = obj.step[0];
        if (response.code === 0) {
          obj.loading = false;
          deepStep.active = false;
          obj.$set(obj.step, 0, deepStep);
          obj.$set(obj.step[1], "active", true);
          obj.tableData = response.result;
        } else {
          const toastVnode = {
            content: obj.$lang.addDataSource.uploadFilePostToast.content,
            message: response.msg,
            title: obj.$lang.addDataSource.uploadFilePostToast.title,
            variant: obj.$lang.addDataSource.uploadFilePostToast.variant
          };
          obj.$toast.Toast(obj, toastVnode);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
};
