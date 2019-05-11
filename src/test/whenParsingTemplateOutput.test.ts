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

        assert.equal(2, template.options.length);
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

        assert.equal(3, template.options.length);
    });

    test("given solution template should have author 'Microsoft'", function () {
        const template = handleTemplate(testTemplates.solutionTemplate);

        assert.equal("Microsoft", template.author);
    });

    test("given solution template should have description 'Create an empty solution containing no projects'", function () {
        const template = handleTemplate(testTemplates.solutionTemplate);

        assert.equal("Create an empty solution containing no projects", template.description);
    });

    test("given solution template should have no options", function () {
        const template = handleTemplate(testTemplates.solutionTemplate);

        assert.equal(0, template.options.length);
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

        assert.equal(15, template.options.length);
    });

    test("given mvc template should have first option select", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("select", template.options[0].type);
    });

    test("given mvc template should have second option string", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("string", template.options[1].type);
    });

    test("given mvc template should have last option bool", function () {
        const template = handleTemplate(testTemplates.mvcTemplate);

        assert.equal("bool", template.options[14].type);
    });
});

function handleTemplate(input: string) {
    let template = new Template("testTemplate", "test", [], "", []);
    return handler.handleDotnetTemplateOutput(template, input);
}