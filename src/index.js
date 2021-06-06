import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { alert } from '@pnotify/core';
import API from './js/fetchCountries';
import getRefs from './js/refs';
import countryCardTpl from './templates/countryCard.hbs';
import countriesCardTpl from './templates/countryList.hbs';
import debounce from 'lodash.debounce';

function onSearch(e) {
  e.preventDefault();
  refs.countryContainer.innerHTML = '';
  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery).then(renderCountries).catch(anotherError);
  if (!searchQuery) {
    refs.countryContainer.innerHTML = '';
    return;
  }
}

const refs = getRefs();

function renderCountries(country) {
  if (country.length >= 10) {
    onFetchError();
  }
  if (country.length >= 2 && country.length <= 10) {
    const countriesMarkup = countriesCardTpl(country);
    return (refs.countryContainer.innerHTML = countriesMarkup);
  }
  if (country.length === 1) {
    const countryMarkup = countryCardTpl(country);
    refs.countryContainer.innerHTML = countryMarkup;
  }
}

function onFetchError() {
  return error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
}

function anotherError() {
  return alert({
    text: 'something went wrong',
  });
}

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
