const renderContext = {
  loginContext: {
    loginLog: ["BlogAdmin", "NLY"],
    loginBoxMsg: "请输入账号密码登录",
    loginInputPlaceholder: ["账号", "密码"],
    rememberMe: "记住我",
    loginButtom: "登录",
    loginError: {
      title: "登录失败",
      usernameMsg: "用户名不能为空",
      usernameContent: "用户名异常",
      passwordMsg: "密码不能为空",
      passwordContent: "密码异常",
      variant: "danger"
    }
  },
  httpContext: {
    interceptorsErrorTilte: "服务错误",
    interceptorsVariant: "info"
  }
};

export default renderContext;
