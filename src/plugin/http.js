import axios from 'axios'

const httpTool = {}
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
httpTool.install = function (Vue) {
    Vue.prototype.$http = axios;
}

export default httpTool;
