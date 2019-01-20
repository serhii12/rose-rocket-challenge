export const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter('', 10);
})('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

export const getDriverPosition = (stopsData, driverLocation) => {
  const { activeLegID, legProgress } = driverLocation;
  const percent = legProgress / 100;
  const result = stopsData.filter(
    el => el.name === activeLegID[0] || el.name === activeLegID[1]
  );
  const myX =
    Math.round((result[0].x - result[1].x) * (1 - percent)) + result[1].x;
  const myY =
    Math.round((result[0].y - result[1].y) * (1 - percent)) + result[1].y;
  return [myX * 6, myY * 6];
};

export const trackingAPI = {
  getDataFromApi: async data => {
    try {
      const response = await fetch(`/api/${data}`);
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.log('error getting data', error);
    }
  },
  updateLocation: async (legToUpdate, progress) => {
    try {
      return await fetch('/api/driver', {
        method: 'PUT',
        body: JSON.stringify({ legToUpdate, progress }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => console.log('result from api', res))
        .catch(err => err);
    } catch (error) {
      console.log('ERROR PUT', error);
    }
  },
};
