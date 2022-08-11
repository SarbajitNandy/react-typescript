import { useEffect, useState } from "react";
import "./App.css";

import CheckBoxTree from "./CheckboxHierarchy";
import { IOption, BaseProps } from "./Types";

import {
  Modal,
  FontWeights,
  getTheme,
  IButtonStyles,
  IconButton,
  IIconProps,
  IStackProps,
  mergeStyleSets,
  Checkbox,
  TextField,
} from "@fluentui/react";

import { useId, useBoolean } from "@fluentui/react-hooks";
import FluentTable from "./Table";

const cancelIcon: IIconProps = { iconName: "Cancel" };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});
const stackProps: Partial<IStackProps> = {
  horizontal: true,
  tokens: { childrenGap: 40 },
  styles: { root: { marginBottom: 20 } },
};
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

const ModalDetails = ({
  actionData,
  onClose,
}: {
  actionData: any;
  onClose: Function;
}) => {
  const [
    isResubmissionRequired,
    { toggle: toggleResubmissionRequired, setTrue, setFalse },
  ] = useBoolean(false);
  const [reSubFields, setReSubField] = useState<any>({});
  // const { message, fields } = actionData;
  const { fullName, roll } = actionData;
  const message = fullName;
  const fields = roll;
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(true);
  const titleId = useId(message);

  const [newValues, setNewValues] = useState<any>({});

  // FIXME : Not required for PM dashboard
  const handleChange = (name: string) => (event: any) => {
    console.log(name, event.target.value);

    setNewValues((pre: any) => {
      return { ...pre, name: event.target.value };
    });
  };

  const handleCheckBox = (name: any) => (event: any) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // TODO : save in state
      setReSubField((pre: any) => {
        return {
          ...pre,
          [name]: {
            fieldName: name,
            oldValue: actionData[name],
          },
        };
      });
    } else {
      // TODO : Remove for state
      setReSubField((pre: any) => {
        let v = { ...pre };
        delete v[name];
        return v;
      });
    }
  };

  const addComment = (name: any) => (event: any) => {
    setReSubField((pre: any) => {
      return { ...pre, [name]: { ...pre[name], comment: event.target.value } };
    });
  };

  return (
    <Modal
      titleAriaId={titleId}
      isOpen={isModalOpen}
      onDismiss={hideModal}
      isBlocking={false}
      isModeless={true}
      isDarkOverlay={false}
      containerClassName={contentStyles.container}
    >
      <div className={contentStyles.header}>
        <span id={titleId}>{message}</span>
        <IconButton
          styles={iconButtonStyles}
          iconProps={cancelIcon}
          ariaLabel="Close popup modal"
          onClick={() => {
            hideModal();
            onClose();
          }}
        />
      </div>
      <div className={contentStyles.body}>
        {Object.entries(actionData).map((item: any) => (
          <>
            {isResubmissionRequired ? (
              <Checkbox onChange={handleCheckBox(item[0])} />
            ) : null}
            <TextField label={item[0]} readOnly defaultValue={item[1]} />
            {reSubFields[item[0]] !== undefined && (
              <TextField
                placeholder="Please add your comment"
                required
                onChange={addComment(item[0])}
              />
            )}
            <br />
          </>
        ))}

        <button
          onClick={() => {
            setTrue();
          }}
        >
          Resubmission Required
        </button>
        {Object.keys(reSubFields).length > 0 && (
          <button
            onClick={() => {
              console.log(reSubFields);
              console.log(Object.values(reSubFields));
            }}
          >
            Ask for Resubmission
          </button>
        )}
      </div>
    </Modal>
  );
};

const Actions = ({ pendingActions }: BaseProps) => {
  const [selectedAction, setAction] = useState<any | undefined>(undefined);
  const handleRowClick = (item: any) => {
    console.log(item);

    setAction(item);
  };
  return (
    <div>
      <h2>Pending Actions</h2>
      <FluentTable onClick={handleRowClick} />

      {selectedAction && (
        <ModalDetails
          actionData={selectedAction}
          onClose={() => setAction(undefined)}
        />
      )}
      {selectedAction && (
        <div>
          {selectedAction.fullName}
          <button onClick={() => setAction(undefined)}>Close</button>
        </div>
      )}
    </div>
  );
};

function App({ ...props }) {
  const options: IOption[] = [
    {
      name: "op1",
      value: "op1",
      groupName: "grp1",
      text: "Option 1",
      children: [
        {
          name: "op11",
          value: "op11",
          groupName: "cOp1",
          text: "Child 1",
          children: [
            {
              name: "op111",
              value: "op111",
              groupName: "cp22",
              text: "Child C 1",
            },
            {
              name: "op112",
              value: "op112",
              groupName: "cp22",
              text: "Child C 2",
            },
          ],
        },
        {
          name: "op12",
          value: "op12",
          groupName: "cOp1",
          text: "Child 2",
        },
      ],
    },
    {
      name: "op2",
      value: "op2",
      groupName: "grp1",
      text: "Option 2",
      children: [
        {
          name: "op21",
          value: "op21",
          groupName: "cp2",
          text: "Child 1",
        },
        {
          name: "op22",
          value: "op22",
          groupName: "cp2",
          text: "Child 2",
        },
      ],
    },
  ];

  const [selecteOptions, setSelecteOptions] = useState<string[]>([]);
  // const [selecteOptions, setSelecteOptions] = useState<string[]>(["op1","op2","op11","op112"]);

  useEffect(() => {
    setTimeout(() => setSelecteOptions(["op1", "op2", "op22", "op11"]), 2000);
  }, []);

  const onSelectChange = (name: string) => {
    setSelecteOptions((pre) => {
      if (pre && pre.find((item) => item === name)) {
        return pre.filter((item) => item !== name);
      } else {
        return [...pre, name];
      }
    });
  };

  const isOptionChecked = (name: string) =>
    selecteOptions.find((i) => i === name) ? true : false;

  const pendingActions = [
    {
      message: "Email Resubmission required",
      fields: [
        { fieldName: "Email", oldValue: "sarbajit@gmail.com" },
        { fieldName: "Name", oldValue: "Sarbajit" },
      ],
    },
    {
      message: "Full name Resubmission required",
      fields: [
        { fieldName: "FirstName", oldValue: "Sarbajit" },
        { fieldName: "LastName", oldValue: "Nandy" },
      ],
    },
  ];

  return (
    <>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ">
            <h1>Sarbajit Nandy</h1>

            {options.map((item: IOption) => (
              <CheckBoxTree
                details={item}
                onChangeFn={onSelectChange}
                isOptionCheckedFn={isOptionChecked}
              />
            ))}

            <p>{JSON.stringify(selecteOptions)}</p>
          </div>
          <div className="ms-Grid-col" style={{ float: "left" }}></div>
        </div>
      </div>

      {/* <div>
        <FluentTable />
      </div> */}
      <Actions pendingActions={pendingActions} />
      <Tvs />
    </>
  );
}

export default App;

const Tvs = () => {
  const data = {
    fullName: { fullName: "Sarbajit Nandy", isEditable: true },
    class: { class: "Grad", isEditable: false },
    roll: { roll: 19, isEditable: true },
  };

  const reform = Object.values(data).filter((item) => item.isEditable);
  console.log(reform);

  return (
    <>
      <p> Before : {JSON.stringify(data, undefined, 2)}</p>
      <p> After : {JSON.stringify(reform, undefined, 2)}</p>
    </>
  );
};
