import React from 'react';
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
  setItems
}) => {
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
        // console.log(visibleTimeStart)
        // console.log(visibleTimeEnd);
        updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    };

    console.log(groups);
    console.log(items);
    return (
        <S._TimeLinePicker
            keys={keys}
            groups={groups}
            items={items}
            defaultTimeStart={moment(selectedDate).add(-12, 'hour')}
            defaultTimeEnd={moment(selectedDate).add(12, 'hour')}
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