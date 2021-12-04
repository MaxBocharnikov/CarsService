export const getCliettModalInitialData = (dataItem, TYPES) => {
    return {
        id: dataItem?.id || '',
        type: dataItem?.type || TYPES.entity,
        name: dataItem?.name || '',
        address: dataItem?.address || '',
        legalAddress:dataItem?.legalAddress || '',
        inn: dataItem?.inn || '',
        kpp: dataItem?.kpp ||'',
        ogrn: dataItem?.ogrn || '',
        carInfo: dataItem?.carInfo || [],
        contactInfo: dataItem?.contactInfo || [],
    }
};