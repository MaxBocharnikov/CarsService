import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchParts, setParts} from '../../store/parts';
import ListPageWrapper from '../../components/Common/UI-Components/ListPageWrapper/ListPageWrapper';
import AddPartPanel from '../../components/Common/AddPartPanel/AddPartPanel';

const PartsPage = () => {
    const dispatch = useDispatch();
    const parts = useSelector(state => state.parts.partsList);
    const [dataItem, setDataItem] = useState(null);

    const [isAddPartPanelOpen, setIsAddPartPanelOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(fetchParts());
        return () => {
            dispatch(setParts([]));
        };
    }, []);

    return (
        <>
            {isAddPartPanelOpen && (
                <AddPartPanel
                    onClose={() => setIsAddPartPanelOpen(false)}
                    searchValue={searchValue}
                />
            )}
            {!!dataItem && (
                <AddPartPanel
                    onClose={() => setDataItem(null)}
                    dataItem={dataItem}
                    searchValue={searchValue}
                />
            )}
            <ListPageWrapper
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                addButtonLabel="Добавить запчасть"
                onAddClick={() => {setIsAddPartPanelOpen(true)}}
                searchPlaceholder="Поиск по номеру или имени"
                onSearch={(query) => dispatch(fetchParts(query))}
                onRowClick={item => setDataItem(item)}
                columns={[
                    {
                        title: 'Кат №',
                        dataIndex: 'number',
                        key: 'number',
                    },
                    {
                        title: 'Наименование',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Остаток',
                        dataIndex: 'quantity',
                        key: 'quantity',
                    },
                    {
                        title: 'В резерве',
                        dataIndex: 'reserved',
                        key: 'reserved',
                    },
                    {
                        title: 'Стоимость',
                        dataIndex: 'price',
                        key: 'price',
                    },
                ]}
                data={parts}
             />
        </>
    )
};

export default PartsPage;