import React from 'react';
import ExpandingTable from '../../../Common/UI-Components/ExpandingTable/ExpandingTable';
import {mapFromWorkToApplicationWork} from '../../../../utils/applications';

const WorksTable = ({
 fields,
 onChange,
 works,
 onSearch,
 onFocus,
 onBlur,
 workingHours,
}) => {
    return (
        <ExpandingTable
            columns={[
                {
                    title: 'Наименование',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Норма времени',
                    dataIndex: 'time',
                    key: 'time',
                },
                {
                    title: 'Колличество',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    editable: true,
                },
                {
                    title: 'Норма час',
                    dataIndex: 'pricePerHour',
                    key: 'pricePerHour',
                    editable: true,
                },
                {
                    title: 'Сумма',
                    dataIndex: 'sum',
                    key: 'sum',
                },
            ]}
            data={fields.works}
            onChange={onChange}
            selectorOptions={works.map(w => ({value: w.id, label: w.name}))}
            onSearch={onSearch}
            onSelect={(v) => onChange([...fields.works, mapFromWorkToApplicationWork(v, works, workingHours, fields.workingHourId)])}
            onFocus={onFocus}
            onBlur={onBlur}
            getSum={row => +row.quantity * row.pricePerHour * row.time}
            placeholder="Добавить услугу"
        />
    )
};

export default WorksTable;