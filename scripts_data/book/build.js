
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
        is_check_not_consecutive: false,
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
        is_check_not_consecutive: true,
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
        is_check_not_consecutive: false,
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
        is_check_not_consecutive: false,
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
        is_check_not_consecutive: false,
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
        is_check_not_consecutive: false,
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
        is_check_not_consecutive: false,
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
        is_check_not_consecutive: false,
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
                if (matches[matches.length - 1] < text_inner.length - 1) matches.push(text_inner.length)
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
                if (this._logger) {
                    this._logger.error('Có lỗi trong quá trình phân tích dữ liệu của bài: "' + this._title + '", trong sách: "' + this._book + '"')
                }
            }

            // this._root_problem.all(node => {
            //     console.log(" ".repeat(node.getPath().length * 2) + node.model.text,
            //         node.model.indexs, node.model.sub_indexs, node.model.plan_indexs,
            //         node.model.solution_indexs, node.model.solution_detail_indexs,
            //         node.model.group, node.model.label, node.model.type, node.model.is_merge_wrong, node.model.answer, node.model.tag)
            // })
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
            // 1. 2. 3. trong cac truong hop dac biet se phai log (1,2,3 la cac phuong an chu ko phai la de)
            // chinh lai cach ghep dap an
            // log neu de co phan trac nghiem > 4 dap an
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
                            text = text.substring(0, math.index) + text.substring(this._multiple_choise_regex.lastIndex, text.length)
                        }
                        sub_plant_element.appendChild(this._document.createTextNode(text))
                    } else {
                        sub_plant_element.appendChild(sub_element.cloneNode(true))
                    }
                }
                let inner_html = this._convertSpecCharacter(sub_plant_element.innerHTML);

                list_sub_plan.push(this._document.createTextNode(inner_html.trim().replace(/&nbsp;/g, '')))
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

        let check_not_consecutive = {}
        for (let index = start_index; index < end_index; index++) {

            const child_element = this._element.children[index];
            if (child_element.nodeName.search(this._nodes_ignore_check_text_regex) > -1) continue;
            let child_element_text = child_element.textContent;
            if (child_element_text === null && child_element_text === undefined) continue;

            for (let i = 0; i < this._priority.length; i++) {
                const child_priority = this._priority[i];

                if (!child_priority.is_check_not_consecutive || !child_priority.inline_regex) continue;
                let tmp_child_element_text = child_element_text;
                if (child_priority.is_lower_case) tmp_child_element_text = child_element_text.toLowerCase();
                else if (child_priority.is_inner_html) tmp_child_element_text = child_element.innerHTML;
                let check = tmp_child_element_text.match(child_priority.inline_regex);
                if (check == null) continue;
                if (check_not_consecutive[child_priority.type] === undefined) check_not_consecutive[child_priority.type] = []
                check_not_consecutive[child_priority.type].push(index)
            }
        }
        for (let key in check_not_consecutive) {
            let tmp_consecutives = check_not_consecutive[key];
            let consecutives = []
            for (let i = 0; i < tmp_consecutives.length; i++) {
                if (
                    (i < tmp_consecutives.length - 1 && tmp_consecutives[i] === tmp_consecutives[i + 1] - 1)
                    || (i > 0 && tmp_consecutives[i] === tmp_consecutives[i - 1] + 1)
                ) {
                    consecutives.push(tmp_consecutives[i])
                }
            }
            check_not_consecutive[key] = consecutives;
        }

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
                    if (child_priority.is_check_not_consecutive && check_not_consecutive[child_priority.type] !== undefined && check_not_consecutive[child_priority.type].includes(index)) continue;

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
        let distance = 0;
        let first = false;
        this._root_problem.walk({ strategy: 'breadth' }, node_problem => {

            if (!node_problem.model.is_merge_wrong || node_problem.model.group !== 'question_multiple_choise') return;

            let node_parent = node_problem.parent;

            this._getAnswerMultipleChoises(node_parent);

            let count_multiple_choise = 0;
            for (let index = 0; index < node_parent.children.length; index++) {
                const node_child = node_parent.children[index];
                if (node_child.model.is_merge_wrong && node_child.model.group === 'question_multiple_choise') count_multiple_choise++;
            }

            if (count_multiple_choise === node_parent.model.answer_multiple_choises.length - 1) {
                let current_index = 0;
                for (let i = 0; i < node_parent.children.length; i++) {
                    const node_child = node_parent.children[i];
                    if (node_child.model.is_merge_wrong && node_child.model.group === 'question_multiple_choise') {
                        node_child.model.answer = node_parent.model.answer_multiple_choises[current_index];
                        node_child.model.is_merge_wrong = false;
                        current_index++;
                    }
                }
            } else {
                if (!first) {
                    first = true;
                    let first_number = -1;
                    let first_answer_number = -1;
                    for (let index = 0; index < node_parent.children.length; index++) {
                        const node_child = node_parent.children[index];
                        if (!node_child.model.is_merge_wrong && node_child.model.group === 'question_multiple_choise') continue;
                        let number = node_child.model.label.match(this._number_regex);
                        if (number === null) continue;
                        first_number = number[0] - number[0]%10;
                        break;
                    }
                    for (let index = 0; index < node_parent.model.answer_multiple_choises.length; index++) {
                        const answer = node_parent.model.answer_multiple_choises[index];
                        if (answer.number === null || answer.number === undefined) continue;
                        first_answer_number = answer.number - answer.number%10;
                        break;
                    }
                    if (first_number !== -1 && first_answer_number !== -1) distance = first_answer_number - first_number;
                }

                for (let index = 0; index < node_parent.children.length; index++) {
                    const node_child = node_parent.children[index];
                    if (!node_child.model.is_merge_wrong) continue;
                    let number = node_child.model.label.match(this._number_regex);
                    if (number === null) {
                        node_child.model.answer = { answer: '' }
                        node_child.model.is_merge_wrong = false;
                        continue;
                    }
                    number = number[0]*1 + distance;

                    for (let i = 0; i < node_parent.model.answer_multiple_choises.length; i++) {
                        const answer = node_parent.model.answer_multiple_choises[i];
                        if (answer.number == number) {
                            node_child.model.answer = answer;
                            node_child.model.is_merge_wrong = false;
                            node_parent.model.answer_multiple_choises.splice(i, 1)
                            break;
                        }
                    }
                }
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

        if (number !== null && character !== null) return true;

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
                if (number !== null) return { x: x, y: y };
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
                    if (number !== null && character !== null) {
                        answer = character[0];
                        let tmp_answer = this._getNumberFromPlan(answer);
                        if (tmp_answer != undefined) answer = tmp_answer;
                    }

                    if (number !== null) answers.push({ answer: answer, number: number[0] })
                } catch (error) {
                    if(this._logger) {
                        this.logger.error('Xảy ra lỗi trong quá trình tách đáp án từ bảng ở bài: "' + this._title + ', trong sách: "' + this._book  + '"');
                    }
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
                    if (number !== null && character !== null) {
                        answer = character[0];
                        let tmp_answer = this._getNumberFromPlan(answer);
                        if (tmp_answer != undefined) answer = tmp_answer;
                    }
                    if (number !== null) answers.push({ answer: answer, number: number[0] })

                } catch (error) {
                    if(this._logger) {
                        this.logger.error('Xảy ra lỗi trong quá trình tách đáp án từ bảng ở bài: "' + this._title + ', trong sách: "' + this._book  + '"');
                    }
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
                if (number !== null && character !== null) {
                    answer = character[0];
                    let tmp_answer = this._getNumberFromPlan(answer);
                    if (tmp_answer != undefined) answer = tmp_answer;
                }
                if (number !== null) answers.push({ answer: answer, number: number[0] })
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



// let string_inner_html = `<h2 class="s14 lineheight"></h2>
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
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>81</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>82</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>83</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>84</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>85</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>86</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>87</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>88</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>89</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>90</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>91</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>92</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>93</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>94</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>95</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>96</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>97</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>98</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>99</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>100</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>B</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>101</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>102</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>103</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>104</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>105</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>106</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>107</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>108</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>109</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>110</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>111</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>112</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>113</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>114</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>115</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>D</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>A</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>C</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>&nbsp;</strong></p> </td>
//   </tr>
//   <tr>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>116</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>117</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>118</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>119</strong></p> </td>
//    <td style="text-align: center;" valign="top" width="154"> <p><strong>120</strong></p> </td>
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
// let question_default = ''//'I. ĐỀ BÀI THAM KHẢO, Đề 1: Trong vai Lạc Long Quân, kể lại câu chuyện truyền thuyết Con Rồng cháu Tiên. Đề 2: Kể lại một câu chuyện cổ tích bằng lời văn của em (Sọ Dừa). A. asdsadsa    B.asdsadasd';
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// let dom = new JSDOM('<!doctype html><html><body></body></html>');
// let document = dom.window.document;
// var build = new Build(document, null);
// build.init(string_inner_html, question_default, 'wqeqwe')

