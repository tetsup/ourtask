import { TreeItem } from '@mui/x-tree-view';

type LogElementProps =
  | {
      root: true;
      log: any;
      name?: undefined;
      itemId?: undefined;
      parents?: undefined;
    }
  | {
      root?: false;
      log: any;
      name: string | number;
      itemId: string;
      parents: any[];
    };

export const LogElement = ({
  root,
  log,
  itemId,
  parents,
  name,
}: LogElementProps) => {
  const keyString = root ? '' : `${name}: `;
  return parents?.some((parent) => parent === log) ? (
    <TreeItem itemId={itemId ?? 'root'} label={`${keyString}[Circular]`} />
  ) : Array.isArray(log) ? (
    <TreeItem itemId={itemId ?? 'root'} label={`${keyString}[Array]`}>
      {log.map((childValue, index) => (
        <LogElement
          key={index}
          name={index}
          log={childValue}
          itemId={`${itemId}.${index}`}
          parents={[...(parents ?? []), log]}
        />
      ))}
    </TreeItem>
  ) : typeof log === 'object' ? (
    <TreeItem itemId={itemId ?? 'root'} label={`${keyString}[Object]`}>
      {Object.entries(log).map(([childName, childValue]) => (
        <LogElement
          key={childName}
          name={childName}
          log={childValue}
          itemId={`${itemId}.${childName}`}
          parents={[...(parents ?? []), log]}
        />
      ))}
    </TreeItem>
  ) : (
    <TreeItem itemId={itemId ?? 'root'} label={`${keyString}${String(log)}`} />
  );
};
