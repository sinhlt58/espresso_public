
// "use strict";

const TreeModel = require('tree-model')
const DEFAULT_PRIORITY = [
    {
        numerical_order: 1, // đề
        type: 'exam',
        is_one_line: false,
        regex: /^(\s{0,2}Đề)(?!(\s{0,}bài)).{0,}/g,
    },
    {
        numerical_order: 2, // phần , neu can update de loai bo truong hop I.12 va 12:Iadsadsad trong regex cua "câu bằng số", A. Phần .... (co nen hay khong?)
        type: 'part',
        is_one_line: false,
        regex: /^(\s{0,}.{0,3}(X|IX|VI{0,3}|IV|I{1,3}|Phần|PHẦN|TRẮC NGHIỆM|trắc nghiệm|Trắc nghiệm|TỰ LUẬN|tự luận|Tự luận|ĐỌC.{1,3}HIỂU|PHẦN LÀM VĂN){1}.{0,9})/g,
    },
    {
        numerical_order: 3, // câu label
        type: 'question_by_label',
        is_one_line: false,
        regex: /^(\s{0,}(Ý|Câu|Bài))\s{0,}[A-Z0-9]{1,}[\.\:]{0,}[A-Z0-9]{0,}/g,
    },
    {
        numerical_order: 4, // câu bằng số
        type: 'question_by_number',
        is_one_line: false,
        regex: /^(\s{0,}[A-Z0-9]{1,})[\.\:]{1,}[A-Z0-9]{0,}/g,
    },
    {
        numerical_order: 5, // phần nhỏ
        type: 'sub_part',
        is_one_line: false,
        regex: /^(\s{0,}[a-z]{1,})[\.\:]{0,}[A-Za-z0-9]{0,}\s{0,}\){1,}/g,
        inline_regex: /\s{0,1}[a-z]{1,}[\.\:]{0,}[A-Za-z0-9]{0,}\s{0,}\){1,}/g
    },
    {
        numerical_order: 6, // các phương án trả lời
        type: 'multiple_choise',
        is_one_line: false,
        // dang bi "Các loại cây (A)" cung nhan
        regex: /(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])((\([A-Ea-e]\)[\.\:]{0,1})|([A-Ea-e][\.\:]))(?=.{1})/g,
        inline_regex: /(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])((\([A-D]\)[\.\:]{0,1})|([A-D][\.\:]))(?=.{1})/g
    },
    {
        numerical_order: 6, // phuong phap giai
        type: 'solution',
        is_one_line: false,
        is_lower_case: true,
        regex: /^(\s{0,}(phương pháp giải))/g,
    },
    {
        numerical_order: 6, // loi giai
        type: 'solution_detail',
        is_one_line: false,
        is_lower_case: true,
        regex: /^(\s{0,}(trả lời|lời giải|gợi ý))/g,
    }
]



const DEFAULT_ABSTRACT_SOLUTION_SELECTOR = "p .content_detail";
const DEFAULT_ABSTRACT_PROBLEM_SELECTOR = "p .content_question";

// "à" và "ề " cần thêm trường hợp cho mã unicode khác
// const DEFAULT_EXAM_REGEX = /^(.{0,2}Đề)(?!(.{0,2}bài)).{0,}/g
// const PARTSI = ["I", "Phần I", "PHẦN I", ".{0,3}PHẦN ĐỌC.{1,3}HIỂU.{0,9}", ".{0,3}PHẦN TRẮC NGHIỆM.{0,9}", ".{0,3}TRẮC NGHIỆM.{0,9}", ".{0,3}Phần trắc nghiệm.{0,9}", "PHẦN RIÊNG.{0,9}"]
// const PARTSII = ["II", "Phần II", "PHẦN II", ".{0,3}PHẦN LÀM VĂN.{0,9}", ".{0,3}PHẦN TỰ LUẬN.{0,9}", ".{0,3}TỰ LUẬN.{0,9}", ".{0,3}Phần tự luận.{0,9}", "PHẦN CHUNG.{0,9}"]
// const PARTS = [PARTSI, PARTSII];
// '[A-Za-z\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
// const DEFAULT_PART_REGEX = /(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])((\([A-Ea-e]\)[\.\:]{0,1})|([A-Ea-e][\.\:]))(?=.{1})/g
// const DEFAULT_QUESTION_LABEL_REGEX = /^(\s{0,}(Ý|Câu|Bài))\s{0,}[A-Z0-9]{1,}[\.\:]{0,}[A-Z0-9]{0,}/g
// chua co 12.a
// const DEFAULT_QUESTION_NUMBER_REGEX = /^(\s{0,}[A-Z0-9]{1,})[\.\:]{1,}[A-Z0-9]{0,}/g
// const DEFAULT_SUB_PART_REGEX = /^(\s{0,}[a-z]{1,})[\.\:]{0,}[A-Za-z0-9]{0,}\s{0,}\){1,}/g
// const DEFAULT_MULTIPLE_CHOISE_PLAN_REGEX = /(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])((\([A-Ea-e]\)[\.\:]{0,1})|([A-Ea-e][\.\:]))(?=.{1})/g

