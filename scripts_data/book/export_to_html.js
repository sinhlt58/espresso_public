
const fs = require('fs');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    requestTimeout: 1200000
});

const index_name = 'book_index';
const index_type = '_doc';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;


function searchBookByName(key) {
    return client.search({
        index: index_name,
        type: index_type,
        body: {
            "query": {
                "term": { "ten_sach.keyword": key }
            },
            // "from" : 0, "size" : 1000
        }
    })
}

function searchUnitByBookAndName(book, unit, isTheory) {

    let queryString;
    if (isTheory) {
        queryString = "lí lý +thuyết";
    } else {
        queryString = "-thuyết";
    }

    return client.search({
        index: index_name,
        type: index_type,
        body: {
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "sach.keyword": book
                            }
                        },
                        // {
                        //     "match_phrase_prefix": {
                        //         "sach": book
                        //     }
                        // },
                        {
                            "match_phrase_prefix": {
                                "tieu_de": unit
                            }
                        },
                        {
                            "query_string": {
                                "fields": ["tieu_de"],
                                "query": queryString
                            }
                        }
                    ]
                }
            },
            "from": 0, "size": 1000
        }
    })
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const max_lengt_unit = 54;
let book = "Toán lớp 12";
searchBookByName(book).then(async data => {
    let hits = data.hits.hits;
    let source = hits[0]._source;

    let list = JSON.parse(source.muc_luc_sach_json);

    let jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    let { window } = jsdom;
    let document = window.document;

    let menu = document.createElement("div");
    menu.appendChild(renderList(list, document, 1));

    let detailBook = document.createElement("div");
    let detailElement = await renderDetailBook(list, document, 1, source.ten_sach);
    detailBook.appendChild(detailElement);

    window.document.body.appendChild(menu)
    window.document.body.appendChild(detailBook)
    fs.writeFile(book.trim().replace(' ', '_') + '.html', jsdom.serialize(), err => {
        console.log('done: ' + book);
    });
})


function renderList(nodeElement, document, size) {

    let ulNode = document.createElement("ul");

    for (let i = 0; i < nodeElement.length; i++) {

        let liNode = document.createElement("li");
        let heading = document.createElement("h" + size);
        let text = document.createTextNode(nodeElement[i].name);
        let aNode = document.createElement("a");
        if (!nodeElement[i].children) aNode.setAttribute("href", '#' + nodeElement[i].name)
        aNode.appendChild(text);
        heading.appendChild(aNode)
        liNode.appendChild(heading);

        if (nodeElement[i].children) {
            liNode.appendChild(renderList(nodeElement[i].children, document, size + 1))
        }

        ulNode.appendChild(liNode);
    }
    return ulNode;
}

async function renderDetailBook(nodeElement, document, size, book) {

    let ulNode = document.createElement("ul");

    for (let i = 0; i < nodeElement.length; i++) {

        let liNode = document.createElement("li");

        let heading = document.createElement("h" + size);
        let text = document.createTextNode(nodeElement[i].name);
        let aNode = document.createElement("a");
        aNode.appendChild(text);
        aNode.setAttribute("style", "color: blue;")
        heading.appendChild(aNode);
        liNode.appendChild(heading);


        if (nodeElement[i].children) {

            let subList = await renderDetailBook(nodeElement[i].children, document, size + 1, book);
            liNode.appendChild(subList);

        } else {

            let detailUnit = document.createElement("ul");
            detailUnit.setAttribute("id", nodeElement[i].name);

            let theory = await getDetailUnit(true, document, book, nodeElement[i].name);
            if (theory) detailUnit.appendChild(theory);

            let exercise = await getDetailUnit(false, document, book, nodeElement[i].name);
            if (exercise) detailUnit.appendChild(exercise);

            if (theory || exercise) liNode.appendChild(detailUnit);

        }

        ulNode.appendChild(liNode);

    }

    return ulNode;
}

async function getDetailUnit(isTheory, document, book, unit) {

    let detail = document.createElement("li");

    let title;
    if (isTheory) {
        title = "Lý thuyết";
    } else {
        title = "Bài tập";
    }

    let headerDetail = document.createElement("h3").appendChild(document.createTextNode(title));
    detail.appendChild(headerDetail);

    // do tieu_de bij overflow thanh '...' va
    // can loai bo cac chu khong co nghia khi lay substring
    if (unit.length > max_lengt_unit){
        unit = unit.trim();
        unit = unit.substring(0, max_lengt_unit);
        let indexLastSpace = unit.lastIndexOf(' ');
        unit = unit.substring(0, indexLastSpace);
    }

    let detailData = await searchUnitByBookAndName(book, unit, isTheory);
    let detailHits = detailData.hits.hits;

    for (let index = 0; index < detailHits.length; index++) {

        let source = detailHits[index]._source;
        let section = document.createElement("section");

        let header = document.createElement("h4");
        let text = source.tieu_de.toString()
        let textHeader = document.createTextNode(text)
        header.appendChild(textHeader)
        header.setAttribute("style", "color: blue;")

        let subHeader = document.createElement("h4");
        let textSubHeader = document.createTextNode(source.tieu_de_con)
        subHeader.appendChild(textSubHeader)

        let detailSection = document.createElement("div");
        detailSection.innerHTML = source.ly_thuyet_or_bai_tap.replace('loigiaihay.com', '').replace('Loigiaihay.com', '');
        // detailSection.innerHTML = source.ly_thuyet_or_bai_tap;
        if(!isTheory){
            let anwserDetail = detailSection.querySelector("p .content_detail");
            if(anwserDetail) {
                let anwserDetailParent = anwserDetail.parentNode;
                let explain = document.createElement('div').appendChild(document.createTextNode("<explain>"));
                let br = document.createElement('br')
                anwserDetailParent.before(br)
                anwserDetailParent.before(explain)
            }
        }

        section.appendChild(header);
        section.appendChild(subHeader);
        section.appendChild(detailSection);
        detail.appendChild(section);

    }

    if (detailHits.length > 0) return detail;
    else return null;

}