export const FORM_REGEX = {
    number: '^[0-9]+$',
    idCC: '^[0-9]{7,15}$',
    textWithSpaces: '^(\\S\\D[a-zA-Z]+)\\D+[a-zA-Z]+$',
    cellPhone: '^([1-9]{1})([0-9]{9})$',
    email: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    licensePlate: '^[a-zA-Z]{3}\\d{3}$',
    year: '^[0-9]{4}$',
    oneWord: '^[a-zA-ZÀ-ÿ]{3,50}$',
    tonsWeight: '^[0-9]+([.][0-9]+)?$',
    doubleNumber: '^[0-9]+([.][0-9]+)?$'
};