# Change Log

## 1.0.0

- Initial release of `dotnet-new-extension`.

## 1.0.1

- Fixed issue where the html wasn't packaged properly, now it does work.

## 1.0.2

- Created styling for the webview based on settings of your current theme.

## 1.0.3

- Fixed issue where parsing of the templates didn't work with different length then the default.

## 1.1.0

- Added UI element to select the folder for output, instead of selecting it the moment that you hit `create`/`dry run`
- Added the option to create template by right clicking folder

## 1.1.1

- Some templates commonly have parameter of type `string`, where that should be `text`. These will now also be showed in template creation as text.