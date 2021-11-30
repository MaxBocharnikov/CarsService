import React, {useState, useCallback, useEffect} from 'react';
import _ from 'lodash';
import S from './ListPageWrapper.styled';

const ListPageWrapper = ({
    addButtonLabel,
    onAddClick,
    searchPlaceholder,
    onSearch,
    columns,
    data,
    onRowClick,
}) => {
    const [searchValue, setSearchValue] = useState('');

    const delayedSearch = useCallback(
        _.debounce((v) => {
            onSearch && onSearch(v);
        }, 300), []);

    useEffect(() => {
        delayedSearch(searchValue)
    }, [searchValue]);

    return (
        <S.Wrapper>
            <S.Header>
                <S._Button
                    onClick={() => {
                        setSearchValue('');
                        onAddClick();
                    }}

                >
                    {addButtonLabel}
                </S._Button>
                <S._Input
                    width="50%"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={value => setSearchValue(value)}
                />
            </S.Header>
            <S._Table
                dataSource={data.map((d, index) => (d))}
                columns={columns}
                pagination={false}
                onRow={(record, recordIndex) => ({
                    onClick: () => { onRowClick(record) }
                })}
                rowKey={record => record.id}
            />
        </S.Wrapper>
    )
};

export default ListPageWrapper;