import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTrailers, setTrailersList} from '../../store/trailers';
import ListPageWrapper from '../../components/Common/UI-Components/ListPageWrapper/ListPageWrapper';
import AddTrailer from '../../components/Common/AddTrailerPanel/AddTrailerPanel';

const TrailersPage = () => {
    const dispatch = useDispatch();
    const trailers = useSelector(state => state.trailers.trailersList);

    const [searchValue, setSearchValue] = useState('');
    const [isAddTrailerPanelOpen, setIsAddTrailerPanelOpen] = useState(false);

    const [dataItem, setDataItem] = useState(null);

    useEffect(() => {
        dispatch(fetchTrailers());
        return () => {
            dispatch(setTrailersList([]));
        };
    }, []);

    return (
        <>
            {isAddTrailerPanelOpen && (
                <AddTrailer
                    onClose={() => setIsAddTrailerPanelOpen(false)}
                    searchValue={searchValue}
                />
            )}
            {!!dataItem && (
                <AddTrailer
                    onClose={() => setDataItem(null)}
                    searchValue={searchValue}
                    dataItem={dataItem}
                />
            )}
            <ListPageWrapper
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                addButtonLabel="Добавить ТС"
                onAddClick={() => {setIsAddTrailerPanelOpen(true)}}
                searchPlaceholder="Поиск по гос или вин номеру"
                onSearch={(query) => dispatch(fetchTrailers(query))}
                onRowClick={item => setDataItem(item)}
                columns={[
                    {
                        title: 'Гос номер',
                        dataIndex: 'stateNumber',
                        key: 'stateNumber',
                    },
                    {
                        title: 'Вин номер',
                        dataIndex: 'vin',
                        key: 'vin',
                    },
                    {
                        title: 'Владелец',
                        dataIndex: 'client',
                        key: 'client',
                    },
                ]}
                data={trailers}
            />
        </>
    )
};

export default TrailersPage;