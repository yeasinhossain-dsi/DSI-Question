const OpenID = {
  authority: "https://accounts.google.com", // For Google
  client_id:
    "346268671670-ki02tj3iqojp1v42866mnlf2g5d3cg8p.apps.googleusercontent.com",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile email",
  post_logout_redirect_uri: "http://localhost:3000",
};

export default OpenID;
