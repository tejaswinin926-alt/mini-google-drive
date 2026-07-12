import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Upload from "../components/Upload";
import MyFiles from "../components/MyFiles";

import "../styles/Dashboard.css";

function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUploadSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard">

      <Navbar
        username={user.username}
        onLogout={handleLogout}
      />

      <div className="dashboard-body">

        <Sidebar />

        <main className="dashboard-main">

          <section className="welcome-card">

            <h1>
              Welcome back, {user.username} 👋
            </h1>

            <p>
              Store, organize and access your files anywhere.
            </p>

          </section>

          <section className="storage-card">

            <div className="storage-header">

              <h3>Storage</h3>

              <span>250 MB / 1 GB</span>

            </div>

            <div className="storage-bar">

              <div className="storage-progress"></div>

            </div>

          </section>

          <Upload
            onUploadSuccess={handleUploadSuccess}
          />

          <MyFiles
            refreshTrigger={refreshTrigger}
          />

        </main>

      </div>

    </div>
  );
}

export default Dashboard;