const inputBar = document.querySelector('input');
const submitButton = document.querySelector('button');
const cardsDiv = document.querySelector('.cities');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  getApiWeather(inputBar.value);
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
    console.log(weatherApi.data);
    console.log(name, temp, country, weather[0].main);

    const cardCity = document.createElement('div');
    cardCity.classList.add('city');
    cardCity.innerHTML = `
        <h2 class="city-name">${
          name.includes('Province') ? name.lastIndexOf(0, 'Province') : name
        } <sup>${country}</sup></h2>
        <li class="city-temp">${Math.round(temp)}<sup>℃</sup></li>
        <img src="./svg/${weather[0].icon}.svg" class="city-icon" alt="" />
        <p>
            <figcaption>${weather[0].description}</figcaption>
        </p>`;
    cardsDiv.appendChild(cardCity);
    inputBar.value = '';
  } catch (error) {
    console.log(error);
  }
};
