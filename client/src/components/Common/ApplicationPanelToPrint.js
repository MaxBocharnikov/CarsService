import React from 'react';
import PanelWrapper from './PanelWrapper/PanelWrapper';
import Select from './UI-Components/Controls/Selector/Selector';
import Input from './UI-Components/Controls/Input/Input';
import MaskedInput from './UI-Components/Controls/Input/MaskedInput';
import WorksTable from './ApplicationPanel/components/WorksTable';
import PartsTable from './ApplicationPanel/components/PartsTable';
import SumResult from './ApplicationPanel/components/SumResult/SumResult';


const ApplicationPanelToPrint = React.forwardRef(({
    fields,
    posts,
    clients,
    trailers,
    workingHours,
    works,
    parts,
}, ref) => {
    return (
        <div className="print" ref={ref}>
            <PanelWrapper
                title="Заявка"
                btnArray={[]}
                isFullScreen
                isPrint
            >
                <Select
                    label="Контрагент"
                    value={fields.client}
                    data={clients.map(p => (
                        {
                            value: p.id,
                            label: p.name
                        }
                    ))}
                    width="50%"
                />
                <Select
                    label="ТС"
                    value={fields.trailers[0]}
                    data={trailers.map(p => (
                        {
                            value: p.id,
                            label: p.name
                        }
                    ))}
                    width="50%"
                />
                <div className="oneLineItems" style={{justifyContent: 'start'}}>
                    <Input
                        label="Имя"
                        value={fields.name}
                        width="25%"
                    />
                    <Input
                        label="Телефон"
                        value={fields.phone}
                        width="25%"
                    />
                </div>
                <Input
                    label="Описание"
                    value={fields.description}
                    width="50%"
                />
                <div className="oneLineItems">
                    <MaskedInput
                        label="Дата"
                        value={fields.date}
                        width="25%"
                        mask="1111.11.11-1111.11.11"
                    />
                    <MaskedInput
                        label="Время"
                        value={fields.time}
                        width="25%"
                        mask="11:11-11:11"
                    />
                    <Select
                        label="Пост"
                        value={fields.post}
                        width="25%"
                        data={posts.map(p => (
                            {
                                value: p.id,
                                label: p.title
                            }
                        ))}
                    />
                </div>
                <Select
                    label="Норма часа"
                    value={fields.workingHourId}
                    width="25%"
                    data={workingHours.map(p => (
                        {
                            value: p.id,
                            label: p.title
                        }
                    ))}
                />
                <WorksTable
                    fields={fields}
                    works={works}
                    workingHours={workingHours}
                />
                <PartsTable
                    fields={fields}
                    parts={parts}
                />
                <SumResult fields={fields}/>
            </PanelWrapper>
        </div>
    )
});

export default ApplicationPanelToPrint;