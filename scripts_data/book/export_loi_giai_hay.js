

const fs = require('fs');
const reqES = require('./queryElasticsearch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const DetailSection = require('./detailSection');

const book = "Ngữ văn 11";

reqES.searchBookByName(book).then(async data => {

    let hits = data.hits.hits;
    if (hits.length == 0) return;

    let jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    let document = jsdom.window.document;

    let source = hits[0]._source;

    let list = JSON.parse(source.muc_luc_sach_json);
    let detailElement = await renderDetailBook(list, document, 1, source.ten_sach);

    document.body.appendChild(detailElement);

    fs.writeFile(book.trim().replace(' ', '_') + '.html', jsdom.serialize(), err => {
        console.log('done: ' + book);
    });

})

async function renderDetailBook(list, document, size, book) {

    let ulNode = document.createElement("div");

    for (let i = 0; i < list.length; i++) {

        let liNode = document.createElement("div");

        let heading = document.createElement("h" + size);
        let text = document.createTextNode(list[i].name);
        let aNode = document.createElement("a");
        aNode.appendChild(text);
        aNode.setAttribute("style", "color: blue;")
        heading.appendChild(aNode);
        liNode.appendChild(heading);


        if (list[i].children) {

            let subList = await renderDetailBook(list[i].children, document, size + 1, book);
            liNode.appendChild(subList);

        } else {

            let detailUnit = document.createElement("div");

            let theory = await getDetailUnit(true, document, book, list[i].name, size + 1);
            if (theory) detailUnit.appendChild(theory);

            let exercise = await getDetailUnit(false, document, book, list[i].name, size + 1);
            if (exercise) detailUnit.appendChild(exercise);

            if (theory || exercise) liNode.appendChild(detailUnit);

        }

        ulNode.appendChild(liNode);

    }

    return ulNode;
}

async function getDetailUnit(isTheory, document, book, unit, size) {

    let detail = document.createElement("div");

    let title = "Bài tập";
    if (isTheory) {
        title = "Lý thuyết";
    }
    let headerDetail = document.createElement("h" + size);
    let textHeaderDetail = document.createTextNode(title);
    headerDetail.appendChild(textHeaderDetail);
    headerDetail.setAttribute("style", "color: blue;")
    detail.appendChild(headerDetail);

    // do tieu_de bij overflow thanh '..' va
    // can loai bo cac chu khong co nghia khi lay substring
    const max_lengt_unit = 54;
    if (unit.length > max_lengt_unit) {
        unit = unit.trim();
        unit = unit.substring(0, max_lengt_unit);
        let indexLastSpace = unit.lastIndexOf(' ');
        unit = unit.substring(0, indexLastSpace);
    }

    let detailData = await reqES.searchUnitByBookAndName(book, unit, isTheory);
    let detailHits = detailData.hits.hits;

    for (let index = 0; index < detailHits.length; index++) {

        let source = detailHits[index]._source;
        let section = document.createElement("section");

        let header = document.createElement("h4");
        let text = "";
        if (source.tieu_de && source.tieu_de.length == 1) {
            text = source.tieu_de[0];
        } else if (source.tieu_de && source.tieu_de.length > 1) {
            text = source.tieu_de[1];
        }
        let textHeader = document.createTextNode(text);
        header.appendChild(textHeader);
        header.setAttribute("style", "color: blue;");

        let stringInnerHTML = source.ly_thuyet_or_bai_tap;
        let detailSection = new DetailSection(document, stringInnerHTML, text, book);
        detailSection.buildDetail(isTheory);

        section.appendChild(header);
        section.appendChild(detailSection.element);
        detail.appendChild(section);

    }

    if (detailHits.length > 0) return detail;
    else return null;

}
