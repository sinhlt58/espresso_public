csv_fields = [
        ["stt", "STT", "cc,nd,dn"],
        ["ngay_dang", "Thời gian đăng", "cc,nd,dn"],
        ["dia_chi", "Địa chỉ", "dn"],
        ["cc_phong", "Phòng", "cc"],
        ["cc_tang", "Tầng", "cc"],
        ["cc_toa_nha", "Tòa Nhà", "cc"],
        ["dc_so_nha", "Số Nhà", "nd"],
        ["dc_ngo", "Ngõ", "nd,dn"],
        ["dc_pho_duong", "Phố", "cc,nd,dn"],
        ["dc_quan_huyen", "Quận", "cc,nd,dn"],
        ["dien_tich", "Diện Tích", "cc,nd,dn"],
        ["gia_chuan_hoa", "Giá/m2", "cc,nd,dn"],
        ["loai_dat", "Loại Đất", "dn"],
        ["huong", "Hướng cửa vào", "cc"],
        ["huong", "Hướng", "nd,dn"],
        ["duong_vao", "Đường vào", "nd,dn"],
        ["mat_tien", "Mặt tiền", "nd,dn"],
        ["co_cua_hau_khong", "Có cửa hậu không", "nd"],
        ["oto_dau_cua", "Ô tô đậu cửa", "nd,dn"],
        ["nha_xay_lau_chua", "Nhà xây lâu chưa", "nd"],
        ["so_tang", "Số tầng", "nd"],
        ["so_phong", "Số phòng", "nd"],
        ["thuoc_du_an", "Dự án", "cc,dn"],
        ["chu_dau_tu", "Chủ đầu tư", "cc"],
        ["huong_ban_cong", "Hướng ban công", "cc"],
        ["huong_vao_cua", "Hướng cửa vào", "cc"],
        ["vi_tri_can_ho", "Vị trí căn hộ", "cc"],
        ["cho_de_xe", "Chỗ đỗ xe", "cc"],
        ["noi_that", "Nội thất", "cc,nd"],
        ["cc_mini", "CC Mini", "cc"],
        ["so_phong_ngu", "Phòng ngủ", "cc"],
        ["so_toilet", "Số nhà WC", "cc"],
        ["lh_sdt", "Điện thoại", "cc,nd,dn"],
        ["lh_ten", "Tên người đăng", "cc,nd,dn"],

        ["gia", "", ""],
        ["dc_thanh_pho", "", ""],
        ["vi_tri", "", ""], # d/c duong, pho cho trang nhadat24h 
        ["chieu_ngang", "", ""],
        ["chieu_dai", "", ""],
        ["quy_mo", "", ""],
        ["duong_truoc_nha", "", ""],
        ["phap_ly", "", ""],
        ["so_lau", "", ""],
        ["so_phong_tam", "", ""],
        ["phong_an", "", ""],
        ["nha_bep", "", ""],
        ["san_thuong", "", ""],
        ["chinh_chu", "", ""],
        ["lh_dia_chi", "", ""],
        ["lh_email", "", ""],
        ["tieu_de", "", ""],
        ["mieu_ta", "", ""],
        ["loai_tin", "", ""],
        ["loai_bds", "", ""],
        ["ngay_cap_nhat", "", ""],
        ["ngay_het_han", "", ""],
        ["url", "Từ URL", "cc,nd,dn"],
    ]
import io, json
def write_json_data(path, data, indent=4, append_date=False):
    if append_date:
        path = path + get_current_as_str()

    with io.open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=indent)

hosts = ['nhadat24h.net', 'muaban.net', 'alonhadat.com.vn', 'www.muabannhadat.vn', 'batdongsan.com.vn']

out_dict = {}

for field in csv_fields:
    es_field = field[0]
    out_dict[es_field] = {}
    for host in hosts:
        out_dict[es_field][host] = ""

write_json_data('tmp.json', out_dict)