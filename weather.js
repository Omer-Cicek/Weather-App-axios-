const inputBar = document.querySelector('input');
const submitButton = document.querySelector('button');
const cardsDiv = document.querySelector('.cities');
const everyCardItem = document.querySelectorAll('.city');
const duplicateMessage = document.querySelector('.msg');

const cityArray = [];

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!cityArray.includes(inputBar.value)) {
    getApiWeather(inputBar.value);
  } else {
    duplicateMessage.innerText = `You already know the weather for ${inputBar.value} , Please search for another city😉`;
    setTimeout(() => {
      duplicateMessage.innerText = '';
    }, 3000);
  }
  cityArray.push(inputBar.value);
  inputBar.value = '';
});

const getApiWeather = async (city) => {
  const apikey = '0484911c888ace660e39553d21c622d9';
  try {
    const weatherApi = await axios({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`,
      method: 'get',
    });
    const {
      name,
      main: { temp },
      sys: { country },
      weather,
    } = weatherApi.data;
    const cardCity = document.createElement('div');
    cardCity.classList.add('city');
    cardCity.innerHTML = `
            <h2 class="city-name">${
              name.includes('Province') ? name.split(' ').slice(0, -1) : name
            } <sup>${country}</sup></h2>
            <li class="city-temp">${Math.round(temp)}<sup>℃</sup></li>
            <img src="./svg/${weather[0].icon.slice(
              0,
              2
            )}d.svg" class="city-icon" alt="" />
            <p>
                <figcaption>${weather[0].description}</figcaption>
            </p>`;
    cardsDiv.appendChild(cardCity);
  } catch (error) {
    alert('Something went wrong! 🙉');
    cityArray.pop();
  }
};
