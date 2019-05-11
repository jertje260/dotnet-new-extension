import * as assert from 'assert';
import * as handler from '../outputHandling';
import { Template } from '../template';
import * as testTemplates from './testTemplates';

// Defines a Mocha test suite to group tests of similar kind together
suite("when parsing template output", function () {
    test("given console template should have author 'Microsoft'", function () {
        const template = handleTemplate(testTemplates.consoleTemplate);

        assert.equal("Microsoft", template.author);
    });

    test("given console template should have description 'A project for creating a command-line application that can run on .NET Core on Windows, Linux and macOS'", function () {
        const template = handleTemplate(testTemplates.consoleTemplate);

        assert.equal("A project for creating a command-line application that can run on .NET Core on Windows, Linux and macOS",
            template.description);
    });

    test("given console template should have two options", function () {
        const template = handleTemplate(testTemplates.consoleTemplate);

        assert.equal(5, Object.keys(template.options).length);
    });

    test("given angular template should have author 'Microsoft'", function () {
        const template = handleTemplate(testTemplates.angularTemplate);

        assert.equal("Microsoft", template.author);
    });

    test("given angular template should have description ''", function () {
        const template = handleTemplate(testTemplates.angularTemplate);

        assert.equal("", template.description);
    });

    test("given angular template should have three options", function () {
        const template = handleTemplate(testTemplates.angularTemplate);

        assert.equal(6, Object.keys(template.options).length);
    });

    test("given solution template should have author 'Microsoft'", function () {
        const template = handleTemplate(testTemplates.solutionTemplate);

        assert.equal("Microsoft", template.author);
    });

    test("given solution template should have description 'Create an empty solution containing no projects'", function () {
        const template = handleTemplate(testTemplates.solutionTemplate);

        assert.equal("Create an empty solution containing no projects", template.description);
    });

    test("given solution template should have only default options", function () {
        const template = handleTemplate(testTemplates.solutionTemplate);

        assert.equal(3, Object.keys(template.options).length);
    });

    test("given mvc template should have author 'Microsoft'", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("Microsoft", template.author);
    });

    test("given mvc template should have description 'A project template for creating an ASP.NET Core application with example ASP.NET Core MVC Views and Controllers. ...'", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal(`A project template for creating an ASP.NET Core application with example ASP.NET Core MVC Views and Controllers. This template can also be used for RESTful HTTP services. This template contains technologies from parties other than Microsoft, see https://aka.ms/aspnetcore-template-3pn-210 for details.`, template.description);
    });

    test("given mvc template should have 15 options", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal(18, Object.keys(template.options).length);
    });

    test("given mvc template should have 'auth' option select", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("select", template.options["auth"].type);
    });

    test("given mvc template should have 'auth' option with 6 options", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal(6, template.options["auth"].selectOptions.length);
    });

    test("given mvc template should have 'auth' option with first key 'None'", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("None", template.options["auth"].selectOptions[0].key);
    });

    test("given mvc template should have 'auth' option with first description 'No authentication'", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("No authentication", template.options["auth"].selectOptions[0].description);
    });

    test("given mvc template should have 'aad-b2c-instance' option string", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("string", template.options["aad-b2c-instance"].type);
    });

    test("given mvc template should have 'no-restore' option bool", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("bool", template.options["no-restore"].type);
    });
});

function handleTemplate(input: string) {
    let template = new Template("testTemplate", "test", [], "", []);
    return handler.handleDotnetTemplateOutput(template, input);
}