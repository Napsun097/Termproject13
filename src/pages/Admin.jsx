import React, { useState, useEffect } from "react";
import "../style/admin.css";
import axios from "axios";
import { Button, Modal, Input, Upload, Select, Checkbox } from "antd";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("course");
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    isPopular: false,
    type: "",
    courseHours: 0,
    fullDescription: "",
    shortDescription: "",
    subjectName: "",
  });

  const authToken = localStorage.getItem("token");

  const fetchCourses = () => {
    axios
      .get("http://localhost:1337/api/courses?populate=image")
      .then((response) => {
        console.log("Courses fetched after update:", response.data);
        if (response.data && response.data.data) {
          setCourses(response.data.data); // Update UI with fresh data
        }
      })
      .catch((error) => {
        console.error("Error fetching courses!", error);
      });
  };
  
  useEffect(() => {
    fetchCourses(); // Fetch courses when component mounts
  }, []);

  const handleEditClick = (course) => {
    setEditingCourse(course);
    
    setFormData({
      title: course.title || "",
      category: course.category || "",
      price: course.price || 0,
      isPopular: course.isPopular || false,
      type: course.type || "",
      courseHours: course.courseHours || 0,
      fullDescription: course.fullDescription || "",
      shortDescription: course.shortDescription || "",
      subjectName: course.subjectName || "",
    });

    setModalOpen(true);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingCourse) return;
  
    try {
      const updatedData = {
        data: {
          title: formData.title,
          category: formData.category,
          price: formData.price,
          isPopular: formData.isPopular,
          type: formData.type,
          courseHours: formData.courseHours,
          fullDescription: formData.fullDescription,
          shortDescription: formData.shortDescription,
          subjectName: formData.subjectName,
        },
      };
  
      console.log("Updating Course:", updatedData);
  
      // 1️⃣ Update Course
      await axios.put(
        `http://localhost:1337/api/courses/${editingCourse.documentId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      // 2️⃣ Find Related `favorites` & `cart` Items
      const favoriteRes = await axios.get(
        `http://localhost:1337/api/favorites?filters[course][documentId]=${editingCourse.documentId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      const cartRes = await axios.get(
        `http://localhost:1337/api/carts?filters[course][documentId]=${editingCourse.documentId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      const favoriteItems = favoriteRes.data.data;
      const cartItems = cartRes.data.data;
  
      // 3️⃣ Update Each Favorite Item
      await Promise.all(
        favoriteItems.map((fav) =>
          axios.put(
            `http://localhost:1337/api/favorites/${fav.documentId}`,
            { data: updatedData.data },
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          )
        )
      );
  
      // 4️⃣ Update Each Cart Item
      await Promise.all(
        cartItems.map((cart) =>
          axios.put(
            `http://localhost:1337/api/carts/${cart.documentId}`,
            { data: updatedData.data },
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          )
        )
      );
  
      // ✅ Refresh Data
      fetchCourses();
      setModalOpen(false);
  
      console.log("Course & related data updated successfully!");
    } catch (error) {
      console.error("Error updating course & related data:", error);
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li
            className={activeTab === "course" ? "active" : ""}
            onClick={() => setActiveTab("course")}
          >
            📚 Course
          </li>
          <li
            className={activeTab === "user" ? "active" : ""}
            onClick={() => setActiveTab("user")}
          >
            👤 User
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {activeTab === "course" && (
          <div>
            <h1>Course Management</h1>
            <div className="course-list">
              {courses.length > 0 ? (
                courses.map((course) => {
                  // Extract attributes
                  const title = course.title;
                  const image = course.image[0];

                  // ✅ Extract large image URL
                  const imageUrl =
                    image && image.formats && image.formats.large
                      ? `http://localhost:1337${image.formats.large.url}`
                      : null;

                  return (
                    <div key={course.id} className="course-card">
                      <h3>{title}</h3>
                      {imageUrl ? (
                        <img src={imageUrl} alt={title} className="course-image" />
                      ) : (
                        <p>No Image Available</p>
                      )}
                      <Button type="primary" className="edit-button" onClick={() => handleEditClick(course)}>Edit</Button>
                    </div>
                  );
                })
              ) : (
                <p>Loading courses...</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "user" && <h1>User Management</h1>}
      </div>

      {/* Ant Design Modal for Editing */}
      <Modal title="Edit Course" open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)}>
        <label>Course Title</label>
        <Input
          placeholder="Course Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        
        <label>Category</label>
        <Select
          placeholder="Select Category"
          value={formData.category}
          onChange={(value) => handleChange("category", value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <Option value="tgat">tgat</Option>
          <Option value="tpat">tpat</Option>
          <Option value="a-level">a-level</Option>
        </Select>

        <label>Price</label>
        <Input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          style={{ marginBottom: "10px" }}
        />

        <label>IsPopular</label>
        <Checkbox
          checked={formData.isPopular}
          onChange={(e) => handleChange("isPopular", e.target.checked)}
          style={{ marginBottom: "10px" }}
        >
          Popular Course
        </Checkbox>

        <label>Type</label>
        <Select
          placeholder="Select Type"
          value={formData.type}
          onChange={(value) => handleChange("type", value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <Option value="standard">standard</Option>
          <Option value="premium">premium</Option>
        </Select>
        
        <label>CourseHours</label>
        <Input
          type="number"
          placeholder="Course Hours"
          value={formData.courseHours}
          onChange={(e) => handleChange("courseHours", Number(e.target.value))}
          style={{ marginBottom: "10px" }}
        />

        <label>FullDescription</label>
        <Input.TextArea
          placeholder="Full Description"
          value={formData.fullDescription}
          onChange={(e) => handleChange("fullDescription", e.target.value)}
          rows={4}
          style={{ marginBottom: "10px" }}
        />

        <label>ShortDescription</label>
        <Input.TextArea
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={(e) => handleChange("shortDescription", e.target.value)}
          rows={2}
          style={{ marginBottom: "10px" }}
        />

        <label>SubjectName</label>
        <Select
          placeholder="Select Subject"
          value={formData.subjectName}
          onChange={(value) => handleChange("subjectName", value)}
          style={{ width: "100%" }}
        >
          <Option value="TGAT1">TGAT1</Option>
          <Option value="TGAT2">TGAT2</Option>
          <Option value="TGAT3">TGAT3</Option>
          <Option value="TPAT1">TPAT1</Option>
          <Option value="TPAT2">TPAT2</Option>
          <Option value="TPAT3">TPAT3</Option>
          <Option value="TPAT4">TPAT4</Option>
          <Option value="TPAT5">TPAT5</Option>
          <Option value="A-LEVEL PHYSICS">A-LEVEL PHYSICS</Option>
          <Option value="A-LEVEL MATH1">A-LEVEL MATH1</Option>
          <Option value="A-LEVEL MATH2">A-LEVEL MATH2</Option>
          <Option value="A-LEVEL CHEMISTRY">A-LEVEL CHEMISTRY</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default Admin;