
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

các argument nếu không ghi sẽ là default và 8501
```
sudo ./serve_model.sh {tên folder trong model} {tên port đầu ra}
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
        {
            "output": 0.813674,
            "output_rating": 4
        }
    ]
}
```

### Train models

```
cd nlp
```

#### Train

```
python source\sentiment.py --model_structure attention_extended_v2 --data_config json_20k_rectified --balance_reduce_mode 2worst --model_dir .\model\test
```

#### Eval

```
python source\sentiment.py --model_structure attention_extended_v2 --data_config json_20k_rectified --balance_reduce_mode 2worst --model_dir .\model\test --mode eval
```
