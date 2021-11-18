import React, {useState, useEffect} from 'react';
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import S from './TimeLinePicker.styled';



const keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title"
};

const TimeLinePicker = ({
  selectedDate,
  groups,
  items,
  setItems,
  onChangeDate,
  selectedCalendarDate
}) => {
    const [key, setKey] = useState(1);

    const handleItemMove = (itemId, dragTime, newGroupOrder) => {
        const group = groups[newGroupOrder];
        const updated = items.map(item =>
            item.id === itemId
                ? Object.assign({}, item, {
                    start: moment(dragTime),
                    end: moment(dragTime) + (item.end - item.start),
                    group: group.id
                })
                : item
        );
        setItems(updated);
    };


    const handleItemResize = (itemId, time, edge) => {
        const updated = items.map(item =>
            item.id === itemId
                ? Object.assign({}, item, {
                    start: edge === "left" ? moment(time) : item.start,
                    end: edge === "left" ? item.end : moment(time)
                })
                : item
        );
        setItems(updated);
    };

    const handleCanvasContextMenu = (group, time) => {
        const id = items.length + 1;
        const newItem = {
            id: id,
            group,
            title: `item ${id}`,
            start: moment(time),
            end: moment(time).add(1, 'hour'),
        };
        setItems([...items, newItem]);

    };

    const onTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
        if (!moment(visibleTimeStart).isSame(selectedDate, 'day')) {
            onChangeDate(moment(visibleTimeStart))
        }
        updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    };

    useEffect(() => {
        if (selectedCalendarDate) {
            setKey(key + 1);
        }
    }, [selectedCalendarDate]);

    return (
        <S._TimeLinePicker
            key={key}
            keys={keys}
            groups={groups}
            items={items.map(i => {
                return {
                    ...i, start: moment(i.start), end: moment(i.end)
                }
            })}
            defaultTimeStart ={moment(selectedDate)}
            defaultTimeEnd ={moment(selectedDate).add(23, 'hour')}
            onItemMove={handleItemMove}
            onItemResize={handleItemResize}
            fullUpdate
            stackItems
            onCanvasContextMenu={handleCanvasContextMenu}
            onTimeChange={onTimeChange}
        />
    )
};

export default TimeLinePicker;