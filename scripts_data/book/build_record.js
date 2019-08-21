
const REGEX_ANSWER_AFTER = '[A-Za-z\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
// const REGEX_ANSWER_BEFORE_PLANS = '[A-Za-z0-9\\.\\s\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
const REGEX_PART = '[A-Za-z\’\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'
const DEFAULT_SLAVE_ANSWER_LABELS = ["lời giải", "giải", "giải", "gợi ý", "làm bài", "trả lời", "đáp án", "bài làm", "gợi ý làm bài", "gợi ý trả lời"];
// hien tai chi lay cac dap dan tu A-D (E-Z chua co)
const DEFAULT_REGEX_ANSER = /(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])((\([A-D]\)[\.\:]{0,1})|([A-D][\.\:]))(?=.{1})/g
// \u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC
const DEFAULT_REGEX_ANSER_IN_SENCTENCE = /(?<![+*\/-].{1})(?<![+*\/-].{2})(?<![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])((\([A-D]\)[\.\:]{0,1})|([A-D][\.\:])|[A-D](?![A-Za-z0-9\.\’\′\'\{\}\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]))/g
const DEFAULT_REGEX_NUMBER = /\d+/g;
const DEFAULT_REGEX_ALPHABET = /[A-Z]/g;
const DEFAULT_REGEX_INLINE_TAG = /<code>|<em>|<i>|<q>|<sub>|<sup>|<u>/;

const DEFAULT_REPLACEAS = [
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

const DEFAULT_QUESTION_LABELS = ["Câu", "Bài", "Ý"];
const DEFAULT_REMOVE_SELECTORS = ["img#method_colapse_icon", "a"]
const DEFAULT_REMOVE_STRINGS = ["Xem thêm: $&$Tuyensinh247.com", "Click vào Bài tiếp theo"]
const DEFAULT_LIST_ANSWER_LEVELS = [["Chọn", "chọn", "Câu"], ["Đúng", "đúng", "Đáp án", "đáp án"]]
const DEFAULT_START_ANSWER_SELECTOR = "p .content_detail";
const DEFAULT_START_QUESTION_SELECTOR = "p .content_question";

// nhiều câu hay 1 | không có đề hay có | trắc nghiệm (tự luận chắc chắn có)
const DEFAULT_METHODS = {
    "000": "_buildNormal",
    "001": "_buildMultipleChoise",
    "010": "_buildNoQuestion",
    "011": "_buildNoQuestionMultipleChoise",
    "100": "_buildNormals",
    "101": "_buildMultipleChoises",
    "110": "_buildNoQuestions",
    "111": "_buildNoQuestionMultipleChoises"
}

class BuildRecord {

    constructor(document, logger) {

        this.document = document;
        this.logger = logger;

        let text_node = this.document.createTextNode("{{}}(10)");
        this.spec_self_essay = this.document.createElement('p')
        this.spec_self_essay.appendChild(text_node);

        text_node = this.document.createTextNode("<explain>");
        this.explain = this.document.createElement('p');
        this.explain.appendChild(text_node);

        text_node = this.document.createTextNode('===');
        this.bulkhead = this.document.createElement('div');
        this.bulkhead.appendChild(text_node);
        this.bulkhead.className = 'subTitle'

    }

    init(string_inner_html, question_default, book) {
        this.element = this.document.createElement("div");
        this.element.innerHTML = this._cleanRedundantString(this.getReplaces(), string_inner_html)
        this._cleanRedundantNode();
        this.string_inner_html = this.element.outerHTML;
        this.question_default = question_default;
        this.book = book;

        this.id_methods = this.getIdMethods();
    }

    /**
     * Xóa hoặc thay thế các từ không cần thiết
     * @param {[{from: Number, to: Number}]} replaces
     * @param {String} inputString
     */
    _cleanRedundantString(replaces, inputString) {
        for (let index = 0; index < replaces.length; index++) {
            inputString = inputString.replace(replaces[index].from, replaces[index].to)
        }
        return inputString;
    }

    /**
    * Xóa các node không cần thiết
    */
    _cleanRedundantNode() {
        this._removeBySelectors(this.element, this.getRemoveSelectors());
        this._shiftDivElement(this.element);
        this._shiftBrElement(this.element, this.document);
        this._cleanString(this.element, this.getRemoveStrings());
    }

    _removeBySelectors(element, selectors) {
        for (let index = 0; index < selectors.length; index++) {
            const selector = selectors[index];
            let selectedElement = element.querySelector(selector);
            if (selectedElement) selectedElement.remove();
        }
    }

    /**
     * Loại bỏ các thẻ div để đẩy các thẻ p lên ngang hàng
     * @param {HTMLElement} element
     */
    _shiftDivElement(element) {
        while (true) {
            let has_div = false;
            for (let index = element.children.length - 1; index >= 0; index--) {
                let child = element.children[index];
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
     * @param {HTMLElement} element
     * @param {Document} document
     */
    _shiftBrElement(element, document) {
        for (let index = element.children.length - 1; index >= 0; index--) {
            let child = element.children[index];
            let name_child = child.nodeName;
            if (name_child != 'P' || child.children == null) continue;
            // do <strong>sadas</strong><br>
            let strong_node = child.querySelector('strong');
            if (!strong_node) continue;
            let ref_node = child;
            let array_element = []
            let p_element = document.createElement('p');
            for (let i = 0; i < child.childNodes.length; i++) {
                let node_child = child.childNodes[i];
                if (node_child.nodeName == 'BR' && i > 0) {
                    array_element.push(p_element.cloneNode(true));
                    p_element = document.createElement('p');
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

    /**
     * Xoa cac tu khong can thiet
     * @param {HTMLElement} element
     * @param {Array<string>} selectors
     */
    _cleanString(element, selectors) {
        for (let index = element.children.length - 1; index >= 0; index--) {
            let child = element.children[index];
            let name_child = child.nodeName;
            if (name_child != 'P' || child.children == null) continue;
            let text = child.textContent;
            if (!text) continue;
            for (let i = 0; i < selectors.length; i++) {
                const selector = selectors[i];
                let subSelectors = selector.split("$&$")
                let check = true;
                for (let j = 0; j < subSelectors.length; j++) {
                    const subSelector = subSelectors[j];
                    if (!text.includes(subSelector)) {
                        check = false;
                        break;
                    }
                }
                if (check) {
                    child.remove();
                    break;
                }
            }
        }
    }

    setMethods(methods) {
        this.methods = methods;
    }

    getMethods() {
        if (!this.methods) {
            console.log("methods is null so set to DEFAULT_METHODS")
            this.setMethods(DEFAULT_METHODS)
        }
        return this.methods
    }

    getIdMethods() {
        return Object.keys(this.getMethods());
    }

    setElement(element) {
        this.element = element;
    }

    getElement() {
        return this.element;
    }

    setRemoveSelectors(remove_selectors) {
        this.remove_selectors = remove_selectors;
    }

    getRemoveSelectors() {
        if (!this.remove_selectors) {
            console.log("remove_selectors is null so set to DEFAULT_REMOVE_SELECTORS")
            this.setRemoveSelectors(DEFAULT_REMOVE_SELECTORS)
        }
        return this.remove_selectors;
    }

    setStartAnswerSelector(start_answer_selector, use_default) {
        if (use_default) {
            this.start_answer_selector = DEFAULT_START_ANSWER_SELECTOR;
        } else {
            this.start_answer_selector = start_answer_selector;
        }
    }

    getStartAnswerSelector(use_default) {
        if (use_default) {
            console.log("using DEFAULT_START_ANSWER_SELECTOR  for start_answer_selector")
            this.setStartAnswerSelector(DEFAULT_START_ANSWER_SELECTOR)
        }
        return this.start_answer_selector;
    }

    setStartQuestionSelector(start_question_selector, use_default) {
        if (use_default) {
            this.start_question_selector = DEFAULT_START_QUESTION_SELECTOR;
        } else {
            this.start_question_selector = start_question_selector;
        }
    }

    getStartQuestionSelector(use_default) {
        if (use_default) {
            console.log("using DEFAULT_START_QUESTION_SELECTOR  for start_question_selector")
            this.setStartQuestionSelector(DEFAULT_START_QUESTION_SELECTOR)
        }
        return this.start_question_selector;
    }

    setRemoveStrings(remove_strings) {
        this.remove_strings = remove_strings;
    }

    getRemoveStrings() {
        if (!this.remove_strings) {
            console.log("remove_strings is null so set to DEFAULT_REMOVE_STRINGS")
            this.setRemoveStrings(DEFAULT_REMOVE_STRINGS)
        }
        return this.remove_strings;
    }

    setReplaces(replaces, is_concat) {
        if (is_concat) {
            this.replaces = DEFAULT_REPLACEAS.concat(replaces);
        } else {
            this.replaces = replaces;
        }
    }

    getReplaces() {
        if (!this.replaces) {
            console.log("replaces is null so set to DEFAULT_REPLACES")
            this.setReplaces(DEFAULT_REPLACES)
        }
        return this.replaces;
    }

    setQuestionLabels(question_labels, is_concat) {
        if (is_concat) {
            this.question_labels = DEFAULT_QUESTION_LABELS.concat(question_labels);
        } else {
            this.question_labels = question_labels;
        }
    }

    getQuestionLabels() {
        if (!this.question_labels) {
            console.log("question_labels is null so set to DEFAULT_QUESTION_LABELS")
            this.setQuestionLabels(DEFAULT_QUESTION_LABELS)
        }
        return this.question_labels;
    }

    setListAnswerLevels(list_answer_levels, is_concat) {
        if (is_concat) {
            this.list_answer_levels = DEFAULT_LIST_ANSWER_LEVELS.concat(list_answer_levels);
        } else {
            this.list_answer_levels = list_answer_levels;
        }
    }

    getListAnswerLevels() {
        if (!this.list_answer_levels) {
            console.log("list_answer_levels is null so set to DEFAULT_LIST_ANSWER_LEVELS")
            this.setListAnswerLevels(DEFAULT_LIST_ANSWER_LEVELS)
        }
        return this.list_answer_levels;
    }

    setRegexInlineTag(regex_inline_tag) {
        this.regex_inline_tag = regex_inline_tag;
    }

    getRegexInlineTag() {
        if (!this.regex_inline_tag) {
            console.log("regex_inline_tag is null so set to DEFAULT_REGEX_INLINE_TAG")
            this.setRegexInlineTag(DEFAULT_REGEX_INLINE_TAG)
        }
        return this.regex_inline_tag;
    }

    setRegexNumber(regex_number) {
        this.regex_number = regex_number;
    }

    getRegexNumber() {
        if (!this.regex_number) {
            console.log("regex_number is null so set to DEFAULT_REGEX_NUMBER")
            this.setRegexNumber(DEFAULT_REGEX_NUMBER)
        }
        return this.regex_number;
    }

    setRegexAlphabet(regex_alphabet) {
        this.regex_alphabet = regex_alphabet;
    }

    getRegexAlphabet() {
        if (!this.regex_alphabet) {
            console.log("regex_alphabet is null so set to DEFAULT_REGEX_ALPHABET")
            this.setRegexAlphabet(DEFAULT_REGEX_ALPHABET)
        }
        return this.regex_alphabet;
    }

    setRegexAnswer(regex_answer) {
        this.regex_answer = regex_answer;
    }

    getRegexAnswer() {
        if (!this.regex_answer) {
            console.log("regex_answer is null so set to DEFAULT_REGEX_ANSER")
            this.setRegexAnswer(DEFAULT_REGEX_ANSER);
        }
        return this.regex_answer;
    }

    setSlaveAnswerLabels(slave_answer_labels, is_concat) {
        if (is_concat) {
            this.slave_answer_labels = DEFAULT_SLAVE_ANSWER_LABELS.concat(slave_answer_labels);
        } else {
            this.slave_answer_labels = slave_answer_labels;
        }
    }

    getSlaveAnswerLabels() {
        if (!this.slave_answer_labels) {
            console.log("slave_answer_labels is null so set to DEFAULT_SLAVE_ANSWER_LABELS")
            this.getSlaveAnswerLabels(DEFAULT_SLAVE_ANSWER_LABELS);
        }
        return this.slave_answer_labels;
    }

    setRegexAnswerInSentence(regex_answer_in_senctence) {
        this.regex_answer_in_senctence = regex_answer_in_senctence;
    }

    getRegexAnswerInSentence() {
        if (!this.regex_answer_in_senctence) {
            console.log("regex_answer_in_senctence is null so set to DEFAULT_REGEX_ANSER_IN_SENCTENCE")
            this.setRegexAnswerInSentence(DEFAULT_REGEX_ANSER_IN_SENCTENCE)
        }
        return this.regex_answer_in_senctence;
    }

    /**
     * Clone node ở vị trí cho trước
     * @param {HTMLElement} element
     * @param {*} position: vị trí của node được clone trong element gốc
     */
    _cloneNodeElement(element, position) {
        return element.children[position].cloneNode(true);
    }

    /**
     * Chuyển đáp án A, B, C, D, .. về số 1, 2, 3, ...
     * @param {*} plan
     */
    _convertPlanToNumber(plan) {
        if (plan.length > 1) {
            let valid_plan = plan.match(REGEX_CHARECTER);
            plan = valid_plan[0]
        }
        return plan.charCodeAt(0) - 64;
    }

    /**
    * Tạo các phương án trả lời trắc nghiệm
    * @param {*} answer_plans
    * @param {*} answer
    */
    _createAnswerPlanText(answer_plans, answer) {
        let answer_plans_text = "";
        for (let index = 0; index < answer_plans.length; index++) {
            if (index == 0) {
                answer_plans_text = "{{" + answer_plans[index];
                if (answer_plans.length == 1) answer_plans_text += "}}";
            } else if (index == answer_plans.length - 1) answer_plans_text += "/" + answer_plans[index] + "}}"
            else answer_plans_text += "/" + answer_plans[index];
        }
        answer_plans_text += "(" + answer + ")";
        return answer_plans_text;
    }

    _getInnerTextWithInlineTag(node, is_plan_text) {
        let innerHtml = node.innerHTML;
        if (innerHtml.search(this.getRegexInlineTag()) < 0) return node.textContent;
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
                if (innerHtml != undefined && innerHtml.search(this.getRegexInlineTag()) > -1) {
                    text += this._getInnerTextWithSubInlineTag(child_node, "", is_plan_text)
                } else {
                    text += child_node.textContent;
                }
            }

        }
        return text;
    }

    /**
     * Lấy vị trí theo selector
     * @param {*} element
     * @param {*} selector: jquery selector
     * @param {*} default_value: giá trị mặc định
     */
    _getIndexQnABySelector(element, selector, default_value) {
        if (!selector) return default_value;
        const node = element.querySelector(selector);
        if (!node) return default_value;
        const parent_node = node.parentNode;
        let start_index = Array.from(element.children).indexOf(parent_node);
        if (start_index == null || start_index < 0 || start_index > element.children.length) {
            start_index = default_value + 1;
        }
        return start_index;
    }

    /**
     * Vị trí của phần chữ 'đề bài'
     */
    _getStartIndexQuestion(element, selector) {
        return this._getIndexQnABySelector(element, selector, -1);
    }

    /**
     * Vị trí của phần bắt đầu trả lời
     */
    _getStartIndexAnswer(element, slave_answer_labels, selector) {
        let fist_find = -1;
        if (selector) {
            fist_find = this._getIndexQnABySelector(element, selector, - 1);
        }
        // nếu không tìm thấy, sẽ xét các trường hợp phụ
        if (fist_find == -1) {
            for (let index = 0; index < element.children.length; index++) {
                let text = element.children[index].textContent;
                if (text == null || text == undefined) continue;
                text = text.trim().toLowerCase();
                // do 'giai' thuoc 2 uni-code khac nhau nen can co 2 regex
                if (this._checkSlaveAnswer(text, slave_answer_labels)) {
                    fist_find = index;
                    break;
                }
            }
        }
        // trong trường hợp đã xét các trường hợp phụ mà vẫn chưa tìm thấy thì trả về vị trí cuối cùng
        if (fist_find == -1) return element.children.length - 1;
        return fist_find;
    }

    /**
     * @param {*} text
     * @param {*} slave_answer_labels
     */
    _checkSlaveAnswer(text, slave_answer_labels) {
        for (let index = 0; index < slave_answer_labels.length; index++) {
            const slave_answer_label = slave_answer_labels[index];
            const regex = new RegExp(slave_answer_label, 'g')
            if (text.search(regex) == 0) return true;
        }
        return false;
    }

    /**
     * Lấy phương án đúng của câu trắc nghiệm mà không có bảng đáp án
     * đầu tiên sẽ tìm kiếm sự xuất hiện của các từ 'chọn, đúng' trong câu
     * nếu sau lần thứ nhất không tìm thấy sẽ tìm kiếm lần thứ 2 mà không có các từ đó
     * @param {*} element
     * @param {*} start_index: vị trí bắt đầu
     * @param {*} end_index: vị trí kết thúc + 1
     */
    _getAnswerMultipleChoise(element, start_index, end_index, list_answer_levels, regex_answer_in_senctence) {
        // dung count de tim dap an theo che do uu tien
        let count = 0;
        while (count < list_answer_levels.length) {
            for (let index = start_index; index < end_index; index++) {
                let text = element.children[index].textContent;

                if (text == null || text == undefined) continue;

                let checkContinue = true;
                const list_answer_level = list_answer_levels[count];
                for (let j = 0; j < list_answer_level.length; j++) {
                    const answer_level = list_answer_level[j];
                    if (text.includes(answer_level)) {
                        checkContinue = false;
                        break;
                    }
                }
                if (checkContinue) continue;

                const answers = text.match(regex_answer_in_senctence);

                if (answers == null || answers.length > 1) continue;

                return {
                    key: this._convertPlanToNumber(answers[0]),
                    index: index,
                    position: regex_answer_in_senctence.exec(text).index,
                    key_root: answers[0]
                }

            }
            count++;
        }

        return {
            key: ""
        };
    }

    /**
     * Lấy vị trí của phần bắt đầu các phương án trắc nghiệm
     * @param {*} element
     * @param {*} start_index: vị trí bắt đầu tìm kiếm
     * @param {*} end_index: vị trí kết thúc tìm kiếm + 1
     * @param {*} default_value: giá trị mặc định
     */
    _getStartIndexAnswerPlan(element, start_index, end_index, default_value, regex_answer) {
        for (let index = start_index; index < end_index; index++) {
            let text_question = element.children[index].textContent;
            if (text_question == null || text_question == undefined) continue;
            text_question = text_question.trim();
            const index_find = text_question.search(regex_answer);
            // gioi han khong cho vi tri xuat hien 'A.' qua 10
            if (index_find <= -1 || index_find >= 10) continue;
            return index;
        }
        return default_value;
    }

    // can phat trien them
    /**
     * Lấy các phương án trả lời của phần trắc nghiệm
     * @param {*} element
     * @param {*} start_index: vị trí bắt đầu
     * @param {*} end_index: vị trí kết thúc + 1
     */
    _getAnswerPlans(element, start_index, end_index, regex_answer) {
        const tmp_answer_plans = [];
        let last_index = end_index;
        for (let index = start_index; index < end_index; index++) {
            let text = this._getInnerTextWithInlineTag(element.children[index], true)
            if (text == null || text == undefined) continue;
            text = text.trim();

            // loai bo math
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
            // se bi sai trong truong hop $$A.$$asdsadsa
            const keys_answers = tmp_text.match(regex_answer);
            if (keys_answers == null || keys_answers.length == 0) continue;
            last_index = index;

            const positions = [];
            for (let i = 0; i < keys_answers.length; i++) {
                let position = tmp_text.indexOf(keys_answers[i]);
                positions.push({ key: keys_answers[i], position: position });
            }

            positions.sort((slot1, slot2) => {
                return slot1.position > slot2.position;
            })

            // can convert cac truong hop dac biet ve form cua hoclieu
            for (let i = tmp_text.length - 1; i >= 0; i--) {
                let character = tmp_text[i]
                if (character == "{" || character == "}" || (character == "\/" && i > 0 && tmp_text[i - 1] != "\\") || (character == "/" && i == 0)) {
                    text = text.substring(0, i) + '\\' + text.substring(i);
                }
            }

            for (let i = 0; i < positions.length; i++) {
                let from = positions[i].position;
                if (i == 0) from = 0;

                let to = text.length;
                if (i < positions.length - 1) {
                    to = positions[i + 1].position;
                }
                let answer = text.substring(from, to).trim();
                if (answer.startsWith(positions[i].key)) answer = answer.replace(positions[i].key, '').trim()
                tmp_answer_plans.push({ key: positions[i].key, answer: answer });
            }
        }

        tmp_answer_plans.sort((slot1, slot2) => {
            const key_slot1 = slot1.key.match(this.getRegexAlphabet())[0]
            const key_slot2 = slot2.key.match(this.getRegexAlphabet())[0]
            return key_slot1 > key_slot2;
        })

        const answer_plans = [];
        for (let index = 0; index < tmp_answer_plans.length; index++) {
            answer_plans.push(tmp_answer_plans[index].answer);
        }

        const answer_plans_with_index = {
            answer_plans: answer_plans,
            last_index: last_index
        }

        return answer_plans_with_index;
    }

    /**
     * Tạo câu hỏi
     * @param {*} result_element
     * @param {*} start_index
     * @param {*} end_index
     */
    _insertQuestionNormal(element, result_element, start_index, end_index, is_h5_tag) {
        if (is_h5_tag) {
            let remember_spec = [];
            let has_first_line = false;
            let index_solution_method = end_index;
            for (let i = start_index; i < end_index; i++) {

                let child = this._cloneNodeElement(element, i);
                if (child.nodeName == 'IMG' || child.nodeName == 'TABLE' || child.querySelector('img')) {
                    remember_spec.push(child);
                    continue;
                }

                let text = child.textContent;
                if (!text) continue;
                text = this._getInnerTextWithInlineTag(child);

                if (!has_first_line) {
                    let text_node = this.document.createTextNode(text);
                    let question_h5_element = this.document.createElement('h5');
                    question_h5_element.appendChild(text_node);
                    result_element.appendChild(question_h5_element);
                    has_first_line = true;
                    continue;
                }

                let is_solution_method = text.toLowerCase().includes('phương pháp giải');
                if (!is_solution_method) {
                    result_element.appendChild(child);
                } else {
                    index_solution_method = i;
                    break;
                }
            };
            for (let i = 0; i < remember_spec.length; i++) {
                result_element.appendChild(remember_spec[i]);
            };
            // khong them neu chi co 'phương pháp giải' ma khong co phan dang sau
            if (index_solution_method < end_index - 2) {
                for (let i = index_solution_method; i < end_index; i++) {
                    result_element.appendChild(this._cloneNodeElement(element, i));
                };
            }
        } else {
            for (let i = start_index; i < end_index; i++) {
                result_element.appendChild(this._cloneNodeElement(element, i));
            };
        }
        result_element.appendChild(this.spec_self_essay.cloneNode(true));
    }

    /**
     * Tạo câu hỏi
     * @param {*} start_index
     * @param {*} end_index
     */
    _insertQuestionMultipleChoise(element, result_element, start_index, end_index, is_h5_tag) {
        if (is_h5_tag) {
            let remember_spec = [];
            let has_first_line = false;
            // let index_solution_method = end_index;
            for (let i = start_index; i < end_index; i++) {

                let child = this._cloneNodeElement(element, i);
                if (child.nodeName == 'IMG' || child.nodeName == 'TABLE' || child.querySelector('img')) {
                    remember_spec.push(child);
                    continue;
                }

                let text = child.textContent;
                if (!text) continue;
                text = this._getInnerTextWithInlineTag(child);

                if (!has_first_line) {
                    let text_node = this.document.createTextNode(text);
                    let question_h5_element = this.document.createElement('h5');
                    question_h5_element.appendChild(text_node);
                    result_element.appendChild(question_h5_element);
                    has_first_line = true;
                    continue;
                }

                result_element.appendChild(child);
            };
            for (let i = 0; i < remember_spec.length; i++) {
                result_element.appendChild(remember_spec[i]);
            };
        } else {
            for (let i = start_index; i < end_index; i++) {
                result_element.appendChild(this._cloneNodeElement(element, i));
            };
        }
    }

    /**
     * Taọ phần trả lời chi tiêt
     * @param {*} result_element
     * @param {*} start_answer
     * @param {*} start_next_answer
     */
    _insertAnswerDetail(element, result_element, start_answer, start_next_answer, switch_key_to_answer, list_answer_levels, regex_answer_in_senctenc) {
        result_element.appendChild(this.explain.cloneNode(true));
        let tmp_switch_key_to_answer = null;
        if (switch_key_to_answer && switch_key_to_answer.position == null)
            tmp_switch_key_to_answer = this._getAnswerMultipleChoise(element, start_answer, start_next_answer, list_answer_levels, regex_answer_in_senctenc);
        let answer_node = null;
        if (switch_key_to_answer && switch_key_to_answer.key != null) {
            if (tmp_switch_key_to_answer != null) {
                switch_key_to_answer.position = tmp_switch_key_to_answer.position;
                switch_key_to_answer.index = tmp_switch_key_to_answer.index;
                switch_key_to_answer.key_root = tmp_switch_key_to_answer.key_root;
            }
            if (switch_key_to_answer.index != null) {
                let text = this._getInnerTextWithInlineTag(element.children[switch_key_to_answer.index]);
                // bat truong hop Chon A. va truong hop Chon A <dap an dung>
                // console.log(switch_key_to_answer.key, switch_key_to_answer.key.length, text.length, switch_key_to_answer.position)
                if (switch_key_to_answer.key.length > text.length - switch_key_to_answer.position) {
                    text = text.substring(0, switch_key_to_answer.position) + switch_key_to_answer.key + text.substring(switch_key_to_answer.position + switch_key_to_answer.key_root.length);
                } else {
                    text = text.substring(0, switch_key_to_answer.position) + switch_key_to_answer.key
                }
                answer_node = this.document.createElement("p");
                let text_node = this.document.createTextNode(text);
                answer_node.appendChild(text_node);
            }
        }
        for (let index = start_answer; index < start_next_answer; index++) {
            if (answer_node && index == switch_key_to_answer.index) {
                result_element.appendChild(answer_node);
            } else {
                result_element.appendChild(this._cloneNodeElement(element, index));
            }
        }
    }

    getBuildMethod() {
        throw new Error("You have to implement the method getBuildMethod!")
    }

    buildDetail(is_theory, is_build_default) {
        if (!this.string_inner_html) {
            throw new Error(" You have to run init function!")
        }
        if(is_theory){
            return;
        }
        if (is_build_default) {
            this._buildDefault();
        }
        try {
            const name_method = this.getBuildMethod();
            // console.log(name_method)
            this[name_method]();
        } catch (error) {
            this._buildDefault();
            let log = "Error at book: " + this.book + ", title: " + this.question_default + ", method: " + this.getBuildMethod()
            console.log(log, error);
            this.logger.error(log, error);
            return;
        }
    };

    _buildDefault() {

        if (!this.getStartAnswerSelector()) return;
        let answerDetail = this.element.querySelector(this.getStartAnswerSelector());
        if (answerDetail) {
            let answerDetailParent = answerDetail.parentNode;
            answerDetailParent.before(this.spec_self_essay.cloneNode(true));
            answerDetailParent.before(this.explain.cloneNode(true));
        }

    }

    _buildNormal() {
        const result = this.document.createElement("div");

        const start_question = this._getStartIndexQuestion(this.element, this.getStartQuestionSelector());

        const start_answer = this._getStartIndexAnswer(this.element, this.getSlaveAnswerLabels(), this.getStartAnswerSelector());

        this._insertQuestionNormal(this.element, result, start_question + 1, start_answer, true);

        if (start_answer + 1 < this.element.children.length) {
            this._insertAnswerDetail(this.element, result, start_answer + 1, this.element.children.length)
        }

        this.setElement(result);
    }

    _buildMultipleChoise() {
        const result = this.document.createElement("div");

        const start_question = this._getStartIndexQuestion(this.element, this.getStartQuestionSelector());

        const start_answer = this._getStartIndexAnswer(this.element, this.getSlaveAnswerLabels(), this.getStartAnswerSelector());

        const start_answer_plan = this._getStartIndexAnswerPlan(this.element, start_question + 1, this.element.children.length, this.element.children.length, this.getRegexAnswer());

        const answer_plans_with_index = this._getAnswerPlans(this.element, start_answer_plan, start_answer, this.getRegexAnswer());
        const answer_plans = answer_plans_with_index.answer_plans;
        const last_index = answer_plans_with_index.last_index + 1;
        this._insertQuestionMultipleChoise(this.element, result, start_question + 1, start_answer_plan, true)

        // phuong phap giai??
        if (last_index < start_answer - 2) {
            for (let index = last_index; index < start_answer; index++) {
                result.appendChild(this._cloneNodeElement(this.element, index));
            }
        }

        const answer_plans_element = this.document.createElement("p");
        let answer = null;
        if (answer_plans.length > 0) {
            answer = this._getAnswerMultipleChoise(this.element, start_answer, this.element.children.length, this.getListAnswerLevels(), this.getRegexAnswerInSentence());
            const answer_plans_text = this._createAnswerPlanText(answer_plans, answer.key);
            // Đổi đáp án đúng thành chi tiêt (ví dụ chọn đáp án A thành chọn đáp án "mô tả chi tiết của đáp án")
            if (answer.key != null) {
                answer.key = answer_plans[answer.key - 1];
            } else {
                let log = "Warning at book: " + this.book + ", title: " + this.question_default + ", question does not has answer ,method: " + this.getBuildMethod()
                console.log(log);
                this.logger.warn(log);
            }
            answer_plans_element.appendChild(this.document.createTextNode(answer_plans_text));
            result.appendChild(answer_plans_element);
        } else {
            this._buildDefault();
            return;
        }
        this._insertAnswerDetail(this.element, result, start_answer + 1, this.element.children.length, answer, this.getListAnswerLevels(), this.getRegexAnswerInSentence())

        this.setElement(result);
    }

    _buildNoQuestion() {
        let result = this.document.createElement("div");

        let start_answer = this._getStartIndexAnswer(this.element, this.getSlaveAnswerLabels(), this.getStartAnswerSelector());

        if (start_answer == this.element.children.length - 1) start_answer = -1;

        // let is_complex_part_question = false
        if (start_answer > 0 && !is_complex_part_question) {
            this._insertQuestionNormal(this.element, result, 0, start_answer, true);
        } else {
            start_answer = -1;
            const question_element = this.document.createElement("h5");
            question_element.appendChild(this.document.createTextNode(this.question_default));
            result.appendChild(question_element);
            for (let index = 0; index < start_answer; index++) {
                result.appendChild(this._cloneNodeElement(this.element, index));
            }
            result.appendChild(this.spec_self_essay.cloneNode(true));
        }

        this._insertAnswerDetail(this.element, result, start_answer + 1, this.element.children.length)

        this.setElement(result);
    }

    _buildNoQuestionMultipleChoise() {
        this._buildMultipleChoise();
    }

    /**
     * Lấy các phần trong bài
     * @param {*} start_index: vị trí bắt đầu
     * @param {*} end_index: vị trí kết thúc + 1
     */
    _getAllPart(element, start_index, end_index, list_parts, regex_part_string) {
        let all_parts = [];
        for (let index = start_index; index < end_index; index++) {
            const node_element = element.children[index];
            const node_name = node_element.nodeName;
            // tranh lay text trong table
            if (node_name == 'TABLE' || node_name == 'IMG') continue;
            let text = node_element.textContent;
            if (text == null || text == undefined) continue;
            text = text.trim();
            for (let i = 0; i < list_parts.length; i++) {
                const parts = list_parts[i];
                let check = false;
                for (let j = 0; j < parts.length; j++) {
                    const part = parts[j];
                    const regex = new RegExp('(?<!' + regex_part_string + ')' + part + '(?!' + regex_part_string + ')', 'g')
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


    _checkParts(element, start_index, end_index, has_multiple_choise, list_parts, regex_part_string) {
        let all_parts = this._getAllPart(element, start_index, end_index, list_parts, regex_part_string);
        // bat truong hop thieu phan I ma chi co phan II trong de bai
        if (all_parts.length == 1 && all_parts[0] == 1) {
            all_parts = [0, 1]
        }

        // ngan khong cho nhieu hon 3 phan, va khong cho chi co 1 phan ( tuc la trong de bai co loi)
        if ((!has_multiple_choise && all_parts.length > 3) || all_parts.length == 1) {
            let log = "Error at book: " + this.book + ", title: " + this.question_default + ", error part: " + all_parts.length + ", method: " + this.getBuildMethod()
            console.log(log);
            this.logger.error(log);
            this._buildDefault();
            return null;
        }

        return all_parts;
    }

    _buildNormals() {
        this._createAbstractPart(false);
    }

    /**
     * Tạo phần tổng quát
     * @param {*} has_multiple_choise
     */
    _createAbstractPart(has_multiple_choise) {
        const result = this.document.createElement("div");
        const start_question = this._getStartIndexQuestion(this.element, this.getStartQuestionSelector());
        const start_answer = this._getStartIndexAnswer(this.element, this.getSlaveAnswerLabels(), this.getStartAnswerSelector());

        const all_parts = this._checkParts(this.element, start_question + 1, start_answer, has_multiple_choise, this.getListParts(), this,getRegexPartString())
        if (!all_parts) return;

        const detail_parts = this._createDetailParts(all_parts, start_question, start_answer, has_multiple_choise);
        // console.log(detail_parts)
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

        if (result.children.length > 0) this.setElement(result);
    }

    _createDetailParts(element, all_parts, start_question, start_answer, has_multiple_choise) {
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
                // console.log(start_question_part, PART)
                const start_answer_part = this._getStartPart(cur_answer + 1, this.element.children.length, PART, cur_answer);
                // console.log(start_answer_part, PART, this.element.children[start_answer_part].innerHTML)

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
                let log = "Error at book: " + this.book + ", title: " + this.question_default + ", error start answer parts duplicate, method: " + this._getBuildMethod()
                console.log(log);
                this.logger.error(log);
            }

            detail_parts[index].start_question_next_part = start_question_next_part;
            detail_parts[index].start_answer_next_part = start_answer_next_part;
            detail_parts[index].has_part_titles = has_part_titles;
            // console.log("Check::::::::", checkPart, detail_parts[index], start_question_next_part, start_answer_next_part, start_answer, this.element.children.length)
        }

        return detail_parts
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
        // console.log("@@@@@@@@@", tmp_answers, answer_details, questions, detail_part)

        for (let index = 0; index < question_keys.length; index++) {

            if (detail_part.has_part_titles && index > 0) {
                dom_element.appendChild(this._cloneNode(bulkhead));
            }

            const key = question_keys[index];
            const start_question = questions[key].from;
            const start_next_question = questions[key].to;

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
                if (last_index < start_next_question - 2) {
                    for (let i = last_index; i < start_next_question; i++) {
                        dom_element.appendChild(this._cloneNodeElement(i));
                    }
                }
                if (answer_plans) {
                    const answer_plans_element = this.document.createElement("p");

                    if (answers && answers[key]) answer = answers[key];
                    if (!answer && answer_details[key]) {
                        answer = this._getAnswerMultipleChoise(answer_details[key].from, answer_details[key].to);
                    }
                    let answer_plans_text;

                    // Do một số đề thi đáp án trong bảng không có
                    if (!answer) {
                        answer_plans_text = this._createAnswerPlanText(answer_plans, "");
                        let log = "Warning at book: " + this.book + ", title: " + this.question_default + ", question does not has answer: " + key + ",method: " + this._getBuildMethod()
                        console.log(log);
                        this.logger.warn(log);
                    } else {
                        answer_plans_text = this._createAnswerPlanText(answer_plans, answer.key);
                        answer.key = answer_plans[answer.key - 1]
                    }
                    answer_plans_element.appendChild(this.document.createTextNode(answer_plans_text));
                    dom_element.appendChild(answer_plans_element);
                } else {
                    dom_element.appendChild(this._cloneNode(spec_self_essay));
                }

            } else {
                this._insertQuestionNormal(dom_element, start_question, start_next_question, is_h5_tag);
            }

            if (!answer_details[key]) continue;

            const start_answer = answer_details[key].from;
            const start_next_answer = answer_details[key].to;
            this._insertAnswerDetail(dom_element, start_answer, start_next_answer, answer);

        }
        return true;
    }


}

module.exports = BuildRecord;
