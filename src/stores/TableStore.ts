import { observable, action, decorate } from 'mobx';

export class TableStore {
  columns: string[] = [
    'Name',
    'Directory',
    'Interval',
    'Quota',
    'Owner',
    'Events',
    'Last Run',
    'Recursive',
    'Tags',
    'Trading Partner',
  ];
  data: Array<Record<string, any>> = [
    {
      Name: 'Test',
      Directory: '/',
      Interval: '600 Sec',
      Quota: '',
      Owner: '',
      Events: 'Add, Change, Delete...',
      'Last Run': '17/09/2024, 17:05:14',
      Recursive: 'true',
      Tags: '',
      'Trading Partner': 'REST',
    },
    {
      Name: 'Test 2',
      Directory: '/usr/file2',
      Interval: '600 Sec',
      Quota: '',
      Owner: '',
      Events: 'Add',
      'Last Run': '22/07/2023, 13:20:53',
      Recursive: 'true',
      Tags: '',
      'Trading Partner': 'REST'
    },
    {
      Name: 'Test',
      Directory: '/Users/ankit/some/test/ka/Directory',
      Interval: '600 Sec',
      Quota: '',
      Owner: '',
      Events: 'Add',
      'Last Run': '17/09/2024, 17:05:14',
      Recursive: 'true',
      Tags: '',
      'Trading Partner': 'REST'
    }
  ];

  addRow = (row: Record<string, any>) => {
    this.data.push(row);
  }
}

decorate(TableStore, {
  columns: observable,
  data: observable,
  addRow: action,
});

export const tableStore = new TableStore();
