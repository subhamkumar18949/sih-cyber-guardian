import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    _id: "671e...",
    timestamp: "2025-10-14T12:30:00.123Z",
    inputType: "Text",
    content: "This is a threatening message...",
    content_hash: "a1b2c3d4...",
    analysis: {
      is_threat: true,
      ai_generated_score: 0.1,
      toxicity_score: 0.98,
    },
    blockchain_hash: "0x123abc...",
  },
  {
    _id: "671f...",
    timestamp: "2025-10-14T12:29:00.456Z",
    inputType: "Image",
    content: "uploads/1760421540_dragon.jpg",
    content_hash: "e5f6g7h8...",
    analysis: {
      is_threat: true,
      ai_semantic_score: 0.95,
    },
    blockchain_hash: "0x456def...",
  },
];

function App() {
  const handleBackClick = () => {
    // You can replace this with a real navigation using react-router or Next.js router
    alert("Going back to dashboard...");
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1 style={styles.heading}>Threat Analysis Dashboard</h1>
       
         <Link to="/">
     <button style={styles.button} onClick={handleBackClick}>Back to dasboard</button>
    </Link>
      
      </div>

      {data.map((item) => (
        <div
          key={item._id}
          style={{
            ...styles.card,
            borderColor: item.analysis.is_threat ? "#ff4d4d" : "#4caf50",
          }}
        >
          <p>
            <strong>ID:</strong> {item._id}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(item.timestamp).toLocaleString()}
          </p>
          <p>
            <strong>Input Type:</strong> {item.inputType}
          </p>

          {item.inputType === "Text" ? (
            <p style={styles.content}>
              <strong>Content:</strong> {item.content}
            </p>
          ) : (
            <div>
              <strong>Image:</strong>
              <br />
              <img
                src={item.content}
                alt="Uploaded content"
                style={styles.image}
              />
            </div>
          )}

          <div style={styles.analysis}>
            <strong>Analysis:</strong>
            <pre style={styles.pre}>{JSON.stringify(item.analysis, null, 2)}</pre>
          </div>

          <p>
            <strong>Blockchain Hash:</strong> {item.blockchain_hash}
          </p>
        </div>
      ))}
    </div>
  );
}

// CSS styles
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#0a1f44", // dark blue
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  heading: {
    color: "#00d4ff",
    margin: 0,
  },
  button: {
    backgroundColor: "#00d4ff",
    color: "#0a1f44",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s, background-color 0.2s",
  },
  card: {
    backgroundColor: "#112b55",
    border: "2px solid",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
    transition: "transform 0.2s",
  },
  content: {
    color: "#ffcccc",
  },
  image: {
    maxWidth: "250px",
    borderRadius: "8px",
    marginTop: "5px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
  },
  analysis: {
    marginTop: "10px",
    backgroundColor: "#0f3b6c",
    padding: "10px",
    borderRadius: "8px",
  },
  pre: {
    color: "#00ffea",
    overflowX: "auto",
  },
};

export default App;