import Syntaxe from '../../../dist/index.min.js';
import countries from '../../../data/countries.js';

/*
- Return just name, capital and currency_symbol for each object in the array
- name must begin with the 'a' alphabet (case-insensitive) or the 'n' alphabet (case-insensitive) 
*/

const sx = new Syntaxe({
    data: countries,
    schema: `{
        name [regexin:[/^a/i, /^n/i]]
        capital
        currency_symbol
    }`
});

await sx.query();

/*
Result:
[
  {"name": "Afghanistan", "capital": "Kabul", "currency_symbol": "؋"},
  {"name": "Aland Islands", "capital": "Mariehamn", "currency_symbol": "€"},
  {"name": "Albania", "capital": "Tirana", "currency_symbol": "Lek"},
  {"name": "Algeria", "capital": "Algiers", "currency_symbol": "دج"},
  {"name": "American Samoa", "capital": "Pago Pago", "currency_symbol": "$"},
  {"name": "Andorra", "capital": "Andorra la Vella", "currency_symbol": "€"},
  {"name": "Angola", "capital": "Luanda", "currency_symbol": "Kz"},
  {"name": "Anguilla", "capital": "The Valley", "currency_symbol": "$"},
  {"name": "Antarctica", "capital": "", "currency_symbol": "$"},
  {
    "name"           : "Antigua And Barbuda",
    "capital"        : "St. John's"         ,
    "currency_symbol": "$"
  },
  {"name": "Argentina", "capital": "Buenos Aires", "currency_symbol": "$"},
  {"name": "Armenia", "capital": "Yerevan", "currency_symbol": "֏"},
  {"name": "Aruba", "capital": "Oranjestad", "currency_symbol": "ƒ"},
  {"name": "Australia", "capital": "Canberra", "currency_symbol": "$"},
  {"name": "Austria", "capital": "Vienna", "currency_symbol": "€"},
  {"name": "Azerbaijan", "capital": "Baku", "currency_symbol": "m"},
  {"name": "Namibia", "capital": "Windhoek", "currency_symbol": "$"},
  {"name": "Nauru", "capital": "Yaren", "currency_symbol": "$"},
  {"name": "Nepal", "capital": "Kathmandu", "currency_symbol": "₨"},
  {"name": "Netherlands", "capital": "Amsterdam", "currency_symbol": "€"},
  {"name": "New Caledonia", "capital": "Noumea", "currency_symbol": "₣"},
  {"name": "New Zealand", "capital": "Wellington", "currency_symbol": "$"},
  {"name": "Nicaragua", "capital": "Managua", "currency_symbol": "C$"},
  {"name": "Niger", "capital": "Niamey", "currency_symbol": "CFA"},
  {"name": "Nigeria", "capital": "Abuja", "currency_symbol": "₦"},
  {"name": "Niue", "capital": "Alofi", "currency_symbol": "$"},
  {"name": "Norfolk Island", "capital": "Kingston", "currency_symbol": "$"},
  {"name": "North Korea", "capital": "Pyongyang", "currency_symbol": "₩"},
  {"name": "North Macedonia", "capital": "Skopje", "currency_symbol": "ден"},
  {
    "name"           : "Northern Mariana Islands",
    "capital"        : "Saipan"                  ,
    "currency_symbol": "$"
  },
  {"name": "Norway", "capital": "Oslo", "currency_symbol": "kr"}
]
*/