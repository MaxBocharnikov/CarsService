import React, {useState, useEffect, useCallback} from 'react';
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

const OrderPanel = ({
   onClose,
   data,
   isNew,
   searchValue,
}) => {
    const dispatch = useDispatch();

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
        !fields.trailers.length

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

    if (!clients.length || !trailers.length || !works.length || !parts.length || !posts.length) return null;

    return (
        <>
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
                />
            )}
            <SumResult fields={fields} isRecommendation/>
        </PanelWrapper>
        </>
    )
};

export default OrderPanel;