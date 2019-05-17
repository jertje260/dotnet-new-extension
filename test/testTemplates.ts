export const consoleTemplate = 
`Usage: new [options]

Options:
  -h, --help          Displays help for this command.
  -l, --list          Lists templates containing the specified name. If no name is specified, lists all templates.
  -n, --name          The name for the output being created. If no name is specified, the name of the current directory is used.
  -o, --output        Location to place the generated output.
  -i, --install       Installs a source or a template pack.
  -u, --uninstall     Uninstalls a source or a template pack.
  --nuget-source      Specifies a NuGet source to use during install.
  --type              Filters templates based on available types. Predefined values are "project", "item" or "other".
  --dry-run           Displays a summary of what would happen if the given command line were run if it would result in a template creation.
  --force             Forces content to be generated even if it would change existing files.
  -lang, --language   Filters templates based on language and specifies the language of the template to create.


Console Application (C#)
Author: Microsoft
Description: A project for creating a command-line application that can run on .NET Core on Windows, Linux and macOS
Options:                                                                            
  --langVersion  Sets langVersion in the created project file                       
                 text - Optional                                                    

  --no-restore   If specified, skips the automatic restore of the project on create.
                 bool - Optional                                                    
                 Default: false / (*) true                                          


* Indicates the value used if the switch is provided without a value.
`.replace(/\n/g, "\r\n");

export const angularTemplate =
`Usage: new [options]

Options:
  -h, --help          Displays help for this command.
  -l, --list          Lists templates containing the specified name. If no name is specified, lists all templates.
  -n, --name          The name for the output being created. If no name is specified, the name of the current directory is used.
  -o, --output        Location to place the generated output.
  -i, --install       Installs a source or a template pack.
  -u, --uninstall     Uninstalls a source or a template pack.
  --nuget-source      Specifies a NuGet source to use during install.
  --type              Filters templates based on available types. Predefined values are "project", "item" or "other".
  --dry-run           Displays a summary of what would happen if the given command line were run if it would result in a template creation.
  --force             Forces content to be generated even if it would change existing files.
  -lang, --language   Filters templates based on language and specifies the language of the template to create.


ASP.NET Core with Angular (C#)
Author: Microsoft
Options:                                                                            
  --exclude-launch-settings  Whether to exclude launchSettings.json from the generated template.
                             bool - Optional
                             Default: false / (*) true

  --no-restore               If specified, skips the automatic restore of the project on create.
                             bool - Optional
                             Default: false / (*) true

  --no-https                 Whether to turn off HTTPS. This option only applies if IndividualAuth or OrganizationalAuth are not being used.
                             bool - Optional
                             Default: false / (*) true


* Indicates the value used if the switch is provided without a value.
`.replace(/\n/g, "\r\n");

export const solutionTemplate = 
`Usage: new [options]

Options:
  -h, --help          Displays help for this command.
  -l, --list          Lists templates containing the specified name. If no name is specified, lists all templates.
  -n, --name          The name for the output being created. If no name is specified, the name of the current directory is used.
  -o, --output        Location to place the generated output.
  -i, --install       Installs a source or a template pack.
  -u, --uninstall     Uninstalls a source or a template pack.
  --nuget-source      Specifies a NuGet source to use during install.
  --type              Filters templates based on available types. Predefined values are "project", "item" or "other".
  --dry-run           Displays a summary of what would happen if the given command line were run if it would result in a template creation.
  --force             Forces content to be generated even if it would change existing files.
  -lang, --language   Filters templates based on language and specifies the language of the template to create.


Solution File
Author: Microsoft
Description: Create an empty solution containing no projects
    (No Parameters)

`.replace(/\n/g, "\r\n");

export const mvcTemplate = 
`ASP.NET Core Web App (Model-View-Controller) (C#)
Author: Microsoft
Description: A project template for creating an ASP.NET Core application with example ASP.NET Core MVC Views and Controllers. This template can also be used for RESTful HTTP services.
This template contains technologies from parties other than Microsoft, see https://aka.ms/aspnetcore-template-3pn-210 for details.
Options:
  -au|--auth                      The type of authentication to use
                                      None             - No authentication
                                      Individual       - Individual authentication
                                      IndividualB2C    - Individual authentication with Azure AD B2C
                                      SingleOrg        - Organizational authentication for a single tenant
                                      MultiOrg         - Organizational authentication for multiple tenants
                                      Windows          - Windows authentication
                                  Default: None

  --aad-b2c-instance              The Azure Active Directory B2C instance to connect to (use with IndividualB2C auth).
                                  string - Optional
                                  Default: https://login.microsoftonline.com/tfp/

  -ssp|--susi-policy-id           The sign-in and sign-up policy ID for this project (use with IndividualB2C auth).
                                  string - Optional

  -rp|--reset-password-policy-id  The reset password policy ID for this project (use with IndividualB2C auth).
                                  string - Optional

  -ep|--edit-profile-policy-id    The edit profile policy ID for this project (use with IndividualB2C auth).
                                  string - Optional

  --aad-instance                  The Azure Active Directory instance to connect to (use with SingleOrg or MultiOrg auth).
                                  string - Optional
                                  Default: https://login.microsoftonline.com/

  --client-id                     The Client ID for this project (use with IndividualB2C, SingleOrg or MultiOrg auth).
                                  string - Optional
                                  Default: 11111111-1111-1111-11111111111111111

  --domain                        The domain for the directory tenant (use with SingleOrg or IndividualB2C auth).
                                  string - Optional
                                  Default: qualified.domain.name

  --tenant-id                     The TenantId ID of the directory to connect to (use with SingleOrg auth).
                                  string - Optional
                                  Default: 22222222-2222-2222-2222-222222222222

  --callback-path                 The request path within the application's base path of the redirect URI (use with SingleOrg or IndividualB2C auth).
                                  string - Optional
                                  Default: /signin-oidc

  -r|--org-read-access            Whether or not to allow this application read access to the directory (only applies to SingleOrg or MultiOrg auth).
                                  bool - Optional
                                  Default: false / (*) true

  --exclude-launch-settings       Whether to exclude launchSettings.json from the generated template.
                                  bool - Optional
                                  Default: false / (*) true

  --no-https                      Whether to turn off HTTPS. This option only applies if IndividualAuth or OrganizationalAuth are not being used.
                                  bool - Optional
                                  Default: false / (*) true

  -uld|--use-local-db             Whether to use LocalDB instead of SQLite. This option only applies if --auth Individual or --auth IndividualB2C is specified.
                                  bool - Optional
                                  Default: false / (*) true

  --no-restore                    If specified, skips the automatic restore of the project on create.
                                  bool - Optional
                                  Default: false / (*) true


* Indicates the value used if the switch is provided without a value.
`.replace(/\n/g, "\r\n");