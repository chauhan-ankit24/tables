import { observer } from "mobx-react";
import { tableStore } from "./stores/TableStore";
import Table from "./components/Table/Table";
import TableMainHeader from "./components/TableMainHeader/TableMainHeader";
import "./components/Table/Table.css";
import "./App.css";

const App = observer(() => {
  return (
    <div className="App">
      <TableMainHeader />
      <Table columns={tableStore.columns} data={tableStore.data} />
    </div>
  );
});

export default App;
