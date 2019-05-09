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
});

function handleTemplate(input: string) {
    let template = new Template("testTemplate", "test", [], "", []);
    return handler.handleDotnetTemplateOutput(template, input);
}