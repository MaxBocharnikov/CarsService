import React from 'react';
import ExpandingTable from '../../../Common/UI-Components/ExpandingTable/ExpandingTable';
import {mapFromPartToApplicationPart} from '../../../../utils/applications';

const PartsTable = ({
 fields,
 onChange,
 parts,
 onSearch,
 onFocus,
 onBlur,
 }) => {
    return (
        <ExpandingTable
            columns={[
                {
                    title: '№',
                    dataIndex: 'number',
                    key: 'number',
                },
                {
                    title: 'Наименование',
                    dataIndex: 'name',
                    key: 'time',
                },
                {
                    title: 'Колличество',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    editable: true,
                },
                {
                    title: 'Остаток',
                    dataIndex: 'remainers',
                    key: 'remainers',
                },
                {
                    title: 'Цена',
                    dataIndex: 'price',
                    key: 'price',
                    editable: true,
                },
                {
                    title: 'Сумма',
                    dataIndex: 'sum',
                    key: 'sum',
                },
            ]}
            data={fields.parts}
            onChange={onChange}
            selectorOptions={parts.map(w => ({value: w.id, label: w.name}))}
            onSearch={onSearch}
            onSelect={(v) => onChange([...fields.parts, mapFromPartToApplicationPart(v, parts)])}
            onFocus={onFocus}
            onBlur={onBlur}
            getSum={row => +row.quantity * +row.price}
            placeholder="Добавить запчасть"
        />
    )
};

export default PartsTable;