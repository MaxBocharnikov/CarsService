export const getInitialPartFields = (part) => {
  return {
      id: part?.id || '',
      name: part?.name || '',
      number: part?.number || '',
      prefix: part?.prefix || '',
      price: part?.price || '',
      markUp: part?.markUp || '',
      retailPrice: part?.retailPrice || '',
      category: part?.category || '',
      measure: part?.measure || '',
      quantity: part?.quantity || '',
  }
};