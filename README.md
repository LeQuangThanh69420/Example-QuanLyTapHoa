# task
## Database : SQL server(mssql)
> deo bit ns j, sql de vl
## Backend : .NET 7.0
* Extensions for Visual Studio Code:
  - [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
  - [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
  - [IntelliCode for C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscodeintellicode-csharp)
  - [C# Extensions](https://marketplace.visualstudio.com/items?itemName=kreativ-software.csharpextensions)
  - [NuGet Gallery](https://marketplace.visualstudio.com/items?itemName=patcx.vscode-nuget-gallery)
* Basic command:
  ```
  dotnet new webapi -n <name> //create dotnet webapi app
  dotnet add package <packagename>
  dotnet run
  dotnet watch run
  ```
* Framework used:
  - Microsoft.EntityFrameworkCore.Design
  - Microsoft.EntityFrameworkCore.SqlServer
  - CloudinaryDotNet
## Frontend: Nodejs
* Extensions for Visual Studio Code:
  - [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
  - [Angular Snippets (Version 16)](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
* Basic command:
  ```
  npm install -g @angular/cli
  npm install <module-name>
  npm install //reinstalls all modules that are listed on package.json file and dependencies
  npm update //updates all modules that are listed on package.json file and dependencies
  ng new <name> //create angular app
  ng serve //hosting angular app
  ng g m //generate module and declare to the module you are standing
  ng g c //generate component and declare to the module you are standing
  ng g m --skip-tests
  ng g c --skip-tests
  ```
* Framework used:
  - @angular/cli
  - ngx-spinner
  - ngx-toastr
  - ng2-file-upload
