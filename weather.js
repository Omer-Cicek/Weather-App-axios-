const getApiWeather = async () => {
  const apikey = '0484911c888ace660e39553d21c622d9';
  try {
    const weatherApi = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=canakkale&appid=${apikey}&units=metric`
    );
    const { data } = weatherApi;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('load', () => {
  getApiWeather();
});
