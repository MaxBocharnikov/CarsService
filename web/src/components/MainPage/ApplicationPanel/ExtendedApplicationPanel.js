import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PanelWrapper from '../../Common/PanelWrapper/PanelWrapper';
import Input from '../../Common/UI-Components/Controls/Input/Input';
import Select from '../../Common/UI-Components/Controls/Selector/Selector';
import {fetchClients} from '../../../store/clients';
import {fetchTrailers} from '../../../store/trailers';
import MaskedInput from '../../Common/UI-Components/Controls/Input/MaskedInput';
import { getExtendedFieldsData } from '../../../utils/applications';
import {fetchWorkingHours} from '../../../store/workingHours';
import {fetchWorks} from '../../../store/works';
import {fetchParts} from '../../../store/parts';
import Switcher from '../../Common/UI-Components/Switcher/Switcher';

const ExtendedApplicationPanel = ({
  onClose,
  applicationDetails
}) => {
    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts.postsList);
    const clients = useSelector(state => state.clients.clientsList);
    const trailers = useSelector(state => state.trailers.trailersList);
    const workingHours = useSelector(state => state.workingHours.workingHoursList);
    const works = useSelector(state => state.works.worksList);
    const parts = useSelector(state => state.parts.partsList);

    const [isOutlineHandlerDisable, setIsOutlineHandlerDisable] = useState(false);
    const [fields, setFields] = useState(getExtendedFieldsData(applicationDetails));

    const [selectedOptionType, setSelectedOptionType] = useState('parts');

    const setSelectedOptionTypeMemo = useCallback(type => {
        setSelectedOptionType(type);
    }, []);

    const onChange = (name, value) => {
        setFields({
            ...fields,
            [name]: value
        })
    };

    const disabled =
        !fields.name ||
        !fields.phone ||
        !fields.description ||
        fields.date.length !== 21 ||
        fields.time.length !== 11 ||
        !fields.post ||
        !fields.client ||
        !fields.trailers.length

    const onSave = () => {
        // const mapped = mapFromApplicationToCreateApplication(fields);
        // dispatch(createApplication(mapped));
        console.log(fields);
        onClose();
    };

    useEffect(() => {
        dispatch(fetchClients());
        dispatch(fetchTrailers());
        dispatch(fetchWorkingHours());
        dispatch(fetchWorks());
        dispatch(fetchParts());
    }, []);

    if (!clients.length || !trailers.length || !works.length || !parts.length) return null;

    console.log(selectedOptionType);
    return (
        <PanelWrapper
            title="Заявка"
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
                {
                    id: 2,
                    text: 'Заказ наряд',
                    onClick: onClose,
                    disabled: disabled
                }
            ]}
            isOutlineHandlerDisable={isOutlineHandlerDisable}
            onSearch={(v) => dispatch()}
            isFullScreen
        >
            <Select
                label="Контрагент"
                value={fields.client}
                onChange={(value) => onChange('client', value)}
                data={clients.map(p => (
                    {
                        value: p.id,
                        label: p.name
                    }
                ))}
                onFocus={() => setIsOutlineHandlerDisable(true)}
                onBlur={() => setIsOutlineHandlerDisable(false)}
                onSearch={(v) => dispatch(fetchClients(v))}
                width="50%"
            />
            <Select
                label="ТС"
                value={fields.trailers[0]}
                onChange={(value) => onChange('trailers', [value])}
                data={trailers.map(p => (
                    {
                        value: p.id,
                        label: p.model
                    }
                ))}
                onFocus={() => setIsOutlineHandlerDisable(true)}
                onBlur={() => setIsOutlineHandlerDisable(false)}
                onSearch={(v) => dispatch(fetchTrailers(v))}
                width="50%"
            />
            <div className="oneLineItems" style={{justifyContent: 'start'}}>
                <Input
                    label="Имя"
                    value={fields.name}
                    onChange={(value) => onChange('name', value)}
                    width="25%"
                />
                <Input
                    label="Телефон"
                    value={fields.phone}
                    onChange={(value) => onChange('phone', value)}
                    width="25%"
                />
            </div>
            <Input
                label="Описание"
                value={fields.description}
                onChange={(value) => onChange('description', value)}
                width="50%"
            />
            <div className="oneLineItems">
                <MaskedInput
                    label="Дата"
                    value={fields.date}
                    onChange={(value) => onChange('date', value)}
                    width="25%"
                    mask="1111.11.11-1111.11.11"
                />
                <MaskedInput
                    label="Время"
                    value={fields.time}
                    onChange={(value) => onChange('time', value)}
                    width="25%"
                    mask="11:11-11:11"
                />
                <Select
                    label="Пост"
                    value={fields.post}
                    onChange={(value) => onChange('post', value)}
                    width="25%"
                    data={posts.map(p => (
                        {
                            value: p.id,
                            label: p.title
                        }
                    ))}
                    onFocus={() => setIsOutlineHandlerDisable(true)}
                    onBlur={() => setIsOutlineHandlerDisable(false)}
                />
            </div>
            <Select
                label="Норма часа"
                value={fields.workingHourId}
                onChange={(value) => onChange('workingHourId', value)}
                width="25%"
                data={workingHours.map(p => (
                    {
                        value: p.id,
                        label: p.title
                    }
                ))}
                onFocus={() => setIsOutlineHandlerDisable(true)}
                onBlur={() => setIsOutlineHandlerDisable(false)}
            />
            <Switcher
                selectedValue={selectedOptionType}
                options={[
                    {value: 'works', label: 'Услуги', onClick: () => setSelectedOptionTypeMemo('works')},
                    {value: 'parts', label: 'Запчасти', onClick: () => setSelectedOptionTypeMemo('parts')},
                ]}
            />
        </PanelWrapper>
    )
};

export default ExtendedApplicationPanel;