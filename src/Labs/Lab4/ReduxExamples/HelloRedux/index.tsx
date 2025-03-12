import { useSelector } from "react-redux";

export default function HelloRedux() {
  const { message } = useSelector((state: any) => state.helloReducer);

  return (
    <div id="wd-hello-redux" style={styles.container}>
      <h3 style={styles.heading}>Hello Redux</h3>
      <h4 style={styles.message}>{message}</h4>
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
    fontSize: "22px",
    fontWeight: "bold",
  },
  message: {
    fontSize: "18px",
    color: "#007bff",
    margin: "10px 0",
  },
  hr: {
    marginTop: "20px",
    border: "1px solid #ddd",
  },
};
