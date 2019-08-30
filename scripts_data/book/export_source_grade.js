

const fs = require('fs');
const reqES = require('./queryElasticsearch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const maxDepth = 3;
const excepts = ["văn", "toán", "lý", "lí", "hóa", "sinh", "đọc hiểu", "sử", "địa", "gdcd", "công nghệ", "tin", "tiếng việt"];
const denies = ["cùng em học tiếng việt 2", "cùng em học toán 2"]

let tmpGrade = '12'
const myArgs = process.argv.slice(2);
if (myArgs.length > 0) {
    tmpGrade = myArgs[0]
}
const grade = tmpGrade;

const FOLDER = './' + grade + '/'
const PATH = FOLDER + 'source/'
if (!fs.existsSync(FOLDER)) {
    fs.mkdirSync(FOLDER);
}
if (!fs.existsSync(PATH)) {
    fs.mkdirSync(PATH);
}

const domain = "loigiaihay.com"

reqES.searchBookByKeyWithDomain(grade, domain).then(async data => {
    let hits = data.hits.hits;
    if (hits.length == 0) return;

    for (let j = 0; j < hits.length; j++) {
        const hit = hits[j];


        let source = hit._source;

        let bookName = source.ten_sach.toLowerCase();
        let check = false;
        for (let index = 0; index < excepts.length; index++) {
            if (bookName.indexOf(excepts[index]) > -1) {
                check = true;
                break;
            }
        }
        for (let index = 0; index < denies.length; index++) {
            if (bookName.indexOf(denies[index]) > -1) {
                check = false;
                break;
            }
        }
        if (!check) continue;

        let dom = new JSDOM('<!doctype html><html><body></body></html>');
        let document = dom.window.document;
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.titleBlue { color: blue; } .subTitle { color: grey; font-size:24px; font-style: italic;}';

        let list = JSON.parse(source.muc_luc_sach_json);
        let detailElement = await renderDetailBook(list, document, 1, source.ten_sach);

        let startElement = document.createElement('div');
        startElement.appendChild(document.createTextNode('==START=='))
        let endElement = document.createElement('div');
        endElement.appendChild(document.createTextNode('==END=='))
        startElement.className = 'subTitle'
        endElement.className = 'subTitle'

        document.body.appendChild(detailElement);

        const div_body = document.body.children[0];

        let count = 0;
        let number = 0
        let lastIndex = -1;

        for (let index = 0; index < div_body.children.length; index++) {
            const div_child = div_body.children[index];
            count += div_child.textContent.length;
            if (count > 200000 || (index == div_body.children.length - 1 && lastIndex < index)) {
                let subDom = new JSDOM('<!doctype html><html><body></body></html>');
                let subDocument = subDom.window.document;
                subDocument.head.appendChild(style.cloneNode(true))
                subDocument.body.appendChild(startElement.cloneNode(true))
                for (let i = lastIndex + 1; i <= index; i++) {
                    const child = div_body.children[i];
                    subDocument.body.appendChild(child.cloneNode(true));
                }
                subDocument.body.appendChild(endElement.cloneNode(true));
                const bookName = source.ten_sach.trim().replace(' ', '_') + '_' + number + '.html'
                fs.writeFile(PATH + bookName, subDom.serialize(), err => {
                    if (err) console.log(err, "!!!!!Book: " + source.ten_sach + ", number: " + number);
                });
                console.log('!!!!!!Done export: ' + source.ten_sach + ", number: " + number + '\n===========\n');
                // validate(subDom, bookName);
                count = 0;
                number++;
                lastIndex = index;
            }
        }

        if (number == 0) {
            document.head.appendChild(style.cloneNode(true));
            document.body.appendChild(startElement.cloneNode(true));
            document.body.children[0].before(endElement.cloneNode(true));
            const bookName = source.ten_sach.trim().replace(' ', '_') + '.html';
            fs.writeFile(PATH + bookName, dom.serialize(), err => {
                if (err) console.log(err)
            });
            console.log('!!!!!!Done export: ' + source.ten_sach + '\n===========\n');
            // validate(dom, bookName);
        }
    }
})

async function renderDetailBook(list, document, size, book) {

    let ulNode = document.createElement("div");

    for (let i = 0; i < list.length; i++) {

        let liNode = document.createElement("div");

        let heading = document.createElement("h" + size);
        let text = document.createTextNode(list[i].name);
        let aNode = document.createElement("a");
        aNode.appendChild(text);
        aNode.className = 'titleBlue';
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
            else console.log("Book: '" + book + "' with unit: '" + list[i].name + "' not found")

        }

        ulNode.appendChild(liNode);

    }

    return ulNode;
}

async function getDetailUnit(isTheory, document, book, unit, size) {

    let detail = document.createElement("div");

    if (size <= maxDepth) {
        let title = "Bài tập";
        if (isTheory) {
            title = "Lý thuyết";
        }
        let headerDetail = document.createElement("h" + size);
        let textHeaderDetail = document.createTextNode(title);
        headerDetail.appendChild(textHeaderDetail);
        headerDetail.className = 'titleBlue';
        detail.appendChild(headerDetail);
    }

    // do tieu_de bij overflow thanh '..' va
    // can loai bo cac chu khong co nghia khi lay substring
    const max_lengt_unit = 54;
    if (unit.length > max_lengt_unit) {
        unit = unit.trim();
        unit = unit.substring(0, max_lengt_unit);
        let indexLastSpace = unit.lastIndexOf(' ');
        unit = unit.substring(0, indexLastSpace);
    }

    let detailData = await reqES.searchUnitByBookAndName(book, unit, isTheory, domain);
    let detailHits = detailData.hits.hits;

    for (let index = 0; index < detailHits.length; index++) {

        let source = detailHits[index]._source;
        let section = document.createElement("section");

        let header = document.createElement("h4");
        let text = "";
        if (!isTheory && size > maxDepth) text += "Bài tập - ";
        if (source.tieu_de && source.tieu_de.length == 1) {
            text += source.tieu_de[0];
        } else if (source.tieu_de && source.tieu_de.length > 1) {
            text += source.tieu_de[1];
        }
        let textHeader = document.createTextNode(text);
        header.appendChild(textHeader);
        header.className = 'titleBlue'

        // let stringInnerHTML = source.ly_thuyet_or_bai_tap;
        // let detailSection = new DetailSection(document, stringInnerHTML, text, book);
        // detailSection.buildDetail(isTheory, true);

        section.appendChild(header);
        let subDom = JSDOM.fragment(source.ly_thuyet_or_bai_tap);
        // section.appendChild(detailSection.element);;
        section.appendChild(subDom)
        detail.appendChild(section);

    }

    if (detailHits.length > 0) return detail;
    else return null;

}
