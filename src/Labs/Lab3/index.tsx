import VariablesAndConstants
  from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import TernaryOperator from "./TernaryOperator";
import ImpliedReturn from "./ImpliedReturn";
import IfElseComponent from "./IfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import BooleanVariables from "./BooleanVariables";
import ArrowFunctions from "./ArrowFunctions";
import LegacyFunctions from "./LegacyFunctions";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import MapFunction from "./MapFunction";
import ForLoops from "./ForLoops";
import FindFunction from "./FindFunction";
import FilterFunction from "./FilterFunction";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import House from "./House";
import JsonStringify from "./JsonStringify";

import TodoList from "./todos/TodoList";
import Spreading from "./Spreading";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";

export default function Lab3() {
  return(
    <div id="wd-lab3">
      <h3>Lab 3</h3>
      <VariablesAndConstants/>
      <VariableTypes />
      <TernaryOperator />
      <LegacyFunctions />
      <ImpliedReturn />
      <IfElseComponent />
      <ConditionalOutputInline />
      <ConditionalOutputIfElse />
      <BooleanVariables />
      <ArrowFunctions />
      <TemplateLiterals />
      <SimpleArrays />
      <MapFunction />   
      <ForLoops />
      <FindFunction />
      <FilterFunction />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <House />
      <JsonStringify />
      <TodoList />
    <Spreading />
    <Destructing />
    <FunctionDestructing />
    <DestructingImports />
    <Classes />
    <Add a={3} b={4} />
    <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />

     <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
     <PathParameters />

    </div>
);}
