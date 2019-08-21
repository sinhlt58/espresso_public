

const fs = require('fs');
const reqES = require('./queryElasticsearch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const excepts = ["văn", "toán", "tiếng việt", "lý", "lí", "hóa", "sinh", "sử", "địa", "gdcd", "khoa học"];

let tmpGrade = '12'
const myArgs = process.argv.slice(2);
if (myArgs.length > 0) {
    tmpGrade = myArgs[0]
}
const grade = tmpGrade;

const FOLDER = './sbt_' + grade + '/'
const PATH = FOLDER + 'source/'
if (!fs.existsSync(FOLDER)) {
    fs.mkdirSync(FOLDER);
}
if (!fs.existsSync(PATH)) {
    fs.mkdirSync(PATH);
}

const domain = "sachbaitap.com"

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
        if (!check) continue;

        let dom = new JSDOM('<!doctype html><html><body></body></html>');
        let document = dom.window.document;
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.titleBlue { color: blue; } .subTitle { color: grey; font-size:24px; font-style: italic;}';

        let list = JSON.parse(source.muc_luc_sach_json);
        let detailBookElement = await renderDetailBook(list, document, 1, source.ten_sach);

        let startElement = document.createElement('div');
        startElement.appendChild(document.createTextNode('==START=='))
        let endElement = document.createElement('div');
        endElement.appendChild(document.createTextNode('==END=='))
        startElement.className = 'subTitle'
        endElement.className = 'subTitle'

        document.body.appendChild(detailBookElement);

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

            let detailUnit = await getDetailUnit(document, book, list[i].name, size + 1);
            if (detailUnit) liNode.appendChild(detailUnit);

        }

        ulNode.appendChild(liNode);

    }

    return ulNode;
}

async function getDetailUnit(document, book, unit, size) {

    let detailUnitElement = document.createElement("div");

    // do tieu_de bij overflow thanh '..' va
    // can loai bo cac chu khong co nghia khi lay substring
    const max_lengt_unit = 54;
    if (unit.length > max_lengt_unit) {
        unit = unit.trim();
        unit = unit.substring(0, max_lengt_unit);
        let indexLastSpace = unit.lastIndexOf(' ');
        unit = unit.substring(0, indexLastSpace);
    }

    let unitData = await reqES.searchUnitInBookWithDomain(unit, book, domain);
    let unitlHits = unitData.hits.hits;

    for (let index = 0; index < unitlHits.length; index++) {
        let unitSource = unitlHits[index]._source;
        let danh_sach_bai = []
        if(unitSource.danh_sach_bai instanceof Array) danh_sach_bai = unitSource.danh_sach_bai;
        else danh_sach_bai = [unitSource.danh_sach_bai];
        await getDetailExercise(danh_sach_bai, book, domain,detailUnitElement, document, size)
    }
    // do trong sachbaitap.com thi phan ngu van co sach lien ket luon de phan chi tiet chu khong lien ket qua 1 trang liet ke danh sach cac phan chi tiet
    if(detailUnitElement.children.length == 0){
        let danh_sach_bai = [unit]
        await getDetailExercise(danh_sach_bai, book, domain, detailUnitElement, document, size)
    }

    if (detailUnitElement.children.length > 0) return detailUnitElement;
    else return null;

}

async function getDetailExercise(danh_sach_bai, book, domain, detailUnitElement, document, size) {
    for (let i = 0; i < danh_sach_bai.length; i++) {
        let exercise = danh_sach_bai[i]
        let exerciseData = await reqES.searchListExerciseInUnit(exercise, book, domain);
        let exerciseHits = exerciseData.hits.hits;
        if (exerciseHits.length == 0) continue;
        for (let j = 0; j < exerciseHits.length; j++) {
            let exerciseSource = exerciseHits[j]._source;
            let section = document.createElement("section");

            let header = document.createElement("h" + size);
            let text = exerciseSource.tieu_de_con
            let textHeader = document.createTextNode(text);
            header.appendChild(textHeader);
            header.className = 'titleBlue'

            section.appendChild(header);
            let subDom = JSDOM.fragment(exerciseSource.ly_thuyet_or_bai_tap);
            section.appendChild(subDom)
            detailUnitElement.appendChild(section);
        }
    }
}
