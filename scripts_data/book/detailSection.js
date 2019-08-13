

// Chua bat dc truong hop 'A' 'B' ...
const ANSWER = {
    A: "A.",
    B: "B.",
    C: "C.",
    D: "D.",
}
const KEY_ANSWERS = Object.keys(ANSWER);

const ANSWER_2 = {
    A: "(A)",
    B: "(B)",
    C: "(C)",
    D: "(D)",
}

const ANSWER_3 = {
    A: "<strong>A</strong>",
    B: "<strong>B</strong>",
    C: "<strong>C</strong>",
    D: "<strong>D</strong>",
}

const INDEXKEYS = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
}

const ANSWERS = [ANSWER, ANSWER_2, ANSWER_3];
const QUESTION_LABELS = ["Câu", "Bài", "Ý"];
const REGEX_ANSWER_AFTER = '[A-Za-z\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
const REGEX_ANSWER_BEFORE = '[A-Za-z0-9\\.\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
const REGEX_ANSWER_BEFORE_PLANS = '[A-Za-z0-9\\.\\s\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
const REGEX_QUESTION = '[0-9\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
const REGEX_PART = '[A-Za-z\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
const SLAVE_ANSWER_LABELS = ["lời giải", "giải", "giải", "gợi ý", "làm bài", "trả lời", "đáp án", "bài làm"];
// const REGEX_NUMBER = '\\d+';
// const REGEX_CHARECTER = '[A-Z]';

