import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createPart, updatePart} from '../../../store/parts';
import {getInitialPartFields} from '../../../utils/parts';
import PanelWrapper from '../PanelWrapper/PanelWrapper';
import Input from '../UI-Components/Controls/Input/Input';
import Select from '../UI-Components/Controls/Selector/Selector';


const CATEGORY_OPTIONS = [
    { value: 'cars', label: 'Автомобиль'},
    { value: 'прицепы', label: 'Прицепы'},
    { value: 'special', label: 'Спец. инструменты'},
];

const MEASURE_OPTIONS = [
    { label: 'Шт', value: 'pieces'},
    { label: 'Кг', value: 'kg'},
    { label: 'Литры', value: 'liters'},
    { label: 'Упаковки', value: 'packaging'},
];


const AddPartPanel = ({onClose, dataItem, searchValue}) => {
    const dispatch = useDispatch();

    const [isOutlineHandlerDisable, setIsOutlineHandlerDisable] = useState(false);

    const [fields, setFields] = useState(getInitialPartFields(dataItem));

    const disabled =
        !fields.name ||
        !fields.number ||
        !fields.prefix ||
        !fields.price ||
        !fields.category ||
        !fields.measure ||
        !fields.quantity;

    const onChange = (name, value) => {
        setFields({
            ...fields,
            [name]: value
        })
    };

    const onSave = () => {
        dataItem
            ? dispatch(updatePart(fields, searchValue))
            : dispatch(createPart(fields, searchValue));
        onClose();
    };

    return (
        <PanelWrapper
            title="Номенклатура"
            onClose={onClose}
            btnArray={[
                {
                    id: 1,
                    text: 'Сохранить',
                    onClick: onSave,
                    role: 'primary',
                    type: 'submit',
                    disabled: disabled
                },
            ]}
            isFullScreen
            zIndex={10000}
            isOutlineHandlerDisable={isOutlineHandlerDisable}
        >
            <Input
                label="Наименование"
                value={fields.name}
                onChange={(value) => onChange('name', value)}
                width="50%"
            />
            <div className="oneLineItems">
                <Input
                    label="Кат номер"
                    value={fields.number}
                    onChange={(value) => onChange('number', value)}
                    width="25%"
                />
                <Input
                    label="Префикс з/ч"
                    value={fields.prefix}
                    onChange={(value) => onChange('prefix', value)}
                    width="25%"
                />
                <Input
                    label="Колличество"
                    value={fields.quantity}
                    onChange={(value) => onChange('quantity', value)}
                    width="25%"
                />
            </div>
            <div className="oneLineItems">
                <Input
                    label="Цена закупочная"
                    value={fields.price}
                    onChange={(value) => onChange('price', value)}
                    width="25%"
                />
                <Input
                    label="Наценка"
                    value={fields.markUp}
                    onChange={(value) => onChange('markUp', value)}
                    width="25%"
                />
                <Input
                    label="Цена розничная"
                    value={fields.retailPrice}
                    onChange={(value) => onChange('retailPrice', value)}
                    width="25%"
                />
            </div>
            <Select
                label="Категория"
                value={fields.category}
                onChange={(value) => onChange('category', value)}
                data={CATEGORY_OPTIONS}
                onFocus={() => setIsOutlineHandlerDisable(true)}
                onBlur={() => setIsOutlineHandlerDisable(false)}
                width="25%"
            />
            <Select
                label="Единица измерения"
                value={fields.measure}
                onChange={(value) => onChange('measure', value)}
                data={MEASURE_OPTIONS}
                onFocus={() => setIsOutlineHandlerDisable(true)}
                onBlur={() => setIsOutlineHandlerDisable(false)}
                width="25%"
            />
        </PanelWrapper>
    )
};

export default AddPartPanel;