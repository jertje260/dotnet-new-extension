import * as assert from 'assert';
import { Template } from '../template';
import * as handler from '../outputHandling';
import * as commands from '../commands';
import { TestTemplateManager } from './TestTemplateManager';

const templateManager = new TestTemplateManager();

suite("when parsing template output", async function() {

    test("when loading console template", async function() {
        this.timeout(5000);
        return handleTemplate("console")
        .then((template) => {
            assert.equal("A project for creating a command-line application that can run on .NET Core on Windows, Linux and macOS",
            template.description);
            assert.equal(2, template.options.length);
        })
        .catch((err) => {
            assert.fail(err);
        });
    });

});

function handleTemplate(shortName: string) {
    let template = new Template("testTemplate", shortName, [], "", []);
    templateManager.setTemplates([template]);
    return templateManager.loadTemplateInfo(shortName);
}