const REPLACEAS = [
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
        from: /Loigiaihay.com/g,
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
        from: /\\\(\\\)/g,
        to: '\\\( \\\)'
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

// i, tìm kiếm không phân biệt chữ hoa chữ thường: không có sự khác biệt giữa A và a (xem ví dụ bên dưới).
// g, tìm kiếm sẽ tìm tất cả các kết quả khớp, không có nó - chỉ có cái đầu tiên
// m, Chế độ Multiline
// S, Chế độ 'Dotall', cho phép '.' để phù hợp với dòng mới
// u, Cho phép hỗ trợ unicode đầy đủ.
// y, Chế độ dính (tìm kiếm tại vị trí)

let explain;
let bulkhead;
let spec_self_essay;

// nhiều câu hay 1 | không có đề hay có | trắc nghiệm (tự luận chắc chắn có)
const METHODS = {
    "000": "_buildNormal",
    "001": "_buildMultipleChoise",
    "010": "_buildNoQuestion",
    "011": "_buildNoQuestionMultipleChoise",
    "100": "_buildNormals",
    "101": "_buildMultipleChoises",
    "110": "_buildNoQuestions",
    "111": "_buildNoQuestionMultipleChoises"
}
const ID_METHODS = Object.keys(METHODS);

// ngang hay dọc | đáp án cùng ô hay không
const TYPE_TABLES = {
    "00": "_getVerticalDifferent",
    "01": "_getVerticalSame",
    "10": "_getHorizontalDifferent",
    "11": "_getHorizontalSame"
}
const ID_TABLES = Object.keys(TYPE_TABLES);

// da bo ':' va '.' trong lay cau, part
const PARTSI = ["I", "Phần I", "PHẦN I", ".{0,3}PHẦN ĐỌC.{1,3}HIỂU", ".{0,3}PHẦN TRẮC NGHIỆM", ".{0,3}TRẮC NGHIỆM", ".{0,3}Phần trắc nghiệm"]
const PARTSII = ["II", "Phần II", "PHẦN II", ".{0,3}PHẦN LÀM VĂN", ".{0,3}PHẦN TỰ LUẬN", ".{0,3}TỰ LUẬN", ".{0,3}Phần tự luận"]
// const PARTSIII = ["III", "Phần III", "PHẦN III"]
// const PARTSIV = ["IV", "Phần IV", "PHẦN IV"]
// const PARTS = [PARTSI, PARTSII, PARTSIII, PARTSIV];
const PARTS = [PARTSI, PARTSII];

const BOOK_COMPLEX_PART_QUESTION = ['văn']
const BOOK_COMPLEX_MULTIPE_CHOISE = ['hình học']
let is_complex_part_question = false;
let is_complex_multiple_choise = false;

class DetailSection {

    constructor(document, string_inner_html, question_default, book, element) {

        this.document = document;
        this.string_inner_html = string_inner_html;
        this.question_default = question_default;
        this.book = book;

        is_complex_part_question = this._isComplexPartQuestion();
        is_complex_multiple_choise = this._isComplexMultipleChoise();

        this._cleanRedundantString();
        this._init();
        this._cleanRedundantNode();

        let text_node = this.document.createTextNode("{{}}(10)");
        spec_self_essay = this.document.createElement('p')
        spec_self_essay.appendChild(text_node);

        text_node = this.document.createTextNode("<explain>");
        explain = this.document.createElement('p');
        explain.appendChild(text_node);

        bulkhead = this.document.createElement('div');
        text_node = this.document.createTextNode('===');
        bulkhead.appendChild(text_node);
        bulkhead.className = 'subTitle'

    }

    /**
     * Xóa hoặc thay thế các từ không cần thiết
     */
    _cleanRedundantString() {
        for (let index = 0; index < REPLACEAS.length; index++) {
            this.string_inner_html = this.string_inner_html.replace(REPLACEAS[index].from, REPLACEAS[index].to)
        }
    }

    /**
     * Xóa các node không cần thiết
     */
    _cleanRedundantNode() {

        let title_remove = this.element.querySelector(".lineheight");
        if (title_remove) title_remove.remove();

        let img_remove = this.element.querySelector("img#method_colapse_icon");
        if (img_remove) img_remove.remove();

        let a_remove = this.element.querySelector("a");
        if (a_remove) a_remove.remove();

        this._shiftDivElement();
        this._shiftBrElement();
        this._cleanString();

        this.string_inner_html = this.element.outerHTML;
    }

    /**
     * Loại bỏ các thẻ div để đẩy các thẻ p lên ngang hàng
     */
    _shiftDivElement() {
        while (true) {
            let has_div = false;
            for (let index = this.element.children.length - 1; index >= 0; index--) {
                let child = this.element.children[index];
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
        for (let index = this.element.children.length - 1; index >= 0; index--) {
            let child = this.element.children[index];
            let name_child = child.nodeName;
            if (name_child != 'P' || child.children == null) continue;
            let strong_node = child.querySelector('strong');
            if (!strong_node) continue;
            let ref_node = child;
            let array_element = []
            let p_element = this.document.createElement('p');
            for (let i = 0; i < child.childNodes.length; i++) {
                let node_child = child.childNodes[i];
                if (node_child.nodeName == 'BR' && i > 0) {
                    array_element.push(this._cloneNode(p_element));
                    p_element = this.document.createElement('p');
                } else if (node_child.nodeName != 'BR') {
                    p_element.appendChild(this._cloneNode(node_child));
                }
                if (node_child.nodeName != 'BR' && i == child.childNodes.length - 1) {
                    array_element.push(this._cloneNode(p_element));
                }
            }
            for (let i = array_element.length - 1; i >= 0; i--) {
                ref_node.after(array_element[i]);
            }
            child.remove();
        }
    }

    _cleanString() {
        for (let index = this.element.children.length - 1; index >= 0; index--) {
            let child = this.element.children[index];
            let name_child = child.nodeName;
            if (name_child != 'P' || child.children == null) continue;
            let text = child.textContent;
            if (!text) continue;
            if ((text.includes('Xem thêm: ') && text.includes('Tuyensinh247.com')) || text.includes('Click vào Bài tiếp theo')) {
                child.remove()
            }
        }
    }

    /**
     * Tạo các node
     */
    _init() {
        this.element = this.document.createElement("div");
        this.element.innerHTML = this.string_inner_html;
    }

    /**
     * kiểm tra xem có trắc nghiệm hay không
     */
    _hasMultipleChoise() {
        // can them phan ngoai le cua phan toan hinh hoc A, B, C, .. A', B',....
        for (let index = 0; index < KEY_ANSWERS.length; index++) {
            const key = KEY_ANSWERS[index];
            const regex = new RegExp('(?<!' + REGEX_ANSWER_BEFORE + ')' + key + '(?!' + REGEX_ANSWER_AFTER + ')');
            const index_find = this.string_inner_html.search(regex);
            if (index_find != -1) continue;
            return false;
        }
        return true;
    }

    /**
     * kiểm tra xem có trắc nghiệm hay không
     */
    _hasMultipleChoiseComplex() {
        for (let index = 0; index < KEY_ANSWERS.length; index++) {
            const key = KEY_ANSWERS[index];
            // do trong hinh hoc co A, B, C, ...
            const regex = new RegExp('(?<!' + REGEX_ANSWER_BEFORE + ')' + key + '\\.(?!' + REGEX_ANSWER_AFTER + ')');
            const index_find = this.string_inner_html.search(regex);
            if (index_find != -1) continue;
            return false;
        }
        return true;
    }

    /**
     * Check xem có phải sách có sự phức tạp phân biệt giữa phần và câu hay không
     */
    _isComplexPartQuestion() {
        const book_name = this.book.toLowerCase();
        for (let i = 0; i < BOOK_COMPLEX_PART_QUESTION.length; i++) {
            if (!book_name.includes(BOOK_COMPLEX_PART_QUESTION[i])) continue;
            return true;
        }
        return false
    }

    /**
     * Check xem có phải sách có sự phức tạp câu trắc nghiệm
     */
    _isComplexMultipleChoise() {
        const book_name = this.book.toLowerCase();
        const title = this.question_default.toLowerCase();
        for (let i = 0; i < BOOK_COMPLEX_MULTIPE_CHOISE.length; i++) {
            if (!book_name.includes(BOOK_COMPLEX_MULTIPE_CHOISE[i]) && !title.includes(BOOK_COMPLEX_MULTIPE_CHOISE[i])) continue;
            return true;
        }
        return false
    }

    /**
     * Có nhiều câu hay không
     */
    _isManyQuestions() {
        for (let index = 0; index < QUESTION_LABELS.length; index++) {
            const question_label = QUESTION_LABELS[index];
            const regex = new RegExp(question_label + ' \\d+', 'g');
            const questions = this.string_inner_html.match(regex);
            if (questions && questions.length >= 2) return true;
        }
        return false;
    }

    _isManyQuestionsComplex() {
        let count_part = 0;
        for (let index = 0; index < PARTS.length; index++) {
            const PART = PARTS[index];
            for (let i = 0; i < PART.length; i++) {
                const part = PART[i];
                const regex = new RegExp('(?<!' + REGEX_PART + ')' + part + '(?!' + REGEX_PART + ')', 'g')
                if (this.string_inner_html.search(regex) <= -1) continue;
                count_part++;
                break;
            }
            if (count_part >= 2) break;
        }
        // let count_question = 0;
        // const regex = new RegExp('\\d+', 'g')
        // let strong_nodes = this.element.getElementsByTagName('strong');
        // for (let index = 0; index < strong_nodes.length; index++) {
        //     const strong_node = strong_nodes[index];
        //     const text = strong_nodes.textContent;
        //     if(!text) continue;
        //     if(text.search(regex) == 0){
        //         count_question++;
        //     }
        //     if(count_question >= 2) break;
        // }
        return this._isManyQuestions() && count_part >= 2;
    }

    /**
     * Có phần chữ 'đề bài' ngay lúc đầu hay không
     */
    _notHasQuestion() {
        const questionTitle = this.element.querySelector("p .content_question");
        if (questionTitle) return false;
        return true;
    }

    /**
     * Clone node ở vị trí cho trước
     * @param {*} position: vị trí của node được clone trong element gốc
     */
    _cloneNodeElement(position) {
        return this.element.children[position].cloneNode(true);
    }

    /**
     * Clone node
     * @param {*} node: node được clone
     */
    _cloneNode(node) {
        return node.cloneNode(true);
    }

    /**
     * Vị trí của phần chữ 'đề bài'
     */
    _getStartIndexQuestion() {
        return this._getIndexQnABySelector("p .content_question", -1);
    }

    _checkSlaveAnswer(text) {
        for (let index = 0; index < SLAVE_ANSWER_LABELS.length; index++) {
            const slave_answer_label = SLAVE_ANSWER_LABELS[index];
            const regex = new RegExp(slave_answer_label + '.{0,1}$', 'g')
            if (text.search(regex) == 0) return true;
        }
        return false;
    }

    /**
     * Vị trí của phần bắt đầu trả lời
     */
    _getStartIndexAnswer() {
        let fist_find = this._getIndexQnABySelector("p .content_detail", - 1);
        // nếu không tìm thấy, sẽ xét các trường hợp phụ
        if (fist_find == -1) {
            for (let index = 0; index < this.element.children.length; index++) {
                let text = this.element.children[index].textContent;
                if (text == null || text == undefined) continue;
                text = text.trim().toLowerCase();
                // do 'giai' thuoc 2 uni-code khac nhau nen can co 2 regex
                if (this._checkSlaveAnswer(text)) {
                    fist_find = index;
                    break;
                }
            }
        }
        // trong trường hợp đã xét các trường hợp phụ mà vẫn chưa tìm thấy thì trả về vị trí cuối cùng
        if (fist_find == -1) return this.element.children.length - 1;
        /// độ dài các phần tử con???
        // if(fist_find == -1) return this.element.children.length;
        return fist_find;
    }

    /**
     * Vị trí của phần bắt đầu trả lời
     */
    _getStartIndexAnswerBySelector() {
        return this._getIndexQnABySelector("p .content_detail", - 1);
    }

    _checkMultipleSlaveAnswer(start_index, end_index) {
        let count = 0;
        for (let index = start_index; index < end_index; index++) {
            let text = this.element.children[index].textContent;
            if (text == null || text == undefined) continue;
            text = text.trim().toLowerCase();
            // do 'giai' thuoc 2 uni-code khac nhau nen can co 2 regex
            if (this._checkSlaveAnswer(text)) {
                count++;
            }
            if (count >= 2) return true;
        }
        return false;
    }

    /**
     * Vị trí của phần bắt đầu trả lời
     */
    _getStartIndexAnswerOneQuestion(start_index, end_index, default_value) {
        for (let index = start_index; index < end_index; index++) {
            let text = this.element.children[index].textContent;
            if (text == null || text == undefined) continue;
            text = text.trim().toLowerCase();
            // do 'giai' thuoc 2 uni-code khac nhau nen can co 2 regex
            if (this._checkSlaveAnswer(text)) {
                return index;
            }
        }
        return default_value;
    }

    /**
     * Lấy vị trí theo selector
     * @param {*} selector: jquery selector
     * @param {*} default_value: giá trị mặc định
     */
    _getIndexQnABySelector(selector, default_value) {
        const title = this.element.querySelector(selector);
        if (!title) return default_value;
        const titleParent = title.parentNode;
        let start_index = Array.from(this.element.children).indexOf(titleParent);
        if (start_index == null || start_index < 0 || start_index > this.element.children.length) {
            start_index = default_value + 1;
        }
        return start_index;
    }


    // =============Multiple q&a==============//

    /**
     * Lấy vị trí của phần bắt đầu các phương án trắc nghiệm
     * @param {*} start_index: vị trí bắt đầu tìm kiếm
     * @param {*} end_index: vị trí kết thúc tìm kiếm + 1
     * @param {*} default_value: giá trị mặc định
     */
    _getStartIndexAnswerPlan(start_index, end_index, default_value) {
        for (let index = start_index; index < end_index; index++) {
            let text_question = this.element.children[index].textContent;
            if (text_question == null || text_question == undefined) continue;
            text_question = text_question.trim();
            const regex = new RegExp('(?<!' + REGEX_ANSWER_BEFORE_PLANS + ')' + KEY_ANSWERS[0] + '(?!' + REGEX_ANSWER_AFTER + ')');
            const index_find = text_question.search(regex);
            // gioi han khong cho vi tri xuat hien 'A.' qua 10
            if (index_find <= -1 || index_find >= 10) continue;
            return index;
        }
        return default_value;
    }

    // can phat trien them
    /**
     * Lấy các phương án trả lời của phần trắc nghiệm
     * @param {*} start_index: vị trí bắt đầu
     * @param {*} end_index: vị trí kết thúc + 1
     */
    _getAnswerPlans(start_index, end_index) {

        const tmp_answer_plans = [];
        // let last_index = start_index;
        let last_index = end_index;
        for (let index = start_index; index < end_index; index++) {
            let text = this.element.children[index].textContent;

            if (text == null || text == undefined) continue;

            text = text.trim();

            // truong hop ABCD.A'B'C'D' trong hinh hoc???
            // let positions = []
            // for (let i = 0; i < KEY_ANSWERS.length; i++) {
            //     const regex = new RegExp('(?<!' + REGEX_ANSWER_BEFORE + ')' + KEY_ANSWERS[i] + '(?!' + REGEX_ANSWER_AFTER + ')');
            //     const index_find = text.search(regex);
            //     if (index_find > -1) {
            //         positions.push({ key: KEY_ANSWERS[i], position: index_find });
            //         last_index = index;
            //     }
            // }
            // if(positions.length == 0) continue;

            const keysAnswers = [];

            for (let j = 0; j < ANSWERS.length; j++) {
                const answers = ANSWERS[j];
                if (keysAnswers.length == 0) {
                    for (let i = 0; i < KEY_ANSWERS.length; i++) {
                        if (text.includes(answers[KEY_ANSWERS[i]])) {
                            keysAnswers.push(answers[KEY_ANSWERS[i]]);
                            last_index = index;
                        }
                    }
                }
            }

            if (keysAnswers.length == 0) continue;

            const positions = [];
            for (let i = 0; i < keysAnswers.length; i++) {
                let position = text.indexOf(keysAnswers[i]);
                positions.push({ key: keysAnswers[i], position: position });
            }

            positions.sort((slot1, slot2) => {
                return slot1.position > slot2.position;
            })

            // can bat truong hop (\A.\) (\B.\) va $$A
            for (let i = 0; i < positions.length; i++) {
                let from = positions[i].position;
                if (i == 0) from = 0;

                let to = text.length;
                if (i < positions.length - 1) {
                    to = positions[i + 1].position;
                    let subText = text.substring(from, to);

                    let lastSpect = subText.lastIndexOf(" ");
                    if (lastSpect > -1 && lastSpect < to) {
                        for (let j = subText.length - 1; j >= lastSpect; j--) {
                            if (subText[j] != " ") {
                                positions[i + 1].position -= (to - j);
                                to = j + 1;
                                break;
                            }
                        }
                    }
                    let lastSpectDola = subText.lastIndexOf("$$");
                    if (lastSpectDola > -1 && lastSpectDola < to) {
                        for (let j = subText.length - 1; j >= lastSpectDola; j--) {
                            if (subText[j] != " ") {
                                positions[i + 1].position -= (to - j);
                                to = j - 1; // do co '$$'
                                break;
                            }
                        }
                    }
                }
                tmp_answer_plans.push({ key: positions[i].key, answer: text.substring(from, to).trim() });
            }
        }
        // console.log(tmp_answer_plans)
        tmp_answer_plans.sort((slot1, slot2) => {
            return slot1.key > slot2.key;
        })

        const answer_plans = [];
        for (let index = 0; index < tmp_answer_plans.length; index++) {
            let answer = tmp_answer_plans[index].answer;
            if (answer.startsWith(tmp_answer_plans[index].key)) answer = answer.replace(tmp_answer_plans[index].key, '');
            answer_plans.push(answer);
        }

        const answer_plans_with_index = {
            answer_plans: answer_plans,
            last_index: last_index
        }

        return answer_plans_with_index;
    }

    /**
     * Lấy phương án đúng của câu trắc nghiệm mà không có bảng đáp án
     * đầu tiên sẽ tìm kiếm sự xuất hiện của các từ 'chọn, đúng' trong câu
     * nếu sau lần thứ nhất không tìm thấy sẽ tìm kiếm lần thứ 2 mà không có các từ đó
     * @param {*} start_index: vị trí bắt đầu
     * @param {*} end_index: vị trí kết thúc + 1
     */
    _getAnswerMultipleChoise(start_index, end_index) {
        let is_first = true;
        while (true) {
            for (let index = start_index; index < end_index; index++) {
                let text = this.element.children[index].textContent;

                if (text == null || text == undefined) continue;

                let text_lower_case = text.toLowerCase();

                if (is_first && !text_lower_case.includes('chọn') && !text_lower_case.includes('dúng')) continue;

                for (let i = 0; i < KEY_ANSWERS.length; i++) {
                    const regex = new RegExp('(?<!' + REGEX_ANSWER_BEFORE + ')' + KEY_ANSWERS[i] + '(?!' + REGEX_ANSWER_AFTER + ')');
                    const indexString = text.search(regex);
                    if (indexString <= -1) continue;
                    return {
                        key: INDEXKEYS[KEY_ANSWERS[i]],
                        index: index,
                        position: indexString
                    }
                }
            }
            if (!is_first) break;
            is_first = false;
        }

        return {
            key: ""
        };
    }

    /**
     * Tạo các phương án trả lời trắc nghiệm
     * @param {*} answer_plans
     * @param {*} answer
     */
    _createAnswerPlanText(answer_plans, answer) {
        let answer_plans_text = "";
        for (let index = 0; index < answer_plans.length; index++) {
            // do se anh huong den cac phan khac nen phai tim va fix tay pha '/'
            // answer_plans[index] = answer_plans[index].replace(/\//g, '\\\/')
            if (index == 0) answer_plans_text = "{{" + answer_plans[index];
            else if (index == answer_plans.length - 1) answer_plans_text += "/" + answer_plans[index] + "}}"
            else answer_plans_text += "/" + answer_plans[index];
        }
        answer_plans_text += "(" + answer + ")";
        return answer_plans_text;
    }

    // ============== Multiple q&a end ============ //

    // ============== Part ============== //

    /**
     * Lấy các phần trong bài
     * @param {*} start_index: vị trí bắt đầu
     * @param {*} end_index: vị trí kết thúc + 1
     */
    _getAllPart(start_index, end_index) {
        let all_parts = [];
        for (let index = start_index; index < end_index; index++) {
            const node_element = this.element.children[index];
            const node_name = node_element.nodeName;
            // tranh lay text trong table
            if (node_name == 'TABLE' || node_name == 'IMG') continue;
            let text = node_element.textContent;
            if (text == null || text == undefined) continue;
            text = text.trim();
            for (let i = 0; i < PARTS.length; i++) {
                const PART = PARTS[i];
                let check = false;
                for (let j = 0; j < PART.length; j++) {
                    const part = PART[j];
                    const regex = new RegExp(part + '(?!' + REGEX_PART + ')', 'g')
                    if (text.search(regex) != 0) continue;
                    all_parts.push(i);
                    check = true;
                    break;
                }
                if (check) break;
            }
        }
        return all_parts;
    }

    /**
     * Lấy vị trí các câu hỏi
     * @param {*} start_index
     * @param {*} end_index
     */
    _getAllStartQuestions(start_index, end_index) {
        let questions = {};
        for (let index = start_index; index < end_index; index++) {
            let text = this.element.children[index].textContent;
            if (text == undefined || text == null) continue;
            text = text.trim();
            // can chinh lai
            for (let i = 0; i < QUESTION_LABELS.length; i++) {
                const question_label = QUESTION_LABELS[i];
                if (text.startsWith(question_label)) {
                    // can bat het truong hop 'cau  123'
                    const name = text.substring(0, 8);
                    const number = name.match(/\d+/g);
                    if (number) {
                        if (!questions[number[0]]) {
                            questions[number[0]] = { from: index, to: end_index, exist_after: 0 };
                        }
                        else {
                            questions[number[0]].exist_after++;
                            const number_after = questions[number[0]].exist_after;
                            questions[number[0] + "_" + number_after] = { from: index, to: end_index, exist_after: 0 };
                        }
                        break;
                    }
                }
            }
        }

        const question_keys = Object.keys(questions);
        if (question_keys.length == 0) return {
            '1': {
                from: start_index + 1,
                to: end_index
            }
        }
        for (let index = 0; index < question_keys.length; index++) {
            if (index < question_keys.length - 1) {
                questions[question_keys[index]].to = questions[question_keys[index + 1]].from;
            }
        }
        return questions;
    }

    /**
     * Lấy vị trí các câu trả lời
     * @param {*} start_index
     * @param {*} end_index
     * @param {*} question_numbers
     */
    _getAllStartAnswers(start_index, end_index, question_numbers) {
        let answers = {};
        let q_numbers = Object.assign([], question_numbers)
        for (let index = start_index; index < end_index; index++) {
            let text = this.element.children[index].textContent;
            if (text == undefined || text == null) continue;
            text = text.trim();
            for (let i = 0; i < q_numbers.length; i++) {
                const number = q_numbers[i].split('_')[0];
                let check = false;
                // can chinh lai trong truong hop chi co cau 1\n
                for (let j = 0; j < QUESTION_LABELS.length; j++) {
                    const question_label = QUESTION_LABELS[j];
                    const regex = new RegExp(question_label + ' ' + number + '(?!' + REGEX_QUESTION + ')', 'g');
                    if (text.search(regex) == 0) {
                        if (!answers[number]) {
                            answers[number] = { from: index, to: end_index, exist_after: 0 };
                        } else {
                            answers[number].exist_after++;
                            const number_after = answers[number].exist_after;
                            answers[number + "_" + number_after] = { from: index, to: end_index, exist_after: 0 };
                        }
                        q_numbers.splice(i, 1);
                        check = true;
                        break;
                    }
                }
                if (check) break;
            }
        }
        const answer_keys = Object.keys(answers);
        if (answer_keys.length == 0 && !this._getAnswerTable(start_index, end_index)) return {
            '1': {
                from: start_index + 1,
                to: end_index
            }
        }
        for (let index = 0; index < answer_keys.length; index++) {
            if (index < answer_keys.length - 1) {
                answers[answer_keys[index]].to = answers[answer_keys[index + 1]].from;
            }
        }
        return answers;
    }

    /**
     * Lấy vị trí bắt đầu của mỗi phần
     * @param {*} start_index
     * @param {*} end_index
     * @param {*} PART
     * @param {*} default_value
     */
    _getStartPart(start_index, end_index, PART, default_value) {
        for (let index = start_index; index < end_index; index++) {
            let text = this.element.children[index].textContent;
            if (text == undefined || text == null) continue;
            text = text.trim();
            for (let i = 0; i < PART.length; i++) {
                const part = PART[i];
                const regex = new RegExp(part + '(?!' + REGEX_PART + ')', 'g')
                if (text.search(regex) != 0) continue;
                return index;
            }
        }
        return default_value;
    }

    /**
     * Lấy vị trí câu hỏi đầu tiên của phần
     * @param {*} start_index
     * @param {*} end_index
     * @param {*} default_value
     */
    _getFirstQuestionPart(start_index, end_index, default_value) {
        for (let index = start_index; index < end_index; index++) {
            if (!this.element.children[index]) continue;
            let text = this.element.children[index].textContent;
            if (text == undefined || text == null) continue;
            text = text.trim();
            for (let i = 0; i < QUESTION_LABELS.length; i++) {
                const question_label = QUESTION_LABELS[i];
                const regex = new RegExp(question_label, 'g');
                // de phong truong hop &nbsp; o dau cau
                const index_find = text.search(regex)
                if (index_find <= 2 && index_find >= 0) return index;
            }
        }
        return default_value;
    }

    /**
     * Tạo câu hỏi
     * @param {*} start_index
     * @param {*} end_index
     */
    _insertQuestionNormal(dom_element, start_index, end_index, is_h5_tag) {
        if (is_h5_tag) {
            let remember_spec = [];
            let has_first_line = false;
            let index_solution_method = end_index;
            for (let i = start_index; i < end_index; i++) {

                let child = this._cloneNodeElement(i);
                if (child.nodeName == 'IMG' || child.nodeName == 'TABLE' || child.querySelector('img')) {
                    remember_spec.push(child);
                    continue;
                }

                let text = child.textContent;
                if (!text) continue;

                if (!has_first_line) {
                    let text_node = this.document.createTextNode(text);
                    let question_h5_element = this.document.createElement('h5');
                    question_h5_element.appendChild(text_node);
                    dom_element.appendChild(question_h5_element);
                    has_first_line = true;
                    continue;
                }

                let is_solution_method = text.toLowerCase().includes('phương pháp giải');
                if (!is_solution_method) {
                    dom_element.appendChild(child);
                } else {
                    index_solution_method = i;
                    break;
                }
            };
            for (let i = 0; i < remember_spec.length; i++) {
                dom_element.appendChild(remember_spec[i]);
            };
            for (let i = index_solution_method; i < end_index; i++) {
                dom_element.appendChild(this._cloneNodeElement(i));
            };
        } else {
            for (let i = start_index; i < end_index; i++) {
                // let is_solution_method = text.toLowerCase().includes('phương pháp giải');
                // if (!is_solution_method) {
                //     dom_element.appendChild
                // } else {
                //     index_solution_method = i;
                //     break;
                // }
                dom_element.appendChild(this._cloneNodeElement(i));
            };
        }
        dom_element.appendChild(this._cloneNode(spec_self_essay));
    }

    /**
     * Tạo câu hỏi
     * @param {*} start_index
     * @param {*} end_index
     */
    _insertQuestionMultipleChoise(dom_element, start_index, end_index, is_h5_tag) {
        if (is_h5_tag) {
            let remember_spec = [];
            let has_first_line = false;
            // let index_solution_method = end_index;
            for (let i = start_index; i < end_index; i++) {

                let child = this._cloneNodeElement(i);
                if (child.nodeName == 'IMG' || child.nodeName == 'TABLE' || child.querySelector('img')) {
                    remember_spec.push(child);
                    continue;
                }

                let text = child.textContent;
                if (!text) continue;

                if (!has_first_line) {
                    let text_node = this.document.createTextNode(text);
                    let question_h5_element = this.document.createElement('h5');
                    question_h5_element.appendChild(text_node);
                    dom_element.appendChild(question_h5_element);
                    has_first_line = true;
                    continue;
                }

                // let is_solution_method = text.toLowerCase().includes('phương pháp giải');
                // if (!is_solution_method) {
                dom_element.appendChild(child);
                // } else {
                //     index_solution_method = i;
                //     break;
                // }
            };
            for (let i = 0; i < remember_spec.length; i++) {
                dom_element.appendChild(remember_spec[i]);
            };
            // for (let i = index_solution_method; i < end_index; i++) {
            //     dom_element.appendChild(this._cloneNodeElement(i));
            // };
        } else {
            for (let i = start_index; i < end_index; i++) {
                // let is_solution_method = text.toLowerCase().includes('phương pháp giải');
                // if (!is_solution_method) {
                //     dom_element.appendChild
                // } else {
                //     index_solution_method = i;
                //     break;
                // }
                dom_element.appendChild(this._cloneNodeElement(i));
            };
        }
    }

    /**
     * Tạo phần title của phần
     * @param {*} dom_element
     * @param {*} start_question_part
     * @param {*} start_first_question
     * @param {*} has_param
     */
    _insertTitlePart(dom_element, start_question_part, start_first_question, has_param) {
        const text_part = this._cloneNodeElement(start_question_part).textContent;
        if (text_part.length > 50) {
            this._buildDefault();
            return false;
        }

        const part_title = this.document.createTextNode(text_part);
        const part_element = this.document.createElement("h5");
        part_element.appendChild(part_title);
        dom_element.appendChild(part_element);

        // them phan chung cho cac cau hoi cua phan
        if (has_param) {
            for (let index = start_question_part + 1; index < start_first_question; index++) {
                const part_param = this.document.createElement("h6");
                const text_param = this._cloneNodeElement(index).textContent;
                const text_node = this.document.createTextNode(text_param)
                part_param.appendChild(text_node);
                dom_element.appendChild(part_param);
            }
        }

        return true;
    }

    /**
     * Taọ phần trả lời chi tiêt
     * @param {*} dom_element
     * @param {*} start_answer
     * @param {*} start_next_answer
     */
    _insertAnswerDetail(dom_element, start_answer, start_next_answer, switch_key_to_answer) {
        dom_element.appendChild(this._cloneNode(explain));
        for (let i = start_answer; i < start_next_answer; i++) {
            let answer_node = null;
            if(switch_key_to_answer
                && switch_key_to_answer.key != null
                && switch_key_to_answer.index != null
                && switch_key_to_answer.index == i
                && this.element.children[i].nodeName == "P"
            ){
                let text = this.element.children[i].textContent;
                text = text.substring(0, switch_key_to_answer.position) + switch_key_to_answer.key + text.substring(switch_key_to_answer.position + 1);
                answer_node = this.document.createElement("p");
                let text_node = this.document.createTextNode(text);
                answer_node.appendChild(text_node);
            }
            if(!answer_node) {
                answer_node = this._cloneNodeElement(i);
                // if (!check_create_answer_plan) {
                //     let strongNode = answer_node.querySelector("strong");
                //     if (strongNode) strongNode.remove()
                // }
            }
            dom_element.appendChild(answer_node);
        }
    }

    /**
     * Tạo phần trắc nghiệm
     * @param {*} dom_element
     * @param {*} detail_part
     */
    _createPartMultipleChose(
        dom_element,
        detail_part
    ) {

        if (detail_part.has_part_titles) {
            let check = this._insertTitlePart(dom_element, detail_part.start_question_part, detail_part.start_first_question, detail_part.has_param);
            if (!check) return;
        }

        const questions = this._getAllStartQuestions(detail_part.start_question_part, detail_part.start_question_next_part);
        const question_keys = Object.keys(questions);
        const answer_details = this._getAllStartAnswers(detail_part.start_answer_part, detail_part.start_answer_next_part, question_keys);

        const is_one_question_in_part = questions.length == 1 ? true : false;
        let tmp_answers = null;
        tmp_answers = this._getAnswerMultipleChoises(detail_part.start_answer_part, detail_part.start_answer_next_part, is_one_question_in_part);
        const answers = tmp_answers;
        // console.log(tmp_answers, answer_details)

        for (let index = 0; index < question_keys.length; index++) {

            if (detail_part.has_part_titles && index > 0) {
                dom_element.appendChild(this._cloneNode(bulkhead));
            }

            const start_question = questions[question_keys[index]].from;
            const start_next_question = questions[question_keys[index]].to;

            let is_h5_tag = true;
            if (detail_part.has_part_titles) {
                is_h5_tag = false;
            }

            let tmp_start_answer_plan = this._getStartIndexAnswerPlan(start_question + 1, start_next_question, start_question);
            let answer = null;

            if (tmp_start_answer_plan > start_question) {

                const start_answer_plan = tmp_start_answer_plan;
                const answer_plans_with_index = this._getAnswerPlans(start_answer_plan, start_next_question);

                const answer_plans = answer_plans_with_index.answer_plans;
                const last_index = answer_plans_with_index.last_index + 1;

                this._insertQuestionMultipleChoise(dom_element, start_question, start_answer_plan, is_h5_tag);

                // phuong phap giai??
                if (last_index < start_next_question) {
                    for (let i = last_index; i < start_next_question; i++) {
                        dom_element.appendChild(this._cloneNodeElement(i));
                    }
                }
                if (answer_plans) {
                    const answer_plans_element = this.document.createElement("p");
                    if (answers && answers[question_keys[index]]) answer = answers[question_keys[index]];
                    if (!answer && answer_details[question_keys[index]]) {
                        answer = this._getAnswerMultipleChoise(answer_details[question_keys[index]].from, answer_details[question_keys[index]].to);
                    }
                    let answer_plans_text;
                    // Do một số đề thi đáp án trong bảng không có
                    if(!answer) {
                        answer_plans_text = this._createAnswerPlanText(answer_plans, "");
                        console.log("Warning at book: " + this.book + ", title: " + this.question_default + ", question does not has answer: " + question_keys[index] + ",method: " + this._getBuildMethod());
                    } else {
                        answer_plans_text = this._createAnswerPlanText(answer_plans, answer.key);
                        answer.key = answer_plans[answer.key-1]
                    }
                    answer_plans_element.appendChild(this.document.createTextNode(answer_plans_text));
                    dom_element.appendChild(answer_plans_element);
                } else {
                    dom_element.appendChild(this._cloneNode(spec_self_essay));
                }

            } else {
                this._insertQuestionNormal(dom_element, start_question, start_next_question, is_h5_tag);
            }

            if (!answer_details[question_keys[index]]) continue;

            const start_answer = answer_details[question_keys[index]].from;
            const start_next_answer = answer_details[question_keys[index]].to;
            // console.log(question_keys[index], answer)
            this._insertAnswerDetail(dom_element, start_answer, start_next_answer, answer);

        }
        return true;
    }

    /**
     * Tạo phần không có câu trắc nghiệm
     * @param {*} dom_element
     * @param {*} detail_part
     */
    _createPart(
        dom_element,
        detail_part
    ) {

        if (detail_part.has_part_titles) {
            let check = this._insertTitlePart(dom_element, detail_part.start_question_part, detail_part.start_first_question, detail_part.has_param);
            if (!check) return;
        }

        const questions = this._getAllStartQuestions(detail_part.start_question_part, detail_part.start_question_next_part);
        const question_keys = Object.keys(questions);
        const answer_details = this._getAllStartAnswers(detail_part.start_answer_part, detail_part.start_answer_next_part, question_keys);

        for (let index = 0; index < question_keys.length; index++) {

            if (detail_part.has_part_titles && index > 0) {
                dom_element.appendChild(this._cloneNode(bulkhead));
            }

            const start_question = questions[question_keys[index]].from;
            const start_next_question = questions[question_keys[index]].to;

            let is_h5_tag = true;
            if (detail_part.has_part_titles) {
                is_h5_tag = false;
            }

            this._insertQuestionNormal(dom_element, start_question, start_next_question, is_h5_tag);

            if (!answer_details[question_keys[index]]) continue;

            const start_answer = answer_details[question_keys[index]].from;
            const start_next_answer = answer_details[question_keys[index]].to;
            this._insertAnswerDetail(dom_element, start_answer, start_next_answer);

        }
    }

    /**
     * Tạo phần tổng quát
     * @param {*} has_multiple_choise
     */
    _createAbstractPart(has_multiple_choise) {
        const result = this.document.createElement("div");
        const start_question = this._getStartIndexQuestion();
        const start_answer = this._getStartIndexAnswer();

        const all_parts = this._checkParts(start_question + 1, start_answer, has_multiple_choise)
        if (!all_parts) return;

        const detail_parts = this._createDetailParts(all_parts, start_question, start_answer, has_multiple_choise);

        if (!has_multiple_choise) {
            for (let index = 0; index < detail_parts.length; index++) {
                this._createPart(
                    result,
                    detail_parts[index]
                )
            }
        } else {
            for (let index = 0; index < detail_parts.length; index++) {
                this._createPartMultipleChose(
                    result,
                    detail_parts[index]
                )
            }
        }

        if (result.children.length > 0) this.element = result;
    }

    _createDetailParts(all_parts, start_question, start_answer, has_multiple_choise) {
        let has_part_titles = all_parts.length == 0 ? false : true;
        // bắt trường hợp của sinh học, đề thi có 1 phần nhưng có nhieuf ký tự trong phần regex của phần
        if (has_multiple_choise && all_parts.length > 3) {
            has_part_titles = false;
        }
        let detail_parts = [];
        let error_part = false;

        if (has_part_titles) {
            let cur_start = start_question;
            let cur_answer = start_answer;

            for (let index = 0; index < all_parts.length; index++) {
                const PART = PARTS[all_parts[index]];
                const start_question_part = this._getStartPart(cur_start + 1, start_answer, PART, 0);
                // console.log(index, all_parts, all_parts[index], PART)
                // console.log(cur_answer, PART)
                const start_answer_part = this._getStartPart(cur_answer + 1, this.element.children.length, PART, cur_answer);
                const start_first_question_part = this._getFirstQuestionPart(start_question_part + 1, start_answer, start_question_part + 1);
                const has_param_part = start_question_part + 1 < start_first_question_part ? true : false;

                cur_start = start_question_part;
                cur_answer = start_answer_part;

                // console.log(start_answer, start_answer_part)

                detail_parts.push({
                    start_question_part: start_question_part,
                    start_answer_part: start_answer_part,
                    start_first_question_part: start_first_question_part,
                    has_param_part: has_param_part
                })
            }
        }

        if (detail_parts.length > 1 && detail_parts[0].start_question_part + 2 >= detail_parts[1].start_question_part) error_part = true;

        if (!has_part_titles || error_part) {
            const start_question_part = start_question;
            const start_answer_part = start_answer;

            const start_first_question_part = this._getFirstQuestionPart(start_question_part, start_answer, start_question_part + 1);
            const has_param_part = start_question_part + 1 < start_first_question_part ? true : false;

            has_part_titles = false;
            detail_parts = [{
                start_question_part: start_question_part,
                start_answer_part: start_answer_part,
                start_first_question_part: start_first_question_part,
                has_param_part: has_param_part
            }]
        }

        // console.log('Detail part: ', detail_parts)

        for (let index = 0; index < detail_parts.length; index++) {

            const detail_part = detail_parts[index]
            let start_question_next_part = start_answer;
            let start_answer_next_part = this.element.children.length;
            if (index < detail_parts.length - 1) {
                start_question_next_part = detail_parts[index + 1].start_question_part;
                start_answer_next_part = detail_parts[index + 1].start_answer_part;
            }

            // bat truong hop trong dap an ko chia phan
            if (start_answer_next_part == detail_part.start_answer_part) {
                start_answer_next_part = this.element.children.length;
                console.log("Error at book: " + this.book + ", title: " + this.question_default + ", error start answer parts duplicate, method: " + this._getBuildMethod());
            }

            detail_parts[index].start_question_next_part = start_question_next_part;
            detail_parts[index].start_answer_next_part = start_answer_next_part;
            detail_parts[index].has_part_titles = has_part_titles;
            // console.log("Check::::::::", checkPart, detail_parts[index], start_question_next_part, start_answer_next_part, start_answer, this.element.children.length)
        }

        return detail_parts
    }


    /**
     * Tạo phần trắc nghiệm
     * @param {*} dom_element
     * @param {*} detail_part
     * @param {*} has_part_titles
     * @param {*} has_param
     */
    _createPartNoQuestionMultipleChose(
        dom_element,
        detail_part
    ) {

        if (detail_part.has_part_titles) {
            let check = this._insertTitlePart(dom_element, detail_part.start_question_part, detail_part.start_first_question, detail_part.has_param);
            if (!check) return;
        }

        const questions = this._getAllStartQuestions(detail_part.start_question_part + 1, detail_part.start_question_next_part);
        const question_keys = Object.keys(questions)
        for (let index = 0; index < question_keys.length; index++) {

            if (detail_part.has_part_titles && index > 0) {
                dom_element.appendChild(this._cloneNode(bulkhead));
            }

            const start_question = questions[question_keys[index]].from;
            const start_next_question = questions[question_keys[index]].to;

            let is_h5_tag = true;
            if (detail_part.has_part_titles) {
                is_h5_tag = false;
            }

            const start_answer = this._getStartIndexAnswerOneQuestion(start_question, start_next_question, start_next_question);

            let tmp_start_answer_plan = this._getStartIndexAnswerPlan(start_question + 1, start_answer, start_question);
            let answer = null;

            if (tmp_start_answer_plan > start_question) {

                const start_answer_plan = tmp_start_answer_plan;
                const answer_plans_with_index = this._getAnswerPlans(start_answer_plan, start_answer);

                const answer_plans = answer_plans_with_index.answer_plans;
                const last_index = answer_plans_with_index.last_index + 1;

                this._insertQuestionMultipleChoise(dom_element, start_question, start_answer_plan, is_h5_tag);

                // phuong phap giai??
                if (last_index < start_answer) {
                    for (let i = last_index; i < start_answer; i++) {
                        dom_element.appendChild(this._cloneNodeElement(i));
                    }
                }

                if (answer_plans.length > 0) {
                    const answer_plans_element = this.document.createElement("p");
                    answer = this._getAnswerMultipleChoise(start_answer, start_next_question);
                    const answer_plans_text = this._createAnswerPlanText(answer_plans, answer.key);
                    if(answer.key != null) {
                        answer.key = answer_plans[answer.key-1]
                    } else {
                        console.log("Warning at book: " + this.book + ", title: " + this.question_default + ", question does not has answer ,method: " + this._getBuildMethod());
                    }
                    answer_plans_element.appendChild(this.document.createTextNode(answer_plans_text));
                    dom_element.appendChild(answer_plans_element);
                } else {
                    dom_element.appendChild(this._cloneNode(spec_self_essay));
                }
            } else {
                this._insertQuestionNormal(dom_element, start_question, start_answer, is_h5_tag);
            }
            this._insertAnswerDetail(dom_element, start_answer + 1, start_next_question, answer);
        }
    }

    /**
     * Tạo phần không có câu trắc nghiệm
     * @param {*} dom_element
     * @param {*} detail_part
     */
    _createPartNoQuestion(
        dom_element,
        detail_part
    ) {

        if (detail_part.has_part_titles) {
            let check = this._insertTitlePart(dom_element, detail_part.start_question_part, detail_part.start_first_question, detail_part.has_param);
            if (!check) return;
        }

        const questions = this._getAllStartQuestions(detail_part.start_question_part + 1, detail_part.start_question_next_part);
        const question_keys = Object.keys(questions);

        for (let index = 0; index < question_keys.length; index++) {

            if (detail_part.has_part_titles && index > 0) {
                dom_element.appendChild(this._cloneNode(bulkhead));
            }

            const start_question = questions[question_keys[index]].from;
            const start_next_question = questions[question_keys[index]].to;

            let is_h5_tag = true;
            if (detail_part.has_part_titles) {
                is_h5_tag = false;
            }

            const start_answer = this._getStartIndexAnswerOneQuestion(start_question, start_next_question, start_next_question);
            this._insertQuestionNormal(dom_element, start_question, start_answer, is_h5_tag);
            this._insertAnswerDetail(dom_element, start_answer + 1, start_next_question);
        }
    }

    _checkParts(start_index, end_index, has_multiple_choise) {
        let all_parts = this._getAllPart(start_index, end_index);
        // bat truong hop thieu phan I ma chi co phan II trong de bai
        if (all_parts.length == 1 && all_parts[0] == 1) {
            all_parts = [0, 1]
        }

        // ngan khong cho nhieu hon 3 phan, va khong cho chi co 1 phan ( tuc la trong de bai co loi)
        if ((!has_multiple_choise && all_parts.length > 3) || all_parts.length == 1) {
            console.log("Error at book: " + this.book + ", title: " + this.question_default + ", error part: " + all_parts.length + ", method: " + this._getBuildMethod());
            this._buildDefault();
            return null;
        }

        return all_parts;
    }

    _createDetailPartsNoquestion(all_parts, start_index, has_multiple_choise) {
        let has_part_titles = all_parts.length == 0 ? false : true;
        // bắt trường hợp của sinh học, đề thi có 1 phần nhưng có nhieuf ký tự trong phần regex của phần
        if (has_multiple_choise && all_parts.length > 3) {
            has_part_titles = false;
        }
        let detail_parts = [];
        let error_part = false;

        // co tieu de cua cac phan
        if (has_part_titles) {
            let cur_start = start_index;
            for (let index = 0; index < all_parts.length; index++) {
                const PART = PARTS[all_parts[index]];
                const start_question_part = this._getStartPart(cur_start + 1, this.element.length, PART, 0);
                const start_first_question_part = this._getFirstQuestionPart(start_question_part + 1, start_index, start_question_part + 1);
                const has_param_part = start_question_part + 1 < start_first_question_part ? true : false;
                cur_start = start_question_part;
                detail_parts.push({
                    start_question_part: start_question_part,
                    start_first_question_part: start_first_question_part,
                    has_param_part: has_param_part
                })
            }
        }

        if (detail_parts.length > 1 && detail_parts[0].start_question_part + 2 >= detail_parts[1].start_question_part) error_part = true;

        // khong co tieu de cua cac phan hoac bi loi
        if (!has_part_titles || error_part) {
            const start_question_part = start_index;
            const start_first_question_part = this._getFirstQuestionPart(start_question_part + 1, this.element.children.length, start_question_part + 1);
            const has_param_part = start_question_part + 1 < start_first_question_part ? true : false;
            has_part_titles = false;
            detail_parts = [{
                start_question_part: start_question_part,
                start_first_question_part: start_first_question_part,
                has_param_part: has_param_part
            }]
        }

        for (let index = 0; index < detail_parts.length; index++) {
            let start_question_next_part = this.element.children.length;
            if (index < detail_parts.length - 1) {
                start_question_next_part = detail_parts[index + 1].start_question_part;
            }

            detail_parts[index].start_question_next_part = start_question_next_part;
            detail_parts[index].has_part_titles = has_part_titles;
        }

        return detail_parts
    }

    _createAbstractPartNoQuestion(has_multiple_choise) {
        const result = this.document.createElement("div");

        const all_parts = this._checkParts(0, this.element.children.length, has_multiple_choise);
        if (!all_parts) return;

        const detail_parts = this._createDetailPartsNoquestion(all_parts, -1, has_multiple_choise);

        if (!has_multiple_choise) {
            for (let index = 0; index < detail_parts.length; index++) {
                this._createPartNoQuestion(
                    result,
                    detail_parts[index]
                )
            }
        } else {
            for (let index = 0; index < detail_parts.length; index++) {
                this._createPartNoQuestionMultipleChose(
                    result,
                    detail_parts[index]
                )
            }
        }

        if (result.children.length > 0) this.element = result;
    }

    // ============ Part end =========== //

    // ============ Tabel ============= //

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
            const text_second = td_second.textContent;//textconten undefind

            if (!text_first || !text_second) return false;

            const number_first = text_first.match(/\d+/g);
            const number_second = text_second.match(/\d+/g);

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

        const number = text.match(/\d+/g);
        const character = text.match(/[A-Z]/g);

        if (number && character) return true;

        return false;
    }

    /**
     * Lấy câu trả lời từ bảng
     * @param {*} start_index
     * @param {*} end_index
     */
    _getAnswerTable(start_index, end_index) {
        const all_table = this.element.getElementsByTagName("table");
        if (!all_table) return null;
        if (all_table.length > 1) {
            for (let index = 0; index < all_table.length; index++) {
                const start_tabel = Array.from(this.element.children).indexOf(all_table[index]);
                if (start_tabel < start_index || start_tabel >= end_index) continue;
                let count = 0;
                for (let i = 0; i < KEY_ANSWERS.length; i++) {
                    const KEY_ANSWER = KEY_ANSWERS[i];
                    const regex = new RegExp(KEY_ANSWER + '(?!' + REGEX_ANSWER_AFTER + ')', 'g');
                    if (all_table[index].textContent.search(regex) > -1) {
                        count++;
                    }
                    // do co 1 so truong hop dap an khong du het A, B, C, D nen lay it nhat 2 dap an
                    if (count >= 2) {
                        return all_table[index];
                    }
                }
            }
        } else if (all_table.length == 1) {
            const start_tabel = Array.from(this.element.children).indexOf(all_table[0]);
            if (start_tabel >= start_index && start_tabel < end_index) return all_table[0];
        }
        return null;
    }

    /**
     * Lấy các câu trả lời trong bảng
     * @param {*} start_index
     * @param {*} end_index
     * @param {*} is_one
     */
    _getAnswerMultipleChoises(start_index, end_index, is_one) {
        const table = this._getAnswerTable(start_index, end_index);
        // do da tach nen can bo is_one di
        if (!table && is_one) return this._getNoneTableWithOneQuestion(start_index, end_index);
        if (!table && !is_one) return;

        const tbody = table.querySelector("tbody");

        const cell_start = this._getStartCellAnwserInTable(tbody);
        if (!cell_start) return;

        const name_method = this._getTypeTable(tbody, cell_start);
        return this[name_method](tbody, cell_start);
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
                const number = text.match(/\d+/g);
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
        let array_answers = {};
        for (let y = cell_start.y; y < tbody.children.length; y += 2) {
            const tr_question = tbody.children[y];
            const tr_answer = tbody.children[y + 1];

            for (let x = cell_start.x; x < tr_question.children.length; x++) {
                try {
                    const td_question = tr_question.children[x];
                    const text_question = td_question.textContent;

                    const td_anwser = tr_answer.children[x];
                    const text_second = td_anwser.textContent;

                    const number = text_question.match(/\d+/g);
                    const character = text_second.match(/[A-Z]/g);

                    // do number va charecter o day la array nen can truy cap vao phan tu 0 voi character
                    // su dung mang dap an de bat truong hop co phan co ban va phan nang cao
                    if (number && character) {

                        let answer = character[0];
                        let tmp_answer = INDEXKEYS[answer];
                        if (tmp_answer != undefined) answer = tmp_answer;

                        if (!array_answers[number]) {
                            array_answers[number] = { key: answer, exist_after: 0 };
                        } else {
                            array_answers[number].exist_after++;
                            const number_after = array_answers[number].exist_after;
                            array_answers[number + "_" + number_after] = { key: answer, exist_after: 0 };
                        }
                    }
                } catch (error) {
                    continue;
                }
            }

        }
        return array_answers;
    }

    /**
     * Lấy đáp án theo chiều dọc khác ô
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getVerticalDifferent(tbody, cell_start) {
        let array_answers = {};
        for (let y = cell_start.y; y < tbody.children.length; y++) {
            const tr = tbody.children[y];
            for (let x = cell_start.x; x < tr.children.length; x += 2) {
                try {
                    const td_question = tr.children[x];
                    const text_question = td_question.textContent;

                    const td_anwser = tr.children[x + 1];
                    const text_second = td_anwser.textContent;

                    const number = text_question.match(/\d+/g);
                    const character = text_second.match(/[A-Z]/g);

                    // do number va charecter o day la array nen can truy cap vao phan tu 0 voi character
                    // su dung mang dap an de bat truong hop co phan co ban va phan nang cao
                    if (number && character) {

                        let answer = character[0];
                        let tmp_answer = INDEXKEYS[answer];
                        if (tmp_answer != undefined) answer = tmp_answer;

                        if (!array_answers[number]) {
                            array_answers[number] = { key: answer, exist_after: 0 };
                        } else {
                            array_answers[number].exist_after++;
                            const number_after = array_answers[number].exist_after;
                            array_answers[number + "_" + number_after] = { key: answer, exist_after: 0 };
                        }
                    }
                } catch (error) {
                    continue;
                }
            }

        }
        return array_answers;
    }

    /**
     * Lấy đáp án cùng ô
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getSameCell(tbody, cell_start) {
        let array_answers = {};
        for (let y = cell_start.y; y < tbody.children.length; y++) {
            const tr = tbody.children[y];
            for (let x = cell_start.x; x < tr.children.length; x++) {
                const td = tr.children[x];
                const text = td.textContent;

                if (!text) continue;

                const number = text.match(/\d+/g);
                const character = text.match(/[A-Z]/g);

                // do number va charecter o day la array nen can truy cap vao phan tu 0 voi character
                // su dung mang dap an de bat truong hop co phan co ban va phan nang cao
                if (number && character) {

                    let answer = character[0];
                    let tmp_answer = INDEXKEYS[answer];
                    if (tmp_answer != undefined) answer = tmp_answer;

                    if (!array_answers[number]) {
                        array_answers[number] = { key: answer, exist_after: 0 };
                    } else {
                        array_answers[number].exist_after++;
                        const number_after = array_answers[number].exist_after;
                        array_answers[number + "_" + number_after] = { key: answer, exist_after: 0 };
                    }
                }
            }

        }
        return array_answers;
    }

    /**
     * Lấy đáp án khi không có bảng
     * @param {*} start_index
     * @param {*} end_index
     */
    _getNoneTableWithOneQuestion(start_index, end_index) {
        let answer = this._getAnswerMultipleChoise(start_index, end_index);
        if (!answer.key)
            return {
                '1': { key: "" }
            };
        return {
            '1': {
                key: answer.key,
                index: answer.index,
                position: answer.position
            }
        };
    }

    /**
     * Lấy loại bảng
     * @param {*} tbody
     * @param {*} cell_start
     */
    _getTypeTable(tbody, cell_start) {
        const array_bool = [this._isHorizontal(tbody, cell_start), this._isSameCell(tbody, cell_start)];
        let id_type_table = "";
        for (let index = 0; index < array_bool.length; index++) {
            const number = array_bool[index] ? 1 : 0;
            id_type_table += number;
        }
        // console.log(id_type_table, TYPE_TABLES[id_type_table])
        if (ID_TABLES.includes(id_type_table)) return TYPE_TABLES[id_type_table];
        return '_getHorizontalSame';
    }

    // ========== Table end ========= //

    // ========== Start build =========== //

    /**
     * Lấy phương án tạo
     */
    _getBuildMethod() {
        const is_many_questions = is_complex_part_question ? this._isManyQuestionsComplex() : this._isManyQuestions();
        const is_multiple_choise = is_complex_multiple_choise ? this._hasMultipleChoiseComplex() : this._hasMultipleChoise();
        const array_bool = [is_many_questions, this._notHasQuestion(), is_multiple_choise];
        let id_method = "";
        for (let index = 0; index < array_bool.length; index++) {
            const number = array_bool[index] ? 1 : 0;
            id_method += number;
        }
        // console.log(id_method, METHODS[id_method])
        if (ID_METHODS.includes(id_method)) return METHODS[id_method];
        return '_buildDefault';
    }

    /**
     * Tạo bảng ghi
     * @param {*} is_theory
     * @param {*} is_build_default
     */
    buildDetail(is_theory, is_build_default) {
        try {
            if (is_theory) {
                return;
            } else {
                if (is_build_default) {
                    this._buildDefault();
                } else {
                    const name_method = this._getBuildMethod();
                    this[name_method]();
                }
            }
        } catch (error) {
            this._buildDefault();
            console.log("Error at book: " + this.book + ", title: " + this.question_default + ", method: " + this._getBuildMethod(), error);
            return;
        }
    };

    /**
     * Các câu hỏi 1 câu và có "đề bài"
     * (đã test)
     */
    _buildNormal() {
        const result = this.document.createElement("div");

        const start_question = this._getStartIndexQuestion();

        const start_answer = this._getStartIndexAnswer();

        this._insertQuestionNormal(result, start_question + 1, start_answer, true);

        if (start_answer + 1 < this.element.children.length) {
            this._insertAnswerDetail(result, start_answer + 1, this.element.children.length)
        }

        this.element = result;
    }

    /**
     * Các câu hỏi 1 câu trắc nghiệm và có "đề bài"
     * (đã test)
     */
    _buildMultipleChoise() {
        const result = this.document.createElement("div");

        const start_question = this._getStartIndexQuestion();

        const start_answer = this._getStartIndexAnswer();

        const start_answer_plan = this._getStartIndexAnswerPlan(start_question + 1, this.element.children.length, this.element.children.length);

        // if (start_answer_plan == start_question + 1) {
        //     this._buildDefault();
        //     return;
        // }

        const answer_plans_with_index = this._getAnswerPlans(start_answer_plan, start_answer);
        const answer_plans = answer_plans_with_index.answer_plans;
        const last_index = answer_plans_with_index.last_index + 1;

        // console.log(start_question, start_answer_plan)
        this._insertQuestionMultipleChoise(result, start_question + 1, start_answer_plan, true)

        // phuong phap giai??
        if (last_index < start_answer) {
            for (let index = last_index; index < start_answer; index++) {
                result.appendChild(this._cloneNodeElement(index));
            }
        }

        const answer_plans_element = this.document.createElement("p");
        let answer = null;
        if (answer_plans.length > 0) {
            answer = this._getAnswerMultipleChoise(start_answer, this.element.children.length);
            const answer_plans_text = this._createAnswerPlanText(answer_plans, answer.key);
            // Đổi đáp án đúng thành chi tiêt (ví dụ chọn đáp án A thành chọn đáp án "mô tả chi tiết của đáp án")
            if(answer.key != null) {
                answer.key = answer_plans[answer.key-1];
            } else {
                console.log("Warning at book: " + this.book + ", title: " + this.question_default + ", question does not has answer ,method: " + this._getBuildMethod());
            }
            answer_plans_element.appendChild(this.document.createTextNode(answer_plans_text));
            result.appendChild(answer_plans_element);
        } else {
            this._buildDefault();
            return;
        }

        this._insertAnswerDetail(result, start_answer + 1, this.element.children.length, answer)

        this.element = result;
    }

    /**
     * Các câu hỏi 1 câu và không có "đề bài"
     * (đã test)
     */
    _buildNoQuestion() {
        let result = this.document.createElement("div");

        let start_answer = this._getStartIndexAnswer();
        if (start_answer == this.element.children.length - 1) start_answer = -1;

        if (start_answer > 0 && !is_complex_part_question) {
            this._insertQuestionNormal(result, 0, start_answer, true)
        } else {
            start_answer = -1;
            const question_element = this.document.createElement("h5");
            question_element.appendChild(this.document.createTextNode(this.question_default));
            result.appendChild(question_element);
            for (let index = 0; index < start_answer; index++) {
                result.appendChild(this._cloneNodeElement(index));
            }
            result.appendChild(this._cloneNode(spec_self_essay));
        }

        this._insertAnswerDetail(result, start_answer + 1, this.element.children.length)

        this.element = result;
    }

    /**
     * Các câu hỏi 1 câu trắc nghiệm và không có "đề bài"
     * (đã test)
     */
    _buildNoQuestionMultipleChoise() {
        this._buildMultipleChoise();
    }

    /**
     * Các câu hỏi nhiều câu và có "đề bài"
     * (đã test đề thi)
     */
    _buildNormals() {
        this._createAbstractPart(false);
    }

    _buildMultipleChoises() {
        this._createAbstractPart(true);
    }


    _buildNoQuestions() {
        // bien phap tam thoi
        // bat truong hop cua sach 'van' 'phan co nhieu phan'
        if (is_complex_part_question) {
            this._buildNoQuestion();
        } else {
            const start_answer = this._getStartIndexAnswerBySelector();
            let check = false;
            if (start_answer == -1) {
                check = this._checkMultipleSlaveAnswer(0, this.element.children.length);
            }
            if (start_answer == -1 && check) {
                this._createAbstractPartNoQuestion(false);
            } else {
                this._buildNormals();
            }
        }
    }

    _buildNoQuestionMultipleChoises() {
        // can check co nhieu dau hieu tra loi hay ko, check -1 laa chua du
        const start_answer = this._getStartIndexAnswerBySelector();
        let check = false;
        if (start_answer == -1) {
            check = this._checkMultipleSlaveAnswer(0, this.element.children.length);
        }
        if (start_answer == -1 && check) {
            this._createAbstractPartNoQuestion(true);
        } else {
            this._buildMultipleChoises();
        }
    }

    _buildDefault() {

        let answerDetail = this.element.querySelector("p .content_detail");
        if (answerDetail) {
            let answerDetailParent = answerDetail.parentNode;
            answerDetailParent.before(this._cloneNode(spec_self_essay));
            answerDetailParent.before(this._cloneNode(explain));
        }

    }

    // ======= Build End ======= //

}

module.exports = DetailSection;
