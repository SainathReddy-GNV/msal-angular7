# Calling Graph API and Web API in Angular 7 Application ([@azure/msal]([https://www.npmjs.com/package/@azure/msal](https://www.npmjs.com/package/@azure/msal)))

## How to run this sample

To run this sample, you'll need:
- [Visual Studio Code](https://code.visualstudio.com/)
- An Azure Active Directory (Azure AD) tenant. For more information on how to get an Azure   AD tenant, refer [Azure Docs](https://docs.microsoft.com/en-gb/azure/active-directory/)

### Step 1: Clone or download this repository
From your shell or command line:
```
git clone https://github.com/SainathReddy-GNV/msal-angular7.git
```
or download and extract the repository .zip file.

### Step 2: Register the Angular APP with your Azure Active Directory tenant
1.  Sign in to the  [Azure portal](https://portal.azure.com/)  using either a work or school account or a personal Microsoft account.
2.  If your account is present in more than one Azure AD tenant, select  `Directory + Subscription`  at the top right corner in the menu on top of the page, and switch your portal session to the desired Azure AD tenant.
3.  In the left-hand navigation pane, select the  **Azure Active Directory**  service, and then select  **App registrations**.

**Register the Angular APP (ng-client-app)**
1. In **App registrations** page, select New registration
2.  When the  **Register an application page**  appears, enter your application's registration information:
    
    -   In the  **Name**  section, enter a meaningful application name that will be displayed to users of the app, for example  `ng-client-app`.
    -   In the  **Supported account types**  section, select  **Accounts in this organizational directory only (Default Directory)**.
    -   In the Redirect URI (optional) section, select  **Web**  in the combo-box and enter the following redirect URIs.
        -   `http://localhost:4200/`
    
    > Note that if there are more than one redirect URIs, you'd need to add them from the  **Authentication**  tab later after the app has been created succesfully.
    
3.  Select  **Register**  to create the application.
    
4.  On the app  **Overview**  page, find the  **Application (client) ID** and **Directory(tenant) ID**  values and record it for later. You'll need it to configure the Angular Projects environment file.
    
5.  In the list of pages for the app, select  **Authentication**.
    
    -   In the  **Advanced settings**  section set  **Logout URL**  to  `http://localhost:4200`
    -   In the  **Advanced settings**  |  **Implicit grant**  section, check  **Access tokens**  and  **ID tokens**  as this sample requires the  [Implicit grant flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) to be enabled to sign-in the user, and call an API.
6.  Select  **Save**.
    
7.  From the  **Certificates & secrets**  page, in the  **Client secrets**  section, choose  **New client secret**:
    
    -   Type a key description (of instance  `app secret`),
    -   Select a key duration of either  **In 1 year**,  **In 2 years**, or  **Never Expires**.
    -   When you press the  **Add**  button, the key value will be displayed, copy, and save the value in a safe location.
    -   You'll need this key later to configure the project in Visual Studio. This key value will not be displayed again, nor retrievable by any other means, so record it as soon as it is visible from the Azure portal.
8.  In the list of pages for the app, select  **API permissions**
    
    -   Click the  **Add a permission**  button and then,
    -   Ensure that the  **My APIs**  tab is selected
    -   Select the API that you registered for your Web API, for example `WebAPI-OAuth2`(If you do not find your registered Web API, Check if you exposed your API. To expose an API check `Register the Web API(webapi-oauth2)` in [webapi-aad2.0](https://github.com/SainathReddy-GNV/webapi-aad2.0) repository )
    -   In the  **Delegated permissions**  section, ensure that the right permissions are checked:  **user_impersonation**. 
    -   Select the  **Add permissions**  button.
    -  On the app  **Add a permission**  page, click on the  **user_impersonation** under `WebAPI-OAuth2` and copy the `Application ID URI` at the top and record it for later. You'll need it to configure the Angular Projects environment file.

### Step 3: Configure the Angular APP to use your Azure AD tenant

Open the code in Visual Studio Code  to configure the project.

#### Configure the Environment File

1.  Open the  `msal-angular7/src/environments/environments.ts`  file
2.  Find the property  `clientID`  and replace the existing value with the Application ID of the  `ng-client-app`  application copied from the Azure portal.
3.  Find the property  `authority`  and replace the tenantID value with the Directory ID of the `ng-client-app`  application copied from the Azure portal.
4.  Find the property `webAPIScopes` and replace the existing  value with the `Application ID URI`.

### Step 4: Run the Application

Run `ng serve --open` for a dev server. App starts in `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### To Protect the Web API with Microsoft Identity Platform 
check [webapi-aad2.0](https://github.com/SainathReddy-GNV/webapi-aad2.0) repository






