## Chứa script để export data cho gán nhãn sentiment

### Setup up environment
`conda env create -f env.yml`

`conda activate espresso`

### Run script

Ví dụ export data cho domain `food_kid` từ tháng 1 đến tháng 4 với tất cả các loại sao.

`python export.py --domain food_kid --stars 1,2,3,4,5 --start_time 1546304400000 --end_time 1554080400000`

Ví dụ export data cho domain `thoi_trang_nu` từ tháng 1 đến tháng 4 với tất cả các loại sao.

`python export.py --domain thoi_trang_nu --stars 1,2,3,4,5 --start_time 1546304400000 --end_time 1554080400000`

Ví dụ export data cho domain `motor_car` từ tháng 1 đến tháng 4 với tất cả các loại sao 1,2,3.

`python export.py --domain motor_car --stars 1,2,3 --start_time 1546304400000 --end_time 1554080400000`

### Lưu ý

Tối đa export data một lần là 30000 bình luận khác nhau.

Ví dụ file output có thể xem trong folder `example_out`.

Các luật để phân loại domain đang dựa theo trường breadcrumb.

Timestamp convert: https://www.epochconverter.com/
