const Build = require('./build')


class BuildEnglish extends Build {
    init(string_inner_html, question_default, title, book) {

        this._element = this._document.createElement("div");

        this._string_inner_html = string_inner_html
        this._question_default = question_default;
        this._title = title;
        this._book = book;

        try {
            this._cleanRedundantString()
            this._element.innerHTML = this._string_inner_html;
            this._cleanRedundantNode();
            // this._standardizedStructElement()
            this._string_inner_html = this._element.innerHTML;

            this._abstract_problem_index = this._findStartAbstractProblem();
            this._abstract_solution_index = this._findStartAbstractSolution();

            if (this._tree) delete this._tree
            if (this._root_problem) delete this._root_problem;
            if (this._root_solution) delete this._root_solution;
            if (this._index_unexported) delete this._index_unexported;
            if (this._result) delete this._result;

            this._index_unexported = [];
            this._is_siblings_same_type = true;
            this._is_all_have_solution = true;
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
        }

        this._root_problem.all(node => {
            console.log(" ".repeat(node.getPath().length * 2) + node.model.text,
                node.model.indexs, node.model.sub_indexs, node.model.plan_indexs,
                node.model.solution_indexs, node.model.solution_detail_indexs,
                node.model.group, node.model.label, node.model.type, node.model.is_merge_wrong, node.model.answer, node.model.tag)
        })
        // if (this._root_solution) {
        //     console.log('\n')
        //     this._root_solution.all(node => {
        //         console.log(" ".repeat(node.getPath().length * 2) + node.model.text,
        //             node.model.indexs, node.model.sub_indexs, node.model.plan_indexs,
        //             node.model.solution_indexs, node.model.solution_detail_indexs,
        //             node.model.group, node.model.label, node.model.type)
        //     })
        // }
        // console.log(this._index_unexported, this._is_siblings_same_type, this._is_all_have_solution)
        console.log(this._result.innerHTML)
    }

}

module.exports = BuildEnglish;