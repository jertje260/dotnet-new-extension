import * as assert from 'assert';
import * as handler from '../outputHandling';
import { Template } from '../template';
import * as testTemplates from './testTemplates';


let template: Template;
// Defines a Mocha test suite to group tests of similar kind together
suite("when parsing template output", function () {
    beforeEach(() => {
        template = new Template("testTemplate", "test", [], "", []);
    })

    test("given console template should have author 'Microsoft'", function () {
        handleTemplate(testTemplates.consoleTemplate)

        assert.equal("Microsoft", template.author);
    });

    test("given console template should have description 'A project for creating a command-line application that can run on .NET Core on Windows, Linux and macOS'", function () {
        handleTemplate(testTemplates.consoleTemplate)

        assert.equal("A project for creating a command-line application that can run on .NET Core on Windows, Linux and macOS",
            template.description);
    });

    test("given console template should have two options", function () {
        handleTemplate(testTemplates.consoleTemplate)

        assert.equal(2, template.options.length);
    });
});

function handleTemplate(input: string) {
    handler.handleDotnetTemplateOutput(template, input);
}