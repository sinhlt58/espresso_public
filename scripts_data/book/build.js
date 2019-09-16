
// "use strict";

const TreeModel = require('tree-model')
const DEFAULT_MULTIPLE_CHOISE_REGEX = /^\s{0,}(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])((\([A-Ea-e]\)[\.\:]{0,1})|([A-Ea-e][\.\:]))(?=.{1})/g

const DEFAULT_PRIORITY = [
    {
        numerical_order: 1, // đề
        type: 'exam',
        group: 'question',
        is_one_line: false,
        regex: /^(\s{0,2}Đề)(?!(\s{0,}bài)).{0,}/g,
        inline_regex: /(?<!(I\.\s))\s{0,}Đề(?!(\s{0,}bài))/g,
        is_inline_regex_all: false,
        is_in_solution: true,
    },
    {
        numerical_order: 2, // phần , neu can update de loai bo truong hop I.12 va 12:Iadsadsad trong regex cua "câu bằng số", A. Phần .... (co nen hay khong?)
        type: 'part',
        group: 'question',
        is_one_line: false,
        regex: /^(\s{0,}.{0,3}(((X|IX|VI{0,3}|IV|I{1,3})[.:]\s{0,}(PHẦN TRẮC NGHIỆM|Phần trắc nghiệm|PHẦN TỰ LUẬN|Phần tự luận|PHẦN LÀM VĂN|Phần làm văn|PHẦN LUYỆN TẬP|Phần luyện tập|PHẦN ĐỌC.{1,3}HIỂU|Phần đọc.{1,3}hiểu|Phần Đọc.{1,3}Hiểu|Phần|PHẦN|TRẮC NGHIỆM|trắc nghiệm|Trắc nghiệm|TỰ LUẬN|tự luận|Tự luận|ĐỌC.{1,3}HIỂU|LUYỆN TẬP))|PHẦN TRẮC NGHIỆM|Phần trắc nghiệm|PHẦN TỰ LUẬN|Phần tự luận|PHẦN LÀM VĂN|Phần làm văn|PHẦN LUYỆN TẬP|Phần luyện tập|PHẦN ĐỌC.{1,3}HIỂU|Phần đọc.{1,3}hiểu|Phần Đọc.{1,3}Hiểu|Phần|PHẦN|TRẮC NGHIỆM|trắc nghiệm|Trắc nghiệm|TỰ LUẬN|tự luận|Tự luận|ĐỌC.{1,3}HIỂU|LUYỆN TẬP|(X|IX|VI{0,3}|IV|I{1,3})[.:]){1}.{0,25}$)/g,
        inline_regex: /\s{0,}(((X|IX|VI{0,3}|IV|I{1,3})[.:]\s{0,}(PHẦN TRẮC NGHIỆM|Phần trắc nghiệm|PHẦN TỰ LUẬN|Phần tự luận|PHẦN LÀM VĂN|Phần làm văn|PHẦN LUYỆN TẬP|Phần luyện tập|PHẦN ĐỌC.{1,3}HIỂU|Phần đọc.{1,3}hiểu|Phần Đọc.{1,3}Hiểu|Phần|PHẦN|TRẮC NGHIỆM|trắc nghiệm|Trắc nghiệm|TỰ LUẬN|tự luận|Tự luận|ĐỌC.{1,3}HIỂU|LUYỆN TẬP))|PHẦN TRẮC NGHIỆM|Phần trắc nghiệm|PHẦN TỰ LUẬN|Phần tự luận|PHẦN LÀM VĂN|Phần làm văn|PHẦN LUYỆN TẬP|Phần luyện tập|PHẦN ĐỌC.{1,3}HIỂU|Phần đọc.{1,3}hiểu|Phần Đọc.{1,3}Hiểu|Phần|PHẦN|TRẮC NGHIỆM|trắc nghiệm|Trắc nghiệm|TỰ LUẬN|tự luận|Tự luận|ĐỌC.{1,3}HIỂU|LUYỆN TẬP|(X|IX|VI{0,3}|IV|I{1,3})[.:]){1}/g,
        is_inline_regex_all: false,
        is_in_solution: true,
    },
    {
        numerical_order: 3, // câu label
        type: 'question_by_label',
        group: 'question',
        is_one_line: false,
        regex: /^(\s{0,}(Ý|Câu|Bài))\s{0,}[A-Z0-9]{1,}[\.\:]{0,}[A-Za-z0-9]{0,}/g,
        inline_regex: /\s{0,}(Ý|Câu|Bài)\s{0,}[A-Z0-9]{1,}[\.\:]{0,}[A-Za-z0-9]{0,}/g,
        is_inline_regex_all: false,
        is_in_solution: true,
    },
    {
        numerical_order: 4, // câu bằng số
        type: 'question_by_number',
        group: 'question',
        is_one_line: false,
        // do A-F se nham voi multiplechoise nen chi de G-Z
        // regex: /^(\s{0,}[G-Z0-9]{1,})[\.\:]{1,}[A-Z0-9]{0,}/g,
        regex: /^(\s{0,}[0-9]{1,})[\.\:]{1,}[A-Z0-9]{0,}/g,
        inline_regex: /(?<!(Câu))(?<!(Ý))(?<!(Bài))(?<!(Đề))(?<!(Câu\s))(?<!(Ý\s))(?<!(Bài\s))(?<!(Đề\s))\s{0,}[0-9]{1,}[\.\:]{1,}[A-Z0-9]{0,}/g,
        is_inline_regex_all: false,
        is_in_solution: true,
    },
    {
        numerical_order: 5, // phần nhỏ
        type: 'sub_part',
        group: 'question',
        is_one_line: false,
        regex: /^(\s{0,}[a-z]{1,})[\.\:]{0,}[A-Za-z0-9]{0,}\s{0,}\){1,}/g,
        inline_regex: /\s{0,}(?<![A-Za-z0-9\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])[a-z]{1,}[\.\:]{0,}[A-Za-z0-9]{0,}\s{0,}\){1,}/g,
        is_inline_regex_all: false,
        is_in_solution: true,
    },
    {
        numerical_order: 6, // các phương án trả lời
        type: 'multiple_choise',
        group: 'answer',
        is_one_line: false,
        // dang bi "Các loại cây (A)" cung nhan
        regex: DEFAULT_MULTIPLE_CHOISE_REGEX,
        inline_regex: /(?<!(Câu))(?<!(Ý))(?<!(Bài))(?<!(Đề))(?<!(Câu\s))(?<!(Ý\s))(?<!(Bài\s))(?<!(Đề\s))(?<!(I\.\s))(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])\s{0,}((\([A-Ea-e]\)[\.\:]{0,1})|([A-Ea-e][\.\:]))(?=.{1})/g,
        is_inline_regex_all: true,
        is_in_solution: false,
    },
    {
        numerical_order: 6, // phuong phap giai
        type: 'solution',
        group: 'answer',
        is_one_line: false,
        is_lower_case: true,
        regex: /^(\s{0,}(phương pháp giải))/g,
        inline_regex: null,
        is_inline_regex_all: false,
        is_in_solution: false,
    },
    {
        numerical_order: 6, // loi giai
        type: 'solution_detail',
        group: 'answer',
        is_one_line: false,
        is_lower_case: true,
        // tieng viet 2: goi y la phuong phap giai va 1 dong
        regex: /^(\s{0,}(hướng dẫn trả lời|gợi ý trả lời|trả lời|trả lời|lời giải|cách giải|gợi ý làm bài|làm bài|gợi ý|đáp án|bài làm|giải|giải))/g,
        inline_regex: null,
        is_inline_regex_all: false,
        is_in_solution: false,
    }
]

const DEFAULT_REPLACES = [
    {
        from: /Trích: loigiaihay.com/g,
        to: ''
    },
    {
        from: /Trích: Loigiaihay.com/g,
        to: ''
    },
    {
        from: /loigiaihay.com/g,
        to: ''
    },
    {
        from: /loigaihay.com/g,
        to: ''
    },
    {
        from: /Loigiaihay.com/g,
        to: ''
    },
    {
        from: /Sachbaitap.com/g,
        to: ''
    },
    {
        from: /Lựa chọn câu để xem lời giải nhanh hơn/g,
        to: ''
    },
    {
        from: /<h1/g,
        to: '<p'
    },
    {
        from: /<h2/g,
        to: '<p'
    },
    {
        from: /<h3/g,
        to: '<p'
    },
    {
        from: /<h4/g,
        to: '<p'
    },
    {
        from: /<h5/g,
        to: '<p'
    },
    {
        from: /<h6/g,
        to: '<p'
    },
    {
        from: /https:\/\/img\.\/picture/g,
        to: 'https://img.loigiaihay.com/picture'
    },
    {
        from: /- Xem chi tiết/g,
        to: ''
    },
    {
        from: /\\\)\\\(/g,
        to: '$$$ $$$'
    },
    {
        from: /\\\(/g,
        to: '$$$'
    },
    {
        from: /\\\)/g,
        to: '$$$'
    }
]

const DEFAULT_INLINE_TAG_REGEX = /<code>|<em>|<i>|<q>|<sub>|<sup>|<u>/g;
const DEFAULT_ABSTRACT_SOLUTION_SELECTOR = "p .content_detail";
const DEFAULT_ABSTRACT_PROBLEM_SELECTOR = "p .content_question";
const DEFAULT_NODES_IGNORE_CHECK_TEXT_REGEX = /(IMG|TABLE)/g
// const DEFAULT_QUESTION_WORD_LIST = ["tại sao", "thế nào", "định nghĩa", "ra sao", "có cách nào", "cái gì", "vì sao", "bằng cách nào", "là gì",
//     "làm sao", "chỗ nào", "gì", "nghĩ sao", "nơi nào", "ở đâu", "thì sao", "lúc nào", "đi đâu", "thấy sao", "lý do nào", "nơi đâu", "sao",
//     "nguyên nhân nào", "từ đâu", "bao nhiêu", "khi nào", "đâu", "bao giờ", "thời gian nào", "có phải", "bao", "người nào", "là ai", "có mấy",
//     "nào", "ai", "mấy", "nguyên nhân", "thật không", "như thế nào", "lý do", "phải không"]
// const DEFAULT_QUESTION_REGEX = /\?|hãy|tại sao|thế nào|định nghĩa|ra sao|có cách nào|cái gì|vì sao|bằng cách nào|là gì|làm sao|chỗ nào|gì|nghĩ sao|nơi nào|ở đâu|thì sao|lúc nào|đi đâu|thấy sao|lý do nào|nơi đâu|sao|nguyên nhân nào|từ đâu|bao nhiêu|khi nào|đâu|bao giờ|thời gian nào|có phải|bao|người nào|là ai|có mấy|nào|ai|mấy|nguyên nhân|thật không|như thế nào|lý do|phải không/gi
const DEFAULT_SOLUTION_TYPES = ['solution', 'solution_detail']
const DEFAULT_CHECK_SAME_TYPE = 1;
const DEFAULT_CHARACTER_REGEX = /(?<![A-Za-z0-9\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])[A-Ea-e](?![A-Za-z0-9\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])/g;
const DEFAULT_ANWSER_MULTIPLE_CHOISE_INLINE_REGEX = /(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])((\([A-Ea-e]\)[\.\:]{0,1})|([A-Ea-e][\.\:])|[A-Ea-e](?![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]))/g
const DEFAULT_NUMBER_REGEX = /\d+/g;

const DEFAULT_TABLE_TYPES = {
    "00": "_getVerticalDifferent",
    "01": "_getVerticalSame",
    "10": "_getHorizontalDifferent",
    "11": "_getHorizontalSame"
}

class Build {
    constructor(document, logger) {
        this._document = document;
        this._logger = logger;

        this._priority = DEFAULT_PRIORITY
        this._abstract_solution_selector = DEFAULT_ABSTRACT_SOLUTION_SELECTOR
        this._abstract_problem_selector = DEFAULT_ABSTRACT_PROBLEM_SELECTOR
        this._nodes_ignore_check_text_regex = DEFAULT_NODES_IGNORE_CHECK_TEXT_REGEX
        this._solution_types = DEFAULT_SOLUTION_TYPES
        this._check_same_type = DEFAULT_CHECK_SAME_TYPE
        this._table_types = DEFAULT_TABLE_TYPES;
        this._table_ids = Object.keys(this._table_types)
        this._character_regex = DEFAULT_CHARACTER_REGEX
        this._number_regex = DEFAULT_NUMBER_REGEX
        this._answer_multiple_choise_inline_regex = DEFAULT_ANWSER_MULTIPLE_CHOISE_INLINE_REGEX
        this._replaces = DEFAULT_REPLACES
        this._inline_tag_regex = DEFAULT_INLINE_TAG_REGEX
        this._multiple_choise_regex = DEFAULT_MULTIPLE_CHOISE_REGEX

        let text_node = this._document.createTextNode("{{}}(10)");
        this._spec_self_essay = this._document.createElement('p')
        this._spec_self_essay.appendChild(text_node);

        text_node = this._document.createTextNode("<explain>");
        this._explain = this._document.createElement('p');
        this._explain.appendChild(text_node);

        text_node = this._document.createTextNode('===');
        this._bulkhead = this._document.createElement('div');
        this._bulkhead.appendChild(text_node);
        this._bulkhead.className = 'subTitle'
    }

    setStringInnerHtml(string_inner_html) {
        this._string_inner_html = string_inner_html;
    }

    setAbstractSolutionSelector(abstract_solution_selector) {
        this._abstract_solution_selector = abstract_solution_selector
    }

    setAbstractProblemSelector(abstract_problem_selector) {
        this._abstract_problem_selector = abstract_problem_selector
    }

    getResult() {
        return this._result;
    }

    hasIndexUnexported() {
        return this._index_unexported.length > 0;
    }

    isSiblingsSameType() {
        return this._is_siblings_same_type;
    }

    isAllHaveSolution() {
        return this._is_all_have_solution;
    }

    /**
     * Xóa hoặc thay thế các từ không cần thiết
     */
    _cleanRedundantString() {
        for (let index = 0; index < this._replaces.length; index++) {
            this._string_inner_html = this._string_inner_html.replace(this._replaces[index].from, this._replaces[index].to)
        }
    }

    /**
     * Xóa các node không cần thiết
     */
    _cleanRedundantNode() {

        let title_remove = this._element.querySelector(".lineheight");
        if (title_remove) title_remove.remove();

        let img_remove = this._element.querySelector("img#method_colapse_icon");
        if (img_remove) img_remove.remove();

        let a_remove = this._element.querySelector("a");
        if (a_remove) a_remove.remove();

        this._shiftDivElement();
        this._shiftBrElement();
        this._cleanString();

    }

    /**
     * Loại bỏ các thẻ div để đẩy các thẻ p lên ngang hàng
     */
    _shiftDivElement() {
        while (true) {
            let has_div = false;
            for (let index = this._element.children.length - 1; index >= 0; index--) {
                let child = this._element.children[index];
                let name_child = child.nodeName;
                if (name_child != 'DIV' || child.children == null) continue;
                has_div = true;
                let ref_node = child;
                for (let i = 0; i < child.children.length; i++) {
                    let insert_node = child.children[i].cloneNode(true);
                    ref_node.after(insert_node);
                    ref_node = insert_node;
                }
                child.remove();
            }
            if (!has_div) break;
        }
    }

    /**
     * Loại bỏ các thẻ br để đẩy các đáp án lên ngang hàng
     */
    _shiftBrElement() {
        for (let index = this._element.children.length - 1; index >= 0; index--) {
            let child = this._element.children[index];
            let name_child = child.nodeName;
            if (name_child != 'P' || child.children == null) continue;
            let strong_node = child.querySelector('strong');
            if (!strong_node) continue;
            let ref_node = child;
            let array_element = []
            let p_element = this._document.createElement('p');
            for (let i = 0; i < child.childNodes.length; i++) {
                let node_child = child.childNodes[i];
                if (node_child.nodeName == 'BR' && i > 0) {
                    array_element.push(p_element.cloneNode(true));
                    p_element = this._document.createElement('p');
                } else if (node_child.nodeName != 'BR') {
                    p_element.appendChild(node_child.cloneNode(true));
                }
                if (node_child.nodeName != 'BR' && i == child.childNodes.length - 1) {
                    array_element.push(p_element.cloneNode(true));
                }
            }
            for (let i = array_element.length - 1; i >= 0; i--) {
                ref_node.after(array_element[i]);
            }
            child.remove();
        }
    }

    _cleanString() {
        for (let index = this._element.children.length - 1; index >= 0; index--) {
            let child = this._element.children[index];
            let name_child = child.nodeName;
            if (name_child != 'P' || child.children == null) continue;
            let text = child.textContent;
            if (!text) continue;
            if ((text.includes('Xem thêm: ') && text.includes('Tuyensinh247.com')) || text.includes('Click vào Bài tiếp theo')) {
                child.remove()
            }
        }
    }

    _standardizedStructElement() {

        this._abstract_solution_index = this._findStartAbstractSolution();
        if (this._abstract_solution_index === 0) {
            this._element.children[0].remove();
            this._abstract_solution_index = this._element.children.length;
        } else {
            let tmp_question_default;
            if (this._question_default.length > 2) {
                tmp_question_default = this._question_default.substring(0, this._question_default.length - 3)
            } else {
                tmp_question_default = this._question_default
            }
            let check_exist_default_question = this._element.innerHTML.includes(tmp_question_default)
            if (!check_exist_default_question) {

                let matches = []
                for (let i = 0; i < this._priority.length; i++) {
                    const child_priority = this._priority[i];
                    if (child_priority.inline_regex === null) continue;
                    let match;
                    while (match = child_priority.inline_regex.exec(this._question_default)) {
                        if (match.index === 0 || match.index === this._question_default.length - 1) continue;
                        matches.push(match.index)
                    }
                }

                let current_element = this._element.children[0];
                if (matches.length > 0) {
                    matches.sort((index_1, index_2) => index_1 - index_2);
                    if (matches[matches.length - 1] < this._question_default.length - 1) matches.push(this._question_default.length - 1)
                    let current_index = 0;
                    for (let index = 0; index < matches.length; index++) {
                        let last_index = matches[index];
                        let text = this._question_default.substring(current_index, last_index);
                        current_index = last_index
                        let insert_element = this._document.createElement('p')
                        let text_element = this._document.createTextNode(text)
                        insert_element.appendChild(text_element)
                        current_element.before(insert_element);
                    }
                } else {
                    let insert_element = this._document.createElement('p')
                    let text_element = this._document.createTextNode(this._question_default)
                    insert_element.appendChild(text_element)
                    current_element.before(insert_element);
                }
            }
        }

        for (let index = this._element.children.length - 1; index >= 0; index--) {
            let current_element = this._element.children[index];
            let text_inner = this._getInnerTextWithInlineTag(current_element, true);
            if (text_inner === undefined || text_inner === null) continue;
            let matches = [];
            for (let i = 0; i < this._priority.length; i++) {
                const child_priority = this._priority[i];
                if (child_priority.inline_regex === null || child_priority.is_inline_regex_all === false) continue;
                let match;
                while (match = child_priority.inline_regex.exec(text_inner)) {
                    if (match.index === 0 || match.index === text_inner.length - 1) continue;
                    matches.push(match.index)
                }
            }

            let ref_element = current_element;
            if (matches.length > 0) {
                matches.sort((index_1, index_2) => index_1 - index_2);
                if (matches[matches.length - 1] < text_inner.length - 1) matches.push(text_inner.length - 1)
                let current_index = 0;
                for (let index = 0; index < matches.length; index++) {
                    let last_index = matches[index];
                    let text = text_inner.substring(current_index, last_index);
                    current_index = last_index
                    let insert_element = this._document.createElement('p')
                    let text_element = this._document.createTextNode(text)
                    insert_element.appendChild(text_element)
                    ref_element.before(insert_element);
                }
                current_element.remove();
            }
        }
    }

    _getInnerTextWithInlineTag(node, is_plan_text) {
        if (node.nodeName.search(this._nodes_ignore_check_text_regex) > -1) return null;
        let innerHtml = node.innerHTML;
        if (innerHtml.search(this._inline_tag_regex) < 0) return node.textContent;
        return this._getInnerTextWithSubInlineTag(node, "", is_plan_text);
    }

    _getInnerTextWithSubInlineTag(node, text, is_plan_text) {
        for (let index = 0; index < node.childNodes.length; index++) {
            const child_node = node.childNodes[index];
            const name = child_node.nodeName;
            if (
                (!is_plan_text && (name == "CODE" || name == "EM" || name == "I" || name == "Q" || name == "SUB" || name == "SUP" || name == "U"))
                // do truong truong hop <u>B.</u> la dap dan nen phai dung cach nay
                || (is_plan_text && (name == "SUB" || name == "SUP"))
            ) {
                text += child_node.outerHTML;
            } else {
                let innerHtml = child_node.innerHTML;
                if (innerHtml != undefined && innerHtml.search(this._inline_tag_regex) > -1) {
                    text += this._getInnerTextWithSubInlineTag(child_node, "", is_plan_text)
                } else {
                    text += child_node.textContent.replace(/&nbsp;/g, '');
                }
            }

        }
        return text;
    }

    _findStartAbstractProblem() {
        return this._findIndexBySelector(this._abstract_problem_selector, -1);
    }

