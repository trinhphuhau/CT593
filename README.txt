# CT593

Yêu cầu cài đặt:
- Python 3.8: https://www.python.org/downloads/release/python-380
- Node.js: https://nodejs.org
- xampp: https://www.apachefriends.org/download.html
- yarn: https://classic.yarnpkg.com/lang/en/docs/install
- Rasa: https://rasa.com/docs/rasa/installation

Thêm dữ liệu trong tập tin qlsach.sql vào cơ sở dữ liệu

Chỉnh sửa tập tin .env trong thư mục /website/server

    ACCESS_TOKEN=<unique random token>
    REFRESH_TOKEN=<unique random token>

    DB_HOST=<Tên host>
    DB_USER=<Tên user CSDL>
    DB_PASSWORD=<Mật khẩu CSDL>
    DB_DATABASE_NAME=<Tên cơ sở dữ liệu>




## Website
Vào các thư mục website/admin, /website/customer, /website/server

Lần lượt chạy lệnh bên dưới trong các thư mục:

yarn install

Sau khi đã cài đặt và thay đổi thông tin, lần lượt chạy lệnh bên dưới trong các thư mục:

yarn start

Mở http://localhost:3000 để hiển thị trang bán hàng.
Mở http://localhost:3002 để hiển thị trang quản lý.




## Chatbot

Trong thư mục /chatbot, chạy lệnh bên dưới để huấn luyện mô hình:

rasa train

Sau khi có được mô hình, chạy các lệnh bên dưới trong thư mục /chatbot:

rasa run actions
rasa run -m models --enable-api --cors "*"

Mở http://localhost:3000 để xem hiển thị chatbot trên trang bán hàng.




## Hệ thống gợi ý sách tương đồng

Trong thư mục /recommedation-system/content-based, chạy lệnh:

python content-based-model.py

Lưu hai tập tin similarity.pkl và books_list.pkl vào thư mục /website/server/model




## Hệ thống gợi ý sách cho từng thành viên

Trong thư mục /recommendation-system/matrix-factorization

Đưa tập tin matrix_factorization.ipynb lên https://colab.research.google.com và thực hiện chạy các dòng lệnh trong tập tin

Trong dòng lệnh files.upload(), tải lên 2 tập tin books.csv và ratings.csv

Sau khi chạy hoàn tất, thực hiện tải về 3 tập tin group1-shard1of1.bin, model.json, web_book_data.json về thư mục /website/server/model