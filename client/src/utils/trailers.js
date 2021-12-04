
export const getInitialTrailerFields = (trailer) => {
    return {
        id: trailer?.id || '',
        type: trailer?.type || '',
        model: trailer?.model || '',
        vin: trailer?.vin || '',
        stateNumber: trailer?.stateNumber ||'',
        mileage: trailer?.mileage || '',
        client: trailer?.client || '',
        name: trailer?.name || '',
        contract: trailer?.contract || '',
        guaranteeType: trailer?.guaranteeType || '',
        guaranteeStartDate: trailer?.guaranteeStartDate || '',
        guaranteeEndDate: trailer?.guaranteeEndDate || '',
    }
};