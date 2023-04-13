import axios from "./request"
//请求示例

//登录
export const login = (data) => {
    return axios({
        url: "/api/login",
        method: "post",
        data,
        config:{
            header:{
                "Content-Type":"application/json"
            }
        }
    })
}
//注册
export const register = (data) => {
    return axios({
        url: "/api/register",
        method: "post",
        data,
        config:{
            header:{
                "Content-Type":"application/json"
            }
        }
    })
}
//上传图片
export const upload = (data) => {
    return axios({
        url: "/api/upload",
        method: "post",
        data,
        config:{
            header:{
                "Content-Type":"multipart/form-data"
            }
        }
    })
}

//查看用户列表
export const userData = (data) => {
    return axios({
        url: "/api/userData",
        method: "post",
        data,
        config:{
            header:{
                "Content-Type":"application/json"
            }
        }
    })
}

//查看用户数量
export const userCount = (data) => {
    return axios({
        url: "/api/userCount",
        method: "post",
        data,
        config:{
            header:{
                "Content-Type":"application/json"
            }
        }
    })
}
