import React, { useState } from 'react';
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

const initialGroups = [
    { id: 1, title: 'Пост 1' },
    { id: 2, title: 'Пост 2' },
    { id: 3, title: 'Пост 3' },
    { id: 4, title: 'Пост 4' },
];

const intialItems = [
    {
        id: 1,
        group: 1,
        title: 'item 1',
        start: moment(),
        end: moment().add(1, 'hour')
    },
    {
        id: 2,
        group: 2,
        title: 'item 2',
        start: moment().add(-0.5, 'hour'),
        end: moment().add(0.5, 'hour')
    },
    {
        id: 3,
        group: 1,
        title: 'item 3',
        start: moment().add(2, 'hour'),
        end: moment().add(3, 'hour')
    }
]

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

const TimeLinePicker = ({selectedDate}) => {
    const [groups, setGroups] = useState(initialGroups);
    const [items, setItems] = useState(intialItems);

    const handleItemMove = (itemId, dragTime, newGroupOrder) => {
        const group = groups[newGroupOrder];
        const updated = items.map(item =>
            item.id === itemId
                ? Object.assign({}, item, {
                    start: dragTime,
                    end: dragTime + (item.end - item.start),
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
                    start: edge === "left" ? time : item.start,
                    end: edge === "left" ? item.end : time
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

    return (
        <Timeline
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
        />
    )
};

export default TimeLinePicker;