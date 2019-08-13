
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
<p style="text-align: justify;"><strong>I. Phần trắc nghiệm</strong>&nbsp;<em>(4 điểm)</em></p>
<p style="text-align: justify;"><strong>Câu 1:</strong>&nbsp;Tại sao đột biến gen thường có hại cho cơ thể sinh vật nhưng vẫn có vai trò quan trọng trong quá trình tiến hóa?</p>
<p style="text-align: justify;">(1): tần số đột biến gen trong tự nhiên là không đáng kể nên tần số alen đột biến có hại là rất thấp.</p>
<p style="text-align: justify;">(2): khi môi trường thay đổi, thể đột biến có thể thay đổi giá trị thích nghi.</p>
<p style="text-align: justify;">(3): giá trị thích nghi của đột biến tùy thuộc vào tổ hợp gen.</p>
<p style="text-align: justify;">(4): đột biến gen thường có hại nhưng nó tồn tại ở dạng dị hợp nên không gây hại.</p>
<p style="text-align: justify;">Câu trả lời đúng nhất là</p>
<p style="text-align: justify;">A. (3) và (4).</p>
<p style="text-align: justify;">B. (2) và (4).</p>
<p style="text-align: justify;">C. (1) và (3).</p>
<p style="text-align: justify;">D. (2) và (3).</p>
<p style="text-align: justify;"><strong>Câu 2:</strong>&nbsp;Các nhân tố tiến hóa nào vừa làm thay đổi tần số tương đối các alen của gen vừa làm thay đổi thành phần kiểu gen của quần thể? (1): chọn lọc tự nhiên; (2): giao phối không ngẫu nhiên; (3): di - nhập gen; (4): đột biến; (5): các yêu tố ngẫu nhiên. Trả lời đúng là</p>
<p style="text-align: justify;">A. (1), (2), (4), (5).</p>
<p style="text-align: justify;">B. (1), (2), (3), (4).</p>
<p style="text-align: justify;">C. (1), (3), (4), (5).</p>
<p style="text-align: justify;">D. Tất cả các nhân tố trên.</p>
<p style="text-align: justify;"><strong>Câu 3:</strong>&nbsp;Trong rừng mưa nhiệt đới, những cây thân gỗ có chiều cao vượt lên tầng trên của tán rừng thuộc nhóm thực vật</p>
<p style="text-align: justify;">A. ưa sáng.</p>
<p style="text-align: justify;">B. chịu bóng.</p>
<p style="text-align: justify;">C. ưa bóng.</p>
<p style="text-align: justify;">D. ưa bóng và ưa ẩm.</p>
<p style="text-align: justify;"><strong>Câu 4:</strong>&nbsp;Thành phần hữu sinh của một hệ sinh thái bao gồm:</p>
<p style="text-align: justify;">A. sinh vật sản xuất, sinh vật tiêu thụ, sinh vật phân giải</p>
<p style="text-align: justify;">B. sinh vật sản xuất, sinh vật ăn thực vật, sinh vật phân giải</p>
<p style="text-align: justify;">C. sinh vật ăn thực vật, sinh vật ăn động vật, sinh vật phân giải</p>
<p style="text-align: justify;">D. sinh vật sản xuất, sinh vật ăn động vật, sinh vật phân giải</p>
<p style="text-align: justify;"><strong>Câu 5:</strong>&nbsp;Tác động của vi khuẩn nitrát hóa là:</p>
<p style="text-align: justify;">A. cố định nitơ trong đất thành dạng đạm nitrát (NO<sub>3</sub><sup>-</sup>)</p>
<p style="text-align: justify;">B. cố định nitơ trong nước thành dạng đạm nitrát (NO<sub>3</sub><sup>-</sup>)</p>
<p style="text-align: justify;">C. biến đổi nitrit (NO<sub>2</sub><sup>-</sup>) thành nitrát (NO<sub>3</sub><sup>-</sup>)</p>
<p style="text-align: justify;">D. biến đổi nitơ trong khí quyển thành dạng đạm nitrát (NO<sub>3</sub><sup>-</sup>)</p>
<p style="text-align: justify;"><strong>Câu 6:</strong>&nbsp;Trong chu trình cacbon, điều nào dưới đây là không đúng:</p>
<p style="text-align: justify;">A. cacbon đi vào chu trình dưới dạng cacbonđiôxit</p>
<p style="text-align: justify;">B. thông qua quang hợp, thực vật lấy CO<sub>2</sub>&nbsp;để tạo ra chất hữu cơ</p>
<p style="text-align: justify;">C. động vật ăn cỏ sử dụng thực vật làm thức ăn chuyển các hợp chất chứa cacbon cho động vật ăn thịt</p>
<p style="text-align: justify;">D. phần lớn CO<sup>2</sup>&nbsp;được lắng đọng, không hoàn trả vào chu trình</p>
<p style="text-align: justify;"><strong>Câu 7:</strong>&nbsp;Sinh vật sản xuất là những sinh vật:</p>
<p style="text-align: justify;">A. phân giải vật chất (xác chết, chất thải) thành những chất vô cơ trả lại cho môi trường</p>
<p style="text-align: justify;">B. động vật ăn thực vật và động vật ăn động vật</p>
<p style="text-align: justify;">C. có khả năng tự tổng hợp nên các chất hữu cơ để tự nuôi sống bản thân</p>
<p style="text-align: justify;">D. chỉ gồm các sinh vật có khả năng hóa tổng hợp</p>
<p style="text-align: justify;"><strong>Câu 8:</strong>&nbsp;Để cải tạo đất nghèo đạm, nâng cao năng suất cây trồng người ta sử dụng biện pháp sinh học nào?</p>
<p style="text-align: justify;">A. trồng các cây họ Đậu</p>
<p style="text-align: justify;">B. trồng các cây lâu năm</p>
<p style="text-align: justify;">C. trồng các cây một năm</p>
<p style="text-align: justify;">D. bổ sung phân đạm hóa học.</p>
<p style="text-align: justify;"><strong>II. Phần tự luận</strong>&nbsp;<em>(6 điểm)</em></p>
<p style="text-align: justify;"><strong>Câu 1</strong>&nbsp;(3 điểm): So sánh hệ sinh thái tự nhiên và hệ sinh thái nhân tạo.</p>
<p style="text-align: justify;"><strong>Câu 2</strong>&nbsp;(3 điểm): Mô tả đặc điểm và ý nghĩa cuả các kiểu phân bố cơ bản trong quần thể.</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<p style="text-align: justify;"><strong>I. Phần trắc nghiệm</strong>&nbsp;<em>(4 điểm)</em></p>
<p style="text-align: justify;"><em>Mỗi câu trả lời đúng 0.5 điểm</em></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <tbody>
  <tr>
   <td valign="top" width="128"> <p align="center"><strong>1.D</strong></p> </td>
   <td valign="top" width="128"> <p align="center"><strong>2.C</strong></p> </td>
   <td valign="top" width="128"> <p align="center"><strong>3.A</strong></p> </td>
   <td valign="top" width="128"> <p align="center"><strong>4.A</strong></p> </td>
   <td valign="top" width="128"> <p align="center"><strong>5.C</strong></p> </td>
  </tr>
  <tr>
   <td valign="top" width="128"> <p align="center"><strong>6.D</strong></p> </td>
   <td valign="top" width="128"> <p align="center"><strong>7.C</strong></p> </td>
   <td valign="top" width="128"> <p align="center"><strong>8.A</strong></p> </td>
   <td valign="top" width="128"> <p align="center"><strong>&nbsp;</strong></p> </td>
   <td valign="top" width="128"> <p align="center"><strong>&nbsp;</strong></p> </td>
  </tr>
 </tbody>
</table>
<p style="text-align: justify;">&nbsp;<strong>II. Phần tự luận</strong>&nbsp;<em>(6 điểm)</em></p>
<p style="text-align: justify;"><strong>Câu 1</strong></p>
<p style="text-align: justify;"><strong>* Giống nhau: (1 điểm)</strong></p>
<p style="text-align: justify;">- Hệ sinh thái tự nhiên và nhân tạo đều có những đặc điếm chung về thành phần cấu trúc, bao gồm thành phần vật chất vô sinh và thành phần hữu sinh.</p>
<p style="text-align: justify;">- Thành phần vật chất vô sinh là môi trường vật lí (sinh cảnh) và thành phần hữu sinh là quần xã sinh vật.</p>
<p style="text-align: justify;">- Các sinh vật trong quần xã luôn tác động lẫn nhau và đồng thời tác động với các thành phần vô sinh của sinh cảnh.</p>
<p style="text-align: justify;"><strong>* Khác nhau:</strong></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <tbody>
  <tr>
   <td valign="top"> <p>Hệ sinh thái tự nhiên</p> </td>
   <td valign="top"> <p>Hệ sinh thái nhân tạo</p> </td>
   <td valign="top"> <p>Điểm</p> </td>
  </tr>
  <tr>
   <td valign="top"> <p>Thành phần loài đa dạng</p> </td>
   <td valign="top"> <p>Thành phần loài ít, ít đa dạng</p> </td>
   <td valign="top"> <p>0,5</p> </td>
  </tr>
  <tr>
   <td valign="top"> <p>Ít chịu sự chi phối của con người</p> </td>
   <td valign="top"> <p>Chịu sự chi phối, điều khiển của con người</p> </td>
   <td valign="top"> <p>0,5</p> </td>
  </tr>
  <tr>
   <td valign="top"> <p>Sự tăng trưởng của các cá thể chậm, phụ thuộc vào điều kiện môi trường</p> </td>
   <td valign="top"> <p>Được áp dụng các biện pháp canh tác và kĩ thuật hiện đại nên sinh trưởng của các cá thể nhanh, năng suất sinh học cao</p> </td>
   <td valign="top"> <p>0,5</p> </td>
  </tr>
  <tr>
   <td valign="top"> <p>Tính ổn định cao, tự điều chỉnh, mắc bệnh ít chuyển thành dịch</p> </td>
   <td valign="top"> <p>Tính ổn định thấp, dễ bị biến đổi, dễ mắc dịch bệnh</p> </td>
   <td valign="top"> <p>0,5</p> </td>
  </tr>
 </tbody>
</table>
<p style="text-align: justify;"><strong>Câu 2</strong></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <tbody>
  <tr>
   <td valign="top"> <p>Kiểu phân bố</p> </td>
   <td valign="top"> <p>Đặc điểm</p> </td>
   <td valign="top"> <p>Ý nghĩa sinh thái</p> </td>
   <td valign="top"> <p>Điểm</p> </td>
  </tr>
  <tr>
   <td valign="top"> <p>Phân bố theo nhóm</p> </td>
   <td valign="top"> <p>Là kiểu phân bố phổ biến nhất, các cá thể của quần thể tập trung theo từng nhóm ở những nơi có điều kiện sống tốt nhất. Phân bố theo nhóm xuất hiện nhiều ở sinh vật sống thành bầy đàn, khi chúng trú đông, ngủ đông, di cư...</p> </td>
   <td valign="top"> <p>Các cá thể hỗ trợ lẫn nhau chống lại điều kiện bất lợi của môi trường.</p> </td>
   <td valign="top"> <p>1</p> </td>
  </tr>
  <tr>
   <td valign="top"> <p>Phân bố đồng đều</p> </td>
   <td valign="top"> <p>Thường gặp khi điều kiện sống phân bố một cách đồng đều trong môi trường và khi có sự cạnh tranh gay gắt giữa các cá thể của quần thể.</p> </td>
   <td valign="top"> <p>Làm giảm mức độ cạnh tranh giữa các cá thể trong quần thể.</p> </td>
   <td valign="top"> <p>1</p> </td>
  </tr>
  <tr>
   <td valign="top"> <p>Phân bố ngẫu nhiên</p> </td>
   <td valign="top"> <p>Là dạng trung gian của hai dạng trên.</p> </td>
   <td valign="top"> <p>Sinh vật tận dụng được nguồn sống tiềm tàng trong môi trường.</p> </td>
   <td valign="top"> <p>1</p> </td>
  </tr>
 </tbody>
