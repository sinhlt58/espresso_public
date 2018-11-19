// sinh.luutruong changed
let onCopy = function (info, tab) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        chrome.tabs.sendMessage(tab.id, {target: "copy",
                                     currentUrl: url,
                                     menuItemTitle: info.menuItemId});
    });
};
// sinh.luutruong end

// sinh.luutruong add
const domainsDataUrl = 'http://localhost:1111/api/v1/domains';

fetch(domainsDataUrl)
    .then(res => res.json())
    .then(json => createContextMenus(json));

function createContextMenus(domainsData) {
    domainsData.forEach(domainData => {
        let domainName = domainData['name'];
        createContextMenu(domainName, domainName);
        domainData['fields'].forEach(field => {
            const id_title = `${domainName}@${field}`;
            createContextMenu(id_title, id_title, domainName);
        })
    });
}

function createContextMenu(id, title, parentId=null) {
    options = {
        id: id,
        title: title,
        contexts: ["all"],
        "onclick": onCopy
    }
    
    if (parentId) {
        options['parentId'] = parentId
    }

    chrome.contextMenus.create(options);   
}

// sinh.luutruong end

chrome.runtime.onInstalled.addListener((details)=>{
    if(["install", "update"].some((reason)=>details.reason === reason)){
        setTimeout(()=>{
            injectScriptsInAllTabs();
        },5000);
    }
});

function injectScriptsInAllTabs(){
    console.log("reinject content scripts into all tabs");
    var manifest = chrome.runtime.getManifest();
    var scripts = manifest.content_scripts.reduce((sc, cur)=>sc.concat(cur.js || []), []);
    var styles = manifest.content_scripts.reduce((sc, cur)=>sc.concat(cur.css || []), []);
    chrome.tabs.query({url:"*://*/*"}, (tabs)=>{
        var filtered = tabs.filter(_=>_.url.indexOf("https://chrome.google.com/webstore/detail") !== 0);
        filtered.forEach(tab=>{
            scripts.map((sc)=>chrome.tabs.executeScript(tab.id, {file: sc, allFrames: true}));
        });
        filtered.forEach(tab=>{
            styles.map((sc)=>chrome.tabs.insertCSS(tab.id, {file: sc, allFrames: true}));
        });
    });
}