    _findStartAbstractSolution() {
        let fist_find = -1;
        if (this._abstract_solution_selector) {
            fist_find = this._findIndexBySelector(this._abstract_solution_selector, this._element.children.length);
        }
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

    _getNumberFromPlan(plan) {
        if (plan.length > 1) {
            let valid_plan = plan.match(this._character_regex);
            plan = valid_plan[0]
        }
        let number_of_character = plan.charCodeAt(0);
        if (number_of_character >= 97) return number_of_character - 97;
        return number_of_character - 65;
    }


    init(string_inner_html, question_default, title, book, is_theory) {

        this._element = this._document.createElement("div");

        this._string_inner_html = string_inner_html
        this._question_default = question_default;
        this._title = title;
        this._book = book;

        if (this._tree) delete this._tree
        if (this._root_problem) delete this._root_problem;
        if (this._root_solution) delete this._root_solution;
        if (this._index_unexported) delete this._index_unexported;
        if (this._result) delete this._result;
        this._index_unexported = [];
        this._is_siblings_same_type = true;
        this._is_all_have_solution = true;

        if (is_theory) {
            this._cleanRedundantString()
            this._element.innerHTML = this._string_inner_html;
            this._result = this._element.cloneNode(true);
        } else {
            try {
                this._cleanRedundantString();
                this._element.innerHTML = this._string_inner_html;
                this._cleanRedundantNode();
                this._standardizedStructElement()
                this._string_inner_html = this._element.innerHTML;

                this._abstract_problem_index = this._findStartAbstractProblem();
                this._abstract_solution_index = this._findStartAbstractSolution();

                this._tree = new TreeModel()
                this._root_problem = this._tree.parse({
                    numerical_order: -1,
                    text: "root",
                    is_one_line: false,
                    indexs: [],
                    sub_indexs: [],
                    plan_indexs: [],
                    solution_indexs: [],
                    solution_detail_indexs: [],
                    answer_multiple_choises: [],
                    group: "root",
                    label: "root",
                    type: "root",
                    answer: {},
                });

                if (this._abstract_solution_index > -1 && this._abstract_solution_index < this._element.children.length) {
                    this._root_solution = this._tree.parse({
                        numerical_order: -1,
                        text: "root",
                        is_one_line: false,
                        indexs: [],
                        sub_indexs: [],
                        plan_indexs: [],
                        solution_indexs: [],
                        solution_detail_indexs: [],
                        answer_multiple_choises: [],
                        group: "root",
                        label: "root",
                        type: "root",
                        answer: {},
                    });
                }

                this._buildTree();
                this._buildResult();
            } catch (error) {
                console.log(error)
                if(this._logger) {
                    this._logger.error('Có lỗi trong quá trình phân tích dữ liệu của bài: "' + this._title + '", trong sách: "' + this._book + '"')
                }
            }

            this._root_problem.all(node => {
                console.log(" ".repeat(node.getPath().length * 2) + node.model.text,
                    node.model.indexs, node.model.sub_indexs, node.model.plan_indexs,
                    node.model.solution_indexs, node.model.solution_detail_indexs,
                    node.model.group, node.model.label, node.model.type, node.model.is_merge_wrong, node.model.answer, node.model.tag)
            })
            // // if (this._root_solution) {
            // //     console.log('\n')
            // //     this._root_solution.all(node => {
            // //         console.log(" ".repeat(node.getPath().length * 2) + node.model.text,
            // //             node.model.indexs, node.model.sub_indexs, node.model.plan_indexs,
            // //             node.model.solution_indexs, node.model.solution_detail_indexs,
            // //             node.model.group, node.model.label, node.model.type)
            // //     })
            // // }
            // // console.log(this._index_unexported, this._is_siblings_same_type, this._is_all_have_solution)
            // console.log(this._result.innerHTML)
        }
    }

    _insertHeading5(model) {
        // lay phan text dau tien
        let first_text = model.text;
        let firts_index = -1;
        for (let i = 0; i < model.indexs.length; i++) {
            const index = model.indexs[i];
            const sub_element = this._element.children[index];
            if (sub_element.nodeName.search(this._nodes_ignore_check_text_regex) === -1) {
                firts_index = i;
                first_text = this._getInnerTextWithInlineTag(sub_element);
                break;
            }
        }
        let title_element = this._document.createElement('h5');
        let text_node = this._document.createTextNode(first_text);
        title_element.appendChild(text_node);
        this._result.appendChild(title_element);

        // them cac indexs sau
        if (model.tag_param) {
            this._insertHeading6(model, firts_index);
        } else {
            this._insertNormal(model.indexs, firts_index);
        }
    }

    _insertHeading6(model, ignore_index) {
        let nodes_ignore_check_text = [];
        let nodes_check_text = [];
        let param_element = this._document.createElement('h6');
        for (let i = 0; i < model.indexs.length; i++) {
            if (i === ignore_index) continue;
            const index = model.indexs[i];
            const sub_element = this._element.children[index];
            if (sub_element.nodeName.search(this._nodes_ignore_check_text_regex) === -1) {
                let text = this._getInnerTextWithInlineTag(sub_element);
                let text_node = this._document.createTextNode(text);
                nodes_check_text.push(text_node)
                if (i !== model.indexs.length - 1) nodes_check_text.push(this._document.createElement('br'));
            } else {
                nodes_ignore_check_text.push(sub_element)
            }
        }

        for (let i = 0; i < nodes_check_text.length; i++) {
            param_element.appendChild(nodes_check_text[i].cloneNode(true));
        }
        if (nodes_check_text.length > 0) this._result.appendChild(param_element);

        for (let i = 0; i < nodes_ignore_check_text.length; i++) {
            this._result.appendChild(nodes_ignore_check_text[i].cloneNode(true));
        }
    }

    _insertNormal(indexs, ignore_index) {
        for (let i = 0; i < indexs.length; i++) {
            if (i === ignore_index) continue;
            const index = indexs[i];
            const sub_element = this._element.children[index];
            this._result.appendChild(sub_element.cloneNode(true));
        }
    }

    _convertSpecCharacter(text) {
        let tmp_text = text.substring(0, text.length);
        let array_math_2 = tmp_text.match(/(\$\$)([^\$]*?)\1/g)
        if (array_math_2 != null) {
            for (let j = 0; j < array_math_2.length; j++) {
                const math = array_math_2[j];
                tmp_text = tmp_text.replace(math, "_".repeat(math.length))
            }
        }
        let array_math_3 = tmp_text.match(/(\$\$\$)([^\$]*?)\1/g)
        if (array_math_3 != null) {
            for (let j = 0; j < array_math_3.length; j++) {
                const math = array_math_3[j];
                tmp_text = tmp_text.replace(math, "_".repeat(math.length))
            }
        }
        // can convert cac truong hop dac biet ve form cua hoclieu
        for (let i = tmp_text.length - 1; i >= 0; i--) {
            let charecter = tmp_text[i];
            if (charecter == "{" || charecter == "}" || (charecter == "\/" && i > 0 && tmp_text[i - 1] != "\\") || (charecter == "/" && i == 0)) {
                text = text.substring(0, i) + "\\" + text.substring(i);
            }
        }

        return text;
    }

    _buildResult() {
        this._result = this._document.createElement('div');
        this._root_problem.walk(node => {

            let model = node.model;
            // them indexs (de va param)
            if (node.isRoot() && !node.hasChildren() && model.indexs.length > 10) {
                let title_element = this._document.createElement('h5')
                title_element.appendChild(this._document.createTextNode(this._title))
                this._result.appendChild(title_element)
                this._insertNormal(model.indexs)
            }
            else if (model.tag === 'h5') {
                this._insertHeading5(model);
            } else if (model.tag === 'h6') {
                this._insertHeading6(model);
            } else if (!node.isRoot() && !model.tag) {
                if (node.parent.model.tag && node.getIndex() !== 0) {
                    this._result.appendChild(this._bulkhead.cloneNode(true));
                }
                this._insertNormal(model.indexs)
            }

            // them sub_indexs
            this._insertNormal(model.sub_indexs)

            // them plan_indexs va answer
            let list_sub_plan = []
            for (let i = 0; i < model.plan_indexs.length; i++) {
                let sub_plant_element = this._document.createElement('div')
                const sub_indexs = model.plan_indexs[i];
                for (let j = 0; j < sub_indexs.length; j++) {
                    const index = sub_indexs[j];
                    const sub_element = this._element.children[index];
                    if (j === 0) {
                        let text = this._getInnerTextWithInlineTag(sub_element, true);
                        let math;
                        while (math = this._multiple_choise_regex.exec(text)) {
                            text = text.substring(0, math.index) + text.substring(this._multiple_choise_regex.lastIndex + 1, text.length)
                        }
                        sub_plant_element.appendChild(this._document.createTextNode(text))
                    } else {
                        sub_plant_element.appendChild(sub_element.cloneNode(true))
                    }
                }
                let inner_html = this._convertSpecCharacter(sub_plant_element.innerHTML);

                list_sub_plan.push(this._document.createTextNode(inner_html.replace(/&nbsp;/g, '')))
            }
            if (list_sub_plan.length > 0) {
                // them trac nghiem
                let plan_element = this._document.createElement('p');
                for (let index = 0; index < list_sub_plan.length; index++) {
                    if (index == 0) {
                        plan_element.appendChild(this._document.createTextNode('{{'));
                        plan_element.appendChild(list_sub_plan[index].cloneNode(true));
                    } else {
                        plan_element.appendChild(this._document.createTextNode('/'));
                        plan_element.appendChild(list_sub_plan[index].cloneNode(true));
                    }
                    if (index === list_sub_plan.length - 1) {
                        plan_element.appendChild(this._document.createTextNode('}}'));
                    }
                }
                plan_element.appendChild(this._document.createTextNode('('))
                let answer = model.answer.answer !== undefined ? model.answer.answer : "";
                plan_element.appendChild(this._document.createTextNode(answer))
                plan_element.appendChild(this._document.createTextNode(')'))
                this._result.appendChild(plan_element);
            } else if (!node.hasChildren()) {
                this._result.appendChild(this._spec_self_essay.cloneNode(true));
            }

            // them solution_indexs, solution_detail_indexs va thay answer neu co
            if (!node.hasChildren() && (model.solution_indexs.length > 0 || model.solution_detail_indexs.length > 0)) {

                this._result.appendChild(this._explain.cloneNode(true))
                this._insertNormal(model.solution_indexs)

                if (model.answer.index !== undefined && typeof model.answer.answer === 'number' && list_sub_plan.length > 0) {
                    for (let i = 0; i < model.solution_detail_indexs.length; i++) {
                        const index = model.solution_detail_indexs[i];
                        let sub_element;
                        if (index === model.answer.index && model.answer.answer < list_sub_plan.length) {
                            sub_element = this._document.createElement('p');
                            let text = this._getInnerTextWithInlineTag(this._element.children[model.answer.index], true);
                            sub_element.appendChild(this._document.createTextNode(text.substring(0, model.answer.position)))
                            sub_element.appendChild(list_sub_plan[model.answer.answer].cloneNode(true))
                            if (model.answer.key_root.length > text.length - model.answer.position) {
                                sub_element.appendChild(this._document.createTextNode(text.substring(model.answer.position + model.answer.key_root.length)));
                            }
                        } else {
                            sub_element = this._element.children[index];
                        }
                        this._result.appendChild(sub_element.cloneNode(true));
                    }
                } else {
                    this._insertNormal(model.solution_detail_indexs);
                }
            }
        })
    }

    _buildTree() {

        if (this._abstract_problem_index > 0) {
            for (let index = 0; index < this._abstract_problem_index; index++) {
                this._root_problem.model.indexs.push(index)
            }
        }
        this._initTree(this._abstract_problem_index + 1, this._abstract_solution_index, this._root_problem);
        this._validSiblingsSameType();
        this._smoothProblemTree();

        if (this._root_solution) {
            this._initTree(this._abstract_solution_index + 1, this._element.children.length, this._root_solution, true);
            this._smoothSolutionTree();
            this._mergeSolutionProblem();
        } else {
            this._checkAnswerMultipleChoiseInProblem();
        }

        this._validExport();
        this._validAllHaveSolution();
        this._completeTree(this._root_problem);
    }

    _initTree(start_index, end_index, node_root, check_is_in_solution = false) {

        let current_node = node_root;

        for (let index = start_index; index < end_index; index++) {

            let is_continue = false;
            let tree_node = null;
            let child_element_text = null;
            const child_element = this._element.children[index];

            if (child_element.nodeName.search(this._nodes_ignore_check_text_regex) > -1) {
                is_continue = true;
            } else {
                child_element_text = child_element.textContent;
            }

            if (child_element_text !== null && child_element_text !== undefined) {
                child_element_text = child_element_text.trim();
            }

            if (!is_continue) {
                for (let i = 0; i < this._priority.length; i++) {

                    const child_priority = this._priority[i];
                    if (check_is_in_solution && !child_priority.is_in_solution) continue;

                    let tmp_child_element_text = child_element_text;
                    if (child_priority.is_lower_case) tmp_child_element_text = child_element_text.toLowerCase();
                    else if (child_priority.is_inner_html) tmp_child_element_text = child_element.innerHTML;
                    let check = tmp_child_element_text.match(child_priority.regex);
                    if (check == null) continue;

                    tree_node = this._tree.parse({
                        numerical_order: child_priority.numerical_order,
                        text: child_element_text,
                        is_one_line: child_priority.is_one_line,
                        indexs: [index],
                        sub_indexs: [],
                        plan_indexs: [],
                        solution_indexs: [],
                        solution_detail_indexs: [],
                        answer_multiple_choises: [],
                        group: child_priority.group,
                        type: child_priority.type,
                        label: check[0].replace(/[\s.:()]/g, ''),
                        answer: {},
                    });

                    if (this._solution_types.includes(current_node.model.type) && current_node.getPath().length >= 3) {
                        let node_parent = current_node.parent;
                        let node_parent_index = node_parent.getIndex();
                        let node_parent_siblings = node_parent.parent.children
                        let labels = [];
                        for (let j = 0; j <= node_parent_index; j++) {
                            labels.push(node_parent_siblings[j].model.label);
                        }
                        if (labels.includes(tree_node.model.label)) {
                            tree_node = null;
                        }
                    }

                    break;
                }
            }

            if (tree_node) {

                if (tree_node.model.numerical_order <= current_node.model.numerical_order) {

                    let tmp_current_node = current_node.parent;
                    while (true) {
                        if (tmp_current_node.isRoot() || tmp_current_node.model.numerical_order < tree_node.model.numerical_order) {
                            current_node = tmp_current_node
                            break;
                        }
                        tmp_current_node = tmp_current_node.parent;
                    }
                }
                current_node.addChild(tree_node);
                current_node = tree_node;

            } else {
                if (current_node.model.is_one_line && !current_node.isRoot()) {
                    let tmp_current_node = current_node.parent;
                    while (true) {
                        if (tmp_current_node.isRoot() || tmp_current_node.model.is_one_line) {
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

    _validPart(node_root) {
        // trong truong hop thieu phan I ma co phan II thi se dung de check
        let first_part = node_root.first(node => !node.isRoot() && node.model.type === this._priority[this._check_same_type].type)
        if (first_part) {
            let node_parent = first_part.parent;
            let node_siblings = node_parent.children;
            let first_part_index = first_part.getIndex();
            let list_invalid_part = []
            for (let index = 0; index < node_siblings.length; index++) {
                if (index !== first_part_index && node_siblings[index].model.type !== this._priority[this._check_same_type].type) {
                    list_invalid_part.push(node_siblings[index])
                }
            }
            if (list_invalid_part.length > 0) {
                if (!first_part.hasChildren() && first_part.model.indexs.length === 1) {
                    for (let index = 0; index < list_invalid_part.length; index++) {
                        const node = list_invalid_part[index];
                        node.drop();
                        first_part.addChild(node)
                    }
                } else {
                    let new_node = this._tree.parse({
                        numerical_order: this._priority[this._check_same_type].numerical_order,
                        is_one_line: this._priority[this._check_same_type].is_one_line,
                        text: this._priority[this._check_same_type].type,
                        indexs: [],
                        sub_indexs: [],
                        plan_indexs: [],
                        solution_indexs: [],
                        solution_detail_indexs: [],
                        answer_multiple_choises: [],
                        group: this._priority[this._check_same_type].group,
                        type: this._priority[this._check_same_type].type,
                        label: this._priority[this._check_same_type].type,
                        answer: {},

                        is_fixed: true,
                    })
                    for (let index = 0; index < list_invalid_part.length; index++) {
                        const node = list_invalid_part[index];
                        node.drop();
                        new_node.addChild(node)
                    }
                    node_parent.addChild(new_node)

                    if (first_part_index > 0) {
                        first_part.drop();
                        node_parent.addChild(first_part)
                    }
                }
            }
        }
    }

    _validSolutionTypes(node_root) {
        node_root.all(node => {
            if (this._solution_types.includes(node.model.type) && node.getPath().length >= 3) {
                let node_parent = node.parent;
                let node_grand_parent = node_parent.parent
                let node_parent_siblings = node_grand_parent.children;
                let node_parent_index = node_parent.getIndex();
                for (let index = 0; index < node_parent_siblings.length; index++) {
                    if (index !== node_parent_index && node_parent_siblings[index].first(node_sub => this._solution_types.includes(node_sub.model.type))) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }).forEach(node => {
            let node_parent = node.parent;
            let node_parent_index = node_parent.getIndex();
            node.drop();
            node_parent.parent.addChild(node, node_parent_index + 1)
        })
    }

    _checkQuestionType(node_root) {
        node_root.walk(node => {
            if (!node.isRoot() && !node.model.group_checked && node.model.group === 'answer') {
                let node_parent = node.parent;
                let node_siblings = node_parent.children;
                let is_multiple_choise = false;
                for (let index = 0; index < node_siblings.length; index++) {
                    if (node_siblings[index].model.group === 'answer' && node_siblings[index].model.type === 'multiple_choise') {
                        is_multiple_choise = true;
                        break;
                    }
                }
                if (is_multiple_choise) {
                    node_parent.model.group = 'question_multiple_choise';
                }
                for (let index = 0; index < node_siblings.length; index++) {
                    if (node_siblings[index].model.group === 'answer') node_siblings[index].model.group_checked = true;
                }
            }
        })
    }

    _validSubNode(node_root) {
        node_root.all(node => {
            if (!node.isRoot() && !node.model.sub_index_checked && node.model.group === 'answer') {
                let node_parent = node.parent;
                let node_siblings = node_parent.children;
                let count_question = 0;
                let count_answer = 0
                for (let index = 0; index < node_siblings.length; index++) {
                    node_siblings[index].model.sub_index_checked = true;
                    if (node_siblings[index].model.group !== 'answer' && node_siblings[index].children.length === 0) {
                        count_question++;
                    } else {
                        count_answer++;
                    }
                }
                if (count_question == node_siblings.length - count_answer) return true;
                return false;
            }
            return false;
        }).forEach(node => {
            let node_parent = node.parent;
            for (let index = 0; index < node_parent.children.length; index++) {
                const sub_node = node_parent.children[index];
                if (sub_node.model.group !== 'answer') {
                    sub_node.drop();
                    index--;
                    node_parent.model.sub_indexs = node_parent.model.sub_indexs.concat(sub_node.model.indexs)
                } else if (sub_node.model.type === 'multiple_choise') {
                    sub_node.drop();
                    index--;
                    node_parent.model.plan_indexs.push(sub_node.model.indexs)
                } else if (sub_node.model.type === 'solution') {
                    sub_node.drop();
                    index--;
                    node_parent.model.solution_indexs = node_parent.model.solution_indexs.concat(sub_node.model.indexs)
                } else if (sub_node.model.type === 'solution_detail') {
                    sub_node.drop();
                    index--;
                    node_parent.model.solution_detail_indexs = node_parent.model.solution_detail_indexs.concat(sub_node.model.indexs)
                }
            }
        })
    }

    _smoothProblemTree() {

        this._validPart(this._root_problem);
        this._validSolutionTypes(this._root_problem)
        this._checkQuestionType(this._root_problem)
        this._validSubNode(this._root_problem)

    }

    _smoothSolutionTree() {
        this._validPart(this._root_solution);
    }

    _mergeSolutionProblem() {
        this._root_problem.walk({ strategy: 'breadth' }, node_problem => {
            if (node_problem.model.is_merge_wrong) return;

            let node_in_solution = this._root_solution.first({ strategy: 'breadth' }, node_solution => {
                if (node_problem.isRoot() && node_solution.isRoot()) return true;
                else return !node_solution.model.is_merge
                    && node_problem.model.type === node_solution.model.type
                    && node_problem.getPath().length === node_solution.getPath().length
                    && node_problem.parent.getIndex() === node_solution.parent.getIndex()
                    && (
                        ((node_problem.model.is_fixed || node_solution.model.is_fixed) && node_problem.getIndex() === node_solution.getIndex()) ||
                        (!node_problem.model.is_fixed && !node_solution.model.is_fixed
                            && (node_problem.model.label.includes(node_solution.model.label) || node_solution.model.label.includes(node_problem.model.label)))
                    )
            })
            if (node_in_solution) {
                node_in_solution.model.is_merge = true;
                if (node_problem.children.length === 0) {
                    node_in_solution.walk(sub_node => {
                        node_problem.model.solution_detail_indexs = node_problem.model.solution_detail_indexs.concat(sub_node.model.indexs)
                        sub_node.model.is_merge = true;
                    })
                } else {
                    node_problem.model.solution_detail_indexs = node_problem.model.solution_detail_indexs.concat(node_in_solution.model.indexs)
                }
                node_problem.model.node_solution = node_in_solution;
                // node_in_solution.model.node_problem = node_problem;
            } else {
                node_problem.walk(sub_node => {
                    sub_node.model.is_merge_wrong = true;
                })
            }
        })

        this._checkQuestionWrongMerge();

        this._checkAnswerMultipleChoiseInProblem();

        this._checkAnswerMutipleChoiseInWrongMerge();

    }

    _checkQuestionWrongMerge() {
        // sau do check 1 - Cau 1
        this._root_problem.walk({ strategy: 'breadth' }, node_problem => {

            if (!node_problem.model.is_merge_wrong) return;

            let node_parent_solution = node_problem.parent.model.node_solution;

            if (node_parent_solution && node_parent_solution.hasChildren()) {
                let node_problem_label = node_problem.model.label.match(this._number_regex);
                if (!node_problem_label) return;
                node_problem_label = node_problem_label[0];

                let node_in_solution = node_parent_solution.first({ strategy: 'breadth' }, node_solution => {
                    let node_solution_label = node_solution.model.label.match(this._number_regex);
                    if (!node_solution_label) return false;
                    node_solution_label = node_solution_label[0];
                    return !node_solution.model.is_merge
                        && node_problem.getPath().length === node_solution.getPath().length
                        && node_problem.model.label === node_solution_label
                })
                if (node_in_solution) {
                    node_in_solution.model.is_merge = true;
                    if (node_problem.children.length === 0) {
                        node_in_solution.walk(sub_node => {
                            node_problem.model.solution_detail_indexs = node_problem.model.solution_detail_indexs.concat(sub_node.model.indexs)
                            sub_node.model.is_merge = true;
                        })
                    } else {
                        node_problem.model.solution_detail_indexs = node_problem.model.solution_detail_indexs.concat(node_in_solution.model.indexs)
                    }
                    node_problem.model.node_solution = node_in_solution;
                    // node_in_solution.model.node_problem = node_problem;
                    node_problem.model.is_merge_wrong = false;
                } else {
                    node_problem.walk(sub_node => {
                        sub_node.model.is_merge_wrong = true;
                    })
                }
            }

        })
    }

    _checkAnswerMultipleChoiseInProblem() {
        // check multiplechoise cua cau ko merge sai
        this._root_problem.walk({ strategy: 'breadth' }, node_problem => {

            if (node_problem.model.is_merge_wrong || node_problem.model.group !== 'question_multiple_choise') return;
            this._getAnswerMultipleChoises(node_problem);
            node_problem.model.answer = node_problem.model.answer_multiple_choises[0]
            node_problem.model.answer_multiple_choises = []
        })
    }

    _checkAnswerMutipleChoiseInWrongMerge() {
        // tiep theo se check is_merge_wrong de xem co multiplechoise
        this._root_problem.walk({ strategy: 'breadth' }, node_problem => {

            if (!node_problem.model.is_merge_wrong || node_problem.model.group !== 'question_multiple_choise') return;

            let node_parent = node_problem.parent;

            this._getAnswerMultipleChoises(node_parent);

            // can chinh phan ghep dan an
            // check neu 1 nua dap an khong co (tach number) thi ghep dung so
            // neu khong thi dung thu tu
            let current_index = 0;
            for (let index = 0; index < node_parent.model.answer_multiple_choises.length; index++) {
                const answer = node_parent.model.answer_multiple_choises[index];
                for (let i = current_index; i < node_parent.children.length; i++) {
                    const node_child = node_parent.children[i];
                    if (node_child.model.is_merge_wrong && node_child.model.group === 'question_multiple_choise') {
                        node_child.model.answer = answer;
                        node_child.model.is_merge_wrong = false;
                        current_index = i + 1;
                        break;
                    } else if (!node_child.model.is_merge_wrong && node_child.model.group === 'question_multiple_choise') {
                        if (node_child.model.answer.answer === '' || node_child.model.answer.answer == undefined) {
                            node_child.model.answer = answer;
                            current_index = i + 1;
                        } else {
                            current_index = i + 1;
                        }
                        break;
                    }
                }
                // can log neu co dap an ma ko co de or khong co dap an
            }
        })
    }

    _validExport() {
        let index_exported = [];
        this._root_problem.walk(node => {
            index_exported = index_exported.concat(node.model.indexs, node.model.sub_indexs, node.model.solution_indexs, node.model.solution_detail_indexs);
            for (let index = 0; index < node.model.plan_indexs.length; index++) {
                index_exported = index_exported.concat(node.model.plan_indexs[index])
            }
        })
        if (this._abstract_problem_index > -1) index_exported.push(this._abstract_problem_index)
        if (this._abstract_solution_index > -1 && this._abstract_solution_index < this._element.children.length) index_exported.push(this._abstract_solution_index)
        index_exported.sort((index_1, index_2) => {
            return index_1 - index_2;
        })
        for (let index = 0; index < this._element.children.length; index++) {
            let find_index = index_exported.indexOf(index)
            if (find_index < 0) {
                this._index_unexported.push(index)
            } else {
                index_exported.splice(find_index, 1)
            }
        }
    }

    _validSiblingsSameType() {
        this._root_problem.walk({ strategy: 'breadth' }, node => {
            if (!this._is_siblings_same_type || !node.hasChildren()) return;
            let first_type = null;
            for (let index = 0; index < node.children.length; index++) {
                if (first_type === null) {
                    first_type = node.children[index].model.type
                } else if (node.children[index].model.type !== first_type) {
                    this._is_siblings_same_type = false;
                }
            }
        })
    }

    _validAllHaveSolution() {
        this._root_problem.walk({ strategy: 'breadth' }, node => {
            if (!this._is_all_have_solution || node.hasChildren()) return;
            if (node.model.solution_detail_indexs.length === 0 && node.model.solution_indexs.length === 0 && node.model.answer.answer === undefined) {
                this._is_all_have_solution = false;
            }
        })
    }

    _completeTree(node_root) {
        let have_used_h6 = false;
        node_root.walk(node => {
            if (node.isRoot() && !node.hasChildren()) {
                node.model.tag = 'h5';
            } else if (node.getPath().length === 2) {
                node.model.tag = 'h5';
                if (node.model.indexs.length > 1 && node.hasChildren()) {
                    node.model.tag_param = 'h6';
                    have_used_h6 = true;
                }
            } else if (node.getPath().length === 3 && !have_used_h6) {
                node.model.tag = 'h6';
            }
        })
    }


    /**
     * Kiểm tra có phải bảng với thứ tự theo chiều ngang hay không
     * @param {*} tbody
     * @param {*} cell_start
     */
    _isHorizontal(tbody, cell_start) {
        const tr = tbody.children[cell_start.y];
        if (tr.children.length > 1) {

            const td_first = tr.children[cell_start.x];
            const td_second = tr.children[cell_start.x + 1];
            const text_first = td_first.textContent;
            const text_second = td_second.textContent;

            if (!text_first || !text_second) return false;

            const number_first = text_first.match(this._number_regex);
            const number_second = text_second.match(this._number_regex);

            if (number_first == number_second - 1) return true;

        }
        return false;
    }

    /**
     * Kiểm tra có phải bảng với đáp án và câu cung 1 ô hay không
     * @param {*} tbody
     * @param {*} cell_start
     */
    _isSameCell(tbody, cell_start) {
        const tr = tbody.children[cell_start.y];

        const td = tr.children[cell_start.x];
        const text = td.textContent;

        if (!text) return false;

        const number = text.match(this._number_regex);
        const character = text.match(this._character_regex);

        if (number && character) return true;

        return false;
    }

    _getTableAnswer(indexs) {

        const all_table = [];
        for (let i = 0; i < indexs.length; i++) {
            const index = indexs[i]
            const sub_element = this._element.children[index];
            if (sub_element.nodeName === 'TABLE') {
                all_table.push(sub_element);
            }
        }
        if (all_table.length == 0) return null;
        else if (all_table.length > 1) {
            for (let index = 0; index < all_table.length; index++) {
                const answers = all_table[index].textContent.match(this._character_regex)
                // do co 1 so truong hop dap an khong du het A, B, C, D nen lay it nhat 2 dap an
                if (answers != null && answers.length >= 2) {
                    return all_table[index];
                }
            }
        } else {
            return all_table[0];
        }
    }

    _getAnswerMultipleChoises(node) {
        const table = this._getTableAnswer(node.model.solution_detail_indexs);
        if (!table) {
            this._getAnswerNoTable(node);
        } else {
            this._getAnswerTable(node, table);
            if (node.model.answer_multiple_choises.length === 0) this._getAnswerNoTable(node);
        }
    }

    /**
     * Lấy loại bảng
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getTableType(tbody, cell_start) {
        const array_bool = [this._isHorizontal(tbody, cell_start), this._isSameCell(tbody, cell_start)];
        let table_type_id = "";
        for (let index = 0; index < array_bool.length; index++) {
            const number = array_bool[index] ? 1 : 0;
            table_type_id += number;
        }

        if (this._table_ids.includes(table_type_id)) return this._table_types[table_type_id];
        return this._table_types[this._table_ids[this._table_ids.length - 1]];
    }

    _getAnswerTable(node, table) {
        const tbody = table.querySelector("tbody");

        const cell_start = this._getStartCellAnwserInTable(tbody);
        if (!cell_start) return;

        const name_method = this._getTableType(tbody, cell_start);
        node.model.answer_multiple_choises = this[name_method](tbody, cell_start);
    }

    /**
     * Lấy vị trí ô bắt đầu trả lời
     * @param {*} tbody
     */
    _getStartCellAnwserInTable(tbody) {
        for (let y = 0; y < tbody.children.length; y++) {
            const tr = tbody.children[y];
            for (let x = 0; x < tr.children.length; x++) {
                const td = tr.children[x];
                const text = td.textContent;
                if (text == null || text == undefined) continue;
                const number = text.match(this._number_regex);
                if (number) return { x: x, y: y };
            }
        }
        return null;
    }

    /**
     * Lấy đáp án theo chiều dọc cùng ô
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getVerticalSame(tbody, cell_start) {
        return this._getSameCell(tbody, cell_start);
    }

    /**
     * Lấy đáp án theo chiều ngang cùng ô
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getHorizontalSame(tbody, cell_start) {
        return this._getSameCell(tbody, cell_start);
    }

    /**
     * Lấy đáp án theo chiều ngang khác ô
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getHorizontalDifferent(tbody, cell_start) {
        let answers = [];
        for (let y = cell_start.y; y < tbody.children.length; y += 2) {
            const tr_question = tbody.children[y];
            const tr_answer = tbody.children[y + 1];

            for (let x = cell_start.x; x < tr_question.children.length; x++) {
                try {
                    const td_question = tr_question.children[x];
                    const text_question = td_question.textContent;

                    const td_anwser = tr_answer.children[x];
                    const text_second = td_anwser.textContent;

                    const number = text_question.match(this._number_regex);
                    const character = text_second.match(this._character_regex);

                    let answer = '';
                    if (number && character) {
                        answer = character[0];
                        let tmp_answer = this._getNumberFromPlan(answer);
                        if (tmp_answer != undefined) answer = tmp_answer;
                    }

                    if (number) answers.push({ answer: answer })
                } catch (error) {
                    // can log o day
                    continue;
                }
            }

        }
        return answers;
    }

    /**
     * Lấy đáp án theo chiều dọc khác ô
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getVerticalDifferent(tbody, cell_start) {
        let answers = [];
        for (let y = cell_start.y; y < tbody.children.length; y++) {
            const tr = tbody.children[y];
            for (let x = cell_start.x; x < tr.children.length; x += 2) {
                try {
                    const td_question = tr.children[x];
                    const text_question = td_question.textContent;

                    const td_anwser = tr.children[x + 1];
                    const text_second = td_anwser.textContent;

                    const number = text_question.match(this._number_regex);
                    const character = text_second.match(this._character_regex);

                    let answer = '';
                    if (number && character) {
                        answer = character[0];
                        let tmp_answer = this._getNumberFromPlan(answer);
                        if (tmp_answer != undefined) answer = tmp_answer;
                    }
                    if (number) answers.push({ answer: answer })

                } catch (error) {
                    // can log o day
                    continue;
                }
            }

        }
        return answers;
    }

    /**
     * Lấy đáp án cùng ô
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getSameCell(tbody, cell_start) {
        let answers = [];
        for (let y = cell_start.y; y < tbody.children.length; y++) {
            const tr = tbody.children[y];
            for (let x = cell_start.x; x < tr.children.length; x++) {
                const td = tr.children[x];
                const text = td.textContent;

                if (!text) continue;

                const number = text.match(this._number_regex);
                const character = text.match(this._character_regex);

                let answer = '';
                if (number && character) {
                    answer = character[0];
                    let tmp_answer = this._getNumberFromPlan(answer);
                    if (tmp_answer != undefined) answer = tmp_answer;
                }
                if (number) answers.push({ answer: answer })
            }

        }
        return answers;
    }

    /**
     * Lấy đáp án khi không có bảng
     */
    _getAnswerNoTable(node) {
        let answers = [];
        for (let i = 0; i < node.model.solution_detail_indexs.length; i++) {
            let index = node.model.solution_detail_indexs[i];
            const text = this._getInnerTextWithInlineTag(this._element.children[index], true);
            if (text == null || text == undefined) continue;
            let answer = this._getMultipleChoiseAnswer(text, index);
            if (answer.index != undefined) {
                answers.push(answer);
                break;
            }
        }
        if (answers.length === 0) answers = [{ answer: '' }]
        node.model.answer_multiple_choises = answers;
    }

    _getMultipleChoiseAnswer(text, index) {
        // dung count de tim dap an theo che do uu tien
        let answer = {};
        let count = 0;
        while (count < 3) {
            count++;
            if (count == 1 && !text.includes('Chọn') && !text.includes('chọn')
                && !text.includes('Câu')) continue;

            if (count == 2 && !text.includes('Đúng') && !text.includes('đúng')
                && !text.includes('Đáp án') && !text.includes('đáp án')) continue;

            const answers = text.match(this._answer_multiple_choise_inline_regex);
            // console.log(answers)
            if (answers !== null && answers.length === 1) {
                answer = {
                    answer: this._getNumberFromPlan(answers[0]),
                    index: index,
                    position: this._answer_multiple_choise_inline_regex.exec(text).index,
                    // last_position: this._answer_multiple_choise_inline_regex.exec(text).index,
                    key_root: answers[0]
                }
                break;
            } else if (answers !== null && answers.length > 1) {
                let priority_answers = []
                for (let index = 0; index < answers.length; index++) {
                    const sub_answer = answers[index];
                    // uu tien A. B. a. ,... trong Chon phuong an A.
                    if (sub_answer.search(/[.:()]/g) > -1) priority_answers.push(sub_answer)
                }
                if (priority_answers.length === 0 || priority_answers.length > 1) {
                    continue;
                } else {
                    answer = {
                        answer: this._getNumberFromPlan(answers[0]),
                        index: index,
                        position: this._answer_multiple_choise_inline_regex.exec(text).index,
                        key_root: answers[0]
                    }
                }
                break;
            }

        }
        return answer;
    }


}

module.exports = Build;
// {/* <p style="text-align: justify;"><strong>I. TRẮC NGHIỆM (5 điểm)</strong></p> */ }
// {/* <p>a) cau 4a Hãy asdsadsadcx?</p>
// <p>b) cau 4b Hãy asdsadsadcx ?</p>
// <p>Phương pháp giải: pp4 asdsadsa</p>
// <p>Gợi ý: gy4 adsad</p>
// <p>a) gy4a qưeasdsadsadcx</p>
// <p>b) gy4b qq asdsadsadcx</p> */}
// var string_inner_html = `<h2 class="s14 lineheight"></h2>
// <p><strong class="content_question">Đề bài</strong></p>

// <p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
// <p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
// <p style="text-align: justify;"><strong>Câu 1:</strong> <strong>Trong cac cau sau</strong><strong></strong></p>
// <p>Hãy chọn phương án trả lời đúng nhất:</p>
// <p class="Bodytext70" style="text-align: justify;"><strong>1. Lớp Hai lá mầm có kiểu rễ và gân lá là:</strong></p>
// <p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
// <p style="text-align: justify;">a. Rễ\&nbsp; cọc, gân hình mạng km/h {} <sup>2</sup> </p>
// <p style="text-align: justify;">b.\&nbsp; Rễ chùm, gân hình cung hoặc song song</p>
// <p style="text-align: justify;">c.\&nbsp; Rễ cọc, gân hình cung hoặc song song</p>
// <p style="text-align: justify;">d. Rễ chùm, gân hình mạng</p>
// <p>Phương pháp giải: 1</p>
// <p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
// <p>Trả lời: 1 asda</p>
// <p>Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí</p>
// <p class="Bodytext70" style="text-align: justify;"><strong>2. Dựa vào đâu người ta nói thực vật có khả năng diều hòa không khí ?</strong></p>
// <p style="text-align: justify;">a. \&nbsp;\&nbsp;\&nbsp;Sự hô hấp của con người, động thực vật, hoạt động của nhà máy, sự đốt cháy… đều tiêu tốn O<sub>2</sub> và thải ra các khí cacbônic</p>
// <p style="text-align: justify;">\&nbsp;b. Thực vật quang hợp tiêu thụ khí cacbônic và thải khí O<sub>2</sub>, góp phần (chủ yếu) làm cân bằng các khí này trong không khí</p>
// <p style="text-align: justify;">c. Ở thực vật, lượng khí CO<sub>2</sub> thải ra trong hô hấp được sử dụng ngay vào quá trình quang hợp nên vẫn giữ được môi trường trong sạch</p>
// <p style="text-align: justify;">\&nbsp;d. Câu a và b đều đúng.</p>
// <p>Trả lời: 2 Chọn b</p>
// <p class="Bodytext70" style="text-align: justify;"><strong>3. Lớp Một lá mầm có số cánh hoa là bao nhiêu trong các trường hợp sau?</strong></p>
// <p class="Bodytext70" style="text-align: justify;">\&nbsp;a. \&nbsp;\&nbsp;4 cánh\&nbsp;\&nbsp;\&nbsp;\&nbsp; b. 5 cánh\&nbsp;\&nbsp;\&nbsp;\&nbsp; c. 3 – 6 cánh\&nbsp;\&nbsp;\&nbsp;\&nbsp; d. 4 – 5 cánh</p>
// <p class="Bodytext70" style="text-align: justify;"><strong>4. Tại sao nói vi khuẩn là sinh vật dị dưỡng ?</strong></p>
// <p style="text-align: justify;">a. \&nbsp;\&nbsp;\&nbsp;Hầu hết vi khuẩn không có chất diệp lục, nên không tạo được chất hữu cơ nuôi cơ thể</p>
// <p style="text-align: justify;">Có loại vi khuẩn sống bằng các chất hữu cơ có sẵn trong xác các động thực vật gọi là hoại sinh</p>
// <p style="text-align: justify;">\&nbsp;Có loại vi khuẩn sống nhờ trên cơ thể sống khác gọi là kí sinh</p>
// <p style="text-align: justify;">Cả a, b và c</p>
// <p class="Bodytext70" style="text-align: justify;"><strong>5. Nhóm cây nào sau đây toàn là cây lương thực ?</strong></p>
// <p style="text-align: justify;">a.Rau cải, cà chua, su hào, cải bắp</p>
// <p style="text-align: justify;">b. Cây lúa, khoai tây, ngô, kê</p>
// <p style="text-align: justify;">c. Cây mít, cây vải, cây nhãn, cây ổi</p>
// <p style="text-align: justify;">d. Cây sen, cây sâm, cây hoa cúc, cà phê</p>
// <p class="Bodytext70" style="text-align: justify;"><strong>6. Thực vật ở nước (tảo) xuất hiện trong điều kiện nào ?</strong></p>
// <p style="text-align: justify;">a. Các đại dương chiếm phần lớn diện tích Trái Đất</p>
// <p style="text-align: justify;">b. Những sinh vật đầu tiên có cấu tạo rất đơn giản</p>
// <p style="text-align: justify;">c. Khí hậu nóng và rất ẩm</p>
// <p style="text-align: justify;">d. Cả a và b</p>
// <p style="text-align: justify;"><strong>Câu 2. Hãy sấp xếp các đặc điểm cấu tạo của cây Hạt trần và cây Hạt kín </strong>ở<em> </em><strong>cột B tương ứng với từng loại cây (hạt trần hoặc hạt kín) ở cột A rồi ghi vào cột kết quả.</strong><strong></strong></p>
// <table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
//  <tbody>
//   <tr>
//    <td valign="top" width="95"> <p align="center"><strong>Các loại cây (A)</strong><strong></strong></p> </td>
//    <td valign="top" width="313"> <p align="center"><strong>Các đặc điểm c</strong><strong>ấ</strong><strong>u tạo</strong></p> <p align="center"><strong>(B)</strong><strong></strong></p> </td>
//    <td valign="top" width="79"> <p align="center"><strong>Kết qu</strong><strong>ả</strong><strong></strong></p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="95">
//     <ol>
//      <li>Hạt trần</li>
//      <li>Hạt kín</li>
//      <li>Rễ, thân, lá thật</li>
//      <li>Có mạch dan</li>
//     </ol></td>
//    <td valign="top" width="313"> <p>c.\&nbsp;\&nbsp; Hạt nằm trong quả</p>
//     <ol>
//      <li>Có hoa (cơ quan sinh sản là hoa, quả)</li>
//      <li>Hạt nằm trên lá noãn hở</li>
//      <li>Chưa có hoa, quả (cơ quan sinh sản là nón)</li>
//      <li>Có mạch dẫn hoàn thiện</li>
//     </ol> <p>h.\&nbsp;\&nbsp; Rễ, thân, lá thật (rất đa dạng)</p> </td>
//    <td valign="top" width="79"> <p>1...............</p> <p>2…………</p> </td>
//   </tr>
//  </tbody>
// </table>
// <p>a) Tinh sadsad?</p>
// <p>cau 2a</p>
// <p>b) Hãy sadsad?</p>
// <p>cau 2b</p>
// <p>Phương pháp giải: cau 2 asdsadsa</p>
// <p>a) pp 2a asdgwe </p>
// <p>asdgwe </p>
// <p>b) pp2b asdgwe </p>
// <p>asdgwe </p>
// <p>Gợi ý: cau 2</p>
// <p>a) gya ádsadsadsadsadsa</p>
// <p>ádsadsadsadsadsa</p>
// <p>ádsadsadsadsadsa</p>
// <p>b) gyb ádsadsadsadsadsa</p>
// <p>ádsadsadsadsadsa</p>
// <p>ádsadsadsadsadsa</p>
// <p>Câu 3: Hãy asdsadsadcx ?</p>
// <p>a) cau 3a Hãy asdsadsadcx ?</p>
// <p>Phương pháp giải: pp3a asdsadsa</p>
// <p>Gợi ý: gy3a adsad</p>
// <p>b) cau3 b Hãy asdsadsadcx ?</p>
// <p>Phương pháp giải: pp3b</p>
// <p>asdsadsadcx ?</p>
// <p>Gợi ý: gy3b</p>
// <p>qưeasdsadsadcx</p>
// <p>qq asdsadsadcx</p>
// <p>Câu 4: Hãy asdsadsửewadcx?</p>

// <p style="text-align: justify;"><strong>II. T</strong><strong>Ự</strong><strong> LUẬN</strong> (5 điểm)</p>
// <p style="text-align: justify;"><strong>1. Thế nào là Phân loại thực vật ? Người ta phân chia thực vật thành các bậc phân loại từ cao đến thấp theo trật tự như thế nào ?</strong></p>
// <p style="text-align: justify;"><strong>2. Thế nào là thực vật quý hiếm ? Cần phải làm gì để bảo vệ đa dạng thực vật ở Việt Nam ?</strong><strong></strong></p>
// <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// <p style="text-align: justify;"><strong>I.\&nbsp;\&nbsp;\&nbsp; </strong><strong>TR</strong><strong>Ắ</strong><strong>C NGHIỆM </strong>(5 điểm)<strong></strong></p>
// <p style="text-align: justify;"><strong>Câu 1. </strong><strong></strong></p>
// <table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
//  <tbody>
//   <tr>

//    <td valign="top" width="106"> <p align="center"><strong>2</strong></p> </td>
//    <td valign="top" width="106"> <p align="center"><strong>3</strong></p> </td>
//    <td valign="top" width="106"> <p align="center"><strong>4</strong></p> </td>
//    <td valign="top" width="106"> <p align="center"><strong>5</strong></p> </td>
//    <td valign="top" width="106"> <p align="center"><strong>6</strong></p> </td>
//   </tr>
//   <tr>

//    <td valign="top" width="106"> <p align="center">d</p> </td>
//    <td valign="top" width="106"> <p align="center">c</p> </td>
//    <td valign="top" width="106"> <p align="center">d</p> </td>
//    <td valign="top" width="106"> <p align="center">b</p> </td>
//    <td valign="top" width="106"> <p align="center">a</p> </td>
//   </tr>
//  </tbody>
// </table>
// <p>1. Chọn a.</p>
// <p style="text-align: justify;">\&nbsp;<strong>Câu 2.</strong></p>
// <table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
//  <tbody>
//   <tr>
//    <td valign="top" width="319"> <p align="center"><strong>1</strong></p> </td>
//    <td valign="top" width="319"> <p align="center"><strong>2</strong></p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="319"> <p style="text-align: center;" align="center">a, b, e, g</p> </td>
//    <td valign="top" width="319"> <p style="text-align: center;">\&nbsp; c, d. h, i</p> </td>
//   </tr>
//  </tbody>
// </table>
// <p style="text-align: justify;"><strong>Câu 4. </strong><strong></strong></p>
// <p> answer 4 </p>
// <p style="text-align: justify;"><strong>\&nbsp;</strong><strong>II.\&nbsp;\&nbsp;\&nbsp; </strong><strong>TỰ LUẬN </strong>(5 điểm)</p>
// <p style="text-align: justify;"><strong>Câu 1</strong>. * Phân loại thực vật là tìm hiểu sự giống nhau và khác nhau của thực vật rồi xếp chúng thành các bậc phân loại theo thứ tự nhất định.</p>
// <p style="text-align: justify;">* Người ta phân chia thực vật thành các bậc phân loại từ cao đến thấp theo trật tự sau:</p>
// <p style="text-align: justify;" align="center">Ngành – Lớp - Bộ - Họ - Chi – Loài</p>
// <p style="text-align: justify;">\&nbsp;Loài là bậc phân loại cơ sở. Bậc càng thấp thì sự khác nhau giữa các thực vật cùng bậc càng ít. Như vậy, loài là tập hợp của những cá thể có nhiều đặc điểm giống nhau về hình dạng, cấu tạo...</p>
// <p style="text-align: justify;"><strong>Câu 2</strong>. \&nbsp;\&nbsp;* Thực vật quý hiếm là thực vật có giá trị kinh tế (lấy gỗ, làm thuốc, cây công nghiệp...) nhưng đang bị khai thác quá mức và ngày càng hiếm đi.</p>
// <p style="text-align: justify;">\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp; * Để bảo vệ sự đa dạng thực vật ở Việt Nam cần phải:</p>
// <p style="text-align: justify;">- Ngăn chặn việc phá rừng để bảo vệ môi trường sống của thực vật</p>
// <p style="text-align: justify;">-\&nbsp; Hạn chế khai thác bừa bãi các loài thực vật quý hiếm, để bảo vệ số lượng cá thể loài</p>
// <p style="text-align: justify;">-\&nbsp; Xây dựng các vườn thực vật, vườn quốc gia, khu bảo tồn… để bảo tồn các loài thực vật, trong đó có thực vật quý hiếm</p>
// <p style="text-align: justify;">- Cấm buôn bán và xuất khẩu các loài thực vật quý hiếm</p>
// <p style="text-align: justify;">Tuyên truyền, giáo dục rộng rãi trong nhân dân để cùng tham gia bảo vệ rừng.</p>
// <p style="text-align: right;"><strong>\&nbsp;</strong></p>
// <div class="clearfix"></div>`


// // string_inner_html = `<h2 class="s14 lineheight"></h2>
// // <p><strong class="content_question">Đề bài</strong></p>
// // <p style="text-align: justify;"><strong>Cảm nhận vẻ đẹp của hai đoạn thơ sau</strong></p>
// // <p style="text-align: justify;"><em>Rải rác biên cương mồ viễn xứ</em></p>
// // <p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
// // <p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
// // <p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em></p>
// // <p style="text-align: right;">(<strong>Tây Tiến -</strong>\&nbsp;Quang Dũng - Ngữ văn 12, tr89)</p>
// // <p style="text-align: justify;"><em>Em ơi em</em></p>
// // <p style="text-align: justify;"><em>Đất Nước là máu xương của mình</em></p>
// // <p style="text-align: justify;"><em>Phải biết gắn bó và san sẻ</em></p>
// // <p style="text-align: justify;"><em>Phải biết hóa thân cho dáng hình xứ sở</em></p>
// // <p style="text-align: justify;"><em>Làm nên Đất Nước muôn đời</em></p>
// // <p style="text-align: right;">(<strong>Đất Nước</strong>\&nbsp;<strong>-\&nbsp;</strong>Nguyễn Khoa Điềm\&nbsp;<strong>- </strong>Ngữ văn, tr120)</p>
// // <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// // <p style="text-align: justify;"><strong>1. Giới thiệu chung</strong></p>
// // <p style="text-align: justify;"><strong>- Tây Tiến</strong>\&nbsp;của Quang Dũng và\&nbsp;<strong>Đất Nước</strong>\&nbsp;của Nguyễn Khoa Điềm là những bài thơ đặc sắc trong nền thơ cách mạng Việt Nam. Hai tác phẩm này đã nói về những con người vô danh lặng thầm chiến đấu bảo vệ quê hương. Mỗi bài thơ đều để lại những cảm xúc, suy tư sâu lắng trong lòng người đọc. Trong đó có những câu thơ rất đặc sắc:</p>
// // <p style="text-align: justify;">“<em>Rải rác biên cương mồ viễn xứ</em></p>
// // <p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
// // <p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
// // <p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em>”</p>
// // <p style="text-align: justify;">Và:</p>
// // <p style="text-align: justify;"><em>“Em ơi em Đất Nước là máu xương của mình</em></p>
// // <p style="text-align: justify;"><em> Phải biết gắn bó và san sẻ</em></p>
// // <p style="text-align: justify;"><em> Phải biết hóa thân cho dáng hình xứ sở</em></p>
// // <p style="text-align: justify;"><em> Làm nên Đất Nước muôn đời”</em></p>
// // <p style="text-align: justify;"><strong>2. Phân tích</strong></p>
// // <p style="text-align: justify;"><strong>a. Đoạn thơ trong bài Tây Tiến</strong></p>
// // <p style="text-align: justify;"><strong>*Giới thiệu khái quát về tác giả, tác phẩm, vị trí đoạn thơ</strong></p>
// // <p style="text-align: justify;">+ Quang Dũng là nghệ sĩ đa tài (thơ, văn, nhạc, hoạ), cũng là một người lính, sống một đời lính oanh liệt, hào hùng. Quãng đời ấy đã trở thành cảm hứng đặc sắc trong thơ ông. Bài thơ Tây Tiến viết về người lính, về những chàng trai“chiến trường đi chẳng tiếc đời xanh”\&nbsp;– người lính Tây Tiến.</p>
// // <p style="text-align: justify;">+ Tây Tiến là một đơn vị bộ đội thành lập đầu năm 1947. Thành phần chủ yếu là thanh niên trí thức Hà Nội. Nhiệm vụ của họ là phối hợp với bộ đội Lào, đánh tiêu hao lực lượng địch ở Thượng Lào, bảo vệ biên giới Việt Lào. Sau một thời gian hoạt động ở Lào, đoàn quân Tây Tiến trở về Hoà Bình thành lập trung đoàn 52. Năm 1948, nhà thơ Quang Dũng chuyển sang đơn vị khác, không bao lâu, ông nhớ đơn vị cũ sáng tác bài thơ này.</p>
// // <p style="text-align: justify;">+ Bài thơ có 4 khổ, đây là khổ thứ 3, nội dung khắc hoạ hình tượng người lính Tây Tiến</p>
// // <p style="text-align: justify;"><strong>*Phân tích cụ thể</strong>:</p>
// // <p style="text-align: justify;">- Cảm hứng chủ đạo của bài thơ là nỗi nhớ, nhớ về đồng đội và địa bàn hoạt động của đoàn quân, nhớ về vùng đất mà bước chân hào hùng mà đoàn binh Tây Tiến đã đi qua – Tây Bắc. Vùng đất đó với thiên nhiên hoang sơ, hùng vĩ và thơ mộng, trữ tình, vùng đất ấy với những con người tài hoa, duyên dáng và nghĩa tình. Trên nền cảnh ấy là hình ảnh người lính Tây Tiến. Họ hiện lên thật ấn tượng với phẩm chất hào hùng đáng kính, họ đã hi sinh dọc đường hành quân, hi sinh dọc miền biên giới – họ đã hi sinh vì lí tưởng sống cao đẹp:</p>
// // <p style="text-align: justify;"><em>Rải rác biên cương mồ viễn xứ</em></p>
// // <p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
// // <p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
// // <p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em></p>
// // <p style="text-align: justify;">- Đoạn thơ sử dụng rất nhiều từ Hán Việt mang sắc thái trân trọng, thể hiện không khí trang nghiêm, lòng thành kính thiêng liêng của nhà thơ trước sự hi sinh của đồng đội. Những từ ngữ ấy như những nén tâm nhang thắp lên đưa tiễn những người đã ngã xuống. Chính hệ thống từ ngữ ấy kết hợp với những hình ảnh giàu sức gợi (biên cương, chiến trường, áo bào, khúc độc hành) cũng tạo sắc thái cổ kính, gợi liên tưởng đến sự hi sinh oanh liệt của những anh hùng, dũng tướng sẵn sàng chấp nhận cảnh “da ngựa bọc thây” đầy bi tráng trong văn học trung đại.</p>
// // <p style="text-align: justify;">- Câu thơ đầu đoạn thơ sử dụng nhiều từ Hán Việt (biên cương, viễn xứ) nhưng sức nặng của cả câu lại dồn vào một từ thuần Việt:\&nbsp;“mồ”.\&nbsp;Mồ cũng là mộ nhưng không phải mộ theo đúng nghĩa. Đó chỉ là những nấm đất được đào vội, chôn mau ngay trên con đường hành quân vội vã để đoàn quân lại tiếp tục lên đường. Đặt trong không gian bao la, mênh mông hoang sơ của miền biên giới Việt – Lào, những nấm mồ ấy gợi lên bao nỗi xót xa.</p>
// // <p style="text-align: justify;">- Trong câu thơ thứ hai, tác giả sử dụng nghệ thuật đảo ngữ (chiến trường đi) để nhấn mạnh đích đến của người lính, người chiến sĩ. Trong hoàn cảnh đất nước có chiến tranh, sứ mệnh đất nước rất mỏng manh, chiến trường là đích đến duy nhất, là sự lựa chọn đầy trách nhiệm của cả một thế hệ. Với họ, “đường ra trận mùa này đẹp lắm” và “cuộc đời đẹp nhất trên trận chiến chống quân thù”. Cách nói\&nbsp;“chẳng tiếc đời xanh”\&nbsp;cho thấy sự dứt khoát, lòng quyết tâm, coi thường gian nguy, coi thường cái chết. Họ sẵn sàng hiến dâng cả đời xanh, tuổi trẻ, quãng đời đẹp nhất cho tổ quốc, hơn thế nữa, tính mạng của họ cũng sẵn sàng hi sinh để làm nên dáng hình đất nước. Họ ra đi với tinh thần của cả thời đại“Người ra đi đầu không ngoảnh lại”. Đó là lí tưởng sống cao đẹp, hào hùng.</p>
// // <p style="text-align: justify;">- Viết về người lính và cuộc kháng chiến vĩ đại của dân tộc ta, nhà thơ Quang Dũng rất chân thực, ông không hề né tránh hiện thực:</p>
// // <p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
// // <p style="text-align: justify;">“Áo bào thay chiếu”\&nbsp;– một hình ảnh thực đến xót xa của chiến tranh. Nhưng cái thiếu thốn về vật chất lại được khoả lấp bằng sự hiên ngang, can trường của người lính. Từ Hán Việt và cách nói\&nbsp;“Áo bào thay chiếu anh về đất”làm cho cái chết của người lính Tây Tiến trở nên trang trọng hơn rất nhiều, thiêng liêng hơn nhiều. Nhà thơ vẫn gợi lên sự thật chung của cả thời chống Pháp là sự thiếu thốn về vật chất, ở vùng biên giới xa xôi thì sự thiếu thốn ấy còn nhân lên gấp bội. Với thái độ trân trọng đồng đội, nhà thơ Quang Dũng đã thấy họ như đang mặc tấm áo bào của chiến tướng mà\&nbsp;đi vào cõi vĩnh hằng, bất tử cùng sông núi. Cách nói\&nbsp;“về đất”\&nbsp;không chỉ\&nbsp; là cách nói giảm, nói tránh mà mang ý nghĩa biểu tượng thiêng liêng. Cái chết không phải là ra đi vào cõi hư vô bất định mà là trở về, trở về với đất Mẹ yêu thương. Đất Mẹ cũng đã mở lòng đón những đứa con đầy trách nhiệm của mình trở về.\&nbsp; Họ đã ra đi như thế đấy. Họ đã nằm lại nơi chân đèo, dốc núi nào đó trên con đường hành quân đầy gian khổ, nhọc nhằn, họ đã để lại mình nơi biên cương lạnh lẽo, hoang vắng. Nhưng họ đã ra đi vì lí tưởng, cái chết của họ \&nbsp;dù để lại nhiều xót xa trong lòng người đọc nhưng họ ra đi một cách rất thanh thản. Họ chỉ là “không bước nữa”, là “bỏ quên đời”, là “về đất”\&nbsp;thôi chứ không phải là chết. các anh đã ngã xuống, đã “hoá thân cho dáng hình xứ sở” để rồi mỗi thế núi hình sông, mỗi tên đất tên làng đều có bóng hình các anh. Các anh hi sinh, trở về trong lòng Đất Mẹ để\&nbsp;“cho cây đời mãi mãi xanh tươi”, để đem lại cho đất đai, cho quê hương đất nước sự sống bất tận.</p>
// // <p style="text-align: justify;">- Đoạn thơ kết thúc bằng một âm hưởng hào hùng. Dường như linh hồn người tử sĩ đã hòa cùng sông núi, con sông Mã đã tấu lên khúc nhạc đau thương, hùng tráng để tiễn đưa người lính vào cõi bất tử. Hình tượng “sông Mã” ở cuối bài thơ được phóng đại và nhân hóa, tô đậm cái chết bi hùng của người lính_ sự hi sinh làm lay động đất trời, khiến dòng sông gầm lên đớn đau, thương tiếc.</p>
// // <p style="text-align: justify;">* Nghệ thuật</p>
// // <p style="text-align: justify;"><strong> </strong>- Bằng bút pháp lãng mạn và âm hưởng bi tráng, đoạn thơ ngợi ca những phẩm chất tốt đẹp của người lính Tây Tiến trong cuộc kháng chiến chống Pháp.</p>
// // <p style="text-align: justify;"><strong>b. Đoạn thơ trong bài “Đất Nước” của Nguyễn Khoa Điềm là lời nhắn nhủ của nhà thơ về trách nhiệm của thế hệ trẻ đối với non sông đất nước:</strong></p>
// // <p style="text-align: justify;"><strong>*Giới thiệu khái quát về tác giả, tác phẩm:</strong></p>
// // <p style="text-align: justify;">+ Nguyễn Khoa Điềm là một trong những nhà thơ tiêu biểu của thế hệ các nhà thơ trẻ thời chống Mỹ .\&nbsp;Ông\&nbsp;xuất thân từ một gia đình trí thức cách mạng ở Huế, bản thân ông tham gia trực tiếp vào phong trào đấu tranh sinh viên nên thơ Nguyễn Khoa Điềm rất giàu chất suy tư, cảm xúc dồn nén mang tâm tư của người trí thức….</p>
// // <p style="text-align: justify;">+ Đất Nứơc là phần đầu chương V của trường ca Mặt đường khát vọng, viết năm 1971 tại chiến khu Trị Thiên giữa lúc cuộc kháng chiến chống Mĩ đang hết sức khốc liệt .</p>
// // <p style="text-align: justify;"><strong>*Phân tích cụ thể</strong><strong>:</strong></p>
// // <p style="text-align: justify;"><em> “Em ơi em Đất Nước là máu xương của mình</em></p>
// // <p style="text-align: justify;"><em> Phải biết gắn bó và san sẻ</em></p>
// // <p style="text-align: justify;"><em> Phải biết hóa thân cho dáng hình xứ sở</em></p>
// // <p style="text-align: justify;"><em> Làm nên Đất Nước muôn đời”</em></p>
// // <p style="text-align: justify;">– Đoạn thơ có giọng điệu tâm tình sâu lắng, thiết tha. Tác giả tạo ra cuộc trò chuyện thân mật giữa nhân vật trữ tình “anh” với “em”. Giọng điệu ấy đã làm mềm hóa nặng nề, khô khan của chất chính luận.</p>
// // <p style="text-align: justify;">– Nguyễn Khoa Điềm đã khám phá một định luật rất mới “Đất Nước là máu xương của mình”. Hình ảnh so sánh độc đáo ấy có hàm ý khẳng định: Đất nước là sự sống thiêng liêng đối với mỗi con người.</p>
// // <p style="text-align: justify;">Nguyễn Khoa Điềm nhắc nhở mỗi người chúng ta phải biết trân trọng đất nước hôm nay.</p>
// // <p style="text-align: justify;">– Từ việc xác định vai trò quan trọng của đất nước đối với mỗi con người, nhà thơ khơi gợi ý thức trách nhiệm của mỗi công dân, nhất là thế hệ trẻ. Phép điệp ngữ “phải biết” vừa có ý nghĩa cầu khiến vừa là lời thiết tha, mong chờ như mệnh lệnh từ trái tim. Ba cụm động từ cụ thể hóa trách nhiệm của mỗi con người: “Gắn bó” là lời kêu gọi đoàn kết, hữu ái giai cấp. Vì có đoàn kết là có sức mạnh. “San sẻ” là mong muốn mỗi người có ý thức gánh vác trách nhiệm với quê hương. Còn “hóa thân” là biểu hiện tinh thần sẵn sàng hi sinh cho đất nước, là sự dâng hiến thiêng liêng, đẹp đẽ.</p>
// // <p style="text-align: justify;">* Nghệ thuật:</p>
// // <p style="text-align: justify;"><strong> </strong>– Đoạn thơ mang tính chính luận nhưng được diễn đạt bằng hình thức đối thoại, giọng điệu trữ tình kết hợp với biện pháp tu từ điệp ngữ. Từ “Đất Nước” dược lặp lại hai lần kết hợp cách viết hoa đã tăng thêm sự tôn kính thiêng liêng, thể hiện quan niệm lớn: “Đất Nước của nhân dân”.</p>
// // <p style="text-align: justify;"><strong>c. So sánh:</strong></p>
// // <p style="text-align: justify;"><strong>* Giống nhau:</strong></p>
// // <p style="text-align: justify;">Tư tưởng của cả hai đoạn thơ đều là tư tưởng cao đẹp: cống hiến, dâng hiến tuổi trẻ mình cho đất nước non sông.</p>
// // <p style="text-align: justify;"><strong>* Khác nhau:</strong></p>
// // <p style="text-align: justify;">– “Tây Tiến” với cảm hứng đất nước được gợi lên từ nỗi nhớ cũa người lính vùng cao về những năm tháng đầu của cuộc kháng chiến chống thực dân Pháp. “Đất Nước” hoàn thành trong cuộc kháng chiến chống đế quốc Mĩ tại mặt trận Trị Thiên bộc lộ cảm hứng đất nước qua cái nhìn tổng quát đưa đến những chiêm nghiệm mới mẻ, sâu sắc về đất nước: Đất nước là tất cả những gì gắn bó máu thịt với mỗi con người.</p>
// // <p style="text-align: justify;">-Đoạn thơ trong bài\&nbsp;Tây Tiến\&nbsp;được viết bằng thể thơ thất ngôn, có sử dụng nhiều từ Hán Việt trang trọng với giọng điệu thơ dứt khoát, mạnh mẽ, âm hưởng hào hùng\&nbsp; để tô đậm hiện thực khốc liệt của chiến tranh và khẳng định sự bất tử của người chiến sĩ vô danh.</p>
// // <p style="text-align: justify;">- Đoạn thơ trong\&nbsp;Đất Nước\&nbsp;được viết bằng thể thơ tự do, giọng điệu tâm tình trò chuyện, từ ngữ giản dị, gần gũi nhằm khẳng định vai trò to lớn của nhân dân vô danh.</p>
// // <p style="text-align: justify;"><strong>Lí giải :</strong></p>
// // <p style="text-align: justify;">Sự khác biệt như trên \&nbsp;:</p>
// // <p style="text-align: justify;">Do hoàn cảnh sáng tác</p>
// // <p style="text-align: justify;">Do phong cách, cá tính sáng tạo của mỗi nhà thơ</p>
// // <p style="text-align: justify;"><strong>3. Tổng kết</strong></p>
// // <p style="text-align: justify;">Đánh giá chung về giá trị hai đoạn thơ và tài năng nghệ thuật của hai tác giả</p>
// // <p style="text-align: right;"><strong></strong></p>
// // <div class="clearfix"></div>`;

// // string_inner_html = `<h2 class="s14 lineheight"></h2>
// // <p><strong class="content_question">Đề bài</strong></p>
// // <p style="text-align: justify;"><strong>I. Phần trắc nghiệm</strong>\&nbsp;<em>(4 điểm)</em></p>
// // <p style="text-align: justify;"><strong>Câu 1:</strong>\&nbsp;Tại sao đột biến gen thường có hại cho cơ thể sinh vật nhưng vẫn có vai trò quan trọng trong quá trình tiến hóa?</p>
// // <p style="text-align: justify;">(1): tần số đột biến gen trong tự nhiên là không đáng kể nên tần số alen đột biến có hại là rất thấp.</p>
// // <p style="text-align: justify;">(2): khi môi trường thay đổi, thể đột biến có thể thay đổi giá trị thích nghi.</p>
// // <p style="text-align: justify;">(3): giá trị thích nghi của đột biến tùy thuộc vào tổ hợp gen.</p>
// // <p style="text-align: justify;">(4): đột biến gen thường có hại nhưng nó tồn tại ở dạng dị hợp nên không gây hại.</p>
// // <p style="text-align: justify;">Câu trả lời đúng nhất là</p>
// // <p style="text-align: justify;">A. (3) và (4).</p>
// // <p style="text-align: justify;">B. (2) và (4).</p>
// // <p style="text-align: justify;">C. (1) và (3).</p>
// // <p style="text-align: justify;">D. (2) và (3).</p>
// // <p style="text-align: justify;"><strong>Câu 2:</strong>\&nbsp;Các nhân tố tiến hóa nào vừa làm thay đổi tần số tương đối các alen của gen vừa làm thay đổi thành phần kiểu gen của quần thể? (1): chọn lọc tự nhiên; (2): giao phối không ngẫu nhiên; (3): di - nhập gen; (4): đột biến; (5): các yêu tố ngẫu nhiên. Trả lời đúng là</p>
// // <p style="text-align: justify;">A. (1), (2), (4), (5).</p>
// // <p style="text-align: justify;">B. (1), (2), (3), (4).</p>
// // <p style="text-align: justify;">C. (1), (3), (4), (5).</p>
// // <p style="text-align: justify;">D. Tất cả các nhân tố trên.</p>
// // <p style="text-align: justify;"><strong>Câu 3:</strong>\&nbsp;Trong rừng mưa nhiệt đới, những cây thân gỗ có chiều cao vượt lên tầng trên của tán rừng thuộc nhóm thực vật</p>
// // <p style="text-align: justify;">A. ưa sáng.</p>
// // <p style="text-align: justify;">B. chịu bóng.</p>
// // <p style="text-align: justify;">C. ưa bóng.</p>
// // <p style="text-align: justify;">D. ưa bóng và ưa ẩm.</p>
// // <p style="text-align: justify;"><strong>Câu 4:</strong>\&nbsp;Thành phần hữu sinh của một hệ sinh thái bao gồm:</p>
// // <p style="text-align: justify;">A. sinh vật sản xuất, sinh vật tiêu thụ, sinh vật phân giải</p>
// // <p style="text-align: justify;">B. sinh vật sản xuất, sinh vật ăn thực vật, sinh vật phân giải</p>
// // <p style="text-align: justify;">C. sinh vật ăn thực vật, sinh vật ăn động vật, sinh vật phân giải</p>
// // <p style="text-align: justify;">D. sinh vật sản xuất, sinh vật ăn động vật, sinh vật phân giải</p>
// // <p style="text-align: justify;"><strong>Câu 5:</strong>\&nbsp;Tác động của vi khuẩn nitrát hóa là:</p>
// // <p style="text-align: justify;">A. cố định nitơ trong đất thành dạng đạm nitrát (NO<sub>3</sub><sup>-</sup>)</p>
// // <p style="text-align: justify;">B. cố định nitơ trong nước thành dạng đạm nitrát (NO<sub>3</sub><sup>-</sup>)</p>
// // <p style="text-align: justify;">C. biến đổi nitrit (NO<sub>2</sub><sup>-</sup>) thành nitrát (NO<sub>3</sub><sup>-</sup>)</p>
// // <p style="text-align: justify;">D. biến đổi nitơ trong khí quyển thành dạng đạm nitrát (NO<sub>3</sub><sup>-</sup>)</p>
// // <p style="text-align: justify;"><strong>Câu 6:</strong>\&nbsp;Trong chu trình cacbon, điều nào dưới đây là không đúng:</p>
// // <p style="text-align: justify;">A. cacbon đi vào chu trình dưới dạng cacbonđiôxit</p>
// // <p style="text-align: justify;">B. thông qua quang hợp, thực vật lấy CO<sub>2</sub>\&nbsp;để tạo ra chất hữu cơ</p>
// // <p style="text-align: justify;">C. động vật ăn cỏ sử dụng thực vật làm thức ăn chuyển các hợp chất chứa cacbon cho động vật ăn thịt</p>
// // <p style="text-align: justify;">D. phần lớn CO<sup>2</sup>\&nbsp;được lắng đọng, không hoàn trả vào chu trình</p>
// // <p style="text-align: justify;"><strong>Câu 7:</strong>\&nbsp;Sinh vật sản xuất là những sinh vật:</p>
// // <p style="text-align: justify;">A. phân giải vật chất (xác chết, chất thải) thành những chất vô cơ trả lại cho môi trường</p>
// // <p style="text-align: justify;">B. động vật ăn thực vật và động vật ăn động vật</p>
// // <p style="text-align: justify;">C. có khả năng tự tổng hợp nên các chất hữu cơ để tự nuôi sống bản thân</p>
// // <p style="text-align: justify;">D. chỉ gồm các sinh vật có khả năng hóa tổng hợp</p>
// // <p style="text-align: justify;"><strong>Câu 8:</strong>\&nbsp;Để cải tạo đất nghèo đạm, nâng cao năng suất cây trồng người ta sử dụng biện pháp sinh học nào?</p>
// // <p style="text-align: justify;">A. trồng các cây họ Đậu</p>
// // <p style="text-align: justify;">B. trồng các cây lâu năm</p>
// // <p style="text-align: justify;">C. trồng các cây một năm</p>
// // <p style="text-align: justify;">D. bổ sung phân đạm hóa học.</p>
// // <p style="text-align: justify;"><strong>II. Phần tự luận</strong>\&nbsp;<em>(6 điểm)</em></p>
// // <p style="text-align: justify;"><strong>Câu 1</strong>\&nbsp;(3 điểm): So sánh hệ sinh thái tự nhiên và hệ sinh thái nhân tạo.</p>
// // <p style="text-align: justify;"><strong>Câu 2</strong>\&nbsp;(3 điểm): Mô tả đặc điểm và ý nghĩa cuả các kiểu phân bố cơ bản trong quần thể.</p>
// // <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// // <p style="text-align: justify;"><strong>I. Phần trắc nghiệm</strong>\&nbsp;<em>(4 điểm)</em></p>
// // <p style="text-align: justify;"><em>Mỗi câu trả lời đúng 0.5 điểm</em></p>
// // <table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
// //  <tbody>
// //   <tr>
// //    <td valign="top" width="128"> <p align="center"><strong>1.D</strong></p> </td>
// //    <td valign="top" width="128"> <p align="center"><strong>2.C</strong></p> </td>
// //    <td valign="top" width="128"> <p align="center"><strong>3.A</strong></p> </td>
// //    <td valign="top" width="128"> <p align="center"><strong>4.A</strong></p> </td>
// //    <td valign="top" width="128"> <p align="center"><strong>5.C</strong></p> </td>
// //   </tr>
// //   <tr>
// //    <td valign="top" width="128"> <p align="center"><strong>6.D</strong></p> </td>
// //    <td valign="top" width="128"> <p align="center"><strong>7.C</strong></p> </td>
// //    <td valign="top" width="128"> <p align="center"><strong>8.A</strong></p> </td>
// //    <td valign="top" width="128"> <p align="center"><strong>\&nbsp;</strong></p> </td>
// //    <td valign="top" width="128"> <p align="center"><strong>\&nbsp;</strong></p> </td>
// //   </tr>
// //  </tbody>
// // </table>
// // <p style="text-align: justify;">\&nbsp;<strong>II. Phần tự luận</strong>\&nbsp;<em>(6 điểm)</em></p>
// // <p style="text-align: justify;"><strong>Câu 1</strong></p>
// // <p style="text-align: justify;"><strong>* Giống nhau: (1 điểm)</strong></p>
// // <p style="text-align: justify;">- Hệ sinh thái tự nhiên và nhân tạo đều có những đặc điếm chung về thành phần cấu trúc, bao gồm thành phần vật chất vô sinh và thành phần hữu sinh.</p>
// // <p style="text-align: justify;">- Thành phần vật chất vô sinh là môi trường vật lí (sinh cảnh) và thành phần hữu sinh là quần xã sinh vật.</p>
// // <p style="text-align: justify;">- Các sinh vật trong quần xã luôn tác động lẫn nhau và đồng thời tác động với các thành phần vô sinh của sinh cảnh.</p>
// // <p style="text-align: justify;"><strong>* Khác nhau:</strong></p>
// // <table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
// //  <tbody>
// //   <tr>
// //    <td valign="top"> <p>Hệ sinh thái tự nhiên</p> </td>
// //    <td valign="top"> <p>Hệ sinh thái nhân tạo</p> </td>
// //    <td valign="top"> <p>Điểm</p> </td>
// //   </tr>
// //   <tr>
// //    <td valign="top"> <p>Thành phần loài đa dạng</p> </td>
// //    <td valign="top"> <p>Thành phần loài ít, ít đa dạng</p> </td>
// //    <td valign="top"> <p>0,5</p> </td>
// //   </tr>
// //   <tr>
// //    <td valign="top"> <p>Ít chịu sự chi phối của con người</p> </td>
// //    <td valign="top"> <p>Chịu sự chi phối, điều khiển của con người</p> </td>
// //    <td valign="top"> <p>0,5</p> </td>
// //   </tr>
// //   <tr>
// //    <td valign="top"> <p>Sự tăng trưởng của các cá thể chậm, phụ thuộc vào điều kiện môi trường</p> </td>
// //    <td valign="top"> <p>Được áp dụng các biện pháp canh tác và kĩ thuật hiện đại nên sinh trưởng của các cá thể nhanh, năng suất sinh học cao</p> </td>
// //    <td valign="top"> <p>0,5</p> </td>
// //   </tr>
// //   <tr>
// //    <td valign="top"> <p>Tính ổn định cao, tự điều chỉnh, mắc bệnh ít chuyển thành dịch</p> </td>
// //    <td valign="top"> <p>Tính ổn định thấp, dễ bị biến đổi, dễ mắc dịch bệnh</p> </td>
// //    <td valign="top"> <p>0,5</p> </td>
// //   </tr>
// //  </tbody>
// // </table>
// // <p style="text-align: justify;"><strong>Câu 2</strong></p>
// // <table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
// //  <tbody>
// //   <tr>
// //    <td valign="top"> <p>Kiểu phân bố</p> </td>
// //    <td valign="top"> <p>Đặc điểm</p> </td>
// //    <td valign="top"> <p>Ý nghĩa sinh thái</p> </td>
// //    <td valign="top"> <p>Điểm</p> </td>
// //   </tr>
// //   <tr>
// //    <td valign="top"> <p>Phân bố theo nhóm</p> </td>
// //    <td valign="top"> <p>Là kiểu phân bố phổ biến nhất, các cá thể của quần thể tập trung theo từng nhóm ở những nơi có điều kiện sống tốt nhất. Phân bố theo nhóm xuất hiện nhiều ở sinh vật sống thành bầy đàn, khi chúng trú đông, ngủ đông, di cư...</p> </td>
// //    <td valign="top"> <p>Các cá thể hỗ trợ lẫn nhau chống lại điều kiện bất lợi của môi trường.</p> </td>
// //    <td valign="top"> <p>1</p> </td>
// //   </tr>
// //   <tr>
// //    <td valign="top"> <p>Phân bố đồng đều</p> </td>
// //    <td valign="top"> <p>Thường gặp khi điều kiện sống phân bố một cách đồng đều trong môi trường và khi có sự cạnh tranh gay gắt giữa các cá thể của quần thể.</p> </td>
// //    <td valign="top"> <p>Làm giảm mức độ cạnh tranh giữa các cá thể trong quần thể.</p> </td>
// //    <td valign="top"> <p>1</p> </td>undefined
// //   </tr>
// //   <tr>
// //    <td valign="top"> <p>Phân bố ngẫu nhiên</p> </td>
// //    <td valign="top"> <p>Là dạng trung gian của hai dạng trên.</p> </td>
// //    <td valign="top"> <p>Sinh vật tận dụng được nguồn sống tiềm tàng trong môi trường.</p> </td>
// //    <td valign="top"> <p>1</p> </td>
// //   </tr>
// //  </tbody>
// // </table>
// // <p style="text-align: right;"><strong>\&nbsp;</strong></p>
// // <div class="clearfix"></div>`;

// // string_inner_html = `
// // <h2 class="s14 lineheight"></h2>
// // <p><strong class="content_question">Đề bài</strong></p>
// // <p style="text-align: justify;">Tại sao đột biến gen mặc dù thường có hại cho cơ thể sinh vật nhưng vẫn có vai trò quan trọng trong quá trình tiến hoá?</p>
// // <p style="text-align: justify;">I. Tần số đột biến gen trong tự nhiên là không đáng kể nên tần số alen đột biến có hại là rất thấp.</p>
// // <p style="text-align: justify;">II. Gen đột biến có thể có hại trong môi trường này nhưng lại có thể có hại hoặc có lợi trong môi trường khác.</p>
// // <p style="text-align: justify;">III. Gen đột biến có thể có hại trong tổ hợp gen này nhưng lại có thể trở nên có hại hoặc có lợi trong tổ hợp gen khác.</p>
// // <p style="text-align: justify;">IV. Đột biến gen thường có hại nhưng nó thường tổn tại ở trạng thái dị hợp tử nên không gây hại.</p>
// // <p class="Bodytext1" style="text-align: justify;">Câu trả lời đúng nhất là:</p>
// // <p class="Bodytext250" style="text-align: justify;" align="left">A. I và II\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;B. I và III</p>
// // <p class="Bodytext250" style="text-align: justify;" align="left">C. IV và III \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;D. II và III</p>
// // <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// // <p>Xét các phát biểu:</p>
// // <p>I sai, tần số đột biến gen thấp nhưng không phải gen đột biến nào cũng gây hại</p>
// // <p>II đúng,</p>
// // <p>III đúng</p>
// // <p>IV Sai, có nhiều đột biến tạo ra gen trội gây hại ở ngay trạng thái dị hợp tử</p>
// // <p><strong>Trả lời Chọn D</strong></p>
// // <div class="clearfix"></div>`

// // string_inner_html = `<h2 class="s14 lineheight"></h2>
// // <p><strong class="content_question">Đề bài</strong></p>
// // <p style="text-align: justify;"><strong>Câu 1.</strong> Cho tứ diện EFKI. G là trọng tâm của tam giác KIE. Mệnh đề nào sau đây là mệnh đề đúng ?</p>
// // <p style="text-align: justify;">A. \(3\overrightarrow {FG}\&nbsp; = \overrightarrow {FE}\&nbsp; + \overrightarrow {FK}\&nbsp; + \overrightarrow {FI} \).</p>
// // <p style="text-align: justify;">B. \(3\overrightarrow {EG}\&nbsp; = \overrightarrow {EF}\&nbsp; + \overrightarrow {EK}\&nbsp; + \overrightarrow {EI} \).</p>
// // <p style="text-align: justify;">C. \(\overrightarrow {FG}\&nbsp; = \overrightarrow {FE}\&nbsp; + \overrightarrow {FK}\&nbsp; + \overrightarrow {FI} \).\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">D. \(\overrightarrow {EG}\&nbsp; = \overrightarrow {EF}\&nbsp; + \overrightarrow {EK}\&nbsp; + \overrightarrow {EI} \).</p>
// // <p style="text-align: justify;"><strong>Câu 2</strong>. Trong không gian cho hai đường thẳng a và b vuông góc với nhau. Tìm mệnh đề đúng.</p>
// // <p style="text-align: justify;">A. a và b chéo nhau.\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">B. a và b cắt nhau.</p>
// // <p style="text-align: justify;">C. a và b cùng thuộc một mặt phẳng.\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">D. Góc giữa a và b bằng 90<sup>0</sup>.</p>
// // <p style="text-align: justify;"><strong>Câu 3.</strong> Tìm mệnh đề đúng.</p>
// // <p style="text-align: justify;">A. Nếu một đường thẳng vuông góc với một đường thẳng thuộc một mặt phẳng thì nó vuông góc với mặt phẳng ấy.</p>
// // <p style="text-align: justify;">B. Nếu một đường thẳng vuông góc với hai đường thẳng cùng thuộc một mặt phẳng thì nó vuông góc với mặt phẳng ấy.</p>
// // <p style="text-align: justify;">C. Nếu một đường thẳng vuông góc với hai đường thẳng cắt nhau cùng thuộc một mặt phẳng thì nó vuông với mặt phẳng ấy.</p>
// // <p style="text-align: justify;">D. Nếu một đường thẳng vuông góc với hai đường thẳng cắt nhau cùng song song một mặt phẳng thì nó vuông góc với mặt phẳng ấy.</p>
// // <p style="text-align: justify;"><strong>Câu 4.</strong> Cho hình chóp S. ABC có đáy ABC là tam giác cân tại A, cạnh bên SA vuông góc với đáy, M là trung điểm BC, J là trung điểm BM. Khẳng định nào sau đây đúng ?</p>
// // <p style="text-align: justify;">A. \(BC \bot \left( {SAB} \right)\).\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">B. \(BC \bot \left( {SAM} \right)\).</p>
// // <p style="text-align: justify;">C. \(BC \bot \left( {SAC} \right)\).\&nbsp;\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">D. \(BC \bot \left( {SAJ} \right)\).</p>
// // <p><strong>Câu 5.</strong> Cho tứ diện ABCD. Gọi M, N, P, Q lần lượt là trung điểm của AB, BD, BC, CD. Bộ ba vec tơ không đồng phẳng là:</p>
// // <p>A. \(\overrightarrow {AB} \,,\,\overrightarrow {PN} \,,\,\overrightarrow {CD} \).</p>
// // <p>B. \(\overrightarrow {MP} \,,\overrightarrow {AC} \,,\,\overrightarrow {AD} \).</p>
// // <p>C. \(\overrightarrow {AB} \,,\,\overrightarrow {AC} \,,\,\overrightarrow {AD} \)\&nbsp; \&nbsp;</p>
// // <p>D. \(\overrightarrow {BD} \,,\,\overrightarrow {PQ} \,,\,\overrightarrow {AC} \).</p>
// // <p style="text-align: justify;"><strong>Câu 6.</strong> Cho tứ diện ABCD có AB, BC, CD đôi một vuông góc . Đường vuông góc chung của AB và CD là:</p>
// // <p style="text-align: justify;">A. AC.</p>
// // <p style="text-align: justify;">B. BC.</p>
// // <p style="text-align: justify;">C. AD.\&nbsp;</p>
// // <p style="text-align: justify;">D. BD.</p>
// // <p style="text-align: justify;"><strong>Câu 7.</strong> Cho hình chóp S. ABCD có BACD là hình vuông và \(SA \bot (ABCD)\). Gọi O là giao điểm của AC và BD. Tam giác SOD là:</p>
// // <p style="text-align: justify;">A. Tam giác thường.\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">B. Tam giác đều.</p>
// // <p style="text-align: justify;">C. Tam giác cân\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">D. Tam giác vuông.</p>
// // <p style="text-align: justify;"><strong>Câu 8.</strong> Cho hình hộp ABCD.A’B’C’D’ có tất cả các cạnh bằng nhau và \(\widehat {ABC} = \widehat {B'BA} = \widehat {B'BC} = {60^0}\). Diện tích tứ giác A’B’C’D’ là:</p>
// // <p style="text-align: justify;">A. \(\dfrac{2}{3}{a^2}\).\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp; B. \(\dfrac{1}{3}{a^2}\).</p>
// // <p style="text-align: justify;">C. \(\dfrac{4}{3}{a^2}\).\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp; \&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;D. \(\dfrac{{{a^2}\sqrt 3 }}{2}\).</p>
// // <p style="text-align: justify;"><strong>Câu 9.</strong> Cho hình chóp tứ giác đều S.ABCD có cạnh bằng a và góc giữa cạnh bên với mặt phẳng đáy bằng \(\alpha \). Tan của góc giữa\&nbsp; mặt bên và mặt đay bằng:</p>
// // <p style="text-align: justify;">A. \(\tan \alpha \).\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp; B. \(\cot \alpha \).</p>
// // <p style="text-align: justify;">C. \(\sqrt 2 \tan \alpha \).\&nbsp; \&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;D. \(\dfrac{{\sqrt 2 }}{{2\tan \alpha }}\).</p>
// // <p style="text-align: justify;"><strong>Câu 10.</strong> Cho hình tứ diện ABCD có AB, BC, CD đôi một vuông góc . Mặt phẳng (ABD) vuông góc với mặt phẳng nào cua tứ diện ?</p>
// // <p style="text-align: justify;">A. (ACD).\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">B.(ABC).</p>
// // <p style="text-align: justify;">C. (BCD).\&nbsp;\&nbsp;\&nbsp;\&nbsp;\&nbsp;</p>
// // <p style="text-align: justify;">D. Không có mặt phẳng nào .</p>
// // <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// // <table border="1" cellspacing="0" cellpadding="0">
// //  <tbody>
// //   <tr>
// //    <td style="text-align: center;" valign="top" width="106"> <p>Câu</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>1</strong></p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>2</strong></p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>3</strong></p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>4</strong></p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>5</strong></p> </td>
// //   </tr>
// //   <tr>
// //    <td style="text-align: center;" valign="top" width="106"> <p>Đáp án</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>A</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>D</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>C</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>B</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>C</p> </td>
// //   </tr>
// //   <tr>
// //    <td style="text-align: center;" valign="top" width="106"> <p>Câu</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>6</strong></p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>7</strong></p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>8</strong></p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>9</strong></p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p><strong>10</strong></p> </td>
// //   </tr>
// //   <tr>
// //    <td style="text-align: center;" valign="top" width="106"> <p>Đáp án</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>B</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>D</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>D</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>C</p> </td>
// //    <td style="text-align: center;" valign="top" width="106"> <p>C</p> </td>
// //   </tr>
// //  </tbody>
// // </table>
// // <p style="text-align: left;"><strong>Lời giải chi tiết</strong></p>
// // <p><strong>Câu 1.</strong> Do G là trọng tâm tam giác KIE nên ta có \(3\overrightarrow {FG}\&nbsp; = \overrightarrow {FE}\&nbsp; + \overrightarrow {FK}\&nbsp; + \overrightarrow {FI} \) . Chọn đáp án A.</p>
// // <p><strong>Câu 4.</strong></p>
// // <p>\&nbsp;<img src="https://img./picture/2018/1221/2018-12-21-113442.jpg" alt="" width="246" height="285"></p>
// // <p>\&nbsp;Do \(\Delta ABC\)\&nbsp; là tam giác cân tại A , M là trung điểm BC nên \(AM \bot BC\) . Lại có \(SA \bot BC\). Do đó, \(BC \bot \left( {SAM} \right)\) . Chọn đáp án B.</p>
// // <p><strong>Câu 6.</strong> Do tứ diện ABCD có AB, BC, CD đôi một vuông góc nên ta có \(AB \bot BC,\,CD \bot BC\). Từ đó, ta có BC là đường vuông góc chung của AB và CD. Chọn đáp án B.</p>
// // <p><strong>Câu 7.</strong></p>
// // <p><img src="https://img.loigiaihay.com/picture/2018/1221/2018-12-21-113614.jpg" alt="" width="269" height="330"></p>
// // <p>Xét hai tam giác \(\Delta SAD,\,\Delta SAB\,\) có SA chung, AD = AB và \(\widehat {SAD} = \widehat {SAB} = {90^0}\,\,(SA \bot (ABCD))\)nên \(\Delta SAD = \Delta SAB\,\,\, \Rightarrow SD = SB\). Do đó, \(\Delta SBD\)\&nbsp; cân tại S.</p>
// // <p>Lại có O là giao điểm của hai đường chéo trong hình vuông ABCD nên\&nbsp; O là trung điểm của DB.</p>
// // <p>Suy ra tam giác SBD có \(SO \bot BD\,\,\, \Rightarrow \,\,\Delta SOD\)\&nbsp; vuông tại O.</p>
// // <p>Chọn đáp án D.</p>
// // <p><strong>Câu 8.</strong></p>
// // <p><img src="https://img.loigiaihay.com/picture/2018/1221/2018-12-21-113701.jpg" alt="" width="287" height="308">\&nbsp;</p>
// // <p>Do ABCD.A’B’C”D’ là hình hộp nên ta có diện tích tứ diện A’B’C’D’ bằng diện tích ABCD. Ta tính diện tích của ABCD có \(\widehat {ABC} = {60^0},\,BA = BC = a\) suy ra tam giác ABC đều. Từ đó, \({S_{ABCD}} = \dfrac{{a\sqrt 3 }}{2}.a = \dfrac{{{a^2}\sqrt 3 }}{2}\). Chọn đáp án D.</p>
// // <p><strong>Câu 9.</strong></p>
// // <p>\&nbsp;<img src="https://img.loigiaihay.com/picture/2018/1221/2018-12-21-113744.jpg" alt="" width="272" height="362"></p>
// // <p>Lấy M là trung điểm BC. Do ABCD là hình vuông nên các cạnhvà đường chéo bằng nhau ,\(AC \bot BD\). Ta có \(OD = OM\sqrt 2 \). \(SO \bot \left( {ABCD} \right)\)nên tam giác SOD và tam giác SOM vuông tại O.</p>
// // <p>\(\begin{array}{l}\left( {(SBC),(ABCD)} \right) = \left( {SM,MO} \right) = \widehat {SMO} = \beta ,\\ \tan\alpha\&nbsp; = \dfrac{{SO}}{{OD}},\,\tan \beta\&nbsp; = \dfrac{{SO}}{{OM}}\\OD = \sqrt 2 OM \Rightarrow \tan \alpha\&nbsp; = \dfrac{{SO}}{{\sqrt 2 OM}} = \dfrac{{\tan \beta }}{{\sqrt 2 }}\\ \Rightarrow \tan \beta\&nbsp; = \sqrt 2 \tan \alpha \end{array}\)</p>
// // <p>Chọn đáp án C</p>
// // <p><strong>Câu 10.</strong></p>
// // <p>\&nbsp;<img src="https://img.loigiaihay.com/picture/2018/1221/2018-12-21-113832.jpg" alt="" width="234" height="356"></p>
// // <p>Ta có</p>
// // <p>\(\begin{array}{l}\left\{ \begin{array}{l}AB \bot BC\\AB \bot CD\end{array} \right.\,\, \Rightarrow \,\,AB \bot \left( {BCD} \right)\\AB \subset (ABD)\\ \Rightarrow \left( {ABD} \right) \bot \left( {BCD} \right)\end{array}\)</p>
// // <p style="text-align: right;"><strong></strong></p>
// // <div class="clearfix"></div>`

// // string_inner_html = `<h2 class="s14 lineheight"></h2>
// // <p><strong>Bài 1. </strong>Trong các mệnh đề sau, mệnh đều nào đúng?</p>
// // <p>A. Mọi hình hộp có mặt cầu ngoại tiếp.</p>
// // <p>B. Mọi hình hộp đứng có mặt cầu ngoại tiếp.</p>
// // <p>C. Mọi hình hộp có mặt bên vuông góc với đáy đều có mặt cầu ngoại tiếp.</p>
// // <p>D. Mọi hình hộp chữ nhật đều có mặt cầu ngoại tiếp.</p>
// // <p><strong>Giải</strong></p>
// // <p><strong>\&nbsp;</strong>Hình bình hành nội tiếp đường trong phải là hình chữ nhật.</p>
// // <p>Chọn (D).</p>
// // <p><strong>Bài \&nbsp;2. </strong>Trong số các hình hộp nội tiếp một mặt cầu bán kính R thì</p>
// // <p>(A) Hình hộp có đáy là hình vuông có thể tích lớn nhất.</p>
// // <p>(B) Hình lập phương có thể tích lớn nhất.</p>
// // <p>(C) Hình hộp có kích thước tạo thành cấp số cộng công sai khác 0 có thể tích lớn nhất.</p>
// // <p>(D) Hình hộp có kích thước tạo thành cấp số nhân công bội khác 1 có thể tích lớn nhất.</p>
// // <p><strong>Giải</strong></p>
// // <p>Hình hộp nội tiếp một mặt cầu là hình hộp chữ nhật có đường chéo \(d = 2R\). Gọi \(x, y, z\) là các kích thước của hình hộp chữ nhật.</p>
// // <p>Ta có \({x^2} + {y^2} + {z^2} = {d^2} = 4{R^2}\)</p>
// // <p>Áp dụng BĐT Cô – si cho 3 số dương ta có:</p>
// // <p>\(4{R^2} = {x^2} + {y^2} + {z^2} \ge 3\root 3 \of {{x^2}{y^2}{z^2}}\&nbsp; = 3\root 3 \of {{V^2}}\&nbsp; \Rightarrow {V^2} \le {\left( {{{4{R^2}} \over 3}} \right)^3}\)</p>
// // <p>\(V\) đạt giá trị lớn nhất khi và chỉ khi \(x = y = z\).</p>
// // <p>Chọn (B).</p>
// // <p><strong>Bài 3.</strong> Một hình cầu có thể tích \({4 \over 3}\pi \)\&nbsp;ngoại tiếp một hình lập phương. Trong các số sau đây, số nào là thể tích khối lập phương?</p>
// // <p>(A) \({{8\sqrt 3 } \over 9}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (B) \({8 \over 3}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(C) 1\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(D) \(2\sqrt 3 \)</p>
// // <p><strong>Giải</strong></p>
// // <p>Giả sử bán kính mặt cầu là \(R\) và cạnh hình lập phương là a thì thể tích khối cầu là \(V = {4 \over 3}\pi {R^3} \Rightarrow R = 1\) và \(4{R^2} = 3{a^2} = 4 \Rightarrow a = {2 \over {\sqrt 3 }}\)</p>
// // <p>Thể tích khối lập phương là \(V = {a^3} = {\left( {{2 \over {\sqrt 3 }}} \right)^3} = {8 \over {3\sqrt 3 }} = {{8\sqrt 3 } \over 9}\).</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 4. </strong>Trong các mệnh đề sau, mệnh đề nào đúng?</p>
// // <p>(A) Hình chóp có đáy là tứ giác thì có mặt cầu ngoại tiếp.</p>
// // <p>(B) Hình chóp có đáy là hình thang vuông thì có mặt cầu ngoại tiếp.</p>
// // <p>(C) Hình chóp có đáy là hình bình hành thì có mặt cầu ngoại tiếp.</p>
// // <p>(D) Hình chóp có đáy là hình thang cân thì có mặt cầu ngoại tiếp.</p>
// // <p><strong>Giải</strong></p>
// // <p>Hình chóp có đáy là tứ giác có mặt cầu ngoại tiếp thì đáy phải là tứ giác nội tiếp đường tròn.</p>
// // <p>Chọn (D).</p>
// // <p><strong>Bài 5. </strong>Cho tứ diện đều \(ABCD\) có cạnh bằng \(a\). Tập hợp các điểm \(M\) sao cho \(M{A^2} + M{B^2} + M{C^2} + M{D^2} = 2{a^2}\)</p>
// // <p>(A) Mặt cầu có tâm là trọng tâm của tam giác \(ABC\) và bán kính bằng \({{a\sqrt 2 } \over 2}\).</p>
// // <p>(B) Mặt cầu có tâm là trọng tâm của tứ diện và bán kính bằng \({{a\sqrt 2 } \over 4}\).</p>
// // <p>(C) Mặt cầu có tâm là trọng tâm của tứ diện và bán kính bằng \({{a\sqrt 2 } \over 2}\).<br>(D) Mặt cầu có tâm là trọng tâm của tam giác \(ABC\) và bán kính bằng \({{a\sqrt 2 } \over 4}\).</p>
// // <p><strong>Giải</strong></p>
// // <p><strong><img src="https://img./picture/2017/1108/toan-8_4.jpg" alt="" width="217" height="233"></strong></p>
// // <p>Gọi \(G\) là trọng tâm tứ diện \(ABCD, AA’\) là đường cao xuất phát từ \(A\) của tứ diện \(ABCD\). Ta có:</p>
// // <p>\(\eqalign{<br> &amp; AA' = \sqrt {A{B^2} - BA{'^2}} = \sqrt {{a^2} - {{{a^2}} \over 3}} = {{a\sqrt 6 } \over 3} \cr <br> &amp; \Rightarrow GA = GB = GC = GD = {3 \over 4}AA' = {{a\sqrt 6 } \over 4} \cr} \)</p>
// // <p>Ta có:\&nbsp; \&nbsp;\(M{A^2} + M{B^2} + M{C^2} + M{D^2} = 2{a^2}\)</p>
// // <p>\(\eqalign{<br> &amp; \Leftrightarrow {\left( {\overrightarrow {GA} - \overrightarrow {GM} } \right)^2} + {\left( {\overrightarrow {GB} - \overrightarrow {GM} } \right)^2} + {\left( {\overrightarrow {GC} - \overrightarrow {GM} } \right)^2} + {\left( {\overrightarrow {GD} - \overrightarrow {GM} } \right)^2} = 2{a^2} \cr <br> &amp; \Leftrightarrow 4G{A^2} + 4G{M^2} - 2\overrightarrow {GM} \left( {\overrightarrow {GA} + \overrightarrow {GB} + \overrightarrow {GC} + \overrightarrow {GD} } \right) = 2{a^2} \cr <br> &amp; \Leftrightarrow M{G^2} = {{{a^2}} \over 2} - G{A^2} = {{{a^2}} \over 8} \Rightarrow MG = {{a\sqrt 2 } \over 4} \cr} \)</p>
// // <p>Tập hợp các điểm \(M\) là mặt cầu tâm \(G\) bán kính \({{a\sqrt 2 } \over 4}\) . Chọn (B).</p>
// // <p><strong>Bài 6.</strong> Bán kính mặt cầu tiếp xúc với các cạnh của tứ diện đều \(ABCD\) cạnh bằng \(a\) là:</p>
// // <p>(A) \({{a\sqrt 2 } \over 2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \({{a\sqrt 2 } \over 4}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(C) \(a\sqrt 2 \)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) \(2a\sqrt 2 \)</p>
// // <p><strong>Giải</strong></p>
// // <p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_5.jpg" alt="" width="236" height="261"></p>
// // <p>Gọi \(M, N\) lần lượt là trung điểm hai cạnh \(AB\) và \(CD\) của tứ diện đều \(ABCD\).</p>
// // <p>\(I\) là trung điểm của \(MN\) thì \(I\) cách đều \(6\) cạnh tứ diện nên \(I\) là tâm mặt cầu tiếp xúc với các cạnh của tứ diện đều.</p>
// // <p>Bán kính mặt cầu: \(R = {{MN} \over 2}\)</p>
// // <p>Ta có: \(M{N^2} = A{N^2} - M{A^2} = A{D^2} - N{D^2} - M{A^2} = {a^2} - {{{a^2}} \over 4} - {{{a^2}} \over 4} = {{{a^2}} \over 2} \Rightarrow MN = {{a\sqrt 2 } \over 2} \Rightarrow R = {{a\sqrt 2 } \over 4}\).</p>
// // <p>Chọn (B).</p>
// // <p><strong>Bài 7. </strong>Trong số các mệnh đề sau, mệnh đề nào đúng?</p>
// // <p>(A) Có duy nhất một măt cầu đi qua hai đường tròn nằm trong hai mặt phẳng cắt nhau.</p>
// // <p>(B) Có duy nhất một măt cầu đi qua hai đường tròn nằm trong hai mặt phẳng song song.</p>
// // <p>(C) Có duy nhất một măt cầu đi qua hai đường tròn cắt nhau.</p>
// // <p>(D) Có duy nhất một măt cầu đi qua hai đường tròn cắt nhau tại hai điểm phân biệt và không cùng nằm trong một mặt phẳng.</p>
// // <p><strong>Giải\&nbsp;</strong></p>
// // <p>Chon D.</p>
// // <p><strong>Bài 8. </strong>Cho hai điểm \(A, B\) phân biệt. Tập hợp các điểm \(M\) sao cho diện tích tam giác \(MAB\) không đổi là:</p>
// // <p>(A) Hai đường thẳng song song;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) Một mặt cầu;</p>
// // <p>(C) Một mặt trụ;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) Một mặt nón.</p>
// // <p><strong>Giải</strong></p>
// // <p>Tập hợp các điểm \(M\) sao cho khoảng cách từ \(M\) đến \(AB\) không đổi.</p>
// // <p>Chọn (C).</p>
// // <p><strong>Bài 9. </strong>Cho hai điểm phân biệt \(A, B\) cố định và phân biệt. Một đường thẳng \(l\) thay đổi luôn đi qua \(A\)\&nbsp;</p>
// // <p>và cách \(B\) một khoảng \({{AB} \over 2}\). Gọi \(H\) là hình chiếu của \(B\) trên \(l\). Tập hợp điểm \(H\) là:</p>
// // <p>(A) Một mặt phẳng;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (B) Một mặt trụ;</p>
// // <p>(C) Một mặt nón;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) Một đường tròn.</p>
// // <p><strong>Giải</strong></p>
// // <p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_6.jpg" alt="" width="327" height="207"></p>
// // <p>\(\sin \widehat {HAB} = {{BH} \over {AB}} = {1 \over 2} \Rightarrow \widehat {HAB} = {30^0}\)</p>
// // <p>Tập hợp \(l\) là mặt nón có trục AB, đường sinh \(l\), góc ở đỉnh là \({60^0}\). Gọi \(I\) là hình chiếu của H lên AB.</p>
// // <p>Ta có: \(BI = BH.cos{60^0} = {{AB} \over 4} \Rightarrow I\) cố định.</p>
// // <p>\( \Rightarrow H\) thuộc mặt phẳng qua \(I\) vuông góc với \(AB\). Vậy tâp hợp \(H\) là đường tròn.</p>
// // <p>Chọn (D).</p>
// // <p><strong>Bài 10. </strong>Với điểm \(O\) cố định thuộc mặt phẳng \((P)\) cho trước, xét đường thẳng \(l\)<em>\&nbsp;</em>thay đổi đi qua \(O\) và tạo với \((P)\) góc \(30^0\)\&nbsp;Tập hợp các đường thẳng \(l\)<em>\&nbsp;</em>trong không gian là:</p>
// // <p>(A) Một mặt phẳng;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) Hai đường thẳng;</p>
// // <p>(C) Một mặt trụ;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(D) Một mặt nón.</p>
// // <p><strong>Giải</strong></p>
// // <p>Chọn D.</p>
// // <p><strong>Bài 11.</strong> Một hình trụ có bán kính đáy bằng \(a\), đường cao \({\rm{OO}}' = a\sqrt 3 \). Một đoạn thẳng \(AB\) thay đổi sao cho góc giữa \(AB\) và trục hình trụ bằng \(30^0\). \(A, B\) thuộc hai đường tròn đáy của hình trụ. Tập hợp các trung điểm \(I\) của \(AB\) là:</p>
// // <p>(A) Một mặt trụ;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (B) Một mặt cầu;</p>
// // <p>(C) Một đường tròn;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) Một mặt phẳng.</p>
// // <p><strong>Giải</strong></p>
// // <p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_7.jpg" alt="" width="235" height="275"></strong></p>
// // <p>Gọi \(A’\) là hình chiếu của \(A\) xuống mặt phẳng đáy thì \(AA’ = OO’\). Gọi \(I, M, N\) lần lượt là trung điểm của \(OO’, AB\) và \(AA’\).</p>
// // <p>Ta có: \(IA = IB\) và \(IM \bot AB\).</p>
// // <p>Mp(IMN) qua \(I\) và song song với hai mặt phẳng đáy.</p>
// // <p>Ta có: \(MN = AN.\tan {30^0} = {{a\sqrt 3 } \over 2}.{1 \over {\sqrt 3 }} = {a \over 2}\)</p>
// // <p>\( \Rightarrow MI = \sqrt {N{I^2} - M{N^2}}\&nbsp; = \sqrt {{a^2} - {{{a^2}} \over 4}}\&nbsp; = {{a\sqrt 3 } \over 2}\)</p>
// // <p>Vậy tập hợp trung điểm \(M\) của \(AB\) là đường tròn tâm \(I\) bán kính \({{a\sqrt 3 } \over 2}\) nằm trong mp\((IMN)\).<br>Chọn (C).</p>
// // <p><strong>Bài 12.</strong> Trong mặt phẳng (P) cho góc xOy. Một mặt phẳng (Q) thay đổi và vuông góc với đường phân giác trong của góc xOy, cắt Ox, Oy tại A, B. Trong (Q) lấy điểm M sao cho \(\widehat {AMB} = {90^0}\). Khi ấy, tập hợp điểm M là:</p>
// // <p>(A) Một đường tròn;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (B) Một mặt trụ;</p>
// // <p>(C) Một mặt nón;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(D) Một mặt cầu.</p>
// // <p><strong>Giải</strong></p>
// // <p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-81_1.jpg" alt="" width="300" height="317"></strong></p>
// // <p>Tập hợp M là một mặt nón đỉnh O.</p>
// // <p>Chọn (C).</p>
// // <p><strong>Bài 13.</strong> Cho hình lập phương ABCD.A’B’C’D’ có cạnh a. Diện tích xung quanh của hình nón tròn xoay sinh bởi đường gấp khúc AC’A’ khi quay quanh AA’ bằng:</p>
// // <p>(A) \(\pi {a^2}\sqrt 6 \)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \(\pi {a^2}\sqrt 3 \)\&nbsp;</p>
// // <p>(C) \(\pi {a^2}\sqrt 2 \)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) \(\pi {a^2}\sqrt 5 \)</p>
// // <p><strong>Giải</strong></p>
// // <p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_8.jpg" alt="" width="245" height="251"></p>
// // <p>Hình nón tròn xoay sinh bởi đường gấp khúc AC’A’ khi quay quanh \(AA' \) có bán kính đáy \(A'C'=a\sqrt 2\) và độ dài đường sinh \(AC' = a\sqrt 3 \) nên diện tích xung quanh của hình nón là: \({S_{xq}} = {1 \over 2}2\pi a\sqrt 2 .a\sqrt 3\&nbsp; = \pi {a^2}\sqrt 6 \)</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 14.</strong> Cho hình nón có bán kính đáy bằng a. Một dây cung thay đổi của đường tròn đáy có độ dài không đổi bằng a. Tập hợp các trung điểm của đoạn thẳng nối đỉnh hình nón với trung điểm của dây cung đó là:</p>
// // <p>(A) Một mặt nón cố đinh;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) Một mặt phẳng cố đinh;</p>
// // <p>(C) Một mặt trụ cố định;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) Một đường tròn cố đinh.</p>
// // <p>Giải</p>
// // <p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_9.jpg" alt="" width="243" height="288"></p>
// // <p>Gọi I là trung điểm AB ta có \(OI = \sqrt {O{B^2} - I{B^2}}\&nbsp; = \sqrt {{a^2} - {{{a^2}} \over 4}}\&nbsp; = {{a\sqrt 3 } \over 2}\)</p>
// // <p>Tập hợp I là đường tròn tâm O bán kính \({{a\sqrt 3 } \over 2}\)\&nbsp;trong mặt phẳng đáy hình nón. Gọi O’ là trung điểm SO và M là trung điểm của SI thì \(MO' = {1 \over 2}OI = {{a\sqrt 3 } \over 4}\)</p>
// // <p>Tập hợp các điểm M là đường tròn tâm O’ bán kính \({{a\sqrt 3 } \over 4}\) nằm trong mặt phẳng qua O’ và song song với mặt phẳng đáy.</p>
// // <p>Chọn (D).</p>
// // <p><strong>Bài 15.</strong> Cho hình trụ có bán kính đáy bằng R, chiều cao OO’. Cắt hình trụ đó bằng \(mp\left( \alpha\&nbsp; \right)\)\&nbsp;vuông góc với đáy và cách điểm O một khoảng bằng h cho trước (h&lt;R). Khi ấy, \(mp\left( \alpha\&nbsp; \right)\)\&nbsp;có tính chất:</p>
// // <p>(A) Luôn tiếp xúc với một mặt trụ cố định;</p>
// // <p>(B) Luôn cách một mặt phẳng cho trước qua trục hình trụ một khoáng h ;</p>
// // <p>(C) Cắt hình trụ theo thiết diện là hình vuông ;</p>
// // <p>(D) Cả ba tính chất trên đều sai.</p>
// // <p><strong>Giải</strong></p>
// // <p>\(mp\left( \alpha\&nbsp; \right)\)\&nbsp;luôn tiếp xúc với một mặt trụ cố định đường cao OO’ bán kính đáy h.</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 16.</strong> Một khối trụ có bán kính đáy \(a\sqrt 3 \), chiều cao \(2a\sqrt 3 \). Thể tích của khối cầu ngoại tiếp khối trụ là:</p>
// // <p>(A) \(8\sqrt 6 \pi {a^3}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \(6\sqrt 6 \pi {a^3}\)\&nbsp;</p>
// // <p>(C) \({4 \over 3}\sqrt 6 \pi {a^3}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(D) \(4\sqrt 3 \pi {a^3}\)</p>
// // <p><strong>Giải</strong></p>
// // <p>Đường kính khối cầu ngoại tiếp khối trụ là \(d = 2R = \sqrt {{{\left( {2a\sqrt 3 } \right)}^2} + {{\left( {2a\sqrt 3 } \right)}^2}}\&nbsp; = 2a\sqrt 6\&nbsp; \Rightarrow R = a\sqrt 6 \)<br><br>Thể tích khối cầu là \(V = {4 \over 3}\pi {\left( {a\sqrt 6 } \right)^3} = 8\pi {a^3}\sqrt 6 \).</p>
// // <p>Chọn (A).<br><strong>Bài 17.</strong>Cho hình nón có đường sinh bằng đường kính đáy và bằng 2. Bán kính mặt cầu ngoại tiếp hình nón đó là</p>
// // <p>(A) \(\sqrt 3 \)\&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \(2\sqrt 3 \)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(C) \({{\sqrt 3 } \over 2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) \({{2\sqrt 3 } \over 3}\)</p>
// // <p><strong>Giải</strong></p>
// // <p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_10.jpg" alt="" width="237" height="258"></p>
// // <p>Gọi AB là đường kính của mặt cầu ngoại tiếp hình nón, I là tâm đường tròn đáy của hình nón \(AI = \sqrt {A{C^2} - C{I^2}}\&nbsp; = \sqrt 3 \)</p>
// // <p>\(\Delta ABC\) vuông tại C nên \(A{C^2} = AI.AB \Rightarrow AB = {{A{C^2}} \over {AI}} = {4 \over {\sqrt 3 }} = {{4\sqrt 3 } \over 3}\)</p>
// // <p>\( \Rightarrow R = {{AB} \over 2} = {{2\sqrt 3 } \over 3}\). Chọn (D).</p>
// // <p><strong>Bài 18.</strong> Cho hình nón sinh bởi một tam giác đều cạnh a khi quay quanh một đường cao. Một mặt cầu có diện tích bằng diện tích toàn phần của hình nón thì có bán kính là</p>
// // <p>(A) \({{a\sqrt 3 } \over 4}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \({{a\sqrt 2 } \over 4}\)\&nbsp;</p>
// // <p>(C) \({{a\sqrt 2 } \over 2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) \({{a\sqrt 3 } \over 2}\)</p>
// // <p><strong>Giải</strong></p>
// // <p>Diện tích toàn phần của hình nón là \({S_{tp}} = {S_{xq}} + {S_d} = \pi rl + \pi {r^2} = \pi {{{a^2}} \over 2} + \pi {{{a^2}} \over 4} = \pi {a^2}{3 \over 4}\)</p>
// // <p>Diện tích mặt cầu bán kính R là \(4\pi {R^2}\).</p>
// // <p>Suy ra \(4\pi {R^2} = \pi {a^2}{3 \over 4} \Rightarrow R = {{a\sqrt 3 } \over 4}\).</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 19.</strong> Cho một hình nón sinh bởi một tam giác đều cạnh a khi quay quanh một đường cao. Một khối cầu có thể tích bằng thể tích của khối nón thì có bán kính bằng</p>
// // <p>(A) \({{a\root 3 \of {2\sqrt 3 } } \over 4}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \({{a\root 3 \of 3 } \over 8}\)\&nbsp;</p>
// // <p>(C) \({{a\root 3 \of {2\sqrt 3 } } \over 8}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(D) \({{a\root 3 \of {2\sqrt 3 } } \over 2}\)</p>
// // <p><strong>Giải</strong></p>
// // <p>Chiều cao của khối nón là \({{a\sqrt 3 } \over 2}\)\&nbsp;và bán kính đáy bằng \({a \over 2}\) nên</p>
// // <p>\({V_n} = {1 \over 3}\pi {r^2}h = {1 \over 3}\pi {{{a^2}} \over 4}.{{a\sqrt 3 } \over 2} = {{\pi {a^3}\sqrt 3 } \over {24}}\)</p>
// // <p>Thể tích khối cầu bán kính R là \({V_c} = {4 \over 3}\pi {R^3}\).</p>
// // <p>Do đó \({{\pi {a^3}\sqrt 3 } \over {24}} = {4 \over 3}\pi {R^3} \Leftrightarrow {R^3} = {{{a^3}\sqrt 3 } \over {32}} \Rightarrow R = {{a\root 3 \of {\sqrt 3 } } \over {\root 3 \of {32} }} = {{a\root 3 \of {2\sqrt 3 } } \over 4}\)</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 20.</strong> Một hình nón có đường sinh bằng a và góc ở đỉnh bằng \(90^0\). cắt hình nón bằng mặt phẳng (a) đi qua đỉnh sao cho góc giữa (a) và mặt đáy hình nón bằng \(60^0\) . Khi đó diện tích thiết diện là</p>
// // <p>(A) \({{\sqrt 2 } \over 3}{a^2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \({{\sqrt 3 } \over 2}{a^2}\)\&nbsp;</p>
// // <p>(C) \({2 \over 3}{a^2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) \({3 \over 2}{a^2}\)</p>
// // <p><strong>Giải</strong></p>
// // <p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_11.jpg" alt="" width="279" height="292"></strong></p>
// // <p>\(\eqalign{<br>&amp; OS = {1 \over 2}AB = {{a\sqrt 2 } \over 2} \cr\&nbsp;<br>&amp; SI = {{SO} \over {\sin {{60}^0}}} = {{a\sqrt 2 } \over {\sqrt 3 }} \cr\&nbsp;<br>&amp; OI = SO.\cot {60^0} = {{a\sqrt 2 } \over {2\sqrt 3 }} \cr\&nbsp;<br>&amp; \Rightarrow IC = \sqrt {O{C^2} - I{O^2}} = \sqrt {{{{a^2}} \over 2} - {{{a^2}} \over 6}} = {a \over {\sqrt 3 }} \cr\&nbsp;<br>&amp; S = {1 \over 2}SI.2IC = {{a\sqrt 2 } \over {\sqrt 3 }}.{a \over {\sqrt 3 }} = {{\sqrt 2 } \over 3}{a^2} \cr} \)</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 21.</strong> Cho hình chóp tứ giác đều có cạnh đáy bằng a, cạnh bên tạo với mặt đáy góc \(60^0\). Diện tích toàn phần của hình nón ngoại tiếp hình chóp là</p>
// // <p>(A) \({{3\pi {a^2}} \over 2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (B) \({{3\pi {a^2}} \over 4}\)\&nbsp;</p>
// // <p>(C) \({{3\pi {a^2}} \over 6}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(D) \({{3\pi {a^2}} \over 8}\)</p>
// // <p><strong>Giải</strong></p>
// // <p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_12.jpg" alt="" width="290" height="280"></strong></p>
// // <p>Bán kính đường tròn đáy của hình nón ngoại tiếp hình chóp là</p>
// // <p>\(\eqalign{<br>&amp; R = {{a\sqrt 2 } \over 2} \cr\&nbsp;<br>&amp; \cos {60^0} = {{BO} \over {SB}} \cr\&nbsp;<br>&amp; \Rightarrow SB = {{BO} \over {\cos {{60}^0}}} = 2{{a\sqrt 2 } \over 2} = a\sqrt 2 \cr} \)</p>
// // <p>Diện tích xung quanh hình nón \({S_{xq}} = {1 \over 2}.2\pi Rl = \pi {{a\sqrt 2 } \over 2}a\sqrt 2\&nbsp; = \pi {a^2}\)</p>
// // <p>Diện tích hình tròn đáy hình nón là \({S_d} = \pi {R^2} = \pi {{{a^2}} \over 2}\)</p>
// // <p>Diện tích toàn phần \({S_{tp}} = {S_{xq}} + {S_d} = \pi {a^2} + {{\pi {a^2}} \over 2} = {{3\pi {a^2}} \over 2}\)</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 22.</strong> Cho mặt cầu bán kính R và một hình trụ có bán kính đáy R và chiều cao 2R. Tỉ số thể tích khối cầu và khối trụ là</p>
// // <p>(A) \({2 \over 3}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; (B) \({3 \over 2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(C) 2\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) \({1 \over 2}\)</p>
// // <p><strong>Giải</strong></p>
// // <p>Thể tích khối cầu bán kính R là \({V_c} = {4 \over 3}\pi {R^3}\)</p>
// // <p>Thể tích khối trụ \({V_t} = \pi {R^2}.2R = 2\pi {R^3} \Rightarrow {{{V_c}} \over {{V_t}}} = {2 \over 3}\).</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 23.</strong> Cho hình trụ có bán kính đáy bằng R, chiều cao cũng bằng R. Một hình vuông ABCD có hai cạnh AB và CD lần lượt là các dây cung của hai đường tròn đáy, mp(ABCD) không vuông góc với mặt phẳng đáy của hình trụ. Diện tích hình vuông đó là</p>
// // <p>(A) \({{5{R^2}} \over 2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \(5{R^2}\)</p>
// // <p>(C) \({{5{R^2}\sqrt 2 } \over 2}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) \(5{R^2}\sqrt 2 \)</p>
// // <p><strong>Giải</strong></p>
// // <p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_13.jpg" alt="" width="309" height="262"></strong></p>
// // <p>Gọi C’ là hình chiếu của C trên đáy hình trụ. Khi đó ta có \(AB \bot BC'\)\&nbsp;(vì \(AB \bot BC\)).</p>
// // <p>Vậy \(AC’ = 2R\).</p>
// // <p>Ta có: \(BC{'^2} = 4{R^2} - A{B^2} = A{B^2} - {R^2} \Rightarrow A{B^2} = {5 \over 2}{R^2}.\)</p>
// // <p>Chọn (A).</p>
// // <p><strong>Bài 24.</strong>\&nbsp;Một khối hộp chữ nhật nội tiếp trong một khối trụ. Ba kích thước của khối hộp chữ nhật là a, b, c.. Thể tích của khối trụ là</p>
// // <p>(A) \({1 \over 4}\pi \left( {{a^2} + {b^2}} \right)c\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;</p>
// // <p>(B) \({1 \over 4}\pi \left( {{b^2} + {c^2}} \right)a\)</p>
// // <p>(C) \({1 \over 4}\pi \left( {{c^2} + {a^2}} \right)b\)</p>
// // <p>(D) \({1 \over 4}\pi \left( {{a^2} + {b^2}} \right)c\)\&nbsp;hoặc \({1 \over 4}\pi \left( {{b^2} + {c^2}} \right)a\)\&nbsp;hoặc \({1 \over 4}\pi \left( {{c^2} + {a^2}} \right)b\)</p>
// // <p><strong>Giải</strong></p>
// // <p>\&nbsp;Nếu khối trụ có bán kính đáy là \(R = {1 \over 2}\sqrt {{a^2} + {b^2}} \) và chiều cao là c thì có thể tích \(V = {1 \over 4}\pi \left( {{a^2} + {b^2}} \right)c\). Vai trò của a, b, c như nhau nên chọn (D).</p>
// // <p><strong>Bài 25.</strong> Một khối tứ diện đều có cạnh a nội tiếp một khối nón. Thể tích khối nón là</p>
// // <p>(A) \({{\sqrt 3 } \over {27}}\pi {a^3}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp;(B) \({{\sqrt 6 } \over {27}}\pi {a^3}\)\&nbsp;</p>
// // <p>(C) \({{\sqrt 3 } \over 9}\pi {a^3}\)\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) \({{\sqrt 6 } \over 9}\pi {a^3}\)</p>
// // <p><strong>Giải</strong></p>
// // <p>Khối nón có bán kính đường tròn đáy \(R = {{a\sqrt 3 } \over 3}\)\&nbsp;và chiều cao \(h = \sqrt {{a^2} - {{{a^2}} \over 3}}\&nbsp; = {a \over 3}\sqrt 6 \)\&nbsp;nên có thể tích \(V = {1 \over 3}\pi {{{a^2}} \over 3}.{{a\sqrt 6 } \over 3} = {{\sqrt 6 } \over {27}}\pi {a^3}\).</p>
// // <p>Chọn (B).</p>
// // <p><strong>Bài 26.</strong> Cho hình nón đỉnh S, đáy là hình tròn tâm O, góc ở đỉnh bằng \(120^0\). Trên đường tròn đáy, lấy một điểm A cố định và điểm M di động. Có bao nhiêu vị trí của M để diện tích tam giác SAM đạt giá trị lớn nhất ?</p>
// // <p>(A) Có 1 vị trí ;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (B) Có 2 vị trí ;</p>
// // <p>(C) Có 3 vị trí ;\&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; \&nbsp; (D) Có vô số vị trí.</p>
// // <p><strong>Giải</strong></p>
// // <p>Gọi \(l\) là độ dài đường sinh của hình nón ta có \(SA = SM = l\).</p>
// // <p>Ta có: \({S_{\Delta SAM}} = {1 \over 2}SA.SM.\sin \widehat {ASM} = {1 \over 2}{l^2}\sin \widehat {ASM}\)</p>
// // <p>Để diện tích tam giác SAM lớn nhất thì \(\sin \widehat {ASM} = 1 \Rightarrow \widehat {ASM} = {90^0}\).</p>
// // <p>Vì góc ở đỉnh bằng \({120^0}\) nên có 2 vị trí thỏa mãn \(\widehat {ASM} = {90^0}\).</p>
// // <p>Chọn (B).</p>
// // <p style="text-align: right;"><strong>loigiaihay.com</strong></p>
// // <div class="clearfix"></div>`

// // string_inner_html = `<h2 class="s14 lineheight"></h2>
// // <p style="text-align: justify;">Tố Hữu có cả một dòng thơ viết về người mẹ. Trong tập thơ “Từ ấy” có bài ” Bà má Hậu Giang”; trong tập thơ “Việt Bắc” có “Bầm ơi!” “Bà Bủ”, “Bà mẹ Việt Bắc”, trong tập thơ “Gió lộng” có “Quê mẹ”, “Mẹ Tơm”; trong tập thơ”Ra trận” có “Mẹ Suốt”… Ông viết về người mẹ với tấm lòng thương yêu, kính trọng, ngợi ca.</p>
// // <p style="text-align: justify;">Bài thơ “Mẹ Tơm” cũng được tác giả viết với dòng cảm xúc cao quý ấy và gửi gắm lòng biết ơn người mẹ đã nuôi dưỡng nhà thơ trong những ngày vượt ngục. Từ xúc cảm cụ thể, bài thơ vươn lên triết lí, để cao dạo lí ân nghĩa của dân tộc.Tác giả đã chọn thể loại thơ trữ tình kết hợp với tự sự thích hợp với giọng điệu tâm tình. Kết cấu<br>\&nbsp;của bài thơ theo diễn biến của cuộc hành trình và theo sự vận động nội tâm của tác giả.</p>
// // <p style="text-align: justify;">Cái tôi trữ tình hiện diện ngay ở đầu bài thơ với cảm xúc dào dạt khi nhà thơ trở về miền biển Hậu Lộc, quê hương của mẹ Tơm, sau mười chún năm xa cách:</p>
// // <p style="text-align: center;">“Tôi lại về quê mẹ nuôi xưa<br>Một buổi trưa, nắg dài bãi cát<br>Gió lộng xôn xao, sóng biển đu đưa<br>Mát rượi lòng ta ngân nga tiếng hát…”</p>
// // <p style="text-align: justify;">Nhà thơ đi trong không gian thoáng đãng, dưới trưa nắng sáng, trong âm vang của sóng biển (hay sóng lòng?). Những từ láy phụ âm đầu như “xôn xao”. “đu đưa”. “ngân nga” đã cộng hưởng thành một hòa âm xao động mà êm ái du dương.</p>
// // <p style="text-align: justify;">Nhà thơ trửo nên hồn nhiên, trò chuyện với những cái không thể trò chuyện được, chào hỏi những vật vô tri như chào hỏi cố nhân:</p>
// // <p style="text-align: center;">“Hòn Nẹ ta ơi! Mảng về chưa đó<br>Có nhiều không con nục, con thu?<br>Cho những buồm nâu thuyền câu Diêm Phố!<br>Nhớ nhau chăng, hỡi Hanh Cát, Hanh Cù?”</p>
// // <p style="text-align: justify;">Màu sắc cũng được gợi lên thật đẹp. Màu xanh của “dừa xanh” đầy sức sống, nổi bật trên màu trắng của “cát trắng” tinh anh và điểm xuyết nét dỏ của “dưa đỏ ngọt lành”. Nhưng hay nhất của khúc tâm tình này là âm nhạc. Những từ láy và những vần lưng cộng hưởng thành những hòa âm phong phú”</p>
// // <p style="text-align: center;">“Mát rượi lòng ta ngân nga tiếng hát”<br>“Chào những buồm nâu thuyền câu Diêm Phố”<br>“Hỡi đồi cát trắng rung rinh nắng”</p>
// // <p style="text-align: justify;">Trong điệu nhạc ân tình, nhà thơ tưởng nhớ đến người mẹ nuôi xưa.</p>
// // <p style="text-align: center;">“Con đã về đây, ơi mẹ Tơm<br>Hỡi người mẹ khổ đã dành cơm<br>Cho con, cho Đảng ngày xưa ấy<br>Không sợ tù gông, chấp súng gươm”</p>
// // <p style="text-align: justify;">Tố Hữu nhớ đến mẹ Tơm là nhớ đến một người mẹ giàu lòng thương yêu, có lí tưởng cao quý. Chính mẹ Tơm mười chín năm về trước đã nuôi dưỡng, che chở, bảo vệ cho Tố Hữu trong những ngày vượt ngục đầy gian nan, bất chấp bạo lực của kẻ thù. Mẹ Tơm tình nghĩa mà anh hùng!<br>Nhà thơ ngạc nhiên, vui mừng trước sự đổi thay của quê hương Hậu Lộc :</p>
// // <p style="text-align: center;">“Nhà ai mới nhỉ, tường vôi trắng<br>Thơm phức mùi tôm nặng mấy nong<br>Ngồn ngộn sân phơi khoai dát nắng<br>Giếng vườn ai vậy , nước khơi trong ? “</p>
// // <p style="text-align: justify;">Màu sắc mới mẻ ( tường vôi trắng ) , hương vị miện biển ( thơm phức mùi tôm ) , hình ảnh “ ngồn ngộn sân phơi khoai dát nắng “ đã nói lên sự thay da đổi thịt của miền quê Hậu Lộc – một miền quê biển thanh bình , sung túc.</p>
// // <p style="text-align: justify;">Nhà thơ ngơ ngác trước cuộc sống lạ lùng hôm nay. “Cô gái má bồ quân “ , “ Mái đầu tóc xoã xanh bên giếng “ , mười chín năm trước đã quen thân , vậy mà giờ đây cả hai đều bỡ ngỡ . Lời thoại giữa cô gái và nhà thơ tạo ra không khí sôi nổi , trẻ trung cho thơ :</p>
// // <p style="text-align: center;">“Nhiều đấy ư em , mấy tuổi rồi ?<br>- Hai mươi.<br>- Ờ nhỉ , tháng năm trôi<br>Sóng bồi thêm bãi , thiền thêm bến<br>Gió lộng đường khơi , rộng đất trời ! “</p>
// // <p style="text-align: justify;">Rồi giọng thơ lại bùi ngùi trước hai tin buồn :</p>
// // <p style="text-align: center;">Ông mất năm nao ngày độc lập<br>“Bà về năm đói , làng treo lưới<br>Biển động : Hòn Mê , giặc bắn vào … “</p>
// // <p style="text-align: justify;">Nhà thơ lại “ bâng khuâng” nhớ lại chuyện cũ. Mười chín năm trước , Tố Hữu và một số bạn tù đã vượt ngục\&nbsp; Đắc Lay về Thanh Hoá và “ Duyên may dây nối , đất Hanh Cù”. Nhà thơ và các bạn tù đã tìm đến bà mẹ nghèo ở đất Hanh Cù :</p>
// // <p style="text-align: center;">“Đầu thôn , cồn vắng , túp lếu rơm :<br>Tổ ấm chim về . Có mẹ Tơm<br>Hai đứa trai ngày đi cúp dạo<br>Nồi khoai sớm tôi lót thay cơm”</p>
// // <p style="text-align: justify;">Mẹ Tơm nghèo nhưng tình nghĩa “thương người cộng sản, căm Tây , Nhật “ , trung thành , thuỷ chung với cách mạng :</p>
// // <p style="text-align: center;">“Buồng Mẹ – buồng tim – giấu chúng con”</p>
// // <p style="text-align: justify;">Thật không còn hình ảnh nào xác thực hơn để ngợi ca lòng trung thành của mẹ Tơm đối với Đảng , với cách mạng ! Hình tượng người Mẹ cứ lớn dần lên hoà lẫn với non nước thật là cao đẹp.</p>
// // <p style="text-align: center;">…”Bóng Mẹ ngồi canh lẩn bóng cồn “</p>
// // <p style="text-align: center;">…”Bóng Mẹ ngồi trông , vọng nước non !”</p>
// // <p style="text-align: justify;">Mẹ Tơm từ người mẹ nuôi dưỡng , đã trở thành người mẹ tranh đấu. Từ những việc làm âm thầm như nuôi giấu cán bộ , ngồi canh cho những hoạt động của chiến sĩ cách mạng , dần dần Mẹ đã tham gia trực tiếp vào cuộc chiến tranh :</p>
// // <p style="text-align: center;">“Chợ xa , Mẹ gánh mớ rau xanh<br>Thêm bó truyền đơn gọi đấu tranh<br>Bãi cát vàng thau in bóng mẹ<br>Chiều về…Hòn Nẹ…biển reo quanh! “</p>
// // <p style="text-align: justify;">Mẹ Tơm gợi nhớ đến nhân vật Nilôpna trong tiểu thuyết “ Người mẹ “ của Macxim Go-rơ-ki. Hai người Mẹ đều bắt đầu từ tự phát đến tự giác đấu tranh .Và đều có những hành động anh hùng , bất khuất.</p>
// // <p style="text-align: justify;">Nhà thơ tưởng niệm mẹ Tơm bằng một “ nén hương thơm “ và triết lí sâu sắc ngợi ca người Mẹ tình nghĩa mà anh hùng :</p>
// // <p style="text-align: center;">“Ôi bóng người xưa , đã khuất rồi<br>Tròn đôi nấm đất trắng chân đồi<br>Sống trong cát , chết vùi trong cát<br>Những trái tim như ngọc sáng ngời !<br>Đốt nén hương thơm , mát dạ Người<br>Hãy về vui chút , mẹ Tơm ơi!<br>Nắng tươi xóm ngói , tường vôi mới<br>Phấp phới buồm giong , nắng biển khơi “</p>
// // <p style="text-align: justify;">Thành công lớn nhất của bài thơ là đã tái hiện được hình ảnh mẹ Tơm . Người mẹ nghèo khổ sống lặng lẽ âm thầm nhưng giàu lòng thương yêu và son sắt thuỷ chung với cách mạng . Từ người mẹ thật ngoài đời đã bước vào trong thơ thành nhân vật lí tưởng của thi nhân . Tượng đài người mẹ anh hùng mà tình nghĩa dược hiện lên trong âm nhạc hoài niệm và ngợi ca nên có sức ngân vang mãi trong lòng người đọc.</p>
// // <p style="text-align: right;"><strong></strong></p>
// // <p style="text-align: justify;">C. Biểu cảm\&nbsp;D. Thuyết minh.</p>
// // <div class="clearfix"></div>`;


// let question_default = ''//'I. ĐỀ BÀI THAM KHẢO, Đề 1: Trong vai Lạc Long Quân, kể lại câu chuyện truyền thuyết Con Rồng cháu Tiên. Đề 2: Kể lại một câu chuyện cổ tích bằng lời văn của em (Sọ Dừa). A. asdsadsa    B.asdsadasd';
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// let dom = new JSDOM('<!doctype html><html><body></body></html>');
// let document = dom.window.document;
// var build = new Build(document, null);
// build.init(string_inner_html, question_default, 'wqeqwe')

// string_inner_html = `<h2 class="s14 lineheight"></h2>
// <p><strong class="content_question">Đề bài</strong></p>
// <p><strong>Câu 1.</strong> Dạ dày ngăn nào của động vật nhai lại có chức năng hấp thụ bớt nước sau khi thức ăn được đưa lên khoang miệng nhai lại</p>
// <p><strong>A. </strong>Dạ tổ ong<strong></strong></p>
// <p><strong>B. </strong>Dạ lá sách.<strong></strong></p>
// <p><strong>C. </strong>múi khế<strong></strong></p>
// <p><strong>D. </strong>Dạ cỏ</p>
// <p><strong>Câu 2</strong>: Một loài thực vật có 8 nhóm gen liên kết theo lý thuyết số nhiễm sắc thể có trong thể một nhiễm là</p>
// <p><strong>A. </strong>7 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>9</p>
// <p><strong>C. </strong>15 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>17</p>
// <p><strong>Câu 3</strong>: Phần nào của hệ mạch dưới đây sẽ có huyết áp lớn nhất?</p>
// <p><strong>A. </strong>Tiểu tĩnh mạch.<strong></strong></p>
// <p><strong>B. </strong>Tĩnh mạch chủ.</p>
// <p><strong>C.</strong>Tiểu động mach.</p>
// <p><strong>D. </strong>mao mạch</p>
// <p><strong>Câu 4</strong>: Khi nói về di truyền cấp độ phân tử, phát biểu nào sau đây đúng?</p>
// <p><strong>A. </strong>ADN làm khuôn để tổng hợp ADN và ARN.</p>
// <p><strong>B. </strong>Trong tái bản ADNenzim ADN pôlimeraza tổng hợp và kéo dài mạch mới theo chiều 3’ – 5’</p>
// <p><strong>C. </strong>&nbsp;ARN là vật chất di truyền chủ yếu của sinh vật nhân sơ.</p>
// <p><strong>D. </strong>Chỉ ADN mới có cấu tạo theo nguyên tắc đa phân còn ARN thì không</p>
// <p><strong>Câu 5:</strong> Khu sinh học (biôm) nào sau đây phán bố ỏ vùng ôn đới?</p>
// <p><strong>A. </strong>Savan.<strong></strong></p>
// <p><strong>B. </strong>Hoang mạc và sa mạ<strong>c</strong><strong>. </strong><strong></strong></p>
// <p><strong>C. </strong>Rừng Taig<strong>a</strong><strong>.</strong><strong></strong></p>
// <p><strong>D. </strong>Rừng địa Trung Hải</p>
// <p><strong>Câu 6:</strong> Nguyên tố khoáng nào sau đây đóng vai trò trong việc giúp cân bằng ion, quang phân ly nước ở cơ thể thực vật?</p>
// <p><strong>A. </strong>Kali</p>
// <p><strong>B. </strong>Clo</p>
// <p><strong>C. </strong>Sắt</p>
// <p><strong>D. </strong>Molipden</p>
// <p><strong>Câu 7.</strong>Phương pháp dùng để xác định vị trí của gen trong tế bào là</p>
// <p><strong>A. </strong>sử dụng phương pháp lai thuận nghịch.<strong></strong></p>
// <p><strong>B. </strong>sử dụng phương pháp gây đột biến</p>
// <p><strong>C. </strong>sử dụng phép lai phân tích.<strong>&nbsp;&nbsp;&nbsp;&nbsp; </strong><strong></strong></p>
// <p><strong>D. </strong>phân tích cơ thể con lai</p>
// <p><strong>Câu 8</strong>: Nhân tố tiến hoá nào sau đây có khả năng làm tăng đa dạng di truyền của quần thể?</p>
// <p><strong>A. </strong>Giao phối ngẫu nhiên.<strong></strong></p>
// <p><strong>B. </strong>Yếu tố ngẫu nhiên.<strong></strong></p>
// <p><strong>C. </strong>Chọn lọc lự nhiên<strong></strong></p>
// <p><strong>D. </strong>Đột biến</p>
// <p><strong>Câu 9:</strong> Ở vườn quốc gia Cát Bà. trung bình có khoảng 15 cá thể chim chào mào/ ha đất rừng. Đây là vi dụ minh hoạ cho đậc trưng nào của quần thể?</p>
// <p><strong>A. </strong>Nhóm tuổi</p>
// <p><strong>B. </strong>Mật độ cá thể.</p>
// <p><strong>C. </strong>Ti lệ giới tính.</p>
// <p><strong>D. </strong>Sự phân bố cá thể</p>
// <p><strong>Câu 10.</strong>loại axit nucleic nào sau đây, trong cấu trúc phân tử được đặc trưng bởi nucleotit loại timin</p>
// <p><strong>A. </strong>rARN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>tARN</p>
// <p><strong>C. </strong>ADN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>mARN</p>
// <p><strong>Câu </strong>11. Một cơ thể thực vật bị đột biến thể một (2n -1) ở NST số 2. Biết rằng cơ thể này vẫn có khả năng giảm phân bình thường, các giao tử tạo ra đều có sức sống và khả năng thụ tinh như nhau, các hợp tử bị đột biến thể một (2n -1) vẫn phát triển bình thường, các giao tử tạo ra đều có sức sống và khả năng thụ tinh như nhau, các hợp tử bị đột biến thể một (2n -1) vẫn phát triển bình thường nhưng các đột biến thể không (2n -2) bị chết ngay sau khi thụ tinh. Tính tỷ lệ theo lý thuyết nếu cơ thể này tự thụ phấn thì trong các cá thể con ở F<sub>1</sub> các cá thể bình thường chiếm tỷ lệ</p>
// <p><strong>A.</strong> 3/4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 1/4</p>
// <p><strong>C.</strong> 1/2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>1/3</p>
// <p><strong>Câu 12</strong>. Giống lúa X khi trồng ở đồng bằng Bắc bộ cho năng suất 8 tấn/ha, ở vùng Trung bộ cho năng suất 6 tấn/ha, ở đồng bằng sông Cửu Long cho năng suất 10 tấn/ha<strong>. </strong>Nhận xét nào sau đây là đúng ?</p>
// <p><strong>A. </strong>Năng suất thu được ở giống lúa X hoàn toàn do môi trường sống quy định,</p>
// <p><strong>B. </strong>Tập hợp tất cả các kiểu hình thu được về năng suất (6 tấn/ha, 8 tấn/ha, 10 tấn/ha...) được gọi lá mức phản ứngcủa kiểu gen quy định tính trạng năng suất của giống lúa X.</p>
// <p><strong>C. </strong>Điều kiện khí hậu, thổ nhưỡng,... thay đổi đã làm cho kiểu gen của giống lúa X bị thay đổi</p>
// <p><strong>D. </strong>giống lúa Xcó nhiều mức phản ứng khác nhau về tính trang năng suất.</p>
// <p><strong>Câu 13.</strong>Hình vẽ dưới đây mô tả 3 vị trí do thế nước trong 1 cây thực vật trong điều kiện bình thường, trong đó P là lá cây, Q là rễ cây, R là đất. giả sử với 4 thông số giá trị&nbsp; áp suất sau đây:</p>
// <table border="1" cellspacing="0" cellpadding="0">
//  <tbody>
//   <tr>
//    <td valign="top" width="154"> <p>0,6 atm</p> </td>
//    <td valign="top" width="154"> <p>-2 atm</p> </td>
//    <td valign="top" width="154"> <p>1 atm</p> </td>
//    <td valign="top" width="154"> <p>-0,9 atm</p> </td>
//   </tr>
//  </tbody>
// </table>
// <p>Nếu Q có thế nước là 0,6 atm. Theo lý thuyết với 4 trị số như trên bảng thì có bao nhiêu trường hợp có thể điền giá trị thế nước vào vị trí P và R trong điều kiện tự nhiên bình thường ?</p>
// <p align="center"><img style="width: 100%; max-width: 400px;" src="https://img./picture/2018/1223/de-601.jpg" alt="">&nbsp;</p>
// <p><strong>A. </strong>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong>4<strong></strong></p>
// <p><strong>C. </strong>3 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>6</p>
// <p><strong>Câu 14</strong>: Một tế bào sinh hạt phấn có kiêu gen AaBbDd tiến hành giảm phân bình thường. Theo lý thuyết số loại giao tử tối đa thu được là:</p>
// <p><strong>A. </strong>8 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>4</p>
// <p><strong>C. </strong>2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>1</p>
// <p><strong>Câu 15:</strong>Ở một vùng biển, năng lượng bức xạ chiếu xuồng mặt nước đạt 3.10<sup>6</sup> Kcal/m<sup>2</sup>/ ngày. Tảo X chỉ đồnghóađược 3% tổng năng lượng đó. Giáp xác trong hồ khai thác dược 40% năng lượng tích lũy trong tảo X còn cá ăn giáp xác khai thác được 0.15% năng lựợng của giáp xác<strong>. </strong>Hiệu suất sử dụng năng lượng của bậc dinh dưỡng cuối cùng so với tổng năng lượng ban đầu là:</p>
// <p><strong>A.</strong>0.0018%. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>B. </strong>0,008%.</p>
// <p><strong>C. </strong>0,08%. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>D. </strong>0.00018%.</p>
// <p><strong>Câu 16.</strong> Ở ngô người ta xác định được gen quy định hình dạng hạt và gen quy định màu sắc hạt cùng nằm trên một nhiễm sắc thề tại các vị trí tương ứng trên nhiễm sắc thể là 19 cM và 59 cM. Cho biết các gen đều có quan hệ trội lặn hoàn toàn. Khi tiến hành tự thụ phấn bắt buộc cơ thể dị hợp tử về cả hai cặp gen nói trên thì tỉ lệ phân li kiểu hình theo lý thuyết phù hợp nhất ở đời sau sẽ là:</p>
// <p><strong>A. </strong>50%; 23%; 23%; 4%.</p>
// <p><strong>B. </strong>52%; 22%; 72%; 4%.</p>
// <p><strong>C. </strong>51 %: 24%; 24%, 1 %.<strong></strong></p>
// <p><strong>D. </strong>54%; 21 %; 21 %; 4%.</p>
// <p><strong>Câu 17:</strong>Ở một loài thực vật, tính trạng chiều cao do 2 cặp gen Ạa, Bb nằm trên 2 cặp NST khác nhau quy định theo kiểu tương tác cộng gộp, trong đó cứ có 1 alen trội thì chiều cao cùa cây tăng lên 10cm. Tính trạng màu hoa do một cặp gen Dd quy định, trong đó alen D quy dịnh hoa đỏ trội hoàn toàn so với alen d quy định hoa trắng. Phép lai giữa hai cây tứ bội có kiểu gen AAaaBbbbDDDd × AAaaBbbbDddd thu được đời F<sub>1</sub> cơ thể tứ bội giảm phân chỉ sinh ra giao tử lưỡng bội và các loại giao tử lưỡng bội có khả năng thụ bình thường. Theo lí thuyết, đời F<sub>1</sub> có tối đa số loại kiểu gen vá số loại kiểu hình lần lượt là:</p>
// <p><strong>A. </strong>&nbsp;45:15.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>32; 8.<strong></strong></p>
// <p><strong>C. </strong>15; 4.<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D.</strong>45: 7.</p>
// <p><strong>Câu 18:</strong> Có bao nhiêu phát biểu sau đây đúng, khi nói về quá trình quang hợp ở thực vật?:</p>
// <p>I.Ở thực vật C­<sub>3</sub> sản phẩm đầu tiên của giai đoạn cố định CO<sub>2</sub> là hợp chất AlPG.</p>
// <p>II.Thực vật C<sub>4</sub> và thực vật CAM có 2 loại lục lạp ở tế bào mô giậu và tế bào bao bó mạch</p>
// <p>III.Sản phẩm đầu tiên trong giai đoạn cố định CO<sub>2</sub> ở thực vật CAM là một hợp chất 4C.</p>
// <p>IV.Sản phẩm trong pha sáng của quá trình quang hợp gồm có ATP, NADPH, O<sub>2</sub></p>
// <p><strong>A. </strong>2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>3</p>
// <p><strong>C. </strong>1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>4</p>
// <p><strong>Câu 19.</strong> Một cặp vợ chồng bình thường sinh một con trai mắc cả hội chứng Đao và Claifento (XXY). Kết luận nào sau đây <strong>không đúng</strong> ?</p>
// <p><strong>A. </strong>Trong giảm phân của người mẹ cặp NST số 21 và cặp NST giới tính không phân li ở giảm phân 2. bố giảm phân bình thường</p>
// <p><strong>B. </strong>Trong giảm phân của người mẹ cặp NST số 21 và cặp NST giới tính không phân li ở giảm phân 1. bố giảm phân bình thường</p>
// <p><strong>C. </strong>Trong giảm phân của người bố cặp NST số 21 và cặp NST giới tính không phân li ở giảm phân 2,mẹ giảm phân bình thường</p>
// <p><strong>D. </strong>Trong giảm phân của người bố cặp NST số 21 và cặp NST giới tính không phân li ở giảm phân 2 mẹ giảm phân bình thường</p>
// <p><strong>Câu 20.</strong>Đồ thị biểu diễn sự sinh trưởng của quần thể sinh vật trong tự nhiên thường có dạng hình chữ S, giải thích nào sau đây là đúng</p>
// <p><strong>A. </strong>Tốc độ sinh trưởng tối đa của quần thể đạt được khi số lượng cá thể của quần thể còn lại tương đối ít</p>
// <p><strong>B. </strong>Tốc độ sinh trưởng tối đa của quần thể đạt được khi quần thể vừa bước vào điểm uốn trên đồ thi sinh trưởng của quần thể</p>
// <p><strong>C. </strong>Tốc độ sinh trưởng tối đa của quần thể đạt được khi số lượng cá thể của quần thể gần đạt kích thước tối đa</p>
// <p><strong>D. </strong>Tốc độ sinh trưởng tối đa của quần thể đạt được khi quần thể vượt qua điểm uốn trên đồ thi sinh trưởng của quần thể</p>
// <p><strong>Câu 21. </strong>Câu nào sau đây giải thích về ưu thế lai là đúng ?</p>
// <p><strong>A</strong>. Lai hai dòng thuần chủng với nhau sẽ luôn cho ra ưu thế lai cao nhất</p>
// <p><strong>B</strong>. Người ta không sử dụng con lai có ưu thế lai có làm giống vì con lai có ưu thế lại cao nhưng không đồng nhất về kiểu hình</p>
// <p><strong>C</strong>. Lai hai dòng thuần chủng khác nhau về khu vực địa lý sẽ luôn cho ra ưu thế lai cao nhất</p>
// <p><strong>D</strong>. chỉ có một số tổ hợp lai giữa các cặp bố mẹ nhất định mới có ưu thế lai cao nhất</p>
// <p><strong>Câu 22.</strong> Một nhân 10 tiến hóa X tác động vào quần thể theo thời gian được mô tả qua hình vẽ dưới dây</p>
// <p>&nbsp;<img style="width: 100%; max-width: 500px;" src="https://img.loigiaihay.com/picture/2018/1223/de-602.jpg" alt=""></p>
// <p>Có bao nhiêu phát biểu sau đây đúng khi nói về nhân tố tiên hóa X này?</p>
// <p>I. Nhân tổ X là nhân tố có hướng.</p>
// <p>II. Nhân tố X làm thay đổi cả tần số alen và thành phần kiểu gen của quần thể.</p>
// <p>III. Nhân tố X làm tăng đa dạng di truyền của quần thể</p>
// <p>IV. Nhân tố X có xu hướng giảm dần kiểu gen dị hợp tử và duy trì các kiểu gen đồng hợp&nbsp; trong quần thể.</p>
// <p><strong>A.</strong> 2<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B. </strong>1.<strong></strong></p>
// <p><strong>C</strong>.3.<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D.</strong>4.</p>
// <p><strong>Câu 23:</strong> Nguyên nhân chủ yếu dẫn đến sự phân hoá ổ sinh thái giữa các loài là:</p>
// <p><strong>A.</strong>cạnh tranh sinh học giữa các loài.<strong></strong></p>
// <p><strong>B. </strong>Nhu cầu ánh sáng khác nhau của các loai,<strong></strong></p>
// <p><strong>C.</strong>việc sử dụng nguồn thức ăn trong quần xã của các loài</p>
// <p><strong>D.</strong>Sự phân tầng theo chiều thẳng đứng hay chiều ngang.</p>
// <p><strong>Câu 24:</strong> Ở vi khuẩn E.coli khi-nói về hoạt động của các gen cấu trúc trong Operon Lac, kết luận nào sau đây là đúng ?</p>
// <p><strong>A. </strong>Các gen này có số lần nhân đôi khác nhau và số lân phiên mã khác nhau.</p>
// <p><strong>B.</strong>Các gen nay có số lần nhân đôi bằng nhau nhưng số lần phiên mã khác nhau</p>
// <p><strong>C. </strong>Cac gen này có số lần nhân đôi khác nhau nhưng số lần phiên mã bằng nhau.</p>
// <p><strong>D. </strong>Các gen này có số lần nhân đôi bằng nhau và số lần phiên mã bằng nhau.</p>
// <p><strong>Câu 25:</strong> Hình vẽ nào dưới đây mô tả đúng cơ chế tái bản ADN ở sinh vật nhân thực.</p>
// <p>&nbsp;<img style="width: 100%; max-width: 500px;" src="https://img.loigiaihay.com/picture/2018/1223/de-603.jpg" alt=""></p>
// <p><strong>Câu </strong>26: Điểm nào sau dây là đặc điểm chung giữa tường tác gen không alen 2 cặp gen tỉ lệ 9: 7 và tỉ lệ 13:3</p>
// <p><strong>A. </strong>Tỷ lệ phân ly kiểu hình trong phép lai phân tích</p>
// <p><strong>B. </strong>vai trò của 2 gen trội là như nhau</p>
// <p><strong>C. </strong>gen lặn có vai trò ức chế biểu hiện của gen trội không cùng locus</p>
// <p><strong>D. </strong>số loại kiểu gen trong mỗi loại kiểu hình bằng nhau</p>
// <p><strong>Câu 27</strong>. Hình vẽ dưới đây minh họa cặp NST số 3 và ADN ti thể từ tế bào da của 2 cá thể đực và cái của một loài sinh sản hữu tính</p>
// <p>&nbsp;<img style="width: 100%; max-width: 350px;" src="https://img.loigiaihay.com/picture/2018/1223/de-604.jpg" alt=""></p>
// <p>Liên quan đến cặp NST được hiển thị và DNA ti thể nói trên, tính chất di truyền của con nhận được từ cặp NST của bố mẹ là</p>
// <p>&nbsp;<img style="width: 100%; max-width: 500px;" src="https://img.loigiaihay.com/picture/2018/1223/de-605.jpg" alt=""></p>
// <p><strong>Câu 28.</strong>Xét các mối quan hệ sau</p>
// <p>I. Cá ép sống bám trên cá lớn</p>
// <p>II. Nấm, vi khuẩn và tảo đơn bào hình thành địa y</p>
// <p>III. Chim sáo và trâu rừng</p>
// <p>IV. vi khuẩn lam trong nốt sần cây họ đậu</p>
// <p>Phát biểu nào dưới đây đúng về các mối quan hệ sinh thái nói trên&nbsp;?</p>
// <p><strong>A. </strong>Quan hệ hội sinh&nbsp;: I và IV</p>
// <p><strong>B. </strong>quan hệ hợp tác: I và III</p>
// <p><strong>C. </strong>quan hệ hỗ trợ: I,II,III và IV</p>
// <p><strong>D. </strong>Quan hệ cộng sinh: II và III</p>
// <p><strong>Câu 29.</strong> Khi nói về cơ chế dịch mã ở sinh vật nhân thực, có bao nhiêu phát biểu nào sau đây là đúng ?</p>
// <p>I. Axit amin mở đầu trong quá trình dịch mã là methionin</p>
// <p>II. Mỗi phân tử mARN có thể tổng hợp được từ 1 đến nhiều chuỗi polipeptitcùng loại</p>
// <p>III. Khi riboxom tiếp xúc với mã UGA thì quá trình dịch mã dừng lại</p>
// <p>IV. khi dịch mã, riboxom dịch chuyển trên phân tử mARN theo chiều 3’ → 5’</p>
// <p><strong>A. </strong>2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>1</p>
// <p><strong>C. </strong>4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D</strong>.3</p>
// <p><strong>Câu 30</strong>. Đặc điểm nổi bật của kỉ Silua là ?</p>
// <p><strong>A. </strong>xuất hiện thực vật có hoa, phân hóa tảo</p>
// <p><strong>B. </strong>phân hóa cá xương, phát sinh lưỡng cư, côn trùng</p>
// <p><strong>C. </strong>Phát sinh cây có mạch và động vật di chuyển lên cạn</p>
// <p><strong>D. </strong>Dương xỉ phát triển mạnh thực vật có hạt xuất hiện</p>
// <p><strong>Câu 31</strong>. Trong chu trình nito vi khuẩn nitrat hóa có vai trò</p>
// <p><strong>A. </strong>Chuyển hóa NO<sub>2</sub><sup>-</sup> thành NO<sub>3</sub><sup>-</sup></p>
// <p><strong>B. </strong>chuyển hóa N<sub>2</sub> thành NH<sub>4</sub><sup>+</sup></p>
// <p><strong>C. </strong>Chuyển hóa NO<sub>3</sub><sup>-</sup> thành NH<sub>4</sub><sup>+</sup></p>
// <p><strong>D. </strong>Chuyển hóa NH<sub>4</sub><sup>+</sup> thành NO<sub>3</sub><sup>-</sup></p>
// <p><strong>Câu 32</strong>.Cho sơ đồ phả hệ</p>
// <p>&nbsp;<img style="width: 100%; max-width: 500px;" src="https://img.loigiaihay.com/picture/2018/1223/de-606.jpg" alt=""></p>
// <p>Cá thể số (4),(5) bị bệnh bạch tạng, cá thể số (14) mắc cả bệnh bạch tạng và mù màu đỏ xanh lục<strong>. </strong>biết rằng bệnh bạch tạng do gen lặn a nằm trên NST thường quy định, bệnh mù màu đỏ - xanh lục do gen b nằm trên vùng không tương đồng của NST X quy định. Xác suất cá thể&nbsp; số (15) không mang alen bệnh là bao nhiêu ?</p>
// <p><strong>A. </strong>35% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>1,25%</p>
// <p><strong>C. </strong>50% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>78,75%</p>
// <p><strong>Câu 33</strong>.Ở một loài thực vật alen A quy định hạt tròn trội hoàn toàn so với alen a quy định hạt dài; alen B quy định hạt chín sớm trội hoàn toàn so với alen b quy định hạt chín muôn. Hai gen này thuộc cùng một nhóm gen liên kết. Cho các cây hạt tròn, chín sớm tự thụ phấn thu được 1000 cây đời con với 4 kiểu hình khác nhau trong đó có 240 cây hạt tròn chín muộn. Biết rằng mọi diễn biến trong quá trình sinh hạt phấn và sinh noãn là như nhau. Kiểu gen và tần số hoán vị gen (f) ở cây đem lai là ?</p>
// <p><strong>A. \(\dfrac{{AB}}{{ab}};f = 40\% \)</strong></p>
// <p><strong>B. \(\dfrac{{Ab}}{{aB}};f = 40\% \)</strong></p>
// <p><strong>C. \(\dfrac{{Ab}}{{aB}};f = 20\% \)</strong></p>
// <p><strong>D. \(\dfrac{{AB}}{{ab}};f = 20\% \)</strong></p>
// <p><strong>Câu 34.</strong> Ở một loài động vật có vú, cho lai giữa một cá thể đực mắt đỏ, đuôi dài với một cá thể cái mắt đỏ đuôi dài, F<sub>1</sub> thu được tỷ lệ như sau</p>
// <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ở giới cái: 75% mắt đỏ , đuôi dài ; 25% mắt trắng đuôi dài</p>
// <p>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ở giới đực: 30% mắt đỏ đuôi dài: 42,5% mắt trắng đuôi ngắn: 20% mắt trắng đuôi dài: 7,5% mắt đỏ đuôi ngắn</p>
// <p>Theo lý thuyết, khi nói về phép lai trên có bào nhiêu phát biểu sau đây đúng</p>
// <p>I. tính trạng màu mắt di truyền theo quy luật tương tác bổ sung</p>
// <p>II. Tính trạng đuôi ngắn là trội hoàn toàn so với đuôi dài</p>
// <p>III. Cả hai loại tính trạng đều liên kết với giới tính</p>
// <p>IV. hoán vị gen đã xảy ra với tần số 20%</p>
// <p><strong>A. </strong>1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>4</p>
// <p><strong>C. </strong>3 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>2</p>
// <p><strong>Câu 35</strong>.Ở ruồi giấm lai giữa con cánh dài mắt đỏ với con đực cánh dài mắt đỏ thu được F<sub>1</sub> tỉ lệ kiểu hình là 0,04 đực mắt trắng cánh dài; 0,0225 đực mắt trắng cánh cụt; 0,295 cái mắt đỏ cánh dài; 0,088 cái mắt đỏ cánh cụt; 0,088 cái mắt phớt hồng cánh dài: 0,045 cái mắt phớt hồng cánh cụt; 0,1475 con đực mắt đỏ cánh dài; 0,1875 đực mắt phớt hồng, cánh dài: 0,0625 đực mắt phớt hồng cánh cụt; 0,04 đực mắt đỏ, cánh cụt. Biết rằng kích thước cánh do 1 gen có 2 alen quy định (D,d). Kiểu gen của P là</p>
// <p><strong>A. </strong>\(Aa\dfrac{{BD}}{{bd}} \times Aa\dfrac{{BD}}{{bd}}\)</p>
// <p><strong>B. </strong>\(\dfrac{{Ad}}{{aD}}{X^B}{X^b} \times \dfrac{{Ad}}{{aD}}{X^B}Y\)</p>
// <p><strong>C. </strong>\(\dfrac{{AD}}{{ad}}{X^B}{X^b} \times \dfrac{{Ad}}{{aD}}{X^B}Y\)</p>
// <p><strong>D. </strong>\(\dfrac{{AB}}{{ab}}{X^D}{X^d} \times \dfrac{{AB}}{{ab}}{X^D}Y\)</p>
// <p><strong>Câu 36.</strong> Một gen ở sinh vật nhân sơ có tổng số 3200 nucleotit trong đó số nucleotit loại A của gen chiếm 24%. Trên mạch đơn thứ nhất của gen có A<sub>1</sub>= 15% và G<sub>1</sub> = 26%. Theo lý thuyết có bao nhiêu phát biểu sau đây là đúng khi nói về gen trên ?</p>
// <p>I. gen có tỷ lệ A/G = 12/13</p>
// <p>II. trên mạch thứ nhất của gen có T/G = 33/26</p>
// <p>III. trên mạch thứ 2 của gen có G/A = 15/26</p>
// <p>IV. khi gen tự nhân đôi 2 lần, môi trường đã cung cấp 2304 nucleotit loại adenin.</p>
// <p><strong>A. </strong>2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>4</p>
// <p><strong>C. </strong>1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>3</p>
// <p><strong>Câu 37.</strong> Ở một loài thực vật, alen A quy định thân cao trội hoàn toàn so với alen a quy định thân thấp , alen B quy định hoa tím trội hoàn toàn so với alen b quy định hoa trắng, alen D quy định quả đỏ trội hoàn toàn so với alen d quy định&nbsp; quả vàng , alen E quy định&nbsp; quả tròn trội hoàn toàn so với alen e quy định quả dài. Biết các quá trình giảm phân diễn ra bình thường, quá trình phát sinh giao tử đưc và cái đều xảy ra hoán vị gen giữa alen B và b với tần số 20%, giữa alen E và e với tần số 40%. Thực hiện phép lai: \(\dfrac{{Ab}}{{aB}}\dfrac{{DE}}{{de}} \times \dfrac{{Ab}}{{aB}}\dfrac{{DE}}{{de}}\) . theo lý thuyết có bao nhiêu phát biểu sau đây là đúng khi nói về F<sub>1</sub></p>
// <p>I. Kiểu hình thân cao, hoa tím quả vàng tròn chiếm tỷ lệ 8,16%</p>
// <p>II. Tỷ lệ thân cao hoa trắng quả đỏ dài bằng tỷ lệ thân thấp hoa tím vàng, tròn</p>
// <p>III. tỷ lệ kiểu hình mang bốn tính trạng trội lớn hơn 30%</p>
// <p>IV. kiểu hình lặn cả bốn tính trạng là 0,09%</p>
// <p><strong>A. </strong>1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>3</p>
// <p><strong>C. </strong>4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>2</p>
// <p><strong>Câu 38</strong>. Ở một quần thể sau khi trải qua 3 thế hệ tự thụ phấn, tỷ lệ dị hợp trong quần thể bằng 8%. Biết rằng ở thế hệ xuất phát, quần thể có 30% số cá thể đồng hợp trội và cánh dài là trội hoàn toàn so với cánh ngắn. hãy cho biết trước khi xảy ra quá trình tự phối, tỷ lệ kiểu hình nào sau dây là của quần thể nói trên ?</p>
// <p><strong>A. </strong>0,36 Cánh dài: 0,64 cánh ngắn</p>
// <p><strong>B. </strong>0,94 cánh ngắn: 0,06 cánh dài</p>
// <p><strong>C. </strong>0,6 cánh dài: 0,4 cánh ngắn</p>
// <p><strong>D. </strong>0,06 cánh ngắn: 0,94 cánh dài</p>
// <p><strong>Câu 39.</strong>Một loài thực vật,xét 3 cặp gen quy định 3 tính trạng, mỗi cặp gen nằm trên một cặp NST khác nhau. Trong đó alen A cho vị ngọt; a cho vị chua; alen B: chín sớm, b: chín muộn , alen D : có tua cuốn; d: không có tua cuốn. Cho hai cây giao phấn với nhau F<sub>1</sub> thu được 8 loại kiểu hình, theo lý thuyết kiểu gen của 2 cây P là 1 trong bao nhiêu trường hợp&nbsp; ?</p>
// <p><strong>A. </strong>14 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>10</p>
// <p><strong>C. </strong>18 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>4</p>
// <p><strong>Câu 40.</strong> Ở cà chua, alen A quy định thân cao trội hoàn toàn so với alen a quy định thân thấp, alen B quy định quả đỏ trội hoàn toàn so với alen b quy định quả vàng. Hai cặp gen này phân ly độc lập . biết rằng không xảy ra đột biến. Theo lý thuyết, có bao nhiêu phát biểu sau đây là đúng ?</p>
// <p>I. Ở loài này có tối đa 4 kiểu gen quy định kiểu hình thân cao, hoa đỏ</p>
// <p>II. Cho một cây thân cao, quả đỏ tự thụ phấn đời con luôn thu được nhiều hơn 1 loại kiểu hình</p>
// <p>III. Cho một cây thân cao, quả đỏ tự thụ phấn nếu thu được 4 loại kiểu hình thì số cây thân thấp quả vàng chiếm tỷ lệ 18,75%</p>
// <p>IV. Cho một cây thân thấp quả đỏ tự thụ phấn có thể thu được 2 loại kiểu hình ở đời con.</p>
// <p><strong>A. </strong>1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>3</p>
// <p><strong>C. </strong>4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>2</p>
// <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// <table border="1" cellspacing="0" cellpadding="0">
//  <tbody>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>1</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>2</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>3</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>4</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>5</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>6</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>7</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>8</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>9</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>10</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>11</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>12</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>13</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>14</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>15</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>16</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>17</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>18</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>19</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>20</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>21</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>22</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>23</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>24</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>25</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>26</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>27</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>28</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>29</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>30</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>31</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>32</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>33</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>34</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>35</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>&nbsp;</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>36</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>37</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>38</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>39</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>40</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//   </tr>
//  </tbody>
// </table>
// <p><strong>Xem thêm: Lời giải chi tiết Đề thi thử THPT Quốc gia môn Sinh học tại Tuyensinh247.com</strong></p>
// <p style="text-align: right;"><strong></strong></p>
// <div class="clearfix"></div>`
