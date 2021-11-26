import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PanelWrapper from '../../Common/PanelWrapper/PanelWrapper';
import Input from '../../Common/UI-Components/Controls/Input/Input';
import Select from '../../Common/UI-Components/Controls/Selector/Selector';
import {fetchClients} from '../../../store/clients';
import {fetchTrailers} from '../../../store/trailers';
import MaskedInput from '../../Common/UI-Components/Controls/Input/MaskedInput';
import {mapFromApplicationToCreateApplication} from '../../../utils/mapping/applications';
import {getDefaultFieldData} from '../../../utils/applications';
import {createApplication} from '../../../store/applications';
import AddIcon from '../../Common/UI-Components/Icons/AddIcon';

import S from './ApplicationPanel.styled';
import AddClientPanel from '../../Common/AddClientPanel/AddClientPanel';
import AddTrailer from '../../Common/AddTrailerPanel/AddTrailerPanel';

const ApplicationPanel = ({
    onClose,
    newApplicationDefaultData
}) => {
    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts.postsList);
    const clients = useSelector(state => state.clients.clientsList);
    const trailers = useSelector(state => state.trailers.trailersList);

    const [isAddClientPanelOpen, setIsAddClientPanelOpen] = useState(false);
    const [isAddTrailerPanelOpen, setIsAddTrailerPanelOpen] = useState(false);

    const [isOutlineHandlerDisable, setIsOutlineHandlerDisable] = useState(false);
    const [fields, setFields] = useState({
        name: '',
        phone: '',
        description: '',
        date: getDefaultFieldData(newApplicationDefaultData).date,
        time: getDefaultFieldData(newApplicationDefaultData).time,
        post: getDefaultFieldData(newApplicationDefaultData).post,
        client: '',
        trailers: [],
    });

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


    const onSave = (event, toEdit) => {
        const mapped = mapFromApplicationToCreateApplication(fields);
        dispatch(createApplication(mapped, toEdit));
        onClose();
    };

    return (
        <>
        {isAddClientPanelOpen && <AddClientPanel onClose={() => setIsAddClientPanelOpen(false)}/>}
        {isAddTrailerPanelOpen && <AddTrailer onClose={() => setIsAddTrailerPanelOpen(false)}/>}
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
                        text: 'Открыть Заявку',
                        onClick: (event) => onSave(event, true),
                        disabled: disabled
                    }
                ]}
                isOutlineHandlerDisable={isOutlineHandlerDisable || isAddClientPanelOpen || isAddTrailerPanelOpen}
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
                    additionalIcon={
                        <S.AdditionIconWrapper onClick={() => setIsAddClientPanelOpen(true)}>
                            <AddIcon/>
                        </S.AdditionIconWrapper>
                    }
                />
                <Select
                    label="ТС"
                    value={fields.trailers[0]}
                    onChange={(value) => onChange('trailers', [value])}
                    data={trailers.map(p => (
                        {
                            value: p.id,
                            label: p.name
                        }
                    ))}
                    onFocus={() => setIsOutlineHandlerDisable(true)}
                    onBlur={() => setIsOutlineHandlerDisable(false)}
                    onSearch={(v) => dispatch(fetchTrailers(v))}
                    additionalIcon={
                        <S.AdditionIconWrapper onClick={() => setIsAddTrailerPanelOpen(true)}>
                            <AddIcon/>
                        </S.AdditionIconWrapper>
                    }
                />
                <div className="oneLineItems">
                    <Input
                        label="Имя"
                        value={fields.name}
                        onChange={(value) => onChange('name', value)}
                        width="45%"
                    />
                    <Input
                        label="Телефон"
                        value={fields.phone}
                        onChange={(value) => onChange('phone', value)}
                        width="45%"
                    />
                </div>
                <Input
                    label="Описание"
                    value={fields.description}
                    onChange={(value) => onChange('description', value)}
                />
                <div className="oneLineItems">
                    <MaskedInput
                        label="Дата"
                        value={fields.date}
                        onChange={(value) => onChange('date', value)}
                        width="45%"
                        mask="1111.11.11-1111.11.11"
                    />
                    <MaskedInput
                        label="Время"
                        value={fields.time}
                        onChange={(value) => onChange('time', value)}
                        width="45%"
                        mask="11:11-11:11"
                    />
                </div>
                <Select
                    label="Пост"
                    value={fields.post}
                    onChange={(value) => onChange('post', value)}
                    width="45%"
                    data={posts.map(p => (
                        {
                            value: p.id,
                            label: p.title
                        }
                    ))}
                    onFocus={() => setIsOutlineHandlerDisable(true)}
                    onBlur={() => setIsOutlineHandlerDisable(false)}
                />
            </PanelWrapper>
        </>
    )
};

export default React.memo(ApplicationPanel);