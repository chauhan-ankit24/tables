import { observer } from "mobx-react";
import Table from "./components/Table/Table";
import MainHeader from "./components/MainHeader/MainHeader";
import "./App.scss";

const App = observer(() => {
  return (
    <div className="App">
      <MainHeader />
      <Table />
    </div>
  );
});

export default App;
