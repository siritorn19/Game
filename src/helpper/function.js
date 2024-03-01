export const AddSession = (user) => {
    //console.log(user);
    //sessionStorage.setItem("accessToken", user.accessToken);
    sessionStorage.setItem("userId", user.userId);
    sessionStorage.setItem("userName", user.displayName);
    sessionStorage.setItem("pictureUrl", user.pictureUrl);
  
    /*sessionStorage.setItem(
      "accessTokenTime",
      moment().add(process.env.REACT_APP_SESSION_TIMEOUT_HOURS, "hours").valueOf()
    );*/
    return true;
  };
  
  export const RemoveSession = () => {
    //sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("pictureUrl");
    sessionStorage.removeItem("bigpointId");
    //sessionStorage.removeItem("accessTokenTime");
  };