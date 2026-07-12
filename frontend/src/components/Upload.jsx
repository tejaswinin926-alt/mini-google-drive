import { useState } from "react";
import "../styles/upload.css";

const API_URL = "http://localhost:5000/api";

function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setFile(null);

      if (onUploadSuccess) {
        onUploadSuccess();
      }

      alert("✅ File uploaded successfully!");

      const input = document.getElementById("upload-input");
      if (input) input.value = "";

    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-card">

      <div className="upload-header">
        <h2>Upload Files</h2>
        <p>Securely upload your files to Mini Drive.</p>
      </div>

      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}

      <form onSubmit={handleUpload}>

        <label className="upload-box">

          <input
            id="upload-input"
            type="file"
            onChange={handleFileChange}
            hidden
          />

          <div className="upload-icon">
            ☁️
          </div>

          <h3>Select File</h3>

          <p>
            Click here to choose a file
          </p>

        </label>

        {file && (
          <div className="selected-file">
            📄 {file.name}
          </div>
        )}

        <button
          className="upload-btn"
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

      </form>

    </div>
  );
}

export default Upload;