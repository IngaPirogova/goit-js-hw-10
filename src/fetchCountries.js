import { Notify } from "notiflix";

export function fetchCountries(name) {
    const searchCountry = 'name,capital,population,flags,languages';
    return fetch(
        `https://restcountries.com/v3.1/name/${name}?fields=${searchCountry}`
    ).then(response => {
        if (!response.ok) {
            throw new Error(
                Notify.failure('Oops, there is no country with that name')
            );
        }
        
    return response.json();
});
}

// export default function fetchCountries(name) {
//     return fetch(
//       `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`,
//     ).then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Error fetchin data');
//     });
//   }