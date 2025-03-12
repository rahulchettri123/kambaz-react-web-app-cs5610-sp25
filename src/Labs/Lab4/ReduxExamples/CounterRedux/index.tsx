import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";

export default function CounterRedux() {
  const { count } = useSelector((state: any) => state.counterReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-counter-redux" style={styles.container}>
      <h2 style={styles.heading}>Counter Redux</h2>
      <h3 style={styles.counter}>{count}</h3>
      <div style={styles.buttonContainer}>
        <button onClick={() => dispatch(increment())} style={styles.incrementBtn}>
          Increment
        </button>
        <button onClick={() => dispatch(decrement())} style={styles.decrementBtn}>
          Decrement
        </button>
      </div>
      <hr style={styles.hr} />
    </div>
  );
}

// Inline Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    
  },
  heading: {
    color: "#333",
    marginBottom: "10px",
  },
  counter: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  incrementBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  decrementBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  hr: {
    marginTop: "20px",
    border: "1px solid #ddd",
  },
};
