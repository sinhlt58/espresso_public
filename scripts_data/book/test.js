
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const DetailSection = require('./detailSection');

let dom = new JSDOM('<!doctype html><html><body></body></html>');
let document = dom.window.document;

let normal =`<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;"><em>“Vợ chồng A Phủ” </em>của Tô Hoài và <em>“Vợ nhặt” </em>của Kim Lân là hai truyện ngắn đều viết về số phận và vẻ đẹp tâm hồn của người lao động.</p>
<p style="text-align: justify;"><strong>Em hãy phân tích hai truyện ngắn trên trong mối quan hệ đối sánh để nêu bật đặc sắc riêng của từng tác phẩm.</strong></p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong>1.&nbsp;</strong><strong>GIỚI THIỆU CHUNG:&nbsp;</strong></p>
<p style="text-align: justify;">- &nbsp;Giới thiệu tác giả Tô Hoài với truyện ngắn &nbsp;<em>“Vợ chồng A Phủ”</em>, Kim Lân với truyện ngắn&nbsp;<em>“Vợ nhặt”.</em></p>
<p style="text-align: justify;">+ Tô Hoài là cây đại thụ lớn của nền văn học hiện đại Việt Nam. &nbsp;Ông đã để lại cho đời một sự nghiệp văn chương đạt kỉ lục về số lượng tác phẩm; phong phú, hấp dẫn về nội dung; đặc sắc về nghệ thuật.&nbsp;<em>"Vợ chồng A Phủ"</em>&nbsp;là một truyện ngắn xuất sắc trong đời văn Tô Hoài nói riêng và văn học hiện đại của ta nói chung.</p>
<p style="text-align: justify;">+ Kim Lân - người&nbsp;<em>"một lòng đi về với đất, với người, với thuần hậu nguyên thủy nông thôn".</em>&nbsp;Có ý kiến cho rằng nếu chọn ra 10 cây bút tiêu biểu nhất của văn học hiện đại Việt Nam sau Cách mạng tháng Tám thì không có ông nhưng nếu chọn ra 10 truyện ngắn hay nhất thì Kim Lân có đến 2 tác phẩm là&nbsp;<em>"Làng"</em>&nbsp;và "<em>Vợ nhặt"</em>. Trong đó,&nbsp;<em>"Vợ nhặt"</em>&nbsp;là một câu chuyện đầy ám ảnh.&nbsp;</p>
<p style="text-align: justify;">- &nbsp;Hai tác phẩm trên là những sáng tác tiêu biểu của hai nhà văn, đều viết về số phận và vẻ đẹp tâm hồn của người lao động. Bên cạnh những nét tương đồng, ở hai truyện ngắn vẫn có những nét riêng độc đáo.</p>
<p style="text-align: justify;"><strong>2.&nbsp;</strong><strong>PHÂN TÍCH:&nbsp;(5,0 điểm):</strong></p>
<p style="text-align: justify;"><strong>2.1.&nbsp;</strong><strong>Số phận của người lao động trong 2 tác phẩm: &nbsp;(2,5 điểm)</strong></p>
<p style="text-align: justify;"><strong>a.&nbsp;</strong><strong>Truyện "Vợ chồng A Phủ" phản ánh số phận đau khổ, tủi nhục của những người dân lao động dưới ách thống trị của cường quyền và thần quyền ở vùng miền núi Tây Bắc. Chứng minh qua cuộc đời nhân vật Mị và A Phủ:</strong></p>
<p style="text-align: justify;"><strong>- Nhân vật Mị:</strong></p>
<p style="text-align: justify;">+ &nbsp;Thân phận con dâu gạt nợ nhưng thực chất, Mị chỉ như kẻ ở cho nhà thống lí Pá Tra.</p>
<p style="text-align: justify;">+ &nbsp;Bị bóc lột tàn tệ: làm việc quần quật, con trâu con ngựa làm còn có lúc nghỉ ngơi nhưng Mị thì không, trong đêm tình mùa xuân khi sức sống trỗi dậy ngay lập tức bị A Sử dập tắt, bắt trói vào cột…</p>
<p style="text-align: justify;">+ &nbsp;Mị từ một cô gái trẻ trung, yêu đời trở thành "con rùa lùi lũi trong xó cửa", tê liệt cả khả năng phán kháng...</p>
<p style="text-align: justify;"><strong>- &nbsp;Nhân vật A Phủ:</strong></p>
<p style="text-align: justify;">+ &nbsp;Chịu đau khổ, bất hạnh: mồ côi cha mẹ, bị đem bán đổi thóc, lưu lạc ở Hồng Ngài rồi vì dám đứng lên bảo vệ công bằng, lẽ phải mà bị đánh đập, phạt vạ, trở thành kẻ ở cho nhà thống lí.</p>
<p style="text-align: justify;">+ &nbsp;Kiếp nô lệ bị bóc lột, chà đạp: bị phạt vạ vô lí, làm việc quần quật mấy năm không hết nợ, đánh mất bò nên bị trói đến chết (tính mạng rẻ mạt)…</p>
<p style="text-align: justify;"><strong>b.&nbsp;</strong><strong>Truyện "Vợ nhặt" phản ánh số phận khốn khổ, rẻ mạt của con người giữa thời đói:</strong></p>
<p style="text-align: justify;"><strong>- &nbsp;</strong>Cảnh nười chết đói tràn ngập khắp xóm ngụ cư: Người chết như ngả rạ, người sống thì "vật vờ như những bóng ma",...</p>
<p style="text-align: justify;"><strong>- &nbsp;</strong>Số phận con người được tô đậm qua nhiều nhân vật cụ thể:</p>
<p style="text-align: justify;">+ Tràng: xấu, nghèo, dân ngụ cư, ế vợ.</p>
<p style="text-align: justify;">+ Người vợ nhặt: quần áo rách tả tơi, mặt xám ngoét, nghèo đói nên cong cớn, chỏng lỏn, chấp nhận theo không Tràng về làm vợ cốt để có miếng ăn.&nbsp;</p>
<p style="text-align: justify;">+ Bà cụ Tứ: cái nghèo khổ in dấu trong dáng hình "lọng khọng" đầy ám ảnh</p>
<p style="text-align: justify;"><strong>2.2.&nbsp;</strong><strong>Vẻ đẹp tâm hồn của con người qua 2 tác phẩm:</strong></p>
<p style="text-align: justify;"><strong>a.&nbsp;</strong><strong>Trong "Vợ chồng A Phủ", Tô Hoài đã tập trung miêu tả sức &nbsp;sống mãnh liệt, khát vọng tự do cháy bỏng và khả năng cách mạng ở những con người nghè khổ:&nbsp;</strong></p>
<p style="text-align: justify;"><strong>&nbsp;Nhân vật Mị:</strong></p>
<p style="text-align: justify;">- Là một người con gái xinh đẹp, có tài thổi sáo, tâm hồn trong sáng, yêu đời. Mị rất hiếu thảo: vì thương bố Mị chấp nhận làm con dâu gạt nợ, sống cuộc đời tăm tối, tủi nhục.</p>
<p style="text-align: justify;">- Có sức sống tiềm tàng mãnh liệt [phân tích diễn biến tâm trạng Mị trong đêm tình mùa xuân]<strong>:</strong>&nbsp;Không khí ngày xuân ở Hồng Ngài, tiếng sao gọi bạn tình và nhất là hơi rượu đã làm thức dậy tâm hồn Mị. Từ một kẻ lầm lũi, tê liệt khả năng phản kháng, Mị bỗng sống dậy ý thức về thân phận, thấy đau khổ và nghĩ đến cái chết. Rồi Mị lại muốn làm đẹp, muốn đi chơi, muốn được sống như ngày còn trẻ, còn được tự do...</p>
<p style="text-align: justify;">- Là một cô gái giàu tình thương, có khát vọng sống mãnh liệt và có khả năng cách mạng:</p>
<p style="text-align: justify;">+ Mị cắt dây trói cứu A Phủ chính là tự giải thoát bản thân mình.</p>
<p style="text-align: justify;">+ Vùng chạy theo A Phủ rồi sau hau người đã đến với cách mạng.</p>
<p style="text-align: justify;"><strong>Nhân vật A Phủ:</strong></p>
<p style="text-align: justify;">- Là một chàng trai khỏe khoắn, chăm lao động, tính tình cương trực: Ai lấy được A Phủ "như có một con trâu tốt trong nhà", dám chống lại những bất công ngang trái,...</p>
<p style="text-align: justify;">- Là người tình nghĩa và có tình yêu tự do và tinh thần cách mạng:</p>
<p style="text-align: justify;">+ Khi Mị cởi trói, A Phủ khuỵu xuống, không bước được rồi ngay sau đó đã "quật sức vùng lên chạy" thoát khỏi gông cùm, xiềng xích.</p>
<p style="text-align: justify;">+ Khi Mị nói "A Phủ cho tôi đi", A Phủ đã không bỏ lại người đàn bà khốn khổ ấy.</p>
<p style="text-align: justify;">+ Tìm đến cách mạng, trở thành cán bộ giỏi</p>
<p style="text-align: justify;"><strong>b.&nbsp;</strong><strong>Trong "Vợ nhặt", Kim Lân đã cho thấy:&nbsp;</strong></p>
<p style="text-align: justify;">-&nbsp;<strong>Dù hoàn cảnh nghèo đói khốn cùng, con người vẫn yêu thương, đùm bọc nhau:</strong></p>
<p style="text-align: justify;">+ Tràng nhặt vợ về cưu mang.</p>
<p style="text-align: justify;">+ &nbsp;Bà cụ Tứ sẵn sàng chấp nhận người con dâu với tất cả tình thương của một người mẹ đã trải đời.</p>
<p style="text-align: justify;">+ Người vợ nhặt sẵn sàng theo không Tràng mong qua cảnh đói nghèo nhưng khi ăn miếng cháo cám "nghẹn bứ trong cổ họng" vẫn điềm nhiên, tỏ ra vui vẻ nghĩa là đã cảm thông, thấu hiểu và sẵn sàng chia sẻ sự nghèo khó với mẹ con Tràng.</p>
<p style="text-align: justify;"><strong>- &nbsp;Khao khát hạnh phúc, niềm tin tưởng vào tương lai tươi sáng:</strong></p>
<p style="text-align: justify;">+ &nbsp;Người dân ngụ cư vui khi Tràng có vợ.</p>
<p style="text-align: justify;">+ &nbsp;Tràng tủm tỉm cười, hôm sau xúc động trước cảnh nhà cửa sân vườn được quét dọn sạch sẽ...</p>
<p style="text-align: justify;">+ &nbsp;Người vợ nhặt trở thành người phụ nữ dịu dàng, nữ tính, chu đáo.</p>
<p style="text-align: justify;">+ &nbsp;Bà cụ Tứ dặn dò, chỉ bảo các con, toàn nghĩ đến chuyện tương lai "ai giàu ba họ, ai khó ba đời"...</p>
<p style="text-align: justify;">+ &nbsp;Hình ảnh đoàn người đói đi trên đê sộp và lá cờ Việt Minh dự báo về một cuộc đổi đời</p>
<p style="text-align: justify;"><strong>2.3.&nbsp;</strong><strong>Nghệ thuật xây dựng nhân vật:&nbsp;</strong></p>
<p style="text-align: justify;">- &nbsp;Trong "<em>Vợ chồng A Phủ":</em></p>
<p style="text-align: justify;">+ &nbsp;Nghệ thuật miêu tả tâm lí nhân vật tài tình, sâu sắc.</p>
<p style="text-align: justify;">+ &nbsp;Giọng kể trầm lắng.</p>
<p style="text-align: justify;">+ &nbsp;Sáng tạo nhiều chi tiết đặc sắc: căn buồng của Mị, tiếng sáo, giọt nước mắt A Phủ,...</p>
<p style="text-align: justify;">- Trong&nbsp;<em>"Vợ nhặt":</em></p>
<p style="text-align: justify;">+ &nbsp;Giọng điệu đôn hậu, hóm hỉnh</p>
<p style="text-align: justify;">+ &nbsp;Tình huống truyện vừa éo le vừa độc đáo, bất ngờ.</p>
<p style="text-align: justify;">+ &nbsp;Miêu tả tâm trạng nhân vật tài tình.</p>
<p style="text-align: justify;"><strong>2.4.&nbsp;</strong><strong>So sánh:&nbsp;(2,0 điểm):</strong></p>
<p style="text-align: justify;"><strong>a.&nbsp;</strong><strong>Giống nhau:&nbsp;</strong></p>
<p style="text-align: justify;">- &nbsp; Lấy bối cảnh những năm 1945 – 1954</p>
<p style="text-align: justify;">- &nbsp; Phản ánh số phận bi thảm đồng thời cũng khẳng định vẻ đẹp tâm hồn của người lao động</p>
<p style="text-align: justify;">- &nbsp; Tố cáo xã hội thực dân phong kiến chà đạp, đẩy con người vào đau khổ.</p>
<p style="text-align: justify;">- &nbsp; Thể hiện tinh thần nhân đạp sâu sắc: trân trọng vẻ đẹp tâm hồn, khát vọng chính đáng của con người, có niềm tin vào sự đổi đời của con người.</p>
<p style="text-align: justify;">- &nbsp;Nghệ thuật miêu tả tâm lí nhân vật rất tài tình, tinh tế.</p>
<p style="text-align: justify;"><strong>b.&nbsp;</strong><strong>Khác nhau:&nbsp;</strong></p>
<p style="text-align: justify;">- &nbsp;&nbsp;<em>“Vợ chồng A Phủ”&nbsp;</em>tập trung phản ánh:</p>
<p style="text-align: justify;">+ Số phận: người lao động bị áo bức, bóc lột</p>
<p style="text-align: justify;">+ Vẻ đẹp: sức sống mãnh liệt, khát vọng tự do.</p>
<p style="text-align: justify;">-&nbsp;&nbsp;&nbsp;<em>“Vợ nhặt”&nbsp;</em>tập trung phản ánh:</p>
<p style="text-align: justify;">+ Số phận: rẻ rúng vì đói nghèo.</p>
<p style="text-align: justify;">+ Vẻ đẹp: khát vọng sống, ước mơ hạnh phúc.</p>
<p style="text-align: justify;"><strong>3.&nbsp;</strong><strong>ĐÁNH GIÁ CHUNG:&nbsp;</strong></p>
<p style="text-align: justify;">- &nbsp;Nhấn mạnh: hai tác phẩm bên cạnh những nét tương đồng vẫn có những nét riêng biệt, thể hiện phong cách nghệ thuật của tác giả.</p>
<p style="text-align: justify;">- &nbsp;Khẳng định giá trị hiện thực và nhân đạo to lớn của hai tác phẩm cũng như tài năng của hai tác giả.&nbsp;</p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`;
let multipleChoise = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: left;">Cho hàm số y=f(x) có đạo hàm trên K( K là một khoảng, đoạn hoặc nửa khoảng). Khẳng định nào sau đây đúng?</p>
<p style="text-align: justify;">A. Nếu \(f'(x) \ge 0,\,\forall x \in K\) thì hàm số f(x) đồng biến trên K.&nbsp;&nbsp;B. Nếu \(f'(x) &gt; 0,\,\forall x \in K\) thì hàm số f(x) nghịch biến trên K. D. Nếu \(f'(x) \le 0,\forall x \in K\) thì hàm số nghịch biến trên K.</p>
<p style="text-align: justify;"></p>
<p style="text-align: justify;">C. Nếu \(f'(x) &gt; 0,\,\forall x \in K\) thì hàm số f(x) đồng biến trên K.&nbsp;&nbsp;</p>
<p style="text-align: justify;"></p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: left;"><strong>asdsadwqeqwedb</strong>
<p style="text-align: left;">Chọn đáp án <strong>B.</strong></p>
<div class="clearfix"></div>`;
let noQuestion = `<h2 class="s14 lineheight"></h2>
<p style="text-align: justify;"><a href="https:///soan-bai-tuyen-ngon-doc-lap-ho-chi-minh-ngu-van-12-c30a23471.html"><strong>Xem thêm: Soạn bài Tuyên ngôn độc lập - đầy đủ nhất tại đây</strong></a></p>
<p style="text-align: justify;"><strong>Câu 1.</strong>&nbsp;Những nét chính về quan điểm&nbsp; sáng tác văn học nghệ thuật của Chủ tịch Hồ Chí Minh.</p>
<p style="text-align: justify;">&nbsp;&nbsp; Văn thơ Hồ Chí Minh là di sản tinh thần vô giá, là một bộ phận gắn bó hữu cơ với sự nghiệp cách mạng vĩ đại của Người. những tác phẩm văn học xuất sắc của Hồ Chí Minh thể hiện chân thật và sâu sắc tư tưởng , tình cảm và tâm hồn cao cả của Người.Tìm hiểu thơ văn Hồ Chí Minh, mỗi chúng ta sẽ tìm thấy những bài học vô cùng cao quý.</p>
<p style="text-align: justify;"><strong>Câu 2.</strong>&nbsp;Những nét khái quát về di sản văn học của Hồ Chí Minh:</p>
<p style="text-align: justify;">* Văn chính luận</p>
<p style="text-align: justify;">- Tiêu biểu: Bản án chế độ thực dân Pháp (1925); “Tuyên ngôn Độc lập” (1945); Lời kêu gọi toàn quốc kháng chiến (1946)&nbsp;</p>
<p style="text-align: justify;">* Truyện và kí</p>
<p style="text-align: justify;">- Tiêu biểu: Lời than vãn của bà Trưng Trắc (1922); Vi hành (1923); Những trò lố hay là Va-ren và Phan Bội Châu (1925); Nhật ký chìm tàu (1931); Vừa đi đường vừa kể chuyện (1963)</p>
<p style="text-align: justify;">* Thơ ca</p>
<p style="text-align: justify;">- Người để lại hơn 250 bài thơ, được in trong 3 tập thơ: Nhật ký trong tù gồm 134 bài; Thơ Hồ Chí Minh gồm 86 bài; Thơ chữ Hán Hồ Chí Minh gồm 36 bài.</p>
<p style="text-align: justify;"><strong>Câu 3.</strong>&nbsp;Đặc điểm cơ bản của phong cách nghệ thuật Hồ Chí Minh</p>
<p style="text-align: justify;">- Phong cách nghệ thuật của Hồ Chí Minh độc đáo mà đa dạng.</p>
<p style="text-align: justify;">- Văn chính luận của Người thường ngắn gọn, súc tích, lập luận chặt chẽ, lí lẽ đanh thép, bằng chứng thuyết phục</p>
<p style="text-align: justify;">- Truyện và kí của Người rất hiện đại, có tính chiến đấu mạnh mẽ và nghệ thuật trào phúng sắc bén. Thơ ca tuyên truyền cách mạnh gần gũi với ca dao, giản dị, dễ nhớ.</p>
<p style="text-align: justify;"><strong>LUYỆN TẬP</strong></p>
<p style="text-align: justify;"><strong>Câu 1.&nbsp;</strong>Phân tích bài thơ Chiều tối (Mộ) trong tập Nhật kí trong tù để làm rõ sự hòa hợp độc đáo giữa bút pháp cổ điển và bút pháp hiện đại của thơ Hồ Chí Minh.</p>
<p class="Bodytext0" align="left">-&nbsp;&nbsp; Màu sắc cổ điển thể hiện ở các phương diện:</p>
<p class="Bodytext0" align="left">+ Thể thơ: tứ tuyệt Đường luật</p>
<p class="Bodytext0" align="left">+ Hình ảnh: cánh chim, chòm mây (câu 1 và 2) là những hình ảnh quen thuộc trong thơ cổ</p>
<p class="Bodytext0" align="left">+ Thời điểm: chiều tà, hoàng hôn xuống</p>
<p class="Bodytext0">+ Tâm trạng: bâng khuâng, cô đơn trên con đường xa, nỗi buồn xa xứ. Tất cả các hình ảnh, cảm xúc trên đều mang đậm phong vị cổ điển trong Đường thi.</p>
<p class="Bodytext0" align="left">-&nbsp;&nbsp; Màu sắc hiện đại thể hiện ở các phương diện sau:</p>
<p class="Bodytext0">+ Hình tượng trữ tình: con người đầy sức xuân mải mê lao động để cải tạo và xây dựng cuộc sống hạnh phúc cho mình. Con người là trung tâm của bức tranh, vượt lên hoàn cảnh.</p>
<p class="Bodytext0" align="left">+ Âm điệu: ấm áp, sôi nổi, tin tưởng.</p>
<p class="Bodytext0" align="left">+ Hình ảnh: bếp lửa hồng xoá đi tất cả sự âm u, lạnh lẽo (2 câu sau).</p>
<p class="Bodytext0" align="left">+ Tâm trạng tác giả: hào hứng, hướng về sự sống trong tương lai vào ánh sáng.</p>
<p class="Bodytext0" align="left">-&nbsp;&nbsp; Chỉ ra sự hài hoà hai bút pháp đó hoà hợp với nhau trong bài thơ như thế nào?</p>
<p style="text-align: justify;"><strong>Câu 2.</strong> Bài học</p>
<p style="text-align: justify;">- Tình thương con người là lớn lao và cao cả, lòng nhân đạo là đức tính cao đẹp nhất của Bác Hồ. Tình cảm này vừa cụ thể, vừa bao la, vừa ở nhận thức vừa ở hành động.</p>
<p style="text-align: justify;">- Thơ Bác là sự kết hợp hài hòa giữa hai yếu tố: cổ diện và hiện đại. – Một tâm hồn nhảy cảm và dễ rung động trước tạo vật và&nbsp; ung người.</p>
<p style="text-align: justify;">- “Thân thể ở trong lao, tinh thần ở ngoài lao”</p>
<p style="text-align: justify;">&nbsp;- “Đại nhân, đại trí, đại dũng”.</p>
<p style="text-align: justify;"><strong>Click vào Bài tiếp theo &gt; để xem bài soạn đầy đủ</strong></p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`;
let noQuestionMutipleChoise = `<h2 class="s14 lineheight"></h2>
<p style="text-align: left;">Cho hàm số y=f(x) có đạo hàm trên K( K là một khoảng, đoạn hoặc nửa khoảng). Khẳng định nào sau đây đúng?</p>
<p style="text-align: justify;">A. Nếu \(f'(x) \ge 0,\,\forall x \in K\) thì hàm số f(x) đồng biến trên K.&nbsp;&nbsp;B. Nếu \(f'(x) &gt; 0,\,\forall x \in K\) thì hàm số f(x) nghịch biến trên K. D. Nếu \(f'(x) \le 0,\forall x \in K\) thì hàm số nghịch biến trên K.</p>
<p style="text-align: justify;"></p>
<p style="text-align: justify;">C. Nếu \(f'(x) &gt; 0,\,\forall x \in K\) thì hàm số f(x) đồng biến trên K.&nbsp;&nbsp;</p>
<p style="text-align: justify;"></p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: left;"><strong>asdsadwqeqwedb</strong>
<p style="text-align: left;">Chọn đáp án <strong>B.</strong></p>
<div class="clearfix"></div>`;
let normals = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;"><strong>I. ĐỌC HIỂU</strong></p>
<p style="text-align: justify;"><strong>Đọc các đoạn trích và thực hiện các yêu cầu dưới đây:</strong></p>
<p style="text-align: justify;">1. <em>Một anh chàng có tên là Bryan Anderson đang lái xe trên đường cao tốc thì gặp một bà cụ già đang đứng cạnh chiếc xe hơi Mercedes mới cứng bị xịt lốp với dáng vẻ lo lắng.</em></p>
<p style="text-align: justify;"><em>Anderson liền dừng xe và đi bộ lại chỗ cũ. Thấy một anh đầu tóc bù xù, quần áo nhếch nhác, vẻ mặt hơi dữ, râu ria không cạo, cụ già hơi sợ. Cụ đành gật đầu vì đã đợi cả tiếng trên cao tốc dưới nắng gắt mà không ai dừng lại giúp.</em></p>
<p style="text-align: justify;"><em>Chỉ trong mươi phút, chàng trai đã thay xong cái lốp bị hỏng dù quần áo bị bẩn lem luốc thêm, tay anh bị kẹt sưng tấy.</em></p>
<p style="text-align: justify;"><em>Khi xong việc, cụ bà hỏi, anh lấy bao nhiêu nhưng Anderson cười và nói “Cụ chẳng nợ chi ạ. Nếu muốn trả tiền công, lần sau thấy ai cần sự trợ giúp thì cụ hãy giơ tay bàn tay thân ái. Và lúc đó cụ nghĩ đến cháu, thế là vui lắm rồi.</em></p>
<p style="text-align: right;" align="right">(<em>Con người và sự tử tế</em>, Hiệu Minh, Báo Vietnamnet, 29/03/2016)</p>
<p style="text-align: justify;">2. <em>Giờ đã là 1 giờ sáng nhưng cô sinh viên y khoa Chu Thương Minh Trang, 22 tuổi, vẫn đang ngồi ngoài vỉa hè lạnh giá để khám bệnh miễn phí cho ông Nguyễn, một người đàn ông vô gia cư 70 tuổi. Con đường này là nơi nương náu duy nhất của ông khi đêm xuống.</em></p>
<p style="text-align: justify;"><em>Ông mặc 3 lớp áo để chống lại cái lạnh. Ông kêu đau tay và lưng do công việc sửa xe đạp. Không do dự, Trang nhẹ nhàng đưa tay xoa các ngón tay cho ông. Sauk hi hỏi han xong, cô đã trao cho ông ba miếng dán Salonpas. Ông Nguyễn đã rất xúc động cảm ơn cô.</em></p>
<p style="text-align: justify;"><em>Ông nói: “Tôi sống rất vất vả. Tôi rất cảm kích khi những người tình nguyện viên trẻ này tới thăm. Tôi đã trải qua nhiều khó khăn nhưng giờ tôi không cảm thấy buồn nữa bởi vì tôi biết có những người tốt xung quanh giúp đỡ mình”.</em></p>
<p style="text-align: right;" align="right"><em>(“Chuyện người tử tế” Việt Nam lên báo nước ngoài</em>, Phạm Khánh lược dịch, Infonet, 22/03/2017)</p>
<p style="text-align: justify;"><strong>Câu 1.&nbsp;</strong>Xác định phương thức biểu đạt chính trong hai đoạn trích trên.(nhận biết)</p>
<p style="text-align: justify;"><strong>Câu 2.&nbsp;</strong>Việc làm của anh Bryan Anderson và cô sinh viên y khoa Chu Thương Minh Trang trong hai đoạn trích trên có thể gọi tên là gì? Anh/ chị có đồng tình với những việc làm đó không, vì sao?</p>
<p style="text-align: justify;"><strong>Câu 3.&nbsp;</strong>Câu nói của anh Bryan Anderson và lời chia sẻ của ông Nguyễn trong hai đoạn trích trên gợi cho anh/chị những suy nghĩ gì?</p>
<p style="text-align: justify;">Anh Bryan Anderson: <em>"Cụ chẳng nợ chi cả. Nếu muốn trả tiền công, lần sau thấy ai cần sự trợ giúp thì cụ hãy giơ tay bàn tay thân ái. Và lúc đó cụ nghĩ đến cháu, thế là vui lắm rồi."</em></p>
<p style="text-align: justify;">Ông Nguyễn: <em>“Tôi sống rất vất vả. Tôi rất cảm kích khi những người tình nguyện viên trẻ này tới thăm. Tôi đã trải qua nhiều khó khăn nhưng giờ tôi không cảm thấy buồn nữa bởi vì tôi biết có những người tốt xung quanh giúp đỡ mình”.</em></p>
<p style="text-align: justify;"><strong>II. LÀM VĂN</strong></p>
<p style="text-align: justify;"><strong>Câu 1:</strong></p>
<p style="text-align: justify;"><strong></strong>Từ hai đoạn trích ở phần Đọc hiểu, hãy viết một đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của anh/ chị về: <em>Sự lan tỏa của việc làm tử tế trong cuộc sống hiện nay.</em></p>
<p style="text-align: justify;"><strong>Câu 2:</strong></p>
<p style="text-align: justify;">Trong con mắt của Nguyễn Tuân, con người Tây Bắc mới thật xứng đáng là vàng mười của đất nước ta.</p>
<p style="text-align: justify;">Phân tích nhân vật người lái đò trong bài tùy bút Người lái đò sông Đà của Nguyễn Tuân để làm sáng tỏ nhận xét trên. Từ đó, hãy nêu một vài suy nghĩ của anh/chị về những phẩm chất cần có của mỗi người trong công cuộc xây dựng và bảo vệ Tổ quốc hôm nay.</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong>I. ĐỌC HIỂU</strong><strong></strong></p>
<p style="text-align: justify;"><strong>Câu 1:</strong></p>
<p style="text-align: justify;">Phương thức biểu đạt: tự sự.</p>
<p style="text-align: justify;"><strong>Câu 2:</strong></p>
<p style="text-align: justify;">- Việc làm của hai người trong hai đoạn trích trên là việc làm tử tế.</p>
<p style="text-align: justify;">- Đồng tình với những việc làm trên vì đó là những việc làm tốt, xuất phát từ tấm lòng nhân ai, yêu thương con người. Nếu mỗi người đều có những việc làm, những tấm lòng như vậy thì xã hội sẽ trở nên tốt đẹp hơn.</p>
<p style="text-align: justify;"><strong>Câu 3:</strong></p>
<p style="text-align: justify;">Câu nói của hai nhân vật trong hai đoạn trích gợi cho anh/ chị những suy nghĩ:</p>
<p style="text-align: justify;">- Sự tử tế, lòng nhân ái cần được mang đến cho tất cả mọi người, cần được nhân rộng ra.</p>
<p style="text-align: justify;">- Sự tử tế , lòng nhân ái đem lại niềm vui và hạnh phúc không chỉ cho người cho mà còn cho cả người nhận. Đó cũng là sự chia sẻ, đồng cảm.</p>
<p style="text-align: justify;"><strong>II. LÀM VĂN</strong><strong></strong></p>
<p style="text-align: justify;"><strong>Câu 1:</strong></p>
<p>* Giải thích vấn đề</p>
<p style="text-align: justify;">- Tử tế: chữ “tử” có nghĩa là những chuyện nhỏ bé, chữ “tế” có nghĩa là những chuyện bình thường. Hai chữ “tử tế” có nghĩa là cẩn trọng từ những việc nhỏ bé.</p>
<p style="text-align: justify;">- Tử tế là một chuẩn mực đạo đức quan trọng trong cuộc sống, là một phép tắc cần thiết trong giao tiếp giữa con người với con người trong cách đối nhân xử thế, là một giá trị đẹp và nhân văn.</p>
<p style="text-align: justify;">- Tử tế không phải là có tiền bạc mà mua được hoặc muốn là có ngay, mà phải được học hành, được rèn luyện, kế thừa và giữ gìn.</p>
<p style="text-align: justify;">- Sự lan tỏa của tử tế tức là sự tử tế được nhân rộng ra khắp toàn xã hội.</p>
<p>* Bàn luận, mở rộng vấn đề:</p>
<p style="text-align: justify;">- Tác dụng của việc lan tỏa sự tử tế:</p>
<p style="text-align: justify;">+ Giúp mỗi người sống vui vẻ, hạnh phúc.</p>
<p style="text-align: justify;">+ Giúp quan hệ giữa người với người trở nên văn minh hơn. Con người biết đồng cảm và sẻ chia với nhau hơn.</p>
<p style="text-align: justify;">+ Giúp xã hội phát triển lành mạnh, thế giới không còn bạo lực, chiến tranh.</p>
<p style="text-align: justify;">- Việc làn tỏa sự tử tế trong xã hội hiện nay là một điều cần thiết:</p>
<p style="text-align: justify;">+ Cùng với sự phát triển ngày càng mạnh mẽ của khoa học – kĩ thuật, cuộc sống con người ngày càng bộc lộ rõ nhiều mặt trái của nó: bạo lực, chiến tranh…</p>
<p style="text-align: justify;">+ Sự tử tế giúp con người nhận thức lại hành động của bản thân, kiểm soát bản thân và đối nhân xử thế một cách đàng hoàng.</p>
<p style="text-align: justify;">- Làm cách nào để lan tỏa sự tử tế:</p>
<p style="text-align: justify;">+ Nó bắt đầu từ sự giáo dục. Đầu tiên là sự giáo dục từ gia đình – cái nôi hình thành nhân cách cá nhân, nhà trường – nơi hoàn thiện nhân cách, xã hội – nơi đấu tranh để bảo vệ những giá trị tử tế đã được lên hình lê hài thời niên thiếu,…</p>
<p style="text-align: justify;">+ Nó bắt đầu từ ý thức cá nhân. Mỗi con người sẽ có những lựa chọn ứng xử khác nhau. Sự tử tế cũng là một lựa chọn. Có những người bị môi trường bên ngoài tác động mà có những phản ứng tiêu cực, những hành động xấu.</p>
<p>* Liên hệ bản thân: Anh/chị đã làm gì để góp mình vào sự lan tỏa sự tử tế trong xã hội? Có câu chuyện nào về việc tử tế/ chưa tử tế với người nào để chia sẻ?</p>
<p style="text-align: justify;"><strong>Câu 2:</strong></p>
<p style="text-align: justify;"><strong></strong><strong>* Giới thiệu tác giả, tác phẩm, ý kiến nhận xét:</strong></p>
<p style="text-align: justify;">- Nguyễn Tuân là cây bút xuất sắc của văn học Việt Nam hiện đại, có thể coi ông là một định nghĩa về người nghệ sĩ.</p>
<p style="text-align: justify;"><span>-&nbsp;</span>Nét nổi bật trong phong cách của ông là ở chỗ, Nguyễn Tuân luôn nhìn sự vật ở phương diện văn hóa và mĩ thuật, nhìn con người ở phẩm chất nghệ sĩ và tài hoa. Đặc biệt ông thường có cảm hứng mãnh liệt với cái cá biệt, phi thường, dữ dội và tuyệt mĩ.</p>
<p style="text-align: justify;"><em><span>-&nbsp;</span>Người lái đò sông Đà</em> là thiên tùy bút rút trong tập <em>Sông Đà</em>(1960) của Nguyễn Tuân, tiêu biểu cho phong cách nghệ thuật độc đáo, hấp dẫn của ông: tài hoa, uyên bác, lịch lãm.</p>
<p style="text-align: justify;"><span>-&nbsp;</span>Nhẫn xét về tác phẩm, có ý kiến cho rằng: “Trong con mắt của Nguyễn Tuân, con người Tây Bắc mới thật xứng đáng là vàng mười của đất nước ta”. Hình ảnh người lái đò trong tác phẩm chính là chất vàng mười mà tác giả đã đi tìm bấy lâu.</p>
<p>* Giải thích ý kiến trên:</p>
<p style="text-align: justify;"><span>-&nbsp;</span>Vàng mười: chỉ những gì tinh túy nhất, cao quý nhất, giá trị nhất.</p>
<p style="text-align: justify;"><span>-&nbsp;</span>Con người Tây Bắc mới thực sự xứng đáng là thứ vàng mười của đất nước ta: Nguyễn Tuân muốn khẳng định tài năng hiếm có của người lái đò, nó được rèn luyện, thử thách qua nguy hiểm, khó khăn, không những thế, nó vượt qua ngưỡng là một công việc lao động bình thường trở thành một thứ nghệ thuật cao cấp và nâng tầm người thực hiện lên bậc nghệ sĩ.</p>
<p style="text-align: justify;"><strong>* Phân tích hình ảnh <em>người lái đò sông Đà</em>:</strong></p>
<p style="text-align: justify;"><strong>1. Giới thiệu chân dung, lai lịch</strong></p>
<p style="text-align: justify;"><span>-&nbsp;</span>Tên gọi, lai lịch: được gọi là người lái đò Lai Châu</p>
<p style="text-align: justify;"><span>-&nbsp;</span>Chân dung: “tay ông lêu nghêu như cái sào, chân ông lúc nào cũng khuỳnh khuỳnh gò lại như kẹp lấy một cái cuống lái tưởng tượng, giọng ông ào ào như tiếng nước trước mặt ghềnh sông, nhỡn giới ông vòi vọi như lúc nào cũng mong một cái bến xa nào đó trong sương mù”, “cái đầu bạc quắc thước… đặt lên thân hình gọn quánh chất sừng chất mun”.</p>
<p style="text-align: justify;"><strong>2. Vẻ đẹp của người lái đò sông Đà</strong></p>
<p style="text-align: justify;">a) Vẻ đẹp trí dũng:</p>
<p style="text-align: justify;">* Khắc họa trong tương quan với hình ảnh sông Đà hung bạo, hùng vĩ:</p>
<p style="text-align: justify;"><span>-&nbsp;</span>Nghệ thuật tương phản đã làm nổi bật một cuộc chiến không cân sức:</p>
<p style="text-align: justify;">+ một bên là thiên nhiên bạo liệt, hung tàn, sức mạnh vô song với sóng nước, với thạch tinh nham hiểm.</p>
<p style="text-align: justify;">+ một bên là con người bé nhỏ trên chiếc thuyền con én đơn độc và vũ khí trong tay chỉ là những chiếc cán chèo.</p>
<p style="text-align: justify;">* Cuộc giao tranh với ba trùng vi thạch trận:</p>
<p style="text-align: justify;"><span>-&nbsp;</span>Cuộc vượt thác lần một:</p>
<p style="text-align: justify;">+ Sông Đà hiện lên như một kẻ thù nham hiểm, xảo quyệt.</p>
<p style="text-align: justify;">+ Trước sự hung hãn của bầy thạch tinh và sóng nước, ông lái đò kiên cường bám trụ “hai tay giữ mái chèo khỏi bị hất lên khỏi sóng trận địa phóng thẳng vào mình”.</p>
<p style="text-align: justify;">+ Trước đoàn quân liều mạng sóng nước xông vào (…), ông đò “cố nén vết thương, hai chân vẫn kẹp chặt lấy cái cuống lái, mặt méo bệch đi” nhưng vẫn kiên cường vượt qua cuộc hỗn chiến, vẫn cầm lái chỉ huy “ngắn gọn mà tỉnh táo” để phá tan trùng vi thạch trận thứ nhất.</p>
<p style="text-align: justify;"><span>-&nbsp;</span>Cuộc vượt thác lần hai:</p>
<p style="text-align: justify;">+ Dưới cây bút tài hoa, phóng túng, con sông Đà tiếp tục được dựng dậy như “kẻ thù số một” của con người với tâm địa còn độc ác và xảo quyệt hơn.</p>
<p style="text-align: justify;">+ Ông lái đò “không một phút nghỉ tay nghỉ mắt, phải phá luôn vòng vây thứ hai&nbsp; và đổi luôn chiến thuật”.</p>
<p style="text-align: justify;">⟶&nbsp;Trước dòng thác hùm beo hồng hộc tế mạnh trên sông đá, ông lái đò cùng chiếc thuyền cưỡi trên dòng thác như cưỡi trên lưng hổ.</p>
<p style="text-align: justify;">⟶&nbsp;Khi bốn năm bọn thủy quân cửa ải nước xô ra, ông đò không hề nao núng mà tỉnh táo, linh hoạt thay đổi chiến thuật, ứng phó kịp thời “đứa thì ông tránh mà rảo bơi chèo lên, đứa thì ông đè sấn lên mà chặt đôi ra để mở đường tiến” để rồi “những luồng tử đã bỏ hết lại sau thuyền”.</p>
<p style="text-align: justify;">_ Cuộc vượt thác lần ba:</p>
<p style="text-align: justify;">+ Bị thua ông đò ở hai lần giao tranh trước, trong trùng vi thứ ba, dòng thác càng trở nên điên cuồng, dữ dội.</p>
<p style="text-align: justify;">+ Chính giữa ranh giới của sự sống và cái chết, người đọc càng thấy tài nghệ chèo đò vượt thác của ông lái thật tuyệt vời. Ông cứ “phóng thẳng thuyền, chọc thủng cửa giữa… vút qua cổng đá”, “vút, vút, cửa ngoài, cửa trong, lại cửa trong cùng, thuyền như một mũi tên tre xuyên nhanh qua hơi nước, vừa xuyên vừa tự động lái được lượn được”… để rồi chiến thắng vinh quang. Câu văn “thế là hết thác” như một tiếng thở phào nhẹ nhõm khi ông lái đã bỏ lại hết những thác ghềnh ở phía sau lưng.</p>
<p style="text-align: justify;">* Nguyên nhân chiến thắng:</p>
<p style="text-align: justify;">- Thứ nhất, đó là chiến thắng của sự ngoan cường, lòng dũng cảm, ý chí quyết tâm vượt qua những thử thách khốc liệt của cuộc sống.</p>
<p style="text-align: justify;">- Thứ hai, đây là chiến thắng của tài trí con người, của sự am hiểu đến tường tận tính nết của sông Đà.</p>
<p style="text-align: justify;">b) Vẻ đẹp tài hoa nghệ sĩ:</p>
<p style="text-align: justify;">- Tài hoa: Với nhà văn, tài hoa là khi con người đạt tới trình độ điêu luyện, thuần thục trong công việc của mình, đến độ có thể sáng tạo được, có thể vươn tới tự do. Chính vì vậy, Nguyễn Tuân đã tập trung bút lực ca ngợi hình ảnh ông lái băng băng trên dòng thác sông Đà một cách ung dung, bình tĩnh, tự tại trong cuộc chiến đầy cam go nhưng cũng thật hào hùng.</p>
<p style="text-align: justify;">- Nghệ sĩ:</p>
<p style="text-align: justify;">+ Tay lái ra hoa thể hiện tập trung trong cảnh vượt qua trùng vi thạch trận thứ ba “Vút, vút, cửa ngoài, cửa trong, lại cửa trong cùng, chiếc thuyền như một mũi tên tre xuyên nhanh qua hơi nước, vừa xuyên vừa tự động lái được, lượn được”. Đã đạt đến độ nhuần nhuyễn, điêu luyện, mỗi động tác của người lái đò giống như một đường cọ trên bức tranh sông nước mênh mông…</p>
<p style="text-align: justify;">+ Phong thái nghệ sĩ của ông lái đò thể hiện trong cách ông nhìn nhận về công việc của mình, bình thản đến độ lạ lùng. Khi dòng sông vặn mình hết thác cũng là khoảnh khắc “sóng thác xèo xèo tan trong trí nhớ”. Những nhà đò dừng chèo, đốt lửa nướng ống cơm lam, bàn về cá anh vũ, cá dầm xanh, “về những cái hầm cá hang cá mùa khô nổ những tiếng to như mìn bộc phá rồi cá túa ra tràn đầy ruộng”.</p>
<p style="text-align: justify;">+ Qua thác ghềnh, ông lái lạnh lùng gan góc là thế, nhưng lúc bình thường thì lại nhớ tiếng gà gáy nên buộc một cái bu gà vào đuôi thuyền, bởi “có tiếng gà gáy đem theo, nó đỡ nhớ ruộng nương bản mường mình”. Chi tiết ấy đã làm rõ hơn chất nghệ sĩ ở người lái đò sông Đà.</p>
<p>* Đánh giá:</p>
<p style="text-align: justify;">Nghệ thuật xây dựng hình tượng nhân vật:</p>
<p style="text-align: justify;">- Nguyễn Tuân chú ý tô đậm nét tài hoa, nghệ sĩ ở ông lái đò.</p>
<p style="text-align: justify;">- Nguyễn Tuân có ý thức tạo nên tình huống đầy thử thách để nhân vật bộc lộ rõ phẩm chất của mình.</p>
<p style="text-align: justify;">- Nguyễn Tuân đã sử dụng một ngôn ngữ miêu tả đầy cá tính, giàu chất tạo hình, hoàn toàn phù hợp với đối tượng.</p>
<p style="text-align: justify;">- Nội dung tư tưởng mà nhân vật truyền tải:</p>
<p style="text-align: justify;">Người lái đò trí dũng và tài hoa đã nổi bật trên dòng sông hung bạo và trữ tình, có khả năng chinh phục thiên nhiên, bắt nó phải phục vụ con người, xây dựng đất nước-&nbsp; Đó chính là chất vàng mười của con người Tây Bắc nói riêng và người lao động Việt Nam nói chung trong thời kì mới- thời kỳ hàn gắn vết thương chiến tranh, xây dựng đất nước, xây dựng CNXH. Qua hình tượng này, Nguyễn Tuân muốn phát biểu quan niệm: người anh hùng không phải chỉ có trong chiến đấu mà còn có cả trong cuộc sống lao động thường ngày.</p>
<p>* Phẩm chất người lao động trong thời đại mới:</p>
<p style="text-align: justify;">- Hăng say lao động.</p>
<p style="text-align: justify;">- Sẵn sàng xông pha nơi nguy hiểm, khó khăn để cống hiến cho đất nước.</p>
<p>* Tổng kết vấn đề.</p>
<p style="text-align: justify;"><span style="color: #0000ff;"><strong>Xem thêm: Đề và Lời giải chi tiết Đề thi thử THPT Quốc gia môn Ngữ văn mới nhất tại&nbsp;Tuyensinh247.com</strong></span></p>
<p style="text-align: right;"><strong>&nbsp;</strong></p>
<div class="clearfix"></div>`;
// let multipleChoises = `<h2 class="s14 lineheight"></h2>
// <p><strong class="content_question">Đề bài</strong></p>
// <p style="text-align: left;"><strong>Câu 1.</strong> Cho hàm số y=f(x) có đạo hàm trên K( K là một khoảng, đoạn hoặc nửa khoảng). Khẳng định nào sau đây đúng?</p>
// <p style="text-align: justify;">A. Nếu \(f'(x) \ge 0,\,\forall x \in K\) thì hàm số f(x) đồng biến trên K.</p>
// <p style="text-align: justify;">B. Nếu \(f'(x) &gt; 0,\,\forall x \in K\) thì hàm số f(x) nghịch biến trên K.</p>
// <p style="text-align: justify;">C. Nếu \(f'(x) &gt; 0,\,\forall x \in K\) thì hàm số f(x) đồng biến trên K.</p>
// <p style="text-align: justify;">D. Nếu \(f'(x) \le 0,\forall x \in K\) thì hàm số nghịch biến trên K.&nbsp;&nbsp;</p>
// <p style="text-align: justify;"><strong>Câu 2.</strong> Hàm số \(y =&nbsp; - \dfrac{1 }{ 3}{x^3} + x + 1\) đồng biến trên khoảng nào ?</p>
// <p style="text-align: justify;">A. \(( - 1; + \infty )\)&nbsp; &nbsp;</p>
// <p style="text-align: justify;">B. ( - 1 ; 1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;">C. \(( - \infty ;1)\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;">D. \(( - \infty ; - 1)\) và \((1; + \infty )\)</p>
// <p style="text-align: justify;"><strong>Câu 3.</strong> Cho hàm số \(y =&nbsp; - {x^3} + 3{x^2} - 3x + 1\), mệnh đề nào sau đây là đúng?</p>
// <p style="text-align: justify;">A. Hàm số&nbsp; luôn nghịch biến;&nbsp; &nbsp; &nbsp;&nbsp;</p>
// <p style="text-align: justify;">B. Hàm số luôn đồng biến;</p>
// <p style="text-align: justify;">C. Hàm số đạt cực đại tại x = 1;&nbsp; &nbsp; &nbsp;&nbsp;</p>
// <p style="text-align: justify;">D. Hàm số đạt cực tiểu tại x = 1.</p>
// <p style="text-align: justify;"><strong>Câu 4</strong>. Giá trị nhỏ nhất của hàm số \(y = {x^3} - 3{x^2}\) trên đoạn [- 1 ; 1] là:</p>
// <p style="text-align: justify;">A. – 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B. 0&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
// <p style="text-align: justify;">C. – 5&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;D. – 4 .</p>
// <p style="text-align: justify;"><strong>Câu 5</strong>. Hàm số \(y = \dfrac{{ - 2x + 1}}{{x - 1}}\) đồng biến trên:</p>
// <p style="text-align: justify;">A. \(( - \infty ;1)\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;">B. \(R\backslash \{ 1\} \)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;">C. \((0; + \infty )\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;">D. R.</p>
// <p style="text-align: justify;"><strong>Câu 6.</strong> Tâm đối xứng của đồ thị hàm số \(y =\dfrac{{3x + 1}}{{x + 1}}\) là</p>
// <p style="text-align: justify;">A. (3 ; - 1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B. (- 1; 3 )&nbsp; &nbsp;&nbsp;</p>
// <p style="text-align: justify;">C. (3 ; 1)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;D. (1 ; 3).</p>
// <p style="text-align: justify;"><strong>Câu 7.</strong> Số điểm cực trị của đồ thị hàm số \(y = {x^4} - {x^3}\) là:</p>
// <p style="text-align: justify;">A. 1&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; B. 0&nbsp; &nbsp;</p>
// <p style="text-align: justify;">C.&nbsp; 3&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;D.&nbsp; 2.</p>
// <p style="text-align: justify;"><strong>Câu 8</strong>. Giá trị lớn nhất của hàm số \(y = {x^3} - 6{x^2} + 12x + 5\)&nbsp;trên đoạn [0 ; 3] là:</p>
// <p style="text-align: justify;">A. 14&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; B. 13</p>
// <p style="text-align: justify;">C. 5&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;D. 10</p>
// <p style="text-align: justify;"><strong>Câu 9</strong>. C ó bao nhiêu tiếp tuyến với đồ thị hàm số \(y = \dfrac{{2x + 3}}{{x - 1}}\), biết tiếp tuyến song song vối đường thẳng \(y =&nbsp; - 5x - 3\)</p>
// <p style="text-align: justify;">A. 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B. 0&nbsp; &nbsp;</p>
// <p style="text-align: justify;">C. 2&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;D. 3</p>
// <p style="text-align: justify;"><strong>Câu 10.</strong> Giá trị cực tiểu của hàm số \(y = {x^3} - 3{x^2} - 9x + 2\) là:</p>
// <p style="text-align: justify;">A. -20&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; B. 7&nbsp;&nbsp;</p>
// <p style="text-align: justify;">C. – 25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D. 3.</p>
// <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// <div align="center">
//  <table border="1" cellspacing="0" cellpadding="0">
//   <tbody>
//    <tr>
//     <td valign="top" width="106"> <p align="center">Câu</p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>1</strong></p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>2</strong></p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>3</strong></p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>4</strong></p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>5</strong></p> </td>
//    </tr>
//    <tr>
//     <td valign="top" width="106"> <p align="center">Đáp án</p> </td>
//     <td valign="top" width="106"> <p align="center">C</p> </td>
//     <td valign="top" width="106"> <p align="center">B</p> </td>
//     <td valign="top" width="106"> <p align="center">A</p> </td>
//     <td valign="top" width="106"> <p align="center">D</p> </td>
//     <td valign="top" width="106"> <p align="center">A</p> </td>
//    </tr>
//    <tr>
//     <td valign="top" width="106"> <p align="center">Câu</p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>6</strong></p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>7</strong></p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>8</strong></p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>9</strong></p> </td>
//     <td valign="top" width="106"> <p align="center"><strong>10</strong></p> </td>
//    </tr>
//    <tr>
//     <td valign="top" width="106"> <p align="center">Đáp án</p> </td>
//     <td valign="top" width="106"> <p align="center">B</p> </td>
//     <td valign="top" width="106"> <p align="center">A</p> </td>
//     <td valign="top" width="106"> <p align="center">A</p> </td>
//     <td valign="top" width="106"> <p align="center">A</p> </td>
//     <td valign="top" width="106"> <p align="center">C</p> </td>
//    </tr>
//   </tbody>
//  </table>
// </div>
// <div align="center">
//  &nbsp;
// </div>
// <div style="text-align: right;" align="center">
//  <div align="center">
//   <p style="text-align: left;"><strong>Câu 2.</strong>&nbsp;Ta có&nbsp;\(y' =&nbsp;&nbsp;- {x^2} + 1\)</p>
//   <p style="text-align: left;">\(\Rightarrow y' = 0\)</p>
//   <p style="text-align: left;">\(\Leftrightarrow \,\, - {x^2} + 1 = 0\)</p>
//   <p style="text-align: left;">\(\Leftrightarrow x =&nbsp;&nbsp;\pm 1\)</p>
//   <p style="text-align: left;">Ta có bảng biến thiên:</p>
//   <p style="text-align: left;">&nbsp;<img style="width: 100%; max-width: 500px;" src="https://img./picture/2018/1115/1_1.png" alt=""></p>
//   <p style="text-align: left;">Vậy&nbsp;&nbsp;hàm số đồng biến trên&nbsp;&nbsp;(- 1; 1).</p>
//   <p style="text-align: left;">Chọn đáp án <strong>B.</strong></p>
//   <p style="text-align: left;"><strong>Câu 3</strong>.Ta có</p>
//   <p style="text-align: left;">\(y' =&nbsp;&nbsp;- 3{x^2} + 6x - 3\)\( =&nbsp;&nbsp;- 3{(x - 1)^2} \le 0,\forall x \in R\)</p>
//   <p style="text-align: left;">Vậy hàm số luôn nghịch biến.</p>
//   <p style="text-align: left;">Chọn đáp án <strong>A.</strong></p>
//   <p style="text-align: left;"><strong>Câu 4</strong>. Ta có</p>
//   <p style="text-align: left;">\(\begin{array}{l}y' = 3{x^2} - 6x,\,\,y' = 0\\ \Leftrightarrow \,\,3{x^2} - 6x = 0\,\\ \Leftrightarrow \left[ \begin{array}{l}x = 0\\x = 2\end{array} \right.\\2 \in [ - 1;1],\\&nbsp; y(0) = 0,\,\,y( - 1) =&nbsp;&nbsp;- 4,\,\,y(1) =&nbsp;&nbsp;- 2.\end{array}\)</p>
//   <p style="text-align: left;">Vậy giá trị nhỏ nhất của hàm số&nbsp;\(y = {x^3} - 3{x^2}\)&nbsp;&nbsp;trên đoạn [-1; 1] là – 4</p>
//   <p style="text-align: left;">Chọn đáp án <strong>D.</strong></p>
//   <p style="text-align: left;"><strong>Câu 5</strong>. Ta có&nbsp;\(D = R\backslash \{ 1\} .\)\(y' = \dfrac{1}{{{{\left( {x - 1} \right)}^2}}} &gt; 0,\forall x \in D\)&nbsp;.&nbsp;</p>
//   <p style="text-align: left;">Vậy hàm số đồng biến trên các khoảng&nbsp;\(\left( { - \infty ;1} \right),\left( {1; + \infty } \right)\)</p>
//   <p style="text-align: left;">Chọn đáp án <strong>A.</strong></p>
//   <p style="text-align: left;"><strong>Câu 6</strong>. Đồ thị hàm số có đường tiệm cận đứng là x = -1. Đồ thị hàm số có đường tiệm cận ngang là y = 3. Vậy tâm đối xứng là giao điểm của hai đường tiệm cận là (-1 ; 3)</p>
//   <p style="text-align: left;">Chọn đáp án <strong>B.</strong></p>
//   <p style="text-align: left;"><strong>Câu 7</strong>.&nbsp;\(y' = 4{x^3} - 3{x^2}\,\,,\,y' = 0\)</p>
//   <p style="text-align: left;">\(\Leftrightarrow \,\,4{x^3} - 3{x^2} = 0\)</p>
//   <p style="text-align: left;">\(\Leftrightarrow \,\left[ \begin{array}{l}x = 0\\x = \dfrac{3}{4}\end{array} \right.\)</p>
//   <p style="text-align: left;">Vậy số điểm cực trị của đồ thị hàm số trên là 1 do nghiệm&nbsp;\(x = \dfrac{3}{4}\)&nbsp;là nghiệm kép.</p>
//   <p style="text-align: left;">Chọn đáp án <strong>A.</strong></p>
//   <p style="text-align: left;"><strong>Câu 8</strong>. Ta có</p>
//   <p style="text-align: left;">\(\begin{array}{l}y' = 3{x^2} - 12x + 12,\,\,y' = 0\\ \Leftrightarrow \,\,3{x^2} - 12x + 12 = 0\\ \Leftrightarrow \,\,3{\left( {x - 2} \right)^2} = 0\\&nbsp; &nbsp;\Leftrightarrow x = 2\end{array}\)</p>
//   <p style="text-align: left;">Ta có bảng biến thiên:</p>
//   <p style="text-align: left;"><img style="width: 100%; max-width: 500px;" src="https://img.loigiaihay.com/picture/2018/1115/2_1.png" alt=""></p>
//  </div>
//  <div style="text-align: left;" align="center">
//   <p>\(2 \in [0;3],\)\(\,y(0) = 5,\,\,y(2) = 13,\,\,y(3) = 14\).</p>
//   <p>Vậy giá trị lớn nhất của hàm số trên đoạn [0 ; 3] là 14</p>
//   <p>Chọn đáp án <strong>A.</strong></p>
//   <p><strong>Câu 9.</strong>&nbsp;Tiếp tuyến d song song với đường thẳng \(y = -5x -3\) nên có \(k = -5 \).</p>
//   <p>\(y' = \dfrac{{ - 5}}{{{{\left( {x - 1} \right)}^2}}},\,\,y'({x_0}) =&nbsp;&nbsp;- 5\\ \Rightarrow \,\dfrac{{ - 5}}{{{{\left( {{x_0} - 1} \right)}^2}}} =&nbsp;&nbsp;- 5\\ \Leftrightarrow \left[ \begin{array}{l}{x_0} = 2\\{x_0} = 0\end{array} \right.\)</p>
//   <p>Với&nbsp;\({x_0} = 2\,\, \Rightarrow {y_0} = 7\)</p>
//   <p>\(\Rightarrow d:\,y =&nbsp;&nbsp;- 5\left( {x - 2} \right) + 7\) hay \(d:\,\,y =&nbsp;&nbsp;- 5x + 17\)</p>
//   <p>Với&nbsp;\({x_0} = 0\,\, \Rightarrow {y_0} =&nbsp;&nbsp;- 3\)</p>
//   <p>\(\Rightarrow d:\,y =&nbsp;&nbsp;- 5\left( {x - 0} \right) - 3 =&nbsp;&nbsp;- 5x - 3\)&nbsp;&nbsp;trùng với đường thẳng y= -5x – 3 đề cho.</p>
//   <p>Vậy chỉ có một đường thẳng thỏa mãn yên cầu đề bài.</p>
//   <p>Chọn <strong>A.</strong></p>
//   <p><strong>Câu 10</strong>.&nbsp;\(y' = 3{x^2} - 6x - 9,\,\,y' = 0\)</p>
//   <p>\(\Rightarrow 3{x^2} - 6x - 9 = 0\)</p>
//   <p>\(\Leftrightarrow \,\left[ \begin{array}{l}x = 3\\x =&nbsp;&nbsp;- 1\end{array} \right.\)</p>
//   <p>Ta có bảng biến thiên:</p>
//   <p>&nbsp;<img style="width: 100%; max-width: 500px;" src="https://img.loigiaihay.com/picture/2018/1115/3_1.png" alt=""></p>
//   <p>Đồ thị đạt cực tiểu tại x = 3 nên giá trị cực tiểu là y(3)= - 25.</p>
//   <p>Chọn <strong>C.</strong></p>
//   <p style="text-align: right;"><strong></strong></p>
//  </div>
// </div>
// <div class="clearfix"></div>`;

// let multipleChoises = `<h2 class="s14 lineheight"></h2>
// <p><strong class="content_question">Đề bài</strong></p>
// <p style="text-align: justify;"><strong>I.&nbsp;&nbsp; </strong><strong>ĐỌC HIỂU (3,0 điểm):</strong><strong></strong></p>
// <p style="text-align: justify;"><strong>Đọc đoạn thơ sau và thực hiện các yêu cầu nêu ở dưới:</strong><strong></strong></p>
// <p style="text-align: justify;"><em>(…) Con gặp trong lời mẹ hát Cánh cò trắng, dải đồng xanh Con yêu màu vàng hoa mướp “ Con gà cục tác lá chanh”.</em></p>
// <p style="text-align: justify;"><em>(…) Thời gian chạy qua tóc mẹ Một màu trắng đến nôn nao Lưng mẹ cứ còng dần xuống</em><em></em></p>
// <p style="text-align: justify;"><em>Cho con ngày một thêm cao.</em></p>
// <p style="text-align: justify;"><em>Mẹ ơi trong lời mẹ hát Có cả cuộc đời hiện ra</em><em></em></p>
// <p style="text-align: justify;"><em>Lời ru chắp con đôi cánh Lớn rồi con sẽ bay xa.</em><em></em></p>
// <p style="text-align: right;">( Trích “ <em>Trong lời mẹ hát</em>”- Trương Nam Hương)</p>
// <p style="text-align: justify;"><strong>Câu 1</strong>. Phương thức biểu đạt chính được sử dụng trong đoạn thơ trên là gì? (0,5 điểm)</p>
// <p style="text-align: justify;">A. Tự sự&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; B. Miêu tả</p>
// <p style="text-align: justify;">C. Biểu cảm&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;D. Thuyết minh.</p>
// <p style="text-align: justify;"><strong>Câu 2</strong>. Nêu nội dung của đoạn thơ. (0,5 điểm)</p>
// <p style="text-align: justify;"><strong>Câu 3</strong>. Chỉ ra và nêu hiệu quả nghệ thuật của các biện pháp tu từ trong khổ thơ: (1,0 điểm)</p>
// <p style="text-align: justify;"><em>Thời gian chạy qua tóc mẹ Một màu trắng đến nôn nao Lưng mẹ cứ còng dần xuống Cho con ngày một thêm cao.</em><em></em></p>
// <p style="text-align: justify;"><strong>Câu 4</strong>. Câu thơ/ khổ thơ nào gợi cho anh/chị ấn tượng sâu sắc nhất? (trình bày trong đoạn văn ngắn từ 5 - 7 dòng) (1,0 điểm)</p>
// <p style="text-align: justify;"><strong>II.&nbsp; </strong><strong>LÀM VĂN&nbsp;</strong><strong>(7,0 điểm): </strong></p>
// <p style="text-align: justify;"><strong>Câu 1 (2,0 điểm)</strong></p>
// <p style="text-align: justify;"><strong></strong>Hãy viết một đoạn văn (khoảng 200 chữ) trình bày suy nghĩ của anh/ chị về tình mẫu tử.</p>
// <p style="text-align: justify;"><strong>Câu 2 (5,0 điểm): </strong>Cảm nhận của anh/chị về đoạn thơ sau:</p>
// <p style="text-align: justify;"><em>Sao anh không về chơi thôn Vĩ? </em></p>
// <p style="text-align: justify;"><em>Nhìn nắng hàng cau nắng mới lên. </em></p>
// <p style="text-align: justify;"><em>Vườn ai mướt quá xanh như ngọc </em></p>
// <p style="text-align: justify;"><em>Lá trúc che ngang mặt chữ điền.</em></p>
// <p style="text-align: right;">(Trích <em>Đây thôn Vĩ Dạ</em>- Hàn Mặc Tử)</p>
// <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// <div class="WordSection1">
//  <p style="text-align: justify;"><strong>I. ĐỌC HIỂU (3,0 điểm):</strong><strong></strong></p>
//  <p class="TableParagraph" style="text-align: justify;"><strong>Câu </strong><strong>1.</strong><strong> </strong>Phương thức biểu đạt chính: C. Biểu cảm.</p>
//  <p class="TableParagraph" style="text-align: justify;"><strong>Câu 2.</strong><strong> </strong>Nội dung chính: cảm xúc về lời ru của mẹ, nỗi xót xa và biết ơn của người con trước sự hi sinh thầm lặng của mẹ.&nbsp;&nbsp;&nbsp;&nbsp;</p>
//  <p class="TableParagraph" style="text-align: justify;"><strong>Câu 3</strong><strong>. </strong>Chỉ ra và nêu hiệu quả nghệ thuật của các biện pháp tu từ:</p>
//  <p class="TableParagraph" style="text-align: justify;">- Nhân hóa<em>: thời gian chạy qua tóc mẹ</em><em></em></p>
//  <p class="TableParagraph" style="text-align: justify;"><em>- </em>Tương phản: Lưng mẹ còng xuống <em>&gt;&lt; </em>con thêm cao</p>
//  <p class="TableParagraph" style="text-align: justify;">- Hiệu quả: nhấn mạnh thời gian trôi qua nhanh kéo theo sự già</p>
//  <p class="TableParagraph" style="text-align: justify;">nua của mẹ. Qua đó thể hiện tình yêu thương, biết ơn của con đối với mẹ.&nbsp;&nbsp;&nbsp; <strong></strong></p>
//  <p class="TableParagraph" style="text-align: justify;"><strong>Câu </strong><strong>4. </strong><strong>&nbsp;</strong>HS có thể chọn câu thơ hoặc đoạn thơ bất kì để cảm nhận: ấn tượng về lời ru của mẹ, về công lao của mẹ, về sự biết ơn đối với mẹ…<strong></strong></p>
//  <p class="TableParagraph" style="text-align: justify;"><strong>II.</strong><strong> LÀM VĂN</strong></p>
//  <p class="TableParagraph" style="text-align: justify;"><strong>Câu 1.</strong><strong> Viết một đoạn văn ( khoảng 200 chữ) về tình mẫu tử.</strong></p>
//  <p class="TableParagraph" style="text-align: justify;">a. Đảm bảo cấu trúc đoạn văn nghị luận.</p>
//  <p class="TableParagraph" style="text-align: justify;">Đoạn văn phải có câu chủ đề. Các câu còn lại tập trung thể hiện chủ đề.</p>
//  <p class="TableParagraph" style="text-align: justify;">b. Xác định được đúng vấn đề cần nghị luận</p>
//  <p class="TableParagraph" style="text-align: justify;">Nghị luận về tình mẫu tử.</p>
//  <p class="TableParagraph" style="text-align: justify;">c. Triển khai vấn đề cần nghị luận thành các luận điểm: kết hợp chặt chẽ giữa lí lẽ và dẫn chứng; rút ra bài học nhận thức và hành động.&nbsp;&nbsp;</p>
// </div>
// <div class="WordSection2" style="text-align: justify;">
//  <p class="TableParagraph">Học sinh có thể trình bày theo nhiều cách khác nhau nhưng cần có các thao tác cơ bản sau:</p>
//  <p class="TableParagraph">-&nbsp; Giải thích: Tình mẫu tử là tình mẹ con, nhưng thường được hiểu là tình cảm thương yêu, đùm bọc, che chở… người mẹ dành cho con.</p>
//  <p class="TableParagraph">-&nbsp; Bàn luận:</p>
//  <p class="TableParagraph">+ Tình mẫu tử có vị trí đặc biệt, thiêng liêng nhất đối với mỗi con người.</p>
//  <p class="TableParagraph">+ Tình mẫu tử còn là truyền thống đạo lí tốt đẹp của dân tộc.</p>
//  <p class="TableParagraph">+ Tình mẫu tử là sức mạnh giúp con người vượt lên những khó khăn, vấp ngã trong cuộc sống….</p>
//  <p class="TableParagraph">-&nbsp; Phê phán những hiện tượng trái đạo lí: những người mẹ vứt bỏ con mình, những người con bất hiếu, …</p>
//  <p class="TableParagraph">Bài học nhận thức và hành động của bản thân.&nbsp;&nbsp;</p>
//  <p class="TableParagraph">d. Sáng tạo: Có cách diễn đạt sáng tạo, thể hiện ý nghĩa sâu sắc, mới mẻ về vấn đề nghị luận.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
//  <p class="TableParagraph">e. Chính tả, dùng từ, đặt câu đảm bảo quy tắc chính tả, dùng từ, đặt câu.</p>
//  <p class="TableParagraph"><strong>Câu 2</strong><strong>. Cảm nhận của anh/chị về vẻ đẹp khổ thơ đầu trong bài <em>Đây&nbsp;</em></strong><strong><em>thôn Vĩ Dạ </em></strong><strong>của Hàn Mặc Tử</strong><strong>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></p>
//  <p class="TableParagraph"><strong>a</strong><strong>. Đảm bảo cấu trúc bài nghị luận:</strong></p>
//  <p class="TableParagraph">Có đầy đủ các phần mở bài, thân bài, kết bài.</p>
//  <p class="TableParagraph">Mở đầu bài nêu được vấn đề, thân bài triển khai vấn đề, kết bài kết luận được vấn đề.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
//  <p class="TableParagraph"><strong>b</strong><strong>. Xác định đúng vấn đề cần nghị luận: <em>Vẻ đẹp của bức tranh thiên nhiên và con người thôn Vĩ; Đồng thời thấy được tâm trạng thiết tha, mãnh liệt, trong trẻo của chủ thể trữ tình đối với thiên nhiên và con người xứ Huế; Sự yêu đời, yêu cuộc</em><em></em></strong></p>
//  <p class="TableParagraph"><strong><em>sống của nhà thơ.</em></strong><strong><em>&nbsp;&nbsp;&nbsp;&nbsp; </em></strong></p>
//  <p class="TableParagraph"><strong>c</strong><strong>. </strong>Triển khai vấn đề nghị luận thành các luận điểm; vận dụng tốt các thao tác lập luận; kết hợp chặt chẽ giữa lí lẽ và dẫn chứng.</p>
//  <p class="TableParagraph">-<strong><u>Giới thiệu khái quát</u> về tác giả Hàn Mặc Tử và bài thơ<em>“Đây thôn Vĩ Dạ”; </em>Hoàn cảnh sáng tác bài thơ.</strong><strong></strong></p>
//  <p class="TableParagraph">- <strong><u>Nêu và phân tích luận đề</u>: </strong><em>vẻ đẹp của thiên nhiên con người</em><em>&nbsp; </em><em>xứ Huế và tâm trạng thiết tha với cuộc sống của tác giả </em>trong đoạn thơ:</p>
// </div>
// <p class="TableParagraph" style="text-align: justify;">-&nbsp;&nbsp; <strong>Bức tranh thiên nhiên thôn Vĩ lúc bình minh đẹp, tươi tắn được tái hiện qua nỗi nhớ da diết của thi nhân.</strong><strong></strong></p>
// <p class="TableParagraph" style="text-align: justify;">Thôn Vĩ được tái hiện bằng vài nét vẽ thoáng nhẹ nhưng lại đầy ấn tượng; hài hoà giữa ánh nắng vàng rực rỡ trên hàng cau xanh tươi; hài hoà giữa thiên nhiên và con người ; cảm xúc say đắm mãnh liệt, yêu Huế, yêu người xứ Huế nhưng không thể về với Huế.</p>
// <p class="TableParagraph" style="text-align: justify;"><strong>Chú ý nghệ thuật: từ ngữ, hình ảnh thơ, câu hỏi, so sánh.</strong><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
// <p class="TableParagraph" style="text-align: justify;"><strong>d</strong><strong>. Sáng tạo: </strong>Có cách diễn đạt sáng tạo, thể hiện ý nghĩa sâu sắc, mới mẻ về vấn đề nghị luận, văn phong trong sáng, giàu cảm xúc&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p class="TableParagraph" style="text-align: justify;"><strong>e</strong><strong>. Chính tả, dùng từ, đặt câu: </strong>không mắc lỗi chính tả, dùng từ, đặt câu</p>
// <p class="TableParagraph" style="text-align: right;"><strong></strong></p>
// <div class="clearfix"></div>`;

let multipleChoises = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;"><strong>Câu 1:</strong> Cho chuyển động xác định bởi phương trình \(S = {t^3} - 3{t^2} - 9t\), trong đó <em>t</em> được tính bằng giây và \(S\) được tính bằng mét. Tính vận tốc tại thời điểm gia tốc triệt tiêu.</p>
<p style="text-align: justify;"><strong>A. </strong>\( - 12\)<em> m/s</em></p>
<p style="text-align: justify;"><strong>B. </strong>\( - 21\)<em> m/s</em></p>
<p style="text-align: justify;"><strong>C. </strong>\( - 12\)<em> m</em>/<em>s</em><sup>2</sup></p>
<p style="text-align: justify;"><strong>D. </strong>\(12\)<em> m/s</em></p>
<p style="text-align: justify;"><strong>Câu 2:</strong> Hàm số \(y = 2{x^4} + 1\) đồng biến trên khoảng nào?</p>
<p style="text-align: justify;"><strong>A. </strong>\(\left( {0; + \infty } \right)\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(\left( { - \dfrac{1}{2}; + \infty } \right)\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>C. </strong>\(\left( { - \infty ; - \dfrac{1}{2}} \right)\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(\left( { - \infty ;0} \right)\)</p>
<p style="text-align: justify;"><strong>Câu 3:</strong> Hình đa diện nào sau đây có tâm đối xứng?</p>
<p style="text-align: justify;"><strong>A.</strong><strong> </strong>Hình hộp chữ nhật</p>
<p style="text-align: justify;"><strong>B.</strong><strong> </strong>Hình tứ diện đều</p>
<p style="text-align: justify;"><strong>C.</strong><strong> </strong>Hình chóp tứ giác đều</p>
<p style="text-align: justify;"><strong>D.</strong><strong> </strong>Hình lăng trụ tam giác</p>
<p style="text-align: justify;"><strong>Câu 4:</strong> Cho hai hàm số \(f(x) = \dfrac{1}{{x\sqrt 2 }}\) và\(g(x) = \dfrac{{{x^2}}}{{\sqrt 2 }}\) . Gọi \({d_1},{\rm{ }}{d_2}\) lần lượt là tiếp tuyến của mỗi đồ thị hàm số <em>f(x)</em>&nbsp;, <em>g(x)</em> đã cho tại giao điểm của chúng. Hỏi góc giữa hai tiếp tuyến trên bằng bao nhiêu?</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \({60^0}\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. \({45^0}\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \({30^0}\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. \({90^0}\)</strong></p>
<p style="text-align: justify;"><strong>Câu 5:</strong> Hình hộp đứng đáy là hình thoi có bao nhiêu mặt phẳng đối xứng?</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(1\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. \(3\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(4\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. \(2\)</strong></p>
<p style="text-align: justify;"><strong>Câu 6:</strong> Cho hàm số \(y = f(x) = {x^3} + 6{x^2} + 9x + 3{\rm{ }}\left( C \right)\).Tồn tại hai tiếp tuyến của (C) phân biệt và có cùng hệ số góc <em>k</em>, đồng thời đường thẳng đi qua các tiếp điểm của hai tiếp tuyến đó cắt các trục O<em>x</em>, O<em>y</em> tương ứng tại <em>A</em> và <em>B</em> sao cho \(OA = 2017.OB\). Hỏi có bao nhiêu giá trị của <em>k</em> thỏa mãn yêu cầu bài toán?</p>
<p style="text-align: justify;"><strong>A.</strong><strong> </strong>0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>1</p>
<p style="text-align: justify;"><strong>C.</strong><strong> </strong>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>3</p>
<p style="text-align: justify;"><strong>Câu 7:</strong> Tìm tất cả các số tự nhiên \(k\) sao cho \(C_{14}^k,\,\,C_{14}^{k + 1},\,\,C_{14}^{k + 2}\) theo thứ tự lập thành một cấp số cộng.</p>
<p style="text-align: justify;"><strong>A. </strong>\(k = 4,\,\,k = 5\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(k = 3,\,\,k = 9\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(k = 7,\,\,k = 8\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(k = 4,\,\,k = 8\)</p>
<p style="text-align: justify;"><strong>Câu 8:</strong> Trong các dãy số sau, dãy số nào là cấp số cộng?</p>
<p style="text-align: justify;"><strong>A. </strong>\({u_n} = {n^2}\)</p>
<p style="text-align: justify;"><strong>B. </strong>\({u_n} = {( - 1)^n}n\)</p>
<p style="text-align: justify;"><strong>C. </strong>\({u_n} = \dfrac{n}{{{3^n}}}\)</p>
<p style="text-align: justify;"><strong>D. </strong>\({u_n} = 2n\)</p>
<p style="text-align: justify;"><strong>Câu 9:</strong> Cho hàm số \(f(x) = \left\{ \begin{array}{l}\dfrac{{\sqrt {2x + 1}&nbsp; - 1}}{x}{\rm{ }}\,\,\,\,\,{\rm{ khi&nbsp; }}x \ne 0\\{m^2} - 2m{\rm{ }} + 2\,\,\,\,\,{\rm{khi }}x{\rm{&nbsp; =&nbsp; 0}}\end{array} \right.\) . Tìm tất cả các giá trị của tham số <em>m</em> để hàm số liên tục tại \(x = 0\).</p>
<p style="text-align: justify;"><strong>A. </strong>\(m = 2\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>\(m = 3\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(m = 0\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>\(m = 1\)</p>
<p style="text-align: justify;"><strong>Câu 10:</strong> Tính thể tích của khối tứ diện đều có cạnh bằng 2.</p>
<p style="text-align: justify;"><strong>A. </strong>\(\dfrac{{4\sqrt 2 }}{3}\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(\sqrt 2 \)</p>
<p style="text-align: justify;"><strong>C. </strong>\(\dfrac{{2\sqrt 2 }}{3}\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(2\sqrt 2 \)</p>
<p style="text-align: justify;"><strong>Câu 11:</strong> Tìm tất cả các giá trị thực của tham số \(m\) sao cho đồ thị của hàm số \(y = {x^4} + 2m{x^2} + 1\) có ba điểm cực trị tạo thành tam giác vuông cân.</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(m =&nbsp; - \sqrt[3]{3}\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(m =&nbsp; - 1\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(m =&nbsp; - 1;m = \sqrt[3]{3}\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(m =&nbsp; - \sqrt[3]{3};m = 1\)</strong></p>
<p style="text-align: justify;"><strong>Câu 12:</strong> Gieo ngẫu nhiên 2 con súc sắc cân đối đồng chất. Tính xác suất để tổng số chấm xuất hiện trên 2 con súc sắc đó bằng 7.</p>
<p style="text-align: justify;"><strong>A. </strong>\(\dfrac{7}{{12}}\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(\dfrac{1}{6}\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(\dfrac{1}{2}\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(\dfrac{1}{3}\).</p>
<p style="text-align: justify;"><strong>Câu 13:</strong> Cho hàm số \(y = \dfrac{{x - 2}}{{x + 2}}\)có đồ thị (C). Tìm tọa độ giao điểm <em>I </em>của hai đường tiệm cận của đồ thị (C).</p>
<p style="text-align: justify;"><strong>A. </strong>\(I\left( { - 2;2} \right)\).</p>
<p style="text-align: justify;"><strong>B. </strong>\(I\left( { - 2; - 2} \right)\).</p>
<p style="text-align: justify;"><strong>C. </strong>\(I\left( {2;1} \right)\).</p>
<p style="text-align: justify;"><strong>D. </strong>\(I\left( { - 2;1} \right)\).</p>
<p style="text-align: justify;"><strong>Câu 14:</strong> Cho khối lăng trụ \(ABC.A'B'C'\) có thể tích bằng 2017. Tính thể tích khối đa diện \(ABCB'C'\).</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(\dfrac{{2017}}{2}\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(\dfrac{{4034}}{3}\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(\dfrac{{6051}}{4}\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(\dfrac{{2017}}{4}\)</strong></p>
<p style="text-align: justify;"><strong>Câu 15:</strong> Tìm tất cả các giá trị thực của than số \(m\) để phương trình \(5\cos x - m\sin x = m + 1\) có nghiệm.</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(m \le 12\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(m \le&nbsp; - 13\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(m \le 24\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(m \ge 24\)</strong></p>
<p style="text-align: justify;"><strong>Câu 16:</strong> Cho hàm số \(f(x)\) thỏa mãn \(f'(x) = 2 - 5\sin x\) và \(f(0) = 10\). Mệnh đề nào dưới đây đúng?</p>
<p style="text-align: justify;"><strong>A. </strong>\(f(x) = 2x + 5\cos x + 5\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(f(x) = 2x + 5\cos x + 3\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(f(x) = 2x - 5\cos x + 10\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(f(x) = 2x - 5\cos x + 15\)</p>
<p style="text-align: justify;"><strong>Câu 17:</strong> Cho \(I = \mathop {\lim }\limits_{x \to 0} \dfrac{{\sqrt {2x + 1}&nbsp; - 1}}{x}\) và&nbsp; \(J = \mathop {\lim }\limits_{x \to 1} \dfrac{{{x^2} + x - 2}}{{x - 1}}\) . Tính&nbsp; \(I + J\).</p>
<p style="text-align: justify;"><strong>A. </strong>3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>5</p>
<p style="text-align: justify;"><strong>C. </strong>4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>2</p>
<p style="text-align: justify;"><strong>Câu 18:</strong> Trong mặt phẳng với hệ tọa độ <em>Oxy</em>, cho hai đường thẳng \(\left( {{d_1}} \right):2x - 3y + 1 = 0\) và \(\left( {{d_2}} \right):x + y - 2 = 0\). Có bao nhiêu phép tịnh tiến biến \({d_1}\) thành \({d_2}\) .</p>
<p style="text-align: justify;"><strong>A.</strong><strong> </strong>Vô số&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>0</p>
<p style="text-align: justify;"><strong>C.</strong><strong> </strong>1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>4</p>
<p style="text-align: justify;"><strong>Câu 19:</strong> Trong các dãy số sau, dãy số nào là dãy số tăng?</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \({u_n} = \dfrac{n}{{{3^n}}}\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \({u_n} = \dfrac{{n + 3}}{{n + 1}}\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \({u_n} = {n^2} + 2n\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \({u_n} = \dfrac{{{{( - 1)}^n}}}{{{3^n}}}\)</strong></p>
<p style="text-align: justify;"><strong>Câu 20:</strong> Một tổ có 5 học sinh nam và 6 học sinh nữ. Giáo viên chọn ngẫu nhiên 3 học sinh để làm trực nhật. Tính xác suất để 3 học sinh được chọn có cả nam và nữ.</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(\dfrac{3}{8}\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(\dfrac{{24}}{{25}}\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(\dfrac{9}{{11}}\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(\dfrac{3}{4}\)</strong></p>
<p style="text-align: justify;"><strong>Câu 21:</strong> Giải phương trình \(\sin x + \cos x = \sqrt 2 \sin 5x\).</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(\left[ \begin{array}{l}x = \dfrac{\pi }{{18}} + k\dfrac{\pi }{2}\\x = \dfrac{\pi }{9} + k\dfrac{\pi }{3}\end{array} \right.\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(\left[ \begin{array}{l}x = \dfrac{\pi }{{12}} + k\dfrac{\pi }{2}\\x = \dfrac{\pi }{{24}} + k\dfrac{\pi }{3}\end{array} \right.\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(\left[ \begin{array}{l}x = \dfrac{\pi }{{16}} + k\dfrac{\pi }{2}\\x = \dfrac{\pi }{8} + k\dfrac{\pi }{3}\end{array} \right.\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(\left[ \begin{array}{l}x = \dfrac{\pi }{4} + k\dfrac{\pi }{2}\\x = \dfrac{\pi }{6} + k\dfrac{\pi }{3}\end{array} \right.\)</strong></p>
<p style="text-align: justify;"><strong>Câu 22:</strong> Tìm hệ số của \({x^5}\) trong khai triển thành đa thức của \({(2x + 3)^8}\).</p>
<p style="text-align: justify;"><strong>A. </strong>\( - C_8^5{.2^5}{.3^3}\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(C_8^3{.2^5}{.3^3}\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(C_8^3{.2^3}{.3^5}\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(C_8^5{.2^2}{.3^6}\)</p>
<p style="text-align: justify;"><strong>Câu 23:</strong> Tính đạo hàm của hàm số \(f(x) = \sin 2x - {\cos ^2}3x\).</p>
<p style="text-align: justify;"><strong>A. </strong>\(f'(x) = 2\cos 2x + 3\sin 6x\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(f'(x) = 2\cos 2x - 3\sin 6x\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(f'(x) = 2\cos 2x - 2\sin 3x\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(f'(x) = \cos 2x + 2\sin 3x\)</p>
<p style="text-align: justify;"><strong>Câu 24:</strong> Xét hàm số \(y = \sqrt {4 - 3x} \) trên đoạn\(\left[ { - 1;1} \right]\). Mệnh đề nào sau đây đúng?</p>
<p style="text-align: justify;"><strong>A. </strong>Hàm số có cực trị trên khoảng \(\left( { - 1;1} \right)\).</p>
<p style="text-align: justify;"><strong>B. </strong>Hàm số không có giá trị lớn nhất và giá trị nhỏ nhất trên đoạn \(\left[ { - 1;1} \right]\).</p>
<p style="text-align: justify;"><strong>C. </strong>Hàm số đồng biến trên đoạn \(\left[ { - 1;1} \right]\).</p>
<p style="text-align: justify;"><strong>D. </strong>Hàm số đạt giá trị nhỏ nhất tại \(x = 1\)và đạt giá trị lớn nhất tại \(x =&nbsp; - 1\).</p>
<p style="text-align: justify;"><strong>Câu 25:</strong> Cho hình thoi \(ABCD\) tâm <em>O</em> (như hình vẽ). Trong các mệnh đề sau, mệnh đề nào là mệnh đề đúng?</p>
<p style="text-align: justify;" align="center"><img style="width: 100%; max-width: 173px;" src="https://img./picture/2019/0108/hinh-de-1-1.jpg" alt="">&nbsp;</p>
<p style="text-align: justify;"><strong>A. </strong>Phép quay tâm \(O,\) góc \(\dfrac{\pi }{2}\) biến tam giác \(OBC\) thành tam giác \(OCD\).</p>
<p style="text-align: justify;"><strong>B. </strong>Phép vị tự tâm \(O\), tỷ số \(k =&nbsp; - 1\) biến tam giác \(ABD\) thành tam giác \(CDB\).</p>
<p style="text-align: justify;"><strong>C. </strong>Phép tịnh tiến theo vec tơ \(\overrightarrow {AD} \) biến tam giác \(ABD\) thành tam giác \(DCB\).</p>
<p style="text-align: justify;"><strong>D. </strong>Phép vị tự tâm \(O,\) tỷ số \(k = 1\) biến tam giác \(OBC\) thành tam giác \(ODA\).</p>
<p style="text-align: justify;"><strong>Câu 26:</strong> Cho cấp số nhân \(({u_n});{u_1} = 3,q = \dfrac{{ - 1}}{2}\). Hỏi số \(\dfrac{3}{{256}}\)là số hạng thứ mấy?</p>
<p style="text-align: justify;"><strong>A. </strong>9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>10</p>
<p style="text-align: justify;"><strong>C. </strong>8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>11</p>
<p style="text-align: justify;"><strong>Câu 27:</strong> Đồ thị của hàm số \(y = {x^3} - 3{x^2} - 9x + 1\) có hai điểm cực trị \(A\) và <em>B</em>. Điểm nào dưới đây thuộc đường thẳng <em>AB </em>?</p>
<p style="text-align: justify;"><strong>A. </strong>\(M\left( {1; - 10} \right)\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(N\left( { - 1;10} \right)\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(P\left( {1;0} \right)\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(Q\left( {0; - 1} \right)\)</p>
<p style="text-align: justify;"><strong>Câu 28:</strong> Cho hình chóp <em>S.ABCD</em> có đáy <em>ABCD</em> là hình chữ nhật,\(AB = a,AD = a\sqrt 2 \), đường thẳng <em>SA</em> vuông góc với mặt phẳng (<em>ABCD</em>); góc giữa đường thẳng <em>SC</em> và mặt phẳng (<em>ABCD</em>) bằng \({60^0}\). Tính theo <em>a</em> thể tích khối chóp <em>S.ABCD</em>.</p>
<p style="text-align: justify;"><strong>A. </strong>\(3\sqrt 2 {a^3}\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(\sqrt 6 {a^3}\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(3{a^3}\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(\sqrt 2 {a^3}\)</p>
<p style="text-align: justify;"><strong>Câu 29:</strong> Cho hình chóp \(S.ABC\) đáy <em>ABC</em> là tam giác cân tại <em>C</em>, cạnh bên <em>SA</em> vuông góc với đáy. Gọi \(H,K\) lần lượt là trung điểm của <em>AB</em> và <em>SB</em>. Trong các mệnh đề sau, mệnh đề nào là mệnh đề <strong>sai</strong>?</p>
<p style="text-align: justify;"><strong>A.</strong>\(CH \bot SB\)<strong> </strong></p>
<p style="text-align: justify;"><strong>B.</strong>\(CH \bot AK\)<strong> </strong></p>
<p style="text-align: justify;"><strong>C.</strong>\(AK \bot BC\)<strong></strong></p>
<p style="text-align: justify;"><strong>D.</strong>\(HK \bot HC\)<strong> </strong></p>
<p style="text-align: justify;"><strong>Câu 30:</strong> Phát biểu nào sau đây là đúng?</p>
<p style="text-align: justify;"><strong>A. </strong>Hàm số \(y = f\left( x \right)\) đạt cực trị tại \({x_0}\) khi và chỉ khi \({x_0}\) là nghiệm của đạo hàm.</p>
<p style="text-align: justify;"><strong>B. </strong>Nếu \(f'\left( {{x_0}} \right) = 0\) và \(f''\left( {{x_0}} \right) &gt; 0\) thì hàm số đạt cực đại tại \({x_0}\).</p>
<p style="text-align: justify;"><strong>C. </strong>Nếu \(f'\left( {{x_0}} \right) = 0\) và \(f''\left( {{x_0}} \right) = 0\) thì \({x_0}\) không phải là cực trị của hàm số \(y = f\left( x \right)\) đã cho.</p>
<p style="text-align: justify;"><strong>D.</strong><strong> </strong>Nếu \(f'\left( x \right)\) đổi dấu khi \(x\) qua điểm \({x_0}\) và \(f\left( x \right)\) liên tục tại \({x_0}\) thì hàm số \(y = f\left( x \right)\) đạt cực trị tại điểm \({x_0}\).</p>
<p style="text-align: justify;"><strong>Câu 31:</strong> Tìm tất cả các giá trị thực của tham số <em>m</em> để đường thẳng \(y = mx - m + 1\) cắt đồ thị của hàm số \(y = {x^3} - 3{x^2} + x + 2\) tại ba điểm phân biệt <em>A, B, C </em>sao cho \(AB = BC\)<em>.</em></p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(m \in \left( { - \infty ;0} \right] \cup \left[ {4; + \infty } \right).\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(m \in \mathbb{R}.\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(m \in \left( { - \dfrac{5}{4}; + \infty } \right).\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(m \in \left( { - 2; + \infty } \right)\)</strong></p>
<p style="text-align: justify;"><strong>Câu 32:</strong> Tìm tập giá trị <em>T</em> của hàm số \(y = \sqrt {x - 3}&nbsp; + \sqrt {5 - x} \)</p>
<p style="text-align: justify;"><strong>A. </strong>\(T = \left[ {0;\sqrt 2 } \right]\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(T = \left[ {3;5} \right]\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(T = \left[ {\sqrt 2 ;2} \right]\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(T = \left( {3;5} \right)\)</p>
<p style="text-align: justify;"><strong>Câu 33:</strong> Cho hàm số \(y = f\left( x \right)\) xác định, liên tục trên \(\mathbb{R}\) và có bảng biến thiên như sau:</p>
<p style="text-align: justify;" align="center"><img style="width: 100%; max-width: 356px;" src="https://img.loigiaihay.com/picture/2019/0108/hinh-de-1-2.jpg" alt="">&nbsp;</p>
<p style="text-align: justify;">Tìm tất cả các giá trị thực của tham số <em>m</em> để phương trình \(f\left( {\left| x \right|} \right) = 2m + 1\) có bốn nghiệm phân biệt?</p>
<p style="text-align: justify;"><strong>A. </strong>\( - \dfrac{1}{2} \le m \le 0\)</p>
<p style="text-align: justify;"><strong>B. </strong>\( - \dfrac{1}{2} &lt; m &lt; 0\)</p>
<p style="text-align: justify;"><strong>C. </strong>\( - 1 &lt; m &lt;&nbsp; - \dfrac{1}{2}\)</p>
<p style="text-align: justify;"><strong>D. </strong>\( - 1 \le m \le&nbsp; - \dfrac{1}{2}\)</p>
<p style="text-align: justify;"><strong>Câu 34:</strong> Phương trình \(\sin x + \cos x = 1\) có bao nhiêu nghiệm trên khoảng \((0;\pi )?\)</p>
<p style="text-align: justify;"><strong>A. </strong>\(1\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>\(0\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(2\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>\(3\).</p>
<p style="text-align: justify;"><strong>Câu 35:</strong> Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm số được liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi hàm số đó là hàm số nào?</p>
<p style="text-align: justify;"><strong>A.&nbsp;</strong>\(y = {x^4} - {x^2} + 1\).</p>
<p style="text-align: justify;"><strong>B.&nbsp;</strong>\(y =&nbsp; - {x^3} + 3x + 1\).</p>
<p style="text-align: justify;"><strong>C.&nbsp;</strong>\(y = {x^3} - 3x + 1\).</p>
<p style="text-align: justify;"><strong>D.&nbsp;</strong>\(y =&nbsp; - {x^2} + x - 1\).</p>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;"><strong><img style="width: 100%; max-width: 179px;" src="https://img.loigiaihay.com/picture/2019/0108/hinh-de-1-3.jpg" alt=""></strong></p>
<p style="text-align: justify;"><strong>Câu 36:</strong> Cho tam giác \(ABC\) cân tại đỉnh \(A\). Biết độ dài cạnh đáy \(BC\) , đường cao \(AH\) và cạnh bên \(AB\) theo thứ tự lập thành cấp số nhân với công bội \(q\) . Giá trị của \({q^2}\) bằng:</p>
<p style="text-align: justify;"><strong>A.&nbsp;</strong>\(\dfrac{{2 + \sqrt 2 }}{2}\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(\dfrac{{2 - \sqrt 2 }}{2}\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(\dfrac{{\sqrt 2&nbsp; + 1}}{2}\)</p>
<p style="text-align: justify;"><strong>D.&nbsp;</strong>\(\dfrac{{\sqrt 2&nbsp; - 1}}{2}\)</p>
<p style="text-align: justify;"><strong>Câu 37:</strong> Tìm số tất cả tự nhiên \(n\) thỏa mãn \(\dfrac{{C_n^0}}{{1.2}} + \dfrac{{C_n^1}}{{2.3}} + \dfrac{{C_n^2}}{{3.4}} + ... + \dfrac{{C_n^n}}{{(n + 1)(n + 2)}} \)\(\;= \dfrac{{{2^{100}} - n - 3}}{{(n + 1)(n + 2)}}\)</p>
<p style="text-align: justify;"><strong>A. </strong>\(n = 100\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(n = 98\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(n = 99\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(n = 101\)</p>
<p style="text-align: justify;"><strong>Câu 38:</strong> Giải phương trình \(\sin 2x = {\cos ^4}\dfrac{x}{2} - {\sin ^4}\dfrac{x}{2}\).</p>
<p style="text-align: justify;"><strong>A. </strong>\(\left[ \begin{array}{l}x = \dfrac{\pi }{6} + k\dfrac{{2\pi }}{3}\\x = \dfrac{\pi }{2} + k2\pi \end{array} \right.\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(\left[ \begin{array}{l}x = \dfrac{\pi }{4} + k\dfrac{\pi }{2}\\x = \dfrac{\pi }{2} + k\pi \end{array} \right.\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(\left[ \begin{array}{l}x = \dfrac{\pi }{3} + k\pi \\x = \dfrac{{3\pi }}{2} + k2\pi \end{array} \right.\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(\left[ \begin{array}{l}x = \dfrac{\pi }{{12}} + k\dfrac{\pi }{2}\\x = \dfrac{{3\pi }}{4} + k\pi \end{array} \right.\)</p>
<p style="text-align: justify;"><strong>Câu 39:</strong> Cho hình lăng trụ \(ABC.A'B'C'\) có đáy là tam giác đều cạnh \(a.\) Hình chiếu vuông góc của điểm \(A'\) lên mặt phẳng \(\left( {ABC} \right)\) trùng với trọng tâm tam giác \(ABC.\) Biết khoảng cách giữa hai đường thẳng \(AA'\) và \(BC\) bằng \(\dfrac{{a\sqrt 3 }}{4}.\) Tính theo <em>a</em> thể tích \(V\) của khối lăng trụ \(ABC.A'B'C'.\)</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(V = \dfrac{{{a^3}\sqrt 3 }}{6}\)</strong>.</p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(V = \dfrac{{{a^3}\sqrt 3 }}{{12}}\)</strong>.</p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(V = \dfrac{{{a^3}\sqrt 3 }}{3}\)</strong>.</p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(V = \dfrac{{{a^3}\sqrt 3 }}{{24}}\)</strong>.</p>
<p style="text-align: justify;"><strong>Câu 40:</strong> Cho khối tứ diện <em>ABCD</em> có thể tích <em>V</em>. Gọi <em>M, N, P, Q</em> lần lượt là trọng tâm của các tam giác <em>ABC, ABD, ACD, BCD</em>. Tính theo <em>V</em> thể tích của khối tứ diện <em>MNPQ</em>.</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(\dfrac{V}{{27}}\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(\dfrac{{4V}}{{27}}\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(\dfrac{{2V}}{{81}}\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(\dfrac{V}{9}\)</strong></p>
<p style="text-align: justify;"><strong>Câu 41:</strong> Tìm giá trị lớn nhất của hàm số \(y = 1 - 2\cos x - {\cos ^2}x\).</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(2\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. \(3\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(0\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. \(5\)</strong></p>
<p style="text-align: justify;"><strong>Câu 42:</strong> Hình lăng trụ \(ABC.A'B'C'\) có đáy \(ABC\) là tam giác vuông tại \(A;{\rm{ }}AB = a;{\rm{ }}AC = 2a.\) Hình chiếu vuông góc của \(A'\) trên \(\left( {ABC} \right)\) nằm trên đường thẳng \(BC\). Tính theo <em>a</em> khoảng cách từ điểm \(A\) đến mặt phẳng \(\left( {A'BC} \right)\).</p>
<p style="text-align: justify;"><strong>A.</strong><strong> </strong>\(\dfrac{{2a}}{3}\)</p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(\dfrac{{2a\sqrt 5 }}{5}\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(\dfrac{{a\sqrt 3 }}{2}\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(a\)</strong></p>
<p style="text-align: justify;"><strong>Câu 43:</strong> Cho hình chóp <em>S</em>.<em>ABCD</em> đáy <em>ABCD</em> là hình thoi tâm <em>O</em>, đường thẳng <em>SO</em> vuông góc với&nbsp; mặt phẳng (<em>ABCD</em>). Biết \(AB = SB = a,SO = \dfrac{{a\sqrt 6 }}{3}\). Tìm số đo của góc giữa hai mặt phẳng (<em>SAB</em>) và (<em>SAD</em>).</p>
<p style="text-align: justify;"><strong>A.</strong><strong> </strong>30<sup>0</sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>45<sup>0</sup></p>
<p style="text-align: justify;"><strong>C.</strong><strong> </strong>60<sup>0</sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>90<sup>0</sup></p>
<p style="text-align: justify;"><strong>Câu 44:</strong> Tìm tất cả các giá trị của tham số \(m\) để đường thẳng \(y =&nbsp; - 2x + m\) cắt đồ thị (<em>H</em>) của hàm số \(y = \dfrac{{2x + 3}}{{x + 2}}\) tại hai điểm\(A,{\rm{ }}B\) phân biệt sao cho \(P = k_1^{2018} + k_2^{2018}\) đạt giá trị nhỏ nhất (với \({k_1},{k_2}\) là hệ số góc của tiếp tuyến tại \(A,{\rm{ }}B\) của đồ thị (<em>H</em>).</p>
<p style="text-align: justify;"><strong>A. </strong>\(m =&nbsp; - 3\)</p>
<p style="text-align: justify;"><strong>B. </strong>\(m =&nbsp; - 2\)</p>
<p style="text-align: justify;"><strong>C. </strong>\(m = 3\)</p>
<p style="text-align: justify;"><strong>D. </strong>\(m = 2\)</p>
<p style="text-align: justify;"><strong>Câu 45:</strong> Giám đốc một nhà hát A đang phân vân trong việc xác định mức giá vé xem các chương trình được trình chiếu trong nhà hát. Việc này rất quan trọng, nó sẽ quyết định nhà hát thu được bao nhiêu lợi nhuận từ các buổi trình chiếu. Theo những cuốn sổ ghi chép của mình, Ông ta xác định rằng: nếu giá vé vào cửa là 20 USD/người thì trung bình có 1000 người đến xem. Nhưng nếu tăng thêm 1 USD/người thì sẽ mất 100 khách hàng hoặc giảm đi 1 USD/người thì sẽ có thêm 100 khách hàng trong số trung bình. Biết rằng, trung bình, mỗi khách hàng còn đem lại 2 USD lợi nhuận cho nhà hát trong các dịch vụ đi kèm. Hãy giúp Giám đốc nhà hát này xác định xem cần tính giá vé vào cửa là bao nhiêu để nhập là lớn nhất?</p>
<p style="text-align: justify;"><strong>A.</strong><strong> </strong>21 USD/người</p>
<p style="text-align: justify;"><strong>B.</strong><strong> </strong>18 USD/người</p>
<p style="text-align: justify;"><strong>C.</strong><strong> </strong>14 USD/người</p>
<p style="text-align: justify;"><strong>D.</strong><strong> </strong>16 USD/người</p>
<p style="text-align: justify;"><strong>Câu 46:</strong> Cho khối lăng trụ \(ABC.A'B'C'\)có thể tích bằng 2018. Gọi <em>M</em> là trung điểm \(AA'\)<em>; N, P</em> lần lượt là các điểm nằm trên các cạnh \(BB',CC'\)&nbsp; sao cho \(BN = 2B'N,{\rm{ }}CP = 3C'P\). Tính thể tích khối đa diện <em>ABCMNP</em>.</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(\dfrac{{4036}}{3}\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(\dfrac{{32288}}{{27}}\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(\dfrac{{40360}}{{27}}\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(\dfrac{{23207}}{{18}}\)</strong></p>
<p style="text-align: justify;"><strong>Câu 47:</strong> Cho hình chóp \(S.ABCD\) có đáy <em>ABCD</em> là hình thang cân, \(AD = 2AB = 2BC = 2CD = 2a\). Hai mặt phẳng (<em>SAB</em>) và (<em>SAD</em>) cùng vuông góc với mặt phẳng (<em>ABCD</em>). Gọi \(M,{\rm{ }}N\) lần lượt là trung điểm của \(SB\) và \(CD\). Tính cosin góc giữa \(MN\) và \(\left( {SAC} \right)\), biết thể tích khối chóp <em>S.ABCD</em> bằng \(\dfrac{{{a^3}\sqrt 3 }}{4}\).</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(\dfrac{{\sqrt {310} }}{{20}}\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(\dfrac{{3\sqrt 5 }}{{10}}\)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(\dfrac{{3\sqrt {310} }}{{20}}\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(\dfrac{{\sqrt 5 }}{{10}}\)</strong></p>
<p style="text-align: justify;"><strong>Câu 48:</strong> Trong bốn hàm số: \((1){\rm{ }}y = \sin 2x;{\rm{ }}(2){\rm{ }}y = \cos 4x;\) \({\rm{ (3) }}y = \tan 2x;{\rm{ }}(4){\rm{ }}y = \cot 3x\) có mấy hàm số tuần hoàn với chu kỳ \(\dfrac{\pi }{2}\)?</p>
<p style="text-align: justify;"><strong>A. </strong>0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B. </strong>2</p>
<p style="text-align: justify;"><strong>C. </strong>3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D. </strong>1</p>
<p style="text-align: justify;"><strong>Câu 49:</strong> Trong không gian, cho các mệnh đề sau, mệnh đề nào là mệnh đề đúng?<strong></strong></p>
<p style="text-align: justify;"><strong>A.</strong><strong> </strong>Một đường thẳng vuông góc với một trong hai đường thẳng vuông góc thì song song với đường thẳng còn lại</p>
<p style="text-align: justify;"><strong>B.</strong><strong> </strong>Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì song song với nhau.</p>
<p style="text-align: justify;"><strong>C.</strong><strong> </strong>Một đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường thẳng còn lại.</p>
<p style="text-align: justify;"><strong>D.</strong><strong> </strong>Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì vuông góc với nhau</p>
<p style="text-align: justify;"><strong>Câu 50:</strong> Cho hình lăng trụ tam giác đều có cạnh đáy bằng <em>2a</em> và có các mặt bên đều là hình vuông. Tính theo <em>a</em> thể tích khối lăng trụ đã cho.</p>
<p style="text-align: justify;"><strong>A.</strong><strong> \(\dfrac{{2{a^3}\sqrt 2 }}{3}\)</strong></p>
<p style="text-align: justify;"><strong>B.</strong><strong> \(3{a^3}\sqrt 2 \)</strong></p>
<p style="text-align: justify;"><strong>C.</strong><strong> \(\dfrac{{2{a^3}\sqrt 2 }}{4}\)</strong></p>
<p style="text-align: justify;"><strong>D.</strong><strong> \(2{a^3}\sqrt 3 \)</strong></p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <tbody>
  <tr>
   <td width="141"> <p align="center"><strong>1A</strong></p> </td>
   <td width="141"> <p align="center"><strong>11B</strong></p> </td>
   <td width="141"> <p align="center"><strong>21C</strong></p> </td>
   <td width="141"> <p align="center"><strong>31D</strong></p> </td>
   <td width="141"> <p align="center"><strong>41A</strong></p> </td>
  </tr>
  <tr>
   <td width="141"> <p align="center"><strong>2A</strong></p> </td>
   <td width="141"> <p align="center"><strong>12B</strong></p> </td>
   <td width="141"> <p align="center"><strong>22B</strong></p> </td>
   <td width="141"> <p align="center"><strong>32C</strong></p> </td>
   <td width="141"> <p align="center"><strong>42B</strong></p> </td>
  </tr>
  <tr>
   <td width="141"> <p align="center"><strong>3A</strong></p> </td>
   <td width="141"> <p align="center"><strong>13D</strong></p> </td>
   <td width="141"> <p align="center"><strong>23A</strong></p> </td>
   <td width="141"> <p align="center"><strong>33C</strong></p> </td>
   <td width="141"> <p align="center"><strong>43D</strong></p> </td>
  </tr>
  <tr>
   <td width="141"> <p align="center"><strong>4D</strong></p> </td>
   <td width="141"> <p align="center"><strong>14B</strong></p> </td>
   <td width="141"> <p align="center"><strong>24D</strong></p> </td>
   <td width="141"> <p align="center"><strong>34A</strong></p> </td>
   <td width="141"> <p align="center"><strong>44B</strong></p> </td>
  </tr>
  <tr>
   <td width="141"> <p align="center"><strong>5B</strong></p> </td>
   <td width="141"> <p align="center"><strong>15A</strong></p> </td>
   <td width="141"> <p align="center"><strong>25B</strong></p> </td>
   <td width="141"> <p align="center"><strong>35C</strong></p> </td>
   <td width="141"> <p align="center"><strong>45C</strong></p> </td>
  </tr>
  <tr>
   <td width="141"> <p align="center"><strong>6C</strong></p> </td>
   <td width="141"> <p align="center"><strong>16A</strong></p> </td>
   <td width="141"> <p align="center"><strong>26A</strong></p> </td>
   <td width="141"> <p align="center"><strong>36C</strong></p> </td>
   <td width="141"> <p align="center"><strong>46D</strong></p> </td>
  </tr>
  <tr>
   <td width="141"> <p align="center"><strong>7D</strong></p> </td>
   <td width="141"> <p align="center"><strong>17C</strong></p> </td>
   <td width="141"> <p align="center"><strong>27A</strong></p> </td>
   <td width="141"> <p align="center"><strong>37B</strong></p> </td>
   <td width="141"> <p align="center"><strong>47A</strong></p> </td>
  </tr>
  <tr>
   <td width="141"> <p align="center"><strong>8D</strong></p> </td>
   <td width="141"> <p align="center"><strong>18B</strong></p> </td>
   <td width="141"> <p align="center"><strong>28D</strong></p> </td>
   <td width="141"> <p align="center"><strong>38A</strong></p> </td>
   <td width="141"> <p align="center"><strong>48B</strong></p> </td>
  </tr>
  <tr>
   <td width="141"> <p align="center"><strong>9D</strong></p> </td>
   <td width="141"> <p align="center"><strong>19C</strong></p> </td>
   <td width="141"> <p align="center"><strong>29C</strong></p> </td>
   <td width="141"> <p align="center"><strong>39B</strong></p> </td>
   <td width="141"> <p align="center"><strong>49C</strong></p> </td>
  </tr>
  <tr>
   <td style="text-align: justify;" width="141"> <p align="center"><strong>10C</strong></p> </td>
   <td style="text-align: justify;" width="141"> <p align="center"><strong>20C</strong></p> </td>
   <td style="text-align: justify;" width="141"> <p align="center"><strong>30D</strong></p> </td>
   <td style="text-align: justify;" width="141"> <p align="center"><strong>40A</strong></p> </td>
   <td width="141"> <p style="text-align: center;" align="center"><strong>50D</strong></p> </td>
  </tr>
 </tbody>
</table>
<p><strong>Xem thêm: Lời giải chi tiết Đề thi thử THPT Quốc gia môn Toán tại Tuyensinh247.com</strong></p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`
let noQuestions;
let noQuestionMutipleChoises;

// let stringInnerHTML = normal;
// let stringInnerHTML = multipleChoise;
// let stringInnerHTML = noQuestion;
// let stringInnerHTML = noQuestionMutipleChoise;
// let stringInnerHTML = normals;
let stringInnerHTML = multipleChoises;

let text = "test";
// let book = "văn";
let book = "toán";
let detailSection = new DetailSection(document, stringInnerHTML, text, book);

detailSection.buildDetail(false);
document.body.appendChild(detailSection.element);
fs.writeFile('test.html', dom.serialize(), err => {
    console.log('done: test');
});
