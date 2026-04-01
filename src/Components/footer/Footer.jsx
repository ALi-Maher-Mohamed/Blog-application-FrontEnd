const Footer = () => {
  return <footer style={styles}>Copyright 2024 &copy; Blog</footer>;
};

const styles = {
  color: "var(--text-secondary)",
  fontSize: "14px",
  fontWeight: "500",
  backgroundColor: "var(--surface-color)",
  borderTop: "1px solid var(--border-color)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
  transition: "background-color 0.3s ease, color 0.3s ease",
};

export default Footer;
