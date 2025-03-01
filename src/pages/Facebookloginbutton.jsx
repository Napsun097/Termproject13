import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookLoginButton = ({ onSuccess, onFailure }) => {
  const responseFacebook = (response) => {
    if (response.accessToken) {
      onSuccess(response);
    } else {
      onFailure("Facebook login failed");
    }
  };

  return (
    <FacebookLogin
      appId="YOUR_FACEBOOK_APP_ID" // Replace with your App ID
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
      textButton="Login with Facebook"
    />
  );
};

export default FacebookLoginButton;