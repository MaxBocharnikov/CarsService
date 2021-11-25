import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PanelWrapper from '../PanelWrapper/PanelWrapper';
import Switcher from '../UI-Components/Switcher/Switcher';
import Input from '../UI-Components/Controls/Input/Input';
import {createClient} from '../../../store/clients';
import S from './AddClientPanel.styled';


const TYPES = {
  entity: 'Юр лицо',
  individual: 'Физ Лицо',
  entrepreneur: 'ИП'
};


const AddClientPanel = ({onClose}) => {
    const dispatch = useDispatch();

    const [fields, setFields] = useState({
        type: TYPES.entity,
        name: '',
        address: '',
        legalAddress: '',
        inn: '',
        kpp: '',
        ogrn: '',
        carInfo: [],
        contactInfo: [],
    });

    const onChange = (name, value) => {
        setFields({
            ...fields,
            [name]: value
        })
    };


    const onArrayChange = (rootField, index, name, value) => {
        const arr = [...fields[rootField]];
        arr[index][name] = value;
        onChange(rootField, arr);
    };

    const onArrayAdd = (rootField, value) => {
        const arr = [...fields[rootField]];
        arr.push(value);
        onChange(rootField, arr);
    };

    const onSave = () => {
        dispatch(createClient(fields));
        onClose();
    };

    const disabled = !fields.type || !fields.name;

    return (
        <PanelWrapper
            title="Контрагент"
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
        >
            <S._Switcher
                selectedValue={fields.type}
                options={[
                    {value: TYPES.entity, label: 'ЮР ЛИЦО', onClick: () => onChange('type', TYPES.entity)},
                    {value: TYPES.individual, label: 'ЗАПЧАСТИ', onClick: () => onChange('type', TYPES.individual)},
                    {value: TYPES.entrepreneur, label: 'ИП', onClick: () => onChange('type', TYPES.entrepreneur)},
                ]}
            />
            <Input
                label="Контрагент"
                value={fields.name}
                onChange={(value) => onChange('name', value)}
                width="50%"
            />
            <Input
                label="Фактический адрес"
                value={fields.address}
                onChange={(value) => onChange('address', value)}
                width="50%"
            />
            {fields.type !== TYPES.individual && (
                <Input
                    label="Юридический адрес"
                    value={fields.legalAddress}
                    onChange={(value) => onChange('legalAddress', value)}
                    width="50%"
                />
            )}
            <div className="oneLineItems">
                <Input
                    label="ИНН"
                    value={fields.inn}
                    onChange={(value) => onChange('inn', value)}
                    width="25%"
                />
                {fields.type !== TYPES.individual && (
                    <Input
                        label="КПП"
                        value={fields.kpp}
                        onChange={(value) => onChange('kpp', value)}
                        width="25%"
                    />
                )}
                {fields.type !== TYPES.individual && (
                    <Input
                        label="ОГРН"
                        value={fields.ogrn}
                        onChange={(value) => onChange('orgn', value)}
                        width="25%"
                    />
                )}
            </div>
            <S.SubTitle>Информация о тс</S.SubTitle>
            <S.ArrayBlock>
                {fields.carInfo.map((car, index) => (
                    <div className="oneLineItems" key={index}>
                        <Input
                            label="ТС"
                            value={fields.carInfo[index].name}
                            onChange={(value) => onArrayChange('carInfo', index, 'name', value)}
                            width="50%"
                        />
                    </div>
                ))}
                <button
                    className="addItemBtn"
                    onClick={() => onArrayAdd('carInfo', {name: ''})}
                >
                    Добавить ТС
                </button>
            </S.ArrayBlock>
            <S.SubTitle>Информация для связи</S.SubTitle>
            <S.ArrayBlock>
                {fields.contactInfo.map((contact, index) => (
                    <div className="oneLineItems" key={index}>
                        <Input
                            label="Имя"
                            value={fields.contactInfo[index].name}
                            onChange={(value) => onArrayChange('contactInfo', index, 'name', value)}
                            width="22%"
                        />
                        <Input
                            label="Телефон"
                            value={fields.contactInfo[index].phone}
                            onChange={(value) => onArrayChange('contactInfo', index, 'phone', value)}
                            width="22%"
                        />
                        <Input
                            label="Почта"
                            value={fields.contactInfo[index].email}
                            onChange={(value) => onArrayChange('contactInfo', index, 'email', value)}
                            width="22%"
                        />
                        <Input
                            label="Комментарий"
                            value={fields.contactInfo[index].comment}
                            onChange={(value) => onArrayChange('contactInfo', index, 'comment', value)}
                            width="22%"
                        />
                    </div>
                ))}
                <button
                    className="addItemBtn"
                    onClick={() => onArrayAdd('contactInfo',
                        {
                            name: '',
                            phone: '',
                            email: '',
                            comment: '',
                        }
                    )}
                >
                    Добавить контакс
                </button>
            </S.ArrayBlock>

        </PanelWrapper>
    )
};

export default AddClientPanel;