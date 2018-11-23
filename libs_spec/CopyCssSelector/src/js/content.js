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
        if (selector && selector.length > 0) {
            // sinh.luutruong added
            handleDomain(selector, request['menuItemTitle'], request['currentUrl'])
            // sinh.luutruong end
        }
    }
});

// sinh.luutruong added
const prefixUrl = 'http://localhost:1111/api/v1';

function handleDomain(rule, menuItemTitle, currentUrl) {
    const hostname  = getLocation(currentUrl).hostname;
    
    if (menuItemTitle.includes('@')){
        writeRuleToFile(rule, menuItemTitle, currentUrl);
    }

    if (menuItemTitle.includes('add_to_url_rules')) {
        addHostnameUrlRule(hostname);
    }

    if (menuItemTitle.includes('remove_from_url_rules')) {
        removeHostnameUrlRule(hostname);
    }

    if (menuItemTitle.includes('add_to_js_rules')) {
        addHostnameJsRule(hostname);
    }

    if (menuItemTitle.includes('remove_from_js_rules')) {
        removeHostnameJsRule(hostname);        
    }

    if (menuItemTitle.includes('add_url_to_es')) {
        addUrlToEs(currentUrl, hostname);
    }

    if (menuItemTitle.includes('remove_url_from_es')) {
        removeUrlFromEs(currentUrl);
    }

    if (menuItemTitle.includes('remove_urls_by_host_from_es')) {
        removeUrlsByHostFromEs(hostname);
    }

    if (menuItemTitle.includes('remove_record_from_es')) {
        removeRecordFromEs(currentUrl);
    }

    if (menuItemTitle.includes('remove_records_by_host_from_es')) {
        removeRecordsByHostFromEs(hostname);
    }

    if (menuItemTitle.includes('add_url_to_seeds')) {
        addUrlToSeeds(currentUrl, hostname);
    }

    if (menuItemTitle.includes('remove_url_from_seeds')) {
        removeUrlFromSeeds(currentUrl);
    }
}

function writeRuleToFile(rule, menuItemTitle, currentUrl) {
    const menuItemTitleTokens = menuItemTitle.split('@');
    const domain = menuItemTitleTokens[0];
    const field = menuItemTitleTokens[1];
    const host  = getLocation(currentUrl).hostname
    const ruleData = {
        domain: domain,
        field: field,
        host: host,
        rule: rule
    };
    postData(`${prefixUrl}/domains`, ruleData)
        .then(_ => {
            const ruleInnerText = document.querySelector(rule).innerText;
            console.log(`domain: ${domain}\nfield: ${field}\nhost: ${host}\nrule: ${rule}\nruleInnerText: ${ruleInnerText}`);
        })
        .catch(error => console.log(error));
}

function addHostnameUrlRule(hostname) {
    postData(`${prefixUrl}/urlrules`, {hostname: hostname})
    .then(_ => {
        console.log(`Added default url rules for ${hostname}`);
    })
    .catch(error => console.log(error));
}

function removeHostnameUrlRule(hostname) {
    deleteData(`${prefixUrl}/urlrules/${hostname}`)
    .then(_ => {
        console.log(`Removed url rules for ${hostname}`);
    })
    .catch(error => console.log(error));
}

function addHostnameJsRule(hostname) {
    postData(`${prefixUrl}/jsrules`, {hostname: hostname})
    .then(_ => {
        console.log(`Added default js rules for ${hostname}`);
    })
    .catch(error => console.log(error));
}

function removeHostnameJsRule(hostname) {
    deleteData(`${prefixUrl}/jsrules/${hostname}`)
    .then(_ => {
        console.log(`Removed js rules for ${hostname}`);
    })
    .catch(error => console.log(error));
}

function addUrlToEs(url, hostname) {
    const data = {
        url: url,
        hostname: hostname
    }

    postData(`${prefixUrl}/es/status`, data)
    .then(_ => {
        console.log(`Added ${url} to es status`);
    })
    .catch(error => console.log(error));
}

function removeUrlFromEs(url) {
    const encodedUrl = encodeURIComponent(url);

    deleteData(`${prefixUrl}/es/status/${encodedUrl}`)
    .then(_ => {
        console.log(`Removed ${url} from es status`);
    })
    .catch(error => console.log(error));
}
 
function removeUrlsByHostFromEs(hostname) {
    deleteData(`${prefixUrl}/es/status_byhost/${hostname}`)
    .then(_ => {
        console.log(`Removed urls by host ${hostname} from es status`);
    })
    .catch(error => console.log(error));
}

function removeRecordFromEs(url) {
    const encodedUrl = encodeURIComponent(url);

    deleteData(`${prefixUrl}/es/index/${encodedUrl}`)
    .then(_ => {
        console.log(`Removed ${url} from es index`);
    })
    .catch(error => console.log(error));
}

function removeRecordsByHostFromEs(hostname) {
    deleteData(`${prefixUrl}/es/index_byhost/${hostname}`)
    .then(_ => {
        console.log(`Removed records by host ${hostname} from es index`);
    })
    .catch(error => console.log(error));
}

function addUrlToSeeds(url, hostname) {
    const data = {
        url: url,
        hostname: hostname
    }

    postData(`${prefixUrl}/seeds`, data)
    .then(_ => {
        console.log(`Added ${url} to seeds`);
    })
    .catch(error => console.log(error));
}

function removeUrlFromSeeds(url) {
    const encodedUrl = encodeURIComponent(url);

    deleteData(`${prefixUrl}/seeds/${encodedUrl}`)
    .then(_ => {
        console.log(`Removed ${url} from seeds`);
    })
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

function deleteData(url) {
    return fetch(url,{
        method: "DELETE",
    })
    .then(response => response);
}

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};
// sinh.luutruong end