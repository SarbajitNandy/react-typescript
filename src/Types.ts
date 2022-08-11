export interface IOption {
  name: string;
  groupName: string;
  text: string;
  value: string;
  children?: IOption[];
}

export interface ICheckBoxTreeProps {
  details: IOption;
  onChangeFn: Function;
  isOptionCheckedFn: Function;
}

export interface Action {
  message: string;
  fields: { fieldName: string; oldValue: string }[];
}
export interface BaseProps {
  pendingActions: Action[];
}
