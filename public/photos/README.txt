ẢNH CHO THIỆP CƯỚI
====================

Bỏ các file ảnh vào thư mục này (public/photos/) với ĐÚNG TÊN sau:

Ảnh đầu trang (Hero banner):
  groom.jpg   →  ảnh chú rể (Hà Việt Dũng  )        — nên dọc ~3:4
  bride.jpg   →  ảnh cô dâu (Bùi Như Thuận ) — nên dọc ~3:4

Album ảnh cưới (lưới hiện 4 ô, ô thứ 4 hiện "+N", bấm vào xem carousel toàn bộ):
  album-1.jpg  →  album-15.jpg
  (tối đa 15 ảnh; ảnh nào chưa có sẽ hiện ô màu tạm — cứ thêm dần)

QUAN TRỌNG — TRÁNH ẢNH BỊ MỜ:
  Ảnh chụp gốc thường rất lớn (3000–5000px, vài MB) -> hiển thị bị MỜ + tải chậm.
  Sau khi thêm/đổi ảnh, chạy lệnh này 1 lần trong terminal để tự thu nhỏ cho nét:

      npm run photos

  (Lệnh sẽ resize mọi ảnh trong thư mục này về tối đa 1400px, nhẹ ~150KB, vẫn nét.)

Mẹo: tên file viết thường, đuôi .jpg. Nếu là .png, lệnh "npm run photos" sẽ tự đổi sang .jpg.
