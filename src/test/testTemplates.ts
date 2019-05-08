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