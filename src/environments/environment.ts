export const environment = {
  production: false,
  clientID: "<clientID>", // In place of <clientID> replace your Copied Application ID from Azure AD.
  authority: "https://login.microsoftonline.com/<tenantID>/", // In place of <tenantID> replace your Directory(tenant) ID Copied from Azure AD
  graphAPIUrl: "https://graph.microsoft.com/v1.0/me", //Graph API endpoint to access user data
  graphAPIScopes: ["user.read"], // Access scope for graph API
  webAPIUrl: "https://localhost:44396/api/values", // Web API Url
  webAPIScopes: [
    "api://<webAPI-ApplicationID>/user_impersonation" // Access scope for web API
  ]
};
