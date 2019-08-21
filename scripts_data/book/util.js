const REGEX_CHARECTER = /[A-Z]/g;
const REGEX_INLINE_TAG = /<code>|<em>|<i>|<q>|<sub>|<sup>|<u>/;

// ngang hay dọc | đáp án cùng ô hay không
const TYPE_TABLES = {
  "00": "_getVerticalDifferent",
  "01": "_getVerticalSame",
  "10": "_getHorizontalDifferent",
  "11": "_getHorizontalSame"
}
const ID_TABLES = Object.keys(TYPE_TABLES);

module.exports = {

  cleanRedundantString: cleanRedundantString,
  cleanRedundantNode: cleanRedundantNode,
  shiftDivElement: shiftDivElement,
  shiftBrElement: shiftBrElement,
  cleanString: cleanString,

  hasMultipleChoise: hasMultipleChoise,
  isManyQuestions: isManyQuestions,
  notHasQuestion: notHasQuestion,

  getId: getId,
  cloneNodeElement: cloneNodeElement,
  convertPlanToNumber: convertPlanToNumber,
  getInnerTextWithInlineTag: getInnerTextWithInlineTag,

  checkMultipleSlaveAnswer: checkMultipleSlaveAnswer,
  getAnswerPlans: getAnswerPlans,
  getAnswerMultipleChoise: getAnswerMultipleChoise,

  getStartIndexQuestion: getStartIndexQuestion,
  getStartIndexAnswer: getStartIndexAnswer,
  getStartIndexAnswerBySelector: getStartIndexAnswerBySelector,
  getStartIndexAnswerOneQuestion: getStartIndexAnswerOneQuestion,
  getStartIndexAnswerPlan: getStartIndexAnswerPlan,

  insertQuestionNormal: insertQuestionNormal,
  insertQuestionMultipleChoise: insertQuestionMultipleChoise,
  insertTitlePart: insertTitlePart,
  insertAnswerDetail: insertAnswerDetail,

}

function getId(array_bool) {
  let id_method = "";
  for (let index = 0; index < array_bool.length; index++) {
    const number = array_bool[index] ? 1 : 0;
    id_method += number;
  }
}

/**
 * Xóa hoặc thay thế các từ không cần thiết
 * @param {[{from: Number, to: Number}]} replaces
 * @param {String} inputString
 */
function cleanRedundantString(replaces, inputString) {
  for (let index = 0; index < replaces.length; index++) {
    inputString = inputString.replace(replaces[index].from, replaces[index].to)
  }
  return inputString;
}

