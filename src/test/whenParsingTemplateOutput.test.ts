import * as assert from 'assert';
import * as handler from '../outputHandling';
import { Template } from '../template';
import * as testTemplates from './testTemplates';


let template: Template;
// Defines a Mocha test suite to group tests of similar kind together
suite("when parsing template output", function () {
    beforeEach(()=>{
        template = new Template("testTemplate", "test", [], "", []);
    })

    test("given console template should have author 'Microsoft'", function() {
        handleTemplate(testTemplates.consoleTemplate)

        assert("Microsoft", template.author);
    });

    test("given console template should have description 'A project for creating a command-line application that can run on .NET Core on Windows, Linux and macOS'", function() {
        handleTemplate(testTemplates.consoleTemplate)

        assert("A project for creating a command-line application that can run on .NET Core on Windows, Linux and macOS", 
            template.description);
    });
});

function handleTemplate(input: string){
    handler.handleDotnetTemplateOutput(template, input);
}