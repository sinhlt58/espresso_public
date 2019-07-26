/*************************************************************************
 *
 *  mathjax-node-svg2png
 *
 *  A drop-in replacement for mathjax-node which adds PNG data-uri
 *  using svg2png.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2016 The MathJax Consortium
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var mathjax = require('mathjax-node');
var svg2png = require('svg2png');

// input `data` extends mathjax-node input `data`.
// Additional values are:
//
// png: true         // enable PNG generation
// scale: 1,         // scaling factor to apply during conversion

// `result` data extends the mathjax-node `result` data.
// Additional values are
//
//  png             // data URI in base64
//  pngWidth        // PNG width (in pixel)
//

const cbTypeset = function (data, callback) {
    var svg = data.svg;
    if (data.png) data.svg = true;
    mathjax.typeset(data, function (result) {
        data.svg = svg;
        if (result.error) callback(result);
        if (data.png) convert(result, data, callback);
        else callback(result, data);
    });
};

// main API, callback and promise compatible
exports.typeset = function (data, callback) {
    if (callback) cbTypeset(data, callback);
    else return new Promise(function (resolve, reject) {
        cbTypeset(data, function (output, input) {
            if (output.errors) reject(output.errors);
            else resolve(output, input);
        });
    });
};

// conganh cmt
// var convert = function(result, data, callback) {
//     var sourceBuffer = new Buffer(result.svg, 'utf-8');
//     var scale = data.scale || 1;
//     // NOTE magic constant, vaguely matches ~16pt Times
//     const EXTOPX = data.ex || 6;
//     result.pngWidth = result.width.substring(0, result.width.length - 2) * EXTOPX * scale;
//     var returnBuffer = svg2png.sync(sourceBuffer, {
//         width: result.pngWidth
//     });
//     result.png = 'data:image/png;base64,' + returnBuffer.toString('base64');
//     callback(result);
// };
// end conganh cmt

// conganh add
var convert = async function (result, data, callback) {
    var sourceBuffer = new Buffer(result.svg, 'utf-8');
    var scale = data.scale || 1;
    // NOTE magic constant, vaguely matches ~16pt Times
    const EXTOPX = data.ex || 6;
    result.pngWidth = result.width.substring(0, result.width.length - 2) * EXTOPX * scale;
    if (result.pngWidth <= 0) result.pngWidth = 40
    var encodedBuffer = svg2png.sync(sourceBuffer, {
        width: result.pngWidth
    });
    const sharp = require('sharp');
    try {
        encodedBuffer = await sharp(encodedBuffer).flatten({ background: "white" }).toBuffer();
    } catch (err) {
        console.error(err);
    }
    // console.log(encodedBuffer)

    result.png = await imageToLatex(encodedBuffer.toString('base64'));
    // result.png = 'data:image/png;base64,' + encodedBuffer.toString('base64');

    callback(result, data);


};
const imageToLatex = async function (encoded) {
    var MATHPIX_APP_ID = 'jcarroll';
    var MATHPIX_APP_KEY = '13f1584b2f9edb8220bf619c0b4e3d5a';
    //  var MATHPIX_APP_ID = 'truonganhhoang_gmail_com';
    //  var MATHPIX_APP_KEY = '07ffdf5802788f43930d';

    var data = {
        'src': 'data:image/jpeg;base64,' + encoded
    };
    var header = {
        'app_id': MATHPIX_APP_ID,
        'app_key': MATHPIX_APP_KEY,
        "Content-type": "application/json",
    };
    var options = {
        'headers': header,
        'method': 'post',
        'body': JSON.stringify(data)
    };
    const fetch = require('node-fetch');
    try {
        let response = await fetch('https://api.mathpix.com/v3/latex', options)
        let json = await response.json();
        // console.log(json)
        if (!json.error) {
            return "$$" + json.latex + "$$";
        }
        return `<img src="${data.src}">`;
    } catch (error) {
        console.log(error);
        return `<img src="${data.src}">`;
    }

}
// const imageToLatex = function (doc, max) {
//     var MATHPIX_APP_ID = 'mathpix';
//     var MATHPIX_APP_KEY = '139ee4b61be2e4abcfb1238d9eb99902';
//     //  var MATHPIX_APP_ID = 'truonganhhoang_gmail_com';
//     //  var MATHPIX_APP_KEY = '07ffdf5802788f43930d';

//     var body = doc.getBody();
//     var counter = 0;

//     for (var childIndex = 0; childIndex < body.getNumChildren(); childIndex++) {
//         var child = body.getChild(childIndex);
//         if (child.getType() == DocumentApp.ElementType.PARAGRAPH) {
//             for (var i = 0; i < child.getNumChildren(); i++) {
//                 var element = child.getChild(i);
//                 if (element.getType() == DocumentApp.ElementType.INLINE_IMAGE) {
//                     var error = false;
//                     try {
//                         var blob = element.getBlob();
//                     } catch (err) {
//                         error = true;
//                     }
//                     //          var blob = element.getBlob().getAs("image/jpeg");
//                     // Retrieve the paragraph's attributes.
//                     //          var atts = element.getAttributes();
//                     //          // Log the paragraph attributes.
//                     //          for (var att in atts) {
//                     //            Logger.log(att + ":" + atts[att]);
//                     //          }
//                     if (error || !blob) continue;
//                     var encoded = Utilities.base64Encode(blob.getBytes());
//                     var data = {
//                         'src': 'data:image/jpeg;base64,' + encoded
//                     };
//                     var header = {
//                         'app_id': MATHPIX_APP_ID,
//                         'app_key': MATHPIX_APP_KEY,
//                     };
//                     var options = {
//                         'headers': header,
//                         'method': 'post',
//                         'contentType': 'application/json',
//                         'payload': JSON.stringify(data)
//                     };
//                     var response = UrlFetchApp.fetch('https://api.mathpix.com/v3/latex', options);
//                     if (!JSON.parse(response.getContentText()).error) {
//                         var text = "$$" + JSON.parse(response.getContentText()).latex + "$$";
//                         element.removeFromParent();
//                         var latex_text = child.insertText(i, text);
//                         latex_text.setBackgroundColor("#89ffaa");
//                     }
//                     counter++;
//                     if (counter > max) return;
//                 }
//             }
//         }
//     }
// }
// end conganh

exports.start = mathjax.start;
exports.config = mathjax.config;