</table>
<p style="text-align: right;"><strong>&nbsp;</strong></p>
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

// multipleChoises = `<h2 class="s14 lineheight"></h2>
// <p><strong class="content_question">Đề bài</strong></p>
// <p style="text-align: justify;"><strong>I. PHẦN TRẮC NGHIỆM (3 điểm)</strong></p>
// <p style="text-align: justify;"><strong>Câu 1</strong>. Hầu hết các kim loại đều có ánh kim là do</p>
// <p style="text-align: justify;">A. các electron tự do trong kim loại phản xạ những tia sáng nhìn thấy.</p>
// <p style="text-align: justify;">B. kim loại hấp thu được các tia sáng tới.</p>
// <p style="text-align: justify;">C. các kim loại đều ở thể rắn.</p>
// <p style="text-align: justify;">D. kim loại màu trắng bạc nên giữ được các tia sáng trên bề mặt kim loại.</p>
// <p style="text-align: justify;"><strong>Câu 2.</strong> Những kim loại nào sau đây có thể điều chế được từ oxit, bằng phương pháp nhiệt luyện nhờ chất khử \({H_2}\)?</p>
// <p style="text-align: justify;">A. Fe, Al, Cu.</p>
// <p style="text-align: justify;">&nbsp;B. Zn, Mg, Fe.</p>
// <p style="text-align: justify;">C. Fe, Mn, Ni.</p>
// <p style="text-align: justify;">&nbsp;D. Ni, Cu, Ca.</p>
// <p style="text-align: justify;"><strong>Câu 3</strong>. Thép dễ bị ăn mòn trong không khí ẩm. Cách nào sau đây không có tác dụng bảo vệ thép khỏi bị ăn mòn?</p>
// <p style="text-align: justify;">A. Hàn thêm một mẩu Sn vào thép.</p>
// <p style="text-align: justify;">B. Mạ một lớp kim loại như Zn, Cr lên bề mặt của thép.</p>
// <p style="text-align: justify;">C. Sơn một lớp mỏng.</p>
// <p style="text-align: justify;">D. Bôi một lớp dầu, mỡ (parafin) lên bề mặt của thép.</p>
// <p style="text-align: justify;"><strong>Câu 4</strong>. Cho dung dịch \(FeC{l_2}\) tác dụng với dung dịch \(AgN{O_3}\) dư, thu được phần không tan Z. Trong Z có chứa</p>
// <p style="text-align: justify;">A. Ag.&nbsp;&nbsp;</p>
// <p style="text-align: justify;">B. AgCl.</p>
// <p style="text-align: justify;">C. Ag, AgCl.</p>
// <p style="text-align: justify;">D. Ag, AgCl, Fe.</p>
// <p style="text-align: justify;"><strong>Câu 5</strong>. Điện phân 200 ml dung dịch chứa \(AgN{O_3}\) 0,2M và \(Cu{\left( {N{O_3}} \right)_2}\) 0,3M với dòng điện có cường độ 9,65A trong 10 phút. Điện cực trơ. Khối lượng kim loại bám trên catot là</p>
// <p style="text-align: justify;">A. 4,32 gam.</p>
// <p style="text-align: justify;">B. 5,6 gam.</p>
// <p style="text-align: justify;">C. 8,16 gam.&nbsp;&nbsp;</p>
// <p style="text-align: justify;">D. 4,96 gam.</p>
// <p style="text-align: justify;"><strong>Câu 6</strong>. Ngâm một đinh sắt sạch vào 100 ml dung dịch \(CuS{O_4}\) sau khi phản ứng kết thúc lấy đinh sắt ra khỏi dung dịch, rửa sạch, làm khô thấy khối lượng đinh sắt tăng thêm 1,6 gam. Nồng độ mol của dung dịch \(CuS{O_4}\) ban đầu là</p>
// <p style="text-align: justify;">A. 0,25M.</p>
// <p style="text-align: justify;">B. 1 M.</p>
// <p style="text-align: justify;">C. 2 M.&nbsp;</p>
// <p style="text-align: justify;">D. 0,5 M.</p>
// <p style="text-align: justify;"><strong>II. PHẦN TỰ LUẬN (7 điểm).</strong></p>
// <p style="text-align: justify;"><strong>Câu 1</strong>. (3 điểm)</p>
// <p style="text-align: justify;">a) Viết các phương trình phản ứng điều chế (trực tiếp hoặc gián tiếp) các kim loại sau từ các nguyên liêu tương ứng: \(BaC{O_3},Fe{\left( {OH} \right)_3},AgN{O_3}.\) Mỗi kim loại sử dụng một phương pháp riêng.</p>
// <p style="text-align: justify;">b) Nếu phương pháp hóa học tách riêng các kim loại từ hỗn hợp: Au, Cu, Fe.</p>
// <p style="text-align: justify;"><strong>Câu 2</strong>. (1 điểm). Viết các phương trình phản ứng sau:</p>
// <p style="text-align: justify;">\(\begin{array}{*{20}{l}}{a){\rm{ }}Fe + C{l_2}}\\{b)Zn + CuS{O_4}}\\{c)Al + F{e_3}{O_4}}\\{d)Na + {H_2}O}\end{array}\)</p>
// <p style="text-align: justify;"><strong>Câu 3</strong>. (3 điểm). Hỗn hợp A gồm 3 kim loại vụn nguyên chất Cu, Mg và Ba có khối lượng 10 gam.</p>
// <p style="text-align: justify;">+ Cho A tác dụng với dung dịch HCl dư, sau đó lọc lấy phần không tan riêng ra, rửa sạch đem nung trong không khí cho đến khi phản ứng hoàn toàn, sản phẩm thu được có khối lượng 8 gam.</p>
// <p style="text-align: justify;">+ Cho thêm để NaOH dư vào phần nước lọc, lấy kết tủa riêng ra, rửa sạch đem nung ở nhiệt độ cao đến khi khối lượng không đổi, sản phẩm thu được có khối lượng 4 ga,.</p>
// <p style="text-align: justify;">Tính khối lượng của từng kim loại trong hỗn hợp A.</p>
// <p style="text-align: justify;">&nbsp;</p>
// <p><strong class="content_detail">Lời giải chi tiết</strong></p>
// <p style="text-align: justify;"><strong>I. PHẦN TRẮC NGHIỆM (3 điểm)</strong></p>
// <p style="text-align: justify;"><strong>Câu 1.</strong> Chọn A.</p>
// <p style="text-align: justify;"><strong>Câu 2</strong>. Chọn C.</p>
// <p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \({H_2}\) có thể khử được các kim loại trừ \(Zn \to Cu.\)</p>
// <p style="text-align: justify;"><strong>Câu 3</strong>. Chọn A.</p>
// <p style="text-align: justify;">Vì Sn yếu hơn sắt, không bảo vệ được sắt.</p>
// <p style="text-align: justify;">C, D đúng vì đây là phương pháp cách li kim loại với môi trường.</p>
// <p style="text-align: justify;">B đúng: Phương pháp kết hợp: Cách li và dùng kim loại mạnh chịu ăn mòn thay.</p>
// <p style="text-align: justify;"><strong>Câu 4.</strong> Chọn C.</p>
// <p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \(\begin{array}{l}F{e^{2 + }} + A{g^ + } \to Ag + F{e^{3 + }}\\C{l^ - } + A{g^ + } \to AgCl\end{array}\)</p>
// <p style="text-align: justify;"><strong>Câu 5</strong>. Chọn D.</p>
// <p style="text-align: justify;">\({t_{Ag}} = \dfrac{{{n_{Ag}}.1.F}}{I} = \dfrac{{0,04.96500}}{{9,65}} = 400s &lt; 10\) phút</p>
// <p style="text-align: justify;">\( \to \) thời gian còn lại: 200s. Nếu \(Cu{(N{O_3})_2}\) dư</p>
// <p style="text-align: justify;">\(\begin{array}{l}{n_{Cu}} = \dfrac{{I.t}}{{2F}} = \dfrac{{9,65.200}}{{2.96500}} = 0,01mol &lt; 0,03\\{n_A} = 0,04.108 + 0,01.64 = 4,96gam.\end{array}\)</p>
// <p style="text-align: justify;"><strong>Câu 6</strong>. Chọn C.</p>
// <p style="text-align: justify;">1 mol Fe tan tạo ra có 1 mol Cu bám vào \( \to \) m<sub>giảm </sub>=64 – 56 = 8 gam.</p>
// <p style="text-align: justify;">Mà m giảm 1,6 gam \( \to \) n<sub>Fe phản ứng </sub>= \({n_{CuS{O_4}}} = 0,2mol.\)</p>
// <p style="text-align: justify;"><strong>II. PHẦN TỰ LUẬN (7 điểm)</strong></p>
// <p style="text-align: justify;"><strong>Câu 1</strong>. (3 điểm)</p>
// <p style="text-align: justify;">&nbsp;<img style="width: 100%; max-width: 400px;" src="https://img./picture/2018/1109/45p-de-1-chuong-5-c1-tl_1.jpg" alt=""></p>
// <p style="text-align: justify;">b) Cho hỗn hợp vào dung dịch HCl dư thu được dung dịch \(FeC{l_2}\) và hỗn hợp Au, Cu. Cho hỗn hợp vào dung dịch \(HN{O_3}\) loãng thu được dung dịch \(Cu{(N{O_3})_2}\) và còn lại Au. Điện phân các dung dịch để được các kim loai tương ứng.</p>
// <p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<img style="width: 100%; max-width: 300px;" src="https://img.loigiaihay.com/picture/2018/1109/a1_1.jpg" alt=""></p>
// <p style="text-align: justify;"><strong>Câu 2</strong>. (1 điểm)</p>
// <p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style="width: 100%; max-width: 300px;" src="https://img.loigiaihay.com/picture/2018/1109/45p-de-1-chuong-5-c2-tl-phan-giai_2.jpg" alt="">&nbsp;&nbsp;&nbsp; &nbsp;</p>
// <p style="text-align: justify;"><strong>Câu 3</strong>. (3 điểm).</p>
// <p style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<img style="width: 100%; max-width: 400px;" src="https://img.loigiaihay.com/picture/2018/1109/2345.jpg" alt=""></p>
// <p style="text-align: right;"><strong></strong></p>
// <div class="clearfix"></div>`

