
const ANSWER = {
    A: "A.",
    B: "B.",
    C: "C.",
    D: "D.",
}
const KEYSANSWER = Object.keys(ANSWER);

const question = "Câu";
const replaceArray = [
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
    // {
    //     from: /Click vào Bài tiếp theo > để xem bài soạn đầy đủ/g,
    //     to: ''
    // },
    // {
    //     from: /Xem thêm: Đề và Lời giải chi tiết Đề thi thử THPT Quốc gia môn Ngữ văn mới nhất tại&nbsp;Tuyensinp47.com/g,
    //     to: ''
    // },
    {
        from: /h1/g,
        to: 'p'
    },
    {
        from: /h2/g,
        to: 'p'
    },
    {
        from: /h3/g,
        to: 'p'
    },
    {
        from: /h4/g,
        to: 'p'
    },
    {
        from: /h5/g,
        to: 'p'
    },
    {
        from: /h6/g,
        to: 'p'
    }
]

let explain;
let br;
let bulkhead;
let specSelfEssay;

// // nhiều câu hay 1 | không có đề hay có | trắc nghiệm | tự luận
// const methods = {
//     "0000": "_buildDefault",
//     "0001": "_buildSelfEssay",
//     "0010": "_buildMultipleChoise",
//     "0011": "_buildMultipleChoiseSelfEssay",
//     "0100": "_buildDefault",
//     "0101": "_buildNoQuestionSelfEssay",
//     "0110": "_buildNoQuestionMultipleChoise",
//     "0111": "_buildNoQuestion",
//     "1000": "_buildDefault",
//     "1001": "_buildSelfEssays",
//     "1010": "_buildMultipleChoises",
//     "1011": "_buildMultipleChoisesSelfEssays",
//     "1100": "_buildNoQuestions",
//     "1101": "_buildNoQuestionsSelfEssays",
//     "1110": "_buildNoQuestionsMultipleChoise",
//     "1111": "_buildNoQuestionsMultipleChoiseSelfEssays"
// }

// nhiều câu hay 1 | không có đề hay có | trắc nghiệm (tự luận chắc chắn có)
const methods = {
    "000": "_buildNormal",
    "001": "_buildMultipleChoise",
    "010": "_buildNoQuestion",
    "011": "_buildNoQuestionMultipleChoise",
    "100": "_buildNormals",
    "101": "_buildMultipleChoises",
    "110": "_buildNoQuestions",
    "111": "_buildNoQuestionMultipleChoises"
}
const listIdMethod = Object.keys(methods);

// ngang hay dọc | đáp án cùng ô hay không
const typeTable = {
    "00": "_getVerticalDifferent",
    "01": "_getVerticalSame",
    "10": "_getHorizontalDifferent",
    "11": "_getHorizontalSame"
}
const listIdTable = Object.keys(typeTable);

const PARTS = ["I", "II", "Phần", "PHẦN", "III", "IV"];

const _cleanRedundantString = Symbol('_cleanRedundantString')
const _init = Symbol('_init')
const _cleanRedundantNode = Symbol('_cleanRedundantNode')
const _isMultipleChoise = Symbol('_isMultipleChoise')
const _isManyQuestions = Symbol('_isManyQuestions')
const _notHasQuestion = Symbol('_notHasQuestion')
// const _isSelfEssay = Symbol('_isSelfEssay')

const booksHaveParts = ['văn']

class DetailSection {

    constructor(document, stringInnerHTML, questionDefault, book, element) {

        this.document = document;
        this.stringInnerHTML = stringInnerHTML;
        this.questionDefault = questionDefault;
        this.book = book;

        this[_cleanRedundantString]();
        this[_init]();
        this[_cleanRedundantNode]();

        let textNode = this.document.createTextNode("{{}}(10)");
        specSelfEssay = this.document.createElement('p')
        specSelfEssay.appendChild(textNode);

        textNode = this.document.createTextNode("<explain>");
        explain = this.document.createElement('p');
        explain.appendChild(textNode);

        br = this.document.createElement('br');

        bulkhead = this.document.createElement('p');
        let bulkheadText = this.document.createTextNode('===');
        bulkhead.appendChild(bulkheadText);
        bulkhead.setAttribute("style", "color: #e04e4e;")

    }

