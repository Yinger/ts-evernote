import originAxios from "axios";

const axios = originAxios.create({
  timeout: 20000,
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function get(url: string, data: any) {
  return axios.get(url, {
    params: data,
  });
}

// By default, axios serializes JavaScript objects to JSON.
export function post(url: string, data: any) {
  // console.log(data);
  return axios({
    method: "post",
    url,
    data,
  });
}

export default axios;
