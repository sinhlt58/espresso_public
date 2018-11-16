/* global SelectorGenerator */
let clickedElement;

function copyToClipboard(text) {
    const input = document.createElement("input");
    input.style.position = "fixed";
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
}

function addClass(element, cls){
    let classes = (element.className || "").split(" ");
    if(!classes.includes(cls)){
        element.className = classes.concat([cls]).join(" ");
    }
}

function removeClass(element, cls){
    let classes = (element.className || "").split(" ");
    if(classes.includes(cls)){
        element.className = classes.filter(_=>_ !== cls).join(" ");
    }
}

function highlight(element){
    if(!element){
        return;
    }
    const higlightClass = "__copy-css-selector-highlighted";
    addClass(element,higlightClass);
    setTimeout(() => {
        removeClass(element,higlightClass);
    },2000);
}

document.addEventListener("mousedown", (event) => {
    clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener((request) => {
    if(request && request.target === "copy"){
        let selectorGenerator = new SelectorGenerator({querySelectorAll:window.document.querySelectorAll.bind(window.document)});
        let selector = selectorGenerator.getSelector(clickedElement);
        highlight(clickedElement);
        copyToClipboard(selector);
        // sinh.luutruong added
        writeRuleToFile(selector, request['menuItemTitle'], request['currentUrl'])
        // sinh.luutruong end
    }
});

function writeRuleToFile(rule, menuItemTitle, currentUrl) {
    const menuItemTitleTokens = menuItemTitle.split('@');
    const ruleData = {
        domain: menuItemTitleTokens[0],
        field: menuItemTitleTokens[1],
        host: getLocation(currentUrl).hostname,
        rule: rule
    };
    postData(`http://localhost:1111/api/v1/domains`, ruleData)
        .then(res => console.log(res))
        .catch(error => console.log(error));
}

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response); // already a json object
}

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};