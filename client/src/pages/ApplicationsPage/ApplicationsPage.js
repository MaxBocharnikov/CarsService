import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchApplicationDetails, fetchApplications, setApplicationDetails,
    setApplicationsList
} from '../../store/applications';
import ListPageWrapper from '../../components/Common/UI-Components/ListPageWrapper/ListPageWrapper';
import {mapFromApplicationToApplicationPageTableData} from '../../utils/mapping/applications';
import ExtendedApplicationPanel from '../../components/Common/ApplicationPanel/ExtendedApplicationPanel';

const ApplicationsPage = () => {
    const dispatch = useDispatch();
    const applicationsList = useSelector(state => state.applications.applicationsList);
    const applicationDetails = useSelector(state => state.applications.applicationDetails);

    const [searchValue, setSearchValue] = useState('');
    const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchApplications());
    }, []);

    useEffect(() => {
        return () => {
          dispatch(setApplicationsList([]));
        };
    }, []);

    return (
        <>
            {isNewApplicationModalOpen && (
                <ExtendedApplicationPanel
                    searchValue={searchValue}
                    isNew={true}
                    onClose={() => setIsNewApplicationModalOpen(false)}
                />
            )}
            {!!applicationDetails && (
                <ExtendedApplicationPanel
                    searchValue={searchValue}
                    applicationDetails={applicationDetails}
                    onClose={() => dispatch(setApplicationDetails(null))}
                />
            )}
            <ListPageWrapper
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                addButtonLabel="Добавить заявку"
                onAddClick={() => {setIsNewApplicationModalOpen(true)}}
                searchPlaceholder="Поиск по контрагенту"
                onSearch={(query) => dispatch(fetchApplications(query))}
                onRowClick={item => dispatch(fetchApplicationDetails(item.id))}
                columns={[
                    {
                        title: '№',
                        dataIndex: 'number',
                        key: 'number',
                    },
                    {
                        title: 'Дата',
                        dataIndex: 'date',
                        key: 'date',
                    },
                    {
                        title: 'Заказчик',
                        dataIndex: 'client',
                        key: 'client',
                    },
                    {
                        title: 'ТС',
                        dataIndex: 'trailer',
                        key: 'trailer',
                    },
                    {
                        title: 'Сумма',
                        dataIndex: 'sum',
                        key: 'sum',
                    },
                    {
                        title: 'Контакты',
                        dataIndex: 'contacts',
                        key: 'contacts',
                    },
                ]}
                data={applicationsList.map(mapFromApplicationToApplicationPageTableData)}
            />
        </>
    )
};

export default ApplicationsPage;