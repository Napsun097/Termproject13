import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [qrUrl, setQrUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://your-strapi-url.com/api/upload/files?filters[name][$eq]=qr.png") // Adjust Strapi asset endpoint
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setQrUrl(data[0].url);
        }
      })
      .catch((error) => console.error("Error fetching QR code:", error));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      setSelectedFile(file);
    } else {
      alert("Please upload a PNG file.");
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    document.querySelector("input[type=file]").value = "";
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Payment</h1>
      {qrUrl && <img src={qrUrl} alt="QR Code" style={{ width: 200, height: 200, marginBottom: "20px" }} />}
      <div>
        <h2>Upload PNG</h2>
        <input type="file" accept="image/png" onChange={handleFileChange} style={{ marginBottom: "10px" }} />
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
            <button 
              onClick={handleFileDelete}
              style={{ 
                backgroundColor: "#f44336", 
                color: "white", 
                padding: "8px 16px", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer", 
                marginTop: "10px",
                transition: "background-color 0.3s ease"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <button 
        onClick={() => navigate("/")}
        style={{ 
          backgroundColor: "#4CAF50", 
          color: "white", 
          padding: "12px 24px", 
          fontSize: "16px",
          border: "none", 
          borderRadius: "8px", 
          cursor: "pointer", 
          marginTop: "20px",
          transition: "background-color 0.3s ease",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
      >
        Go to Home
      </button>
    </div>
  );
}

export default Payment;
