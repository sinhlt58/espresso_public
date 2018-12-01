
# Chạy ở production

Tensorflow hỗ trợ dùng docker image để chạy model

## Prerequisites

### Cài Docker

Docker phiên bản mới nhất (docker-ce, docker/docker-engine/docker.io là các phiên bản cũ)

https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository

### Tải tensorflow/serving docker image

```
docker pull tensorflow/serving
```

### Chạy tensorflow/serving image với sentiment model

```
sudo ./serve_model.sh 
```

### Dừng tensorflow/serving image

```
sudo ./stop_model.sh
```

### Kiểm tra sentiment api

```
POST http://localhost:8501/v1/models/predict_score:predict
{
	"inputs": ["shop giao hàng nhanh quá"]
}
```
Response:
```
{
    "predictions": [
        0.593616
    ]
}
```
