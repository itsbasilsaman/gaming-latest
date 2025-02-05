import axios from "axios";


export const URL="https://api.ggtops.com/api/v1";
// export const URL="http://localhost:2002";

export const axiosIn = axios.create({
  baseURL: URL,
});


export const config ={
    headers :{
        "Content-Type":"application/json",
    },
    withCredentials:false 

}

export const configWithToken = () => {
    let token = localStorage.getItem("accessToken");
    token = token ? token.replace(/^"|"$/g, "").trim() : null;
    console.log("MY TOKENx IS:", token);
  
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: false,
    };
  };
  