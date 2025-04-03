import { useState } from "react";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <input
        defaultValue={a}
        className="form-control mb-2"
        type="number"
        onChange={(e) => setA(e.target.value)}
      />
      <input
        defaultValue={b}
        className="form-control mb-2"
        type="number"
        onChange={(e) => setB(e.target.value)}
      />
      <a
        className="btn btn-primary me-2"
        href={`${REMOTE_SERVER}/Lab5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}{" "}
      </a>
      <a
        className="btn btn-danger me-2"
        href={`${REMOTE_SERVER}/Lab5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Substract {a} - {b}{" "}
      </a>
      <a
        className="btn btn-success me-2"
        href={`${REMOTE_SERVER}/Lab5/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} * {b}{" "}
      </a>
      <a
        className="btn btn-warning me-2"
        href={`${REMOTE_SERVER}/Lab5/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Divide {a} / {b}{" "}
      </a>
      <hr />
    </div>
  );
}
