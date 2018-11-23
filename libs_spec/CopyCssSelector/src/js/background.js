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
const systemMenus = [
    {
        id: 'add_to_url_rules',
        title: 'add_to_url_rules (fast.urlfilter.json)'
    },
    {
        id: 'remove_from_url_rules',
        title: 'remove_from_url_rules (fast.urlfilter.json)'
    },
    {
        id: 'add_to_js_rules',
        title: 'add_to_js_rules (filtered-js-url-file.json)'
    },
    {
        id: 'remove_from_js_rules',
        title: 'remove_from_js_rules (filtered-js-url-file.json)'
    },
    {
        id: 'add_url_to_es',
        title: 'add_url_to_es'
    },
    {
        id: 'add_url_to_seeds',
        title: 'add_url_to_seeds'
    },
    {
        id: 'remove_url_from_es',
        title: 'remove_url_from_es'
    },
    {
        id: 'remove_urls_by_host_from_es',
        title: 'remove_urls_by_host_from_es'
    },
    {
        id: 'remove_record_from_es',
        title: 'remove_record_from_es'
    },
    {
        id: 'remove_records_by_host_from_es',
        title: 'remove_records_by_host_from_es'
    },
    {
        id: 'remove_url_from_seeds',
        title: 'remove_url_from_seeds'
    }
]

fetch(domainsDataUrl)
    .then(res => res.json())
    .then(json => createContextMenus(json));

function createContextMenus(domainsData) {
    systemMenus.forEach(d => {
        createContextMenu(d.id, d.title);
    })
    
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
