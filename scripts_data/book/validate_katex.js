
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const mjpage = require('mathjax-node-page');
const mjnode = require('mathjax-node-svg2png');
const mjpageConfig = { format: ["TeX"] }
const mjnodeConfig = { png: true }
mjpage.init(mjnode);
mjpage.addOutput('png', (wrapper, data) => {
    wrapper.innerHTML = data;
});
// mjpage.addOutput('png', (wrapper, data) => {
//     wrapper.innerHTML = `<img src="${data}">`;
// });
/**
 * Chu y thay cac file trong lib_spec vao cac lib tuong ung
 */
// const src = "./export/Ngữ_văn 12_0.html"
// const source = fs.readFileSync(src);
// const dom = new JSDOM(source.toString());
// mjpage.mjpage(dom, mjpageConfig, mjnodeConfig, function (output) {
//     fs.writeFile('word1.html', output.serialize(), err => {
//         if (err) console.log(err)
//     });
// })
const PATT_SOURCE = './export/'
// const files = fs.readdirSync(PATT_SOURCE);
const PATH_VALIDATED = './validated/'

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question(`Name file in path ${PATT_SOURCE}: `, (file) => {
    console.log(`Open and validate: ${file}`);
    try {
        let source = fs.readFileSync(PATT_SOURCE + file);
        let dom = new JSDOM(source.toString());
        mjpage.mjpage(dom, mjpageConfig, mjnodeConfig, function (output) {
            console.log('!!!!!!!!!Validated: ' + file)
            fs.writeFile(PATH_VALIDATED + file, output.serialize(), err => {
                if (err) console.log('!!!!!!!!!!ERROR:' + file, err)
            });
        })
    } catch (error) {
        console.log(error)
    }
    rl.close();
});



// try {
//     let source = fs.readFileSync('./test.html');
//     let dom = new JSDOM(source.toString());
//     mjpage.mjpage(dom, mjpageConfig, mjnodeConfig, function (output) {
//         fs.writeFile("word3.html", output.serialize(), err => {
//             if (err) console.log(err)
//         });
//     })
// } catch (error) {
//     console.log(error)
// }

// files.forEach(async file => {
//     console.log(file)
//     // const file = 'Toán_lớp 12_3.html'
//     let source = fs.readFileSync(PATT_SOURCE + file);
//     let dom = new JSDOM(source.toString());
//     try {
//         let output = await validate(dom);
//         console.log('!!!!!!!!!Validated: ' + file)
//         fs.writeFile(PATH_VALIDATED + file, output.serialize(), err => {
//             if (err) console.log('!!!!!!!!!!ERROR:' + file, err)
//         });
//     } catch (error) {
//         console.log(file, error)
//     }
//     // mjpage.mjpage(dom, mjpageConfig, mjnodeConfig, function (output) {
//         // console.log('!!!!!!!!!Validated: ' + file)
//         // fs.writeFile(PATH_VALIDATED + file, output.serialize(), err => {
//         //     if (err) console.log('!!!!!!!!!!ERROR:' + file, err)
//         // });
//     // })
//     sleep(5000)
// });

// function sleep(delay) {
//     var start = new Date().getTime();
//     while (new Date().getTime() < start + delay);
// }

// function validate(dom) {
//     return new Promise(resolve => {
//         mjpage.mjpage(dom, mjpageConfig, mjnodeConfig, function (output) {
//             resolve(output)
//         })
//     })
// }