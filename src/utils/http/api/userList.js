import http from "../http";
import urlList from "./urlList";
import RenderContext from "../../render-context/context";

const getUserList = (obj, data) => {
  const url = urlList.getUserList;
  http.nlyGetList(url, data).then(
    response => {
      const { items, fields, page } = response;
      const { count } = page;
      obj.items = items;
      obj.fields = fields;
      obj.isBusy = false;
      obj.total = count;
    },
    err => {
      http.nlyCheckCode(obj, err);
    }
  );
};

const deleteListUser = (obj, data) => {
  const url = urlList.deleteUser;
  http.nlyPost(url, data).then(
    // eslint-disable-next-line no-unused-vars
    response => {
      const toastVnode = {
        title: RenderContext.deleteUserContext.title,
        message: RenderContext.deleteUserContext.message,
        content: RenderContext.deleteUserContext.content,
        variant: RenderContext.deleteUserContext.variant
      };
      obj.$toast(obj, toastVnode);
      obj.selected = [];

      const nextUrl = urlList.getUserList;

      // this.currentPage = 1;
      // const obj = this;
      obj.isBusy = true;
      const nextParams = {
        size: obj.perPageSize,
        page: 1,
        username__icontains: obj.filter.username,
        user_type: obj.filter.usertype,
        user_phone__icontains: obj.filter.userphone,
        user_email__icontains: obj.filter.useremail,
        is_delete: obj.filter.isdelete
      };

      http.nlyGetList(nextUrl, nextParams).then(
        nextResponse => {
          const { page } = nextResponse;
          const { count } = page;

          const nextTotalPages = Math.ceil(count / obj.perPageSize);
          const nextCurrentPage =
            obj.currentPage < nextTotalPages ? obj.currentPage : nextTotalPages;
          obj.currentPage = nextCurrentPage;

          const lastParams = {
            page: nextCurrentPage,
            size: obj.perPageSize,
            username__icontains: obj.filter.username,
            user_type: obj.filter.usertype,
            user_phone__icontains: obj.filter.userphone,
            user_email__icontains: obj.filter.useremail,
            is_delete: obj.filter.isdelete
          };
          getUserList(obj, lastParams);
        },
        nextErr => {
          http.nlyCheckCode(obj, nextErr);
        }
      );
    },
    err => {
      http.nlyCheckCode(obj, err);
    }
  );
};

const deleteUser = (obj, data) => {
  const url = urlList.deleteUser;
  http.nlyPost(url, data).then(
    // eslint-disable-next-line no-unused-vars
    response => {
      const toastVnode = {
        title: RenderContext.deleteUserContext.title,
        message: RenderContext.deleteUserContext.message,
        content: RenderContext.deleteUserContext.content,
        variant: RenderContext.deleteUserContext.variant
      };
      obj.$toast(obj, toastVnode);

      const nextUrl = urlList.getUserList;

      // this.currentPage = 1;
      // const obj = this;
      obj.isBusy = true;
      const nextParams = {
        size: obj.perPageSize,
        page: 1,
        username__icontains: obj.filter.username,
        user_type: obj.filter.usertype,
        user_phone__icontains: obj.filter.userphone,
        user_email__icontains: obj.filter.useremail,
        is_delete: obj.filter.isdelete
      };

      http.nlyGetList(nextUrl, nextParams).then(
        nextResponse => {
          const { page } = nextResponse;
          const { count } = page;

          const nextTotalPages = Math.ceil(count / obj.perPageSize);
          const nextCurrentPage =
            obj.currentPage < nextTotalPages ? obj.currentPage : nextTotalPages;
          obj.currentPage = nextCurrentPage;
          const lastParams = {
            page: nextCurrentPage,
            size: obj.perPageSize,
            username__icontains: obj.filter.username,
            user_type: obj.filter.usertype,
            user_phone__icontains: obj.filter.userphone,
            user_email__icontains: obj.filter.useremail,
            is_delete: obj.filter.isdelete
          };
          getUserList(obj, lastParams);
        },
        nextErr => {
          http.nlyCheckCode(obj, nextErr);
        }
      );
    },
    err => {
      http.nlyCheckCode(obj, err);
    }
  );
};

const launchUser = (obj, data) => {
  const url = urlList.launchUser;
  http.nlyPost(url, data).then(
    // eslint-disable-next-line no-unused-vars
    response => {
      const toastVnode = {
        title: RenderContext.launchUserContext.title,
        message: RenderContext.launchUserContext.message,
        content: RenderContext.launchUserContext.content,
        variant: RenderContext.launchUserContext.variant
      };
      obj.$toast(obj, toastVnode);

      const nextUrl = urlList.getUserList;

      // this.currentPage = 1;
      // const obj = this;
      obj.isBusy = true;
      const nextParams = {
        size: obj.perPageSize,
        page: 1,
        username__icontains: obj.filter.username,
        user_type: obj.filter.usertype,
        user_phone__icontains: obj.filter.userphone,
        user_email__icontains: obj.filter.useremail,
        is_delete: obj.filter.isdelete
      };

      http.nlyGetList(nextUrl, nextParams).then(
        nextResponse => {
          const { page } = nextResponse;
          const { count } = page;

          const nextTotalPages = Math.ceil(count / obj.perPageSize);
          const nextCurrentPage =
            obj.currentPage < nextTotalPages ? obj.currentPage : nextTotalPages;
          obj.currentPage = nextCurrentPage;
          const lastParams = {
            page: nextCurrentPage,
            size: obj.perPageSize,
            username__icontains: obj.filter.username,
            user_type: obj.filter.usertype,
            user_phone__icontains: obj.filter.userphone,
            user_email__icontains: obj.filter.useremail,
            is_delete: obj.filter.isdelete
          };
          getUserList(obj, lastParams);
        },
        nextErr => {
          http.nlyCheckCode(obj, nextErr);
        }
      );
    },
    err => {
      http.nlyCheckCode(obj, err);
    }
  );
};

const checkUsername = (obj, data) => {
  const url = urlList.checkUsername;
  http.nlyPost(url, data).then(
    response => {
      const { check_result, msg } = response;
      if (check_result) {
        obj.feedback.usernameInvalid = msg;
        obj.valid.usernameState = "invalid";
      } else {
        obj.feedback.usernameInvalid = "";
        obj.valid.usernameState = "novalid";
      }
    },
    err => {
      http.nlyCheckCode(obj, err);
    }
  );
};

const editorUser = (obj, data) => {
  const url = urlList.editorUser;
  http.nlyUpDateNoId(url, data).then(
    // eslint-disable-next-line no-unused-vars
    response => {
      obj.editorModal = false;
      obj.isClickEditorOk = false;
      const toastVnode = {
        title: RenderContext.editorUserContext.title,
        message: RenderContext.editorUserContext.message,
        content: RenderContext.editorUserContext.content,
        variant: RenderContext.editorUserContext.variant
      };
      obj.$toast(obj, toastVnode);

      // this.currentPage = 1;
      // const obj = this;
      obj.isBusy = true;
      const nextParams = {
        size: obj.perPageSize,
        page: obj.currentPage,
        username__icontains: obj.filter.username,
        user_type: obj.filter.usertype,
        user_phone__icontains: obj.filter.userphone,
        user_email__icontains: obj.filter.useremail,
        is_delete: obj.filter.isdelete
      };

      getUserList(obj, nextParams);
    },
    err => {
      http.nlyCheckCode(obj, err);
      obj.isClickEditorOk = false;
    }
  );
};
export default {
  getUserList,
  deleteListUser,
  deleteUser,
  launchUser,
  checkUsername,
  editorUser
};
