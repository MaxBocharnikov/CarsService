import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListPageWrapper from '../../components/Common/UI-Components/ListPageWrapper/ListPageWrapper';
import {fetchWorks, setWorks} from '../../store/works';
import AddWorkPanel from '../../components/Common/AddWorkPanel/AddWorkPanel';

const WorksPage = () => {
    const dispatch = useDispatch();
    const works = useSelector(state => state.works.worksList);
    const [dataItem, setDataItem] = useState(null);

    const [isAddWorkPanelOpen, setIsAddWorkPanelOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(fetchWorks());
        return () => {
            dispatch(setWorks([]));
        };
    }, []);

    return (
        <>
        {isAddWorkPanelOpen && (
            <AddWorkPanel
                onClose={() => setIsAddWorkPanelOpen(false)}
                searchValue={searchValue}
            />
        )}
        {!!dataItem && (
            <AddWorkPanel
                onClose={() => setDataItem(null)}
                dataItem={dataItem}
                searchValue={searchValue}
            />
        )}
        <ListPageWrapper
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            addButtonLabel="Добавить работу"
            onAddClick={() => {setIsAddWorkPanelOpen(true)}}
            searchPlaceholder="Поиск по номеру или имени"
            onSearch={(query) => dispatch(fetchWorks(query))}
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
            ]}
            data={works}
        />
        </>
    )
};

export default WorksPage;