const DEFAULT_NODES_IGNORE_CHECK_TEXT_REGEX = /(IMG|TABLE)/g
const DEFAULT_SOLUTION_LABELS = ["lời giải", "cách giải", "giải", "giải", "gợi ý", "làm bài", "trả lời", "trả lời", "đáp án", "bài làm", "gợi ý làm bài", "gợi ý trả lời", "hướng dẫn trả lời"];
const DEFAULT_SOLOTION_REGEX = /^(\s{0,}(trả lời))/g
const DEFAULT_QUESTION_WORD_LIST = ["tại sao", "thế nào", "định nghĩa", "ra sao", "có cách nào", "cái gì", "vì sao", "bằng cách nào", "là gì",
    "làm sao", "chỗ nào", "gì", "nghĩ sao", "nơi nào", "ở đâu", "thì sao", "lúc nào", "đi đâu", "thấy sao", "lý do nào", "nơi đâu", "sao",
    "nguyên nhân nào", "từ đâu", "bao nhiêu", "khi nào", "đâu", "bao giờ", "thời gian nào", "có phải", "bao", "người nào", "là ai", "có mấy",
    "nào", "ai", "mấy", "nguyên nhân", "thật không", "như thế nào", "lý do", "phải không"]
const DEFAULT_QUESTION_REGEX = /\?|hãy|tại sao|thế nào|định nghĩa|ra sao|có cách nào|cái gì|vì sao|bằng cách nào|là gì|làm sao|chỗ nào|gì|nghĩ sao|nơi nào|ở đâu|thì sao|lúc nào|đi đâu|thấy sao|lý do nào|nơi đâu|sao|nguyên nhân nào|từ đâu|bao nhiêu|khi nào|đâu|bao giờ|thời gian nào|có phải|bao|người nào|là ai|có mấy|nào|ai|mấy|nguyên nhân|thật không|như thế nào|lý do|phải không/gi

class Build {
    constructor(document, logger) {
        this._document = document;
        this._logger = logger;

        this._priority = DEFAULT_PRIORITY
        this._abstract_solution_selector = DEFAULT_ABSTRACT_SOLUTION_SELECTOR
        this._abstract_problem_selector = DEFAULT_ABSTRACT_PROBLEM_SELECTOR
        this._nodes_ignore_check_text_regex = DEFAULT_NODES_IGNORE_CHECK_TEXT_REGEX
        this._solution_labels = DEFAULT_SOLUTION_LABELS
        this._solution_regex = DEFAULT_SOLOTION_REGEX
        this._question_text_regex = DEFAULT_QUESTION_REGEX
        // this._regex_multiple_choise_plan = DEFAULT_REGEX_MULTIPLE_CHOISE_PLAN
    }

    setStringInnerHtml(string_inner_html){
        this._string_inner_html = string_inner_html;
    }

    setAbstractSolutionSelector(abstract_solution_selector){
        this._abstract_solution_selector = abstract_solution_selector
    }

    setAbstractProblemSelector(abstract_problem_selector){
        this._abstract_problem_selector = abstract_problem_selector
    }

    init(string_inner_html, question_default, book) {
        this._element = this._document.createElement("div");
        this._element.innerHTML = string_inner_html;
        // this.element.innerHTML = this._cleanRedundantString(this.getReplaces(), string_inner_html)
        // this._cleanRedundantNode();
        this._string_inner_html = this._element.innerHTML;
        // this.question_default = question_default;
        // this.book = book;

        // this.id_methods = this.getIdMethods();
        if(this._tree) delete this._tree
        if(this._root) delete this._root;
        this._tree = new TreeModel()
        this._root = this._tree.parse({
            index: 0,
            indexs: [0],
            next_index: this._element.children.length,
            is_one_line: false,
        });

        this._abstract_problem_index = this._findStartAbstractProblem();
        this._abstract_solution_index = this._findStartAbstractSolution();

        this._buildTree();

        // console.log(this._root)
        // this._root.all(node => {
        //     console.log("!!!", node.model.text, node.model.indexs)
        //     // if() {
        //         // console.log(node.getPath())
        //     // }
        // })
    }

    _isLeaf(node) {
        return node.children.length === 0;
    }

    _buildTree() {
        this._initTree();
        this._smoothTree();
    }

    _initTree(){

        let current_node = this._root;

        for (let index = /*0*/ this._abstract_problem_index + 1; index < this._abstract_solution_index; index++) {

            let is_continue = false;
            let tree_node = null;
            let child_element_text = null;
            const child_element = this._element.children[index];

            if(child_element.nodeName.search(this._nodes_ignore_check_text_regex) > -1) {
                is_continue = true;
            } else {
                child_element_text = child_element.textContent;
            }

            if(child_element_text !== null && child_element_text !== undefined) {
                child_element_text = child_element_text.trim();
            }

            if(!is_continue) {
                for (let i = 0; i < this._priority.length; i++) {
                    const child_priority = this._priority[i];
                    let tmp_child_element_text = child_element_text;
                    if(child_priority.is_lower_case) tmp_child_element_text = child_element_text.toLowerCase();
                    let check = tmp_child_element_text.search(child_priority.regex);
                    if(check === -1) continue;
                    // console.log("@@ " + index ,child_element_text)
                    tree_node = this._tree.parse({
                        numerical_order: child_priority.numerical_order,
                        index: index,
                        text: child_element_text,
                        type: child_priority.type,
                        indexs: [index],
                        next_index: index+1,
                        is_one_line: child_priority.is_one_line
                    });
                    break;
                }
            }

            if(tree_node) {

                if(current_node.model.numerical_order && tree_node.model.numerical_order <= current_node.model.numerical_order) {
                    let tmp_current_node = current_node.parent;
                    while(true) {
                        if(tmp_current_node.isRoot() || tmp_current_node.model.numerical_order < tree_node.model.numerical_order){
                            current_node = tmp_current_node
                            break;
                        }
                        tmp_current_node = tmp_current_node.parent;
                    }
                }
                current_node.addChild(tree_node);
                current_node = tree_node;

            } else {

                if(current_node.model.is_one_line && !current_node.isRoot()) {
                    let tmp_current_node = current_node.parent;
                    while(true) {
                        if(tmp_current_node.isRoot() || tmp_current_node.model.is_one_line){
                            tmp_current_node.model.indexs.push(index)
                            break;
                        }
                        tmp_current_node = tmp_current_node.parent;
                    }
                } else {
                    current_node.model.indexs.push(index)
                }

            }

        }

    }

