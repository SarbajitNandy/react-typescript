import * as React from "react";
import { Announced } from "@fluentui/react/lib/Announced";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
const FluentTable = ({ onClick }: { onClick: Function }) => {
  const columns: IColumn[] = [
    {
      key: "name",
      name: "Name",
      fieldName: "fullName",
      minWidth: 50,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "class",
      name: "Class",
      fieldName: "class",
      minWidth: 10,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "roll",
      name: "Roll number",
      fieldName: "roll",
      minWidth: 10,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "Action",
      name: "Action",
      minWidth: 10,
      maxWidth: 200,
      isResizable: true,
      onRender: (item: any) => {
        return <button onClick={() => onClick(item)}>Show</button>;
      },
    },
  ];

  const items = [
    { fullName: "Sarbajit Nandy", class: "Grad", roll: 19, key: 1 },
    { fullName: "Shalmoli Neogi", class: "Grad", roll: 20, key: 2 },
    { fullName: "Supriya Kundu", class: "Grad", roll: 21, key: 3 },
  ];
  return (
    <div>
      <DetailsList
        items={items}
        columns={columns}
        compact={true}
        onItemInvoked={(item) => {
          onClick(item);
        }}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default FluentTable;