multipleChoise = `<h2 class="s14 lineheight"></h2>
<p>Trong phân tử đisaccarit, số thứ tự C ở mỗi gốc monosaccarit<strong></strong></p>
<p>A. Được ghi theo chiều kim đồng hồ.</p>
<p>B. Được bắt đầu từ nhóm \(C{H_2}OH\)</p>
<p>C. Được bắt đầu từ C liên kết với cầu O nối liền 2 gốc monosaccarit.</p>
<p>D. Được ghi như ở mỗi monosaccarit hợp thành.</p>
<p><strong>Giả</strong>i:</p>
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
<p style="text-align: justify;"><strong>Câu 1:</strong> Cho hình nón có tỉ lệ giữa bán kính đáy và đường sinh bằng&nbsp;\(\dfrac{1}{3}\). Hình cầu nội tiếp hình nón này có thể tích bằng V. Thể tích hình nón bằng.</p>
<p style="text-align: justify;">A. 2V&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; B. 4V&nbsp;</p>
<p style="text-align: justify;">C. 5V&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; D. 3V</p>
<p style="text-align: justify;"><strong>Câu 2:</strong> Cho hình lập phương có cạnh bằng a và một hình trụ có hai đáy là hai hình tròn nội tiếp hai mặt đối diện của hình lập phương. gọi&nbsp;S<sub>1</sub>là diện tích 6 mặt của hình lập phương,&nbsp;S<sub>2</sub><sub>&nbsp;</sub>là diện tích xung quanh của hình trụ. Hãy tính tỷ số&nbsp;\(\dfrac{{{S_1}}}{{{S_2}}}\)&nbsp;và chọn đáp án&nbsp;<strong>đúng</strong>:&nbsp;</p>
<p style="text-align: justify;">\(A.\,\,\dfrac{{{S_1}}}{{{S_2}}} = \dfrac{1}{2}\)&nbsp; &nbsp; &nbsp; &nbsp; \(B.\,\,\dfrac{{{S_1}}}{{{S_2}}} = \dfrac{\pi }{6}\)</p>
<p style="text-align: justify;">\(C.\,\,\dfrac{{{S_1}}}{{{S_2}}} = \pi \)&nbsp; &nbsp; &nbsp; &nbsp;\(D.\,\,\dfrac{{{S_1}}}{{{S_2}}} = \dfrac{\pi }{2}\)</p>
<p style="text-align: justify;"><strong>Câu 3:</strong> Cho hình lăng trụ tam giác đều ABC.A'B'C' có tất cả các cạnh đều bằng a. Diện tích của mặt cầu ngoại tiếp hình lăng trụ tính theo a bằng:</p>
<p style="text-align: justify;">\\(A.\,\,\dfrac{{7\pi {a^2}}}{3}\\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \\(B.\,\,\dfrac{{2\pi {a^2}}}{3}\\)</p>
<p style="text-align: justify;">\\(C.\,\,\dfrac{{8\pi {a^2}}}{3}\\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \\(D.\,\,\dfrac{{5\pi {a^2}}}{3}\\)</p>
<p style="text-align: justify;"><strong>Câu 4:</strong> Một hình trụ có bán kính đáy&nbsp;r = 5cm và khoảng cách giữa hai đáy bằng&nbsp;7cm. Khi đó thể tích của khối trụ được tạo nên là:</p>
<p style="text-align: justify;">A. 459,77 cm<sup>3</sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B. 549,77 cm3&nbsp;&nbsp;</p>
<p style="text-align: justify;">C. 594,77 cm<sup>3&nbsp; </sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D. 281,1 cm<sup>3</sup></p>
<p style="text-align: justify;"><strong>Câu 5:</strong> Trong các khẳng định sau, hãy lựa chọn khẳng định&nbsp;<strong>sai</strong>:</p>
<p style="text-align: justify;">A. Có một mặt cầu đi qua các đỉnh của một hình tứ diện bất kỳ</p>
<p style="text-align: justify;">B. Có một mặt cầu đi qua các đỉnh của một hình chóp đều.</p>
<p style="text-align: justify;">C. Có một mặt cầu đi qua các đỉnh của một hình lăng trụ có đáy là một tứ giác lồi</p>
<p style="text-align: justify;">D. Có một mặt cầu đi qua các đỉnh của một hình hộp chữ nhật</p>
<p style="text-align: justify;"><strong>Câu 6:</strong> Trong một chiếc hộp hình trụ, người ta bỏ vào đấy ba quả tennis, biết rằng đáy của hình trụ bằng hình tròn lớn trên quả banh và chiều cao của hình trụ bằng ba lần đường kính quả banh. gọi&nbsp;S<sub>1</sub>&nbsp;là tổng diện tích của ba quả banh,&nbsp;S<sub>2</sub>&nbsp;là diện tích xung quanh hình trụ. Tỷ số diện tích \(\dfrac{{{S_1}}}{{{S_2}}}\)&nbsp;là:</p>
<p style="text-align: justify;">A. 5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B. 1</p>
<p style="text-align: justify;">C. 4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D. 2</p>
<p style="text-align: justify;"><strong>Câu 7:</strong> Một hình trụ có bán kính đáy&nbsp;r = 5 cm và khoảng cách giữa hai đáy bằng&nbsp;7cm. Khi đó diện tích xung quanh của hình trụ là:</p>
<p style="text-align: justify;">A. 219,91 cm<sup>2</sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B. 921,91 cm<sup>2</sup></p>
<p style="text-align: justify;">C. 19,91 cm<sup>2</sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D. 291,91 cm<sup>2</sup></p>
<p style="text-align: justify;"><strong>Câu 8:</strong> Cho hình lập phương ABCD. A'B'C'D'. Gọi (H) là hình cầu nội tiếp hình lập phương đó. Khi đó&nbsp;\(\dfrac{{{V_{(H)}}}}{{{V_{ABCD.A'B'C'D'}}}}\) bằng:</p>
<p style="text-align: justify;">\(A.\,\,\dfrac{\pi }{{\sqrt 3 }}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\(B.\,\,\dfrac{\pi }{6}\)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;">\(C.\,\,\dfrac{\pi }{3}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \(D.\,\,\dfrac{\pi }{4}\)</p>
<p style="text-align: justify;"><strong>Câu 9:</strong> Cho hình lập phương ABCD.A'B'C'D'. Gọi (H) là hình nón tròn xoay nội tiếp hình lập phương đó. Khi đó \(\dfrac{{{V_{(H)}}}}{{{V_{ABCD.A'B'C'D'}}}}\) bằng:</p>
<p style="text-align: justify;">\(A.\,\,\dfrac{\pi }{6}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \(B.\,\,\dfrac{\pi }{{12}}\)&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;">\(C.\,\,\dfrac{1}{3}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \(D.\,\,\dfrac{\pi }{8}\)</p>
<p style="text-align: justify;"><strong>Câu 10:</strong> <br> Cho tứ diện&nbsp;ABCD&nbsp;có&nbsp;AD⊥(ABC) và&nbsp;BD⊥BC. Khi quay tứ điện đó xung quanh trục là cạnh&nbsp;AB, có bao nhiêu hình nón được tạo thành.</p>
<p style="text-align: justify;">A. 2&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;B. 1&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p style="text-align: justify;">C. 4&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;D. 3</p>
<p><strong class="content_detail">Lời giải chi tiết</strong></p>
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
 <tbody>
  <tr>
   <td style="text-align: center;" valign="top" width="106"> <p>Câu</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>1</strong></p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>2</strong></p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>3</strong></p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>4</strong></p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>5</strong></p> </td>
  </tr>
  <tr>
   <td style="text-align: center;" valign="top" width="106"> <p>Đáp án</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>A</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>B</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>A</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>B</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>C</p> </td>
  </tr>
  <tr>
   <td style="text-align: center;" valign="top" width="106"> <p>Câu</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>6</strong></p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>7</strong></p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>8</strong></p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>9</strong></p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p><strong>10</strong></p> </td>
  </tr>
  <tr>
   <td style="text-align: center;" valign="top" width="106"> <p>Đáp án</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>B</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>A</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>B</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>B</p> </td>
   <td style="text-align: center;" valign="top" width="106"> <p>A</p> </td>
  </tr>
 </tbody>
</table>
<p><strong>Câu 1: </strong></p>
<p>&nbsp;<img src="https://img./picture/2018/1117/2.png" alt="" width="231" height="280"></p>
<p>Gọi r và R lần lượt là bán kính của đường tròn đáy của hình nón và bán kính của mặt cầu nội tiếp hình nón.</p>
<p>Áp dụng định lí (P) vào tam giác vuông AIC ta có:</p>
<p>\(AI = \sqrt {A{C^2} - I{C^2}}&nbsp; = \sqrt {{l^2} - {r^2}} \)\(\, = \sqrt {{{\left( {3r} \right)}^2} - {r^2}}&nbsp; = 2\sqrt 2 r\)</p>
<p>\(OA = AI - OI = 2\sqrt 2 r - R\)</p>
<p>\(\Delta OAH\) đồng dạng \(\Delta CAI\) (g.g)</p>
<p>\(\begin{array}{l} \Rightarrow \dfrac{{CI}}{{OH}} = \dfrac{{AC}}{{AO}} \Rightarrow \dfrac{r}{R} = \dfrac{{3r}}{{2\sqrt 2 r - R}}\\ \Rightarrow 3R = 2\sqrt 2 r - R \Rightarrow 4R = 2\sqrt 2 r\\ \Rightarrow r = \sqrt 2 R\end{array}\)</p>
<p>Thể tích của mặt cầu nội tiếp hình nón là: \(V = \dfrac{4}{3}\pi {R^3}\)</p>
<p>Thể tích của hình nón là:</p>
<p class="MTDisplayEquation">\(V' = \dfrac{1}{3}\pi {r^2}.2\sqrt 2 r = \dfrac{1}{3}\pi .2\sqrt 2 .{\left( {\sqrt 2 R} \right)^3} \)\(\,= \dfrac{8}{3}\pi {R^3} = 2V\)<strong> </strong></p>
<p><strong>Chọn A</strong></p>
<p><strong>Câu 2:</strong></p>
<p>Hình trụ có bán kính đáy \(\dfrac{a}{2}\) , chiều cao h = a</p>
<p>Suy ra: \({S_1} = 6{a^2};{S_2} = \pi {a^2}\)</p>
<p>Vậy \(\dfrac{{{S_2}}}{{{S_1}}} = \dfrac{\pi }{6}.\)&nbsp;</p>
<p><strong>Chọn B</strong></p>
<p><strong>Câu 3: </strong></p>
<p>&nbsp;<img src="https://img.loigiaihay.com/picture/2018/1117/3.png" alt="" width="299" height="335"></p>
<p>Gọi O và O’ lần lượt là tâm mặt cầu ngoại tiếp tam giác ABC và A’B’C’</p>
<p>Khi đó tâm mặt cầu (S) ngoại tiếp lăng trụ ABCA’B’C’ chính là trung điểm I của OO’</p>
<p>Mặt cầu này có bán kính là: \(R = IA = \sqrt {A{O^2} + O{I^2}} \)\(\, = \sqrt {{{\left( {\dfrac{{a\sqrt 3 }}{3}} \right)}^2} + {{\left( {\dfrac{a}{2}} \right)}^2}}&nbsp; \)\(\,= \dfrac{{a\sqrt {21} }}{6}\)</p>
<p>Diện tích mặt cầu là: \(S = 4\pi {R^2} = 4\pi {\left( {\dfrac{{a\sqrt {21} }}{6}} \right)^2} = \dfrac{{7\pi {a^2}}}{3}\)</p>
<p><strong>Chọn A</strong></p>
<p><strong>Câu 4:</strong></p>
<p>&nbsp;<img src="https://img.loigiaihay.com/picture/2018/1117/4.png" alt="" width="195" height="249"></p>
<p>Thể tích của hình trụ là:</p>
<p>\(V = h.B = 7.\pi {5^2} = 549,77\,c{m^3}\)</p>
<p><strong>Chọn B</strong></p>
<p><strong>Câu 5: Chọn C</strong></p>
<p><strong>Câu 6:</strong> Gọi R là bán kính 1 quả banh</p>
<p>\( \Rightarrow \) Tổng diên tích 3 quả banh là: \({S_1} = 3.4\pi {R^2} = 12\pi {R^2}\)</p>
<p>Chiếc hộp có bán kính đáy cũng bằng R và chiều cao bằng h = 6R</p>
<p>\( \Rightarrow \) Diện tích xung quanh hình trụ là: \({S_2} = 2\pi Rh = 12\pi {R^2}\)</p>
<p>\( \Rightarrow \dfrac{{{S_1}}}{{{S_2}}} = 1\)&nbsp;</p>
<p><strong>Chọn B.</strong></p>
<p><strong>Câu 7:</strong></p>
<p>&nbsp;<img src="https://img.loigiaihay.com/picture/2018/1117/5.png" alt="" width="208" height="259"></p>
<p>Diện tích xung quanh của hình trụ là:</p>
<p>\({S_{xq}} = 2\pi r.h = 2\pi .5.7 = 219,91\,c{m^2}\)</p>
<p><strong>Chọn A.</strong></p>
<p><strong>Câu 8: </strong></p>
<p>&nbsp;<img src="https://img.loigiaihay.com/picture/2018/1117/6.png" alt="" width="272" height="244"></p>
<p>Mặt cầu nội tiếp hình lập phương cạnh a có bán kính bằng \(\dfrac{a}{2}\)</p>
<p>Thể tích mặt cầu nội tiếp hình lập phương là:</p>
<p>\({V_{(H)}} = \dfrac{4}{3}\pi {\left( {\dfrac{a}{2}} \right)^3} = \dfrac{{\pi {a^3}}}{6}\)</p>
<p>Tỉ số: \(\dfrac{{{V_{(H)}}}}{{{V_{ABCD.A'B'C'D'}}}} = \dfrac{{\dfrac{{\pi {a^3}}}{6}}}{{{a^3}}} = \dfrac{\pi }{6}\)</p>
<p><strong>Chọn B</strong></p>
<p><strong>Câu 9: </strong></p>
<p>&nbsp;<img src="https://img.loigiaihay.com/picture/2018/1117/7.png" alt="" width="276" height="241"></p>
<p>Khối nón có đỉnh là tâm hình vuông ABCD và đáy là đường tròn nội tiếp hình vuông A’B’C’D’ có bán kính đáy \(R = \dfrac{a}{2}\) , chiều cao \(h = a\)</p>
<p>Vậy thể tích khối nón là: \(V = \dfrac{1}{3}\pi {r^2}h = \dfrac{1}{3}\pi {\left( {\dfrac{a}{2}} \right)^2}a = \dfrac{1}{{12}}\pi {a^3}.\)</p>
<p><strong>Chọn B</strong></p>
<p><strong>Bài 10:</strong></p>
<p>&nbsp;<img src="https://img.loigiaihay.com/picture/2018/1117/8.png" alt="" width="256" height="239"></p>
<p>Tứ diện ABCD có \(\widehat {BAD} = {90^o}\) nên \(\widehat {ABD} = \alpha \) là một góc nhọn. Khi quay các cạnh của tứ diện đó xung quanh cạnh AB thì cạnh BD tạo thành một hình nón tròn xoay đỉnh B có trục là AB, cạnh AD vuông góc với AB tạo thành đáy của hình nón đó.</p>
<p>Mặt khác theo giả thiết ta có &nbsp;\(BD \bot BC\) nên\(AB \bot BC\) . Ta có &nbsp;\(\widehat {BAC} = \beta \) là một góc nhọn. Do đó khi quay các cạnh của tứ diện xung quanh cạnh AB thì cạnh AC tạo thành một hình nón tròn xoay đỉnh A có trục là AB, còn cạnh BC tạo thành đáy của hình nón.</p>
<p>Như vậy khi quay tất cả các cạnh của tứ diện xung quanh trục AB thì các cạnh BD và AC tạo thành hai hình nón.</p>
<p><strong>Chọn A.</strong></p>
<p style="text-align: right;"><strong></strong></p>
<div class="clearfix"></div>`