    _smoothTree() {
        // trong truong hop thieu phan I ma co phan II thi se dung de check

        this._root.all(node => {
            console.log("!!!", node.model.text, node.model.indexs)
            if(_isSolution(node)) {
                console.log(node.getPath())
            }
        })
    }

    _validTree() {

    }


    _findStartAbstractProblem() {
        return this._findIndexBySelector(this._abstract_problem_selector, -1);
    }

    _findStartAbstractSolution() {
        let fist_find = -1;
        if (this._abstract_solution_selector) {
            fist_find = this._findIndexBySelector(this._abstract_solution_selector, this._element.children.length);
        }
        // // nếu không tìm thấy, sẽ xét các trường hợp phụ
        // if (fist_find == -1) {
        //     for (let index = 0; index < element.children.length; index++) {
        //         let text = element.children[index].textContent;
        //         if (text == null || text == undefined) continue;
        //         text = text.trim().toLowerCase();
        //         // do 'giai' thuoc 2 uni-code khac nhau nen can co 2 regex
        //         if (this._checkSlaveAnswer(text, slave_answer_labels)) {
        //             fist_find = index;
        //             break;
        //         }
        //     }
        // }
        // // trong trường hợp đã xét các trường hợp phụ mà vẫn chưa tìm thấy thì trả về vị trí cuối cùng
        // if (fist_find == -1) return element.children.length - 1;
        return fist_find;
    }

    _findIndexBySelector(selector, default_value) {
        if (selector == null) return default_value;
        const node = this._element.querySelector(selector);
        if (!node) return default_value;
        const parent_node = node.parentNode;
        let start_index = Array.from(this._element.children).indexOf(parent_node);
        if (start_index == null || start_index < 0 || start_index > this._element.children.length) {
            start_index = default_value + 1;
        }
        return start_index;
    }



}

module.exports = Build;

