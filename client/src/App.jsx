import { Fragment, useState } from "react";
// style file
import "./App.css";
// components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  const [des, setDes] = useState("");
  return (
    <Fragment>
      <div className="container">
        <InputTodo getDescription={setDes} />
        <ListTodos description={des} callBack={setDes} />
      </div>
    </Fragment>
  );
}

export default App;
