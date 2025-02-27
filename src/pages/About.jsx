import React from 'react';
import "../style/about.css";

const Abouts = () => {
  return (
    <div className="about-page">
      {/* ประวัติสถาบัน */}
      <section className="institution-history">
        <h2>ประวัติสถาบัน</h2>
        <p>
          สถาบัน ABC เริ่มก่อตั้งในปี 2550 ด้วยการมุ่งมั่นที่จะส่งเสริมการศึกษาคุณภาพสูงสำหรับทุกคนใน
          ชุมชน ด้วยหลักสูตรที่หลากหลายและครูผู้มีความสามารถ สถาบันของเรามีความภาคภูมิใจในการให้การศึกษา
          ที่ตอบสนองทุกความต้องการของนักเรียน
        </p>
      </section>

      {/* ครูผู้สอน */}
      <section className="teachers">
        <h2>ครูผู้สอน</h2>
        <div className="teachers-list">
          <div className="teacher">
            <img src="" alt="ครูผู้สอน 1" />
            <h3>คุณครูสมชาย</h3>
            <p>ครูผู้สอนวิชาคณิตศาสตร์</p>
          </div>
          <div className="teacher">
            <img src="" alt="ครูผู้สอน 2" />
            <h3>คุณครูนางสาวมินตรา</h3>
            <p>ครูผู้สอนวิทยาศาสตร์</p>
          </div>
          {/* เพิ่มครูคนอื่น ๆ ตามต้องการ */}
        </div>
      </section>

      {/* ผลงานนักเรียน */}
      <section className="student-achievements">
        <h2>ผลงานนักเรียน</h2>
        <ul>
          <li>การประกวดคณิตศาสตร์ระดับประเทศ - ชนะเลิศอันดับ 1</li>
          <li>การแข่งขันวิทยาศาสตร์โอลิมปิก - ได้รับรางวัลเหรียญทอง</li>
          <li>การแข่งขันวาดภาพระดับโลก - ได้รับรางวัลรองชนะเลิศ</li>
          {/* เพิ่มผลงานตามต้องการ */}
        </ul>
      </section>

      {/* ข้อมูลติดต่อ */}
      <section className="contact-info">
        <h2>ข้อมูลติดต่อ</h2>
        <p>ที่อยู่: 123 ถนนวิจิตรใจ กรุงเทพมหานคร 10200</p>
        <p>เบอร์โทร: 02-123-4567</p>
        <p>อีเมล: contact@abcinstitute.com</p>
        <p>เว็บไซต์: <a href="http://www.abcinstitute.com">www.abcinstitute.com</a></p>
      </section>
    </div>
  );
};

export default Abouts;
