import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchClients, setClientsList} from '../../store/clients';
import ListPageWrapper from '../../components/Common/UI-Components/ListPageWrapper/ListPageWrapper';
import AddClientPanel from '../../components/Common/AddClientPanel/AddClientPanel';

const ClientsPage = () => {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients.clientsList);

    const [isAddClientPanelOpen, setIsAddClientPanelOpen] = useState(false);
    const [dataItem, setDataItem] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(fetchClients());
    }, []);

    useEffect(() => {
        return () => {
            dispatch(setClientsList([]));
        };
    }, []);

    return (
        <>
            {!!dataItem && (
                <AddClientPanel
                    onClose={() => setDataItem(false)}
                    dataItem={dataItem}
                    searchValue={searchValue}
                />
            )}
           {isAddClientPanelOpen && (
               <AddClientPanel
                   onClose={() => setIsAddClientPanelOpen(false)}
                   searchValue={searchValue}
               />
           )}
            <ListPageWrapper
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                addButtonLabel="Добавить контрагента"
                onAddClick={() => {setIsAddClientPanelOpen(true)}}
                searchPlaceholder="Поиск по имени или ИНН"
                onSearch={(query) => dispatch(fetchClients(query))}
                onRowClick={item => setDataItem(item)}
                columns={[
                    {
                        title: 'Наименование',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'ИНН',
                        dataIndex: 'inn',
                        key: 'inn',
                    },
                    {
                        title: 'Адрес',
                        dataIndex: 'address',
                        key: 'address',
                    },
                ]}
                data={clients}
            />
        </>
    )
};

export default ClientsPage;