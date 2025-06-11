export const Card = ({ children }) => (
  <div style={{
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div style={{ padding: "8px 0" }}>
    {children}
  </div>
);
