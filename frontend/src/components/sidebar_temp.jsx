import {
  FaHome,
  FaFolderOpen,
  FaCloudUploadAlt,
  FaCog
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside style={styles.sidebar}>

      <h3 style={styles.heading}>
        Menu
      </h3>

      <div style={styles.menu}>

        <div style={styles.item}>
          <FaHome />
          <span>Dashboard</span>
        </div>

        <div style={styles.item}>
          <FaFolderOpen />
          <span>My Files</span>
        </div>

        <div style={styles.item}>
          <FaCloudUploadAlt />
          <span>Upload</span>
        </div>

        <div style={styles.item}>
          <FaCog />
          <span>Settings</span>
        </div>

      </div>

    </aside>
  );
}

const styles = {
  sidebar: {
    width: "230px",
    background: "#ffffff",
    minHeight: "100vh",
    padding: "25px 15px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.08)"
  },

  heading: {
    color: "#666",
    marginBottom: "25px"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    color: "#333"
  }
};

export default Sidebar;