var string_inner_html = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;"><strong>I. TRẮC NGHIỆM (5 điểm)</strong></p>
<p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
<p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
<p style="text-align: justify;"><strong>Câu 1:</strong> <strong>Trong cac cau sau</strong><strong></strong></p>
<p>Hãy chọn phương án trả lời đúng nhất:</p>
<p class="Bodytext70" style="text-align: justify;"><strong>1. Lớp Hai lá mầm có kiểu rễ và gân lá là:</strong></p>
<p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
<p style="text-align: justify;">a. Rễ&nbsp; cọc, gân hình mạng</p>
<p style="text-align: justify;">b.&nbsp; Rễ chùm, gân hình cung hoặc song song</p>
<p style="text-align: justify;">c.&nbsp; Rễ cọc, gân hình cung hoặc song song</p>
<p style="text-align: justify;">d. Rễ chùm, gân hình mạng</p>
<p>Phương pháp giải: asdsadsa</p>
<p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
<p>Trả lời: Chọn a</p>
<p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
<p class="Bodytext70" style="text-align: justify;"><strong>2. Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí ?</strong></p>
<p style="text-align: justify;">a. &nbsp;&nbsp;&nbsp;Sự hô hấp của con người, động thực vật, hoạt động của nhà máy, sự đốt cháy… đều tiêu tốn O<sub>2</sub> và thải ra các khí cacbônic</p>
<p style="text-align: justify;">&nbsp;b. Thực vật quang hợp tiêu thụ khí cacbônic và thải khí O<sub>2</sub>, góp phần (chủ yếu) làm cân bằng các khí này trong không khí</p>
<p style="text-align: justify;">c. Ở thực vật, lượng khí CO<sub>2</sub> thải ra trong hô hấp được sử dụng ngay vào quá trình quang hợp nên vẫn giữ được môi trường trong sạch</p>
<p style="text-align: justify;">&nbsp;d. Câu a và b đều đúng.</p>
<p>Trả lời: Chọn b</p>
<p class="Bodytext70" style="text-align: justify;"><strong>3. Lớp Một lá mầm có số cánh hoa là bao nhiêu trong các trường hợp sau?</strong></p>
<p class="Bodytext70" style="text-align: justify;">&nbsp;a. &nbsp;&nbsp;4 cánh&nbsp;&nbsp;&nbsp;&nbsp; b. 5 cánh&nbsp;&nbsp;&nbsp;&nbsp; c. 3 – 6 cánh&nbsp;&nbsp;&nbsp;&nbsp; d. 4 – 5 cánh</p>
<p class="Bodytext70" style="text-align: justify;"><strong>4. Tại sao nói vi khuẩn là sinh vật dị dưỡng ?</strong></p>
<p style="text-align: justify;">a. &nbsp;&nbsp;&nbsp;Hầu hết vi khuẩn không có chất diệp lục, nên không tạo được chất hữu cơ nuôi cơ thể</p>
<p style="text-align: justify;">Có loại vi khuẩn sống bằng các chất hữu cơ có sẵn trong xác các động thực vật gọi là hoại sinh</p>
<p style="text-align: justify;">&nbsp;Có loại vi khuẩn sống nhờ trên cơ thể sống khác gọi là kí sinh</p>
<p style="text-align: justify;">Cả a, b và c</p>
<p class="Bodytext70" style="text-align: justify;"><strong>5. Nhóm cây nào sau đây toàn là cây lương thực ?</strong></p>
<p style="text-align: justify;">a.Rau cải, cà chua, su hào, cải bắp</p>
<p style="text-align: justify;">b. Cây lúa, khoai tây, ngô, kê</p>
<p style="text-align: justify;">c. Cây mít, cây vải, cây nhãn, cây ổi</p>
<p style="text-align: justify;">d. Cây sen, cây sâm, cây hoa cúc, cà phê</p>
<p class="Bodytext70" style="text-align: justify;"><strong>6. Thực vật ở nước (tảo) xuất hiện trong điều kiện nào ?</strong></p>
<p style="text-align: justify;">a. Các đại dương chiếm phần lớn diện tích Trái Đất</p>
<p style="text-align: justify;">b. Những sinh vật đầu tiên có cấu tạo rất đơn giản</p>
<p style="text-align: justify;">c. Khí hậu nóng và rất ẩm</p>
<p style="text-align: justify;">d. Cả a và b</p>
<p style="text-align: justify;"><strong>Câu 2. Hãy sấp xếp các đặc điểm cấu tạo của cây Hạt trần và cây Hạt kín </strong>ở<em> </em><strong>cột B tương ứng với từng loại cây (hạt trần hoặc hạt kín) ở cột A rồi ghi vào cột kết quả.</strong><strong></strong></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <tbody>
  <tr>
   <td valign="top" width="95"> <p align="center"><strong>Các loại cây (A)</strong><strong></strong></p> </td>
   <td valign="top" width="313"> <p align="center"><strong>Các đặc điểm c</strong><strong>ấ</strong><strong>u tạo</strong></p> <p align="center"><strong>(B)</strong><strong></strong></p> </td>
   <td valign="top" width="79"> <p align="center"><strong>Kết qu</strong><strong>ả</strong><strong></strong></p> </td>
  </tr>
  <tr>
   <td valign="top" width="95">
    <ol>
     <li>Hạt trần</li>
     <li>Hạt kín</li>
     <li>Rễ, thân, lá thật</li>
     <li>Có mạch dan</li>
    </ol></td>
   <td valign="top" width="313"> <p>c.&nbsp;&nbsp; Hạt nằm trong quả</p>
    <ol>
     <li>Có hoa (cơ quan sinh sản là hoa, quả)</li>
     <li>Hạt nằm trên lá noãn hở</li>
     <li>Chưa có hoa, quả (cơ quan sinh sản là nón)</li>
     <li>Có mạch dẫn hoàn thiện</li>
    </ol> <p>h.&nbsp;&nbsp; Rễ, thân, lá thật (rất đa dạng)</p> </td>
   <td valign="top" width="79"> <p>1...............</p> <p>2…………</p> </td>
  </tr>
 </tbody>
</table>
<p>a) Tinh sadsad?</p>
<p>b) Hãy sadsad?</p>
<p>Phương pháp giải: asdsadsa</p>
<p>a) asdgwe </p>
<p>asdgwe </p>
<p>b) asdgwe </p>
<p>asdgwe </p>
<p>Gợi ý:</p>
<p>a) ádsadsadsadsadsa</p>
<p>ádsadsadsadsadsa</p>
<p>ádsadsadsadsadsa</p>
<p>b) ádsadsadsadsadsa</p>
<p>ádsadsadsadsadsa</p>
<p>ádsadsadsadsadsa</p>
<p>Câu 3: Hãy asdsadsadcx ?</p>
<p>a) Hãy asdsadsadcx ?</p>
<p>Phương pháp giải: asdsadsa</p>
<p>Gợi ý: adsad</p>
<p>b) Hãy asdsadsadcx ?</p>
<p>Phương pháp giải:</p>
<p>asdsadsadcx ?</p>
<p>Gợi ý:</p>
<p>qưeasdsadsadcx</p>
<p>qq asdsadsadcx</p>
<p>Câu 4: Hãy asdsadsửewadcx? a) Hãy asdsadsadcx?</p>
<p> b) Hãy asdsadsadcx ?</p>
<p>Phương pháp giải: asdsadsa</p>
<p>Gợi ý: adsad</p>
<p>a) qưeasdsadsadcx</p>
<p>b) qq asdsadsadcx</p>
<p style="text-align: justify;"><strong>II. T</strong><strong>Ự</strong><strong> LUẬN</strong> (5 điểm)</p>
<p style="text-align: justify;"><strong>1. Thế nào là Phân loại thực vật ? Người ta phân chia thực vật thành các bậc phân loại từ cao đến thấp theo trật tự như thế nào ?</strong></p>
<p style="text-align: justify;"><strong>2. Thế nào là thực vật quý hiếm ? Cần phải làm gì để bảo vệ đa dạng thực vật ở Việt Nam ?</strong><strong></strong></p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong>I.&nbsp;&nbsp;&nbsp; </strong><strong>TR</strong><strong>Ắ</strong><strong>C NGHIỆM </strong>(5 điểm)<strong></strong></p>
<p style="text-align: justify;"><strong>Câu 1. </strong><strong></strong></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <tbody>
  <tr>
   <td valign="top" width="106"> <p align="center"><strong>1</strong></p> </td>
   <td valign="top" width="106"> <p align="center"><strong>2</strong></p> </td>
   <td valign="top" width="106"> <p align="center"><strong>3</strong></p> </td>
   <td valign="top" width="106"> <p align="center"><strong>4</strong></p> </td>
   <td valign="top" width="106"> <p align="center"><strong>5</strong></p> </td>
   <td valign="top" width="106"> <p align="center"><strong>6</strong></p> </td>
  </tr>
  <tr>
   <td valign="top" width="106"> <p align="center">a</p> </td>
   <td valign="top" width="106"> <p align="center">d</p> </td>
   <td valign="top" width="106"> <p align="center">c</p> </td>
   <td valign="top" width="106"> <p align="center">d</p> </td>
   <td valign="top" width="106"> <p align="center">b</p> </td>
   <td valign="top" width="106"> <p align="center">a</p> </td>
  </tr>
 </tbody>