testU2 = `<h2 class="s14 lineheight"></h2>
<p><strong>Bài 1. </strong>Trong các mệnh đề sau, mệnh đều nào đúng?</p>
<p>A. Mọi hình hộp có mặt cầu ngoại tiếp.</p>
<p>B. Mọi hình hộp đứng có mặt cầu ngoại tiếp.</p>
<p>C. Mọi hình hộp có mặt bên vuông góc với đáy đều có mặt cầu ngoại tiếp.</p>
<p>D. Mọi hình hộp chữ nhật đều có mặt cầu ngoại tiếp.</p>
<p><strong>Giải</strong></p>
<p><strong>&nbsp;</strong>Hình bình hành nội tiếp đường trong phải là hình chữ nhật.</p>
<p>Chọn (D).</p>
<p><strong>Bài &nbsp;2. </strong>Trong số các hình hộp nội tiếp một mặt cầu bán kính R thì</p>
<p>(A) Hình hộp có đáy là hình vuông có thể tích lớn nhất.</p>
<p>(B) Hình lập phương có thể tích lớn nhất.</p>
<p>(C) Hình hộp có kích thước tạo thành cấp số cộng công sai khác 0 có thể tích lớn nhất.</p>
<p>(D) Hình hộp có kích thước tạo thành cấp số nhân công bội khác 1 có thể tích lớn nhất.</p>
<p><strong>Giải</strong></p>
<p>Hình hộp nội tiếp một mặt cầu là hình hộp chữ nhật có đường chéo \(d = 2R\). Gọi \(x, y, z\) là các kích thước của hình hộp chữ nhật.</p>
<p>Ta có \({x^2} + {y^2} + {z^2} = {d^2} = 4{R^2}\)</p>
<p>Áp dụng BĐT Cô – si cho 3 số dương ta có:</p>
<p>\(4{R^2} = {x^2} + {y^2} + {z^2} \ge 3\root 3 \of {{x^2}{y^2}{z^2}}&nbsp; = 3\root 3 \of {{V^2}}&nbsp; \Rightarrow {V^2} \le {\left( {{{4{R^2}} \over 3}} \right)^3}\)</p>
<p>\(V\) đạt giá trị lớn nhất khi và chỉ khi \(x = y = z\).</p>
<p>Chọn (B).</p>
<p><strong>Bài 3.</strong> Một hình cầu có thể tích \({4 \over 3}\pi \)&nbsp;ngoại tiếp một hình lập phương. Trong các số sau đây, số nào là thể tích khối lập phương?</p>
<p>(A) \({{8\sqrt 3 } \over 9}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (B) \({8 \over 3}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(C) 1&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(D) \(2\sqrt 3 \)</p>
<p><strong>Giải</strong></p>
<p>Giả sử bán kính mặt cầu là \(R\) và cạnh hình lập phương là a thì thể tích khối cầu là \(V = {4 \over 3}\pi {R^3} \Rightarrow R = 1\) và \(4{R^2} = 3{a^2} = 4 \Rightarrow a = {2 \over {\sqrt 3 }}\)</p>
<p>Thể tích khối lập phương là \(V = {a^3} = {\left( {{2 \over {\sqrt 3 }}} \right)^3} = {8 \over {3\sqrt 3 }} = {{8\sqrt 3 } \over 9}\).</p>
<p>Chọn (A).</p>
<p><strong>Bài 4. </strong>Trong các mệnh đề sau, mệnh đề nào đúng?</p>
<p>(A) Hình chóp có đáy là tứ giác thì có mặt cầu ngoại tiếp.</p>
<p>(B) Hình chóp có đáy là hình thang vuông thì có mặt cầu ngoại tiếp.</p>
<p>(C) Hình chóp có đáy là hình bình hành thì có mặt cầu ngoại tiếp.</p>
<p>(D) Hình chóp có đáy là hình thang cân thì có mặt cầu ngoại tiếp.</p>
<p><strong>Giải</strong></p>
<p>Hình chóp có đáy là tứ giác có mặt cầu ngoại tiếp thì đáy phải là tứ giác nội tiếp đường tròn.</p>
<p>Chọn (D).</p>
<p><strong>Bài 5. </strong>Cho tứ diện đều \(ABCD\) có cạnh bằng \(a\). Tập hợp các điểm \(M\) sao cho \(M{A^2} + M{B^2} + M{C^2} + M{D^2} = 2{a^2}\)</p>
<p>(A) Mặt cầu có tâm là trọng tâm của tam giác \(ABC\) và bán kính bằng \({{a\sqrt 2 } \over 2}\).</p>
<p>(B) Mặt cầu có tâm là trọng tâm của tứ diện và bán kính bằng \({{a\sqrt 2 } \over 4}\).</p>
<p>(C) Mặt cầu có tâm là trọng tâm của tứ diện và bán kính bằng \({{a\sqrt 2 } \over 2}\).<br>(D) Mặt cầu có tâm là trọng tâm của tam giác \(ABC\) và bán kính bằng \({{a\sqrt 2 } \over 4}\).</p>
<p><strong>Giải</strong></p>
<p><strong><img src="https://img./picture/2017/1108/toan-8_4.jpg" alt="" width="217" height="233"></strong></p>
<p>Gọi \(G\) là trọng tâm tứ diện \(ABCD, AA’\) là đường cao xuất phát từ \(A\) của tứ diện \(ABCD\). Ta có:</p>
<p>\(\eqalign{<br> &amp; AA' = \sqrt {A{B^2} - BA{'^2}} = \sqrt {{a^2} - {{{a^2}} \over 3}} = {{a\sqrt 6 } \over 3} \cr <br> &amp; \Rightarrow GA = GB = GC = GD = {3 \over 4}AA' = {{a\sqrt 6 } \over 4} \cr} \)</p>
<p>Ta có:&nbsp; &nbsp;\(M{A^2} + M{B^2} + M{C^2} + M{D^2} = 2{a^2}\)</p>
<p>\(\eqalign{<br> &amp; \Leftrightarrow {\left( {\overrightarrow {GA} - \overrightarrow {GM} } \right)^2} + {\left( {\overrightarrow {GB} - \overrightarrow {GM} } \right)^2} + {\left( {\overrightarrow {GC} - \overrightarrow {GM} } \right)^2} + {\left( {\overrightarrow {GD} - \overrightarrow {GM} } \right)^2} = 2{a^2} \cr <br> &amp; \Leftrightarrow 4G{A^2} + 4G{M^2} - 2\overrightarrow {GM} \left( {\overrightarrow {GA} + \overrightarrow {GB} + \overrightarrow {GC} + \overrightarrow {GD} } \right) = 2{a^2} \cr <br> &amp; \Leftrightarrow M{G^2} = {{{a^2}} \over 2} - G{A^2} = {{{a^2}} \over 8} \Rightarrow MG = {{a\sqrt 2 } \over 4} \cr} \)</p>
<p>Tập hợp các điểm \(M\) là mặt cầu tâm \(G\) bán kính \({{a\sqrt 2 } \over 4}\) . Chọn (B).</p>
<p><strong>Bài 6.</strong> Bán kính mặt cầu tiếp xúc với các cạnh của tứ diện đều \(ABCD\) cạnh bằng \(a\) là:</p>
<p>(A) \({{a\sqrt 2 } \over 2}\)&nbsp; &nbsp; &nbsp; &nbsp;(B) \({{a\sqrt 2 } \over 4}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(C) \(a\sqrt 2 \)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) \(2a\sqrt 2 \)</p>
<p><strong>Giải</strong></p>
<p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_5.jpg" alt="" width="236" height="261"></p>
<p>Gọi \(M, N\) lần lượt là trung điểm hai cạnh \(AB\) và \(CD\) của tứ diện đều \(ABCD\).</p>
<p>\(I\) là trung điểm của \(MN\) thì \(I\) cách đều \(6\) cạnh tứ diện nên \(I\) là tâm mặt cầu tiếp xúc với các cạnh của tứ diện đều.</p>
<p>Bán kính mặt cầu: \(R = {{MN} \over 2}\)</p>
<p>Ta có: \(M{N^2} = A{N^2} - M{A^2} = A{D^2} - N{D^2} - M{A^2} = {a^2} - {{{a^2}} \over 4} - {{{a^2}} \over 4} = {{{a^2}} \over 2} \Rightarrow MN = {{a\sqrt 2 } \over 2} \Rightarrow R = {{a\sqrt 2 } \over 4}\).</p>
<p>Chọn (B).</p>
<p><strong>Bài 7. </strong>Trong số các mệnh đề sau, mệnh đề nào đúng?</p>
<p>(A) Có duy nhất một măt cầu đi qua hai đường tròn nằm trong hai mặt phẳng cắt nhau.</p>
<p>(B) Có duy nhất một măt cầu đi qua hai đường tròn nằm trong hai mặt phẳng song song.</p>
<p>(C) Có duy nhất một măt cầu đi qua hai đường tròn cắt nhau.</p>
<p>(D) Có duy nhất một măt cầu đi qua hai đường tròn cắt nhau tại hai điểm phân biệt và không cùng nằm trong một mặt phẳng.</p>
<p><strong>Giải&nbsp;</strong></p>
<p>Chon D.</p>
<p><strong>Bài 8. </strong>Cho hai điểm \(A, B\) phân biệt. Tập hợp các điểm \(M\) sao cho diện tích tam giác \(MAB\) không đổi là:</p>
<p>(A) Hai đường thẳng song song;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) Một mặt cầu;</p>
<p>(C) Một mặt trụ;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) Một mặt nón.</p>
<p><strong>Giải</strong></p>
<p>Tập hợp các điểm \(M\) sao cho khoảng cách từ \(M\) đến \(AB\) không đổi.</p>
<p>Chọn (C).</p>
<p><strong>Bài 9. </strong>Cho hai điểm phân biệt \(A, B\) cố định và phân biệt. Một đường thẳng \(l\) thay đổi luôn đi qua \(A\)&nbsp;</p>
<p>và cách \(B\) một khoảng \({{AB} \over 2}\). Gọi \(H\) là hình chiếu của \(B\) trên \(l\). Tập hợp điểm \(H\) là:</p>
<p>(A) Một mặt phẳng;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (B) Một mặt trụ;</p>
<p>(C) Một mặt nón;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) Một đường tròn.</p>
<p><strong>Giải</strong></p>
<p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_6.jpg" alt="" width="327" height="207"></p>
<p>\(\sin \widehat {HAB} = {{BH} \over {AB}} = {1 \over 2} \Rightarrow \widehat {HAB} = {30^0}\)</p>
<p>Tập hợp \(l\) là mặt nón có trục AB, đường sinh \(l\), góc ở đỉnh là \({60^0}\). Gọi \(I\) là hình chiếu của H lên AB.</p>
<p>Ta có: \(BI = BH.cos{60^0} = {{AB} \over 4} \Rightarrow I\) cố định.</p>
<p>\( \Rightarrow H\) thuộc mặt phẳng qua \(I\) vuông góc với \(AB\). Vậy tâp hợp \(H\) là đường tròn.</p>
<p>Chọn (D).</p>
<p><strong>Bài 10. </strong>Với điểm \(O\) cố định thuộc mặt phẳng \((P)\) cho trước, xét đường thẳng \(l\)<em>&nbsp;</em>thay đổi đi qua \(O\) và tạo với \((P)\) góc \(30^0\)&nbsp;Tập hợp các đường thẳng \(l\)<em>&nbsp;</em>trong không gian là:</p>
<p>(A) Một mặt phẳng;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) Hai đường thẳng;</p>
<p>(C) Một mặt trụ;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(D) Một mặt nón.</p>
<p><strong>Giải</strong></p>
<p>Chọn D.</p>
<p><strong>Bài 11.</strong> Một hình trụ có bán kính đáy bằng \(a\), đường cao \({\rm{OO}}' = a\sqrt 3 \). Một đoạn thẳng \(AB\) thay đổi sao cho góc giữa \(AB\) và trục hình trụ bằng \(30^0\). \(A, B\) thuộc hai đường tròn đáy của hình trụ. Tập hợp các trung điểm \(I\) của \(AB\) là:</p>
<p>(A) Một mặt trụ;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (B) Một mặt cầu;</p>
<p>(C) Một đường tròn;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) Một mặt phẳng.</p>
<p><strong>Giải</strong></p>
<p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_7.jpg" alt="" width="235" height="275"></strong></p>
<p>Gọi \(A’\) là hình chiếu của \(A\) xuống mặt phẳng đáy thì \(AA’ = OO’\). Gọi \(I, M, N\) lần lượt là trung điểm của \(OO’, AB\) và \(AA’\).</p>
<p>Ta có: \(IA = IB\) và \(IM \bot AB\).</p>
<p>Mp(IMN) qua \(I\) và song song với hai mặt phẳng đáy.</p>
<p>Ta có: \(MN = AN.\tan {30^0} = {{a\sqrt 3 } \over 2}.{1 \over {\sqrt 3 }} = {a \over 2}\)</p>
<p>\( \Rightarrow MI = \sqrt {N{I^2} - M{N^2}}&nbsp; = \sqrt {{a^2} - {{{a^2}} \over 4}}&nbsp; = {{a\sqrt 3 } \over 2}\)</p>
<p>Vậy tập hợp trung điểm \(M\) của \(AB\) là đường tròn tâm \(I\) bán kính \({{a\sqrt 3 } \over 2}\) nằm trong mp\((IMN)\).<br>Chọn (C).</p>
<p><strong>Bài 12.</strong> Trong mặt phẳng (P) cho góc xOy. Một mặt phẳng (Q) thay đổi và vuông góc với đường phân giác trong của góc xOy, cắt Ox, Oy tại A, B. Trong (Q) lấy điểm M sao cho \(\widehat {AMB} = {90^0}\). Khi ấy, tập hợp điểm M là:</p>
<p>(A) Một đường tròn;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (B) Một mặt trụ;</p>
<p>(C) Một mặt nón;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(D) Một mặt cầu.</p>
<p><strong>Giải</strong></p>
<p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-81_1.jpg" alt="" width="300" height="317"></strong></p>
<p>Tập hợp M là một mặt nón đỉnh O.</p>
<p>Chọn (C).</p>
<p><strong>Bài 13.</strong> Cho hình lập phương ABCD.A’B’C’D’ có cạnh a. Diện tích xung quanh của hình nón tròn xoay sinh bởi đường gấp khúc AC’A’ khi quay quanh AA’ bằng:</p>
<p>(A) \(\pi {a^2}\sqrt 6 \)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) \(\pi {a^2}\sqrt 3 \)&nbsp;</p>
<p>(C) \(\pi {a^2}\sqrt 2 \)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) \(\pi {a^2}\sqrt 5 \)</p>
<p><strong>Giải</strong></p>
<p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_8.jpg" alt="" width="245" height="251"></p>
<p>Hình nón tròn xoay sinh bởi đường gấp khúc AC’A’ khi quay quanh \(AA' \) có bán kính đáy \(A'C'=a\sqrt 2\) và độ dài đường sinh \(AC' = a\sqrt 3 \) nên diện tích xung quanh của hình nón là: \({S_{xq}} = {1 \over 2}2\pi a\sqrt 2 .a\sqrt 3&nbsp; = \pi {a^2}\sqrt 6 \)</p>
<p>Chọn (A).</p>
<p><strong>Bài 14.</strong> Cho hình nón có bán kính đáy bằng a. Một dây cung thay đổi của đường tròn đáy có độ dài không đổi bằng a. Tập hợp các trung điểm của đoạn thẳng nối đỉnh hình nón với trung điểm của dây cung đó là:</p>
<p>(A) Một mặt nón cố đinh;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) Một mặt phẳng cố đinh;</p>
<p>(C) Một mặt trụ cố định;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) Một đường tròn cố đinh.</p>
<p>Giải</p>
<p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_9.jpg" alt="" width="243" height="288"></p>
<p>Gọi I là trung điểm AB ta có \(OI = \sqrt {O{B^2} - I{B^2}}&nbsp; = \sqrt {{a^2} - {{{a^2}} \over 4}}&nbsp; = {{a\sqrt 3 } \over 2}\)</p>
<p>Tập hợp I là đường tròn tâm O bán kính \({{a\sqrt 3 } \over 2}\)&nbsp;trong mặt phẳng đáy hình nón. Gọi O’ là trung điểm SO và M là trung điểm của SI thì \(MO' = {1 \over 2}OI = {{a\sqrt 3 } \over 4}\)</p>
<p>Tập hợp các điểm M là đường tròn tâm O’ bán kính \({{a\sqrt 3 } \over 4}\) nằm trong mặt phẳng qua O’ và song song với mặt phẳng đáy.</p>
<p>Chọn (D).</p>
<p><strong>Bài 15.</strong> Cho hình trụ có bán kính đáy bằng R, chiều cao OO’. Cắt hình trụ đó bằng \(mp\left( \alpha&nbsp; \right)\)&nbsp;vuông góc với đáy và cách điểm O một khoảng bằng h cho trước (h&lt;R). Khi ấy, \(mp\left( \alpha&nbsp; \right)\)&nbsp;có tính chất:</p>
<p>(A) Luôn tiếp xúc với một mặt trụ cố định;</p>
<p>(B) Luôn cách một mặt phẳng cho trước qua trục hình trụ một khoáng h ;</p>
<p>(C) Cắt hình trụ theo thiết diện là hình vuông ;</p>
<p>(D) Cả ba tính chất trên đều sai.</p>
<p><strong>Giải</strong></p>
<p>\(mp\left( \alpha&nbsp; \right)\)&nbsp;luôn tiếp xúc với một mặt trụ cố định đường cao OO’ bán kính đáy h.</p>
<p>Chọn (A).</p>
<p><strong>Bài 16.</strong> Một khối trụ có bán kính đáy \(a\sqrt 3 \), chiều cao \(2a\sqrt 3 \). Thể tích của khối cầu ngoại tiếp khối trụ là:</p>
<p>(A) \(8\sqrt 6 \pi {a^3}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) \(6\sqrt 6 \pi {a^3}\)&nbsp;</p>
<p>(C) \({4 \over 3}\sqrt 6 \pi {a^3}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(D) \(4\sqrt 3 \pi {a^3}\)</p>
<p><strong>Giải</strong></p>
<p>Đường kính khối cầu ngoại tiếp khối trụ là \(d = 2R = \sqrt {{{\left( {2a\sqrt 3 } \right)}^2} + {{\left( {2a\sqrt 3 } \right)}^2}}&nbsp; = 2a\sqrt 6&nbsp; \Rightarrow R = a\sqrt 6 \)<br><br>Thể tích khối cầu là \(V = {4 \over 3}\pi {\left( {a\sqrt 6 } \right)^3} = 8\pi {a^3}\sqrt 6 \).</p>
<p>Chọn (A).<br><strong>Bài 17.</strong>Cho hình nón có đường sinh bằng đường kính đáy và bằng 2. Bán kính mặt cầu ngoại tiếp hình nón đó là</p>
<p>(A) \(\sqrt 3 \)&nbsp; &nbsp; &nbsp; &nbsp;(B) \(2\sqrt 3 \)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(C) \({{\sqrt 3 } \over 2}\)&nbsp; &nbsp; &nbsp; &nbsp; (D) \({{2\sqrt 3 } \over 3}\)</p>
<p><strong>Giải</strong></p>
<p><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_10.jpg" alt="" width="237" height="258"></p>
<p>Gọi AB là đường kính của mặt cầu ngoại tiếp hình nón, I là tâm đường tròn đáy của hình nón \(AI = \sqrt {A{C^2} - C{I^2}}&nbsp; = \sqrt 3 \)</p>
<p>\(\Delta ABC\) vuông tại C nên \(A{C^2} = AI.AB \Rightarrow AB = {{A{C^2}} \over {AI}} = {4 \over {\sqrt 3 }} = {{4\sqrt 3 } \over 3}\)</p>
<p>\( \Rightarrow R = {{AB} \over 2} = {{2\sqrt 3 } \over 3}\). Chọn (D).</p>
<p><strong>Bài 18.</strong> Cho hình nón sinh bởi một tam giác đều cạnh a khi quay quanh một đường cao. Một mặt cầu có diện tích bằng diện tích toàn phần của hình nón thì có bán kính là</p>
<p>(A) \({{a\sqrt 3 } \over 4}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) \({{a\sqrt 2 } \over 4}\)&nbsp;</p>
<p>(C) \({{a\sqrt 2 } \over 2}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) \({{a\sqrt 3 } \over 2}\)</p>
<p><strong>Giải</strong></p>
<p>Diện tích toàn phần của hình nón là \({S_{tp}} = {S_{xq}} + {S_d} = \pi rl + \pi {r^2} = \pi {{{a^2}} \over 2} + \pi {{{a^2}} \over 4} = \pi {a^2}{3 \over 4}\)</p>
<p>Diện tích mặt cầu bán kính R là \(4\pi {R^2}\).</p>
<p>Suy ra \(4\pi {R^2} = \pi {a^2}{3 \over 4} \Rightarrow R = {{a\sqrt 3 } \over 4}\).</p>
<p>Chọn (A).</p>
<p><strong>Bài 19.</strong> Cho một hình nón sinh bởi một tam giác đều cạnh a khi quay quanh một đường cao. Một khối cầu có thể tích bằng thể tích của khối nón thì có bán kính bằng</p>
<p>(A) \({{a\root 3 \of {2\sqrt 3 } } \over 4}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) \({{a\root 3 \of 3 } \over 8}\)&nbsp;</p>
<p>(C) \({{a\root 3 \of {2\sqrt 3 } } \over 8}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(D) \({{a\root 3 \of {2\sqrt 3 } } \over 2}\)</p>
<p><strong>Giải</strong></p>
<p>Chiều cao của khối nón là \({{a\sqrt 3 } \over 2}\)&nbsp;và bán kính đáy bằng \({a \over 2}\) nên</p>
<p>\({V_n} = {1 \over 3}\pi {r^2}h = {1 \over 3}\pi {{{a^2}} \over 4}.{{a\sqrt 3 } \over 2} = {{\pi {a^3}\sqrt 3 } \over {24}}\)</p>
<p>Thể tích khối cầu bán kính R là \({V_c} = {4 \over 3}\pi {R^3}\).</p>
<p>Do đó \({{\pi {a^3}\sqrt 3 } \over {24}} = {4 \over 3}\pi {R^3} \Leftrightarrow {R^3} = {{{a^3}\sqrt 3 } \over {32}} \Rightarrow R = {{a\root 3 \of {\sqrt 3 } } \over {\root 3 \of {32} }} = {{a\root 3 \of {2\sqrt 3 } } \over 4}\)</p>
<p>Chọn (A).</p>
<p><strong>Bài 20.</strong> Một hình nón có đường sinh bằng a và góc ở đỉnh bằng \(90^0\). cắt hình nón bằng mặt phẳng (a) đi qua đỉnh sao cho góc giữa (a) và mặt đáy hình nón bằng \(60^0\) . Khi đó diện tích thiết diện là</p>
<p>(A) \({{\sqrt 2 } \over 3}{a^2}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) \({{\sqrt 3 } \over 2}{a^2}\)&nbsp;</p>
<p>(C) \({2 \over 3}{a^2}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) \({3 \over 2}{a^2}\)</p>
<p><strong>Giải</strong></p>
<p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_11.jpg" alt="" width="279" height="292"></strong></p>
<p>\(\eqalign{<br>&amp; OS = {1 \over 2}AB = {{a\sqrt 2 } \over 2} \cr&nbsp;<br>&amp; SI = {{SO} \over {\sin {{60}^0}}} = {{a\sqrt 2 } \over {\sqrt 3 }} \cr&nbsp;<br>&amp; OI = SO.\cot {60^0} = {{a\sqrt 2 } \over {2\sqrt 3 }} \cr&nbsp;<br>&amp; \Rightarrow IC = \sqrt {O{C^2} - I{O^2}} = \sqrt {{{{a^2}} \over 2} - {{{a^2}} \over 6}} = {a \over {\sqrt 3 }} \cr&nbsp;<br>&amp; S = {1 \over 2}SI.2IC = {{a\sqrt 2 } \over {\sqrt 3 }}.{a \over {\sqrt 3 }} = {{\sqrt 2 } \over 3}{a^2} \cr} \)</p>
<p>Chọn (A).</p>
<p><strong>Bài 21.</strong> Cho hình chóp tứ giác đều có cạnh đáy bằng a, cạnh bên tạo với mặt đáy góc \(60^0\). Diện tích toàn phần của hình nón ngoại tiếp hình chóp là</p>
<p>(A) \({{3\pi {a^2}} \over 2}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (B) \({{3\pi {a^2}} \over 4}\)&nbsp;</p>
<p>(C) \({{3\pi {a^2}} \over 6}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(D) \({{3\pi {a^2}} \over 8}\)</p>
<p><strong>Giải</strong></p>
<p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_12.jpg" alt="" width="290" height="280"></strong></p>
<p>Bán kính đường tròn đáy của hình nón ngoại tiếp hình chóp là</p>
<p>\(\eqalign{<br>&amp; R = {{a\sqrt 2 } \over 2} \cr&nbsp;<br>&amp; \cos {60^0} = {{BO} \over {SB}} \cr&nbsp;<br>&amp; \Rightarrow SB = {{BO} \over {\cos {{60}^0}}} = 2{{a\sqrt 2 } \over 2} = a\sqrt 2 \cr} \)</p>
<p>Diện tích xung quanh hình nón \({S_{xq}} = {1 \over 2}.2\pi Rl = \pi {{a\sqrt 2 } \over 2}a\sqrt 2&nbsp; = \pi {a^2}\)</p>
<p>Diện tích hình tròn đáy hình nón là \({S_d} = \pi {R^2} = \pi {{{a^2}} \over 2}\)</p>
<p>Diện tích toàn phần \({S_{tp}} = {S_{xq}} + {S_d} = \pi {a^2} + {{\pi {a^2}} \over 2} = {{3\pi {a^2}} \over 2}\)</p>
<p>Chọn (A).</p>
<p><strong>Bài 22.</strong> Cho mặt cầu bán kính R và một hình trụ có bán kính đáy R và chiều cao 2R. Tỉ số thể tích khối cầu và khối trụ là</p>
<p>(A) \({2 \over 3}\)&nbsp; &nbsp; &nbsp; &nbsp; (B) \({3 \over 2}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(C) 2&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) \({1 \over 2}\)</p>
<p><strong>Giải</strong></p>
<p>Thể tích khối cầu bán kính R là \({V_c} = {4 \over 3}\pi {R^3}\)</p>
<p>Thể tích khối trụ \({V_t} = \pi {R^2}.2R = 2\pi {R^3} \Rightarrow {{{V_c}} \over {{V_t}}} = {2 \over 3}\).</p>
<p>Chọn (A).</p>
<p><strong>Bài 23.</strong> Cho hình trụ có bán kính đáy bằng R, chiều cao cũng bằng R. Một hình vuông ABCD có hai cạnh AB và CD lần lượt là các dây cung của hai đường tròn đáy, mp(ABCD) không vuông góc với mặt phẳng đáy của hình trụ. Diện tích hình vuông đó là</p>
<p>(A) \({{5{R^2}} \over 2}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) \(5{R^2}\)</p>
<p>(C) \({{5{R^2}\sqrt 2 } \over 2}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) \(5{R^2}\sqrt 2 \)</p>
<p><strong>Giải</strong></p>
<p><strong><img src="https://img.loigiaihay.com/picture/2017/1108/toan-8_13.jpg" alt="" width="309" height="262"></strong></p>
<p>Gọi C’ là hình chiếu của C trên đáy hình trụ. Khi đó ta có \(AB \bot BC'\)&nbsp;(vì \(AB \bot BC\)).</p>
<p>Vậy \(AC’ = 2R\).</p>
<p>Ta có: \(BC{'^2} = 4{R^2} - A{B^2} = A{B^2} - {R^2} \Rightarrow A{B^2} = {5 \over 2}{R^2}.\)</p>
<p>Chọn (A).</p>
<p><strong>Bài 24.</strong>&nbsp;Một khối hộp chữ nhật nội tiếp trong một khối trụ. Ba kích thước của khối hộp chữ nhật là a, b, c.. Thể tích của khối trụ là</p>
<p>(A) \({1 \over 4}\pi \left( {{a^2} + {b^2}} \right)c\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
<p>(B) \({1 \over 4}\pi \left( {{b^2} + {c^2}} \right)a\)</p>
<p>(C) \({1 \over 4}\pi \left( {{c^2} + {a^2}} \right)b\)</p>
<p>(D) \({1 \over 4}\pi \left( {{a^2} + {b^2}} \right)c\)&nbsp;hoặc \({1 \over 4}\pi \left( {{b^2} + {c^2}} \right)a\)&nbsp;hoặc \({1 \over 4}\pi \left( {{c^2} + {a^2}} \right)b\)</p>
<p><strong>Giải</strong></p>
<p>&nbsp;Nếu khối trụ có bán kính đáy là \(R = {1 \over 2}\sqrt {{a^2} + {b^2}} \) và chiều cao là c thì có thể tích \(V = {1 \over 4}\pi \left( {{a^2} + {b^2}} \right)c\). Vai trò của a, b, c như nhau nên chọn (D).</p>
<p><strong>Bài 25.</strong> Một khối tứ diện đều có cạnh a nội tiếp một khối nón. Thể tích khối nón là</p>
<p>(A) \({{\sqrt 3 } \over {27}}\pi {a^3}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(B) \({{\sqrt 6 } \over {27}}\pi {a^3}\)&nbsp;</p>
<p>(C) \({{\sqrt 3 } \over 9}\pi {a^3}\)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) \({{\sqrt 6 } \over 9}\pi {a^3}\)</p>
<p><strong>Giải</strong></p>
<p>Khối nón có bán kính đường tròn đáy \(R = {{a\sqrt 3 } \over 3}\)&nbsp;và chiều cao \(h = \sqrt {{a^2} - {{{a^2}} \over 3}}&nbsp; = {a \over 3}\sqrt 6 \)&nbsp;nên có thể tích \(V = {1 \over 3}\pi {{{a^2}} \over 3}.{{a\sqrt 6 } \over 3} = {{\sqrt 6 } \over {27}}\pi {a^3}\).</p>
<p>Chọn (B).</p>
<p><strong>Bài 26.</strong> Cho hình nón đỉnh S, đáy là hình tròn tâm O, góc ở đỉnh bằng \(120^0\). Trên đường tròn đáy, lấy một điểm A cố định và điểm M di động. Có bao nhiêu vị trí của M để diện tích tam giác SAM đạt giá trị lớn nhất ?</p>
<p>(A) Có 1 vị trí ;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (B) Có 2 vị trí ;</p>
<p>(C) Có 3 vị trí ;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (D) Có vô số vị trí.</p>
<p><strong>Giải</strong></p>
<p>Gọi \(l\) là độ dài đường sinh của hình nón ta có \(SA = SM = l\).</p>
<p>Ta có: \({S_{\Delta SAM}} = {1 \over 2}SA.SM.\sin \widehat {ASM} = {1 \over 2}{l^2}\sin \widehat {ASM}\)</p>
<p>Để diện tích tam giác SAM lớn nhất thì \(\sin \widehat {ASM} = 1 \Rightarrow \widehat {ASM} = {90^0}\).</p>
<p>Vì góc ở đỉnh bằng \({120^0}\) nên có 2 vị trí thỏa mãn \(\widehat {ASM} = {90^0}\).</p>
<p>Chọn (B).</p>
<p style="text-align: right;"><strong>loigiaihay.com</strong></p>
<div class="clearfix"></div>`