/**
* Xóa các node không cần thiết
*/
function cleanRedundantNode(element, selectors) {
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
function shiftDivElement(element) {
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
function shiftBrElement(element, document) {
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
function cleanString(element, selectors) {
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

/**
 * kiểm tra xem có trắc nghiệm hay không
 * @param {*} inputString
 * @param {*} regex_answer
 */
function hasMultipleChoise(inputString, regex_answer) {
  const answers_matched = inputString.match(regex_answer)
  if (answers_matched == null || answers_matched.length == 1) return false;
  let answer = {}
  for (let i = 0; i < answers_matched.length; i++) {
    let answer_text = answers_matched[i].match(REGEX_CHARECTER)[0]
    if (!answer[answer_text]) answer[answer_text] = 1;
    else answer[answer_text]++;
    if (Object.keys(answer).length >= 2) return true;
  }
  return false;
}

/**
 * Check xem có phải sách có sự phức tạp phân biệt giữa phần và câu hay không
 * @param {*} book
 * @param {*} list_book_complex
 */
function isComplexPartQuestion(book, list_book_complex) {
  const book_name = book.toLowerCase();
  for (let i = 0; i < list_book_complex.length; i++) {
    if (!book_name.includes(list_book_complex[i])) continue;
    return true;
  }
  return false
}


/**
 * Có nhiều câu hay không
 * @param {*} inputString
 * @param {*} question_labels
 * @param {*} regex_string_after
 */
function isManyQuestions(inputString, question_labels, regex_string_after) {
  for (let index = 0; index < question_labels.length; index++) {
    const question_label = question_labels[index];
    // bat truong hop <strong>Câu&nbsp;&nbsp;</strong>12
    const regex = new RegExp(question_label + regex_string_after, 'g');
    const questions = inputString.match(regex);
    if (questions && questions.length >= 2) return true;
  }
  return false;
}

// function isManyQuestionsComplex() {
//   let count_part = 0;
//   for (let index = 0; index < PARTS.length; index++) {
//       const PART = PARTS[index];
//       for (let i = 0; i < PART.length; i++) {
//           const part = PART[i];
//           const regex = new RegExp('(?<!' + REGEX_PART + ')' + part + '(?!' + REGEX_PART + ')', 'g')
//           if (this.string_inner_html.search(regex) <= -1) continue;
//           count_part++;
//           break;
//       }
//       if (count_part >= 2) break;
//   }
//   return this._isManyQuestions() && count_part >= 2;
// }

/**
 * Có phần chữ 'đề bài' ngay lúc đầu hay không
 * @param {*} element
 * @param {*} selector
 */
function notHasQuestion(element, selector) {
  const questionTitle = element.querySelector(selector);
  if (questionTitle) return false;
  return true;
}

/**
 * Clone node ở vị trí cho trước
 * @param {HTMLElement} element
 * @param {*} position: vị trí của node được clone trong element gốc
 */
function cloneNodeElement(element, position) {
  return element.children[position].cloneNode(true);
}

/**
 * Chuyển đáp án A, B, C, D, .. về số 1, 2, 3, ...
 * @param {*} plan
 */
function convertPlanToNumber(plan) {
  if (plan.length > 1) {
    let valid_plan = plan.match(REGEX_CHARECTER);
    plan = valid_plan[0]
  }
  return plan.charCodeAt(0) - 64;
}

/**
 *
 * @param {*} element
 * @param {*} is_plan_text
 */
function getInnerTextWithInlineTag(element, is_plan_text) {
  let innerHtml = element.innerHTML;
  if (innerHtml.search(REGEX_INLINE_TAG) < 0) return element.textContent;
  return getInnerTextWithSubInlineTag(element, "", is_plan_text);
}

/**
 *
 * @param {*} element
 * @param {*} text
 * @param {*} is_plan_text
 */
function getInnerTextWithSubInlineTag(element, text, is_plan_text) {
  for (let index = 0; index < element.childNodes.length; index++) {
    const child_node = element.childNodes[index];
    const name = child_node.nodeName;
    if (
      (!is_plan_text && (name == "CODE" || name == "EM" || name == "I" || name == "Q" || name == "SUB" || name == "SUP" || name == "U"))
      // do truong truong hop <u>B.</u> la dap dan nen phai dung cach nay
      || (is_plan_text && (name == "SUB" || name == "SUP"))
    ) {
      text += child_node.outerHTML;
    } else {
      let innerHtml = child_node.innerHTML;
      if (innerHtml != undefined && innerHtml.search(REGEX_INLINE_TAG) > -1) {
        text += getInnerTextWithSubInlineTag(child_node, "", is_plan_text)
      } else {
        text += child_node.textContent;
      }
    }

  }
  return text;
}

/**
 *
 * @param {*} text
 * @param {*} slave_answer_labels
 */
function checkSlaveAnswer(text, slave_answer_labels) {
  for (let index = 0; index < slave_answer_labels.length; index++) {
    const slave_answer_label = slave_answer_labels[index];
    // const regex = new RegExp(slave_answer_label + '.{0,1}$', 'g')
    const regex = new RegExp(slave_answer_label, 'g')
    if (text.search(regex) == 0) return true;
  }
  return false;
}

/**
 *
 * @param {*} element
 * @param {*} start_index
 * @param {*} end_index
 * @param {*} slave_answer_labels
 */
function checkMultipleSlaveAnswer(element, start_index, end_index, slave_answer_labels) {
  let count = 0;
  for (let index = start_index; index < end_index; index++) {
    let text = element.children[index].textContent;
    if (text == null || text == undefined) continue;
    text = text.trim().toLowerCase();
    if (checkSlaveAnswer(text, slave_answer_labels)) {
      count++;
    }
    if (count >= 2) return true;
  }
  return false;
}

// can phat trien them
/**
 * Lấy các phương án trả lời của phần trắc nghiệm
 * @param {*} element
 * @param {*} start_index: vị trí bắt đầu
 * @param {*} end_index: vị trí kết thúc + 1
 */
function getAnswerPlans(element, start_index, end_index, regex_answer) {
  const tmp_answer_plans = [];
  let last_index = end_index;
  for (let index = start_index; index < end_index; index++) {
    let text = getInnerTextWithInlineTag(element.children[index], true)
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
      let charecter = tmp_text[i]
      if (charecter == "{" || charecter == "}" || (charecter == "\/" && i > 0 && tmp_text[i - 1] != "\\") || (charecter == "/" && i == 0)) {
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
    const key_slot1 = slot1.key.match(REGEX_CHARECTER)[0]
    const key_slot2 = slot2.key.match(REGEX_CHARECTER)[0]
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
 * Lấy phương án đúng của câu trắc nghiệm mà không có bảng đáp án
 * đầu tiên sẽ tìm kiếm sự xuất hiện của các từ 'chọn, đúng' trong câu
 * nếu sau lần thứ nhất không tìm thấy sẽ tìm kiếm lần thứ 2 mà không có các từ đó
 * @param {*} element
 * @param {*} start_index: vị trí bắt đầu
 * @param {*} end_index: vị trí kết thúc + 1
 */
function getAnswerMultipleChoise(element, start_index, end_index, list_answer_levels, regex_answer_in_senctence) {
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
        key: convertPlanToNumber(answers[0]),
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
* Tạo các phương án trả lời trắc nghiệm
* @param {*} answer_plans
* @param {*} answer
*/
function createAnswerPlanText(answer_plans, answer) {
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

/**
 * Vị trí của phần chữ 'đề bài'
 */
function getStartIndexQuestion(element, selector) {
  return getIndexQnABySelector(element, selector, -1);
}

/**
 * Vị trí của phần bắt đầu trả lời
 */
function getStartIndexAnswer(element, slave_answer_labels, selector) {
  let fist_find = -1;
  if (selector) {
    fist_find = getIndexQnABySelector(element, selector, - 1);
  }
  // nếu không tìm thấy, sẽ xét các trường hợp phụ
  if (fist_find == -1) {
    for (let index = 0; index < element.children.length; index++) {
      let text = element.children[index].textContent;
      if (text == null || text == undefined) continue;
      text = text.trim().toLowerCase();
      // do 'giai' thuoc 2 uni-code khac nhau nen can co 2 regex
      if (checkSlaveAnswer(text, slave_answer_labels)) {
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
 * Vị trí của phần bắt đầu trả lời
 */
function getStartIndexAnswerBySelector(element, selector) {
  return getIndexQnABySelector(element, selector, - 1);
}

/**
 * Vị trí của phần bắt đầu trả lời
 */
function getStartIndexAnswerOneQuestion(element, slave_answer_labels, start_index, end_index, default_value) {
  for (let index = start_index; index < end_index; index++) {
    let text = element.children[index].textContent;
    if (text == null || text == undefined) continue;
    text = text.trim().toLowerCase();
    // do 'giai' thuoc 2 uni-code khac nhau nen can co 2 regex
    if (checkSlaveAnswer(text, slave_answer_labels)) {
      return index;
    }
  }
  return default_value;
}

/**
 * Lấy vị trí theo selector
 * @param {*} element
 * @param {*} selector: jquery selector
 * @param {*} default_value: giá trị mặc định
 */
function getIndexQnABySelector(element, selector, default_value) {
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
 * Lấy vị trí của phần bắt đầu các phương án trắc nghiệm
 * @param {*} element
 * @param {*} start_index: vị trí bắt đầu tìm kiếm
 * @param {*} end_index: vị trí kết thúc tìm kiếm + 1
 * @param {*} default_value: giá trị mặc định
 */
function getStartIndexAnswerPlan(element, start_index, end_index, default_value, regex_answer) {
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

/**
 * Kiểm tra có phải bảng với thứ tự theo chiều ngang hay không
 * @param {*} tbody
 * @param {*} cell_start
 */
function isHorizontal(tbody, cell_start, regex_number) {
  const tr = tbody.children[cell_start.y];
  if (tr.children.length > 1) {

    const td_first = tr.children[cell_start.x];
    const td_second = tr.children[cell_start.x + 1];
    const text_first = td_first.textContent;
    const text_second = td_second.textContent;//textconten undefind

    if (!text_first || !text_second) return false;

    const number_first = text_first.match(regex_number);
    const number_second = text_second.match(regex_number);

    if (number_first == number_second - 1) return true;

  }
  return false;
}

/**
 * Kiểm tra có phải bảng với đáp án và câu cung 1 ô hay không
 * @param {*} tbody
 * @param {*} cell_start
 */
function isSameCell(tbody, cell_start, regex_number) {
  const tr = tbody.children[cell_start.y];

  const td = tr.children[cell_start.x];
  const text = td.textContent;

  if (!text) return false;

  const number = text.match(regex_number);
  const character = text.match(REGEX_CHARECTER);

  if (number && character) return true;

  return false;
}

/**
 * Lấy câu trả lời từ bảng
 * @param {*} start_index
 * @param {*} end_index
 */
function getAnswerTable(element, regex_answer, start_index, end_index) {
  const all_table = element.getElementsByTagName("table");
  if (!all_table) return null;
  if (all_table.length > 1) {
    for (let index = 0; index < all_table.length; index++) {
      const start_tabel = Array.from(element.children).indexOf(all_table[index]);
      if (start_tabel < start_index || start_tabel >= end_index) continue;
      const answers = all_table[index].textContent.match(regex_answer);
      // do co 1 so truong hop dap an khong du het A, B, C, D nen lay it nhat 2 dap an
      if (answers != null && answers.length >= 2) {
        return all_table[index];
      }
    }
  } else if (all_table.length == 1) {
    const start_tabel = Array.from(element.children).indexOf(all_table[0]);
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
function getAnswerMultipleChoises(element, regex_answer, start_index, end_index, is_one) {
  const table = getAnswerTable(element, regex_answer, start_index, end_index);
  // do da tach nen can bo is_one di
  if (!table && is_one) return getNoneTableWithOneQuestion(start_index, end_index);
  if (!table && !is_one) return getNoneTableWithManyQuestions(start_index, end_index);
  // if (!table && !is_one) return;

  const tbody = table.querySelector("tbody");

  const cell_start = getStartCellAnwserInTable(tbody);
  if (!cell_start) return;

  const name_method = getTypeTable(tbody, cell_start);
  return this[name_method](tbody, cell_start);
}

/**
 * Lấy vị trí ô bắt đầu trả lời
 * @param {*} tbody
 */
function getStartCellAnwserInTable(tbody, regex_number) {
  for (let y = 0; y < tbody.children.length; y++) {
    const tr = tbody.children[y];
    for (let x = 0; x < tr.children.length; x++) {
      const td = tr.children[x];
      const text = td.textContent;
      if (text == null || text == undefined) continue;
      const number = text.match(regex_number);
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
function getVerticalSame(tbody, cell_start) {
  return getSameCell(tbody, cell_start);
}

/**
 * Lấy đáp án theo chiều ngang cùng ô
 * @param {*} tbody
 * @param {*} cell_start
 */
function getHorizontalSame(tbody, cell_start) {
  return getSameCell(tbody, cell_start);
}

/**
 * Lấy đáp án theo chiều ngang khác ô
 * @param {*} tbody
 * @param {*} cell_start
 */
function getHorizontalDifferent(tbody, cell_start, regex_number) {
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

        const number = text_question.match(regex_number);
        const character = text_second.match(REGEX_CHARECTER);

        // do number va charecter o day la array nen can truy cap vao phan tu 0 voi character
        // su dung mang dap an de bat truong hop co phan co ban va phan nang cao
        if (number && character) {

          let answer = character[0];
          let tmp_answer = convertPlanToNumber(answer);
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
function getVerticalDifferent(tbody, cell_start, regex_number) {
  let array_answers = {};
  for (let y = cell_start.y; y < tbody.children.length; y++) {
    const tr = tbody.children[y];
    for (let x = cell_start.x; x < tr.children.length; x += 2) {
      try {
        const td_question = tr.children[x];
        const text_question = td_question.textContent;

        const td_anwser = tr.children[x + 1];
        const text_second = td_anwser.textContent;

        const number = text_question.match(regex_number);
        const character = text_second.match(REGEX_CHARECTER);

        // do number va charecter o day la array nen can truy cap vao phan tu 0 voi character
        // su dung mang dap an de bat truong hop co phan co ban va phan nang cao
        if (number && character) {

          let answer = character[0];
          let tmp_answer = convertPlanToNumber(answer);
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
function getSameCell(tbody, cell_start, regex_number) {
  let array_answers = {};
  for (let y = cell_start.y; y < tbody.children.length; y++) {
    const tr = tbody.children[y];
    for (let x = cell_start.x; x < tr.children.length; x++) {
      const td = tr.children[x];
      const text = td.textContent;

      if (!text) continue;

      const number = text.match(regex_number);
      const character = text.match(REGEX_CHARECTER);

      // do number va charecter o day la array nen can truy cap vao phan tu 0 voi character
      // su dung mang dap an de bat truong hop co phan co ban va phan nang cao
      if (number && character) {

        let answer = character[0];
        let tmp_answer = convertPlanToNumber(answer);
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
function getNoneTableWithOneQuestion(start_index, end_index) {
  let answer = getAnswerMultipleChoise(start_index, end_index);
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
 * Lấy đáp án khi không có bảng
 * @param {*} start_index
 * @param {*} end_index
 */
function getNoneTableWithManyQuestions(start_index, end_index) {
  const answer_questions = getAllStartQuestions(start_index, end_index);
  const answer_questions_keys = Object.keys(answer_questions)
  let answers = {};
  for (let index = 0; index < answer_questions_keys.length; index++) {
    const key = answer_questions_keys[index];
    const answer_question = answer_questions[key];
    let answer = getAnswerMultipleChoise(answer_question.from, answer_question.to);
    if (answer.key) {
      answers[key] = {
        key: answer.key,
        index: answer.index,
        position: answer.position,
        exist_after: answer_question.exist_after,
        key_root: answer.key_root
      }
    }
  }
  if (Object.keys(answers).length == 0)
    return {
      '1': { key: "" }
    };
  return answers;
}

/**
 * Lấy loại bảng
 * @param {*} tbody
 * @param {*} cell_start
 */
function getTypeTable(tbody, cell_start, regex_number) {
  const array_bool = [isHorizontal(tbody, cell_start, regex_number), isSameCell(tbody, cell_start, regex_number)];
  let id_type_table = "";
  for (let index = 0; index < array_bool.length; index++) {
    const number = array_bool[index] ? 1 : 0;
    id_type_table += number;
  }
  // console.log(id_type_table, TYPE_TABLES[id_type_table])
  if (ID_TABLES.includes(id_type_table)) return TYPE_TABLES[id_type_table];
  return '_getHorizontalSame';
}


/**
    * Lấy các phần trong bài
    * @param {*} start_index: vị trí bắt đầu
    * @param {*} end_index: vị trí kết thúc + 1
    */
function getAllPart(start_index, end_index) {
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
        const regex = new RegExp('(?<!' + REGEX_PART + ')' + part + '(?!' + REGEX_PART + ')', 'g')
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
function getAllStartQuestions(start_index, end_index) {
  let questions = {};
  for (let index = start_index; index < end_index; index++) {
    if (index < 0) continue;
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
function getAllStartAnswers(start_index, end_index, question_numbers) {
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
        const regex = new RegExp(question_label + ' ' + number + '(?!' + REGEX_NUMBER + ')', 'g');
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
function getStartPart(start_index, end_index, PART, default_value) {
  for (let index = start_index; index < end_index; index++) {
    let text = this.element.children[index].textContent;
    if (text == undefined || text == null) continue;
    text = text.trim();
    for (let i = 0; i < PART.length; i++) {
      const part = PART[i];
      const regex = new RegExp('(?<!' + REGEX_PART + ')' + part + '(?!' + REGEX_PART + ')', 'g')
      const find_index = text.search(regex)
      // gioi han trong khoan gan dau dong
      if (find_index < 0 || find_index > 3) continue;

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
function getFirstQuestionPart(start_index, end_index, default_value) {
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
function insertQuestionNormal(dom_element, start_index, end_index, is_h5_tag) {
  if (is_h5_tag) {
    let remember_spec = [];
    let has_first_line = false;
    let index_solution_method = end_index;
    for (let i = start_index; i < end_index; i++) {

      let child = cloneNodeElement(i);
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
    // khong them neu chi co 'phương pháp giải' ma khong co phan dang sau
    if (index_solution_method < end_index - 2) {
      for (let i = index_solution_method; i < end_index; i++) {
        dom_element.appendChild(this._cloneNodeElement(i));
      };
    }
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
function insertQuestionMultipleChoise(dom_element, start_index, end_index, is_h5_tag) {
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
      text = this._getInnerTextWithInlineTag(child);

      if (!has_first_line) {
        let text_node = this.document.createTextNode(text);
        let question_h5_element = this.document.createElement('h5');
        question_h5_element.appendChild(text_node);
        dom_element.appendChild(question_h5_element);
        has_first_line = true;
        continue;
      }

      dom_element.appendChild(child);
    };
    for (let i = 0; i < remember_spec.length; i++) {
      dom_element.appendChild(remember_spec[i]);
    };
  } else {
    for (let i = start_index; i < end_index; i++) {
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
function insertTitlePart(dom_element, start_question_part, start_first_question, has_param) {
  const text_part = this._cloneNodeElement(start_question_part).textContent;
  if (text_part.length > 100) {
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
      const text_param = this._getInnerTextWithInlineTag(this._cloneNodeElement(index));
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
function insertAnswerDetail(dom_element, start_answer, start_next_answer, switch_key_to_answer) {
  dom_element.appendChild(this._cloneNode(explain));
  let tmp_switch_key_to_answer = null;
  if (switch_key_to_answer && switch_key_to_answer.position == null)
    tmp_switch_key_to_answer = this._getAnswerMultipleChoise(start_answer, start_next_answer);
  let answer_node = null;
  if (switch_key_to_answer && switch_key_to_answer.key != null) {
    if (tmp_switch_key_to_answer != null) {
      switch_key_to_answer.position = tmp_switch_key_to_answer.position;
      switch_key_to_answer.index = tmp_switch_key_to_answer.index;
      switch_key_to_answer.key_root = tmp_switch_key_to_answer.key_root;
    }
    if (switch_key_to_answer.index != null) {
      let text = this._getInnerTextWithInlineTag(this.element.children[switch_key_to_answer.index]);
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
      dom_element.appendChild(answer_node);
    } else {
      dom_element.appendChild(this._cloneNodeElement(index));
    }
  }
}

/**
 * Tạo phần trắc nghiệm
 * @param {*} dom_element
 * @param {*} detail_part
 */
function createPartMultipleChose(
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

/**
 * Tạo phần không có câu trắc nghiệm
 * @param {*} dom_element
 * @param {*} detail_part
 */
function createPart(
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
function createAbstractPart(has_multiple_choise) {
  const result = this.document.createElement("div");
  const start_question = this._getStartIndexQuestion();
  const start_answer = this._getStartIndexAnswer();

  const all_parts = this._checkParts(start_question + 1, start_answer, has_multiple_choise)
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

  if (result.children.length > 0) this.element = result;
}

function createDetailParts(all_parts, start_question, start_answer, has_multiple_choise) {
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
 * Tạo phần trắc nghiệm
 * @param {*} dom_element
 * @param {*} detail_part
 * @param {*} has_part_titles
 * @param {*} has_param
 */
function createPartNoQuestionMultipleChose(
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
      if (last_index < start_answer - 2) {
        for (let i = last_index; i < start_answer; i++) {
          dom_element.appendChild(this._cloneNodeElement(i));
        }
      }

      if (answer_plans.length > 0) {
        const answer_plans_element = this.document.createElement("p");
        answer = this._getAnswerMultipleChoise(start_answer, start_next_question);
        const answer_plans_text = this._createAnswerPlanText(answer_plans, answer.key);
        if (answer.key != null) {
          answer.key = answer_plans[answer.key - 1]
        } else {
          let log = "Warning at book: " + this.book + ", title: " + this.question_default + ", question does not has answer ,method: " + this._getBuildMethod()
          console.log(log);
          this.logger.warn(log);
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
function createPartNoQuestion(
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

function checkParts(start_index, end_index, has_multiple_choise) {
  let all_parts = this._getAllPart(start_index, end_index);
  // bat truong hop thieu phan I ma chi co phan II trong de bai
  if (all_parts.length == 1 && all_parts[0] == 1) {
    all_parts = [0, 1]
  }

  // ngan khong cho nhieu hon 3 phan, va khong cho chi co 1 phan ( tuc la trong de bai co loi)
  if ((!has_multiple_choise && all_parts.length > 3) || all_parts.length == 1) {
    let log = "Error at book: " + this.book + ", title: " + this.question_default + ", error part: " + all_parts.length + ", method: " + this._getBuildMethod()
    console.log(log);
    this.logger.error(log);
    this._buildDefault();
    return null;
  }

  return all_parts;
}

function createDetailPartsNoquestion(all_parts, start_index, has_multiple_choise) {
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

function createAbstractPartNoQuestion(has_multiple_choise) {
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
