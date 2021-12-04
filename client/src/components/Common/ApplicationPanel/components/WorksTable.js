import React, {useState} from 'react';
import ExpandingTable from '../../UI-Components/ExpandingTable/ExpandingTable';
import {mapFromWorkToApplicationWork} from '../../../../utils/applications';

const WorksTable = ({
 fields,
 onChange,
 works,
 onSearch,
 onFocus,
 onBlur,
 workingHours,
 isRecommendation,
 isOrder,
 onMove
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const moveGoal = isRecommendation ? 'в услуги ' : 'в рекомен услуги';
    const buttonText = `Перенести ${moveGoal}`;
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
            data={isRecommendation ? fields.recommendedWorks : fields.works}
            onChange={onChange}
            selectorOptions={works.map(w => ({value: w.id, label: w.name}))}
            onSearch={onSearch}
            onSelect={(v) => onChange([...isRecommendation ? fields.recommendedWorks : fields.works, mapFromWorkToApplicationWork(v, works, workingHours, fields.workingHourId)])}
            onFocus={onFocus}
            onBlur={onBlur}
            getSum={row => +row.quantity * row.pricePerHour * row.time}
            placeholder="Добавить услугу"
            selectedRowKeys={isOrder ? selectedRowKeys : undefined}
            setSelectedRowKeys={setSelectedRowKeys}
            buttonText={buttonText}
            onMove={onMove ? () => onMove(selectedRowKeys) : undefined}
            id='workId'
        />
    )
};

export default WorksTable;