import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto p-6">
        <div className="flex justify-between">
          <div>
            <h5 className="font-bold mb-2">SIÊU THỊ ONLINE HIẾU NHẬT</h5>
            <p>
              Siêu Thị Online Hiếu Nhật - Thương hiệu siêu thị online uy tín<br />
              với nhiều năm kinh nghiệm.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-2">DỊCH VỤ</h5>
            <ul>
              <li>Đặt hàng online</li>
              <li>Giao hàng tận nơi</li>
              <li>Dịch vụ khách hàng 24/7</li>
              <li>Khuyến mãi và giảm giá</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">THÔNG TIN LIÊN HỆ</h5>
            <p>Địa chỉ: An Phú Đông, Q12, TP.HCM</p>
            <p>Hotline: (028) 1234 5678</p>
            <p>Email: info@hieunhat.com.vn</p>
            <p>Fax: (028) 1234 5678</p>
          </div>
          <div>
            <h5 className="font-bold mb-2">FANPAGE</h5>
            <a href="https://www.facebook.com" className="text-blue-400">Facebook</a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>&copy; 2024 Siêu Thị Online Hiếu Nhật</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
