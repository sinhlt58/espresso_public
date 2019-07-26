
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const DetailSection = require('./detailSection');

let dom = new JSDOM('<!doctype html><html><body></body></html>');
let document = dom.window.document;

let normal =`<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;"><strong>Cảm nhận vẻ đẹp của hai đoạn thơ sau</strong></p>
<p style="text-align: justify;"><em>Rải rác biên cương mồ viễn xứ</em></p>
<p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
<p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
<p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em></p>
<p style="text-align: right;">(<strong>Tây Tiến -</strong>&nbsp;Quang Dũng - Ngữ văn 12, tr89)</p>
<p style="text-align: justify;"><em>Em ơi em</em></p>
<p style="text-align: justify;"><em>Đất Nước là máu xương của mình</em></p>
<p style="text-align: justify;"><em>Phải biết gắn bó và san sẻ</em></p>
<p style="text-align: justify;"><em>Phải biết hóa thân cho dáng hình xứ sở</em></p>
<p style="text-align: justify;"><em>Làm nên Đất Nước muôn đời</em></p>
<p style="text-align: right;">(<strong>Đất Nước</strong>&nbsp;<strong>-&nbsp;</strong>Nguyễn Khoa Điềm&nbsp;<strong>- </strong>Ngữ văn, tr120)</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong>1. Giới thiệu chung</strong></p>
<p style="text-align: justify;"><strong>- Tây Tiến</strong>&nbsp;của Quang Dũng và&nbsp;<strong>Đất Nước</strong>&nbsp;của Nguyễn Khoa Điềm là những bài thơ đặc sắc trong nền thơ cách mạng Việt Nam. Hai tác phẩm này đã nói về những con người vô danh lặng thầm chiến đấu bảo vệ quê hương. Mỗi bài thơ đều để lại những cảm xúc, suy tư sâu lắng trong lòng người đọc. Trong đó có những câu thơ rất đặc sắc:</p>
<p style="text-align: justify;">“<em>Rải rác biên cương mồ viễn xứ</em></p>
<p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
<p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
<p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em>”</p>
<p style="text-align: justify;">Và:</p>
<p style="text-align: justify;"><em>“Em ơi em Đất Nước là máu xương của mình</em></p>
<p style="text-align: justify;"><em> Phải biết gắn bó và san sẻ</em></p>
<p style="text-align: justify;"><em> Phải biết hóa thân cho dáng hình xứ sở</em></p>
<p style="text-align: justify;"><em> Làm nên Đất Nước muôn đời”</em></p>
<p style="text-align: justify;"><strong>2. Phân tích</strong></p>
<p style="text-align: justify;"><strong>a. Đoạn thơ trong bài Tây Tiến</strong></p>
<p style="text-align: justify;"><strong>*Giới thiệu khái quát về tác giả, tác phẩm, vị trí đoạn thơ</strong></p>
<p style="text-align: justify;">+ Quang Dũng là nghệ sĩ đa tài (thơ, văn, nhạc, hoạ), cũng là một người lính, sống một đời lính oanh liệt, hào hùng. Quãng đời ấy đã trở thành cảm hứng đặc sắc trong thơ ông. Bài thơ Tây Tiến viết về người lính, về những chàng trai“chiến trường đi chẳng tiếc đời xanh”&nbsp;– người lính Tây Tiến.</p>
<p style="text-align: justify;">+ Tây Tiến là một đơn vị bộ đội thành lập đầu năm 1947. Thành phần chủ yếu là thanh niên trí thức Hà Nội. Nhiệm vụ của họ là phối hợp với bộ đội Lào, đánh tiêu hao lực lượng địch ở Thượng Lào, bảo vệ biên giới Việt Lào. Sau một thời gian hoạt động ở Lào, đoàn quân Tây Tiến trở về Hoà Bình thành lập trung đoàn 52. Năm 1948, nhà thơ Quang Dũng chuyển sang đơn vị khác, không bao lâu, ông nhớ đơn vị cũ sáng tác bài thơ này.</p>
<p style="text-align: justify;">+ Bài thơ có 4 khổ, đây là khổ thứ 3, nội dung khắc hoạ hình tượng người lính Tây Tiến</p>
<p style="text-align: justify;"><strong>*Phân tích cụ thể</strong>:</p>
<p style="text-align: justify;">- Cảm hứng chủ đạo của bài thơ là nỗi nhớ, nhớ về đồng đội và địa bàn hoạt động của đoàn quân, nhớ về vùng đất mà bước chân hào hùng mà đoàn binh Tây Tiến đã đi qua – Tây Bắc. Vùng đất đó với thiên nhiên hoang sơ, hùng vĩ và thơ mộng, trữ tình, vùng đất ấy với những con người tài hoa, duyên dáng và nghĩa tình. Trên nền cảnh ấy là hình ảnh người lính Tây Tiến. Họ hiện lên thật ấn tượng với phẩm chất hào hùng đáng kính, họ đã hi sinh dọc đường hành quân, hi sinh dọc miền biên giới – họ đã hi sinh vì lí tưởng sống cao đẹp:</p>
<p style="text-align: justify;"><em>Rải rác biên cương mồ viễn xứ</em></p>
<p style="text-align: justify;"><em>Chiến trường đi chẳng tiếc đời xanh</em></p>
<p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
<p style="text-align: justify;"><em>Sông Mã gầm lên khúc độc hành</em></p>
<p style="text-align: justify;">- Đoạn thơ sử dụng rất nhiều từ Hán Việt mang sắc thái trân trọng, thể hiện không khí trang nghiêm, lòng thành kính thiêng liêng của nhà thơ trước sự hi sinh của đồng đội. Những từ ngữ ấy như những nén tâm nhang thắp lên đưa tiễn những người đã ngã xuống. Chính hệ thống từ ngữ ấy kết hợp với những hình ảnh giàu sức gợi (biên cương, chiến trường, áo bào, khúc độc hành) cũng tạo sắc thái cổ kính, gợi liên tưởng đến sự hi sinh oanh liệt của những anh hùng, dũng tướng sẵn sàng chấp nhận cảnh “da ngựa bọc thây” đầy bi tráng trong văn học trung đại.</p>
<p style="text-align: justify;">- Câu thơ đầu đoạn thơ sử dụng nhiều từ Hán Việt (biên cương, viễn xứ) nhưng sức nặng của cả câu lại dồn vào một từ thuần Việt:&nbsp;“mồ”.&nbsp;Mồ cũng là mộ nhưng không phải mộ theo đúng nghĩa. Đó chỉ là những nấm đất được đào vội, chôn mau ngay trên con đường hành quân vội vã để đoàn quân lại tiếp tục lên đường. Đặt trong không gian bao la, mênh mông hoang sơ của miền biên giới Việt – Lào, những nấm mồ ấy gợi lên bao nỗi xót xa.</p>
<p style="text-align: justify;">- Trong câu thơ thứ hai, tác giả sử dụng nghệ thuật đảo ngữ (chiến trường đi) để nhấn mạnh đích đến của người lính, người chiến sĩ. Trong hoàn cảnh đất nước có chiến tranh, sứ mệnh đất nước rất mỏng manh, chiến trường là đích đến duy nhất, là sự lựa chọn đầy trách nhiệm của cả một thế hệ. Với họ, “đường ra trận mùa này đẹp lắm” và “cuộc đời đẹp nhất trên trận chiến chống quân thù”. Cách nói&nbsp;“chẳng tiếc đời xanh”&nbsp;cho thấy sự dứt khoát, lòng quyết tâm, coi thường gian nguy, coi thường cái chết. Họ sẵn sàng hiến dâng cả đời xanh, tuổi trẻ, quãng đời đẹp nhất cho tổ quốc, hơn thế nữa, tính mạng của họ cũng sẵn sàng hi sinh để làm nên dáng hình đất nước. Họ ra đi với tinh thần của cả thời đại“Người ra đi đầu không ngoảnh lại”. Đó là lí tưởng sống cao đẹp, hào hùng.</p>
<p style="text-align: justify;">- Viết về người lính và cuộc kháng chiến vĩ đại của dân tộc ta, nhà thơ Quang Dũng rất chân thực, ông không hề né tránh hiện thực:</p>
<p style="text-align: justify;"><em>Áo bào thay chiếu anh về đất</em></p>
<p style="text-align: justify;">“Áo bào thay chiếu”&nbsp;– một hình ảnh thực đến xót xa của chiến tranh. Nhưng cái thiếu thốn về vật chất lại được khoả lấp bằng sự hiên ngang, can trường của người lính. Từ Hán Việt và cách nói&nbsp;“Áo bào thay chiếu anh về đất”làm cho cái chết của người lính Tây Tiến trở nên trang trọng hơn rất nhiều, thiêng liêng hơn nhiều. Nhà thơ vẫn gợi lên sự thật chung của cả thời chống Pháp là sự thiếu thốn về vật chất, ở vùng biên giới xa xôi thì sự thiếu thốn ấy còn nhân lên gấp bội. Với thái độ trân trọng đồng đội, nhà thơ Quang Dũng đã thấy họ như đang mặc tấm áo bào của chiến tướng mà&nbsp;đi vào cõi vĩnh hằng, bất tử cùng sông núi. Cách nói&nbsp;“về đất”&nbsp;không chỉ&nbsp; là cách nói giảm, nói tránh mà mang ý nghĩa biểu tượng thiêng liêng. Cái chết không phải là ra đi vào cõi hư vô bất định mà là trở về, trở về với đất Mẹ yêu thương. Đất Mẹ cũng đã mở lòng đón những đứa con đầy trách nhiệm của mình trở về.&nbsp; Họ đã ra đi như thế đấy. Họ đã nằm lại nơi chân đèo, dốc núi nào đó trên con đường hành quân đầy gian khổ, nhọc nhằn, họ đã để lại mình nơi biên cương lạnh lẽo, hoang vắng. Nhưng họ đã ra đi vì lí tưởng, cái chết của họ &nbsp;dù để lại nhiều xót xa trong lòng người đọc nhưng họ ra đi một cách rất thanh thản. Họ chỉ là “không bước nữa”, là “bỏ quên đời”, là “về đất”&nbsp;thôi chứ không phải là chết. các anh đã ngã xuống, đã “hoá thân cho dáng hình xứ sở” để rồi mỗi thế núi hình sông, mỗi tên đất tên làng đều có bóng hình các anh. Các anh hi sinh, trở về trong lòng Đất Mẹ để&nbsp;“cho cây đời mãi mãi xanh tươi”, để đem lại cho đất đai, cho quê hương đất nước sự sống bất tận.</p>
<p style="text-align: justify;">- Đoạn thơ kết thúc bằng một âm hưởng hào hùng. Dường như linh hồn người tử sĩ đã hòa cùng sông núi, con sông Mã đã tấu lên khúc nhạc đau thương, hùng tráng để tiễn đưa người lính vào cõi bất tử. Hình tượng “sông Mã” ở cuối bài thơ được phóng đại và nhân hóa, tô đậm cái chết bi hùng của người lính_ sự hi sinh làm lay động đất trời, khiến dòng sông gầm lên đớn đau, thương tiếc.</p>
<p style="text-align: justify;">* Nghệ thuật</p>
<p style="text-align: justify;"><strong> </strong>- Bằng bút pháp lãng mạn và âm hưởng bi tráng, đoạn thơ ngợi ca những phẩm chất tốt đẹp của người lính Tây Tiến trong cuộc kháng chiến chống Pháp.</p>
<p style="text-align: justify;"><strong>b. Đoạn thơ trong bài “Đất Nước” của Nguyễn Khoa Điềm là lời nhắn nhủ của nhà thơ về trách nhiệm của thế hệ trẻ đối với non sông đất nước:</strong></p>
<p style="text-align: justify;"><strong>*Giới thiệu khái quát về tác giả, tác phẩm:</strong></p>
<p style="text-align: justify;">+ Nguyễn Khoa Điềm là một trong những nhà thơ tiêu biểu của thế hệ các nhà thơ trẻ thời chống Mỹ .&nbsp;Ông&nbsp;xuất thân từ một gia đình trí thức cách mạng ở Huế, bản thân ông tham gia trực tiếp vào phong trào đấu tranh sinh viên nên thơ Nguyễn Khoa Điềm rất giàu chất suy tư, cảm xúc dồn nén mang tâm tư của người trí thức….</p>
<p style="text-align: justify;">+ Đất Nứơc là phần đầu chương V của trường ca Mặt đường khát vọng, viết năm 1971 tại chiến khu Trị Thiên giữa lúc cuộc kháng chiến chống Mĩ đang hết sức khốc liệt .</p>
<p style="text-align: justify;"><strong>*Phân tích cụ thể</strong><strong>:</strong></p>
<p style="text-align: justify;"><em> “Em ơi em Đất Nước là máu xương của mình</em></p>
<p style="text-align: justify;"><em> Phải biết gắn bó và san sẻ</em></p>
<p style="text-align: justify;"><em> Phải biết hóa thân cho dáng hình xứ sở</em></p>
<p style="text-align: justify;"><em> Làm nên Đất Nước muôn đời”</em></p>
<p style="text-align: justify;">– Đoạn thơ có giọng điệu tâm tình sâu lắng, thiết tha. Tác giả tạo ra cuộc trò chuyện thân mật giữa nhân vật trữ tình “anh” với “em”. Giọng điệu ấy đã làm mềm hóa nặng nề, khô khan của chất chính luận.</p>
<p style="text-align: justify;">– Nguyễn Khoa Điềm đã khám phá một định luật rất mới “Đất Nước là máu xương của mình”. Hình ảnh so sánh độc đáo ấy có hàm ý khẳng định: Đất nước là sự sống thiêng liêng đối với mỗi con người.</p>
<p style="text-align: justify;">Nguyễn Khoa Điềm nhắc nhở mỗi người chúng ta phải biết trân trọng đất nước hôm nay.</p>
<p style="text-align: justify;">– Từ việc xác định vai trò quan trọng của đất nước đối với mỗi con người, nhà thơ khơi gợi ý thức trách nhiệm của mỗi công dân, nhất là thế hệ trẻ. Phép điệp ngữ “phải biết” vừa có ý nghĩa cầu khiến vừa là lời thiết tha, mong chờ như mệnh lệnh từ trái tim. Ba cụm động từ cụ thể hóa trách nhiệm của mỗi con người: “Gắn bó” là lời kêu gọi đoàn kết, hữu ái giai cấp. Vì có đoàn kết là có sức mạnh. “San sẻ” là mong muốn mỗi người có ý thức gánh vác trách nhiệm với quê hương. Còn “hóa thân” là biểu hiện tinh thần sẵn sàng hi sinh cho đất nước, là sự dâng hiến thiêng liêng, đẹp đẽ.</p>
<p style="text-align: justify;">* Nghệ thuật:</p>
<p style="text-align: justify;"><strong> </strong>– Đoạn thơ mang tính chính luận nhưng được diễn đạt bằng hình thức đối thoại, giọng điệu trữ tình kết hợp với biện pháp tu từ điệp ngữ. Từ “Đất Nước” dược lặp lại hai lần kết hợp cách viết hoa đã tăng thêm sự tôn kính thiêng liêng, thể hiện quan niệm lớn: “Đất Nước của nhân dân”.</p>
<p style="text-align: justify;"><strong>c. So sánh:</strong></p>
<p style="text-align: justify;"><strong>* Giống nhau:</strong></p>
<p style="text-align: justify;">Tư tưởng của cả hai đoạn thơ đều là tư tưởng cao đẹp: cống hiến, dâng hiến tuổi trẻ mình cho đất nước non sông.</p>
<p style="text-align: justify;"><strong>* Khác nhau:</strong></p>
<p style="text-align: justify;">– “Tây Tiến” với cảm hứng đất nước được gợi lên từ nỗi nhớ cũa người lính vùng cao về những năm tháng đầu của cuộc kháng chiến chống thực dân Pháp. “Đất Nước” hoàn thành trong cuộc kháng chiến chống đế quốc Mĩ tại mặt trận Trị Thiên bộc lộ cảm hứng đất nước qua cái nhìn tổng quát đưa đến những chiêm nghiệm mới mẻ, sâu sắc về đất nước: Đất nước là tất cả những gì gắn bó máu thịt với mỗi con người.</p>
<p style="text-align: justify;">-Đoạn thơ trong bài&nbsp;Tây Tiến&nbsp;được viết bằng thể thơ thất ngôn, có sử dụng nhiều từ Hán Việt trang trọng với giọng điệu thơ dứt khoát, mạnh mẽ, âm hưởng hào hùng&nbsp; để tô đậm hiện thực khốc liệt của chiến tranh và khẳng định sự bất tử của người chiến sĩ vô danh.</p>
<p style="text-align: justify;">- Đoạn thơ trong&nbsp;Đất Nước&nbsp;được viết bằng thể thơ tự do, giọng điệu tâm tình trò chuyện, từ ngữ giản dị, gần gũi nhằm khẳng định vai trò to lớn của nhân dân vô danh.</p>
<p style="text-align: justify;"><strong>Lí giải :</strong></p>
<p style="text-align: justify;">Sự khác biệt như trên &nbsp;:</p>
<p style="text-align: justify;">Do hoàn cảnh sáng tác</p>
<p style="text-align: justify;">Do phong cách, cá tính sáng tạo của mỗi nhà thơ</p>
<p style="text-align: justify;"><strong>3. Tổng kết</strong></p>
<p style="text-align: justify;">Đánh giá chung về giá trị hai đoạn thơ và tài năng nghệ thuật của hai tác giả</p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`;
let multipleChoise = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;">Phát biểu nào dưới đây là đúng?</p>
<p style="text-align: justify;">A. Fructozơ có phản ứng tráng bạc, chứng tỏ phân tử fructozơ có nhóm chức CHO.</p>
<p style="text-align: justify;">B. Thủy phân xenlulozơ thu được glucozơ.</p>
<p style="text-align: justify;">C. Thủy phân tinh bột thu được fructozơ và&nbsp;glucozơ.</p>
<p style="text-align: justify;">D. Cả xenlulozơ và tinh bột đều có phản ứng tráng bạc.</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;">A. S. Fructozo có nhóm chức C=O</p>
<p style="text-align: justify;">B. Đ</p>
<p style="text-align: justify;">C. S. Thủy phân tinh bột thu được glucozo</p>
<p style="text-align: justify;">D. S. Xenlulozo và tinh bột đều không có phản ứng tráng bạc</p>
<p style="text-align: justify;">Đáp án <strong>B</strong></p>
<p style="text-align: right;"><strong></strong></p>
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

