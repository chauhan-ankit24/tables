import { observer } from "mobx-react";
import { tableStore } from "./stores/TableStore";
import Table from "./components/Table/Table";
import TableHeader from "./components/TableHeader/TableHeader";
import DirectoryMonitorModal from "./components/DirectoryMonitorModal/DirectoryMonitorModal";
import { modalStore } from "./stores/ModalStore";
import "./components/Table/Table.css";
import "./App.css";

const App = observer(() => {
  return (
    <div className="App">
      <DirectoryMonitorModal
        isOpen={modalStore.isDirectoryMonitorModalOpen}
        onClose={modalStore.closeDirectoryMonitorModal}
      />
      <div className="table-container">
        <TableHeader />
        <Table columns={tableStore.columns} data={tableStore.data} />
      </div>
    </div>
  );
});

export default App;
