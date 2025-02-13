import TCASImages from "../assets/images/TCAS.webp";


export const courses = [
  // คอร์ส TGAT
  {
    id: 1, // รหัสคอร์ส
    title: "TGAT1: การสื่อสารภาษาอังกฤษ", // ชื่อคอร์ส
    category: "tgat", // หมวดหมู่
    description: "พัฒนาทักษะการสื่อสารภาษาอังกฤษสำหรับข้อสอบ TGAT", // คำอธิบาย
    image: TCASImages, // รูปภาพ
    price: 2000,  // ราคา
    isPopular: true,  // ยอดนิยม
    type: "standard",  // ประเภทคอร์ส
  },
  {
    id: 99, // รหัสคอร์ส
    title: "TGAT1: การสื่อสารภาษาอังกฤษ", // ชื่อคอร์ส
    category: "tgat", // หมวดหมู่
    description: "พัฒนาทักษะการสื่อสารภาษาอังกฤษสำหรับข้อสอบ TGAT", // คำอธิบาย
    image: TCASImages, // รูปภาพ
    price: 2000,  // ราคา
    isPopular: true,  // ยอดนิยม
    type: "standard",  // ประเภทคอร์ส
  },
  {
    id: 98, // รหัสคอร์ส
    title: "TGAT1: การสื่อสารภาษาอังกฤษ", // ชื่อคอร์ส
    category: "tgat", // หมวดหมู่
    description: "พัฒนาทักษะการสื่อสารภาษาอังกฤษสำหรับข้อสอบ TGAT", // คำอธิบาย
    image: TCASImages, // รูปภาพ
    price: 2000,  // ราคา
    isPopular: true,  // ยอดนิยม
    type: "standard",  // ประเภทคอร์ส
  },
  {
    id: 97, // รหัสคอร์ส
    title: "TGAT1: การสื่อสารภาษาอังกฤษ", // ชื่อคอร์ส
    category: "tgat", // หมวดหมู่
    description: "พัฒนาทักษะการสื่อสารภาษาอังกฤษสำหรับข้อสอบ TGAT", // คำอธิบาย
    image: TCASImages, // รูปภาพ
    price: 2000,  // ราคา
    isPopular: true,  // ยอดนิยม
    type: "standard",  // ประเภทคอร์ส
  },
  {
    id: 2, 
    title: "TGAT2: การคิดอย่างมีเหตุผล",
    category: "tgat",
    description: "ฝึกทักษะการคิดวิเคราะห์และการแก้ปัญหาอย่างมีเหตุผล",
    image: TCASImages,
    price: 1500,
    isPopular: false,
    type: "standard",
  },
  {
    id: 3,
    title: "TGAT3: สมรรถนะการทำงาน",
    category: "tgat",
    description: "ฝึกทักษะการแก้ปัญหาและการจัดการอารมณ์สำหรับการทำงาน",
    image: TCASImages,
    price: 1800,
    isPopular: true,
    type: "premium",
  },

  // คอร์ส TPAT
  {
    id: 4,
    title: "TPAT1: ความถนัดแพทย์",
    category: "tpat",
    description: "เตรียมตัวสอบเข้าคณะแพทยศาสตร์ด้วยการฝึกโจทย์แนว TPAT1",
    image: TCASImages,
    price: 2500,
    isPopular: true,
    type: "premium",
  },
  {
    id: 5,
    title: "TPAT2: ความถนัดศิลปกรรมศาสตร์",
    category: "tpat",
    description: "เตรียมตัวสอบเข้าคณะศิลปกรรมศาสตร์ด้วยข้อสอบจำลอง TPAT2",
    image: TCASImages,
    price: 2200,
    isPopular: false,
    type: "standard",
  },

  // คอร์ส A-Level
  {
    id: 6,
    title: "A-Level Math1: คณิตศาสตร์ประยุกต์ 1",
    category: "a-level",
    description: "เจาะลึกคณิตศาสตร์ประยุกต์เพื่อสอบ A-Level",
    image: TCASImages,
    price: 3000,
    isPopular: true,
    type: "premium",
  },
  {
    id: 7,
    title: "A-Level Phy: ฟิสิกส์",
    category: "a-level",
    description: "เตรียมสอบฟิสิกส์ A-Level ด้วยเทคนิคการคิดวิเคราะห์",
    image: TCASImages,
    price: 2800,
    isPopular: false,
    type: "standard",
  },
];
