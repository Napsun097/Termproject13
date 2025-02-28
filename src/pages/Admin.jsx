import React, { useState, useEffect, useRef } from "react";
import "../style/admin.css";
import axios from "axios";
import { Button, Modal, Input, Upload, Select, Checkbox } from "antd";
import UserCard from "../Components/UserCard";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import AdminDashboard from "../Components/AdminDashboard"; // หรือที่คุณเก็บไฟล์ Dashboard


const { confirm } = Modal;

const Admin = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState("course");
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  // Reference to the dropdown for detecting outside clicks
  const [selectedFile, setSelectedFile] = useState(null);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // ✅ ตรวจสอบว่า User มี role เป็น Admin หรือไม่
    if (!storedUser || !storedUser.roles || !storedUser.roles.includes("Admin")) {
      navigate("/"); // 🔥 ถ้าไม่ใช่ Admin ให้กลับไปหน้า Home
    } else {
      // Set active tab to "dashboard" after loading the user
      setActiveTab("dashboard");
    }
  }, [navigate]);


  const [formData, setFormData] = useState({
    title: "",
    image: null,
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

  useEffect(() => {
    if (activeTab === "user") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const filteredUsers = response.data.filter((user) => user.roles === "User");

      setUsers(filteredUsers); // Set all users for now (before filtering)
    } catch (error) {
      console.error("Error fetching users!", error);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    setIsNavbarOpen(false); // Close navbar on logout
    navigate("/");
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);

    setFormData({
      title: course.title || "",
      image: course.image ? course.image.id : null,
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

  const handleAddClick = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      image: null,
      category: "",
      price: 0,
      isPopular: false,
      type: "",
      courseHours: 0,
      fullDescription: "",
      shortDescription: "",
      subjectName: "",
    });
    setAddModalOpen(true);
  }

  const handleAdd = async () => {
    console.log("Submitting formData:", { data: formData });
  
    // Sanitize formData: Convert empty strings to null
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) =>
        value === "" ? [key, null] : [key, value]
      )
    );
  
    try {
      // Step 1: Add the course without an image
      const response = await axios.post(
        "http://localhost:1337/api/courses",
        { data: sanitizedData }, // Use sanitized data
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
  
      console.log("Course added successfully:", response.data);
      const courseId = response.data.data.documentId; // Get the new course ID
  
      // Step 2: Upload image and update course
      const imageId = await handleFileUploadAdd();
      if (imageId) {
        await updateAddFile(courseId, imageId);
      }
  
      fetchCourses();
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingCourse) return;

    try {
      const updatedData = {
        data: {
          title: formData.title || null,
          category: formData.category || null,
          price: formData.price || null,
          isPopular: formData.isPopular || null,
          type: formData.type || null,
          courseHours: formData.courseHours || null,
          fullDescription: formData.fullDescription || null,
          shortDescription: formData.shortDescription || null,
          subjectName: formData.subjectName || null,
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

  const handleDeleteCourse = (course) => {
    setCourseToDelete(course);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      console.log("Deleting course:", courseToDelete.documentId);

      // 1️⃣ Delete Related `favorites`
      const favoriteRes = await axios.get(
        `http://localhost:1337/api/favorites?filters[course][documentId]=${courseToDelete.documentId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const favoriteItems = favoriteRes.data.data;
      await Promise.all(
        favoriteItems.map((fav) =>
          axios.delete(`http://localhost:1337/api/favorites/${fav.documentId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
        )
      );

      // 2️⃣ Delete Related `cart` Items
      const cartRes = await axios.get(
        `http://localhost:1337/api/carts?filters[course][documentId]=${courseToDelete.documentId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const cartItems = cartRes.data.data;
      await Promise.all(
        cartItems.map((cart) =>
          axios.delete(`http://localhost:1337/api/carts/${cart.documentId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
        )
      );

      // 3️⃣ Delete Course
      await axios.delete(`http://localhost:1337/api/courses/${courseToDelete.documentId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // ✅ Refresh Data
      fetchCourses();
      setDeleteModalOpen(false);
      setCourseToDelete(null);
      message.success("Course and related data deleted successfully!");
    } catch (error) {
      console.error("Error deleting course & related data:", error);
      message.error("Failed to delete course!");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      setSelectedFile(file);
    } else {
      alert("Please upload a PNG or JPEG file.");
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("files", selectedFile);

    axios.post("http://localhost:1337/api/upload", formData)
      .then(response => {
        console.log("Image uploaded successfully:", response.data);

        // Get the uploaded image ID
        const imageId = response.data[0].id;

        updateFile(imageId);
      })
      .catch(error => {
        console.error("Error uploading file:", error);
      });
  };

  const updateFile = (imageId) => {
    axios.put(`http://localhost:1337/api/courses/${editingCourse.documentId}`, {
      data: {
        image: [imageId],
      }
    },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        console.log("image updated successfully:", response.data);
        fetchCourses();
        setModalOpen(false);
      })
      .catch(error => {
        console.error("Error updating course:", error);
      });
  };

  const handleFileUploadAdd = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return null;
    }
  
    const formDataUpload = new FormData();
    formDataUpload.append("files", selectedFile);
  
    try {
      const response = await axios.post(
        "http://localhost:1337/api/upload",
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Image uploaded successfully:", response.data);
      return response.data[0].id; // Return uploaded image ID
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const updateAddFile = async (courseId, imageId) => {
    try {
      const response = await axios.put(
        `http://localhost:1337/api/courses/${courseId}`,
        {
          data: { image: [imageId] }, // Attach the uploaded image ID
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Image added to new course successfully:", response.data);
    } catch (error) {
      console.error("Error updating new course with image:", error);
    }
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="header-navbar">
          <h1>Admin</h1>
        </div>
        <ul className="sidebar-menu">
          <li className="dashboard-admin-link" onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </li>

          <li
            className={activeTab === "course" ? "active" : ""}
            onClick={() => setActiveTab("course")}
          >
            Course Mangement
          </li>
          <li
            className={activeTab === "user" ? "active" : ""}
            onClick={() => setActiveTab("user")}
          >
            User
          </li>
          <li className="back-home-btn" onClick={() => navigate("/")}>
            กลับหน้าเว็บไซต์
          </li>
        </ul>

      </div>

      {/* Main Content */}
      <div className="content">
        <nav className="navbar-admin">
          <div className="navbar-container">
            <div className="navbar-brand">
              <img src={logo} alt="Website Logo" className="logo-img" />
            </div>
            <div className="navbar-icons">
              {user ? (
                <div className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`} ref={dropdownRef}>
                  <button
                    className="profile-icon-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <img
                      src={user.profileImage ? user.profileImage : "/3135715.png"}
                      alt="Profile"
                      className="profile-image"
                    />
                    {user.username} <i className="fas fa-caret-down"></i>
                  </button>

                  <div className="profile-menu">
                    {user.roles && user.roles.includes("Admin") && (
                      <Link to="/" onClick={closeNavbar}>
                        <button className="admin-page-link">Home</button>
                      </Link>
                    )}
                    {user.roles && user.roles.includes("User") && (
                      <Link to="/payment" onClick={closeNavbar}>
                        <button className="payment-menu">ชำระเงิน</button>
                      </Link>
                    )}
                    <button className="logout-btn-navbar" onClick={handleLogout}>
                      ออกจากระบบ
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="nav-button login-btn" onClick={closeNavbar}>
                  เข้าสู่ระบบ
                </Link>
              )}
            </div>
          </div>

        </nav>
        {/* เพิ่มเงื่อนไขแสดงหน้า Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <AdminDashboard /> {/* นำเข้าและแสดงผลหน้า Dashboard */}
          </div>
        )}
        {activeTab === "course" && (
          <div>
            <h1 className="course-management-text">Course Management</h1>
            <Button type="primary" size="large" onClick={handleAddClick}>
              Add Course
            </Button>
            <div className="course-list-admin">
              {courses.length > 0 ? (
                courses.map((course) => {
                  // Extract attributes
                  const title = course.title;
                  const image = course.image;
                  const Hours = course.courseHours;
                  const shortDescription = course.shortDescription;

                  // ✅ Extract large image URL
                  const imageUrl = course.image?.formats?.large?.url
                    || course.image?.formats?.medium?.url
                    || course.image?.formats?.small?.url
                    || course.image?.url
                    ? `http://localhost:1337${course.image.url}`
                    : null;


                  return (
                    <div key={course.id} className="course-card-admin">
                      {/* แถวบน: รูปภาพ + คำอธิบาย */}
                      <div className="content-card">
                        <div className="image-card">
                          {imageUrl ? (
                            <img src={imageUrl} alt={title} className="course-image-admin" />
                          ) : (
                            <p>No Image Available</p>
                          )}
                        </div>
                        <div className="describe-card">
                          <h3 className="head-text-card-admin">{title}</h3>
                          <p className="short-describe">{shortDescription}</p>
                          <p className="course-hours-admin"> {Hours} ชั่วโมง</p>
                          <div className="type-course-admin">
                            <p>premium</p>
                          </div>
                        </div>
                      </div>

                      {/* แถวล่าง: ปุ่ม Edit & Delete */}
                      <div className="edit-delete-btn">
                        <button className="edit-button" onClick={() => handleEditClick(course)}>
                          Edit
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteCourse(course)}>
                          Delete
                        </button>
                      </div>
                    </div>

                  );
                })
              ) : (
                <p>Loading courses...</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "user" && (
          <div>
            <h1>User Management</h1>
            <div className="user-list">
              {users.map((user) => (
                <div key={user.documentId} className="user-item" onClick={() => setSelectedUser(user)}>
                  {user.username}
                </div>
              ))}
            </div>
            {selectedUser && (
              <UserCard
                user={selectedUser}
                onUserDeleted={(deletedUserId) => {
                  setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.documentId !== deletedUserId)
                  );
                  setSelectedUser(null); // Reset selected user after deletion
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Ant Design Modal for Editing */}
      <Modal title="Edit Course" open={modalOpen} onOk={() => {
        handleSave();
        handleFileUpload();
      }} onCancel={() => setModalOpen(false)}>
        <label>Course Title</label>
        <Input
          placeholder="Course Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <label>Image</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="file-input"
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
      <Modal
        title="Delete Course"
        open={deleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this course?</p>
        <p>This will also delete related favorites and cart items.</p>
      </Modal>
      <Modal
        title="Add Course"
        open={addModalOpen}
        onOk={handleAdd}
        onCancel={() => setAddModalOpen(false)}
      >

        <label>Course Title</label>
        <Input
          placeholder="Course Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        <label>Image</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="file-input"
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