let multipleChoises = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;"><strong>Câu 1:</strong> Tìm tập xác định D của hàm số \(y = \tan \left( {2x + \dfrac{\pi }{3}} \right)\)</p>
<p style="text-align: justify;"><strong>A.</strong> \(D = R{\rm{\backslash }}\left\{ {\dfrac{\pi }{6} + k\left. \pi&nbsp; \right|k \in Z} \right\}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(D = R{\rm{\backslash }}\left\{ {\dfrac{\pi }{{12}} + k\left. {\dfrac{\pi }{2}} \right|k \in Z} \right\}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(D = R{\rm{\backslash }}\left\{ {\dfrac{\pi }{{12}} + k\left. \pi&nbsp; \right|k \in Z} \right\}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(D = R{\rm{\backslash }}\left\{ { - \dfrac{\pi }{6} + k\left. {\dfrac{\pi }{2}} \right|k \in Z} \right\}\).</p>
<p style="text-align: justify;"><strong>Câu 2: </strong>Tính diện tích toàn phần của hình trụ có bán kính <em>a </em>và đường cao \(a\sqrt 3 \).</p>
<p style="text-align: justify;"><strong>A.</strong> \(\pi {a^2}\left( {\sqrt 3&nbsp; + 1} \right)\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(2\pi {a^2}\left( {\sqrt 3&nbsp; + 1} \right)\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(2\pi {a^2}\left( {\sqrt 3&nbsp; - 1} \right)\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\pi {a^2}\sqrt 3 \).</p>
<p style="text-align: justify;"><strong>Câu 3: </strong>Nhân dịp lễ sơ kết học kì 1, để thưởng cho 3 học sinh có thành tích tốt nhất lớp cô An đã mua 10 cuốn sách khác nhau và chọn ngẫu nhiên ra 3 cuốn để phát thưởng cho 3 học sinh đó mỗi học sinh nhận 1 cuốn. Hỏi cô An có bao nhiêu cách phát thưởng.</p>
<p style="text-align: justify;"><strong>A.</strong> \(C_{10}^3\).</p>
<p style="text-align: justify;"><strong>B.</strong> \({10^3}\).&nbsp;</p>
<p style="text-align: justify;"><strong>C.</strong> \(3C_{10}^3\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(A_{10}^3\).</p>
<p style="text-align: justify;"><strong>Câu 4: </strong>Trong mặt phẳng tọa độ <em>Oxy,</em> cho đường tròn \((C):{(x - 2)^2} + {(y + 1)^2} = 9\). Gọi <em>(C’)</em> là ảnh của đường tròn <em>(C)</em> qua việc thực hiện liên tiếp phép vị tự tâm O, tỉ số \(k =&nbsp; - \dfrac{1}{3}\) và phép tịnh tiến theo vectơ \(\overrightarrow v&nbsp; = (1; - 3)\). Tìm bán kính <em>R’</em> của đường tròn <em>(C’)</em>.</p>
<p style="text-align: justify;"><strong>A.</strong> \(R' = 3\).</p>
<p style="text-align: justify;"><strong>B.</strong>\(R' = 27\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(R' = 1\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(R' = 9\). <em></em></p>
<p style="text-align: justify;"><strong>Câu 5: </strong>Hàm số \(y = {x^3} + 2a{x^2} + 4bx - 2018,\,\,(a,\,b \in R)\) đạt cực trị tại \(x =&nbsp; - 1\). Khi đó hiệu \(a - b\) là:</p>
<p style="text-align: justify;"><strong>A.</strong> \(\dfrac{4}{3}\).&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>B.</strong> -1.</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{3}{4}\).&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>D.</strong> \( - \dfrac{3}{4}\).</p>
<p style="text-align: justify;"><strong>Câu 6: </strong>Tính tổng \(S = 1 + 2.2 + {3.2^2} + {4.2^3} + ... + {2018.2^{2017}}\)</p>
<p style="text-align: justify;"><strong>A.</strong> \(S = {2017.2^{2018}} + 1\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(S = {2018.2^{2018}} + 1\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(S = {2017.2^{2018}}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(S = {2019.2^{2018}} + 1\)</p>
<p style="text-align: justify;"><strong>Câu 7: </strong>Hình nào dưới đây không phải hình đa diện?</p>
<p style="text-align: justify;" align="center"><img style="width: 100%; max-width: 577px;" src="https://img./picture/2019/0111/hinh-de-41-1.jpg" alt="">&nbsp;</p>
<p style="text-align: justify;"><strong>A.</strong> Hình 4.</p>
<p style="text-align: justify;"><strong>B.</strong> Hình 1.</p>
<p style="text-align: justify;"><strong>C.</strong> Hình 3.</p>
<p style="text-align: justify;"><strong>D.</strong> Hình 2.</p>
<p style="text-align: justify;"><strong>Câu 8: </strong>Cho \(x &gt; 0,\,\,y &gt; 0\). Viết biểu thức \({x^{\dfrac{4}{5}}}\sqrt[6]{{{x^5}\sqrt x }}\) về dạng \({x^m}\) và biểu thức \({y^{\dfrac{4}{5}}}:\sqrt[6]{{{y^5}\sqrt y }}\) về dạng \({y^n}\). Ta có \(m - n = ?\)</p>
<p style="text-align: justify;"><strong>A.</strong> \(\dfrac{8}{5}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \( - \dfrac{8}{5}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{{11}}{6}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>D.</strong> \( - \dfrac{{11}}{6}\).</p>
<p style="text-align: justify;"><strong>Câu 9: </strong>Gọi M, N là giao điểm của đường thẳng \(y = x + 1\) và đồ thị của hàm số \(y = \dfrac{{2x + 4}}{{x - 1}}\). Khi đó, hoành độ trung điểm I của đoạn thẳng MN là:</p>
<p style="text-align: justify;"><strong>A.</strong> 1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>B.</strong> -1.</p>
<p style="text-align: justify;"><strong>C.</strong> \( - \dfrac{5}{2}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> 2.</p>
<p style="text-align: justify;"><strong>Câu 10: </strong>Trong không gian, cho tam giác ABC vuông tại A, \(AB = a,\,\,AC = a\sqrt 3 \). Tính độ dài đường sinh <em>l</em> của hình nón có được khi quay tam giác ABC xung quanh trục AB.</p>
<p style="text-align: justify;"><strong>A.</strong> \(l = 2a\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(l = \sqrt 2 a\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(l = a\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(l = \sqrt 3 a\).</p>
<p style="text-align: justify;"><strong>Câu 11: </strong>Cho \(f(n) = {\left( {{n^2} + n + 1} \right)^2} + 1,\,\,\forall n \in {\mathbb{N}^*}\). Đặt \({u_n} = \dfrac{{f(1).f(3)...f(2n - 1)}}{{f(2).f(4)...f(2n)}}\). Tìm số <em>n</em> nguyên dương nhỏ nhất sao cho \({u_n}\) thỏa mãn điều kiện \({\log _2}{u_n} + u{ _n} &lt; &nbsp;- \dfrac{{10239}}{{1024}}\).</p>
<p style="text-align: justify;"><strong>A.</strong> 33.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 21.</p>
<p style="text-align: justify;"><strong>C.</strong> 29.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> 23.</p>
<p style="text-align: justify;"><strong>Câu 12: </strong>Một người gửi ngân hàng 100 triệu đồng theo hình thức lãi kép, lãi xuất \(r = 0,5\% \) một tháng (kể từ tháng thứ 2, tiền lãi được tính theo phần trăm tổng tiền có được của tháng trước đó với tiền lãi của tháng trước đó). Sau ít nhất bao nhiêu tháng, người đó có nhiều hơn 125 triệu.</p>
<p style="text-align: justify;"><strong>A.</strong> 46 tháng.</p>
<p style="text-align: justify;"><strong>B.</strong> 47 tháng.</p>
<p style="text-align: justify;"><strong>C.</strong> 45 tháng.</p>
<p style="text-align: justify;"><strong>D.</strong> 44 tháng.</p>
<p style="text-align: justify;"><strong>Câu 13: </strong>Xét khối tứ ABCD có cạnh AD, BC thỏa mãn \(A{B^2} + C{D^2} = 18\) và các cạnh còn lại đều bằng 5. Biết thể tích của khối tứ diện ABCD đạt giá trị lớn nhất có dạn\({V_{\max }} = \dfrac{{x\sqrt y }}{4};\,\,x,y \in {N^*};\,\,(x;y) = 1\). Khi đó, \(x,\,y\) thỏa mãn bất đằng thức nào dưới đây?</p>
<p style="text-align: justify;"><strong>A.</strong> \(x + {y^2} - xy &gt; 4550\).</p>
<p style="text-align: justify;"><strong>B.</strong>&nbsp; \(xy + 2x + y &gt; 2550\).</p>
<p style="text-align: justify;"><strong>C.</strong> \({x^2} - xy + {y^2} &lt; 5240\)</p>
<p style="text-align: justify;"><strong>D.</strong> \({x^3} - y &gt; 19602\).</p>
<p style="text-align: justify;"><strong>Câu 14</strong><strong>: </strong>Cho hàm số \(y = f(x)\) có đồ thị như hình vẽ bên:</p>
<p style="text-align: justify;"><img style="width: 100%; max-width: 171px;" src="https://img.loigiaihay.com/picture/2019/0111/hinh-de-41-2.jpg" alt=""></p>
<p style="text-align: justify;">Số nghiệm của phương trình \(2\left| {f(x - 1)} \right| - 3 = 0\) là:</p>
<p style="text-align: justify;"><strong>A.</strong> 2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 3.</p>
<p style="text-align: justify;"><strong>C.</strong> 1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> 4.</p>
<p style="text-align: justify;"><strong>Câu 15: </strong>Một vật chuyển động trong 3 giờ với vận tốc \(v\,\,(km/h)\) phụ thuộc vào thời gian \(t\,\,(h)\) có đồ thị vận tốc như hình bên. Trong khoảng thời gian 1 giờ kể từ khi bắt đầu chuyển động, đồ thị đó là một phần của đường parabol có đỉnh \(I(2;5)\) và có trục đối xứng song song với trục tung, khoảng thời gian còn lại của đồ thị là một đoạn thẳng song song với trục hoành. Tính quãng đường mà vật di chuyển được trong 3 giờ đó.</p>
<p style="text-align: justify;"><strong>A.</strong> \(15\,\,(km)\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{{35}}{3}\,\,(km)\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(12\,\,(km)\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\dfrac{{32}}{3}\,\,(km)\).</p>
<p style="text-align: justify;">&nbsp;<img style="width: 100%; max-width: 339px;" src="https://img.loigiaihay.com/picture/2019/0111/hinh-de-41-3.jpg" alt=""></p>
<p style="text-align: justify;"><strong>Câu 16: </strong>Nghiệm của phương trình \({2^x} + {2^{x + 1}} = {3^x} + {3^{x + 1}}\) là:</p>
<p style="text-align: justify;"><strong>A.</strong> \(x = 1\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(x = {\log _{\dfrac{3}{2}}}\dfrac{3}{4}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>C.</strong> \(x = {\log _{\dfrac{3}{4}}}\dfrac{3}{2}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>D.</strong> \(x = {\log _{\dfrac{4}{3}}}\dfrac{2}{3}\).</p>
<p style="text-align: justify;"><strong>Câu 17: </strong>Cho hàm số \(y = f(x)\)liên tục và có đạo hàm trên R thỏa mãn \(f(2) =&nbsp; - 2,\,\,\int\limits_0^2 {f(x)dx}&nbsp; = 1\).</p>
<p style="text-align: justify;">Tính tích phân \(I = \int\limits_0^4 {f'(\sqrt x )dx} \).</p>
<p style="text-align: justify;"><strong>A.</strong> \(I =&nbsp; - 18\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(I =&nbsp; - 5\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(I = 0\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(I =&nbsp; - 10\).</p>
<p style="text-align: justify;"><strong>Câu 18: </strong>Cho hàm số \(y = f(x)\)liên tục trên \(\left[ {a;b} \right]\). Diện tích hình phẳng (H) giới hạn bởi đồ thị hàm số \(y = f(x)\), trục hoành và hai đường thẳng \(x = a;\,\,x = b\) được tính theo công thức</p>
<p style="text-align: justify;"><strong>A.</strong> \(S = \pi \int\limits_a^b {{{\left[ {f(x)} \right]}^2}dx} \).</p>
<p style="text-align: justify;"><strong>B.</strong> \(S = \int\limits_a^b {\left| {f(x)} \right|dx} \).</p>
<p style="text-align: justify;"><strong>C.</strong> \(S = \pi \int\limits_a^b {\left| {f(x)} \right|dx} \).</p>
<p style="text-align: justify;"><strong>D.</strong> \(S = \int\limits_b^a {\left| {f(x)} \right|dx} \).</p>
<p style="text-align: justify;"><strong>Câu 19: </strong>Cho hình lăng trụ đều <em>ABC.A’B’C’ </em>có tất cả các cạnh bằng <em>a.</em> Gọi <em>M</em> là trung điểm của <em>AB</em> và \(\alpha \) là góc tạo bởi đường thẳng <em>MC’</em>&nbsp; và mặt phẳng <em>(ABC)</em>. Khi đó \(\tan \alpha \) bằng</p>
<p style="text-align: justify;"><strong>A.</strong> \(\sqrt {\dfrac{3}{7}} \).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{{2\sqrt 3 }}{3}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{{\sqrt 3 }}{2}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\dfrac{{2\sqrt 7 }}{7}\).</p>
<p style="text-align: justify;"><strong>Câu 20: </strong>Cho hình hộp đứng <em>ABCD.A’B’C’D’</em> có đáy <em>ABCD</em> là hình thoi cạnh <em>a</em> và \(\widehat {BAD} = {60^0}\), <em>AB’</em> hợp với đáy <em>(ABCD)</em> một góc \({30^0}\). Thể tích của khối hộp là</p>
<p style="text-align: justify;"><strong>A.</strong> \(\dfrac{{{a^3}}}{2}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{{{a^3}}}{6}\).&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{{{a^3}\sqrt 2 }}{6}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\dfrac{{3{a^3}}}{2}\).</p>
<p style="text-align: justify;"><strong>Câu 21: </strong>Đội thanh niên xung kích của trường THPT Chuyên Biên Hòa có 12 học sinh gồm 5 học sinh khối 12, 4 học sinh khối 11 và 3 học sinh khối 10. Chọn ngẫu nhiên 4 học sinh để làm nhiệm vụ mỗi buổi sáng. Tính xác suất sao cho 4 học sinh được chọn không quá 2 khối.</p>
<p style="text-align: justify;"><strong>A.</strong> \(\dfrac{6}{{11}}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{5}{{22}}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{5}{{11}}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>D.</strong> \(\dfrac{{21}}{{22}}\).</p>
<p style="text-align: justify;"><strong>Câu 22: </strong>Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh bằng 2<em>a</em>, cạnh SB vuông góc với đáy và mặt phẳng (SAD) tạo với đáy một góc \({60^0}\). Tính thể tích khối chóp S.ABCD.</p>
<p style="text-align: justify;"><strong>A.</strong> \(V = \dfrac{{3{a^3}\sqrt 3 }}{4}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(V = \dfrac{{3{a^3}\sqrt 3 }}{8}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(V = \dfrac{{4{a^3}\sqrt 3 }}{3}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(V = \dfrac{{8{a^3}\sqrt 3 }}{3}\).</p>
<p style="text-align: justify;"><strong>Câu 23: </strong>Gọi <em>m</em> là giá trị để hàm số \(y = \dfrac{{x - {m^2}}}{{x + 8}}\) có giá trị nhỏ nhất trên \(\left[ {0;3} \right]\) bằng -2. Mệnh đề nào sau đây là đúng?</p>
<p style="text-align: justify;"><strong>A.</strong> \({m^2} \ne 16\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(3 &lt; m &lt; 5\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\left| m \right| = 5\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\left| m \right| &lt; 5\)</p>
<p style="text-align: justify;"><strong>Câu 24: </strong>Biết \(\int\limits_{\dfrac{\pi }{3}}^{\dfrac{\pi }{2}} {\cos xdx}&nbsp; = a + b\sqrt 3 ,\,\,\left( {a,\,b \in Q} \right)\). Tính \(T = 2a + 6b\).</p>
<p style="text-align: justify;"><strong>A.</strong> \(T =&nbsp; - 4\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(T = 3\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(T =&nbsp; - 1\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(T = 2\).</p>
<p style="text-align: justify;"><strong>Câu 25: </strong>Cho hình nón \({N_1}\) có chiều cao bằng 40cm. Người ta cắt hình nón \({N_1}\) bằng một mặt phẳng song song với đáy của có để được một hình nón nhỏ \({N_2}\) có thể tích bằng \(\dfrac{1}{8}\)thể tích \({N_1}\). Tính chiều cao h của hình nón \({N_2}\)?</p>
<p style="text-align: justify;"><strong>A.</strong> 20 cm.</p>
<p style="text-align: justify;"><strong>B.</strong> 10 cm.</p>
<p style="text-align: justify;"><strong>C.</strong> 5 cm.</p>
<p style="text-align: justify;"><strong>D.</strong> 40 cm.</p>
<p style="text-align: justify;"><strong>Câu 26: </strong>Tính giới hạn \(\mathop {\lim }\limits_{x \to&nbsp; - {2^ - }}&nbsp; = \dfrac{{3 + 2x}}{{x + 2}}\).</p>
<p style="text-align: justify;"><strong>A.</strong> \( + \infty \).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> \( - \infty \).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{3}{2}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> \(2\).</p>
<p style="text-align: justify;"><strong>Câu 27: </strong>Hình vẽ sau đây là hình dạng của đồ thị hàm số nào?</p>
<p style="text-align: justify;"><strong>A.</strong> \(y = \dfrac{{x + 2}}{{x - 1}}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(y = \dfrac{{x + 2}}{{x + 1}}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(y = \dfrac{x}{{x - 1}}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(y = \dfrac{{x - 2}}{{x - 1}}\)</p>
<p style="text-align: justify;"><strong><img style="width: 100%; max-width: 291px;" src="https://img.loigiaihay.com/picture/2019/0111/hinh-de-41-4.jpg" alt="">&nbsp;&nbsp;</strong><strong></strong></p>
<p style="text-align: justify;"><strong>Câu 28: </strong>Cho tập hợp A có 20 phần tử. Có bao nhiêu tập con của A khác rỗng và số phần tử là số chẵn.</p>
<p style="text-align: justify;"><strong>A.</strong> \({2^{19}} - 1\).</p>
<p style="text-align: justify;"><strong>B.</strong> \({2^{19}}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>C.</strong> \({2^{20}}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>D.</strong> \({2^{20}} - 1\).</p>
<p style="text-align: justify;"><strong>Câu 29: </strong>Tính thể tích V của một vật tròn xoay tạo thành khi quay quanh hình phẳng (H) giới hạn bởi các đường \(y = {x^2};\,\,y = \sqrt x \) quanh trục O<em>x</em>.</p>
<p style="text-align: justify;"><strong>A.</strong> \(V = \dfrac{{7\pi }}{{10}}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(V = \dfrac{{9\pi }}{{10}}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(V = \dfrac{{3\pi }}{{10}}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(V = \dfrac{\pi }{{10}}\)</p>
<p style="text-align: justify;"><strong>Câu 30: </strong>Biểu thức \({\log _2}\left( {\sin \dfrac{\pi }{{12}}} \right) + {\log _2}\left( {\cos \dfrac{\pi }{{12}}} \right)\) có giá trị bằng:</p>
<p style="text-align: justify;"><strong>A.</strong> \({\log _2}\sqrt 3&nbsp; - 1\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>B.</strong> 1.</p>
<p style="text-align: justify;"><strong>C.</strong> -2.</p>
<p style="text-align: justify;"><strong>D.</strong> -1.</p>
<p style="text-align: justify;"><strong>Câu 31: </strong>Tính \(I = \int\limits_0^1 {{e^{3x}}dx} \).</p>
<p style="text-align: justify;"><strong>A.</strong> \(I = e - 1\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(I = {e^3} - 1\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{{{e^3} - 1}}{3}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \({e^3} + \dfrac{1}{2}\).</p>
<p style="text-align: justify;"><strong>Câu 32: </strong>Tìm tất cả các giá trị thực của <em>m </em>để hàm số \(f(x) = \left\{ \begin{array}{l}\dfrac{{\sqrt {x + 1}&nbsp; - 1}}{x}\,\,khi\,\,\,x &gt; 0\\\sqrt {{x^2} + 1}&nbsp; - m\,\,khi\,\,x \le 0\end{array} \right.\,\,\)liên tục trên <em>R.</em></p>
<p style="text-align: justify;"><strong>A.</strong> \(m = \dfrac{3}{2}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(m = \dfrac{1}{2}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(m =&nbsp; - 2\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(m =&nbsp; - \dfrac{1}{2}\).&nbsp;</p>
<p style="text-align: justify;"><strong>Câu 33: </strong>Cho hình chóp <em>S.ABC</em> có đáy <em>ABC</em> là tam giác vuông tại B và BA = BC = <em>a.</em> Cạnh bên <em>SA = 2a</em> và vuông góc với mặt phẳng <em>(ABC).</em> Bán kính mặt cầu ngoại tiếp khối chóp <em>S.ABC</em> là:</p>
<p style="text-align: justify;"><strong>A.</strong> \(3a\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{{a\sqrt 6 }}{2}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{{a\sqrt 2 }}{2}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(a\sqrt 6 \).</p>
<p style="text-align: justify;"><strong>Câu 34: </strong>Cho hàm số \(y = f(x)\) có bảng biến thiên như hình dưới đây:&nbsp;</p>
<p style="text-align: justify;"><img style="width: 100%; max-width: 588px;" src="https://img.loigiaihay.com/picture/2019/0111/hinh-de-41-5.jpg" alt=""></p>
<p style="text-align: justify;">Số mệnh đề sai trong các mệnh đề sau đây?</p>
<p style="text-align: justify;">I. Hàm số đồng biến trên khoảng \(\left( { - 3; - 2} \right)\).&nbsp;</p>
<p style="text-align: justify;">II. Hàm số đồng biến trên khoảng \(\left( { - \infty ;5} \right)\).</p>
<p style="text-align: justify;">III. Hàm số nghịch biến trên khoảng&nbsp; \(\left( { - 2; + \infty } \right)\).</p>
<p style="text-align: justify;">IV. Hàm số đồng biến trên khoảng \(\left( { - \infty ; - 2} \right)\).</p>
<p style="text-align: justify;"><strong>A.</strong> 4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 2.</p>
<p style="text-align: justify;"><strong>C.</strong> 1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> 3.</p>
<p style="text-align: justify;"><strong>Câu 35: </strong>Cho hàm số \(y = f(x)\)có đồ thị như hình vẽ bên</p>
<p style="text-align: justify;">Hàm số đạt cực đại tại điểm :</p>
<p style="text-align: justify;"><strong>A.</strong> \(x =&nbsp; - 3\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(x = 0\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(x =&nbsp; - 1\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(x = 1\).</p>
<p style="text-align: justify;"><strong>&nbsp;<img style="width: 100%; max-width: 173px;" src="https://img.loigiaihay.com/picture/2019/0111/hinh-de-41-6.jpg" alt=""></strong></p>
<p style="text-align: justify;"><strong>Câu 36: </strong>Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh bằng <em>a</em>, \(SA \bot (ABCD)\), \(SA = a\sqrt 3 \). Gọi M là trung điểm của <em>SD.</em> Tính khoảng cách giữa hai đường thẳng AB và CM.</p>
<p style="text-align: justify;"><strong>A.</strong> \(\dfrac{{2a\sqrt 3 }}{3}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{{a\sqrt 3 }}{2}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{{a\sqrt 3 }}{4}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\dfrac{{3a}}{4}\).</p>
<p style="text-align: justify;"><strong>Câu 37: </strong>Tìm \(\int {x\cos 2xdx} \).</p>
<p style="text-align: justify;"><strong>A.</strong> \(\dfrac{1}{2}x\sin 2x + \dfrac{1}{2}\cos 2x + C\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{1}{2}x\sin 2x - \dfrac{1}{4}\cos 2x + C\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(x\sin 2x + \cos 2x + C\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\dfrac{1}{2}x\sin 2x + \dfrac{1}{4}\cos 2x + C\).</p>
<p style="text-align: justify;"><strong>Câu 38: </strong>Cho hình chóp S.ABC có \({V_{S.ABC}} = 6{a^3}\). Gọi M, N, Q lần lượt là các điểm trên cạnh SA, SB, SC sao cho SM = MA, SN = NB, SQ = 2QC. Tính \({V_{S.MNQ}}\):</p>
<p style="text-align: justify;"><strong>A.</strong> \(2{a^3}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{{{a^3}}}{2}\).&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>C.</strong> \({a^3}\).&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>D.</strong> \(3{a^3}\).</p>
<p style="text-align: justify;"><strong>Câu 39: </strong>Phương trình \({\log _2}x + {\log _2}(x - 1) = 1\) có tập nghiệm là :</p>
<p style="text-align: justify;"><strong>A.</strong> \(\left\{ 1 \right\}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\left\{ { - 1;3} \right\}\).</p>
<p style="text-align: justify;"><strong>C.</strong>\(\left\{ 2 \right\}\).&nbsp;</p>
<p style="text-align: justify;"><strong>D.</strong> \(\left\{ {1;3} \right\}\).</p>
<p style="text-align: justify;"><strong>Câu 40: </strong>Cho hàm số \(y = f(x)\) có đồ thị hàm số \(y = f'(x)\) như hình vẽ bên:</p>
<p style="text-align: justify;"><img style="width: 100%; max-width: 241px;" src="https://img.loigiaihay.com/picture/2019/0111/hinh-de-41-7.jpg" alt=""></p>
<p style="text-align: justify;">Xét hàm số \(g(x) = 2f(x) + 2{x^3} - 4x - 3m - 6\sqrt 5 \) với <em>m</em> là số thực. Để \(g(x) \le 0,\,\,\forall x \in \left[ { - \sqrt 5 ;\sqrt 5 } \right]\) thì điều kiện của <em>m</em> là:</p>
<p style="text-align: justify;"><strong>A.</strong> \(m \ge \dfrac{2}{3}f\left( {\sqrt 5 } \right)\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(m \le \dfrac{2}{3}f\left( {\sqrt 5 } \right)\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(m \ge \dfrac{2}{3}f\left( { - \sqrt 5 } \right) - 4\sqrt 5 \).</p>
<p style="text-align: justify;"><strong>D.</strong> \(m \le \dfrac{2}{3}f\left( 0 \right) - 2\sqrt 5 \).</p>
<p style="text-align: justify;"><strong>Câu 41: </strong>Tìm tập nghiệm của bất phương trình \({5^{{x^2} - x}} &lt; 25\) là:</p>
<p style="text-align: justify;"><strong>A.</strong> \(\left( {2; + \infty } \right)\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\left( { - \infty ;1} \right) \cup \left( {2; + \infty } \right)\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\mathbb{R}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(( - 1;2)\).</p>
<p style="text-align: justify;"><strong>Câu 42: </strong>Phương trình \(\sqrt 3 \sin \,x - \cos x = 1\) tương đương với phương trình nào sau đây</p>
<p style="text-align: justify;"><strong>A.</strong> \(\sin \left( {x - \dfrac{\pi }{6}} \right) = 1\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\cos \left( {x + \dfrac{\pi }{3}} \right) = \dfrac{1}{2}\).</p>
<p style="text-align: justify;"><strong>C.</strong>&nbsp; \(\sin \left( {\dfrac{\pi }{6} - x} \right) = \dfrac{1}{2}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\sin \left( {x - \dfrac{\pi }{6}} \right) = \dfrac{1}{2}\).</p>
<p style="text-align: justify;"><strong>Câu 43: </strong>Đường tiệm cận ngang của đồ thị hàm số \(y = \dfrac{{\sqrt[3]{{ - {x^3} + 3{x^2}}}}}{{x - 1}}\)có phương trình</p>
<p style="text-align: justify;"><strong>A.</strong> \(y =&nbsp; - 1\,\,\&amp; \,\,y = 1\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(y =&nbsp; - 1\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(x =&nbsp; - 1\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(y = 1\).</p>
<p style="text-align: justify;"><strong>Câu 44: </strong>Cho hình chóp <em>S.ABC </em>có đáy là tam giác <em>ABC</em> đều, đường cao <em>SH</em> với <em>H</em> nằm trong tam giác <em>ABC </em>và <em>2SH = BC, (SBC)</em> tạo với mặt phẳng <em>(ABC)</em> một góc \({60^0}\). Biết có một điểm <em>O</em> nằm trên đường cao <em>SH </em>sao cho \(d(O;AB) = d(O;AC) = 2d(O;(SBC)) = 1\). Tính thể tích khối cầu ngoại tiếp hình chóp đã cho.</p>
<p style="text-align: justify;"><strong>A.</strong> \(\dfrac{{500\pi }}{{81}}\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\dfrac{{343\pi }}{{48}}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\dfrac{{256\pi }}{{81}}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\dfrac{{125\pi }}{{162}}\).</p>
<p style="text-align: justify;"><strong>Câu 45: </strong>Số nghiệm của phương trình \(2{\sin ^2}2x + \cos 2x + 1 = 0\) trong \(\left[ {0;2018\pi } \right]\) là</p>
<p style="text-align: justify;"><strong>A.</strong> 2018.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 1009.</p>
<p style="text-align: justify;"><strong>C.</strong> 2017.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> 1008.</p>
<p style="text-align: justify;"><strong>Câu 46: </strong>Trong mặt phẳng tọa đô <em>Oxy</em>, cho đường thẳng \(d:3x - y + 2 = 0\). Viết phương trình của đường thẳng <em>d’</em> là ảnh của <em>d</em> qua phép quay tâm O góc quay \( - {90^0}\)</p>
<p style="text-align: justify;"><strong>A.</strong> \(d':x + 3y - 2 = 0\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(d':3x - y - 6 = 0\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(d':x - 3y - 2 = 0\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(d':x + 3y + 2 = 0\)</p>
<p style="text-align: justify;"><strong>Câu 47: </strong>Cho hàm số \(y = f(x)\) xác định và có đạo hàm trên R thỏa mãn \({\left[ {f(1 + 2x)} \right]^2} = x - {\left[ {f(1 - x)} \right]^3}\). Viết phương trình tiếp tuyến của đồ thị hàm số&nbsp; \(y = f(x)\) tại điểm có hoành độ bằng 1.</p>
<p style="text-align: justify;"><strong>A.</strong> \(y =&nbsp; - x + \dfrac{6}{7}\).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;"><strong>B.</strong> \(y = \dfrac{1}{7}x - \dfrac{8}{7}\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(y =&nbsp; - \dfrac{1}{7}x + \dfrac{8}{7}\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(y =&nbsp; - \dfrac{1}{7}x - \dfrac{6}{7}\).</p>
<p style="text-align: justify;"><strong>Câu 48: </strong>Cho hàm số \(y = f(x)\) xác định trên R và có đạo hàm \(f'(x)\)thỏa mãn \(f'(x) = (1 - x)(x + 2)g(x) + 2018\) trong đó \(g(x) &lt; 0,\,\,\forall x \in R\). Hàm số \(y = f(1 - x) + 2018x + 2019\) nghịch biến trên khoảng nào?</p>
<p style="text-align: justify;"><strong>A.</strong>\(\left( {3; + \infty } \right)\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(\left( {0;3} \right)\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(\left( { - \infty ;3} \right)\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(\left( {1; + \infty } \right)\).</p>
<p style="text-align: justify;"><strong>Câu 49: </strong>Tìm tất cả các giá trị của tham số <em>m</em> để phương trình \(\log _3^2x - (m + 2){\log _3}x + 3m - 1 = 0\) có 2 nghiệm \({x_1},\,\,{x_2}\) thỏa mãn \({x_1}{x_2} = 27\).</p>
<p style="text-align: justify;"><strong>A.</strong> \(m = 2\).</p>
<p style="text-align: justify;"><strong>B.</strong> \(m = 1\).</p>
<p style="text-align: justify;"><strong>C.</strong> \(m =&nbsp; - 2\).</p>
<p style="text-align: justify;"><strong>D.</strong> \(m =&nbsp; - 1\).</p>
<p style="text-align: justify;"><strong>Câu 50: </strong>Cho hàm số \(f(x) = {3^{2x}} - {2.3^x}\) có đồ thị như hình vẽ sau:</p>
<p style="text-align: justify;">Có bao nhiêu mệnh đề đúng trong các mệnh đề sau?</p>
<p style="text-align: justify;">(1) Đường thẳng \(y = 0\) cắt đồ thị hàm số <em>(C)</em> tại điểm có hoành độ \(x = {\log _3}2\).</p>
<p style="text-align: justify;">(2) Bất phương trình \(f(x) \ge&nbsp; - 1\) có nghiệm duy nhất.</p>
<p style="text-align: justify;">(3) Bất phương trình \(f(x) \ge 0\) có tập nghiệm là \(\left( { - \infty ;{{\log }_3}2} \right)\).</p>
<p style="text-align: justify;">(4) Đường thẳng&nbsp; \(y = 0\) cắt đồ thị hàm số <em>(C)</em> tại 2 điểm phân biệt.</p>
<p style="text-align: justify;"><strong>A.</strong> 2.</p>
<p style="text-align: justify;"><strong>B.</strong> 1.</p>
<p style="text-align: justify;"><strong>C.</strong> 4.</p>
<p style="text-align: justify;"><strong>D.</strong> 3.&nbsp;<strong></strong></p>
<p style="text-align: justify;"><img style="width: 100%; max-width: 378px;" src="https://img.loigiaihay.com/picture/2019/0111/hinh-de-41-8.jpg" alt=""></p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <colgroup>
  <col span="5" width="64">
 </colgroup>
 <tbody>
  <tr>
   <td class="xl65 " style="text-align: center;" width="64" height="20"><strong>1. B</strong></td>
   <td class="xl65 " style="text-align: center;" width="64"><strong>11. D</strong></td>
   <td class="xl65 " style="text-align: center;" width="64"><strong>21. C</strong></td>
   <td class="xl65 " style="text-align: center;" width="64"><strong>31. C</strong></td>
   <td class="xl65 " style="text-align: center;" width="64"><strong>41. D</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>2. B</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>12. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>22. D</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>32. B</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>42. D</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>3. D</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>13. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>23. D</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>33. B</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>43. B</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>4. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>14. D</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>24. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>34. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>44. B</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>5. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>15. D</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>25. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>35. B</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>45. A</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>6. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>16. B</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>26. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>36. B</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>46. A</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>7. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>17. D</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>27. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>37. D</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>47. D</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>8. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>18. B</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>28. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>38. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>48. A</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>9. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>19. B</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>29. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>39. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>49. B</strong></td>
  </tr>
  <tr>
   <td class="xl65 " style="text-align: center;" height="20"><strong>10. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>20. A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>30. C</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>40.A</strong></td>
   <td class="xl65 " style="text-align: center;"><strong>50. B</strong></td>
  </tr>
 </tbody>
</table>
<div style="text-align: left;" align="center">
 <strong><br>Xem thêm: Lời giải chi tiết Đề thi thử THPT Quốc gia môn Toán tại Tuyensinh247.com</strong>
</div>
<div style="text-align: right;" align="center">
 <strong><br></strong>
</div>
<div style="text-align: right;" align="center">
 <strong></strong>
</div>
<div class="clearfix"></div>`;

// multipleChoises = `<h2 class="s14 lineheight"></h2>
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

// let multipleChoises = `<h2 class="s14 lineheight"></h2>
// <p><strong class="content_question">Đề bài</strong></p>
// <p style="text-align: justify;"><strong>PHẦN I. TRẮC NGHIỆM (6 điểm)</strong></p>
// <p style="text-align: justify;"><strong>Câu 1:</strong>Cho số phức z = 3 – 2i. Tìm điểm biểu diễn của số phức \({\rm{w}} = z + i.\overline z \)</p>
// <p style="text-align: justify;"><strong>A.</strong> M(5;-5).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> M(1;-5).</p>
// <p style="text-align: justify;"><strong>C.</strong> M(1;1).&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> M(5;1).</p>
// <p style="text-align: justify;"><strong>Câu 2:</strong> Họ nguyên hàm của hàm số f(x) = cos3x là:</p>
// <p style="text-align: justify;"><strong>A.\( - \dfrac{1}{3}\sin 3x + C.\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>B.\(\dfrac{1}{3}\sin 3x + C.\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(3\sin 3x + C.\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.\( - 3\sin 3x + C.\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 3:</strong> Biết \(\int\limits_0^2 {{e^{3x}}} dx = \dfrac{{{e^a} - 1}}{b}.\) Tìm khẳng địng đúng trong các khẳng định sau?</p>
// <p style="text-align: justify;"><strong>A.</strong> a + b = 10.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> a = b.</p>
// <p style="text-align: justify;"><strong>C.</strong> a = 2b.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> a &lt; b.</p>
// <p style="text-align: justify;"><strong>Câu 4:</strong> Công thức nguyên hàm nào sau đây không đúng?</p>
// <p style="text-align: justify;"><strong>A.\(\int {\dfrac{1}{{{{\cos }^2}x}}}&nbsp; = {\mathop{\rm t}\nolimits}&nbsp; + C.\)</strong></p>
// <p style="text-align: justify;"><strong>B.\(\int {{a^x}dx}&nbsp; = \dfrac{{{a^x}}}{{\ln a}} + C(0 &lt; a \ne 1).\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(\int {{x^\alpha }}&nbsp; = \dfrac{{{x^{\alpha&nbsp; + 1}}}}{{\alpha&nbsp; + 1}} + C(\alpha&nbsp; \ne&nbsp; - 1).\)</strong></p>
// <p style="text-align: justify;"><strong>D.\(\int {\dfrac{1}{x}}&nbsp; = \ln x + C.\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 5:</strong> Trong không gian với hệ tọa độ Oxyz, cho đường thẳng \(d:\dfrac{{x - 1}}{2} = \dfrac{{y + 1}}{{ - 3}} = \dfrac{{z - 5}}{4}\) và mặt phẳng (P); x – 3y + 2z – 5 = 0. Mệnh đề nào sau đây không đúng?</p>
// <p style="text-align: justify;"><strong>A.</strong> d cắt và không vuông góc với (P).</p>
// <p style="text-align: justify;"><strong>B.</strong>d vuông góc với (P).</p>
// <p style="text-align: justify;"><strong>C.</strong> d song song với (P).&nbsp;&nbsp;</p>
// <p style="text-align: justify;"><strong>D.</strong> d nằm trong (P).</p>
// <p style="text-align: justify;"><strong>Câu 6:</strong> Phương trình tham số của đường thẳng đi qua điểm A(1;4;7) và vuông góc với mặt phẳng (P): x + 3y - 2z – 3 = 0 là:</p>
// <p style="text-align: justify;"><strong>A.\(\left\{ \begin{array}{l}x = 1 + 2t\\y = 4 + 4t\\z = 7 - 4t\end{array} \right.\)</strong></p>
// <p style="text-align: justify;"><strong>B.\(\left\{ \begin{array}{l}x =&nbsp; - 4 + t\\y = 3 + 2t\\z =&nbsp; - 1 - 2t\end{array} \right.\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(\left\{ \begin{array}{l}x = 1 + 4t\\y = 4 + 3t\\z = 7 + t\end{array} \right.\)</strong></p>
// <p style="text-align: justify;"><strong>D.\(\left\{ \begin{array}{l}x = 1 + t\\y = 2 + 4t\\z =&nbsp; - 2 + 7t\end{array} \right.\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 7:</strong> Cho A(1;2;3), mặt phẳng (P): x + y + z – 2 = 0. Phương trình mặt phẳng song song với mặt phẳng (P) biết (Q) cách điểm A một khoảng bằng \(3\sqrt 3 \) là:</p>
// <p style="text-align: justify;"><strong>A.&nbsp;</strong>x + y + z + 3 = 0 và x + y + z – 3 = 0.</p>
// <p style="text-align: justify;"><strong>B.</strong> x + y + z + 3 = 0 và x + y + z + 15 = 0.</p>
// <p style="text-align: justify;"><strong>C.</strong> x + y + z + 3 = 0 và x + y + z – 15 = 0.</p>
// <p style="text-align: justify;"><strong>D.</strong> x + y + z + 3 = 0 và x + y – z – 15 = 0.</p>
// <p style="text-align: justify;"><strong>Câu 8:</strong> Điểm M trong hình vẽ bên là điểm biểu diễn của số phức z. Tìm phần thực và phần ảo của số phức z.</p>
// <p style="text-align: justify;">&nbsp;<img src="https://img./picture/2019/0226/81.jpg" alt="" width="150" height="116"></p>
// <p style="text-align: justify;"><strong>A.</strong> Phần thực là – 4 và phần ảo là 3.</p>
// <p style="text-align: justify;"><strong>B.</strong> Phần thực là 3 và phần ảo là – 4i.</p>
// <p style="text-align: justify;"><strong>C.</strong> Phần thực là 3 và phần ảo là – 4.</p>
// <p style="text-align: justify;"><strong>D.</strong> Phần thực là – 4 và phần ảo là 3i.</p>
// <p style="text-align: justify;"><strong>Câu 9:</strong> Biết \(\int\limits_a^b {f(x)dx = 10} ,F(x)\) là một nguyên hàm của f(x) và F(a) = - 3. Tính F(b).</p>
// <p style="text-align: justify;"><strong>A.</strong> F(b) = 13.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> F(b) = 10.</p>
// <p style="text-align: justify;"><strong>C.</strong> F(b) = 16.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> F(b) = 7.</p>
// <p style="text-align: justify;"><strong>Câu 10:</strong> Tìm số phức liên hợp của số phức z = i(3i+1).</p>
// <p style="text-align: justify;"><strong>A.\(\overline z&nbsp; = 3 - i.\)</strong>&nbsp; <strong>B.\(\overline z&nbsp; =&nbsp; - 3 - i.\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(\overline z&nbsp; =&nbsp; - 3 + i.\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>D.\(\overline z&nbsp; = 3 + i.\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 11:</strong> Biết F(x) là một nguyên hàm của hàm số \(f(x) = \dfrac{4}{{1 + 2x}}\) và F(0) = 2. Tìm F(2).</p>
// <p style="text-align: justify;"><strong>A.</strong> 4ln5 + 2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 5 (1 + ln2).</p>
// <p style="text-align: justify;"><strong>C.</strong> 2 ln5 + 4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> 2 (1+ln5).</p>
// <p style="text-align: justify;"><strong>Câu 12:</strong> Diện tích hình phẳng giới hạn bởi đồ thị của hàm số \(y = {x^2},\) trục hoành và hai đường thẳng x = -1, x = 3 là:</p>
// <p style="text-align: justify;"><strong>A</strong>. \(\dfrac{1}{3}.\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.\(\dfrac{{28}}{3}.\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(\dfrac{8}{3}.\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.\(\dfrac{{28}}{9}.\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 13:</strong> Gọi \({z_1}\) và \({z_2}\) lần lượt là nghiệm của phương trình: \({z^2} - 2z + 5 = 0.\) Tính \(P = \left| {{z_1}} \right| + \left| {{z_2}} \right|.\)</p>
// <p style="text-align: justify;"><strong>A.\(2\sqrt 5 .\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 10.</p>
// <p style="text-align: justify;"><strong>C.</strong> 3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>D.</strong> 6.</p>
// <p style="text-align: justify;"><strong>Câu 14:</strong> Tính mô đun của số phức z thỏa mãn: z(2 – i) + 13i = 1.</p>
// <p style="text-align: justify;"><strong>A.\(\left| z \right| = \dfrac{{\sqrt {34} }}{3}.\)</strong>&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.\(\left| z \right| = \dfrac{{5\sqrt {34} }}{2}.\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(\left| z \right| = 34.\)</strong>&nbsp; <strong>D.\(\left| z \right| = \sqrt {34} .\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 15:</strong> Tích phân \(I = \int\limits_0^1 {\dfrac{{2dx}}{{3 - 2x}}}&nbsp; = \ln a.\) Giá trị của a bằng:</p>
// <p style="text-align: justify;"><strong>A</strong>. 3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 2.</p>
// <p style="text-align: justify;"><strong>C.</strong> 4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong>1.</p>
// <p style="text-align: justify;"><strong>Câu 16:</strong> Biết \(\int\limits_0^3 {f(x)dx = 12} .\) Tính \(I = \int\limits_0^1 {f(x)dx} .\)</p>
// <p style="text-align: justify;"><strong>A.</strong> 4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> 6.</p>
// <p style="text-align: justify;"><strong>C.</strong> 36.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> 3.</p>
// <p style="text-align: justify;"><strong>Câu 17:</strong> F(x) là nguyên hàm của hàm số \(f(x) = \dfrac{{3x + 4}}{{{x^2}}},(x \ne 0),\) biết rằng F(1) =&nbsp; 1. F(x) là biểu thức nào sau đây:</p>
// <p style="text-align: justify;"><strong>A.\(F(x) = 2x + \dfrac{4}{x} - 5.\)</strong></p>
// <p style="text-align: justify;"><strong>B.\(F(x) = 3\ln \left| x \right| + \dfrac{4}{x} + 5.\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(F(x) = 3x - \dfrac{4}{x} + 3.\)</strong></p>
// <p style="text-align: justify;"><strong>D.\(F(x) = 3\ln \left| x \right| - \dfrac{4}{x} + 3.\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 18</strong>: Trong hệ tọa Oxyz, cho hai điểm A(3;-2;-1), B(4;-1;2). Phương trình mặt phẳng trung trực của đoạn thẳng AB là:</p>
// <p style="text-align: justify;"><strong>A.</strong>&nbsp;\(2x + 2y + 3z + 1 = 0. \)</p>
// <p style="text-align: justify;"><strong>B.</strong>&nbsp;\(4x – 4y – 6z + \dfrac{{15}}{2}= 0.\)</p>
// <p style="text-align: justify;"><strong>B.</strong>&nbsp;\(4x + 4y + 6z – 7 = 0. \)</p>
// <p style="text-align: justify;"><strong>D.</strong>&nbsp;\(x + y – z = 0.\)</p>
// <p style="text-align: justify;"><strong>Câu 19:</strong> Trong không gian với hệ trục tọa độ Oxyz cho đường thẳng \(d:\left\{ \begin{array}{l}x = 2 + 2t\\y =&nbsp; - 3t\\z =&nbsp; - 3 + 5t\end{array} \right.(t \in \mathbb{R}).\) Vectơ nào dưới đây là vectơ chỉ phương của d?</p>
// <p style="text-align: justify;"><strong>A.\(\overrightarrow u&nbsp; = (2;0; - 3).\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;"><strong>B.\(\overrightarrow u&nbsp; = (2; - 3;5).\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(\overrightarrow u&nbsp; = (2;3; - 5).\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;"><strong>D.\(\overrightarrow u&nbsp; = (2;0;5).\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 20:</strong> Cho đồ thị hàm số y = f(x), diện tích hình phẳng (phần tô đậm trong hình) là:</p>
// <p style="text-align: justify;">&nbsp;<img src="https://img.loigiaihay.com/picture/2019/0226/82.jpg" alt="" width="177" height="118"></p>
// <p style="text-align: justify;"><strong>A.\(S = \int\limits_{ - 3}^4 {f(x)dx.} \)</strong></p>
// <p style="text-align: justify;"><strong>B.\(S = \int\limits_0^{ - 3} {f(x)dx + \int\limits_0^4 {f(x)dx} .} \)</strong></p>
// <p style="text-align: justify;"><strong>C.\(S = \int\limits_{ - 3}^1 {f(x)dx + \int\limits_1^4 {f(x)dx} .} \)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;"><strong>D.\(S = \int\limits_{ - 3}^0 {f(x)dx - \int\limits_0^4 {f(x)dx} .} \)</strong></p>
// <p style="text-align: justify;"><strong>Câu 21:</strong> Trong không gian với hệ trục tọa độ Oxyz, cho ba điểm A(-2;0;0), B(0;3;0) và C(0;0;2). Phương trình nào dưới đây là phương trình của mặt phẳng (ABC)?</p>
// <p style="text-align: justify;"><strong>A.\(\dfrac{x}{3} + \dfrac{y}{2} + \dfrac{z}{{ - 2}} = 1.\)</strong></p>
// <p style="text-align: justify;"><strong>B.\(\dfrac{x}{2} + \dfrac{y}{{ - 2}} + \dfrac{z}{3} = 1.\)</strong></p>
// <p style="text-align: justify;"><strong>C.\(\dfrac{x}{2} + \dfrac{y}{3} + \dfrac{z}{{ - 2}} = 1.\)</strong></p>
// <p style="text-align: justify;"><strong>D.\(\dfrac{x}{{ - 2}} + \dfrac{y}{3} + \dfrac{z}{2} = 1.\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 22:</strong> Phương trình nào sau đây là chính tắc của đường thẳng đi qua hai điểm A(1;2;-3) và B(3;-1;1)?</p>
// <p style="text-align: justify;"><strong>A.\(\dfrac{{x - 1}}{3} = \dfrac{{y - 2}}{{ - 1}} = \dfrac{{z + 3}}{1}.\)</strong></p>
// <p style="text-align: justify;"><strong>B.\(\dfrac{{x - 3}}{1} = \dfrac{{y + 1}}{2} = \dfrac{{z - 1}}{{ - 3}}.\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;"><strong>C.\(\dfrac{{x - 1}}{2} = \dfrac{{y - 2}}{{ - 3}} = \dfrac{{z + 3}}{4}.\)</strong></p>
// <p style="text-align: justify;"><strong>D.\(\dfrac{{x + 1}}{2} = \dfrac{{y + 2}}{{ - 3}} = \dfrac{{z - 3}}{4}.\)</strong></p>
// <p style="text-align: justify;"><strong>Câu 23:</strong> Tìm số phức z biết \(z = \dfrac{{3 + 4i}}{{{i^{2019}}}}.\)</p>
// <p style="text-align: justify;"><strong>A.</strong> z = 4 – 3i.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>B.</strong> z = 4 + 3i.</p>
// <p style="text-align: justify;"><strong>C.</strong> z = 3 – 4i.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>D.</strong> z = 3 + 4i.</p>
// <p style="text-align: justify;"><strong>Câu 24:</strong> Trong không gian với hệ tọa độ Oxyz, cho mặt phẳng (P): x – 2z + 3 = 0. Vectơ nào dưới đây là một vectơ pháp tuyến của (P)?</p>
// <p style="text-align: justify;"><strong>A.\(\overrightarrow n&nbsp; = (1; - 2;0).\)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
// <p style="text-align: justify;"><strong>B. \(\overrightarrow n&nbsp; = (1;0; - 2).\)</strong></p>
// <p style="text-align: justify;"><strong>C. \(\overrightarrow n&nbsp; = (3; - 2;1).\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>
// <p style="text-align: justify;"><strong> D. \(\overrightarrow n&nbsp; = (1; - 2;3).\)</strong></p>
// <p style="text-align: justify;"><strong>&nbsp;</strong></p>
// <p style="text-align: justify;"><strong>PHẦN II. TỰ LUẬN (4 điểm)</strong></p>
// <p style="text-align: justify;"><strong>Câu 1:</strong> (1.0 điểm). Tính các tích phân sau:</p>
// <p style="text-align: justify;">a) \(I = \int\limits_0^{\sqrt 7 } {x\sqrt[3]{{1 + {x^2}}}} dx;\)</p>
// <p style="text-align: justify;">\(b)I = \int\limits_0^{\dfrac{\pi }{4}} {(3 - 2x)cos2xdx} .\)</p>
// <p style="text-align: justify;"><strong>Câu 2:</strong> (1.0 điểm).</p>
// <p style="text-align: justify;">a) Giải phương trình (1 + i)z + (4 – 7i) = 8 – 4i.</p>
// <p style="text-align: justify;">b) Tìm số phức z thỏa mãn: \((3 + i)\overline z&nbsp; + (1 + 2i)z = 3 - 4i.\)</p>
// <p style="text-align: justify;"><strong>Câu 3:</strong> (2.0 điểm).</p>
// <p style="text-align: justify;">Trong không gian với hệ tọa độ Oxyz, cho điểm M(2;1;1) và mặt phẳng (P): 2x – y + 2z + 4 = 0.</p>
// <p style="text-align: justify;">a) Viết phương trình đường thẳng d đi qua M và vuông góc với mặt phẳng (P).</p>
// <p style="text-align: justify;">b) Tìm hình chiếu vuông góc của điểm M trên mặt phẳng (P).</p>
// <p style="text-align: justify;">c) Viết phương trình mặt cầu (S) tâm M và tiếp xúc với mặt phẳng (P).</p>
// <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// <table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
//  <tbody>
//   <tr>
//    <td valign="top" width="104"> <p align="center"><strong>1</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>2</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>3</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>4</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>5</strong></p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center">C</p> </td>
//    <td valign="top" width="104"> <p align="center">B</p> </td>
//    <td valign="top" width="104"> <p align="center">C</p> </td>
//    <td valign="top" width="104"> <p align="center">D</p> </td>
//    <td valign="top" width="104"> <p align="center">A</p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center"><strong>6</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>7</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>8</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>9</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>10</strong></p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center">A</p> </td>
//    <td valign="top" width="104"> <p align="center">C</p> </td>
//    <td valign="top" width="104"> <p align="center">C</p> </td>
//    <td valign="top" width="104"> <p align="center">D</p> </td>
//    <td valign="top" width="104"> <p align="center">B</p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center"><strong>11</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>12</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>13</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>14</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>15</strong></p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center">D</p> </td>
//    <td valign="top" width="104"> <p align="center">B</p> </td>
//    <td valign="top" width="104"> <p align="center">A</p> </td>
//    <td valign="top" width="104"> <p align="center">D</p> </td>
//    <td valign="top" width="104"> <p align="center">A</p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center"><strong>16</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>17</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>18</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>19</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>20</strong></p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center">A</p> </td>
//    <td valign="top" width="104"> <p align="center">B</p> </td>
//    <td valign="top" width="104"> <p align="center">C</p> </td>
//    <td valign="top" width="104"> <p align="center">B</p> </td>
//    <td valign="top" width="104"> <p align="center">D</p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center"><strong>21</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>22</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>23</strong></p> </td>
//    <td valign="top" width="104"> <p align="center"><strong>24</strong></p> </td>
//    <td valign="top" width="104"> <p align="center">&nbsp;</p> </td>
//   </tr>
//   <tr>
//    <td valign="top" width="104"> <p align="center">D</p> </td>
//    <td valign="top" width="104"> <p align="center">C</p> </td>
//    <td valign="top" width="104"> <p align="center">A</p> </td>
//    <td valign="top" width="104"> <p align="center">B</p> </td>
//    <td valign="top" width="104"> <p align="center">&nbsp;</p> </td>
//   </tr>
//  </tbody>
// </table>
// <p style="text-align: justify;"><strong>PHẦN II. TỰ LUẬN</strong> (4 điểm)</p>
// <p style="text-align: justify;"><strong>Câu 1:</strong> (1.0 điểm)</p>
// <p style="text-align: justify;">Tính các tích phân sau:a) \(I = \int\limits_0^{\sqrt 7 } {x\sqrt[3]{{1 + {x^2}}}} dx;\)\(b)I = \int\limits_0^{\dfrac{\pi }{4}} {(3 - 2x)cos2xdx} .\)</p>
// <p style="text-align: justify;">a) Đặt: \(t = \sqrt[3]{{1 + {x^2}}} \Rightarrow {t^3} = 1 + {x^2}\)</p>
// <p style="text-align: justify;">\(\Rightarrow 3{t^2}dt = 2xdx \Rightarrow xdx = \dfrac{3}{2}{t^2}dt\)</p>
// <p style="text-align: justify;">Đổi cận: \(x = 0 \Rightarrow t = 1;x = \sqrt 7&nbsp; \Rightarrow t = 2 \)</p>
// <p style="text-align: justify;">\(\Rightarrow I = \int\limits_1^2 {\dfrac{3}{2}} {t^3}dt\)\(\, = \left. {\dfrac{3}{8}} \right|_1^2 = \dfrac{3}{8}(16 - 1) = \dfrac{{45}}{8}.\)</p>
// <p style="text-align: justify;">b) Đặt \(\left\{ \begin{array}{l}u = 3 - 2x \Rightarrow du =&nbsp; - 2dx\\dv = \cos 2x \Rightarrow v = \dfrac{{\sin 2x}}{2}\end{array} \right.\)</p>
// <p style="text-align: justify;">\(\begin{array}{l} I = (3 - 2x)\left. {\dfrac{{\sin 2x}}{2}} \right|_0^{\dfrac{\pi }{4}} + \int\limits_0^{\dfrac{\pi }{4}} {\sin 2xdx} \\\;\;\;\;\;\; = \left( {\dfrac{{6 - \pi }}{4}} \right) - \dfrac{1}{2}(0 - 1)\\\,\,\,\,\,\,\,\,\,\, = \dfrac{{8 - \pi }}{4} = 2 - \dfrac{\pi }{4}.\end{array}\)</p>
// <p style="text-align: justify;"><strong>Câu 2:</strong> (1.0 điểm)</p>
// <p style="text-align: justify;">a) Giải phương trình \((1 + i)z + (4 – 7i) = 8 – 4i.\)</p>
// <p style="text-align: justify;">Ta có:</p>
// <p style="text-align: justify;">\(\begin{array}{l}(1 + i)z + (4 - 7i) = 8 - 4i\\ \Leftrightarrow (1 + i)z = 4 + 3i\\ \Leftrightarrow z = \dfrac{{4 + 3i}}{{1 + i}} = \dfrac{{(4 + 3i)(1 - i)}}{{(1 + i)(1 - i)}} \\\;\;\;\;\;\;\;\;= \dfrac{{4 - 4i + 3i - 3{i^2}}}{2} = \dfrac{7}{2} - \dfrac{1}{2}i\end{array}\)</p>
// <p style="text-align: justify;">b) Tìm số phức z thỏa mãn: \((3 + i)\overline z&nbsp; + (1 + 2i)z = 3 - 4i.\)</p>
// <p style="text-align: justify;">Gọi \(z = a + bi\) \((a,b \in \mathbb{R},{i^2} =&nbsp; - 1) \Rightarrow \overline z&nbsp; = a - bi\)</p>
// <p style="text-align: justify;">\(\begin{array}{l}(3 + i)\overline z&nbsp; + (1 + 2i)z = 3 - 4i\\ \Leftrightarrow (3 + i)(a - bi) + (1 + 2i)(a + bi) = 3 - 4i\\ \Leftrightarrow 4a - b + (3a - 2b)i = 3 - 4i\\ \Leftrightarrow \left\{ \begin{array}{l}4a - b = 3\\3a - 2b =&nbsp; - 4\end{array} \right.\\ \Leftrightarrow \left\{ \begin{array}{l}a = 2\\b = 5\end{array} \right.\end{array}\)</p>
// <p style="text-align: justify;">Vậy \(z = 2 + 5i.\)</p>
// <p style="text-align: justify;"><strong>Câu 3: </strong></p>
// <p style="text-align: justify;">Trong không gian với hệ tọa độ Oxyz, cho điểm M(2;1;1) và mặt phẳng (P): \(2x – y + 2z + 4 = 0.\)</p>
// <p style="text-align: justify;">a) Viết phương trình đường thẳng d đi qua M và vuông góc với mặt phẳng (P).</p>
// <p style="text-align: justify;">Đường thẳng (d) đi qua điểm M(2;1;1), vuông góc với (P) có VTCP: \(\overrightarrow u&nbsp; = (2; - 1;2)\)</p>
// <p style="text-align: justify;">Có PTTS: \(\left\{ \begin{array}{l}x = 2 + 2t\\y = 1 - t\\z = 1 + 2t\end{array} \right.(t \in \mathbb{R})\)</p>
// <p style="text-align: justify;">b) Tìm hình chiếu vuông góc của điểm M trên mặt phẳng (P).</p>
// <p style="text-align: justify;">Tọa độ hình chiếu H của M lên mặt phẳng (P) là nghiệm của hệ:</p>
// <p style="text-align: justify;">\(\begin{array}{l}\left\{ \begin{array}{l}2x - y + 2z + 4 = 0\\x = 2 + 2t\\y = 1 - t\\z = 1 + 2t\end{array} \right.\\ \Leftrightarrow \left\{ \begin{array}{l}t =&nbsp; - 1\\x = 0\\y = 2\\z =&nbsp; - 1\end{array} \right.\end{array}\)</p>
// <p style="text-align: justify;">Vậy \(H(0;2;-1)\)</p>
// <p style="text-align: justify;">c) Viết phương trình mặt cầu (S) tâm M và tiếp xúc với mặt phẳng (P).</p>
// <p style="text-align: justify;">Ta có: \(d(M;(P)) = \dfrac{{\left| {4 - 1 + 2 + 4} \right|}}{{\sqrt {4 + 1 + 4} }} = 3\)</p>
// <p style="text-align: justify;">Mặt cầu (S) tâm M và tiếp xúc với mặt phẳng (P) có bán kính R = d(M;(P))=2 có phương trình: \({(x - 2)^2} + {(y - 1)^2} + {(z - 1)^2} = 9\)</p>
// <p style="text-align: right;"><strong>&nbsp;</strong></p>
// <div class="clearfix"></div>`
let noQuestions;
let noQuestionMutipleChoises;

let multipleChoiseTest = `
<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p><strong>Trong các hàm số:&nbsp;</strong>\(\displaystyle f(x) = \ln {1 \over {{\mathop{\rm sinx}\nolimits} }},g(x) = \ln {{1 + {\mathop{\rm sinx}\nolimits} } \over {\cos x}},h(x) = \ln {1 \over {\cos x}}\)</p>
<p>Hàm số có đạo hàm là \(\displaystyle {1 \over {\cos x}}\)?</p>
<p>(A) \(\displaystyle f(x)\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) \(\displaystyle g(x)\)</p>
<p>(C) \(\displaystyle h(x)\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(D) \(\displaystyle g(x)\) và \(\displaystyle h(x)\)</p>
<div class="content_method_container">
 <p class="content_method_header" onclick="showDetailMethod();"><strong class="content_method">Phương pháp giải - Xem chi tiết</strong><img class="method-open-icon" id="method_colapse_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxM0UzREU1OEVDMzZFODExQkQ5N0VEMEYzMTQyQzg0NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NTFEMTQyQTM3QUExMUU4OTg2OUQ0MzRDMEZGNkVBQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NTFEMTQyOTM3QUExMUU4OTg2OUQ0MzRDMEZGNkVBQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEzRTNERTU4RUMzNkU4MTFCRDk3RUQwRjMxNDJDODQ1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEzRTNERTU4RUMzNkU4MTFCRDk3RUQwRjMxNDJDODQ1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eFCcKwAAAHdJREFUeNpiDA0NvcXAwDAbiLsZsINSIE5lAhIbgbgLiLOxKMqGym1iARJlQCwAxJOB+AsQL4QqioeKzQWZClL4H4gzgJgbKvgVqhDEXgnE6SA1LFDBv1ATQIqXQsW2QsVAcgwsSO75DcShIPdA+WFA/AsmCRBgAO7AGQt+AUtuAAAAAElFTkSuQmCC"></p>
 <div class="content_method_content">
  <p>Sử dụng công thức tính đạo hàm của hàm hợp:&nbsp;\(\left( {\ln u} \right)' = \dfrac{{u'}}{u}\) lần lượt tính đạo hàm của các hàm số đã cho và kết luận.</p>
 </div>
</div>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p>Ta có:</p>
<p>\(\begin{array}{l}f\left( x \right) = \ln \dfrac{1}{{\sin x}} = \ln {\left( {\sin x} \right)^{ - 1}} = - \ln \sin x\\\Rightarrow f'\left( x \right) = - \dfrac{{\left( {\sin x} \right)'}}{{\sin x}} = \dfrac{{ - \cos x}}{{\sin x}} = - \cot x\\h\left( x \right) = \ln \dfrac{1}{{\cos x}} = \ln {\left( {\cos x} \right)^{ - 1}} = - \ln \cos x\\\Rightarrow h'\left( x \right) = - \dfrac{{\left( {\cos x} \right)'}}{{\cos x}} = - \dfrac{{ - \sin x}}{{\cos x}} = \tan x\end{array}\)</p>
<p>Do đó, (A), (C) và (D) sai.</p>
<p>Chọn đáp án (B).</p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`

multipleChoiseTest = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;">Cho đường thẳng \(△\) đi qua điểm \(M(2 ; 0 ; -1)\) và có vectơ chỉ phương \(\overrightarrow a &nbsp;= (4 ; -6 ; 2)\). Phương trình tham số của đường thẳng \(△\) là:</p>
<p style="text-align: justify;">\((A)\left\{ \matrix{x = - 2 + 4t \hfill \cr&nbsp;y = - 6t \hfill \cr&nbsp;z = 1 + 2t \hfill \cr} \right.\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\((B)\left\{ \matrix{x = - 2 + 2t \hfill \cr&nbsp;y = - 3t \hfill \cr&nbsp;z = 1 + t \hfill \cr} \right.\);</p>
<p style="text-align: justify;">\((C)\left\{ \matrix{x = 2 + 2t \hfill \cr&nbsp;y = - 3t \hfill \cr&nbsp;z = - 1 + t \hfill \cr} \right.\);&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \((D)\left\{ \matrix{x = 4 + 2t \hfill \cr&nbsp;y = - 6 - 3t \hfill \cr&nbsp;z = 2 + t \hfill \cr} \right.\).</p>
<div class="content_method_container">
 <p class="content_method_header" onclick="showDetailMethod();"><strong class="content_method">Phương pháp giải - Xem chi tiết</strong><img class="method-open-icon" id="method_colapse_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxM0UzREU1OEVDMzZFODExQkQ5N0VEMEYzMTQyQzg0NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NTFEMTQyQTM3QUExMUU4OTg2OUQ0MzRDMEZGNkVBQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NTFEMTQyOTM3QUExMUU4OTg2OUQ0MzRDMEZGNkVBQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEzRTNERTU4RUMzNkU4MTFCRDk3RUQwRjMxNDJDODQ1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEzRTNERTU4RUMzNkU4MTFCRDk3RUQwRjMxNDJDODQ1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+eFCcKwAAAHdJREFUeNpiDA0NvcXAwDAbiLsZsINSIE5lAhIbgbgLiLOxKMqGym1iARJlQCwAxJOB+AsQL4QqioeKzQWZClL4H4gzgJgbKvgVqhDEXgnE6SA1LFDBv1ATQIqXQsW2QsVAcgwsSO75DcShIPdA+WFA/AsmCRBgAO7AGQt+AUtuAAAAAElFTkSuQmCC"></p>
 <div class="content_method_content">
  <p style="text-align: justify;">Đường thẳng d đi qua&nbsp;\(M\left( {{x_0};{y_0};{z_0}} \right)\) và có VTCP&nbsp;\(\overrightarrow u&nbsp; = \left( {a;b;c} \right)\) có phương trình tham số: \(\left\{ \begin{array}{l}x = {x_0} + at\\y = {y_0} + bt\\z = {z_0} + ct\end{array} \right.\,\,\left( {t \in R} \right)\)</p>
 </div>
</div>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: left;">Ta có:&nbsp;\(\overrightarrow a&nbsp; = \left( {4; - 6;2} \right) = 2\left( {2; - 3;1} \right) \Rightarrow \overrightarrow {a'}&nbsp; = \left( {2; - 3;1} \right)\) cũng là VTCP của đường thẳng d.</p>
<p style="text-align: left;">Vậy phương trình tham số của đường thẳng d là: \(\left\{ \matrix{x = 2 + 2t \hfill \cr y = - 3t \hfill \cr z = - 1 + t \hfill \cr} \right.\)</p>
<p style="text-align: left;">Chọn (<strong>C</strong>)</p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`

normals =`<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;"><strong>PHẦN ĐỌC HIỂU </strong><strong>(3,0 điểm) </strong></p>
<p style="text-align: justify;"><strong>Đọc văn bản sau và thực hiện các yêu cầu từ câu 1 đến câu 4:</strong></p>
<p style="text-align: justify;"><em>Một thái độ ứng xử tích cực, những thói quen tốt, cách nhìn lạc quan, khát khao theo đuổi những mục tiêu, vv… mới chỉ là điều kiện cần nhưng chưa đủ để đưa bạn đến thành công nếu vẫn còn thiếu sự trung thực và chính trực. Bạn sẽ chẳng bao giờ cảm nhận trọn vẹn những giá trị của bản thân khi chưa tìm thấy sự bình an trong tâm hồn mình. Viên đá đầu tiên và cần thiết nhất của nền tảng đó là sự trung thực.</em></p>
<p style="text-align: justify;"><em>Vì sao tôi lại xem trọng tính trung thực đến thế? Đó là bởi vì tôi đã phải mất một thời gian rất dài mới có thể nhận ra rằng sự trung thực chính là phần còn thiếu trong nỗ lực tìm kiếm sự thành công và hoàn thiện bản thân tôi. Tôi không phải là một kẻ hay nói dối, một kẻ tham lam, một tên trộm mà tôi thiếu tính trung thực mà thôi. Giống như nhiều người khác, tôi cũng quan niệm “Ai cũng thế cả mà”, một chút không trung thực không có gì là xấu cả. Tôi đã tự lừa dối mình. Dù muộn màng, nhưng rồi tôi cũng khám phá ra rằng không trung thực là một điều rất tệ hại và để lại một hậu quả khôn lường. Ngay sau đó, tôi quyết định sẽ ngay thẳng, chính trực trong tất cả mọi việc. Đó là một lựa chọn quan trọng làm thay đổi cuộc đời tôi.</em></p>
<p style="text-align: right;" align="right">(Theo Hal Urban, “Những bài học cuộc sống”, www.wattpad.com)</p>
<p style="text-align: justify;"><strong>Câu 1:</strong> Xác định phương thức biểu đạt chính của đoạn trích trên. (0,5 điểm)</p>
<p style="text-align: justify;"><strong>Câu 2:</strong> Anh (chị) hiểu như thế nào về câu nói: <em>“Sự trung thực là nền tảng cơ bản giữ cho những mối quan hệ được bền vững”</em>? (0,5 điểm)</p>
<p style="text-align: justify;"><strong>Câu 3:</strong> Theo anh (chị), vì sao tác giả lại cho rằng: <em>Một thái độ ứng xử tích cực, những thói quen tốt, cách nhìn lạc quan, khát khao theo đuổi những mục tiêu,vv.. mới là điều kiện cần nhưng vẫn chưa đủ để đưa bạn đến thành công nếu vẫn còn thiếu sự trung thực và chính trực</em>? (1,0 điểm)</p>
<p style="text-align: justify;"><strong>Câu 4:</strong> Thông điệp nào trong văn bản trên có ý nghĩa nhất đối với anh, chị? Vì sao? (Trình bày trong khoảng 7 – 10 dòng). (1.0 điểm)</p>
<p style="text-align: justify;"><strong>PHẦN LÀM VĂN </strong><strong>(7,0 điểm) (ID: 276981)</strong></p>
<p style="text-align: justify;">Phân tích quá trình tha hóa của nhân vật Chí Phèo từ người nông dân lương thiện trở thành con quỷ dữ của làng Vũ Đại trong đoạn trích “Chí Phèo” của Nam Cao.</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong>PHẦN ĐỌC HIỂU</strong></p>
<p style="text-align: justify;"><strong>Câu 1:</strong><strong></strong></p>
<p style="text-align: justify;"><strong>*Phương pháp:</strong> Căn cứ vào các phương thức biểu đạt đã học: tự sự, miêu tả, biểu cảm, thuyết minh, nghị luận, hành chính – công vụ.</p>
<p style="text-align: justify;"><strong>*Cách giải:</strong></p>
<p style="text-align: justify;">Phương thức biểu đạt chính: Nghị luận.</p>
<p style="text-align: justify;"><strong>Câu 2:</strong></p>
<p style="text-align: justify;"><strong>*Phương pháp:</strong> Phân tích, tổng hợp.</p>
<p style="text-align: justify;"><strong>*Cách giải: </strong></p>
<p style="text-align: justify;"><em>“Sự trung thực là nền tảng cơ bản giữ cho những mối quan hệ được bền vững: </em></p>
<p style="text-align: justify;">Trung thực trong một mối quan hệ tức là ta luôn thẳng thắn, chân thành. Chỉ có sự thẳng thắn, chân thành giữa con người với con người mới tạo được niềm tin cho nhau và do đó mà mối quan hệ mới trở nên bền vững.</p>
<p style="text-align: justify;"><strong>Câu 3:</strong></p>
<p style="text-align: justify;"><strong>*Phương pháp:</strong> Phân tích, tổng hợp.</p>
<p style="text-align: justify;"><strong>*Cách giải:</strong></p>
<p style="text-align: justify;">- Sự trung thực và chính trực là điều cần thiết cho mọi người.</p>
<p style="text-align: justify;">- Sự trung thực và chính trực giúp ta nhận ra những mặt thiếu sót của bản thân để điều chỉnh.</p>
<p style="text-align: justify;">- Sự trung thực và chính trực còn tạo ra niềm tin trong các mối quan hệ, nó làm cho các mối quan hệ trở nên chân thành và đúng đắn hơn.</p>
<p style="text-align: justify;"><strong>Câu 4: </strong></p>
<p style="text-align: justify;"><strong>*Phương pháp:</strong> Phân tích, tổng hợp, bình luận.</p>
<p style="text-align: justify;"><strong>*Cách giải:</strong></p>
<p style="text-align: justify;">Học sinh có thể rút ra thông điệp có ý nghĩa nhất với bản thân mình từ đoạn trích trên và viết đoạn văn trình bày suy nghĩ của mình về thông điệp đó.</p>
<p style="text-align: justify;">Gợi ý: Thông điệp có ý nghĩa nhất: Mỗi người cần sống trung thực với chính mình.</p>
<p style="text-align: justify;">Đoạn văn có thể triển khai theo các ý sau:</p>
<p style="text-align: justify;">- Trung thực là thật thà, ngay thẳng, không gian dối.</p>
<p style="text-align: justify;">- Trung thực với chính mình là nghiêm túc và chân thành nhìn lại bản thân mình để tìm ra những điểm tích cực cần phát huy cũng như các điểm cần sửa chữa.</p>
<p style="text-align: justify;">- Con người cần sống trung thực với chính mình vì:</p>
<p style="text-align: justify;">+Trung thực giúp con người tiến bộ hơn</p>
<p style="text-align: justify;">+Trung thực giúp con người lựa chọn đúng đắn hơn đường đi cho mình, mối quan hệ trong xã hội</p>
<p style="text-align: justify;">+…</p>
<p style="text-align: justify;"><strong>PHẦN LÀM VĂN</strong>&nbsp;</p>
<p style="text-align: justify;"><strong>*Phương pháp:</strong></p>
<p style="text-align: justify;">- Phân tích (Phân tích đề để xác định thể loại, yêu cầu, phạm vi dẫn chứng).</p>
<p style="text-align: justify;">- Sử dụng các thao tác lập luận (phân tích, tổng hợp, bàn luận,…) để tạo lập một văn bản nghị luận văn học.</p>
<p style="text-align: justify;"><strong>*Cách giải:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
<p style="text-align: justify;">v&nbsp; <strong>Yêu cầu hình thức:</strong></p>
<p style="text-align: justify;">- Thí sinh biết kết hợp kiến thức và kĩ năng làm nghị luận văn học để tạo lập văn bản.</p>
<p style="text-align: justify;">- Bài viết phải có bố cục đầy đủ, rõ ràng; văn viết có cảm xúc; diễn đạt trôi chảy, bảo đảm tính liên kết; không mắc lỗi chính tả, từ ngữ, ngữ pháp.</p>
<p style="text-align: justify;">v&nbsp; <strong>Yêu cầu nội dung:</strong></p>
<p><strong><strong>&nbsp; &nbsp; &nbsp;•&nbsp;</strong>Giới thiệu tác giả, tác phẩm</strong></p>
<p style="text-align: justify;">- Nam Cao là cây bút xuất sắc của văn học Việt Nam hiện đại. Những sáng tác của ông xoay quanh hai đề tài chính: người trí thức nghèo và người nông dân nghèo. Có thể nói, đến Nam Cao, chủ nghĩa hiện thực trong văn học hiện đại Việt Nam mới đạt tới đỉnh cao.</p>
<p style="text-align: justify;">- <em>Chí Phèo</em> là một trong số những sáng tác tiêu biểu khẳng định tài năng kiệt xuất của ông. Tác phầm thuộc thể loại truyện ngắn nhưng có dung lượng của tiểu thuyết. Tác phẩm này đã đưa Nam Cao lên vị trí là một trong những nhà văn hiện thực xuất sắc nhất trước Cách mạng tháng Tám năm 1945.</p>
<p><strong><strong>&nbsp; &nbsp; &nbsp;•&nbsp;</strong>Giới thiệu nhân vật Chí Phèo</strong></p>
<p style="text-align: justify;">-Xuất thân: là đứa trẻ mồ côi bị bỏ rơi ở lò gạch cũ, được anh đi thả ống lươn nhặt được, mang về cho một bà góa mù, bà góa mù bán cho bác phó cối không con, bác phó cối mất đi thì sống trong sự đùm bọc của dân làng.</p>
<p style="text-align: justify;">⟶&nbsp;Mồ côi, bị trao qua đổi lại, lớn lên trong sự cưu mang của cộng đồng.</p>
<p style="text-align: justify;">-Khi lớn lên (20 tuổi): Chí Phèo làm canh điền cho nhà lí Kiến, lành như đất -&gt; lương thiện đích thực:</p>
<p style="text-align: justify;">+ Cày cấy thuê để kiếm sống.</p>
<p style="text-align: justify;">+ Khi bị bà ba gọi vào bóp chân, Chí chỉ thấy nhục -&gt; có lòng tự trọng.</p>
<p style="text-align: justify;">+ Mơ ước về mái ấm hạnh phúc, giản dị: chồng cuốc mướn cày thuê, vợ dệt vải…</p>
<p style="text-align: justify;">⟶&nbsp;Là một người lương thiện.</p>
<p><strong><strong>&nbsp; &nbsp; &nbsp;•&nbsp;</strong>Phân tích bi kịch bị tha hóa của Chí Phèo</strong></p>
<p style="text-align: justify;">* Từ người nông dân hiền lành, lương thiện bị biến thành thằng lưu manh.</p>
<p style="text-align: justify;">(+) Nguyên nhân:</p>
<p style="text-align: justify;">-Do Bá Kiến: ghen ⟶&nbsp;đẩy Chí Phèo vào tù.</p>
<p style="text-align: justify;">- Do nhà tù đã nhào nặn, tha hóa Chí</p>
<p style="text-align: justify;">⟶&nbsp;Xã hội phi lí, bất công, ngang trái đã hủy hoại con người lương thiện.</p>
<p style="text-align: justify;">(+) Biểu hiện:</p>
<p style="text-align: justify;">-Nhân hình:</p>
<p style="text-align: justify;">+ Gương mặt: Cái đầu trọc lốc, cái răng cạo trắng hớn, cái mặt cơng cơng, hai mắt</p>
<p style="text-align: justify;">gườm gườm…</p>
<p style="text-align: justify;">+ Trang phục:&nbsp; Mặc áo tây vàng với quần nái đen, phanh áo để lộ hình xăm…</p>
<p style="text-align: justify;">-Nhân tính:</p>
<p style="text-align: justify;">+ Uống rượu đến say khướt.</p>
<p style="text-align: justify;">+ Chửi bới.</p>
<p style="text-align: justify;">+ Đánh nhau.</p>
<p style="text-align: justify;">+ Ăn vạ</p>
<p style="text-align: justify;">+ Liều lĩnh, thách thức.</p>
<p style="text-align: justify;">⟶&nbsp;Thằng lưu manh hung hăng, liều lĩnh.</p>
<p style="text-align: justify;">* Bị tha hóa từ thằng lưu manh trở thành con quỷ dữ của làng Vũ Đại.</p>
<p style="text-align: justify;">(+) Nguyên nhân:</p>
<p style="text-align: justify;">-Do sự khôn ngoan, gian xảo của Bá Kiến.</p>
<p style="text-align: justify;">-Do sự khờ khạo, u mê của Chí Phèo.</p>
<p style="text-align: justify;">(+) Biểu hiện:</p>
<p style="text-align: justify;">-Nhân hình: biến thành mặt một con vật lạ.</p>
<p style="text-align: justify;">-Nhân tính:</p>
<p style="text-align: justify;">+ Triền miên trong những cơn say&nbsp;⟶ làm bất cứ cái gì mà người ta sai&nbsp;⟶ gây tội ác.</p>
<p style="text-align: justify;">+ Đoạn văn mở đầu tác phẩm: <em>“Hắn vừa đi vừa chửi…”</em>&nbsp;⟶ sự phẫn uất, cô độc cùng cực của Chí Phèo.</p>
<p style="text-align: justify;"><strong>Tổng kết&nbsp;</strong></p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`

multipleChoises = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;"><strong>I. PHẦN TRẮC NGHIỆM (3 điểm)</strong></p>
<p style="text-align: justify;"><strong>Câu 1</strong>. Hầu hết các kim loại đều có ánh kim là do</p>
<p style="text-align: justify;">A. các electron tự do trong kim loại phản xạ những tia sáng nhìn thấy.</p>
<p style="text-align: justify;">B. kim loại hấp thu được các tia sáng tới.</p>
<p style="text-align: justify;">C. các kim loại đều ở thể rắn.</p>
<p style="text-align: justify;">D. kim loại màu trắng bạc nên giữ được các tia sáng trên bề mặt kim loại.</p>
<p style="text-align: justify;"><strong>Câu 2.</strong> Những kim loại nào sau đây có thể điều chế được từ oxit, bằng phương pháp nhiệt luyện nhờ chất khử \({H_2}\)?</p>
<p style="text-align: justify;">A. Fe, Al, Cu.</p>
<p style="text-align: justify;">&nbsp;B. Zn, Mg, Fe.</p>
<p style="text-align: justify;">C. Fe, Mn, Ni.</p>
<p style="text-align: justify;">&nbsp;D. Ni, Cu, Ca.</p>
<p style="text-align: justify;"><strong>Câu 3</strong>. Thép dễ bị ăn mòn trong không khí ẩm. Cách nào sau đây không có tác dụng bảo vệ thép khỏi bị ăn mòn?</p>
<p style="text-align: justify;">A. Hàn thêm một mẩu Sn vào thép.</p>
<p style="text-align: justify;">B. Mạ một lớp kim loại như Zn, Cr lên bề mặt của thép.</p>
<p style="text-align: justify;">C. Sơn một lớp mỏng.</p>
<p style="text-align: justify;">D. Bôi một lớp dầu, mỡ (parafin) lên bề mặt của thép.</p>
<p style="text-align: justify;"><strong>Câu 4</strong>. Cho dung dịch \(FeC{l_2}\) tác dụng với dung dịch \(AgN{O_3}\) dư, thu được phần không tan Z. Trong Z có chứa</p>
<p style="text-align: justify;">A. Ag.&nbsp;&nbsp;</p>
<p style="text-align: justify;">B. AgCl.</p>
<p style="text-align: justify;">C. Ag, AgCl.</p>
<p style="text-align: justify;">D. Ag, AgCl, Fe.</p>
<p style="text-align: justify;"><strong>Câu 5</strong>. Điện phân 200 ml dung dịch chứa \(AgN{O_3}\) 0,2M và \(Cu{\left( {N{O_3}} \right)_2}\) 0,3M với dòng điện có cường độ 9,65A trong 10 phút. Điện cực trơ. Khối lượng kim loại bám trên catot là</p>
<p style="text-align: justify;">A. 4,32 gam.</p>
<p style="text-align: justify;">B. 5,6 gam.</p>
<p style="text-align: justify;">C. 8,16 gam.&nbsp;&nbsp;</p>
<p style="text-align: justify;">D. 4,96 gam.</p>
<p style="text-align: justify;"><strong>Câu 6</strong>. Ngâm một đinh sắt sạch vào 100 ml dung dịch \(CuS{O_4}\) sau khi phản ứng kết thúc lấy đinh sắt ra khỏi dung dịch, rửa sạch, làm khô thấy khối lượng đinh sắt tăng thêm 1,6 gam. Nồng độ mol của dung dịch \(CuS{O_4}\) ban đầu là</p>
<p style="text-align: justify;">A. 0,25M.</p>
<p style="text-align: justify;">B. 1 M.</p>
<p style="text-align: justify;">C. 2 M.&nbsp;</p>
<p style="text-align: justify;">D. 0,5 M.</p>
<p style="text-align: justify;"><strong>II. PHẦN TỰ LUẬN (7 điểm).</strong></p>
<p style="text-align: justify;"><strong>Câu 1</strong>. (3 điểm)</p>
<p style="text-align: justify;">a) Viết các phương trình phản ứng điều chế (trực tiếp hoặc gián tiếp) các kim loại sau từ các nguyên liêu tương ứng: \(BaC{O_3},Fe{\left( {OH} \right)_3},AgN{O_3}.\) Mỗi kim loại sử dụng một phương pháp riêng.</p>
<p style="text-align: justify;">b) Nếu phương pháp hóa học tách riêng các kim loại từ hỗn hợp: Au, Cu, Fe.</p>
<p style="text-align: justify;"><strong>Câu 2</strong>. (1 điểm). Viết các phương trình phản ứng sau:</p>
<p style="text-align: justify;">\(\begin{array}{*{20}{l}}{a){\rm{ }}Fe + C{l_2}}\\{b)Zn + CuS{O_4}}\\{c)Al + F{e_3}{O_4}}\\{d)Na + {H_2}O}\end{array}\)</p>
<p style="text-align: justify;"><strong>Câu 3</strong>. (3 điểm). Hỗn hợp A gồm 3 kim loại vụn nguyên chất Cu, Mg và Ba có khối lượng 10 gam.</p>
<p style="text-align: justify;">+ Cho A tác dụng với dung dịch HCl dư, sau đó lọc lấy phần không tan riêng ra, rửa sạch đem nung trong không khí cho đến khi phản ứng hoàn toàn, sản phẩm thu được có khối lượng 8 gam.</p>
<p style="text-align: justify;">+ Cho thêm để NaOH dư vào phần nước lọc, lấy kết tủa riêng ra, rửa sạch đem nung ở nhiệt độ cao đến khi khối lượng không đổi, sản phẩm thu được có khối lượng 4 ga,.</p>
<p style="text-align: justify;">Tính khối lượng của từng kim loại trong hỗn hợp A.</p>
<p style="text-align: justify;">&nbsp;</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong>I. PHẦN TRẮC NGHIỆM (3 điểm)</strong></p>
<p style="text-align: justify;"><strong>Câu 1.</strong> Chọn A.</p>
<p style="text-align: justify;"><strong>Câu 2</strong>. Chọn C.</p>
<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \({H_2}\) có thể khử được các kim loại trừ \(Zn \to Cu.\)</p>
<p style="text-align: justify;"><strong>Câu 3</strong>. Chọn A.</p>
<p style="text-align: justify;">Vì Sn yếu hơn sắt, không bảo vệ được sắt.</p>
<p style="text-align: justify;">C, D đúng vì đây là phương pháp cách li kim loại với môi trường.</p>
<p style="text-align: justify;">B đúng: Phương pháp kết hợp: Cách li và dùng kim loại mạnh chịu ăn mòn thay.</p>
<p style="text-align: justify;"><strong>Câu 4.</strong> Chọn C.</p>
<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \(\begin{array}{l}F{e^{2 + }} + A{g^ + } \to Ag + F{e^{3 + }}\\C{l^ - } + A{g^ + } \to AgCl\end{array}\)</p>
<p style="text-align: justify;"><strong>Câu 5</strong>. Chọn D.</p>
<p style="text-align: justify;">\({t_{Ag}} = \dfrac{{{n_{Ag}}.1.F}}{I} = \dfrac{{0,04.96500}}{{9,65}} = 400s &lt; 10\) phút</p>
<p style="text-align: justify;">\( \to \) thời gian còn lại: 200s. Nếu \(Cu{(N{O_3})_2}\) dư</p>
<p style="text-align: justify;">\(\begin{array}{l}{n_{Cu}} = \dfrac{{I.t}}{{2F}} = \dfrac{{9,65.200}}{{2.96500}} = 0,01mol &lt; 0,03\\{n_A} = 0,04.108 + 0,01.64 = 4,96gam.\end{array}\)</p>
<p style="text-align: justify;"><strong>Câu 6</strong>. Chọn C.</p>
<p style="text-align: justify;">1 mol Fe tan tạo ra có 1 mol Cu bám vào \( \to \) m<sub>giảm </sub>=64 – 56 = 8 gam.</p>
<p style="text-align: justify;">Mà m giảm 1,6 gam \( \to \) n<sub>Fe phản ứng </sub>= \({n_{CuS{O_4}}} = 0,2mol.\)</p>
<p style="text-align: justify;"><strong>II. PHẦN TỰ LUẬN (7 điểm)</strong></p>
<p style="text-align: justify;"><strong>Câu 1</strong>. (3 điểm)</p>
<p style="text-align: justify;">&nbsp;<img style="width: 100%; max-width: 400px;" src="https://img./picture/2018/1109/45p-de-1-chuong-5-c1-tl_1.jpg" alt=""></p>
<p style="text-align: justify;">b) Cho hỗn hợp vào dung dịch HCl dư thu được dung dịch \(FeC{l_2}\) và hỗn hợp Au, Cu. Cho hỗn hợp vào dung dịch \(HN{O_3}\) loãng thu được dung dịch \(Cu{(N{O_3})_2}\) và còn lại Au. Điện phân các dung dịch để được các kim loai tương ứng.</p>
<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<img style="width: 100%; max-width: 300px;" src="https://img.loigiaihay.com/picture/2018/1109/a1_1.jpg" alt=""></p>
<p style="text-align: justify;"><strong>Câu 2</strong>. (1 điểm)</p>
<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style="width: 100%; max-width: 300px;" src="https://img.loigiaihay.com/picture/2018/1109/45p-de-1-chuong-5-c2-tl-phan-giai_2.jpg" alt="">&nbsp;&nbsp;&nbsp; &nbsp;</p>
<p style="text-align: justify;"><strong>Câu 3</strong>. (3 điểm).</p>
<p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<img style="width: 100%; max-width: 400px;" src="https://img.loigiaihay.com/picture/2018/1109/2345.jpg" alt=""></p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`

multipleChoise = `<h2 class="s14 lineheight"></h2>
<p>Trong phân tử đisaccarit, số thứ tự C ở mỗi gốc monosaccarit<strong></strong></p>
<p>A. Được ghi theo chiều kim đồng hồ.</p>
<p>B. Được bắt đầu từ nhóm \(C{H_2}OH\)</p>
<p>C. Được bắt đầu từ C liên kết với cầu O nối liền 2 gốc monosaccarit.</p>
<p>D. Được ghi như ở mỗi monosaccarit hợp thành.</p>
<p><strong>Giả</strong>i :</p>
<p>Đáp án D</p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`

normals = `<h2 class="s14 lineheight"></h2>
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

testU = `<h2 class="s14 lineheight"></h2>
<p><strong class="content_question">Đề bài</strong></p>
<p style="text-align: justify;">Đọc đoạn trích văn bản sau và thực hiện các yêu cầu từ câu 1 đến câu 4</p>
<p style="text-align: justify;">&nbsp; &nbsp; &nbsp; <em>Ở nhiều điểm đến tham quan, du lịch khác cũng diễn ra các hành vi thiếu văn hóa của những vị khách thiệu ý thức. Ngay cả những nơi linh thiêng như khu tượng đài danh nhân, tưởng niệm các anh hùng liệt sĩ và di tích văn hóa – lịch sử mang tính biểu tượng, họ cũng không tha khi trèo bám, đánh đu, phô diễn hình thể, thậm chí còn ngồi cả lên đầu rùa Văn Miếu, hôn môi tượng danh nhân, leo lên hiện vật trong bảo tàng để chụp ảnh. Điều đáng buồn là số đông trong các vị khách du lịch, tham quan ấy lại là giới trẻ&nbsp; và có cả một vài diễn viên hài vốn được coi là “người của công chúng”. Các hình ảnh phản cảm được họ hả hê, khoái chí tung khoe trên Facebook hoặc các diễn đàn mạng, coi đó như một kỉ niệm của mình trong chuyến đi. Tại nhiều điểm đến đáng lẽ được bảo vệ nghiêm ngặt thì sự vô ý thức của một bộ phận du khách cũng hủy hoại và làm hoen ố vẻ đẹp của các di tích, danh thắng bởi những hành vi như dùng dao, dùng bút, than, phấn để khắc hình, ký tên, vẽ nhăng cuội, chi chít trê di tích. Có những hang động với hệ thống nhũ đá tuyệt đẹp hình thành từ hàng nghìn năm, vậy mà sau vài mùa đón khách tham quan đã bị rơi rụng hay vỡ nát do các du khách đau nhau lén lấy đá đập đề nghe âm thanh hoặc tìm kiếm một mẩu nhũ mang về. Tình trạng rác rưởi do khách vô ý thức vứt ra bừa bãi cũng làm dâu đầu ban quản lý các khu di tích, danh thắng trong công tác xử lí. Ngay cả di sản và kỳ quan thế giới Vịnh Hạ Long cũng bị du khách vô tư xả rác xuống mặt biển, mặc dù ban quản lí đã tăng cường nhắc nhở, xử phạt. Không thể đổ hết trách nhiệm lên đầu các cơ quan chức năng địa phương, bởi có những lúc số lượng khách đổ về quá đông mà lực lượng bảo vệ thu gom rác lại mỏng, có làm việc hết công suất cũng không xuể.</em></p>
<p style="text-align: right;" align="right">(<em>Nâng cao ý thức khách tham quan</em>, du lịch, Theo http://nhandan.com.vn, ngày 09.11.2013)</p>
<p style="text-align: justify;"><strong>Câu 1:&nbsp;</strong>Chủ đề của đoạn trích trên là gì?</p>
<p style="text-align: justify;"><strong>Câu 2:&nbsp;</strong>Đoạn trích được trình bày theo phong cách ngôn ngữ nào?</p>
<p style="text-align: justify;"><strong>Câu 3:</strong>&nbsp;Anh/chị dựa vào những đặc trưng nào để xác định phong cách ngôn ngữ của đoạn trích?</p>
<p style="text-align: justify;"><strong>Câu 4:&nbsp;</strong>Theo anh/chị, cần làm gì để hạn chế các hành vi thiếu ý thức của khách du lịch tại các khu di tích lịch sử, danh lam thắng cảnh?</p>
<p style="text-align: justify;"><strong>PHẦN II: LÀM VĂN</strong></p>
<p style="text-align: justify;"><strong>Câu 1: </strong></p>
<p style="text-align: justify;">Dựa vào một nội dung đoạn trích ở phần Đọc hiểu, anh/chị hãy viết đoạn văn ngắn (khoảng 200 chữ) trình bày suy nghĩ của mình về trách nhiệm của tuổi trẻ đối với việc bảo vệ các di sản văn hóa của dân tộc.</p>
<p style="text-align: justify;"><strong>Câu 2:</strong></p>
<p style="text-align: justify;">Cảm nhận vẻ đẹp phẩm hạnh của nhân vật “thị” trong truyện ngắn <em>Vợ nhặt</em> của nhà văn Kim Lân (Ngữ Văn 12, tập hai, NXB Giáo dục, 2017). Từ đó, liên hệ với nhân vật thị Nở trong truyện ngắn <em>Chí Phèo</em> của nhà văn Nam Cao (Ngữ Văn 11, tập một, NXB Giáo dục, 2017) để thấy điểm gặp gỡ trong quan niệm về vẻ đẹp con người của nhà văn Kim Lân và Nam Cao qua hai nhân vật này.</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong>PHẦN I. ĐỌC HIỂU </strong></p>
<p style="text-align: justify;"><strong>Câu 1:</strong></p>
<p style="text-align: justify;">Chủ đề: Tình trạng thiếu ý thức của các khách du lịch hiện nay.</p>
<p style="text-align: justify;"><strong>Câu 2:</strong></p>
<p style="text-align: justify;">Phong cách ngôn ngữ: Báo chí</p>
<p style="text-align: justify;"><strong>Câu 3:</strong></p>
<p style="text-align: justify;">_ Tính thông tin thời sự: phản ánh thực trạng thiếu ý thức của các khách du lịch tại các điểm tham quan, các danh lam thắng cảnh.</p>
<p style="text-align: justify;">_ Tính sinh động, hấp dẫn: thể hiện trong cách lấy dẫn chứng phong phú, cách dùng từ đặt câu: “người của công chúng”,…</p>
<p style="text-align: justify;"><strong>Câu 4:</strong></p>
<p style="text-align: justify;">Biện pháp:</p>
<p style="text-align: justify;">_ Tuyên truyền để khách du lịch thấy được những tác hại do hành vi thiếu ý thức của mình gây ra.</p>
<p style="text-align: justify;">_ Có biện pháp xử phạt nghiêm minh.</p>
<p style="text-align: justify;">_ Tự mỗi cá nhân cần có ý thức bảo vệ cảnh quan du lịch, các danh lam thắng cảnh.</p>
<p style="text-align: justify;"><strong>PHẦN II.LÀM VĂN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
<p style="text-align: justify;"><strong>Câu 1:</strong></p>
<p><strong><strong>•&nbsp;</strong>Giới thiệu vấn đề</strong></p>
<p><strong><strong>•&nbsp;</strong>Giải thích vấn đề</strong></p>
<p style="text-align: justify;">_ Di sản văn hóa: là di sản của các hiện vật vật lý và các thuộc tính phi vật thể của một nhóm hay xã hội được kế thừa từ các thế hệ trước, đã duy trì đến hiện nay và dành cho các thế hệ mai sau. Di sản văn hóa bao gồm tài sản văn hóa (như các tòa nhà, cảnh quan, di tích, sách, tác phẩm nghệ thuật, và các hiện vật), văn hóa phi vật thể (như văn hóa dân gian, truyền thống, ngôn ngữ và kiến thức) và di sản tự nhiên (bao gồm cảnh quan có tính văn hóa quan trọng và đa dạng sinh học).</p>
<p style="text-align: justify;">⟹&nbsp;Giữ gìn, bảo tồn những di sản văn hóa là trách nhiệm của tất cả mọi người đặc biệt là giới trẻ, những người chủ nhân tương lai của đất nước.</p>
<p><strong><strong>•&nbsp;</strong>Bàn luận vấn đề</strong></p>
<p style="text-align: justify;">_ Thực trạng di sản văn hóa hiện nay:</p>
<p style="text-align: justify;">Hiện nay, công tác bảo vệ và phát huy giá trị di sản văn hóa cũng còn nhiều bất cập:</p>
<p style="text-align: justify;">+ Nguy cơ thất truyền, mai một của nhiều loại hình di sản văn hóa phi vật thể và sự xuống cấp của các di tích lịch sửở mức báo động;</p>
<p style="text-align: justify;">+ Việc phát huy giá trị các lễ hội truyền thống còn nhiều hạn chế, hiện tượng thương mại hóa trong lễ hội chưa được ngăn chặn một cách có hiệu quả;</p>
<p style="text-align: justify;">+ Nạn trộm cắp, buôn bán cổ vật vẫn diễn biến phức tạp, tình trạng lấn chiếm di tích, danh lam, thắng cảnh;</p>
<p style="text-align: justify;">+ Hiện tượng xây dựng trái phép, tu bổ di tích sai nguyên tắc chưa có biện pháp ngăn chặn kịp thời…</p>
<p style="text-align: justify;">+ Thực trạng phá hoại di sản như trèo bám, ngồi lên, đánh đu,… lên các di sản diễn ra phổ biến. Hiện tượng vứt rác bừa bãi ở những khu du lịch diễn ra ngày càng nghiêm trọng.</p>
<p style="text-align: justify;">_ Trách nhiệm của giới trẻ:</p>
<p style="text-align: justify;">+ Giới trẻ cần ứng xử với di sản văn hóa bằng lòng tự hào dân tộc, bằng hiểu biết và niềm đam mê cái đẹp - di sản văn hóa.</p>
<p style="text-align: justify;">+ Chúng ta cần tăng cường giáo dục thẩm mỹ, giáo dục sự hiểu biết các tri thức văn hóa nói chung và di sản văn hóa dân tộc nói riêng, từ đó khơi dậy và nhân lên niềm đam mê, ý thức bảo vệ di sản trong thế hệ trẻ.</p>
<p style="text-align: justify;">+ Có những hành động thiết thực bảo vệ di sản văn hóa như: tuyên truyền đến mọi người, …</p>
<p style="text-align: justify;">_ Liên hệ bản thân: em đã làm gì để bảo vệ di sản tại quê hương mình</p>
<p style="text-align: justify;"><strong>Câu 2:</strong></p>
<p><strong><strong>•&nbsp;</strong>Giới thiệu tác, tác phẩm</strong></p>
<p style="text-align: justify;">_Kim Lân là cây bút xuất sắc của văn học hiện đại Việt Nam và nhà văn chuyên viết truyện ngắn. Thế giới nghệ thuật của ông là khung cảnh làng quê và hình tượng người nông dân – mảng hiện thực mà ông gắn bó và hiểu biết sâu sắc. Ông viết chân thực và xúc động về đời sống người dân quê mà ông hiểu sâu sắc cảnh ngộ và tâm lí của họ - những con người gắn bó tha thiết, thủy chung với quê hương và cách mạng. Sáng lên trong tác phẩm của ông là vẻ đẹp tâm hồn của người nông dân Việt Nam, những người sống cực nhọc, lam lũ, nghèo khổ nhưng vẫn yêu đời, chất phác, lạc quan, hóm hỉnh và tài hoa.</p>
<p style="text-align: justify;">_<em>Vợ nhặt</em> là một trong những sáng tác xuất sắc của ông. Có nhà nghiên cứu văn học đã xếp <em>Vợ nhặt</em> vào loại gần như “thần bút”.</p>
<p style="text-align: justify;">_Truyện ngắn được xây dựng trên cái nền hiện thực của nạn đói khủng khiếp năm Ất Dậu (1945) và được in trong tập <em>Con chó xấu xí</em> (1962). Tiền thân của truyện ngắn này là tiểu thuyết <em>Xóm ngụ cư</em> – được viết ngay sau Cách mạng tháng Tám nhưng dang dở và thất lạc bản thảo. Sau khi hòa bình lập lại (1954), ông dựa vào một phần cốt truyện cũ để viết truyện ngắn này.</p>
<p><strong><strong>•&nbsp;</strong>Cảm nhận vẻ đẹp của nhân vật “thị”</strong></p>
<p style="text-align: justify;">*&nbsp; Giới thiệu chân dung, lai lịch:</p>
<p style="text-align: justify;">* Lai lịch: không rõ ràng:</p>
<p style="text-align: justify;">_ Không tên tuổi.</p>
<p style="text-align: justify;">_ Không gia đình, quê hương.</p>
<p style="text-align: justify;">_ Không nghề nghiệp.</p>
<p style="text-align: justify;">_ Không tài sản</p>
<p style="text-align: justify;">_ Không quá khứ.</p>
<p style="text-align: justify;">⟶&nbsp;Trong nạn đói khủng khiếp, thân phận con người trở nên hết sức vô nghĩa.</p>
<p style="text-align: justify;">* Chân dung:</p>
<p style="text-align: justify;">_ Ngoại hình:</p>
<p style="text-align: justify;">+ Áo quần tả tơi như tổ đỉa</p>
<p style="text-align: justify;">+ Gầy sọp</p>
<p style="text-align: justify;">+ Mặt lưỡi cày xám xịt</p>
<p style="text-align: justify;">+ Ngực gầy lép</p>
<p style="text-align: justify;">+ Hai con mắt trũng hoáy</p>
<p style="text-align: justify;">*&nbsp; Ngoại hình thảm hại do cái đói tạo ra.</p>
<p style="text-align: justify;">_ Ngôn ngữ, cử chỉ, hành động:</p>
<p style="text-align: justify;"><em>+ “Điêu! Người thế mà điêu!”, “Ăn thật nhá”, “Hà, ngon. Về chị ấy thấy hụt tiền thì bỏ bố”⟶</em>&nbsp;đanh đá, chua ngoa, chao chát, chỏng lỏn.</p>
<p style="text-align: justify;">+ <em>“Ton ton chạy lại”, “liếc mắt cười tít”, “sầm sập chạy đến”, “xưng xỉa nói”, “cong cớn”, “cắm đầu ăn”, “ăn xong lấy đũa quẹt một cái”</em>, bám lấy câu nói đùa của người ta để theo về làm vợ thật ⟶ vô duyên, táo bạo đến mức trơ trẽn.</p>
<p style="text-align: justify;">*&nbsp; Vẻ đẹp nhân vật:</p>
<p style="text-align: justify;">* Khát vọng sống mãnh liệt:</p>
<p style="text-align: justify;">_ Khi nhìn dưới góc độ nhân bản thì tất cả hành động, cử chỉ trơ trẽn, vô duyên của thị lại là biểu hiện của khát vọng sống mãnh liệt&nbsp;⟶ khâm phục thị.</p>
<p style="text-align: justify;">* Vẻ đẹp nữ tính:</p>
<p style="text-align: justify;">_ Trên đường về nhà chồng:</p>
<p style="text-align: justify;">+ Rón rén, e thẹn: <em>“Thị cắp cái thúng con, cái đầu hơi cúi xuống; cái nón rách tả tơi nghiêng nghiêng che khuất đi nửa mặt”</em></p>
<p style="text-align: justify;">+ Ngượng nghịu: <em>“Chân nọ ríu vào chân kia”.</em></p>
<p style="text-align: justify;">⟶&nbsp;Bẽn lẽn, thẹn thùng như bất kì cô dâu mới nào.</p>
<p style="text-align: justify;">_ Khi về đến nhà chồng:</p>
<p style="text-align: justify;">+ Thấy gia cảnh nhà chồng: <em>“nén tiếng thở dài”</em></p>
<p style="text-align: justify;">+ <em>“Ngồi mớm ở mép giường”</em></p>
<p style="text-align: justify;">_ Khi gặp gỡ mẹ chồng:</p>
<p style="text-align: justify;">+ Đứng dậy nghênh đón, lễ phép chào.</p>
<p style="text-align: justify;">+ Ngượng nghịu cúi đầu, tay vân vê vạt áo.</p>
<p style="text-align: justify;">+ Đứng im lắng nghe bà cụ Tứ dặn dò.</p>
<p style="text-align: justify;">_ Sáng hôm sau:</p>
<p style="text-align: justify;">+ Dọn dẹp, vun vén nhà cửa.</p>
<p style="text-align: justify;">+ Bưng bát cháo khoán điềm nhiên và vào miệng.</p>
<p style="text-align: justify;">⟶&nbsp;Hiền hậu đúng mực</p>
<p style="text-align: justify;">* Niềm tin vào tương lai:</p>
<p style="text-align: justify;">_ Đưa đến thông tin mang tính chất như định hướng để mở ra lối thoát.</p>
<p style="text-align: justify;">*Nghệ thuật xây dựng nhân vật: chú trọng khắc họa cử chỉ, hành động, ngoại hình để người đọc nhận ra vẻ đẹp của thị.</p>
<p><strong>•&nbsp;</strong>Liên hệ với nhân vật Thị Nở trong tác phẩm <em>Chí Phèo</em> – Nam Cao</p>
<p style="text-align: justify;">*&nbsp; Giới thiệu tác giả Nam Cao và tác phẩm <em>Chí Phèo</em></p>
<p style="text-align: justify;">_Nam Cao là cây bút xuất sắc của văn học Việt Nam. Tác phẩm của ông xoay quanh đề tài về người trí thức nghèo và người nông dân.</p>
<p style="text-align: justify;">_<em>Chí Phèo</em> là một trong số những sáng tác đặc sắc làm nên tên tuổi của ông và đưa ông lên vị trí là một trong những nhà văn hiện thực xuất sắc nhất trước Cách mạng tháng Tám năm 1945.</p>
<p style="text-align: justify;">*&nbsp; Khái quát nhân vật Thị Nở</p>
<p style="text-align: justify;">*Chân dung, lai lịch:</p>
<p style="text-align: justify;">-&nbsp; Chân dung thảm hại: xấu ma chê quỷ hờn.</p>
<p style="text-align: justify;">-&nbsp; Dở hơi, <em>“ngẩn ngơ như những người đần trong cổ tích”.</em></p>
<p style="text-align: justify;">-&nbsp; Nghèo.</p>
<p style="text-align: justify;">-&nbsp; Có dòng giống mả hủi.</p>
<p style="text-align: justify;">⟶&nbsp;Không có cơ hội tìm kiếm hạnh phúc cho bản thân.</p>
<p style="text-align: justify;">⟶&nbsp;Bi đát, thảm hại, đáng thương, tội nghiệp.</p>
<p style="text-align: justify;">*Vẻ đẹp tâm hồn:</p>
<p style="text-align: justify;">_ Biết yêu thương, quan tâm, chăm sóc.</p>
<p style="text-align: justify;">+ Trong đêm gặp gỡ ăn nằm với Chí Phèo, Chí Phèo bị cảm lạnh nôn mửa, Thị Nở chăm sóc ân cần cho Chí: dìu vào lều -&gt; đặt nằm lên chõng&nbsp;⟶ nhặt nhạnh những manh chiếu rách đắp cho Chí Phèo cho khỏi lạnh rồi mới ra về.</p>
<p style="text-align: justify;">+ Khi ra về vẫn nghĩ đến Chí Phèo, không ngủ được, thương&nbsp;⟶ thức dậy ý thức trách nhiệm.</p>
<p style="text-align: justify;">+ Sáng sớm hôm sau nấu một nồi cháo hành mang cho Chí Phèo&nbsp;⟶ nhìn hắn toe toét cười, giục hắn ăn nóng….</p>
<p style="text-align: justify;">⟶&nbsp;Ân cần, tình tứ.</p>
<p style="text-align: justify;">⟶&nbsp;Thức tỉnh Chí Phèo.</p>
<p style="text-align: justify;">_ Biết khát khao hạnh phúc.</p>
<p style="text-align: justify;">+ Sau khi ăn nằm với Chí Phèo, Thị Nở về nhà và lăn lộn không ngủ được, nghĩ đến những chuyện đã qua, nghĩ đến hai chữ <em>“vợ chồng”</em> và thức dậy cho mình bản năng, khát vọng hạnh phúc đã ấp ủ từ lâu.</p>
<p style="text-align: justify;">+ Sẵn sàng vượt qua định kiến, đến ở với Chí Phèo suốt năm ngày.</p>
<p style="text-align: justify;">+ Về hỏi ý kiến bà cô để hợp thức hóa mối quan hệ với Chí Phèo, để có hạnh phúc bình dị như bao con người bình thường khác.</p>
<p><strong>•&nbsp;</strong>Nhận xét về quan niệm về vẻ đẹp của con người</p>
<p style="text-align: justify;">Kim Lân và Nam cao đều nhìn nhận con người trên vẻ đẹp về nhân phẩm, về tâm hồn. Đây cũng là chủ nghĩa nhân đạo trong sáng tác của hai nhà văn.</p>
<p><strong>•&nbsp;</strong>Tổng kết</p>
<p style="text-align: justify;"><span style="color: #0000ff;"><strong>Xem thêm: Đề và Lời giải chi tiết Đề thi thử THPT Quốc gia môn Ngữ văn mới nhất tại&nbsp;Tuyensinh247.com</strong></span></p>
<p style="text-align: right;"><strong>&nbsp;</strong></p>
<div class="clearfix"></div>`

testU2 = `<h2 class="s14 lineheight"></h2>
<div class="Section1">
 <p class="Bodytext40" style="text-align: justify;"><strong>1. Nêu những nét chính về quan điểm sáng tác văn học, nghệ thuật của Hồ Chí Minh. Quan điếm đó đã giúp anh chị hiểu sâu sắc thêm văn thơ của Người như thế nào?</strong></p>
 <p class="Bodytext40" style="text-align: justify;"><strong>Trả lời:</strong></p>
 <p style="text-align: justify;">a. Quan điểm sáng tác văn học nghệ thuật của Hồ Chí Minh:</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp; Bác coi văn nghệ là vũ khí chiến đấu phục vụ sự nghiệp cách mạng, bởi vậy nhà văn cũng là một chiến sĩ.</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp; Chú trọng tính chân thật và tính dân tộc của văn chương.</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp; Chú ý đến mục đích, đối tượng tiếp nhận để lựa chọn nội dung và hình thức thể hiện phù hợp, tạo ra tính đa dạng, phong phú và hiệu quả cao.&nbsp;<span>Người luôn đặt câu hỏi:&nbsp;</span><em>Viết cho ai?, Viết để làm gì?, Viết cái gì?</em><span>&nbsp;và&nbsp;</span><em>Viết như thế nào?</em></p>
 <p style="text-align: justify;">b. <span>&nbsp;Văn thơ Hồ Chí Minh là một bộ phận gắn bó hữu cơ với sự nghiệp cách mạng vĩ đại của Người.&nbsp;</span>Quan điểm sáng tác của Hồ Chí Minh giúp ta hiểu sâu sắc hơn các tác phẩm văn học của Người: Đó là những sáng tác chủ yếu nhằm mục đích phục vụ sự nghiệp cách mạng.</p>
 <p style="text-align: justify;"><strong>2. Nêu những nét khái quát về sự nghiệp văn học của Bác. (dựa vào SGK, phần Kiến thức cơ bản đã trình bày ở trên và theo những gợi ý dưới đây)</strong></p>
 <p style="text-align: justify;"><strong>Trả lời:</strong></p>
 <p style="text-align: justify;">a. Văn chính luận</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp;&nbsp; Viết bằng tiếng Pháp: Gồm những bài đăng trên các báo: Người cùng khổ, Nhân đạo, Đời sống thợ thuyền... đặc biệt là tác phẩm Bản án chế độ thực dân Pháp (1922).</p>
 <p class="Bodytext50" style="text-align: justify;">-&nbsp;&nbsp; Viết bằng tiếng Việt: Tuyên ngôn độc lập (1945), Lời kêu gọi toàn quốc kháng chiến (1946), Không có gì quý hơn độc lập tự do (1966).</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp;&nbsp; Mục đích văn chính luận của Bác: đấu tranh chính trị, tấn công trực diện kẻ thù được thể hiện những nhiệm vụ của cách mạng qua các thời kì lịch sứ.</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp;&nbsp; Đặc điểm nghệ thuật: đa dạng, linh hoạt, kết hợp lí và tình, lời văn chặt chẽ, luôn đứng trên lập trường chính nghĩa để tuyên truyền hoặc tố cáo...</p>
 <p style="text-align: justify;">b. Truyện và kí</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp;&nbsp; Nội dung: Tố cáo thực dân và phong kiến, đề cao những tấm gương yêu nước...</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp; &nbsp;Nghệ thuật: tình huống truyện độc đáo, hình tượng sinh động, nghệ thuật trần thuật linh hoạt, giọng văn thâm thuý chứng tỏ Bác là một cây văn xuôi đầy tài năng.</p>
 <p class="Bodytext0" style="text-align: justify;"><span>- Tiêu biểu:&nbsp;</span><em>Lời than vãn của bà Trưng Trắc</em><span>&nbsp;(1922);&nbsp;</span><em>Vi hành</em><span>&nbsp;(1923);&nbsp;</span><em>Những trò lố hay là Va-ren và Phan Bội Châu</em><span>&nbsp;(1925);&nbsp;</span><em>Nhật ký chìm tàu</em><span>&nbsp;(1931);&nbsp;</span><em>Vừa đi đường vừa kể chuyện</em><span>&nbsp;(1963)</span></p>
 <p style="text-align: justify;">c. Thơ ca</p>
 <p class="Bodytext50" style="text-align: justify;">-&nbsp; Tập thơ chữ Hán: Ngục trung nhật kí (Nhật kí trong tù)</p>
 <p class="Bodytext0" style="text-align: justify;">+ Nội dung: Tái hiện bộ mặt tàn bạo của nhà tù Quốc dân đảng, một phần hình ảnh xã hội Trung Quốc. Tập thơ thể hiện bức chân dung tự hoạ con người tinh thần Hồ Chí Minh: khao khát tự do, nghị lực phi thường, giàu lòng nhân đạo, yêu thiên nhiên, Tổ quôc, trí tuệ sắc sảo “một tâm hồn vĩ đại của bậc đại trí, đại nhân, đại dũng" (Nhà văn Viên Ưng - Trung Quốc).</p>
 <p class="Bodytext0" style="text-align: justify;">+ Nghệ thuật: Đa dạng về bút pháp, hồn thơ tinh thế, vừa cổ điển vừa hiện đại, hình tượng trong thơ luôn vận động, hướng về sự sống tương lai và ánh sáng.</p>
 <p class="Bodytext50" style="text-align: justify;">-&nbsp; Thơ tuyên truyền, cổ động (Con cáo và tổ ong, Ca du kích...).</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp; Những bài thơ giải trí trong kháng chiến: Đối nguyệt (Với trăng, Nguyên tiêu (Rằm tháng giêng), Thu dạ (Đêm thu), Báo tiệp (Tin thắng trận), Cảnh khuya...</p>
 <p style="text-align: justify;"><strong>3. Nêu những nét chính về phong cách nghệ thuật của Hồ Chí Minh?</strong>&nbsp;</p>
 <p style="text-align: justify;"><strong>Trả lời:</strong></p>
 <p style="text-align: justify;">Phong cách nghệ thuật của Bác độc đáo mà đa dạng:</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp;&nbsp; Văn chính luận:&nbsp;<span>ngắn gọn, súc tích,</span> lí lẽ đanh thép, bằng chứng đầy tính thuyết phục, giàu hình ảnh, giọng văn linh hoạt.</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp;&nbsp;&nbsp; Truyện và kí: <span>có tính chiến đấu mạnh mẽ,&nbsp;</span>nghệ thuật trào phúng sắc bén tuy nhẹ nhàng, hóm hỉnh nhưng rất sâu cay, thâm thuý, mang đậm nét Á Đông.</p>
 <p class="Bodytext0" style="text-align: justify;">-&nbsp;&nbsp; Thơ ca: ở những bài mang mục đích tuyên truyền thì lời lẽ giản dị, dễ hiểu, dễ nhớ; còn những bài viết theo cảm hứng thẩm mĩ thì hàm súc "ý tại ngôn ngoại" kết hợp chất tình và chất thép, giản dị mà sâu xa, hồn của tạo vật và lòng người, thiên nhiên chiếm một “địa vị danh dự" (Đặng Thai Mai). Nét bao trùm là: cổ điển mà vẫn hiện đại.</p>
</div>
<p class="Bodytext0" style="text-align: justify;" align="left"><strong>II. Luyện tập</strong></p>
<p style="text-align: justify;"><strong>1. Phân tích các bài thơ Mộ để làm rõ sự hài hoà giữa bút pháp cổ điển với bút pháp hiện đại trong thơ Hồ Chí Minh</strong>.</p>
<p style="text-align: justify;">Trả lời:</p>
<p style="text-align: justify;"><strong>Dàn ý chi tiết</strong></p>
<p style="text-align: justify;"><strong>Mở bài:&nbsp;</strong></p>
<p style="text-align: justify;">Khái quát về bài thơ Chiều tối</p>
<p style="text-align: justify;">– “Chiều tối” (Mộ) là bài thớ thứ 31 của tập “Nhật ký trong tù”. Cảm hứng sáng tác của bài thơ được gợi lên trên đường chuyển lao từ Tĩnh Tây đến Thiên Bảo vào cuối thu 1942.</p>
<p style="text-align: justify;">– “<em>Chiều tối”</em>&nbsp;là bài thơ mang màu sắc cổ điển – thể hiện ở thể thơ tứ tuyệt, hình ảnh ước lệ, tượng trưng, nghệ thuật điểm xuyết quen thuộc trong thơ ca trung đại và tinh thần hiện đại – lấy sự vận động của con làm hình tượng thơ, lấy con người làm đối tượng trung tâm cho bức tranh thiên nhiên.</p>
<p style="text-align: justify;"><strong>Thân bài:</strong></p>
<p style="text-align: justify;"><strong>1. Bức tranh thiên nhiên chiều tà (2 câu đầu)</strong></p>
<p style="text-align: justify;">“Quyện điểu quy lâm tầm túc thụ</p>
<p style="text-align: justify;">Cô vân mạn mạn độ thiên không”</p>
<p style="text-align: justify;">(Chim mỏi về rừng tìm chốn ngủ,</p>
<p style="text-align: justify;">Chòm mây trôi nhẹ giữa tầng không)</p>
<p style="text-align: justify;">– Về khung cảnh thiên nhiên: Khung cảnh thiên nhiên lúc chiều tối. Trong bức tranh thiên nhiên ấy có: cánh chim mệt mỏi bay về tổ và chòm mây lơ lững giữa tầng không.</p>
<p style="text-align: justify;">– Về hình ảnh thơ: Hình ảnh cánh chim và chòm mây là những hình ảnh quen thuộc trong thơ ca xưa – mang nét đẹp cổ điển.</p>
<p style="text-align: justify;">– Về hình ảnh “cánh chim”: cánh chim mệt mỏi bay về tổ. Hình ảnh cánh chim điểm xuyết lên bức tranh chiều tàn tạo nét chấm phá cho bức tranh. Hình ảnh “cánh chim” gợi tả không gian rộng lớn, thinh vắng trong thời khắc ngày tàn đồng thời cũng là dấu hiệu thời gian. Đồng thời trạng thái “mỏi mệt” của cánh chim gợi điểm tương đồng giữa cánh chim và người tù nhân – chiều đã về, ngày đã tàn nhưng vẫn mệt mõi lê bước trên đường trường =&gt; cảnh và người hòa quyện, đồng điệu, giao cảm.</p>
<p style="text-align: justify;">– Về hình ảnh&nbsp;<em>“Chòm mây trôi nhẹ giữa tầng không”</em>&nbsp;(“Cô vân mạn mạn độ thiên không”)<em>.</em></p>
<p style="text-align: justify;">+ “Cô vân”: Bản dịch thơ gợi tả được sự vận động của đám mây “trôi nhẹ”. Cách dịch làm người đọc cảm nhận được sự thư thái, nhẹ nhàng nhưng chưa gợi tả được nổi cô đơn, lẻ loi của áng mây chiều. Cũng vì thế thi pháp chấm phá trong bản dịch chưa thể hiện nổi bật, chưa làm nổi bật được không gian rộng lớn, chưa làm nổi bật được nỗi cô độc nơi đất khác quê người của nhà thơ.</p>
<p style="text-align: justify;">+ Hình ảnh chòm mây cô độc trôi chầm chậm trong không gian bao la của bầu trời chiều “độ thiên không”. Hình ảnh này gợi nhớ câu thơ “Ngàn năm mây trắng bây giờ còn bay” của nhà thơ Thôi Hiệu. “Chòm mây” cũng từ đó mà có hồn, mang lại nhiều suy tư về cuộc đời cách mạng gian truân của Hồ Chủ tịch – cứ đi mãi mà vẫn chưa thấy tương lai tươi sáng rọi về.</p>
<p style="text-align: justify;">+ Tâm hồn nhà thơ qua câu thơ: Dẫu bị tù đày, xiềng xích, khổ nhục nhưng tâm hồn lại thư thái cùng thơ ca và thiên nhiên. Đồng thời qua đó ta cảm nhận được nghị lực phi thường – chất thép của một người chí sĩ cách mạng, một con người yêu và khao khát tự do mãnh liệt như áng mây, như cánh chim trời.</p>
<p style="text-align: justify;">– Đánh giá chung: Thiên nhiên trong thơ Bác mang nét đẹp cổ điển với những hình ảnh thơ gần gũi, bình dị. Đồng thời bức tranh thiên nhiên và con người có sự giao hòa với nhau. Ẩn sau bức tranh thiên nhiên là những nỗi niềm tâm trạng của nhà thơ – tả cảnh ngụ tình.</p>
<p style="text-align: justify;"><strong>2. Bức tranh đời sống con người</strong></p>
<p style="text-align: justify;">“Sơn thôn thiếu nữ ma bao túc</p>
<p style="text-align: justify;">Bao túc ma hoàn, lô dĩ hồng”</p>
<p style="text-align: justify;">(Cô em xóm núi xay ngô tối</p>
<p style="text-align: justify;">Xay hết, lò than đã tực hồng)</p>
<p style="text-align: justify;">– Hình ảnh cô gái xay ngô tối trẻ trung, khỏe khoắn, siêng năng lao động tạo nét chấm phá (điểm xuyết) cho bức tranh, trở thành trung tâm của cảnh vật. Dù là xuất hiện giữa không gian núi rừng trong đêm mênh mông nhưng hình ảnh cô gái sơn cước không hề đơn độc. Hình ảnh thơ gợi sự ấm ám cho người đọc.</p>
<p style="text-align: justify;">– Qua hình ảnh thơ, ta còn thấy ở Bác là tấm lòng, tình yêu, sự trân trọng dành cho những người lao động – dù nghèo khó, vất vả nhưng vẫn lao động miệt mài trong tự do.</p>
<p style="text-align: justify;">– So sánh với nguyên tác, trong nguyên tác không đề cập đến từ “tối” nhưng chính sức gợi tả trong thơ Người làm người đọc (kể cả người dịch) cảm nhận được sự trôi chảy của thời gian – từ chiều đến khuya.</p>
<p style="text-align: justify;">– Từ ngữ đặc sắc: Từ đặc sắc, đắt giá nhất tạo thần thái cho câu thơ là chữ “hồng”. Vì từ “hồng” vừa giúp người đọc hình dung ra được thời gian, vừa làm câu bài thơ “Chiều tối” trở nên sáng rực xua tan đi bao mệt mỏi, nặng nề của bài thơ cũng như trong tâm hồn nhà thơ. Cũng vì thế mà chữ “hồng” trở thành nhãn tự của bài thơ.</p>
<p style="text-align: justify;"><strong>Kết bài:</strong></p>
<p style="text-align: justify;">– Về nghệ thuật (Xem phần tác phẩm)</p>
<p style="text-align: justify;">– Về nội dung: Bài thơ bốn dòng, hai mươi bảy chữ, đã thể hiện tinh thần lạc quan, ung dung, tự tại, kiêng cường vượt qua mọi hoàn cảnh sống và vẻ đẹp tâm hồn, nhân cách của Hồ Chí Minh-người chiến sĩ, nghệ sĩ với tình yêu thiên nhiên, yêu con người, yêu cuộc sống. Qua bài thơ, người ta càng cảm nhận được tấm lòng nhân ái, yêu nước thương nòi và hi sinh đến quên mình của Bác.</p>
<p style="text-align: justify;"><strong>2. Những bài học thấm thía và sâu sắc khi học và đọc Nhật kí trong tù.</strong></p>
<p style="text-align: justify;"><strong>Trả lời:</strong></p>
<p class="Bodytext0" style="text-align: justify;" align="left">-&nbsp;&nbsp; Lòng nhân đạo là đức tính cao đẹp nhất của Bác Hồ. Tình cảm này vừa cụ thể vừa bao la, vừa ở nhận thức vừa ở hành động.</p>
<p class="Bodytext0" style="text-align: justify;">-&nbsp; Một tâm hồn nhạy cảm và dễ rung động trước tạo vật và lòng người: “Thân thể ở trong lao Tinh thần ở ngoài lao".</p>
<p class="Bodytext0" style="text-align: justify;">- Tinh thần thép kiên cường đi đôi với tâm hồn nhạy cảm, đậm chất trữ tình.</p>
<p class="Bodytext0" style="text-align: justify;">-&nbsp; Nhật kí thể hiện nhân cách của một bậc “đại trí, đại nhân, đại dũng".</p>
<p class="Bodytext0" style="text-align: justify;">-&nbsp; Thơ Bác là sự kết hợp hài hoà giữa hai yếu tố: cổ điển và hiện đại.</p>
<p class="Bodytext0" style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`

// let stringInnerHTML = normal;
// let stringInnerHTML = multipleChoise;
// let stringInnerHTML = multipleChoiseTest;
// let stringInnerHTML = noQuestion;
// let stringInnerHTML = noQuestionMutipleChoise;
// let stringInnerHTML = normals;
// let stringInnerHTML = multipleChoises;
// let stringInnerHTML = testU;
stringInnerHTML = testU2;


let text = "test";
let book = "văn";
// let book = "toán";
let detailSection = new DetailSection(document, stringInnerHTML, text, book);

detailSection.buildDetail(false);
document.body.appendChild(detailSection.element);
fs.writeFile('test.html', dom.serialize(), err => {
    console.log('done: test');
});
