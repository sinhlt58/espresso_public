const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const BuildSBT = require('./build_sbt');

let dom = new JSDOM('<!doctype html><html><body></body></html>');
let document = dom.window.document;

let stringInnerHTML = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<h3 style="text-align: justify;"><strong>I. ĐỌC HIỂU (3 điểm)</strong></h3>
<p style="text-align: justify;"><strong>Đọc văn bản sau và trả lời câu hỏi:</strong></p>
<p style="text-align: justify;">&nbsp; &nbsp; &nbsp;“Một đại gia đình gồm hai con trai, hai con dâu, một gái, một rể và những đứa con của họ vẫn sống chung dưới một mái nhà, ăn chung một bếp ăn. Thiên hạ thì chia ra, bà cụ lại gom vào. Vẫn rất êm thấm mới lạ chứ. Nếp nhà đã thắng được tự do của cá nhân sao? Phải nói thêm, cái nếp nhà này cũng ít ai theo kịp. Người con dâu cả vốn là con gái Hàng Bồ, đỗ đại học, là một cô gái kiêu hãnh, tự tin, không dễ nhân nhượng. Ai cũng nghĩ hai người đàn bà, một già một trẻ, cùng sắc sảo sẽ rất khó chấp nhận nhau. Vậy mà họ ăn ở với nhau đã mười lăm năm chả có điều tiếng gì. Người chị của cô con dâu đến nói với bà cô tôi: “Bác chịu được tính nó thì con cũng phục thật đấy”. Bà cải chính: “Đúng là tôi có phần phải chịu nó nhưng nó cũng có phần phải chịu tôi, mỗi bên chịu một nửa”…</p>
<p style="text-align: justify;">[…] Năm ngoái khu phố có yêu cầu bà cụ báo cáo về nếp sống gia đình cho hàng phố học tập. Bà từ chối, khi tôi lại thăm, bà nói riêng: “Cái chuyện ấy ai cũng biết cả, chỉ khó học thôi”. Tôi cười: “Lại khó đến thế sao”? Bà cụ nói: “Trong nhà này, ba đời nay, không một ai biết tới câu mày, câu tao. Anh có học được không”? À, thế thì khó thật. Theo bà cụ, thời bây giờ có được vài trăm cây vàng không phải là khó, cũng không phải là lâu, nhưng có được một gia đình hạnh phúc phải mất vài đời người, phải được giáo dục vài đời. Hạnh phúc không bao giờ là món quà tặng bất ngờ, không thể đi tìm, mà cũng không nên cầu xin. Nó là cách sống, một quan niệm sống, là nếp nhà, ở trong tay mình, nhưng nhận được ra nó, có ý thức vun trồng nó, lại hoàn toàn không dễ.”</p>
<p style="text-align: right;">(Trích <em>Nếp nhà </em>– Nguyễn Khải, dẫn theo <em>Tuyển tập Nguyễn Khải</em>, tập III, NXB Văn học, 1996)</p>
<p style="text-align: justify;"><strong>Câu 1 </strong><em>(0,5 điểm)</em>: Xác định phương thức biểu đạt chính của văn bản?</p>
<p style="text-align: justify;"><strong>Câu 2 </strong><em>(1,0 điểm)</em>: Nội dung chính của đoạn trích trên?</p>
<p style="text-align: justify;"><strong>Câu 3 </strong><em>(1,0 điểm)</em>: Cuộc sống của gia đình <em>“bà cô tôi” </em>có gì đặc biệt? Anh (chị) nhận xét như thế nào về “nếp nhà” ấy?</p>
<p style="text-align: justify;"><strong>Câu 4 </strong><em>(0,5 điểm)</em>: Anh (chị) có đồng tình với quan điểm <em>hạnh phúc </em>của nhân vật <em>“bà cô tôi” </em>ở đoạn trích trên không? Vì sao?</p>
<h4>II. PHẦN LÀM VĂN (7,0 điểm)</h4>
<h4><strong>Câu 1: (2,0 điểm)</strong></h4>
<p style="text-align: justify;">&nbsp; &nbsp; &nbsp;Từ nội dung văn bản phần Đọc hiểu, anh/chị hãy viết một đoạn văn ngắn (khoảng 200 chữ) trình bày quan điểm của anh (chị) về <em>hạnh phúc.</em><em></em></p>
<p><strong>Câu 2: (5,0 điểm)</strong></p>
<p style="text-align: justify;">&nbsp; &nbsp; &nbsp; Phân tích giá trị nhân đạo trong tác phẩm <em>“Chiếc thuyền ngoài xa” </em>của nhà văn Nguyễn Minh Châu.</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong><strong>I. ĐỌC HIỂU (3 điểm)</strong></strong></p>
<p style="text-align: justify;"><strong>Câu 1.&nbsp;</strong>Xác định phương thức biểu đạt chính của văn bản là Tự sự.</p>
<p style="text-align: justify;"><strong>Câu 2.&nbsp;</strong></p>
<p class="TableParagraph" style="text-align: justify;">Nội dung chính của đoạn trích trên:</p>
<p class="TableParagraph" style="text-align: justify;">-&nbsp;&nbsp; Cuộc sống – nếp nhà của gia đình “bà cô tôi”. Đó là cuộc sống của một gia đình nhiều thế hệ, tôn trọng và yêu thương lẫn nhau .Đồng thời cũng là nề nếp gia đình, là văn hóa ứng xử để tạo nền tảng một gia đình hạnh phúc .</p>
<p class="TableParagraph" style="text-align: justify;"><strong>Câu 3</strong></p>
<p class="TableParagraph" style="text-align: justify;">Nội dung chính của đoạn trích trên:</p>
<p class="TableParagraph" style="text-align: justify;">-&nbsp; Cuộc sống – nếp nhà của gia đình “bà cô tôi”. Đó là cuộc sống của một gia đình nhiều thế hệ, tôn trọng và yêu thương lẫn nhau&nbsp;</p>
<p class="TableParagraph" style="text-align: justify;">- Đồng thời cũng là nề nếp gia đình, là văn hóa ứng xử để tạo nền tảng một gia đình hạnh phúc&nbsp;<strong><br></strong></p>
<p class="TableParagraph" style="text-align: justify;"><strong>Câu 4</strong></p>
<p class="TableParagraph" style="text-align: justify;">Trình bày được suy nghĩ riêng của mình theo hướng làm rõ và khẳng định hoặc phủ định ý kiến “<em>Hạnh phúc không bao giờ là món quà tặng bất ngờ, không thể đi tìm, mà cũng không nên cầu xin. Nó là cách sống, một quan niệm sống, là nếp nhà, ở trong tay mình, nhưng nhận được ra nó, có ý thức vun trồng nó, lại hoàn toàn không dễ.”</em></p>
<p class="TableParagraph" style="text-align: justify;">-&nbsp;&nbsp;&nbsp; Nếu lập luận theo hướng khẳng định ý kiến trên là đúng, học sinh cần nhấn mạnh: Hạnh phúc cần được vun trồng từ bàn tay của những người biết trân quý, nâng niu hạnh phúc. Hạnh phúc cá nhân không thể tách rời nếp nhà. Và để hạnh phúc của mỗi gia đình được trọn vẹn, mỗi người phải biết “chịu” nhau một chút. Hạnh phúc được ươm mầm, chắc chiu mỗi ngày, mỗi người; hạnh phúc không dễ tìm cũng không thể cầu xin.</p>
<p class="TableParagraph" style="text-align: justify;">-&nbsp;&nbsp; Nếu lập luận theo hướng phủ định ý kiến trên là đúng, học sinh cần nhấn mạnh: Cuộc sống muôn hình vạn trạng nên sắc màu của hạnh phúc cũng thật phong phú, đa dạng.</p>
<p class="TableParagraph" style="text-align: justify;">Nếu lập luận cả theo hướng vừa khẳng định vừa phủ định ý kiến thì cần kết hợp cả hai nội dung.<strong><br></strong></p>
<p class="TableParagraph" style="text-align: justify;"><strong><strong><span>II. PHẦN LÀM VĂN (7,0 điểm)</span></strong><br></strong></p>
<p class="TableParagraph" style="text-align: justify;"><strong>Câu 1</strong></p>
<p class="TableParagraph" style="text-align: justify;">a. Mở đoạn: nêu vấn đề cần nghị luận: quan điểm về hạnh phúc</p>
<p class="TableParagraph" style="text-align: justify;">b.Thân đoạn:</p>
<p class="TableParagraph" style="text-align: justify;">- Giải thích khái niệm hạnh phúc:</p>
<p class="TableParagraph" style="text-align: justify;">Hạnh phúc là một trạng thái cảm xúc của con người khi được thỏa mãn một nhu cầu nào đó mang tính trừu tượng. Hạnh phúc là một cảm xúc bậc cao, được cho rằng chỉ có ở loài người, nó mang tính nhân bản sâu sắc và thường chịu tác động của lí trí.</p>
<p class="TableParagraph" style="text-align: justify;">- Trình bày quan điểm hạnh phúc của bản thân: thế nào là hạnh phúc, làm thế nào để tạo hạnh phúc và giữ gìn hạnh phúc?</p>
<p class="TableParagraph" style="text-align: justify;">+ Tạo ra hạnh phúc bằng cách trân trọng những gì bản thân đang có. Sống tích cực, có ý nghĩa; mang lại niềm vui hạnh phúc cho bản thân, gia đình và những người xung quanh.</p>
<p class="TableParagraph" style="text-align: justify;">+ Giữ hạnh phúc giống như trồng một cái cây cần được vun trồng, chăm sóc mỗi ngày. Cây hạnh phúc đó cũng chính là cây đời của mỗi người. Khi ta hạnh phúc, đời ta sẽ tỏa hương hoa.</p>
<p class="TableParagraph" style="text-align: justify;">-&nbsp;&nbsp; Bàn bạc mở rộng.</p>
<p class="TableParagraph" style="text-align: justify;">-&nbsp;&nbsp; Nêu bài học nhận thức và hành động.</p>
<p class="TableParagraph" style="text-align: justify;">c.Kết đoạn: Khẳng định giá trị và ý nghĩa của hạnh phúc đối với mỗi người, mỗi nhà.<strong><br></strong></p>
<p class="TableParagraph" style="text-align: justify;"><strong>Câu 2</strong></p>
<p class="TableParagraph" style="text-align: justify;">Phân tích giá trị nhân đạo trong tác phẩm <em>“Chiếc thuyền ngoài xa” </em>của nhà văn Nguyễn Minh Châu.</p>
<p class="TableParagraph" style="text-align: justify;">a.Mở bài:<strong>&nbsp;</strong>Giới thiệu khái quát về tác giả Nguyễn Minh Châu, tác phẩm “<em>Chiếc thuyền ngoài xa”</em>, nội dung vấn đề.</p>
<p class="TableParagraph" style="text-align: justify;">Triển khai vấn đề nghị luận thành các luận điểm phù hợp; thể hiện được cảm nhận sâu sắc và các luận điểm được triển khai theo trình tự hợp lý, có sự liên kết chặt chẽ; vận dụng tốt các thao tác lập luận (trong đó phải có thao tác phân tích); kết hợp chặt chẽ giữa lý lẽ và đưa dẫn chứng.</p>
<p class="TableParagraph" style="text-align: justify;">b. Thân bài</p>
<p class="TableParagraph" style="text-align: justify;">Cần trình bày các ý sau:</p>
<p class="TableParagraph" style="text-align: justify;">1. Bày tỏ tình yêu thương, sự cảm thông với cuộc sống lam lũ, nghèo khó, bất hạnh của những người dân vùng biển:</p>
<p class="TableParagraph" style="text-align: justify;">- Cuộc sống nghèo khổ, bấp bênh của gia đình hàng chài: đông con, không gian sinh sống chật hẹp, cả gia đình chỉ có chiếc thuyền để mưu sinh.</p>
<p class="TableParagraph" style="text-align: justify;">- Những con người bất hạnh, đáng thương:</p>
<p class="TableParagraph" style="text-align: justify;">+ Người đàn bà hàng chài:</p>
<p class="TableParagraph" style="text-align: justify;">Ngoại hình.</p>
<p class="TableParagraph" style="text-align: justify;">Bị hành hạ về thể xác. Bị giày vò về tinh thần.</p>
<p class="TableParagraph" style="text-align: justify;">+ Người đàn ông: bị tha hóa vì hoàn cảnh.</p>
<p class="TableParagraph" style="text-align: justify;">+ Chị em thằng Phác: bất hạnh, đau khổ khi chứng kiến cảnh cha đánh mẹ thường xuyên.</p>
<p class="TableParagraph" style="text-align: justify;">2. Phát hiện ra phẩm chất tốt đẹp ở con người:</p>
<p class="TableParagraph" style="text-align: justify;">- Ca ngợi tình mẫu tử thiêng liêng, cao đẹp.</p>
<p class="TableParagraph" style="text-align: justify;">+ Người mẹ sống vì con (dẫn chứng và phân tích).</p>
<p class="TableParagraph" style="text-align: justify;">+ Chị em thằng Phác: yêu thương mẹ thể hiện qua hành động (dẫn chứng + pt).</p>
<p class="TableParagraph" style="text-align: justify;">- Vẻ đẹp tâm hồn người đàn bà hàng chài: sâu sắc, có cái nhìn toàn diện, thấu hiểu lẽ đời và biết chắt chiu hạnh phúc đời thường vẻ đẹp của người phụ nữ VN nhân hậu, bao dung, giàu lòng vị tha và đức hy sinh (dẫn chứng + pt).</p>
<p class="TableParagraph" style="text-align: justify;">3. Lên án tình trạng bạo lực trong gia đình:</p>
<p class="TableParagraph" style="text-align: justify;">- Phê phán người đàn ông hàng chài cho mình có cái quyền đánh đâp vợ để giải tỏa những bế tắc trong cuộc sống.</p>
<p class="TableParagraph" style="text-align: justify;">- Từ tình trạng bạo lực này, tác giả bày tỏ những lo âu, trăn trở về hiện thực cuộc đời:</p>
<p class="TableParagraph" style="text-align: justify;">+ Tình trạng phụ nữ và trẻ em bị ngược đãi.</p>
<p class="TableParagraph" style="text-align: justify;">+ Nguy cơ trẻ em sẽ sớm nhiễm thói vũ phu, thô bạo do bị tổn thương tâm hồn, đánh mất niềm tin trong cuộc sống.</p>
<p class="TableParagraph" style="text-align: justify;">+ Nguy cơ: nếu không giải phóng con người khỏi đói nghèo, tăm tối thì không thể tiêu diệt được cái ác.</p>
<p class="TableParagraph" style="text-align: justify;">+ Cuộc chiến bảo vệ nhân tính, thiên lương và vẻ đẹp tâm hồn con người không kém phần khó khăn, gian khổ.</p>
<p class="TableParagraph" style="text-align: justify;">4. Đặt ra suy nghĩ: làm thế nào để cuộc sống con người tốt đẹp hơn ?</p>
<p class="TableParagraph" style="text-align: justify;">c. Kết bài</p>
<p class="TableParagraph" style="text-align: justify;">Đánh giá</p>
<p class="TableParagraph" style="text-align: justify;">- Nội dung: Tấm lòng của nhà văn đối với cuộc sống con người, trăn trở, băn khoăn, day dứt về một cuộc sống tốt đẹp hơn.</p>
<p class="TableParagraph" style="text-align: justify;">- Nghệ thuật:</p>
<p class="TableParagraph" style="text-align: justify;">+ Tình huống truyện độc đáo, có ý nghĩa khám phá, phát hiện về đời sống.</p>
<p class="TableParagraph" style="text-align: justify;">+ Tác giả lựa chọn ngôi kể, điểm nhìn thích hợp,làm cho câu chuyện trở nên gần gũi, chân thực và có sức thuyết phục.</p>
<p class="TableParagraph" style="text-align: justify;">+ Ngôn ngữ nhân vật sinh động, phù hợp với tính cách. Lời văn giản dị mà sâu sắc, đa nghĩa.</p>
<p class="TableParagraph" style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`

let text = "test"
// let book = "văn";
let book = "toán";
let buildSBT = new BuildSBT(document, null);
buildSBT.init(stringInnerHTML, text, book)

// buildSBT.buildDetail(true);
buildSBT._buildNormals();
document.body.appendChild(buildSBT.getElement());
fs.writeFile('test_sbt.html', dom.serialize(), err => {
    console.log('done: test_sbt');
});
