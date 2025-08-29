import { observer } from "mobx-react";
import { tableStore } from "./stores/TableStore";
import Table from "./components/Table/Table";
import MainHeader from "./components/MainHeader/MainHeader";
import "./App.scss";

const App = observer(() => {
  return (
    <div className="App">
      <MainHeader />
      <Table columns={tableStore.columns} data={tableStore.data} />
    </div>
  );
});

export default App;
