import React, {useState, useEffect, useCallback, useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import {useDispatch, useSelector} from 'react-redux';
import PanelWrapper from '../PanelWrapper/PanelWrapper';
import Input from '../UI-Components/Controls/Input/Input';
import Select from '../UI-Components/Controls/Selector/Selector';
import {fetchClients} from '../../../store/clients';
import {fetchTrailers} from '../../../store/trailers';
import MaskedInput from '../UI-Components/Controls/Input/MaskedInput';
import { getExtendedFieldsData } from '../../../utils/applications';
import {fetchWorkingHours} from '../../../store/workingHours';
import {fetchWorks} from '../../../store/works';
import {fetchParts} from '../../../store/parts';
import Switcher from '../UI-Components/Switcher/Switcher';
import WorksTable from './components/WorksTable';
import PartsTable from './components/PartsTable';
import {
    mapFromApplicationToExtendedUpdateApplication
} from '../../../utils/mapping/applications';
import {createApplication, updateApplication} from '../../../store/applications';
import SumResult from './components/SumResult/SumResult';
import AddIcon from '../UI-Components/Icons/AddIcon';
import S from './ApplicationPanel.styled';
import AddClientPanel from '../AddClientPanel/AddClientPanel';
import AddTrailer from '../AddTrailerPanel/AddTrailerPanel';
import {fetchPosts} from '../../../store/posts';
import ApplicationPanelToPrint from '../ApplicationPanelToPrint';

const ExtendedApplicationPanel = ({
  onClose,
  applicationDetails,
  isNew,
  searchValue,
  setNewOrderData,
}) => {
    const dispatch = useDispatch();

    const componentRef = useRef(null);

    const posts = useSelector(state => state.posts.postsList);
    const clients = useSelector(state => state.clients.clientsList);
    const trailers = useSelector(state => state.trailers.trailersList);
    const workingHours = useSelector(state => state.workingHours.workingHoursList);
    const works = useSelector(state => state.works.worksList);
    const parts = useSelector(state => state.parts.partsList);

    const [isOutlineHandlerDisable, setIsOutlineHandlerDisable] = useState(false);
    const [fields, setFields] = useState(getExtendedFieldsData(applicationDetails, workingHours));


    const [selectedOptionType, setSelectedOptionType] = useState('works');

    const [isAddClientPanelOpen, setIsAddClientPanelOpen] = useState(false);
    const [isAddTrailerPanelOpen, setIsAddTrailerPanelOpen] = useState(false);

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

    const onSave = (_, toOrder) => {
        const mapped = mapFromApplicationToExtendedUpdateApplication(applicationDetails?.id, fields);
        isNew
            ? dispatch(createApplication(mapped, false, searchValue))
            : dispatch(updateApplication(mapped, searchValue));
        if (toOrder && setNewOrderData && applicationDetails) {
            setNewOrderData({...mapped, applicationId: applicationDetails.id});
        }
        onClose();
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
    });

    useEffect(() => {
        dispatch(fetchClients());
        dispatch(fetchTrailers());
        dispatch(fetchWorkingHours());
        dispatch(fetchWorks());
        dispatch(fetchParts());
        dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        setFields(getExtendedFieldsData(applicationDetails, workingHours));
    }, [JSON.stringify(workingHours)]);

    useEffect(() => {
        const worksSum = fields.works.reduce((acm, current) => acm + current.sum, 0);
        const partsSum = fields.parts.reduce((acm, current) => acm + current.sum, 0);
        onChange('sum', +worksSum + +partsSum);
    }, [JSON.stringify(fields.works), JSON.stringify(fields.parts)]);

    if (!clients.length || !trailers.length || !works.length || !parts.length || !posts.length) return null;


    return (
        <>
        <div style={{ display: "none" }}>
            <ApplicationPanelToPrint
                ref={componentRef}
                fields={fields}
                posts={posts}
                clients={clients}
                trailers={trailers}
                workingHours={workingHours}
                works={works}
                parts={parts}
            />
        </div>
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
                        text: 'Заказ наряд',
                        onClick: (_) => onSave(_, true),
                        disabled: disabled
                    },
                    {
                        id: 3,
                        text: 'Печать',
                        onClick: () => handlePrint(),
                    }
                ]}
                isOutlineHandlerDisable={isOutlineHandlerDisable || isAddClientPanelOpen}
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
                    width="50%"
                    additionalIcon={
                        <S.AdditionIconWrapper>
                            <AddIcon/>
                        </S.AdditionIconWrapper>
                    }
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
                        {value: 'works', label: 'УСЛУГИ', onClick: () => setSelectedOptionTypeMemo('works')},
                        {value: 'parts', label: 'ЗАПЧАСТИ', onClick: () => setSelectedOptionTypeMemo('parts')},
                    ]}
                />
                {selectedOptionType === 'works' ? (
                    <WorksTable
                        fields={fields}
                        onChange={(value) => onChange('works', value)}
                        works={works}
                        onSearch={(v) => dispatch(fetchWorks(v))}
                        onFocus={() => setIsOutlineHandlerDisable(true)}
                        onBlur={() => setIsOutlineHandlerDisable(false)}
                        workingHours={workingHours}
                    />
                ) : (
                    <PartsTable
                        fields={fields}
                        onChange={(value) => onChange('parts', value)}
                        parts={parts}
                        onSearch={(v) => dispatch(fetchParts(v))}
                        onFocus={() => setIsOutlineHandlerDisable(true)}
                        onBlur={() => setIsOutlineHandlerDisable(false)}
                    />
                )}
                <SumResult fields={fields}/>
            </PanelWrapper>
        </>
    )
};

export default ExtendedApplicationPanel;