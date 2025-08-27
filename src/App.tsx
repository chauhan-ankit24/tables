import { observer } from "mobx-react";
import { tableStore } from "./stores/TableStore";
import Table from "./components/Table/Table";
import TableMainHeader from "./components/TableMainHeader/TableMainHeader";
import "./components/Table/Table.css";
import "./App.css";

const App = observer(() => {
  return (
    <div className="App">
      <div className="table-container">
        <TableMainHeader />
        <Table columns={tableStore.columns} data={tableStore.data} />
      </div>
    </div>
  );
});

export default App;
