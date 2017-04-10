export const verifyPlaceType = (types) => {
    if (types.indexOf('route') !== -1) return 'street';
    else if (types.indexOf('sublocality') !== -1) return 'neighborhood';
    else if (types.indexOf('administrative_area_level_2') !== -1) return 'city';
    else if (types.indexOf('administrative_area_level_1') !== -1) return 'state';

    return '';
};