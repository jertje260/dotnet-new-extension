(function() {
    console.debug("started main");
    const vscode = acquireVsCodeApi();

    function init() {
        initMessageHandling();
        initEventHandling();
        fetchTemplates();
    }

    function initMessageHandling() {
        window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent
            console.log(message);
            switch (message.command) {
                case 'templates':
                    {
                        console.info('loading templates');
                        loadTemplates(message.data);
                        break;
                    }
                case 'template':
                    {
                        console.info('load template');
                        loadTemplate(message.data);
                        break;
                    }
                case 'output':
                    {
                        console.info('received output');
                        showOutput(message.data);
                        break;
                    }
            }
        });
    }

    function initEventHandling() {
        document.getElementById("template-body").addEventListener("click", (evt) => {
            if (evt.target.parentElement.localName === "tr") {
                fetchTemplate(evt.target.parentElement.id);
            }
        });

        document.getElementById("back-to-templates").addEventListener("click", (evt) => {
            // hide template, show templates
            hideOutput();
            showTemplatesBlock();
        });

        document.getElementById("dry-run").addEventListener("click", executeDryRun);

        document.getElementById("create").addEventListener("click", executeCreation);

        document.addEventListener("click", closeAllSelect);
    }

    function fetchTemplates() {
        vscode.postMessage({
            command: 'loadTemplates',
            data: {}
        });
    }

    function executeTemplateCreation(parameters) {
        const template = document.getElementById("template-name").innerHTML;
        console.log(template);
        vscode.postMessage({
            command: 'executeCreation',
            data: {
                template: template,
                parameters: parameters
            }
        });
    }

    function showTemplateBlock() {
        document.getElementById("templates").style.display = "none";
        document.getElementById("template").style.display = "block"
    }

    function showTemplatesBlock() {
        document.getElementById("template").style.display = "none";
        document.getElementById("templates").style.display = "block"
    }

    function fetchTemplate(shortName) {
        showTemplateBlock();
        document.getElementById('loading-template').style.display = "block";
        document.getElementById('template-item').style.display = "none";
        vscode.postMessage({
            command: 'loadTemplate',
            data: shortName
        });
    }

    function loadTemplates(templates) {
        const tbody = document.getElementById("template-body");
        let template = "";
        for (let i = 0; i < templates.length; i++) {
            const t = templates[i];
            template += `<tr class="template" id="${t.shortName}"><td>${t.templateName}</td><td>${t.tags.join(' ')}</td></tr>`;
        }
        tbody.innerHTML = template;
        document.getElementById("loading").style.display = "none";
        document.getElementById("templates").style.display = "block";
    }

    function hideOutput() {
        document.getElementById("output").style.display = "none";
    }

    function showOutput(output) {
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = output.replace('\n', '<br/>');
        outputDiv.style.display = "block";
    }

    function loadTemplate(template) {
        const itemTemplate = document.getElementById('template-item');

        let html = `
    <div id="template-name" style="display:none;">${template.shortName}</div>
    <table>
        <tr>
            <td>
                Name:
            </td>
            <td>
                ${template.templateName}
            </td>
        </tr>
        <tr>
            <td>
                Description:
            </td>
            <td>
                ${template.description}
            </td>
        </tr>
    </table>`;

        html += generateForm(template);

        itemTemplate.innerHTML = html;

        createDropdowns();

        document.getElementById('loading-template').style.display = "none";
        itemTemplate.style.display = "block";
    }

    function generateForm(template) {
        let form = `<form id="template-form">`;

        const optionKeys = Object.keys(template.options);
        optionKeys.forEach((key) => {
            const templateOption = template.options[key];
            form += "<div>";
            form += generateInput(templateOption);
            form += "</div>";
        });

        form += "</form>";

        return form;
    }

    function generateInput(templateOption) {
        switch (templateOption.type) {
            case "text":
                {
                    return `<div class="input-container">
            <label for="template-form-${templateOption.parameter}">${templateOption.description}</label>
            <input type="text" id="template-form-${templateOption.parameter}" name="${templateOption.parameter}"/></div>`;
                }
            case "select":
                {
                    let select = `<div class="input-container">
            <label for="template-form-${templateOption.parameter}">${templateOption.description}</label>
            <div class="select">
            <select id="template-form-${templateOption.parameter}" name="${templateOption.parameter}">`;
                    templateOption.selectOptions.forEach((opt) => {
                        select += `<option value="${opt.key}" ${opt.key === templateOption.defaultValue ? "selected" : ""}>${opt.description} (--${opt.key})</option>`
                    });
                    select += `</select></div></div>`;
                    return select;
                }
            case "bool":
                {
                    return `<div class="input-container">
            <label for="template-form-${templateOption.parameter}">${templateOption.description}</label>
            <input type="checkbox" style="display: inline;" id="template-form-${templateOption.parameter}" name="${templateOption.parameter}" ${templateOption.defaultValue === "true" ? "checked" : ""}/><div style="display: inline;">${templateOption.parameter.replace('-', ' ')}</div></div>`;
                }
            default:
                {
                    console.log(`input type ${templateOption.type} was not handled`);
                    return "";
                }
        }
    }

    function executeCreation() {
        const params = generateParameters();
        executeTemplateCreation(params);
    }

    function executeDryRun() {
        const params = generateParameters(true);
        executeTemplateCreation(params);
    }

    function generateParameters(dryRun) {
        const params = {};
        if (dryRun) {
            params["dry-run"] = "";
        }

        const inputElements = document.getElementsByTagName("input");
        console.log(inputElements);
        for (let i = 0; i < inputElements.length; i++) {
            createParamForInput(params, inputElements[i]);
        }

        const selectElements = document.getElementsByTagName("select");
        for (let i = 0; i < selectElements.length; i++) {
            createParamForInput(params, selectElements[i]);
        }
        return params
    }

    function createParamForInput(params, element) {
        const parameter = element.name;
        if (element.type === "checkbox") {
            if (element.name === "force") {
                if (element.checked) {
                    params[parameter] = "";
                }
            } else {
                params[parameter] = element.checked ? "true" : "false";
            }
        } else if (element.type === "text") {
            if (element.value !== "") {
                params[parameter] = element.value;
            }
        } else if (element.type === "select-one") {
            params[parameter] = element.value;
        }
    }

    // #region Dropdowns, taken from "https://www.w3schools.com/howto/howto_custom_select.asp"

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var selectItems, selected, i, arrNo = [];
        selectItems = document.getElementsByClassName("select-items");
        selected = document.getElementsByClassName("select-selected");
        for (i = 0; i < selected.length; i++) {
            if (elmnt == selected[i]) {
                arrNo.push(i)
            } else {
                selected[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < selectItems.length; i++) {
            if (arrNo.indexOf(i)) {
                selectItems[i].classList.add("select-hide");
            }
        }
    }

    function createDropdowns() {
        var selectElements, i, j, selectElement, newSelectDiv, optionsDiv, clickHandlerDiv;
        /* Look for any elements with the class "select": */
        selectElements = document.getElementsByClassName("select");
        for (i = 0; i < selectElements.length; i++) {
            selectElement = selectElements[i].getElementsByTagName("select")[0];
            /* For each element, create a new DIV that will act as the selected item: */
            newSelectDiv = document.createElement("DIV");
            newSelectDiv.setAttribute("class", "select-selected");
            newSelectDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
            selectElements[i].appendChild(newSelectDiv);
            /* For each element, create a new DIV that will contain the option list: */
            optionsDiv = document.createElement("DIV");
            optionsDiv.setAttribute("class", "select-items select-hide");
            for (j = 0; j < selectElement.length; j++) {
                /* For each option in the original select element,
                create a new DIV that will act as an option item: */
                clickHandlerDiv = document.createElement("DIV");
                clickHandlerDiv.innerHTML = selectElement.options[j].innerHTML;
                clickHandlerDiv.addEventListener("click", function(e) {
                    /* When an item is clicked, update the original select box,
                    and the selected item: */
                    var y, i, k, s, h;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < s.length; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                    h.click();
                });
                optionsDiv.appendChild(clickHandlerDiv);
            }
            selectElements[i].appendChild(optionsDiv);
            newSelectDiv.addEventListener("click", function(e) {
                /* When the select box is clicked, close any other select boxes,
                and open/close the current select box: */
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }
    }
    //#endregion
    init();
})();