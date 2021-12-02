import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListPageWrapper from '../../components/Common/UI-Components/ListPageWrapper/ListPageWrapper';
import {fetchOrderDetails, fetchOrders, setOrderDetails, setOrdersList} from '../../store/orders';
import {mapFromApplicationToApplicationPageTableData} from '../../utils/mapping/applications';
import OrderPanel from '../../components/Common/OrderPanel/OrderPanel';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.ordersList);
    const orderDetails = useSelector(state => state.orders.orderDetails);

    const [isAddClientPanelOpen, setIsAddClientPanelOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    useEffect(() => {
        return () => {
            dispatch(setOrdersList([]));
        };
    }, []);

    return (
        <>
        {!!orderDetails && (
            <OrderPanel
                onClose={() => dispatch(setOrderDetails(null))}
                data={orderDetails}
                searchValue={searchValue}
            />
        )}
        {isAddClientPanelOpen && (
            <OrderPanel
                onClose={() => setIsAddClientPanelOpen(false)}
                searchValue={searchValue}
                isNew
            />
        )}
        <ListPageWrapper
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            addButtonLabel="Добавить заказ наряд"
            onAddClick={() => {setIsAddClientPanelOpen(true)}}
            searchPlaceholder="Поиск по контрагенту"
            onSearch={(query) => dispatch(fetchOrders(query))}
            onRowClick={item => dispatch(fetchOrderDetails(item.id))}
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
            data={orders.map(mapFromApplicationToApplicationPageTableData)}
        />
        </>
    )
};

export default OrdersPage;