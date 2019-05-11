import { Template } from "./template";

export function getLoadingView() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading</title>
</head>
<body>
    <p>loading templates</p>
</body>
</html>`;
}

export function getTemplateView(templates: Template[]) {
    console.log(`received ${templates.length} templates`);
    let template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Loading</title>
    </head>
    <body>
        <table>
        <thead>
            <tr>
                <th>
                    Template Name
                </th>
                <th>
                    Template Tags
                </th>
            </tr>
            </thead>
            <tbody>`;
    templates.forEach(t => {
        template += `
    <tr class="template" id="${t.shortName}"><td>${t.templateName}</td><td>${t.tags.join(' ')}</td></tr>
    `;
    });
    template += `
            </tbody>
        </table>
    </body>
    <script>
        const vscode = acquireVsCodeApi();

        document.getElementsByClass("template")
            .addEventListener("click", (evt) => {
                console.log(evt);
                vscode.postMessage({
                    template: evt.target
                })
            });
    </script>
    </html>`;
    return template;
}

export function getLoadingFailedView(err: any) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Loading</title>
    </head>
    <body>
        <p>template loading failed</p>
        <p>${err}</p>
    </body>
    </html>`;
}