const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const BuildSBT = require('./build_sbt');

let dom = new JSDOM('<!doctype html><html><body></body></html>');
let document = dom.window.document;

let stringInnerHTML = `<h2 class="s14 lineheight"></h2>
<p style="text-align: justify;">Phát biểu nào dưới đây là đúng?</p>
<p style="text-align: justify;">A. Fructozơ có phản ứng tráng bạc, chứng tỏ phân tử fructozơ có nhóm chức CHO.</p>
<p style="text-align: justify;">B. Thủy phân xenlulozơ thu được glucozơ.</p>
<p style="text-align: justify;">C. Thủy phân tinh bột thu được fructozơ và&nbsp;glucozơ.</p>
<p style="text-align: justify;">D. Cả xenlulozơ và tinh bột đều có phản ứng tráng bạc.</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;">A. S. Fructozo có nhóm chức C=O</p>
<p style="text-align: justify;">B. Đ</p>
<p style="text-align: justify;">C. S. Thủy phân tinh bột thu được glucozo</p>
<p style="text-align: justify;">D. S. Xenlulozo và tinh bột đều không có phản ứng tráng bạc</p>
<p style="text-align: justify;">Đáp án <strong>B</strong></p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`;


let text = "test"
// let book = "văn";
let book = "toán";
let buildSBT = new BuildSBT(document, null);
buildSBT.init(stringInnerHTML, text, book)

// buildSBT.buildDetail(true);
buildSBT._buildNoQuestionMultipleChoise();
document.body.appendChild(buildSBT.getElement());
fs.writeFile('test_sbt.html', dom.serialize(), err => {
    console.log('done: test_sbt');
});
