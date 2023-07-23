// Сортировка миниатюр фотографий других пользователей

// Массив с сервера
import {data} from './api.js';
import { createMiniaturePosts } from './create-miniature-posts.js';
import { showAlert } from './util.js';
import { generateArrayUniqueNumbers } from './util.js';
// Секция с фильтрами
const imageFilters = document.querySelector('.img-filters');
// По умолчанию
const imageFilterDefault = document.querySelector('#filter-default');
// Случайные
const imageFilterRandom = document.querySelector('#filter-random');
// Обсуждаемые
const imageFilterDiscussed = document.querySelector('#filter-discussed');
// Делаем копию массива с сервера
const copyPosts = data.slice();

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-rendom',
  DISCUSSED: 'filter-discussed',
};

let currentFilter = Filter.DEFAULT;

// <По умолчанию — фотографии в изначальном порядке с сервера - передаем в main полученный с сервера массив data>

// <Случайные — 10 случайных, не повторяющихся фотографий>
// Генерируем 10 неповторяющихся чисел
const randomNumbers = generateArrayUniqueNumbers(1, 25);
const createRandomPosts = () => {
  const randomPosts = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    const posts = data.find((post) => randomNumbers[i] === post.id);
    randomPosts.push(posts);
  }
  return randomPosts;
};
// Показываем 10 случайных неповторяющихся постов
const randomData = createRandomPosts();

// <Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев>
// Сортируем посты по убыванию количества коментариев
const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;
// Показываем сначала посты с большим количеством комметариев
const discussedData = copyPosts.sort(comparePosts);

// По умолч
const renderDefaultPosts = () => {
  try {
    createMiniaturePosts(data);
  } catch (err) {
    showAlert(err.message);
  }
};

// рандом
const renderRandomPosts = () => {
  try {
    createMiniaturePosts(randomData);
  } catch (err) {
    showAlert(err.message);
  }
};

// Комменты
const renderDiscussedPosts = () => {
  try {
    createMiniaturePosts(discussedData);
  } catch (err) {
    showAlert(err.message);
  }
};

// Показываем посты в соответствии с нужным фильтром
const renderPosts = (filter) => {
  if (filter === imageFilterDefault) {
    renderDefaultPosts();
  } else if (filter === imageFilterRandom) {
    renderRandomPosts();
  } else if (filter === imageFilterDiscussed) {
    renderDiscussedPosts();
  }
};

const renderSortedPosts = () => {
  renderDefaultPosts();
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    imageFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target;
    renderPosts(currentFilter);
  });
};

renderSortedPosts();

  // switch (currentFilter) {
  //   case Filter.RANDOM:
  //     return renderRandomPosts();
  //   case Filter.DISCUSSED:
  //     return renderDiscussedPosts();
  //   default:
  //     return renderDefaultPosts();
  // }