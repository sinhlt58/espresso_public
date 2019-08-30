const BuildRecord = require('./build_record')
const Util = require('./util')

const REPLACES = [{
        from: /sachbaitap.com/g,
        to: ''
    },
    {
        from: /Sachbaitap.com/g,
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
        from: /https:\/\/img\.\/picture/g,
        to: 'https://img.loigiaihay.com/picture'
    },
    {
        from: /- Xem chi tiết/g,
        to: ''
    }],
    QUESTION_LABELS = ["Câu", "Bài", "Ý"],
    REGEX_NUMBER = /\\d+/g,
    SLAVE_ANSWER_LABELS = [
        "lời giải chi tiết.{0,1}$","lời giải.{0,1}$", "giải.{0,1}$", "giải.{0,1}$", "hướng dẫn làm bài.{0,1}$",
        "hướng dẫn giải chi tiết.{0,1}$", "hướng dẫn trả lời.{0,1}$", "hướng dẫn.{0,1}$", "đáp án.{0,1}$",
        "gợi ý làm bài.{0,1}$", "gợi ý trả lời.{0,1}$", "gợi ý.{0,1}$", "làm bài.{0,1}$", "trả lời.{0,1}$",
        "bài làm.{0,1}$",
    ];

class BuildSBT extends BuildRecord {

    constructor(document, logger) {
        super(document, logger);
        this.setMethods({
            "000": "_buildNormal",
            "001": "_buildMultipleChoise",
            "010": "_buildNoQuestion",
            "011": "_buildNoQuestionMultipleChoise",
            "100": "_buildNormals",
            "101": "_buildMultipleChoises",
            "110": "_buildNoQuestions",
            "111": "_buildNoQuestionMultipleChoises"
        })
        this.setReplaces(REPLACES, true)
        // this.setQuestionLabels(QUESTION_LABELS)
        // this.setRegexNumber(REGEX_NUMBER)
        this.setSlaveAnswerLabels(SLAVE_ANSWER_LABELS)
        // this.setStartAnswerSelector(null, true)
        // this.setStartQuestionSelector(null, true)
    }


    getBuildMethod() {
        // const is_many_questions = is_complex_part_question ? this._isManyQuestionsComplex() : this._isManyQuestions();
        // const is_multiple_choise = is_complex_multiple_choise ? this._hasMultipleChoiseComplex() : this._hasMultipleChoise();
        const is_multiple_choise = this._hasMultipleChoise();
        const array_bool = [is_many_questions, this._notHasQuestion(), is_multiple_choise];
        const id_method = Util.getId(array_bool)
        // console.log(id_method, METHODS[id_method])
        if (this.getIdMethods().includes(id_method)) return this.getMethods()[id_method];
        return '_buildDefault';
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

}

module.exports = BuildSBT;
