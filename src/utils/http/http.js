import axios from "axios";
import store from "../../store";
// import qs from "qs";
import router from "../../router";

import RenderContext from "../render-context/context";

axios.defaults.timeout = 50000;
axios.defaults.baseURL = "http://127.0.0.1:8000/";

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.login.loginToken) {
      config.headers.Authorization = `nly ${store.getters.getLoginToken}`;
    }
    // if (Object.prototype.toString.call(config.data) != "[object FormData]") {
    //   if (config.method == "post") {
    //     config.data = qs.stringify(config.data);
    //     config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    //   }
    // } else {
    //   if (config.method == "post") {
    //     config.data = qs.stringify(config.data);
    //     config.headers["Content-Type"] = "multipart/form-data";
    //   }
    // }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    const dataAxios = response.data;
    const { ret, data } = dataAxios;
    const { code } = ret;
    if (code === undefined) {
      return dataAxios;
    } else {
      switch (code) {
        case 200:
          return data;
        default:
          return Promise.reject(ret);
      }
    }
  },
  error => {
    const ret = {};
    if (error && error.response) {
      const ret = {};
      switch (error.response.status) {
        case 400:
          ret.code = 400;
          ret.msg = "请求错误";
          return Promise.reject(ret);
        case 401:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
          store.commit("clearLoginUserInfo");
          break;
        case 403:
          ret.code = 403;
          ret.msg = "没有权限";
          return Promise.reject(ret);
        case 404:
          router.push({
            path: "/404"
          });
          break;
        case 408:
          ret.code = 408;
          ret.mssg = "请求超时";
          return Promise.reject(ret);
        case 500:
          ret.code = 500;
          ret.mssg = "服务器内部错误";
          return Promise.reject(ret);
        case 501:
          ret.code = 501;
          ret.mssg = "服务未实现";
          return Promise.reject(ret);
        case 502:
          ret.code = 502;
          ret.mssg = "网关错误";
          return Promise.reject(ret);
        case 503:
          ret.code = 503;
          ret.mssg = "服务不可用";
          return Promise.reject(ret);
        case 504:
          ret.code = 504;
          ret.mssg = "网关超时";
          return Promise.reject(ret);
        case 505:
          ret.code = 505;
          ret.mssg = "HTTP版本不受支持";
          return Promise.reject(ret);
        default:
          ret.code = 600;
          ret.mssg = "未知错误";
          return Promise.reject(ret);
      }
    } else {
      ret.code = 503;
      ret.msg = "服务不可用";
      return Promise.reject(ret);
    }
  }
);

export default {
  nlyGetList: function(url, params = {}) {
    /**
     * 封装get list方法，获取数据列表
     * 可带 搜索条件，页码，每页数量数据
     * demo url 127.0.0.1:8000/api/project/?page=1&size=10&name=33
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  nlyGetDetail: function(url, id) {
    /**
     * 封装get detail方法,获取数据详情
     * 不带params和data，带id
     * demo url 127.0.0.1:8000/api/project/detail/1/
     * @param url
     * @param id
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .get(url + id + "/")
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  nlyPost: function(url, data = {}) {
    /**
     * 封装post请求，创建数据
     * demo url 127.0.0.1:8000/api/project/create/
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  nlyUpdateFile: function(url, data = {}, config = {}) {
    /**
     * 封装post请求，创建数据
     * demo url 127.0.0.1:8000/api/project/create/
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, config)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  nlyPatch: function(url, data = {}) {
    /**
     * 封装patch请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .patch(url, data)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  nlyUpDate: function(url, id, data) {
    /**
     * 封装put请求，更新，修改数据，假删除数据等
     * 带data，带id
     * demo url 127.0.0.1:8000/api/project/1/
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .put(url + id + "/", data)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  nlyDelete: function(url, id) {
    /**
     * 封装delete请求，删除数据
     * 带id
     * demo url 127.0.0.1:8000/api/project/delete/1/
     * @param url
     * @param data
     * @returns {Promise}
     */
    return new Promise((resolve, reject) => {
      axios
        .delete(url + id + "/")
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  nlyCheckCode: function(obj, ret) {
    const codeArray = [400, 403, 408, 500, 501, 502, 503, 504, 505, 600];
    const { code, msg } = ret;
    if (codeArray.indexOf(code) === -1) {
      return false;
    }
    const toastVnode = {
      title: RenderContext.httpContext.interceptorsErrorTilte,
      message: msg,
      content: code,
      variant: RenderContext.httpContext.interceptorsVariant
    };
    obj.$toast(obj, toastVnode);
    return true;
  }
};
