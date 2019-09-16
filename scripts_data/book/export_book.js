
const fs = require('fs');
const reqES = require('./queryElasticsearch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Build = require('./build');
const { Console } = require('console');
const TreeModel = require('tree-model')
const sizeof = require('object-sizeof');

const max_depth = 3;
const excepts = ["văn", "toán", "lý", "lí", "hóa", "sinh", "đọc hiểu", "sử", "địa", "gdcd", "công nghệ", "tin", "tiếng việt"];
const denies = ["cùng em học tiếng việt 2", "cùng em học toán 2"]

let tmp_grade = '12'
const my_args = process.argv.slice(2);
if (my_args.length > 0) {
    tmp_grade = my_args[0]
}
const grade = tmp_grade;

const FOLDER = './' + grade + '/'
const PATH = FOLDER + 'export/'
const LOGS = FOLDER + "logs/"
if (!fs.existsSync(FOLDER)) {
    fs.mkdirSync(FOLDER);
}
if (!fs.existsSync(PATH)) {
    fs.mkdirSync(PATH);
}
if (!fs.existsSync(LOGS)) {
    fs.mkdirSync(LOGS);
}
const output = fs.createWriteStream(LOGS + 'stdout.txt');
const error_output = fs.createWriteStream(LOGS + 'stderr.txt');
const validate_output = fs.createWriteStream(LOGS + 'validate.txt');
// Custom simple logger
const logger = new Console(output, error_output);
const logger_validate = new Console(validate_output);
// use it like console

const mjpage = require('mathjax-node-page');
const mjnode = require('mathjax-node-svg2png');
mjnode.initLogger(logger_validate)
const mjpage_config = { format: ["TeX"] }
const mjnode_config = { png: true }
mjpage.init(mjnode, logger_validate);
mjpage.addOutput('png', (wrapper, data) => {
    wrapper.innerHTML = data;
});
async function validate(dom) {
    return new Promise(resolve => {
        mjpage.mjpage(dom, mjpage_config, mjnode_config, function (output) {
            resolve(output)
        })
    });
}

const domain = "loigiaihay.com"
const tree = new TreeModel()

reqES.searchBookByKeyWithDomain(grade, domain).then(async data => {
    const hits = data.hits.hits;
    if (hits.length == 0) return;

    for (let j = 0; j < hits.length; j++) {
        const hit = hits[j];

        const source = hit._source;

        let book_name = source.ten_sach.toLowerCase();

        let check = false;
        for (let index = 0; index < excepts.length; index++) {
            if (book_name.indexOf(excepts[index]) > -1) {
                check = true;
                break;
            }
        }
        for (let index = 0; index < denies.length; index++) {
            if (book_name.indexOf(denies[index]) > -1) {
                check = false;
                break;
            }
        }
        if (!check) continue;

        const list = JSON.parse(source.muc_luc_sach_json);

        const dom = new JSDOM('<!doctype html><html><body></body></html>');
        const document = dom.window.document;
        const build = new Build(document, logger);
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.titleBlue { color: blue; } .subTitle { color: grey; font-size:24px; font-style: italic;} .error { color: red; }';
        const start_element = document.createElement('div');
        start_element.appendChild(document.createTextNode('==START=='))
        const end_element = document.createElement('div');
        end_element.appendChild(document.createTextNode('==END=='))
        start_element.className = 'subTitle'
        end_element.className = 'subTitle'

        let current_index = 0;
        for (let index = 0; index < list.length; index++) {
            const sub_list = list[index];
            const root = tree.parse(sub_list);
            // root.walk(node => {
            //     console.log(" ".repeat(node.getPath().length*2), node.model.name, node.hasChildren())
            // })
            const nodes = await root.all()
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                let path_length = node.getPath().length;
                if (!node.hasChildren()) {
                    current_index = await exportUnits(build, dom, node, source.ten_sach, true, current_index, path_length, start_element, end_element, style);
                    current_index = await exportUnits(build, dom, node, source.ten_sach, false, current_index, path_length, start_element, end_element, style);
                } else {
                    appendHeader(document, path_length, node.model.name)
                }
            }
        }

        if (document.body.children.length > 0) {
            await write(source.ten_sach, current_index, dom, start_element, end_element, style);
        }

    }

})

function checkMaxDepth(document, depth, is_theory) {
    if (depth <= max_depth) {
        let title = "Bài tập";
        if (is_theory) {
            title = "Lý thuyết";
        }
        appendHeader(document, depth, title)
    }
}

