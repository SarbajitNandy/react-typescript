import CheckBox from "./Checkbox";
import { ICheckBoxTreeProps, IOption } from "./Types";


const CheckBoxTree = ({ details, onChangeFn, isOptionCheckedFn } : ICheckBoxTreeProps) => {
  const isChecked = isOptionCheckedFn(details.value);
  const renderChildren = (children:IOption[]) => {
    return (
      <div className="ps-4">
        {children.map((item, idx) => (
          <CheckBoxTree
            details={item}
            key={`ck${idx}`}
            onChangeFn={onChangeFn}
            isOptionCheckedFn={isOptionCheckedFn}
          />
        ))}
      </div>
    );
  };

  
  return (
    <>
      <CheckBox
        label={details.text}
        name={details.groupName}
        onChange={()=>onChangeFn(details.value)}
        checked={isChecked}
      />
      {isChecked && details.children && details.children !== []
        ? renderChildren(details.children)
        : null}
    </>
  );
};
export default CheckBoxTree;