</table>
<p style="text-align: justify;">&nbsp;<strong>Câu 2.</strong></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <tbody>
  <tr>
   <td valign="top" width="319"> <p align="center"><strong>1</strong></p> </td>
   <td valign="top" width="319"> <p align="center"><strong>2</strong></p> </td>
  </tr>
  <tr>
   <td valign="top" width="319"> <p style="text-align: center;" align="center">a, b, e, g</p> </td>
   <td valign="top" width="319"> <p style="text-align: center;">&nbsp; c, d. h, i</p> </td>
  </tr>
 </tbody>
</table>
<p style="text-align: justify;"><strong>&nbsp;</strong><strong>II.&nbsp;&nbsp;&nbsp; </strong><strong>TỰ LUẬN </strong>(5 điểm)</p>
<p style="text-align: justify;"><strong>Câu 1</strong>. * Phân loại thực vật là tìm hiểu sự giống nhau và khác nhau của thực vật rồi xếp chúng thành các bậc phân loại theo thứ tự nhất định.</p>
<p style="text-align: justify;">* Người ta phân chia thực vật thành các bậc phân loại từ cao đến thấp theo trật tự sau:</p>
<p style="text-align: justify;" align="center">Ngành – Lớp - Bộ - Họ - Chi – Loài</p>
<p style="text-align: justify;">&nbsp;Loài là bậc phân loại cơ sở. Bậc càng thấp thì sự khác nhau giữa các thực vật cùng bậc càng ít. Như vậy, loài là tập hợp của những cá thể có nhiều đặc điểm giống nhau về hình dạng, cấu tạo...</p>
<p style="text-align: justify;"><strong>Câu 2</strong>. &nbsp;&nbsp;* Thực vật quý hiếm là thực vật có giá trị kinh tế (lấy gỗ, làm thuốc, cây công nghiệp...) nhưng đang bị khai thác quá mức và ngày càng hiếm đi.</p>
<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Để bảo vệ sự đa dạng thực vật ở Việt Nam cần phải:</p>
<p style="text-align: justify;">- Ngăn chặn việc phá rừng để bảo vệ môi trường sống của thực vật</p>
<p style="text-align: justify;">-&nbsp; Hạn chế khai thác bừa bãi các loài thực vật quý hiếm, để bảo vệ số lượng cá thể loài</p>
<p style="text-align: justify;">-&nbsp; Xây dựng các vườn thực vật, vườn quốc gia, khu bảo tồn… để bảo tồn các loài thực vật, trong đó có thực vật quý hiếm</p>
<p style="text-align: justify;">- Cấm buôn bán và xuất khẩu các loài thực vật quý hiếm</p>
<p style="text-align: justify;">Tuyên truyền, giáo dục rộng rãi trong nhân dân để cùng tham gia bảo vệ rừng.</p>
<p style="text-align: right;"><strong>&nbsp;</strong></p>
<div class="clearfix"></div>`


// string_inner_html = `<h2 class="s14 lineheight"></h2>
// <p><strong class="content_question">Đề bài</strong></p>
// <p style="text-align: justify;"><strong>Cảm nhận vẻ đẹp của hai đoạn thơ sau</strong></p>
// <p style="text-align: justify;"><em>Rải rác biên cương mồ viễn xứ</em></p>
// <p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
// <p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
// <p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em></p>
// <p style="text-align: right;">(<strong>Tây Tiến -</strong>&nbsp;Quang Dũng - Ngữ văn 12, tr89)</p>
// <p style="text-align: justify;"><em>Em ơi em</em></p>
// <p style="text-align: justify;"><em>Đất Nước là máu xương của mình</em></p>
// <p style="text-align: justify;"><em>Phải biết gắn bó và san sẻ</em></p>
// <p style="text-align: justify;"><em>Phải biết hóa thân cho dáng hình xứ sở</em></p>
// <p style="text-align: justify;"><em>Làm nên Đất Nước muôn đời</em></p>
// <p style="text-align: right;">(<strong>Đất Nước</strong>&nbsp;<strong>-&nbsp;</strong>Nguyễn Khoa Điềm&nbsp;<strong>- </strong>Ngữ văn, tr120)</p>
// <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// <p style="text-align: justify;"><strong>1. Giới thiệu chung</strong></p>
// <p style="text-align: justify;"><strong>- Tây Tiến</strong>&nbsp;của Quang Dũng và&nbsp;<strong>Đất Nước</strong>&nbsp;của Nguyễn Khoa Điềm là những bài thơ đặc sắc trong nền thơ cách mạng Việt Nam. Hai tác phẩm này đã nói về những con người vô danh lặng thầm chiến đấu bảo vệ quê hương. Mỗi bài thơ đều để lại những cảm xúc, suy tư sâu lắng trong lòng người đọc. Trong đó có những câu thơ rất đặc sắc:</p>
// <p style="text-align: justify;">“<em>Rải rác biên cương mồ viễn xứ</em></p>
// <p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
// <p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
// <p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em>”</p>
// <p style="text-align: justify;">Và:</p>
// <p style="text-align: justify;"><em>“Em ơi em Đất Nước là máu xương của mình</em></p>
// <p style="text-align: justify;"><em> Phải biết gắn bó và san sẻ</em></p>
// <p style="text-align: justify;"><em> Phải biết hóa thân cho dáng hình xứ sở</em></p>
// <p style="text-align: justify;"><em> Làm nên Đất Nước muôn đời”</em></p>
// <p style="text-align: justify;"><strong>2. Phân tích</strong></p>
// <p style="text-align: justify;"><strong>a. Đoạn thơ trong bài Tây Tiến</strong></p>
// <p style="text-align: justify;"><strong>*Giới thiệu khái quát về tác giả, tác phẩm, vị trí đoạn thơ</strong></p>
// <p style="text-align: justify;">+ Quang Dũng là nghệ sĩ đa tài (thơ, văn, nhạc, hoạ), cũng là một người lính, sống một đời lính oanh liệt, hào hùng. Quãng đời ấy đã trở thành cảm hứng đặc sắc trong thơ ông. Bài thơ Tây Tiến viết về người lính, về những chàng trai“chiến trường đi chẳng tiếc đời xanh”&nbsp;– người lính Tây Tiến.</p>
// <p style="text-align: justify;">+ Tây Tiến là một đơn vị bộ đội thành lập đầu năm 1947. Thành phần chủ yếu là thanh niên trí thức Hà Nội. Nhiệm vụ của họ là phối hợp với bộ đội Lào, đánh tiêu hao lực lượng địch ở Thượng Lào, bảo vệ biên giới Việt Lào. Sau một thời gian hoạt động ở Lào, đoàn quân Tây Tiến trở về Hoà Bình thành lập trung đoàn 52. Năm 1948, nhà thơ Quang Dũng chuyển sang đơn vị khác, không bao lâu, ông nhớ đơn vị cũ sáng tác bài thơ này.</p>
// <p style="text-align: justify;">+ Bài thơ có 4 khổ, đây là khổ thứ 3, nội dung khắc hoạ hình tượng người lính Tây Tiến</p>
// <p style="text-align: justify;"><strong>*Phân tích cụ thể</strong>:</p>
// <p style="text-align: justify;">- Cảm hứng chủ đạo của bài thơ là nỗi nhớ, nhớ về đồng đội và địa bàn hoạt động của đoàn quân, nhớ về vùng đất mà bước chân hào hùng mà đoàn binh Tây Tiến đã đi qua – Tây Bắc. Vùng đất đó với thiên nhiên hoang sơ, hùng vĩ và thơ mộng, trữ tình, vùng đất ấy với những con người tài hoa, duyên dáng và nghĩa tình. Trên nền cảnh ấy là hình ảnh người lính Tây Tiến. Họ hiện lên thật ấn tượng với phẩm chất hào hùng đáng kính, họ đã hi sinh dọc đường hành quân, hi sinh dọc miền biên giới – họ đã hi sinh vì lí tưởng sống cao đẹp:</p>
// <p style="text-align: justify;"><em>Rải rác biên cương mồ viễn xứ</em></p>
// <p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
// <p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
// <p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em></p>
// <p style="text-align: justify;">- Đoạn thơ sử dụng rất nhiều từ Hán Việt mang sắc thái trân trọng, thể hiện không khí trang nghiêm, lòng thành kính thiêng liêng của nhà thơ trước sự hi sinh của đồng đội. Những từ ngữ ấy như những nén tâm nhang thắp lên đưa tiễn những người đã ngã xuống. Chính hệ thống từ ngữ ấy kết hợp với những hình ảnh giàu sức gợi (biên cương, chiến trường, áo bào, khúc độc hành) cũng tạo sắc thái cổ kính, gợi liên tưởng đến sự hi sinh oanh liệt của những anh hùng, dũng tướng sẵn sàng chấp nhận cảnh “da ngựa bọc thây” đầy bi tráng trong văn học trung đại.</p>
// <p style="text-align: justify;">- Câu thơ đầu đoạn thơ sử dụng nhiều từ Hán Việt (biên cương, viễn xứ) nhưng sức nặng của cả câu lại dồn vào một từ thuần Việt:&nbsp;“mồ”.&nbsp;Mồ cũng là mộ nhưng không phải mộ theo đúng nghĩa. Đó chỉ là những nấm đất được đào vội, chôn mau ngay trên con đường hành quân vội vã để đoàn quân lại tiếp tục lên đường. Đặt trong không gian bao la, mênh mông hoang sơ của miền biên giới Việt – Lào, những nấm mồ ấy gợi lên bao nỗi xót xa.</p>
// <p style="text-align: justify;">- Trong câu thơ thứ hai, tác giả sử dụng nghệ thuật đảo ngữ (chiến trường đi) để nhấn mạnh đích đến của người lính, người chiến sĩ. Trong hoàn cảnh đất nước có chiến tranh, sứ mệnh đất nước rất mỏng manh, chiến trường là đích đến duy nhất, là sự lựa chọn đầy trách nhiệm của cả một thế hệ. Với họ, “đường ra trận mùa này đẹp lắm” và “cuộc đời đẹp nhất trên trận chiến chống quân thù”. Cách nói&nbsp;“chẳng tiếc đời xanh”&nbsp;cho thấy sự dứt khoát, lòng quyết tâm, coi thường gian nguy, coi thường cái chết. Họ sẵn sàng hiến dâng cả đời xanh, tuổi trẻ, quãng đời đẹp nhất cho tổ quốc, hơn thế nữa, tính mạng của họ cũng sẵn sàng hi sinh để làm nên dáng hình đất nước. Họ ra đi với tinh thần của cả thời đại“Người ra đi đầu không ngoảnh lại”. Đó là lí tưởng sống cao đẹp, hào hùng.</p>
// <p style="text-align: justify;">- Viết về người lính và cuộc kháng chiến vĩ đại của dân tộc ta, nhà thơ Quang Dũng rất chân thực, ông không hề né tránh hiện thực:</p>
// <p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
// <p style="text-align: justify;">“Áo bào thay chiếu”&nbsp;– một hình ảnh thực đến xót xa của chiến tranh. Nhưng cái thiếu thốn về vật chất lại được khoả lấp bằng sự hiên ngang, can trường của người lính. Từ Hán Việt và cách nói&nbsp;“Áo bào thay chiếu anh về đất”làm cho cái chết của người lính Tây Tiến trở nên trang trọng hơn rất nhiều, thiêng liêng hơn nhiều. Nhà thơ vẫn gợi lên sự thật chung của cả thời chống Pháp là sự thiếu thốn về vật chất, ở vùng biên giới xa xôi thì sự thiếu thốn ấy còn nhân lên gấp bội. Với thái độ trân trọng đồng đội, nhà thơ Quang Dũng đã thấy họ như đang mặc tấm áo bào của chiến tướng mà&nbsp;đi vào cõi vĩnh hằng, bất tử cùng sông núi. Cách nói&nbsp;“về đất”&nbsp;không chỉ&nbsp; là cách nói giảm, nói tránh mà mang ý nghĩa biểu tượng thiêng liêng. Cái chết không phải là ra đi vào cõi hư vô bất định mà là trở về, trở về với đất Mẹ yêu thương. Đất Mẹ cũng đã mở lòng đón những đứa con đầy trách nhiệm của mình trở về.&nbsp; Họ đã ra đi như thế đấy. Họ đã nằm lại nơi chân đèo, dốc núi nào đó trên con đường hành quân đầy gian khổ, nhọc nhằn, họ đã để lại mình nơi biên cương lạnh lẽo, hoang vắng. Nhưng họ đã ra đi vì lí tưởng, cái chết của họ &nbsp;dù để lại nhiều xót xa trong lòng người đọc nhưng họ ra đi một cách rất thanh thản. Họ chỉ là “không bước nữa”, là “bỏ quên đời”, là “về đất”&nbsp;thôi chứ không phải là chết. các anh đã ngã xuống, đã “hoá thân cho dáng hình xứ sở” để rồi mỗi thế núi hình sông, mỗi tên đất tên làng đều có bóng hình các anh. Các anh hi sinh, trở về trong lòng Đất Mẹ để&nbsp;“cho cây đời mãi mãi xanh tươi”, để đem lại cho đất đai, cho quê hương đất nước sự sống bất tận.</p>
// <p style="text-align: justify;">- Đoạn thơ kết thúc bằng một âm hưởng hào hùng. Dường như linh hồn người tử sĩ đã hòa cùng sông núi, con sông Mã đã tấu lên khúc nhạc đau thương, hùng tráng để tiễn đưa người lính vào cõi bất tử. Hình tượng “sông Mã” ở cuối bài thơ được phóng đại và nhân hóa, tô đậm cái chết bi hùng của người lính_ sự hi sinh làm lay động đất trời, khiến dòng sông gầm lên đớn đau, thương tiếc.</p>
// <p style="text-align: justify;">* Nghệ thuật</p>
// <p style="text-align: justify;"><strong> </strong>- Bằng bút pháp lãng mạn và âm hưởng bi tráng, đoạn thơ ngợi ca những phẩm chất tốt đẹp của người lính Tây Tiến trong cuộc kháng chiến chống Pháp.</p>
// <p style="text-align: justify;"><strong>b. Đoạn thơ trong bài “Đất Nước” của Nguyễn Khoa Điềm là lời nhắn nhủ của nhà thơ về trách nhiệm của thế hệ trẻ đối với non sông đất nước:</strong></p>
// <p style="text-align: justify;"><strong>*Giới thiệu khái quát về tác giả, tác phẩm:</strong></p>
// <p style="text-align: justify;">+ Nguyễn Khoa Điềm là một trong những nhà thơ tiêu biểu của thế hệ các nhà thơ trẻ thời chống Mỹ .&nbsp;Ông&nbsp;xuất thân từ một gia đình trí thức cách mạng ở Huế, bản thân ông tham gia trực tiếp vào phong trào đấu tranh sinh viên nên thơ Nguyễn Khoa Điềm rất giàu chất suy tư, cảm xúc dồn nén mang tâm tư của người trí thức….</p>
// <p style="text-align: justify;">+ Đất Nứơc là phần đầu chương V của trường ca Mặt đường khát vọng, viết năm 1971 tại chiến khu Trị Thiên giữa lúc cuộc kháng chiến chống Mĩ đang hết sức khốc liệt .</p>
// <p style="text-align: justify;"><strong>*Phân tích cụ thể</strong><strong>:</strong></p>
// <p style="text-align: justify;"><em> “Em ơi em Đất Nước là máu xương của mình</em></p>
// <p style="text-align: justify;"><em> Phải biết gắn bó và san sẻ</em></p>
// <p style="text-align: justify;"><em> Phải biết hóa thân cho dáng hình xứ sở</em></p>
// <p style="text-align: justify;"><em> Làm nên Đất Nước muôn đời”</em></p>
// <p style="text-align: justify;">– Đoạn thơ có giọng điệu tâm tình sâu lắng, thiết tha. Tác giả tạo ra cuộc trò chuyện thân mật giữa nhân vật trữ tình “anh” với “em”. Giọng điệu ấy đã làm mềm hóa nặng nề, khô khan của chất chính luận.</p>
// <p style="text-align: justify;">– Nguyễn Khoa Điềm đã khám phá một định luật rất mới “Đất Nước là máu xương của mình”. Hình ảnh so sánh độc đáo ấy có hàm ý khẳng định: Đất nước là sự sống thiêng liêng đối với mỗi con người.</p>
// <p style="text-align: justify;">Nguyễn Khoa Điềm nhắc nhở mỗi người chúng ta phải biết trân trọng đất nước hôm nay.</p>
// <p style="text-align: justify;">– Từ việc xác định vai trò quan trọng của đất nước đối với mỗi con người, nhà thơ khơi gợi ý thức trách nhiệm của mỗi công dân, nhất là thế hệ trẻ. Phép điệp ngữ “phải biết” vừa có ý nghĩa cầu khiến vừa là lời thiết tha, mong chờ như mệnh lệnh từ trái tim. Ba cụm động từ cụ thể hóa trách nhiệm của mỗi con người: “Gắn bó” là lời kêu gọi đoàn kết, hữu ái giai cấp. Vì có đoàn kết là có sức mạnh. “San sẻ” là mong muốn mỗi người có ý thức gánh vác trách nhiệm với quê hương. Còn “hóa thân” là biểu hiện tinh thần sẵn sàng hi sinh cho đất nước, là sự dâng hiến thiêng liêng, đẹp đẽ.</p>
// <p style="text-align: justify;">* Nghệ thuật:</p>
// <p style="text-align: justify;"><strong> </strong>– Đoạn thơ mang tính chính luận nhưng được diễn đạt bằng hình thức đối thoại, giọng điệu trữ tình kết hợp với biện pháp tu từ điệp ngữ. Từ “Đất Nước” dược lặp lại hai lần kết hợp cách viết hoa đã tăng thêm sự tôn kính thiêng liêng, thể hiện quan niệm lớn: “Đất Nước của nhân dân”.</p>
// <p style="text-align: justify;"><strong>c. So sánh:</strong></p>
// <p style="text-align: justify;"><strong>* Giống nhau:</strong></p>
// <p style="text-align: justify;">Tư tưởng của cả hai đoạn thơ đều là tư tưởng cao đẹp: cống hiến, dâng hiến tuổi trẻ mình cho đất nước non sông.</p>
// <p style="text-align: justify;"><strong>* Khác nhau:</strong></p>
// <p style="text-align: justify;">– “Tây Tiến” với cảm hứng đất nước được gợi lên từ nỗi nhớ cũa người lính vùng cao về những năm tháng đầu của cuộc kháng chiến chống thực dân Pháp. “Đất Nước” hoàn thành trong cuộc kháng chiến chống đế quốc Mĩ tại mặt trận Trị Thiên bộc lộ cảm hứng đất nước qua cái nhìn tổng quát đưa đến những chiêm nghiệm mới mẻ, sâu sắc về đất nước: Đất nước là tất cả những gì gắn bó máu thịt với mỗi con người.</p>
// <p style="text-align: justify;">-Đoạn thơ trong bài&nbsp;Tây Tiến&nbsp;được viết bằng thể thơ thất ngôn, có sử dụng nhiều từ Hán Việt trang trọng với giọng điệu thơ dứt khoát, mạnh mẽ, âm hưởng hào hùng&nbsp; để tô đậm hiện thực khốc liệt của chiến tranh và khẳng định sự bất tử của người chiến sĩ vô danh.</p>
// <p style="text-align: justify;">- Đoạn thơ trong&nbsp;Đất Nước&nbsp;được viết bằng thể thơ tự do, giọng điệu tâm tình trò chuyện, từ ngữ giản dị, gần gũi nhằm khẳng định vai trò to lớn của nhân dân vô danh.</p>
// <p style="text-align: justify;"><strong>Lí giải :</strong></p>
// <p style="text-align: justify;">Sự khác biệt như trên &nbsp;:</p>
// <p style="text-align: justify;">Do hoàn cảnh sáng tác</p>
// <p style="text-align: justify;">Do phong cách, cá tính sáng tạo của mỗi nhà thơ</p>
// <p style="text-align: justify;"><strong>3. Tổng kết</strong></p>
// <p style="text-align: justify;">Đánh giá chung về giá trị hai đoạn thơ và tài năng nghệ thuật của hai tác giả</p>
// <p style="text-align: right;"><strong></strong></p>
// <div class="clearfix"></div>`;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let dom = new JSDOM('<!doctype html><html><body></body></html>');
let document = dom.window.document;
var build = new Build(document, null);
build.init(string_inner_html)
