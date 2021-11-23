import React, {useCallback} from 'react';
import _ from 'lodash';
import SS from '../Input/Input.styled';

const Select = ({
  label,
  value,
  onChange,
  width,
  data,
  onFocus,
  onBlur,
  onSearch
 }) => {
    const { Option } = SS.StyledSelect;

    const delayedSearch = useCallback(
        _.debounce((v) => {
            onSearch && onSearch(v);
        }, 300), []);

    return (
        <SS.Wrapper width={width}>
            <SS.Label>{label}</SS.Label>
            <SS.StyledSelect
                type="text"
                value={value}
                onChange={v => onChange(v)}
                onFocus={onFocus}
                onBlur={onBlur}
                showSearch
                onSearch={delayedSearch}
                filterOption={false}
            >
                {data.map(i => (
                    <Option key={i.value}
                            value={i.value}
                    >
                        {i.label}
                    </Option>
                ))}
            </SS.StyledSelect>
        </SS.Wrapper>
    )
};

export default Select;