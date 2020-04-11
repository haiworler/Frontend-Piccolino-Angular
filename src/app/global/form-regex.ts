export const FORM_REGEX = {
	number: '^[0-9]+$',
	textWithSpaces: '^(\\S\\D[a-zA-Z]+)\\D+[a-zA-Z]+$', //Texto con espacios
	cellPhone: '^([1-9]{1})([0-9]{9})$', // Celular
	email: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
	licensePlate: '^[a-zA-Z]{3}\\d{3}$', // Matrícula
	year: '^[0-9]{4}$',
	oneWord: '^[a-zA-ZÀ-ÿ]{3,50}$',// Una sola palabra
	tonsWeight: '^[0-9]+([.][0-9]+)?$',// Toneladas de peso
	doubleNumber: '^[0-9]+([.][0-9]+)?$',//Número doble
	minimumSevenNumbers: '^\\d{7,15}$', // minimo de 7 hasta 10
	minimumTenNumbers: '^\\d{10,20}$', // minimo que 10 hasta 12
	address: '\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+', // Dirección
	number1Al9: '^[1-9]\d*$',

};

