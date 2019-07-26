

const fs = require('fs');
const reqES = require('./queryElasticsearch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const DetailSection = require('./detailSection');

// const book = "Toán lớp 12";
let books = ["Ngữ văn 12", "Công nghệ 12", "Địa lí lớp 12", "GDCD lớp 12", "Hóa học lớp 12 Nâng cao", "Hóa lớp 12", "Lịch sử lớp 12", "Sinh lớp 12 Nâng cao",
    "Sinh lớp 12", "Soạn văn 12 siêu ngắn", "Tác giả - Tác phẩm Văn 12", "Tin học lớp 12", "Tập bản đồ Địa lí 12", "Toán 12 Nâng cao", "Toán lớp 12",
    "Văn mẫu lớp 12", "Văn mẫu lớp 12", "Vật lí lớp 12 Nâng cao"
]
const maxDepth = 3;
const PATH = './source/'

books.forEach(book => {

    reqES.searchBookByName(book).then(async data => {

        let hits = data.hits.hits;
        if (hits.length == 0) return;

        let dom = new JSDOM('<!doctype html><html><body></body></html>');
        let document = dom.window.document;

        let source = hits[0]._source;

        let list = JSON.parse(source.muc_luc_sach_json);
        let detailElement = await renderDetailBook(list, document, 1, source.ten_sach);

        document.body.appendChild(detailElement);

        const div_body = document.body.children[0];

        let count = 0;
        let number = 0
        let lastIndex = -1;

        for (let index = 0; index < div_body.children.length; index++) {
            const div_child = div_body.children[index];
            count += div_child.textContent.length;
            if (count > 200000 || (index == div_body.children.length-1 && lastIndex<index)) {
                let subDom = new JSDOM('<!doctype html><html><body></body></html>');
                let subDocument = subDom.window.document;
                for (let i = lastIndex + 1; i <= index; i++) {
                    const child = div_body.children[i];
                    subDocument.body.appendChild(child.cloneNode(true));
                }
                fs.writeFile(PATH + 'source_' + source.ten_sach.trim().replace(' ', '_') + '_' + number + '.html', subDom.serialize(), err => {
                    if (err) console.log(err, "!!!!!Book: " + source.ten_sach + ", number: " + number);
                });
                console.log('!!!!!!Done export: ' + source.ten_sach + ", number: " + number + '\n===========\n');
                count = 0;
                number++;
                lastIndex = index;
            }
        }

        if (number == 0) {
            fs.writeFile(PATH + 'source_' + source.ten_sach.trim().replace(' ', '_') + '.html', dom.serialize(), err => {
                if (err) console.log(err)
            });
            console.log('!!!!!!Done export: ' + source.ten_sach + '\n===========\n');
        }

    })
});

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

    if (size <= maxDepth) {
        let title = "Bài tập";
        if (isTheory) {
            title = "Lý thuyết";
        }
        let headerDetail = document.createElement("h" + size);
        let textHeaderDetail = document.createTextNode(title);
        headerDetail.appendChild(textHeaderDetail);
        headerDetail.setAttribute("style", "color: blue;")
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

    let detailData = await reqES.searchUnitByBookAndName(book, unit, isTheory);
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
        header.setAttribute("style", "color: blue;");

        let stringInnerHTML = source.ly_thuyet_or_bai_tap;
        let detailSection = new DetailSection(document, stringInnerHTML, text, book);
        detailSection.buildDetail(isTheory, true);

        section.appendChild(header);
        section.appendChild(detailSection.element);
        detail.appendChild(section);

    }

    if (detailHits.length > 0) return detail;
    else return null;

}
