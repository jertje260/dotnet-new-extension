import * as assert from 'assert';
import * as handler from '../src/outputHandling';
import { Template } from '../src/template';
import * as testTemplates from './testTemplates';

// Defines a Mocha test suite to group tests of similar kind together
suite("when parsing template output", function () {
    test("given template list short output should generate 21 templates", () => {
        const templates = handler.handleDotnetListOutput(testTemplates.TemplateOutputShort);

        assert.equal(templates.length, 21);
    })

    test("given template list long output should generate 21 templates", () => {
        const templates = handler.handleDotnetListOutput(testTemplates.TemplateOutputShort);

        assert.equal(templates.length, 21);
    })
});
