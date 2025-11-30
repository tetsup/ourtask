import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { LogElement } from './LogElement';

type LogViewerProps = {
  logs: any[];
};
export const LogViewer = ({ logs }: LogViewerProps) => {
  return (
    <>
      {logs.map((log, index) => (
        <SimpleTreeView key={index}>
          <LogElement root log={log} />
        </SimpleTreeView>
      ))}
    </>
  );
};