function appendHeader(document, depth, title) {
    const header = document.createElement("h" + depth);
    const text_header = document.createTextNode(title);
    header.appendChild(text_header);
    header.className = 'titleBlue';
    document.body.appendChild(header);
}

function insertCheckError(document, build, book, unit, current_index) {
    const check_error_element = document.createElement('div')
    check_error_element.className = 'error'
    if (build.hasIndexUnexported()) {
        check_error_element.appendChild(document.createTextNode('Cảnh báo: có lỗi trong phân tích - chưa lấy hết dữ liệu\n'))
        logger.warn('Cảnh báo: có lỗi trong phân tích - chưa lấy hết dữ liệu ở phần: "' + unit + '" trong sách: "' + book + '" số: ' + current_index)
    }
    if (!build.isSiblingsSameType()) {
        check_error_element.appendChild(document.createTextNode('Cảnh báo: có lỗi trong phân tích - phân tích sai\n'))
        logger.warn('Cảnh báo: có lỗi trong phân tích - phân tích sai: "' + unit + '" trong sách: "' + book + '" số: ' + current_index)
    }
    if (!build.isAllHaveSolution()) {
        check_error_element.appendChild(document.createTextNode('Cảnh báo: có lỗi trong phân tích - các phần chưa có hết các lời giải\n'))
        logger.warn('Cảnh báo: có lỗi trong phân tích - các phần chưa có hết các lời giải: "' + unit + '" trong sách: "' + book + '" số: ' + current_index)
    }
}

async function write(book, current_index, dom, start_element, end_element, style) {
    const book_name = book.trim().replace(' ', '_') + '_' + current_index + '.html';
    logger_validate.log("!!!Validating: " + book_name)
    dom = await validate(dom);
    const document = dom.window.document;
    document.head.appendChild(style.cloneNode(true))
    document.body.innerHTML = start_element.outerHTML + document.body.innerHTML + end_element.outerHTML;
    logger_validate.log("!!!Done: " + book_name + "\n")
    fs.writeFile(PATH + book_name, dom.serialize(), err => {
        if (err) logger.error(err, "!!!!!Book: " + book_name + ", number: " + current_index)
    });
    logger.log('!!!!!!Done export: ' + book_name + ", number: " + current_index + '\n===========\n');
}

async function exportUnits(build, dom, node, book, is_theory, current_index, path_length, start_element, end_element, style) {
    const document = dom.window.document;
    checkMaxDepth(document, path_length, is_theory);

    // do tieu_de bij overflow thanh '..' va
    // can loai bo cac chu khong co nghia khi lay substring
    let unit = node.model.name;
    const max_lengt_unit = 54;
    if (unit.length > max_lengt_unit) {
        unit = unit.trim();
        unit = unit.substring(0, max_lengt_unit);
        const index_last_space = unit.lastIndexOf(' ');
        unit = unit.substring(0, index_last_space);
    }

    const data = await reqES.searchUnitByBookAndName(book, unit, is_theory, domain);
    const hits = data.hits.hits;

    for (let index = 0; index < hits.length; index++) {

        const source = hits[index]._source;

        let text = "";
        if (!is_theory && path_length > max_depth) text += "Bài tập - ";
        if (source.tieu_de && source.tieu_de.length == 1) {
            text += source.tieu_de[0];
        } else if (source.tieu_de && source.tieu_de.length > 1) {
            text += source.tieu_de[1];
        }

        appendHeader(document, 4, text);

        const string_inner_html = source.ly_thuyet_or_bai_tap;
        build.init(string_inner_html, source.tieu_de_con, text, book, is_theory)
        let detail = build.getResult();
        document.body.innerHTML += detail.innerHTML;
        insertCheckError(document, build, book, unit, current_index)

        let size = sizeof(document.body.innerHTML);
        if (size >= 1048576) {
            await write(book, current_index, dom, start_element, end_element, style)
            document.body.innerHTML = ''
            current_index++;
            if (index < hits.length - 1) {
                const parents_node = node.getPath()
                for (let i = 0; i < parents_node.length; i++) {
                    const parent_node = parents_node[i];
                    const number = i + 1;
                    appendHeader(document, number, parent_node.model.name)
                }
                checkMaxDepth(document, path_length, is_theory);
            }
        }
    }

    return current_index;

}
