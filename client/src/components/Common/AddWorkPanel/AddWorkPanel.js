import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getInitialWorksFields} from '../../../utils/works';
import PanelWrapper from '../PanelWrapper/PanelWrapper';
import Input from '../UI-Components/Controls/Input/Input';
import {createWork, updateWork} from '../../../store/works';

const AddWorkPanel = ({onClose, dataItem, searchValue}) => {
    const dispatch = useDispatch();

    const [fields, setFields] = useState(getInitialWorksFields(dataItem));

    const disabled =
        !fields.name ||
        !fields.time;

    const onChange = (name, value) => {
        setFields({
            ...fields,
            [name]: value
        })
    };

    const onSave = () => {
        dataItem
            ? dispatch(updateWork(fields, searchValue))
            : dispatch(createWork(fields, searchValue));
        onClose();
    };

    return (
        <PanelWrapper
            title="Авторабота"
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
            <Input
                label="Полное наименование"
                value={fields.name}
                onChange={(value) => onChange('name', value)}
                width="50%"
            />
            <Input
                label="Краткое наименование"
                value={fields.shortName}
                onChange={(value) => onChange('shortName', value)}
                width="50%"
            />
            <Input
                label="Кат. номер"
                value={fields.number}
                onChange={(value) => onChange('number', value)}
                width="50%"
            />
            <Input
                label="Норма времени"
                value={fields.time}
                onChange={(value) => onChange('time', value)}
                width="50%"
            />
        </PanelWrapper>
    )
};

export default AddWorkPanel;