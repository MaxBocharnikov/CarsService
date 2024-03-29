import React, {useState} from 'react';
import ExpandingTable from '../../UI-Components/ExpandingTable/ExpandingTable';
import {mapFromPartToApplicationPart} from '../../../../utils/applications';

const PartsTable = ({
 fields,
 onChange,
 parts,
 onSearch,
 onFocus,
 onBlur,
 isRecommendation,
 isOrder,
 onMove,
 }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const moveGoal = isRecommendation ? 'в запчасти ' : 'в реком. запчасти';
    const buttonText = `Перенести ${moveGoal}`;
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
            data={isRecommendation ? fields.recommendedParts : fields.parts}
            onChange={onChange}
            selectorOptions={parts.map(w => ({value: w.id, label: w.name}))}
            onSearch={onSearch}
            onSelect={(v) => onChange([...isRecommendation ? fields.recommendedParts : fields.parts, mapFromPartToApplicationPart(v, parts)])}
            onFocus={onFocus}
            onBlur={onBlur}
            getSum={row => +row.quantity * +row.price}
            placeholder="Добавить запчасть"
            selectedRowKeys={isOrder ? selectedRowKeys : undefined}
            setSelectedRowKeys={setSelectedRowKeys}
            buttonText={buttonText}
            onMove={onMove ? () => onMove(selectedRowKeys) : undefined}
            id='partId'
        />
    )
};

export default PartsTable;