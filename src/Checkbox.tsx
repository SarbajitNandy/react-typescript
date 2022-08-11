const CheckBox = ({ label, name, onChange, checked }:any) => {
  // console.log("render");
  return (
    <>
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        checked={checked}
      />{" "}
      {label}
      <br />
      {/* {isChecked && details.children !== undefined
        ? renderChildren(details.name, details.children)
        : null} */}
    </>
  );
};
export default CheckBox;
