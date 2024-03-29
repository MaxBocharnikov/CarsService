import React, { useContext, useState, useEffect, useRef } from 'react';
import { Input, Form } from 'antd';
import 'antd/dist/antd.css';
import S from './ExpandingTable.styled';
import Select from '../Controls/Selector/Selector';
import Button from '../Controls/Button/Button';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
   title,
   editable,
   children,
   dataIndex,
   record,
   handleSave,
   ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const ExpandingTable = ({
   data,
   columns,
   selectorOptions,
   onChange,
   onSearch,
   onSelect,
   onBlur,
   onFocus,
   getSum,
   placeholder,
   noSearch,
   selectedRowKeys,
   setSelectedRowKeys,
   buttonText,
   onMove,
   id,
}) => {

    const handleSave = row => {
        const newData = [...data];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row, sum: getSum(row) });
        onChange(newData);
    };

    const _columns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const selectRow = (record) => {
        const selectedRowKeysCopy = [...selectedRowKeys];
        if (selectedRowKeysCopy.indexOf(record.key) >= 0) {
            selectedRowKeysCopy.splice(selectedRowKeysCopy.indexOf(record.key), 1);
        } else {
            selectedRowKeysCopy.push(record.key);
        }
        setSelectedRowKeys(selectedRowKeysCopy);
    };
    const onSelectedRowKeysChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    return (
        <S.Wrapper>
            {!noSearch && <Select
                value={null}
                onChange={(value) => onSelect(value)}
                data={selectorOptions}
                onSearch={onSearch}
                width="50%"
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
            />}
            {onMove &&
            <S.MoveButton
                onClick={onMove}
                role="primary"
                disabled={!selectedRowKeys || !selectedRowKeys.length}
            >
                {buttonText}
             </S.MoveButton>
            }
            <S._Table
              components={{
                  body: {
                      cell: EditableCell,
                      row: EditableRow,
                  },
              }}
              dataSource={data.map((d, index) => ({...d, key: d[id] + index}))}
              columns={_columns}
              pagination={false}
              rowSelection={selectedRowKeys
              ? {
                 selectedRowKeys,
                 onChange: onSelectedRowKeysChange
              } : undefined}
              onRow={(record) => ({
                  onClick: () => {
                      selectRow(record);
                  },
              })}
            />
        </S.Wrapper>
    )
};

export default React.memo(ExpandingTable);