    /**
     * Xóa hoặc thay thế các từ không cần thiết
     */
    [_cleanRedundantString]() {
        for (let index = 0; index < replaceArray.length; index++) {
            this.stringInnerHTML = this.stringInnerHTML.replace(replaceArray[index].from, replaceArray[index].to)
        }
    }

    /**
     * Xóa các node không cần thiết
     */
    [_cleanRedundantNode]() {

        let titleRemove = this.element.querySelector(".lineheight");
        if (titleRemove) titleRemove.remove();

        let imgRemove = this.element.querySelector("img.method-open-icon");
        if (imgRemove) imgRemove.remove();

        let aRemove = this.element.querySelector("a");
        if (aRemove) aRemove.remove();

        // imgRemove = this.element.querySelector("img");
        // if (imgRemove) imgRemove.remove();

        // Đưa các thẻ bên trong div lên bên trên để thành các node ngang hàng
        for (let index = this.element.children.length - 1; index >= 0; index--) {
            let child = this.element.children[index];
            let nameChild = child.nodeName;
            if (nameChild == 'DIV' && child.children != null) {
                let refNode = child;
                for (let i = 0; i < child.children.length; i++) {
                    let insertNode = child.children[i].cloneNode(true);
                    refNode.after(insertNode);
                    refNode = insertNode;
                }
                child.remove();
            }
        }
    }

    /**
     * Tạo các node
     */
    [_init]() {
        this.element = this.document.createElement("div");
        this.element.innerHTML = this.stringInnerHTML;
    }

    // [_isSelfEssay]() {
    //     return this.stringInnerHTML.includes(ANSWER.A) &&
    //         this.stringInnerHTML.includes(ANSWER.B) &&
    //         this.stringInnerHTML.includes(ANSWER.C) &&
    //         this.stringInnerHTML.includes(ANSWER.D)
    // }

    [_isMultipleChoise]() {
        for (let index = 0; index < KEYSANSWER.length; index++) {
            if (this.stringInnerHTML.includes(ANSWER[KEYSANSWER[index]]) == false) return false;
        }
        return true;
    }

    [_isManyQuestions]() {

        let question_1 = this.stringInnerHTML.includes(question + ' 1');
        let question_2 = this.stringInnerHTML.includes(question + ' 2');

        let checkParts = false;
        for (let i = 0; i < booksHaveParts.length; i++) {
            if (this.book.includes(booksHaveParts[i])) {
                checkParts = true;
                break;
            }
        }
        if (checkParts) {
            let partI = this.stringInnerHTML.includes('I');
            const partII = this.stringInnerHTML.includes('II');
            return question_1 && question_2 && partI && partII;
        }

        return question_1 && question_2;

    }

    [_notHasQuestion]() {
        const questionTitle = this.element.querySelector("p .content_question");
        if (questionTitle) return false;
        return true;
    }

    _getBuildMethod() {
        // let arrayBool = [this[_isManyQuestions](), this[_hasQuestion](), this[_isMultipleChoise](), this[_isSelfEssay]()];
        const arrayBool = [this[_isManyQuestions](), this[_notHasQuestion](), this[_isMultipleChoise]()];
        let idMethod = "";
        for (let index = 0; index < arrayBool.length; index++) {
            const number = arrayBool[index] ? 1 : 0;
            idMethod += number;
        }
        console.log(idMethod, methods[idMethod])
        if (listIdMethod.includes(idMethod)) return methods[idMethod];
        return '_buildDefault';
    }

    buildDetail(isTheory) {
        try {
            if (isTheory) {
                return;
            } else {
                const nameMethod = this._getBuildMethod();
                this[nameMethod]();
            }
        } catch (error) {
            console.log(error);
            return;
        }
    };

    _cloneNodeElement(position) {
        return this.element.children[position].cloneNode(true);
    }

