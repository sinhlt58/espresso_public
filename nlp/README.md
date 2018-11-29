
Docker phiên bản mới nhất (docker-ce, docker/docker-engine/docker.io là các phiên bản cũ)

https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository

các câu lệnh trên một máy chưa sử dụng docker bao giờ:
# add key repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# update lại
sudo apt-get update
# cài đặt docker (>200MB)
sudo apt-get install docker-ce

sau khi chạy, các câu lệnh của docker (e.g docker run) sẽ chạy ảnh docker trên máy

# tải ảnh tensorflow_serving 
docker pull tensorflow/serving

chạy serve_model.sh {port} để sử dụng ảnh trên để tạo service API. file sẽ lấy model export trong folder model
nếu không chạy argument, mặc định port là 8501

khi chạy, địa chỉ truy cập để sử dụng RestAPI sẽ là http://localhost:{port(8501)}/v1/models/predict_score:predict
format gửi lên là JSON,
	nếu gửi lên {"inputs":[]}, kết quả trả về sẽ là JSON dưới dạng {"outputs":[]}
	nếu gửi lên {"instances":[]}, kết quả trả về sẽ là JSON dưới dạng {"predictions":[]}

nếu muốn tắt image sau khi chạy, dùng stop_model.sh
