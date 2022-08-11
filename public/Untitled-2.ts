{
    key: i.toString(),
    name: fileName,
    value: fileName,
    iconName: randomFileType.url,
    fileType: randomFileType.docType,
    modifiedBy: userName,
    dateModified: randomDate.dateFormatted,
    dateModifiedValue: randomDate.value,
    fileSize: randomFileSize.value,
    fileSizeRaw: randomFileSize.rawSize,
  }

  {
    key: 'column1',
    name: 'File Type',
    className: classNames.fileIconCell,
    iconClassName: classNames.fileIconHeaderIcon,
    ariaLabel: 'Column operations for File type, Press to sort on File type',
    iconName: 'Page',
    isIconOnly: true,
    fieldName: 'name',
    minWidth: 16,
    maxWidth: 16,
    onColumnClick: this._onColumnClick,
    onRender: (item: IDocument) => (
      <TooltipHost content={`${item.fileType} file`}>
        <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
      </TooltipHost>
    ),
  },
  {
    key: 'column2',
    name: 'Name',
    fieldName: 'name',
    minWidth: 210,
    maxWidth: 350,
    isRowHeader: true,
    isResizable: true,
    isSorted: true,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    onColumnClick: this._onColumnClick,
    data: 'string',
    isPadded: true,
  },
  {
    key: 'column3',
    name: 'Date Modified',
    fieldName: 'dateModifiedValue',
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    onColumnClick: this._onColumnClick,
    data: 'number',
    onRender: (item: IDocument) => {
      return <span>{item.dateModified}</span>;
    },
    isPadded: true,
  }