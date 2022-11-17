import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const countryName = e.target.value.trim();
    if (!countryName) {
        return;
    }
fetchCountries(countryName)
    .then(response => {
        if (response.length > 10) {
            Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
        }
        if (response.length >= 2 && response.length <= 10) {
             listCountrySearch(response);
        }
        if (response.length === 1) {
            arrayCountrySearch(response)
        }
    })
    .catch(error => console.log(error));
    clearSearchCountry();
    }

function listCountrySearch(response) {
    const markup = response
        .map(el => {
            return `<li class="item_country">
            <img class="img" src="${el.flags.svg}" width = 50 alt="flag">
            <h3 class="title">${el.name.official}</h3>
            </li>`;
        })
        .join('');
    countryList.innerHTML = markup;
}
    
function arrayCountrySearch(response) {
    const markup = response
    .map(el => {
    return `<div class="item_country"><img class="img" src="${
        el.flags.svg
    }" width=50 alt="flag">
    <h1 class ="title">${el.name.official}</h1></div>
    <p class="text"><b>Capital:</b> ${el.capital}</p>
    <p class="text"><b>Population:</b> ${el.population}</p>
    <p class="text"><b>Languages:</b> ${Object.values(el.languages)}</p>`;
    })
    .join('');
    countryInfo.innerHTML = markup;
}
function clearSearchCountry() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}



// const DEBOUNCE_DELAY = 300;

// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');
// const countryInput = document.querySelector('#search-box');

// countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// function onSearch(e) {
//   e.preventDefault();
//   const searchQery = e.target.value.trim();
//   countryList.innerHTML = '';
//   countryInfo.innerHTML = '';

//   fetchCountries(searchQery)
//     .then(response => {
//       console.log(response.length);
//       if (response.length > 10) {
//         Notify.info('Too many matches found. Please enter a more specific name.');
//       }
//       if (response.length >= 2 && response.length <= 10) renderCountryList(response);
//       if (response.length === 1) {
//         renderCountryInfo(response);
//       }
//     })
//     .catch(error => Notify.failure('Oops, there is no country with that name'));
// }

// function renderCountryList(name) {
//   const countryListMarkup = countryListTpl(name);
//   countryList.innerHTML = countryListMarkup;
// }

// function renderCountryInfo(name) {
//   const countryInfotMarkup = countryInfoTpl(name);
//   countryInfo.innerHTML = countryInfotMarkup;
// }