    _getStartIndexQuestion() {
        return this._getIndexQnABySelector("p .content_question", -1);
    }

    _getStartIndexAnswer() {
        return this._getIndexQnABySelector("p .content_detail", this.element.children.length - 1);
    }

    _getIndexQnABySelector(selector, defaultValue) {
        const title = this.element.querySelector(selector);
        if (!title) return defaultValue;
        const titleParent = title.parentNode;
        let startIndex = Array.from(this.element.children).indexOf(titleParent);
        if (startIndex == null || startIndex < 0 || startIndex > this.element.children.length) {
            startIndex = defaultValue + 1;
        }
        return startIndex;
    }

    /**
     * Các câu hỏi 1 câu và có "đề bài"
     * (đã test)
     */
    _buildNormal() {
        const result = this.document.createElement("div");

        const startIndexQuestion = this._getStartIndexQuestion();

        const startIndexAnswer = this._getStartIndexAnswer();

        const questionElement = this.document.createElement("h5");
        for (let i = startIndexQuestion + 1; i < startIndexAnswer; i++) {
            questionElement.appendChild(this._cloneNodeElement(i));
        };
        result.appendChild(questionElement);

        result.appendChild(specSelfEssay);
        if (startIndexAnswer + 1 < this.element.children.length) {
            result.appendChild(explain);
            for (let i = startIndexAnswer + 1; i < this.element.children.length; i++) {
                result.appendChild(this._cloneNodeElement(i));
            }
        }

        this.element = result;
    }

    /**
     * Các câu hỏi 1 câu trắc nghiệm và có "đề bài"
     * (đã test)
     */
    _buildMultipleChoise() {
        const result = this.document.createElement("div");

        const startIndexQuestion = this._getStartIndexQuestion();

        const startIndexAnswer = this._getStartIndexAnswer();

        const startAnswerPlan = this._getStartIndexAnswerPlan(startIndexQuestion + 1, this.element.children.length);
        if (startAnswerPlan == startIndexQuestion + 1) {
            this._buildDefault();
            return;
        }

        const answerPlans = this._getAnswerPlans(startAnswerPlan, startIndexAnswer);

        const questionElement = this.document.createElement("h5");
        for (let i = startIndexQuestion + 1; i < startAnswerPlan; i++) {
            questionElement.appendChild(this._cloneNodeElement(i));
        };
        result.appendChild(questionElement);

        const answerPlansElement = this.document.createElement("p");
        const answer = this._getAnswerMultipleChoise(startIndexAnswer, this.element.children.length - 1);
        const answerPlansText = this._createAnswerPlanText(answerPlans, answer);
        answerPlansElement.appendChild(this.document.createTextNode(answerPlansText));

        // can phat trien them
        // neu sau cac dap an con phan de bai
        // them vao h5 trc khi them cac dap an

        result.appendChild(answerPlansElement);

        result.appendChild(explain);
        for (let i = startIndexAnswer + 1; i < this.element.children.length; i++) {
            result.appendChild(this._cloneNodeElement(i));
        }

        this.element = result;
    }

    // can phat trien them
    _getStartIndexAnswerPlan(startIndex, endIndex) {
        for (let index = startIndex; index < endIndex; index++) {
            let textQuestion = this.element.children[index].textContent;
            if (textQuestion) {
                textQuestion = textQuestion.trim().replace(/&nbsp;/gi, '');
                if (textQuestion.startsWith(ANSWER.A) || textQuestion.startsWith(ANSWER.A, 1)
                    || textQuestion.startsWith(ANSWER.A, 2) || textQuestion.startsWith(ANSWER.A, 3)) {
                    return index;
                }
            }
        }
        return startIndex;
    }

