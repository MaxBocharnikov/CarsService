import React, {useState, useEffect, useCallback, useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import {useDispatch, useSelector} from 'react-redux';
import PanelWrapper from '../PanelWrapper/PanelWrapper';
import Input from '../UI-Components/Controls/Input/Input';
import Select from '../UI-Components/Controls/Selector/Selector';
import {fetchClients} from '../../../store/clients';
import {fetchTrailers} from '../../../store/trailers';
import MaskedInput from '../UI-Components/Controls/Input/MaskedInput';
import {fetchWorkingHours} from '../../../store/workingHours';
import {fetchWorks} from '../../../store/works';
import {fetchParts} from '../../../store/parts';
import Switcher from '../UI-Components/Switcher/Switcher';
import S from './OrderPanel.styled.js';
import {fetchPosts} from '../../../store/posts';
import {getOrderFieldsData} from '../../../utils/order';
import {mapFromOrderToOrderDto} from '../../../utils/mapping/order';
import WorksTable from '../ApplicationPanel/components/WorksTable';
import PartsTable from '../ApplicationPanel/components/PartsTable';
import SumResult from '../ApplicationPanel/components/SumResult/SumResult';
import {createOrder, updateOrder} from '../../../store/orders';
import ApplicationPanelToPrint from '../ApplicationPanelToPrint';


const STATUS_OPTIONS = [
    {label: 'Заявка', value: 'application'},
    {label: 'В работе', value: 'work'},
    {label: 'Согласование', value: 'mathing'},
    {label: 'Ожидание з/ч', value: 'waiting'},
    {label: 'Все детали поступили', value: 'entered'},
    {label: 'Выполнен', value: 'resolved'},
    {label: 'Закрыт', value: 'closed'},
];

const OrderPanel = ({
   onClose,
   data,
   isNew,
   searchValue,
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
    const [fields, setFields] = useState(getOrderFieldsData(data, workingHours, isNew));


    const [selectedOptionType, setSelectedOptionType] = useState('works');
    const [selectedRecommendedOptionType, setSelectedRecommnendedOptionType] = useState('works');

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
        !fields.trailers.length ||
        !fields.status

    const onSave = () => {
        const id = isNew ? undefined : data.id;
        const mapped = mapFromOrderToOrderDto(id,fields);
        isNew
            ? dispatch(createOrder(mapped, searchValue))
            : dispatch(updateOrder(mapped, searchValue));
        onClose();
    };

    useEffect(() => {
        dispatch(fetchClients());
        dispatch(fetchTrailers());
        dispatch(fetchWorkingHours());
        dispatch(fetchWorks());
        dispatch(fetchParts());
        dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        setFields(getOrderFieldsData(data, workingHours, isNew));
    }, [JSON.stringify(workingHours)]);

    useEffect(() => {
        const worksSum = fields.works.reduce((acm, current) => acm + current.sum, 0);
        const partsSum = fields.parts.reduce((acm, current) => acm + current.sum, 0);
        onChange('sum', +worksSum + +partsSum);
    }, [JSON.stringify(fields.works), JSON.stringify(fields.parts)]);

    useEffect(() => {
        const worksSum = fields.recommendedWorks.reduce((acm, current) => acm + current.sum, 0);
        const partsSum = fields.recommendedParts.reduce((acm, current) => acm + current.sum, 0);
        onChange('recommendedSum', +worksSum + +partsSum);
    }, [JSON.stringify(fields.recommendedWorks), JSON.stringify(fields.recommendedParts)]);



    const onWorkMove = (keys) => {
        const ids = keys.map(k => k.slice(0, -1));
        const works = fields.works.filter(w => ids.includes(w.workId));
        onChange('recommendedWorks', [...fields.recommendedWorks, ...works])
    };

    const onRecommendedWorkMove = (keys) => {
        const ids = keys.map(k => k.slice(0, -1));
        const works = fields.recommendedWorks.filter(w => ids.includes(w.workId));
        onChange('works', [...fields.works, ...works])
    };

    const onPartMove = (keys) => {
        const ids = keys.map(k => k.slice(0, -1));
        const parts = fields.parts.filter(p => ids.includes(p.partId));
        onChange('recommendedParts', [...fields.recommendedParts, ...parts])
    };

    const onRecommendedPartMove = (keys) => {
        const ids = keys.map(k => k.slice(0, -1));
        const parts = fields.recommendedParts.filter(p => ids.includes(p.partId));
        onChange('parts', [...fields.parts, ...parts])
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
    });

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
        <PanelWrapper
            title="Заказ наряд"
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
                    text: 'Печать',
                    onClick: () => handlePrint(),
                }
            ]}
            isOutlineHandlerDisable={isOutlineHandlerDisable}
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
                        label: p.name
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
            <Select
                label="Статус"
                value={fields.status}
                onChange={(value) => onChange('status', value)}
                width="25%"
                data={STATUS_OPTIONS}
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
                    isOrder
                    onMove={(items) => onWorkMove(items)}
                />
            ) : (
                <PartsTable
                    fields={fields}
                    onChange={(value) => onChange('parts', value)}
                    parts={parts}
                    onSearch={(v) => dispatch(fetchParts(v))}
                    onFocus={() => setIsOutlineHandlerDisable(true)}
                    onBlur={() => setIsOutlineHandlerDisable(false)}
                    isOrder
                    onMove={(items) => onPartMove(items)}
                />
            )}
            <SumResult fields={fields}/>
            <S.SubTitle>Рекомендации</S.SubTitle>
            <Input
                label="Описание"
                value={fields.recommendationDescription}
                onChange={(value) => onChange('recommendationDescription', value)}
                width="50%"
            />
            <Switcher
                selectedValue={selectedRecommendedOptionType}
                options={[
                    {value: 'works', label: 'УСЛУГИ', onClick: () => setSelectedRecommnendedOptionType('works')},
                    {value: 'parts', label: 'ЗАПЧАСТИ', onClick: () => setSelectedRecommnendedOptionType('parts')},
                ]}
            />
            {selectedRecommendedOptionType === 'works' ? (
                <WorksTable
                    fields={fields}
                    onChange={(value) => onChange('recommendedWorks', value)}
                    works={works}
                    onSearch={(v) => dispatch(fetchWorks(v))}
                    onFocus={() => setIsOutlineHandlerDisable(true)}
                    onBlur={() => setIsOutlineHandlerDisable(false)}
                    workingHours={workingHours}
                    isRecommendation
                    isOrder
                    onMove={(items) => onRecommendedWorkMove(items)}
                />
            ) : (
                <PartsTable
                    fields={fields}
                    onChange={(value) => onChange('recommendedParts', value)}
                    parts={parts}
                    onSearch={(v) => dispatch(fetchParts(v))}
                    onFocus={() => setIsOutlineHandlerDisable(true)}
                    onBlur={() => setIsOutlineHandlerDisable(false)}
                    isRecommendation
                    isOrder
                    onMove={(items) => onRecommendedPartMove(items)}
                />
            )}
            <SumResult fields={fields} isRecommendation/>
        </PanelWrapper>
        </>
    )
};

export default OrderPanel;