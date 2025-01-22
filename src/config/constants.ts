

export const URL="https://game-gate-api.onrender.com/api/v1/user";
// export const URL="http://localhost:2002";


export const config ={
    headers :{
        "Content-Type":"application/json",
    },
    withCredentials:false 

}



export const configWithToken = () => {
    let token = localStorage.getItem("accessToken");
    token = token ? token.replace(/^"|"$/g, "").trim() : null;
    console.log("MY TOKEN IS:", token);
  
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: false,
    };
  };
  