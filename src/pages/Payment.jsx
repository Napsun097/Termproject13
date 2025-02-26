import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qrCode from "../assets/images/65634599-3898-49a9-976b-ae9b7203be52.jpg";
import "../style/payment.css"; // Import external CSS file
import axios from 'axios';

function Payment() {
  const [qrUrl, setQrUrl] = useState(qrCode);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    // Fetch the cart ID first (you may need to replace the URL to match your API)
    axios.get("http://localhost:1337/api/carts")
      .then(response => {
        if (response.data.data.length > 0) {
          setCartId(response.data.data[0].documentId); // Assuming you're working with the first cart item
        }
      })
      .catch(error => console.error("Error fetching cart ID:", error));
  }, []);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedFile(file);
    } else {
      alert("Please upload a PNG or JPEG file.");
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

        // Now, associate the image with the payment entry
        updatePayment(imageId);
        moveToSoldCollection();
      })
      .catch(error => {
        console.error("Error uploading file:", error);
      });
  };

  const moveToSoldCollection = async () => {
    try {
      // Fetch latest cart data with related course and user info
      const cartResponse = await axios.get(`http://localhost:1337/api/carts?populate[course][populate]=*`);
      console.log("Full API Response:", cartResponse);
      const cartItems = Array.isArray(cartResponse.data.data) ? cartResponse.data.data : [];

      for (const cartItem of cartItems) {
        const course = cartItem.course;
        console.log("Cart Items to Move:", cartItems);
      await axios.post("http://localhost:1337/api/solds", {
        data: {
          title: course.title,
          category: course.category,
          price: course.price,
          isPopular: course.isPopular,
          type: course.type,
          courseHours: course.courseHours,
          fullDescription: course.fullDescription,
          shortDescription: course.shortDescription,
          subjectName: course.subjectName,
          image: [course.image.id],
        }
      });

      console.log(`Moved cart item ${cartItem.documentId} to Sold collection.`);
    }
      await deleteAllCartItems();
    } catch (error) {
      console.error("Error moving item to Sold collection:", error);
    }
  };

  const deleteAllCartItems = async () => {
    try {
      // Fetch all cart items
      const cartResponse = await axios.get("http://localhost:1337/api/carts");
      const cartItems = cartResponse.data.data; // Extract cart items
  
      // Loop through each cart item and delete it
      for (const cartItem of cartItems) {
        await axios.delete(`http://localhost:1337/api/carts/${cartItem.documentId}`);
        console.log(`Deleted cart item with ID: ${cartItem.documentId}`);
      }
  
      console.log("All cart items deleted successfully.");
    } catch (error) {
      console.error("Error deleting all cart items:", error);
    }
  };

  // Function to update the Payment entry with the uploaded image
  const updatePayment = (imageId) => {
    axios.post("http://localhost:1337/api/payment-qrs", {
      data: {
        Qr: [imageId],
      }
    }
    )
      .then(response => {
        console.log("Payment updated successfully:", response.data);
        alert("Payment proof submitted! You'll be redirected to the home page shortly after pressing an OK Button.");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(error => {
        console.error("Error updating payment:", error);
      });
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>

      {/* QR Code Display */}
      {qrUrl && <img src={qrUrl} alt="QR Code" className="qr-image" />}

      {/* File Upload Section */}
      <div className="upload-section">
        <h2>Upload Payment Proof (PNG/JPEG)</h2>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="file-input"
        />

        {selectedFile && (
          <div className="file-actions">
            <p>Selected file: {selectedFile.name}</p>

            <button onClick={handleFileDelete} className="delete-button">
              Delete
            </button>

            <button onClick={handleFileUpload} className="upload-button">
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Home Button */}
      <button onClick={() => navigate("/")} className="home-button">
        Go to Home
      </button>
    </div>
  );
}

export default Payment;