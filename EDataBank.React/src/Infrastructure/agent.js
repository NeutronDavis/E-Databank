import superagentPromise from "superagent-promise";
import _superagent from "superagent";

//import commonStore from "../home/login/stores/commonStore";
import { ENV } from "../Infrastructure/EnvironmentConfig";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = ENV.API_ROOT;

const handleErrors = (err) => {
  if (err.status === 401) window.location.href = "/login";
  throw err;
};

const responseBody = (res) => res.body;

const tokenPlugin = (req) => {
  let token = window.sessionStorage.getItem("qrjwt");
  let specimen = window.sessionStorage.getItem("specimen");
  if (token && specimen) {
    req.set("authorization", `Bearer ${token}`);
    req.set("specimen", `${specimen}`);
  }
};

const tokenPl = (req) => {
  req.set("Access-Control-Allow-Origin", `*`);
};
const tokenPAJ = (req) => {
  req.set("Content-Type", `application/json`);
};
const tokenPACT = (req) => {
  req.set("Accept", `application/json`);
};

const externalClient = {
  get:(url)=>
     superagent
      .get(url)
      .then(responseBody)
}
const registerClient = {
  post:(url, body)=>
     superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPl)
      .use(tokenPAJ)
      .use(tokenPACT)
      .then(responseBody)
}

const client = {
  del: (url) =>
    superagent
      .del(`${API_ROOT}${url}`)
      // .withCredentials()
      .use(tokenPlugin)
      .catch(handleErrors)
      .then(responseBody),
  get: (url) => {
    return superagent
      .get(`${API_ROOT}${url}`)
      // .withCredentials()
      .use(tokenPlugin)
      .catch(handleErrors)
      .then(responseBody);
  },
  getqs: (url, body) => {
    return superagent
      .get(`${API_ROOT}${url}`)
      .query(body)
      // .withCredentials()
      .use(tokenPlugin)
      .catch(handleErrors)
      .then(responseBody);
  },

  getFile: (url, body) => {
    return superagent
      .get(`${API_ROOT}${url}`)
      .query(body)
      .responseType("blob")
      // .withCredentials()
      .use(tokenPlugin)
      .catch(handleErrors)
      .then(responseBody);
  },
  postFile: (url, body) => {
    return superagent
      .post(`${API_ROOT}${url}`, body)
   
      .responseType("blob")
      .withCredentials()
      .use(tokenPlugin)
      .catch(handleErrors)
      .then(responseBody);
  },
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      // .withCredentials()
      .use(tokenPlugin)
      .catch(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      // .withCredentials()
      .use(tokenPlugin)
      .catch(handleErrors)
      .then(responseBody),

};

export { client, API_ROOT,externalClient,registerClient };
