
# Chạy xử lý data cho việc train nlp model

## Build project

```
./run build
```

## Tạo index tên là sentiment (nếu tồn tại sẽ xóa đi và tạo lại)

```
./run nlp_index
```

## Chạy local
```
./run nlp_local
```

## Kiểm tra dữ liệu đầu vào

Truy cập http://103.220.68.79:5601

Chọn analysis index

## Kiểm tra dữ liệu đã xử lý

Truy cập localhost:5601

Vào Discover

Chọn sentiment index

## File code xử lý data cho nlp model 

```
PreprocessNlpBolt.java
```

# Chạy xử lý data crawl

## Build project

```
./run build
```

## Tạo index tên là sentiment (nếu tồn tại sẽ xóa đi và tạo lại)

```
./run index
```

## Chạy local
```
./run local
```

## Kiểm tra dữ liệu đã xử lý

Truy cập localhost:5601

Vào Discover

Chọn analysis index