// let stringInnerHTML = normal;
// let stringInnerHTML = multipleChoise;
// let stringInnerHTML = multipleChoiseTest;
// let stringInnerHTML = noQuestion;
// let stringInnerHTML = noQuestionMutipleChoise;
// let stringInnerHTML = normals;
let stringInnerHTML = multipleChoises;
testU = `<h2 class="s14 lineheight"></h2>
<p><strong>Câu 24 trang 214 SGK Giải tích 12 Nâng cao</strong></p>
<p>Hàm số \(f(x) = {e^{{1 \over 3}{x^3} - 2{x^2} + 3x + 1}}\)</p>
<p>(A) Đồng biến trên mỗi khoảng \((-∞, 1)\) và \((3, + ∞)\)</p>
<p>(B) Nghịch biến trên mỗi khoảng \((-∞, 1)\) và \((3, + ∞)\)</p>
<p>(C) Đồng biến trên khoảng \((-∞, 1)\) và nghịch biến trên khoảng \((3, + ∞)\)</p>
<p>(D) Nghịch biến trên khoảng \((-∞, 1)\)&nbsp; và đồng biến trên khoảng \((3, + ∞)\)</p>
<p><strong>Giải</strong></p>
<p>Ta có:</p>
<p>\(\eqalign{<br> &amp; f'(x) = ({x^2} - 4x + 3){e^{{1 \over 3}{x^3} - 2{x^2} + 3x + 1}} \cr <br> &amp; f'(x) = 0 \Leftrightarrow {x^2} - 4x + 3 = 0 \Leftrightarrow \left[ \matrix{<br> x = 1 \hfill \cr <br> x = 3 \hfill \cr} \right. \cr} \)</p>
<p>Ta có bảng biến thiên:</p>
<p><img style="width: 100%; max-width: 507px;" src="https://img./picture/2017/1220/24-1.jpg" alt="">&nbsp;</p>
<p>Chọn (A)</p>
<p><strong>Câu 25 trang 215 SGK Giải tích 12 Nâng cao</strong></p>
<p>Hàm số f(x) = sin<sup>2</sup>x – 2sinx có giá trị nhỏ nhất là:</p>
<p>(A) \(&nbsp;- {1 \over 2}\)</p>
<p>(B) 0</p>
<p>(C) -1</p>
<p>(D) \(&nbsp;- {1 \over 3}\)</p>
<p><strong>Giải</strong></p>
<p>Đặt&nbsp; t = sin x; t ∈ [-1, 1]</p>
<p>f(x) = g(t) = t<sup>2</sup> – 2t</p>
<p>g’ = 2t – 2 = 0 ⇔ t = 1</p>
<p>g( - 1) = 3</p>
<p>g(1) = -1</p>
<p>Vậy \(\mathop {\min }\limits_{x \in R} f(x) = &nbsp;- 1\)</p>
<p class="MTDisplayEquation">Chọn (C)&nbsp; &nbsp; &nbsp;</p>
<p><strong>Câu 26 trang 215 SGK Giải tích 12 Nâng cao</strong></p>
<p>Gọi (C) là đồ thị của hàm số \(y = \sqrt {{x^2} + x} \)&nbsp;. Khi đó</p>
<p>(A) Đường thẳng y = x + 1 là tiệm cận xiên của (C) (khi \(x \to &nbsp;+ \infty \)&nbsp;)</p>
<p>(B) Đường thẳng \(y = x + {1 \over 2}\)&nbsp;là tiệm cận xiên của (C) (khi \(x \to &nbsp;+ \infty \)&nbsp;&nbsp;)</p>
<p>(C) Đường thẳng y = -x là tiệm cận xiên của (C) (khi \(x \to &nbsp;+ \infty \)&nbsp;&nbsp;)</p>
<p>(D) Đồ thị (C) không có tiệm cận xiên (khi \(x \to &nbsp;+ \infty \)&nbsp;&nbsp;)</p>
<p><strong>Giải</strong></p>
<p>\(\eqalign{<br> &amp; a = \mathop {\lim }\limits_{x \to + \infty } {{f(x)} \over x} = \mathop {\lim }\limits_{x \to + \infty } \sqrt {1 + {1 \over x}} = 1 \cr <br> &amp; b = \mathop {\lim }\limits_{x \to + \infty } {\rm{[f(x)}}\, - {\rm{ax]}} = \mathop {\lim }\limits_{x \to + \infty } (\sqrt {{x^2} + x} - x) \cr <br> &amp; = \mathop {\lim }\limits_{x \to + \infty } {x \over {\sqrt {{x^2} + x} + x}} = \mathop {\lim }\limits_{x \to + \infty } {1 \over {\sqrt {1 + {1 \over x}} + 1}} = {1 \over 2} \cr} \)&nbsp;</p>
<p class="MTDisplayEquation">Vậy \(y = x + {1 \over 2}\)&nbsp;là tiệm cận xiên của (C) khi \(x\to +∞\)</p>
<p class="MTDisplayEquation">Chọn B</p>
<p><strong>Câu 27 trang 215 SGK Giải tích 12 Nâng cao</strong></p>
<p>Đồ thị của hàm số y = x<sup>3</sup> – x + 1 tiếp xúc với điểm (1, 1) với</p>
<p>(A) Parabol y = 2x<sup>2 </sup>-1</p>
<p>(B) Parabol y = x<sup>2</sup></p>
<p>(C) Parabol y = -x<sup>2</sup> + 2x</p>
<p>(D) Đường thẳng y = 2x + 1</p>
<p><strong>Giải</strong></p>
<p>Xét f(x) = x<sup>3</sup> – x + 1 ; g(x) = x<sup>2</sup></p>
<p>Ta có:</p>
<p>\(\left\{ \matrix{<br> f(1) = g(1) = 1 \hfill \cr <br> f'(1) = g'(1) = 2 \hfill \cr} \right.\)&nbsp;</p>
<p class="MTDisplayEquation">Nên đồ thị hàm số y = x<sup>3</sup> – x + 1 tiếp xúc với (P)</p>
<p class="MTDisplayEquation">y = x<sup>2</sup> tại (1, 1)</p>
<p class="MTDisplayEquation">Chọn (B)</p>
<p><strong>Câu 28 trang 215 SGK Giải tích 12 Nâng cao</strong></p>
<p>Cho hai số dương a và b. Đặt&nbsp;</p>
<p>\(\left\{ \matrix{<br> X = \ln {{a + b} \over 2} \hfill \cr <br> Y = {{\ln a + \ln b} \over 2} \hfill \cr} \right.\)</p>
<p>Khi đó:</p>
<p>(A) X &gt; Y</p>
<p>(B) X &lt; Y</p>
<p>(C) X ≥ Y</p>
<p>(D) X ≤ Y</p>
<p><strong>Giải</strong></p>
<p>Ta có:&nbsp;</p>
<p>\(\eqalign{<br> &amp; {{a + b} \over 2} \ge \sqrt {ab}\cr&amp; \Rightarrow \ln {{a + b} \over 2} \ge \ln \sqrt {ab} = {1 \over 2}(lna\, + \ln b) \cr <br> &amp; \Rightarrow X \ge Y \cr} \)</p>
<p class="MTDisplayEquation">Chọn (C)</p>
<p><strong>Câu 29 trang 215 SGK Giải tích 12 Nâng cao</strong></p>
<p>Cho hai số không âm a và b.</p>
<p>Đặt</p>
<p>\(\left\{ \matrix{<br> X = {e^{{{a + b} \over 2}}} \hfill \cr <br> Y = {{{e^a} + {e^b}} \over 2} \hfill \cr} \right.\)</p>
<p>Khi đó:</p>
<p>(A) X &gt; Y</p>
<p>(B) X &lt; Y</p>
<p>(C) X ≥ Y</p>
<p>(D) X ≤ Y</p>
<p><strong>Giải</strong></p>
<p>Ta có:</p>
<p>&nbsp;\(Y = {{{e^a} + {e^b}} \over 2} \ge \sqrt {{e^a}.{e^b}} &nbsp;= {e^{{{a + b} \over 2}}} = X\)</p>
<p class="MTDisplayEquation">Vậy chọn (D)</p>
<p><strong>Câu 30 trang 215 SGK Giải tích 12 Nâng cao</strong></p>
<p>Cho (C) là đồ thị của hàm số y = log<sub>2</sub>x. Ta có thể suy ra đồ thị của hàm số y = log<sub>2</sub>2(x + 3) bằng cách tịnh tiến (C) theo vectơ:</p>
<p>\(\eqalign{<br> &amp; (A)\,\overrightarrow v = (3,1) \cr <br> &amp; (B)\,\overrightarrow v = (3, - 1) \cr <br> &amp; (C)\,\overrightarrow v = ( - 3,1) \cr <br> &amp; (D)\,\overrightarrow v = ( - 3, - 1) \cr} \)&nbsp;</p>
<p><strong>Giải</strong></p>
<p>Ta có:</p>
<p>log<sub>2</sub>2(x + 3) = 1 + log<sub>2</sub> (x + 3)</p>
<p>y = log<sub>2</sub>x&nbsp; \(\to\) Tịnh tiến trái 3 đơn vị</p>
<p>y = log<sub>2</sub> (x + 3)&nbsp;\(\to\) Tịnh tiến lên trên 1 đơn vị&nbsp;\(\to\) y = 1 + log<sub>2</sub> (x + 3)</p>
<p>Chọn (C)</p>
<p><strong>Câu 31 trang 216 SGK Giải tích 12 Nâng cao</strong></p>
<p>Cho hàm số f(x) = log<sub>5</sub>(x<sup>2</sup> + 1). Khi đó:</p>
<p>(A) \(f'(1) = {1 \over {2\ln 5}}\)</p>
<p>(B) \(f'(1) = {1 \over {\ln 5}}\)</p>
<p>(C) \(f'(1) = {3 \over {2\ln 5}}\)</p>
<p>(D) \(f'(1) = {2 \over {\ln 5}}\)</p>
<p><strong>Giải</strong></p>
<p>Ta có:</p>
<p>\(f'(x) = {{2x} \over {{x^2} + 1}}.{1 \over {\ln 5}} \Rightarrow f'(1) = {1 \over {\ln 5}}\)</p>
<p>Chọn (B)</p>
<p><strong>Câu 32 trang 216 SGK Giải tích 12 Nâng cao</strong></p>
<p>Biết rằng đồ thị của hàm số y = a<sup>x</sup> và đồ thị của hàm số y = log<sub>b</sub>x cắt nhau tại điểm \(\left( {\sqrt {{2^{ - 1}}} ;\sqrt 2 } \right)\). Khi đó&nbsp;</p>
<p>(A) a &gt; 1 và b &gt; 1</p>
<p>(B) a &gt; 1 và 0 &lt; b &lt; 1</p>
<p>(C) 0 &lt; a &lt; 1 và b &gt; 1</p>
<p>(D) 0 &lt; a &lt; 1 và 0 &lt; b &lt; 1</p>
<p><strong>Giải</strong></p>
<p>Ta có:</p>
<p>\(\left\{ \matrix{<br> {a^{\sqrt {{1 \over 2}} }} = \sqrt 2 \hfill \cr <br> {\log _b}\sqrt {{1 \over 2}} = \sqrt 2 \hfill \cr} \right. \Leftrightarrow \left\{ \matrix{<br> {\log _a}\sqrt 2 = \sqrt {{1 \over 2}} &gt; 0 \hfill \cr <br> {\log _b}\sqrt {{1 \over 2}} = \sqrt 2 &gt; 0 \hfill \cr} \right.\)</p>
<p>\(\Rightarrow \left\{ \matrix{<br> a &gt; 1 \hfill \cr <br> 0 &lt; b &lt; 1 \hfill \cr} \right.\)&nbsp;</p>
<p>Chọn (B)</p>
<p><strong>Câu 33 trang 216 SGK Giải tích 12 Nâng cao</strong></p>
<p>Cho hàm số \(f(x) = {{2{x^4} + 3} \over {{x^2}}}\)&nbsp;. Khi đó</p>
<p>(A) \(\int {f(x)dx = {{2{x^3}} \over 3}} &nbsp;- {3 \over x} + C\)</p>
<p>(B) \(\int {f(x)dx = {{2{x^3}} \over 3}} &nbsp;+ {3 \over x} + C\)</p>
<p>(C) \(\int {f(x)dx = 2{x^3}} &nbsp;- {3 \over x} + C\)</p>
<p>(D)\(\int {f(x)dx = {{2{x^3}} \over 3}} &nbsp;+ {3 \over {2x}} + C\)</p>
<p><strong>Giải</strong></p>
<p>Ta có:</p>
<p>\(\int {f(x)dx = \int {(2{x^2} + {3 \over {{x^2}}})dx = {{2{x^3}} \over 3} - {3 \over x} + C} } \)</p>
<p>Chọn (A)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
<p><strong>Câu 34 trang 216 SGK Giải tích 12 Nâng cao</strong></p>
<p>Đẳng thức \(\int\limits_0^a {\cos (x + {a^2})dx = sina} \)&nbsp;xảy ra nếu:</p>
<p>\((A) \;a – π\)&nbsp;</p>
<p>\(\eqalign{<br> &amp; (B)\,\,a = \sqrt \pi \cr <br> &amp; (C)\,\,a = \sqrt {3\pi } \cr <br> &amp; (D)\,a = \sqrt {2\pi } \cr} \)</p>
<p class="MTDisplayEquation"><strong>Giải</strong></p>
<p class="MTDisplayEquation">Ta có:</p>
<p>\(\eqalign{<br> &amp; \int\limits_0^a {\cos (x + {a^2})dx = \sin (x + {a^2})|_0^a} \cr&amp;= \sin (a + {a^2}) - \sin {a^2} = \sin a \cr <br> &amp; \Leftrightarrow \sin (a + {a^2}) = \sin {a^2} + \sin a \cr} \)&nbsp;</p>
<p class="MTDisplayEquation">Với \(a = \sqrt {2\pi } &nbsp;\Rightarrow \sin (\sqrt {2\pi } &nbsp;+ 2\pi ) = \sin 2\pi &nbsp;+ \sin \sqrt {2\pi } \)</p>
<p class="MTDisplayEquation">\( \Leftrightarrow \sin \sqrt {2\pi } &nbsp;= \sin \sqrt {2\pi } \)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
<p>Chọn (D)</p>
<p><strong>Câu 35 trang 216 SGK Giải tích 12 Nâng cao</strong></p>
<p>Gọi S là tập hợp các số nguyên dương k thỏa mãn điều kiện:</p>
<p>\(\int\limits_1^e {\ln {k \over x}} dx\,\, &lt; e - 2\)&nbsp;</p>
<p>Khi đó:</p>
<p>(A) S = {1}</p>
<p>(B) S = {2}</p>
<p>(C) S = {1, 2}</p>
<p>(D) S = Ø</p>
<p><strong>Giải</strong></p>
<p>Ta có:</p>
<p>\(\int\limits_1^e {\ln {k \over x}} dx = \int\limits_1^e {(\ln k - \ln x)dx = (e - 1)\ln k - \int\limits_1^e {\ln xdx} }\)</p>
<p>Đặt&nbsp;</p>
<p>\(\left\{ \matrix{<br> u = \ln x \hfill \cr <br> dv = dx \hfill \cr} \right. \Leftrightarrow \left\{ \matrix{<br> du = {1 \over x}dx \hfill \cr <br> v = x \hfill \cr} \right.\)</p>
<p class="MTDisplayEquation">Do đó:</p>
<p>\(\int\limits_1^e {\ln xdx = x\ln x|_1^e} &nbsp;- \int\limits_1^e {dx} &nbsp;= e - (e - 1) = 1\)</p>
<p>Vậy:</p>
<p>\(\eqalign{<br> &amp; \int\limits_1^e {\ln {k \over x}} dx &lt; e - 2 \Leftrightarrow (e - 1)\ln k - 1 &lt; e - 2 \cr <br>&amp; \Leftrightarrow {\mathop{\rm lnk}\nolimits} &lt; 1 \Leftrightarrow 0 &lt; k &lt; e \Leftrightarrow k \in {\rm{\{ }}1,\,2\} \cr} \)</p>
<p>Chọn (C)</p>
<p><strong>Câu 36 trang 217 SGK Giải tích 12 Nâng cao</strong></p>
<p>Cho số phức z tùy ý. Xét các số phức</p>
<p>\(\alpha&nbsp; = {z^2} + {\left( {\overline z } \right)^2};\,\beta&nbsp; = z.\overline z&nbsp; + i\left( {z - \overline z } \right).\)</p>
<p>Khi đó:</p>
<p>A. α là số thực, β là số thực. &nbsp;&nbsp;&nbsp; B. α là số thực, β là số ảo.</p>
<p>C. α là số ảo, β là số thực. &nbsp;&nbsp;&nbsp; D. α là số ảo, β là số ảo.</p>
<p><strong>Giải</strong></p>
<p>Giả sử z = a+bi, ta có:</p>
<p>\(\alpha&nbsp; = {\left( {a + bi} \right)^2} + {\left( {a - bi} \right)^2} = 2{a^2}\)&nbsp;vậy α ∈ R</p>
<p>\(\beta&nbsp; = \left( {a + bi} \right)\left( {a - bi} \right) + i\left( {a + bi - a + bi} \right)\)</p>
<p>\(= {a^2} + {b^2} - {b^2} = {\rm{ }}{a^2}\in\mathbb R\)</p>
<p>Vậy chọn A.</p>
<p><strong>Câu 37 trang 217 SGK Giải tích 12 Nâng cao</strong></p>
<p>Cho số phức z tùy ý. Xét các số phức&nbsp;</p>
<p>\(\left\{ \matrix{<br> \alpha = {{{i^{2005}} - i} \over {\overline z - 1}} - {z^2} + {(\overline z )^2} \hfill \cr <br> \beta = {{{z^3} - z} \over {z - 1}} + {(\overline z )^2} + \overline z \hfill \cr} \right.\)</p>
<p>Khi đó:</p>
<p>(A) α là số thực, β là số thực</p>
<p>(B) α là số thực, β là số ảo</p>
<p>(C) α là số ảo, β là số thực</p>
<p>(D) α là số ảo, β là số ảo</p>
<p><strong>Giải</strong></p>
<p>Ta có:</p>
<p class="MTDisplayEquation">\({i^{2005}} = i \Rightarrow \alpha &nbsp;= {(\overline z )^2} - {z^2} = (\overline z &nbsp;- z)(\overline z &nbsp;+ z)\)&nbsp;là số thực</p>
<p class="MTDisplayEquation">\(\beta &nbsp;= {z^2} + z + {\overline z ^2} + \overline z &nbsp;= {(z + \overline z )^2} - 2z.\overline z &nbsp;+ (z + \overline z )\)&nbsp;là số thực</p>
<p>Chọn (C)</p>
<p><strong>Câu 38 trang 217 SGK Giải tích 12 Nâng cao</strong></p>
<p>Nếu môđun của số phức z bằng r (r &gt; 0) thì môdn của số phức (1 – i)<sup>2</sup>z bằng:</p>
<p>(A) 4r</p>
<p>(B) 2r</p>
<p>(C) \(r\sqrt 2 \)</p>
<p>(D) r</p>
<p><strong>Giải</strong></p>
<p>(1 – i)<sup>2</sup> = -2i ⇒ |(1 – i)<sup>2</sup>| = 2 ⇒ |(1 – i)<sup>2</sup>z| = 2r</p>
<p>Chọn (B)</p>
<p style="text-align: right;"><strong></strong></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p class="MTDisplayEquation">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
<div class="clearfix"></div>`
// let stringInnerHTML = testU;
// stringInnerHTML = testU2;


let text = "Bài 4 trang 12 SGK Hình học 12"
text = "test"
// let book = "văn";
let book = "toán";
let detailSection = new DetailSection(document, stringInnerHTML, text, book);

detailSection.buildDetail(false);
document.body.appendChild(detailSection.element);
fs.writeFile('test.html', dom.serialize(), err => {
    console.log('done: test');
});
