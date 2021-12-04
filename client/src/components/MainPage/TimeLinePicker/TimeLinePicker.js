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

const itemRenderer = ({item, itemContext, getItemProps, getResizeProps}) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    return (
        <div {...getItemProps(item.itemProps)}>
            {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

            <div
                className="rct-item-content"
                style={{ maxHeight: `${itemContext.dimensions.height}` }}
            >
                <span className="title">{itemContext.title}</span>
                <span className="time">{item.start.format('HH:mm')}-{item.end.format('HH:mm')}</span>
            </div>

            {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
        </div>
    )
};

const TimeLinePicker = ({
  selectedDate,
  groups,
  items,
  setItems,
  onChangeDate,
  selectedCalendarDate,
  applications,
  setNewApplicationDefaultDataMemo,
  onApplicationOpen
}) => {
    const [key, setKey] = useState(1);

    const handleItemMove = (itemId, dragTime, newGroupOrder) => {
        const group = groups[newGroupOrder];
        const foundItem = items.find(i => i.id === itemId);
        const foundApplication = applications.find(a => a.id === itemId);
        if (!foundItem || !foundApplication) return;
        const updated =  Object.assign({}, foundApplication, {
            startDate: moment(dragTime).format('YYYY.MM.DD, HH:mm:ss'),
            endDate: moment(moment(dragTime) + (moment(foundItem.end) - moment(foundItem.start))).format('YYYY.MM.DD, HH:mm:ss'),
            postId: group.id
        });
        setItems(updated);
    };


    const handleItemResize = (itemId, time, edge) => {
        const foundItem = items.find(i => i.id === itemId);
        const foundApplication = applications.find(a => a.id === itemId);
        if (!foundItem || !foundApplication) return;
        const updated = Object.assign({}, foundApplication, {
            startDate: edge === "left" ? moment(foundItem).format('YYYY.MM.DD, HH:mm:ss') : foundItem.start,
            endDate: edge === "left" ? foundItem.end : moment(time).format('YYYY.MM.DD, HH:mm:ss')
        });
        setItems(updated);
    };

    const handleCanvasContextMenu = (group, time) => {
        setNewApplicationDefaultDataMemo({ startDate: moment(time), endDate: moment(time).add(1, 'hour'), group});
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
        <S.Wrapper>
            <S.Note>Время</S.Note>
            <S._TimeLinePicker
                key={key}
                keys={keys}
                groups={groups}
                items={items.map(i => {
                    return {
                        ...i,
                        start: moment(i.start),
                        end: moment(i.end),
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
                lineHeight={65}
                itemHeightRatio={0.86}
                itemRenderer={itemRenderer}
                onItemDoubleClick={onApplicationOpen}

            />
        </S.Wrapper>
    )
};

export default TimeLinePicker;