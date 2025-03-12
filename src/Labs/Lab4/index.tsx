import { useState } from "react";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ChildStateComponent from "./ChildStateComponent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import HandlingClickEvent from "./HandlingClickEvent";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples";
import StringStateVariables from "./StringStateVariables";


export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  const [counter, setCounter] = useState(0);

  return (
    
    <div id="wd-passing-functions">
      <h2>Lab 4</h2>
      
      <br />
      <HandlingClickEvent/>
      <br />
      <PassingDataOnEvent/>
      <br />
      <PassingFunctions theFunction={sayHello} />
      <br />
      <Counter/>
      <br />
      <BooleanStateVariables/>
      <br />
      <StringStateVariables/>
      <br />
      <DateStateVariable/>
      <br />
      <ObjectStateVariable/>
      <br />
      <ArrayStateVariable/>
      <br />
      <ParentStateComponent/>
      <ChildStateComponent counter={counter} setCounter={setCounter} />
      <br />
      <ReduxExamples/>
    </div>
    
  );
}
