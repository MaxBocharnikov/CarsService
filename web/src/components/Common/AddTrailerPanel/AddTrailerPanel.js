import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PanelWrapper from '../PanelWrapper/PanelWrapper';
import Select from '../UI-Components/Controls/Selector/Selector';
import Input from '../UI-Components/Controls/Input/Input';
import {createTrailer} from '../../../store/trailers';

const TYPES_OPTIONS = [
    { value: 'прицеп', label: 'Прицеп'},
    { value: 'тягач', label: 'Тягач'},
];

const MODEL_OPTIONS = [
    { value: 'volvo', label: 'Volvo'},
    { value: 'reno', label: 'Reno'},
];

const AddTrailer = ({onClose}) => {
    const dispatch = useDispatch();
    
    const [isOutlineHandlerDisable, setIsOutlineHandlerDisable] = useState(false);

    const [fields, setFields] = useState({
        type: '',
        model: '',
        vin: '',
        stateNumber: '',
        mileage: '',
        client: '',
        name: '',
        contract: '',
        guaranteeType: '',
        guaranteeStartDate: '',
        guaranteeEndDate: '',
    });

    const disabled =
        !fields.type ||
        !fields.model ||
        !fields.name

    const onChange = (name, value) => {
        setFields({
            ...fields,
            [name]: value
        })
    };

    const onSave = () => {
        dispatch(createTrailer(fields));
        onClose();
    };

    return (
        <PanelWrapper
            title="Создание Нового ТС"
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
            <div style={{width: '50%'}}>
                <Select
                    label="Марка а/м"
                    value={fields.type}
                    onChange={(value) => onChange('type', value)}
                    data={TYPES_OPTIONS}
                    onFocus={() => setIsOutlineHandlerDisable(true)}
                    onBlur={() => setIsOutlineHandlerDisable(false)}
                />
                <Select
                    label="Модель а/м"
                    value={fields.model}
                    onChange={(value) => onChange('model', value)}
                    data={MODEL_OPTIONS}
                    onFocus={() => setIsOutlineHandlerDisable(true)}
                    onBlur={() => setIsOutlineHandlerDisable(false)}
                />
                <div className="oneLineItems">
                    <Input
                        label="Vin"
                        value={fields.vin}
                        onChange={(value) => onChange('vin', value)}
                        width="25%"
                    />
                    <Input
                        label="Гос номер"
                        value={fields.stateNumber}
                        onChange={(value) => onChange('stateNumber', value)}
                        width="25%"
                    />
                </div>
                <Input
                    label="Пробег"
                    value={fields.mileage}
                    onChange={(value) => onChange('mileage', value)}
                    width="50%"
                />
                <Input
                    label="Заказчик"
                    value={fields.client}
                    onChange={(value) => onChange('client', value)}
                    width="50%"
                />
                <Input
                    label="Наименование"
                    value={fields.name}
                    onChange={(value) => onChange('name', value)}
                    width="50%"
                />
                <Input
                    label="Сервисный контракт"
                    value={fields.contract}
                    onChange={(value) => onChange('contract', value)}
                    width="50%"
                />
                <div className="oneLineItems">
                    <Input
                        label="Тип гарантии"
                        value={fields.guaranteeType}
                        onChange={(value) => onChange('guaranteeType', value)}
                        width="25%"
                    />
                    <Input
                        label="Начало гарантии"
                        value={fields.guaranteeStartDate}
                        onChange={(value) => onChange('guaranteeStartDate', value)}
                        width="25%"
                    />
                    <Input
                        label="Окончание гарантии"
                        value={fields.guaranteeEndDate}
                        onChange={(value) => onChange('guaranteeEndDate', value)}
                        width="25%"
                    />
                </div>
            </div>
        </PanelWrapper>
    )
};

export default AddTrailer;