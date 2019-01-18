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
        .then(res => res)
        .catch(err => err);
    } catch (error) {
      console.log('ERROR PUT', error);
    }
  },
};
