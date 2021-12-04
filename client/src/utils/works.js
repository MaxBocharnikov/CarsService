export const getInitialWorksFields = (work) => {
    return {
        id: work?.id || '',
        name : work?.name || '',
        number: work?.number || '',
        time: work?.time || undefined,
    }
};