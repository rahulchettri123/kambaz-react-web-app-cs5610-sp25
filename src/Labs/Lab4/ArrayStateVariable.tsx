import { useState } from "react";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index)); // ✅ Corrected filter logic
  };

  return (
    <div id="wd-array-state-variables" style={styles.container}>
      <h2 style={styles.heading}>Array State Variable</h2>
      <button onClick={addElement} style={styles.addButton}>Add Element</button>
      <ul style={styles.list}>
        {array.map((item, index) => (
          <li key={index} style={styles.listItem}>
            {item}
            <button onClick={() => deleteElement(index)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr style={styles.hr} />
    </div>
  );
}

// Inline Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
   
  },
  heading: {
    color: "#333",
    fontSize: "22px",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
    fontSize: "14px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    borderBottom: "1px solid #ddd",
    fontSize: "16px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "6px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  hr: {
    marginTop: "20px",
    border: "1px solid #ddd",
  },
};