    _getAnswerPlans(startIndex, endIndex) {

        const tmpAnswerPlans = [];
        for (let index = startIndex; index < endIndex; index++) {
            const text = this.element.children[index].textContent;

            const keysAnswers = [];
            for (let i = 0; i < KEYSANSWER.length; i++) {
                if (text.includes(ANSWER[KEYSANSWER[i]])) keysAnswers.push(ANSWER[KEYSANSWER[i]]);
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

            // can them lay &nbsp; o day de lay truong hop (\A.\) (\B.\)
            for (let i = 0; i < positions.length; i++) {
                let to = text.length - 1;
                if (i < positions.length - 1) to = positions[i + 1].position;

                let from = positions[i].position;
                if (i == 0) from = 0;

                tmpAnswerPlans.push({ key: positions[i].key, answer: text.substring(from, to) });
            }
        }

        tmpAnswerPlans.sort((slot1, slot2) => {
            return slot1.key > slot2.key;
        })

        const answerPlans = [];
        for (let index = 0; index < tmpAnswerPlans.length; index++) {
            let answer = tmpAnswerPlans[index].answer;
            if (answer.startsWith(tmpAnswerPlans[index].key)) answer = answer.replace(tmpAnswerPlans[index].key, '');
            answerPlans.push(answer);
        }

        return answerPlans;
    }

    _getAnswerMultipleChoise(startIndex, endIndex) {
        for (let index = endIndex; index >= startIndex; index--) {
            const text = this.element.children[index].textContent;
            if (text) {
                for (let i = 0; i < KEYSANSWER.length; i++) {
                    if (text.includes(KEYSANSWER[i])) return i;
                }
            }
        }
        return "";
    }

    _createAnswerPlanText(answerPlans, answer) {
        let answerPlansText = "";
        for (let index = 0; index < answerPlans.length; index++) {
            if (index == 0) answerPlansText = "{{" + answerPlans[index];
            else if (index == answerPlans.length - 1) answerPlansText += "/" + answerPlans[index] + "}}"
            else answerPlansText += "/" + answerPlans[index];
        }
        answerPlansText += "(" + answer + ")";
        return answerPlansText;
    }

    /**
     * Các câu hỏi 1 câu và không có "đề bài"
     * (đã test)
     */
    _buildNoQuestion() {
        let result = this.document.createElement("div");

        const questionElement = this.document.createElement("h5");
        questionElement.appendChild(this.document.createTextNode(this.questionDefault));
        result.appendChild(questionElement);

        result.appendChild(br);
        result.appendChild(specSelfEssay);
        result.appendChild(explain);

        for (let i = 0; i < this.element.children.length; i++) {
            result.appendChild(this._cloneNodeElement(i));
        };

        this.element = result;
    }

    /**
     * Các câu hỏi 1 câu trắc nghiệm và không có "đề bài"
     * (đã test)
     */
    _buildNoQuestionMultipleChoise() {
        this._buildMultipleChoise();
    }

    _getStartPart(startIndex, endIndex, part, defaultValue) {
        for (let index = startIndex; index < endIndex; index++) {
            let text = this.element.children[index].textContent;
            text = text.trim().replace(/&nbsp;/gi, '');
            if (text.startsWith(part) || text.startsWith("Phần " + part) || text.startsWith("PHẦN " + part)) {
                return index;
            }
        }
        return defaultValue;
    }

    _getFirstQuestionPart(startIndex, endIndex, defaultValue) {
        for (let index = startIndex; index < endIndex; index++) {
            let text = this.element.children[index].textContent;
            text = text.trim().replace(/&nbsp;/gi, '');
            if (text.startsWith("Câu")) {
                return index;
            }
        }
        return defaultValue;
    }

    /**
     * Các câu hỏi nhiều câu và có "đề bài"
     * (đã test đề thi)
     */
    _buildNormals() {
        const result = this.document.createElement("div");

        const startQuestion = this._getStartIndexQuestion();
        const startAnswer = this._getStartIndexAnswer();

        const startQuestionPartI = this._getStartPart(startQuestion + 1, startAnswer, "I", -1);
        const startAnswerPartI = this._getStartPart(startAnswer + 1, this.element.children.length, "I", this.element.length - 1);
        const startFirstQuestionPartI = this._getFirstQuestionPart(startQuestionPartI + 1, startAnswer, startQuestionPartI + 1);
        // can 1 check de startIndex = startQuestionPartI; tang hieu suat
        const startQuestionPartII = this._getStartPart(startQuestion + 1, startAnswer, "II", -1);
        const startAnswerPartII = this._getStartPart(startAnswer + 1, this.element.children.length, "II", this.element.length - 1);
        const startFirstQuestionPartII = this._getFirstQuestionPart(startQuestionPartII + 1, startAnswer, startQuestionPartII + 1);

        const hasParamPartI = startQuestionPartI + 1 < startFirstQuestionPartI ? true : false;
        const checkPartI = this._createPart(result, startQuestionPartI, startAnswerPartI, startQuestionPartII, startAnswerPartII, startFirstQuestionPartI, hasParamPartI);
        if (!checkPartI) return;

        const hasParamPartII = startQuestionPartII + 1 < startFirstQuestionPartII ? true : false;
        const checkPartII = this._createPart(result, startQuestionPartII, startAnswerPartII, startAnswer, this.element.children.length, startFirstQuestionPartII, hasParamPartII);
        if (!checkPartII) return;

        this.element = result;
    }

    _createPart(domElement, startQuestionPart, startAnswerPart, startQuestionNextPart, startAnswerNextPart, startFirstQuestion, hasParam) {
        const textPart = this._cloneNodeElement(startQuestionPart).textContent;
        if (textPart.length > 30) {
            this._buildDefault();
            return false;
        }

        const partTitle = this.document.createTextNode(textPart);
        const partElement = this.document.createElement("h5");
        partElement.appendChild(partTitle);
        domElement.appendChild(partElement);

        if (hasParam) {
            const partParam = this.document.createElement("h6");
            for (let index = startQuestionPart + 1; index < startFirstQuestion; index++) {
                partParam.appendChild(this._cloneNodeElement(index));

            }
            domElement.appendChild(partParam);
        }

        const questionAnswerPart = this._getIndexQuestionAndAnswer(startFirstQuestion, startQuestionNextPart - 1, startAnswerPart, startAnswerNextPart - 1);
        if (questionAnswerPart.length == 0) {
            this._buildDefault();
            return false;
        }

        for (let index = 0; index < questionAnswerPart.length; index++) {

            const questionAnswer = questionAnswerPart[index];

            if (index > 0) domElement.appendChild(bulkhead.cloneNode(true));

            for (let indexQuestion = questionAnswer.question.from; indexQuestion <= questionAnswer.question.to; indexQuestion++) {
                domElement.appendChild(this._cloneNodeElement(indexQuestion));
            }

            if (questionAnswer.answer.from != null && questionAnswer.answer.to != null) {
                domElement.appendChild(specSelfEssay.cloneNode(true));
                domElement.appendChild(explain.cloneNode(true));
            }

            for (let indexAnswer = questionAnswer.answer.from; indexAnswer <= questionAnswer.answer.to; indexAnswer++) {
                let answerNode = this._cloneNodeElement(indexAnswer);
                let strongNode = answerNode.querySelector("strong");
                if (strongNode) strongNode.remove()
                domElement.appendChild(answerNode);
            }
        }

        return true;
    }

    _getIndexQuestionAndAnswer(startQuestionIndex, endQuestionIndex, startAnswerIndex, endAnswerIndex) {

        let questionAndAnswer = [];

        let curIndex = startQuestionIndex;
        while (curIndex <= endQuestionIndex) {
            if (this.element.children[curIndex].textContent.startsWith("Câu")) {
                questionAndAnswer.push(
                    {
                        question: {
                            from: curIndex
                        }
                    }
                );
            }
            curIndex++;
        }

        if (questionAndAnswer.length == 0) {
            return [
                {
                    question: {
                        from: startQuestionIndex,
                        to: endQuestionIndex
                    },
                    answer: {
                        from: startAnswerIndex,
                        to: endAnswerIndex
                    }
                }
            ]
        }

        curIndex = startAnswerIndex;

        let count = 0;
        while (count < questionAndAnswer.length) {
            let text = this.element.children[curIndex].textContent;
            if (text.startsWith("Câu") || text.startsWith("Ý")) {
                questionAndAnswer[count].answer = { from: curIndex };
                count++;
            }
            curIndex++;
            if (curIndex > endAnswerIndex) break;
        }

        for (let index = 0; index < questionAndAnswer.length; index++) {
            let nextIndex = index + 1;
            if (nextIndex >= questionAndAnswer.length) {
                questionAndAnswer[index].question.to = endQuestionIndex;
                if (questionAndAnswer[index].answer) questionAndAnswer[index].answer.to = endAnswerIndex;
            } else {
                questionAndAnswer[index].question.to = questionAndAnswer[nextIndex].question.from - 1;
                if (questionAndAnswer[index].answer) questionAndAnswer[index].answer.to = questionAndAnswer[nextIndex].answer.from - 1;
            }
        }

        return questionAndAnswer;

    }

    _buildMultipleChoises() {


        const result = this.document.createElement("div");

        const startQuestion = this._getStartIndexQuestion();
        const startAnswer = this._getStartIndexAnswer();

        const allParts = this._getAllPart(startQuestion + 1, startAnswer);

        if (allParts.length == 0) {

            const questions = this._getAllStartQuestions(startQuestion + 1, startAnswer, false);
            let questionKeys = Object.keys(questions);
            const answerDetails = this._getAllStartAnswers(startAnswer + 1, this.element.children.length, false, questionKeys);
            const answers = this._getAnswerMultipleChoisesInTabel();

            for (let index = 0; index < questionKeys.length; index++) {
                const startQuestion = questions[questionKeys[index]].from;
                const startNextQuestion = questions[questionKeys[index]].to;

                const startAnswerPlan = this._getStartIndexAnswerPlan(startQuestion + 1, startNextQuestion);
                if (startAnswerPlan == startQuestion) {
                    continue;
                }
                const answerPlans = this._getAnswerPlans(startAnswerPlan, startNextQuestion);

                const questionElement = this.document.createElement("h5");
                for (let i = startQuestion; i < startAnswerPlan; i++) {
                    questionElement.appendChild(this._cloneNodeElement(i));
                };
                result.appendChild(questionElement);

                const answerPlansElement = this.document.createElement("p");
                let answer = answers[questionKeys[index]].answer;
                if(answer == undefined) answer = "";
                const answerPlansText = this._createAnswerPlanText(answerPlans, answer);
                answerPlansElement.appendChild(this.document.createTextNode(answerPlansText));

                // can phat trien them
                // neu sau cac dap an con phan de bai
                // them vao h5 trc khi them cac dap an

                result.appendChild(answerPlansElement);

                // check, cmt khi hoan thanh
                const startAnswer = questions[questionKeys[index]].from;
                const startNextAnswer = questions[questionKeys[index]].to;
                result.appendChild(explain);
                for (let i = startAnswer; i < startNextAnswer; i++) {
                    result.appendChild(this._cloneNodeElement(i));
                }


                // if(!answerDetails[questionKeys[index]]) continue;

                // const startAnswer = answerDetails[questionKeys[index]].from;
                // const startNextAnswer = answerDetails[questionKeys[index]].to;
                // result.appendChild(explain);
                // for (let i = startAnswer; i < startNextAnswer; i++) {
                //     result.appendChild(this._cloneNodeElement(i));
                // }

            }

            console.log(questions, answerDetails, answers)
        }

        // const startQuestionPartI = this._getStartPart(startQuestion + 1, startAnswer, "I", -1);
        // const startAnswerPartI = this._getStartPart(startAnswer + 1, this.element.children.length, "I", this.element.length - 1);
        // const startFirstQuestionPartI = this._getFirstQuestionPart(startQuestionPartI + 1, startAnswer, startQuestionPartI + 1);
        // // can 1 check de startIndex = startQuestionPartI; tang hieu suat
        // const startQuestionPartII = this._getStartPart(startQuestion + 1, startAnswer, "II", -1);
        // const startAnswerPartII = this._getStartPart(startAnswer + 1, this.element.children.length, "II", this.element.length - 1);
        // const startFirstQuestionPartII = this._getFirstQuestionPart(startQuestionPartII + 1, startAnswer, startQuestionPartII + 1);

        // const hasParamPartI = startQuestionPartI + 1 < startFirstQuestionPartI ? true : false;
        // const checkPartI = this._createPart(result, startQuestionPartI, startAnswerPartI, startQuestionPartII, startAnswerPartII, startFirstQuestionPartI, hasParamPartI);
        // if (!checkPartI) return;

        // const hasParamPartII = startQuestionPartII + 1 < startFirstQuestionPartII ? true : false;
        // const checkPartII = this._createPart(result, startQuestionPartII, startAnswerPartII, startAnswer, this.element.children.length, startFirstQuestionPartII, hasParamPartII);
        // if (!checkPartII) return;

        // this._getAnswerMultipleChoisesInTabel();

        this.element = result;
    }

    // _getAllQnA(startQ, startA, isOne) {
    //     const questions = this._getAllStartQuestions(startQ + 1, startA, isOne);
    //     let questionKeys = Object.keys(questions);
    //     const answerDetails = this._getAllStartAnswers(startAnswer + 1, this.element.children.length, false, questionKeys);
    //     const answers = this._getAnswerMultipleChoisesInTabel();
    // }

    _getAllStartQuestions(startIndex, endIndex, isOne) {
        let questions = {};
        for (let index = startIndex; index < endIndex; index++) {
            let text = this.element.children[index].textContent;
            text = text.trim().replace(/&nbsp;/gi, '');
            if (text.startsWith("Câu")) {
                const name = text.substring(0, 7);
                const number = name.match(/\d+/g);
                if (number) {
                    if (!questions[number[0]]) {
                        questions[number[0]] = { from: index, to: endIndex, existAfter: 0 };
                    }
                    else {
                        questions[number[0]].existAfter++;
                        const numberAfter = questions[number[0]].existAfter;
                        questions[number[0] + "_" + numberAfter] = { from: index, to: endIndex, existAfter: 0 };
                    }
                }
                if (isOne) return questions;
            }
        }
        const questionKeys = Object.keys(questions);
        for (let index = 0; index < questionKeys.length; index++) {
            if (index < questionKeys.length - 1) {
                questions[questionKeys[index]].to = questions[questionKeys[index + 1]].from;
            }
        }
        return questions;
    }

    _getAllStartAnswers(startIndex, endIndex, isOne, questionNumbers) {
        let answers = {};
        for (let index = startIndex; index < endIndex; index++) {
            let text = this.element.children[index].textContent;
            text = text.trim().replace(/&nbsp;/gi, '');

            const checkOne = false;
            for (let i = 0; i < questionNumbers.length; i++) {
                const number = questionNumbers[i].split('_')[0];

                if (text.startsWith("Câu " + number)) {
                    if (!answers[number]) {
                        answers[number] = { from: index, to: endIndex, existAfter: 0 };
                    } else {
                        answers[number].existAfter++;
                        const numberAfter = answers[number].existAfter;
                        answers[number + "_" + numberAfter] = { from: index, to: endIndex, existAfter: 0 };
                    }
                    checkOne = true;
                    delete questionNumbers[i];
                    break;
                }
            }
            if (checkOne && isOne) return answers;
        }
        const answerKeys = Object.keys(answers);
        for (let index = 0; index < answerKeys.length; index++) {
            if (index < answerKeys.length - 1) {
                answers[answerKeys[index]].to = answers[answerKeys[index + 1]].from;
            }
        }
        return answers;
    }

    _getAllPart(startIndex, endIndex) {
        let allParts = [];
        for (let index = startIndex; index < endIndex; index++) {
            const nodeElement = this.element.children[index];
            for (let i = 0; i < PARTS.length; i++) {
                const part = PARTS[index];
                if (nodeElement.textContent && nodeElement.textContent.startsWith(part)) {
                    allParts.push(part);
                    break;
                }
            }
        }
        return allParts;
    }

    _getAnswerMultipleChoisesInTabel() {
        const table = this.element.querySelector("table");
        if (!table) return;

        const tbody = table.querySelector("tbody");

        const cellStart = this._getStartCellAnwserInTable(tbody);
        if (!cellStart) return;

        const nameMethod = this._getTypeTable(tbody, cellStart);
        return this[nameMethod](tbody, cellStart);
    }

    _getStartCellAnwserInTable(tbody) {
        for (let y = 0; y < tbody.children.length; y++) {
            const tr = tbody.children[y];
            for (let x = 0; x < tr.children.length; x++) {
                const td = tr.children[x];
                const text = td.textContent;
                if (!text.trim()) continue;

                const number = text.match(/\d+/g);
                if (number) return { x: x, y: y };
            }
        }
        return null;
    }

    _isHorizontal(tbody, cellStart) {
        const tr = tbody.children[cellStart.y];
        if (tr.children.length > 1) {

            const tdFirst = tr.children[cellStart.x];
            const tdSecond = tr.children[cellStart.x + 1];
            const textFirst = tdFirst.textContent;
            const textSecond = tdSecond.textContent;

            if (!textFirst || !textSecond) return false;

            const numberFirst = textFirst.match(/\d+/g);
            const numberSecond = textSecond.match(/\d+/g);

            console.log(numberFirst == numberSecond - 1)

            if (numberFirst == numberSecond - 1) return true;

        }
        return false;
    }

    _isSameCell(tbody, cellStart) {
        const tr = tbody.children[cellStart.y];

        const td = tr.children[cellStart.x];
        const text = td.textContent;

        if (!text) return false;

        const number = text.match(/\d+/g);
        const character = text.match(/[A-Z]/g);

        if (number && character) return true;

        return false;
    }

    _getTypeTable(tbody, cellStart) {
        const arrayBool = [this._isHorizontal(tbody, cellStart), this._isSameCell(tbody, cellStart)];
        let idTypeTable = "";
        for (let index = 0; index < arrayBool.length; index++) {
            const number = arrayBool[index] ? 1 : 0;
            idTypeTable += number;
        }
        console.log(idTypeTable, typeTable[idTypeTable])
        if (listIdTable.includes(idTypeTable)) return typeTable[idTypeTable];
        return '_getHorizontalSame';
    }

    _getVerticalSame(tbody, cellStart) {
        let arrayAnswers = {};
        for (let y = cellStart.y; y < tbody.children.length; y++) {
            const tr = tbody.children[y];
            for (let x = cellStart.x; x < tr.children.length; x++) {
                const td = tr.children[x];
                const text = td.textContent;

                if (!text) continue;

                const number = text.match(/\d+/g);
                const character = text.match(/[A-Z]/g);

                // do number va charecter o day la array nen can truy cap vao phan tu 0 voi character
                // su dung mang dap an de bat truong hop co phan co ban va phan nang cao
                if (number && character) {

                    let answer = character[0];
                    for (let i = 0; i < KEYSANSWER.length; i++) {
                        if (answer == KEYSANSWER[i]){
                            answer = i;
                            break;
                        }
                    }

                    if (!arrayAnswers[number]) {
                        arrayAnswers[number] = { answer: answer, existAfter: 0 };
                    } else {
                        arrayAnswers[number].existAfter++;
                        const numberAfter = arrayAnswers[number].existAfter;
                        answers[number + "_" + numberAfter] = { answer: answer, existAfter: 0 };
                    }
                }
            }

        }
        return arrayAnswers;
    }


    _buildNoQuestions() {

    }

    _buildNoQuestionMultipleChoises() {

    }

    _buildDefault() {

        let answerDetail = this.element.querySelector("p .content_detail");
        if (answerDetail) {
            let answerDetailParent = answerDetail.parentNode;
            answerDetailParent.before(br);
            answerDetailParent.before(specSelfEssay);
            answerDetailParent.before(explain);
        }

    }

}

module.exports = DetailSection;