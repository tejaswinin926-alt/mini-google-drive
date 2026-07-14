import { FaCloud, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

function Navbar({ username, onLogout }) {
  return (
    <header style={styles.header}>
      <div style={styles.logoSection}>
        <FaCloud size={28} color="#4285F4" />
        <h2 style={styles.logoText}>Mini Drive</h2>
      </div>

      <div style={styles.userSection}>
        <FaUserCircle size={22} color="#666" />

        <span style={styles.username}>
          {username}
        </span>

        <button
          onClick={onLogout}
          style={styles.logout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  logoText: {
    margin: 0,
    color: "#333"
  },

  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  username: {
    fontWeight: "600"
  },

  logout: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Navbar;