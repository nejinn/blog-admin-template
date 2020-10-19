const ApiBaseUrl = "blog/admin/api/v1/";

export default {
  getLoginUrl: `${ApiBaseUrl}user/login/`,
  getUserInfo: `${ApiBaseUrl}setting/user-info/`,
  getUserList: `${ApiBaseUrl}user/list/`,
  deleteUser: `${ApiBaseUrl}user/delete/`,
  launchUser: `${ApiBaseUrl}user/launch/`,
  checkUsername: `${ApiBaseUrl}user/check-username/`,
  editorUser: `${ApiBaseUrl}user/editor/`
};
