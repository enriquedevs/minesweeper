const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:5000';

class Service {
  static async getUser(username) {
    try {
      const response = await axios.get(`/user/${username}`);
      return response.data;
    } catch (err) {
      console.error(err)
      return null;
    }
  }

  static async saveGame(username, rows, cols, bombs, board, cellsState, cellsClicked, minutes, seconds, millis, victory, endGame, gameId, existingUser=false) {
    try {
      const request = { rows, cols, bombs, board, cellsState, cellsClicked, minutes, seconds, millis, victory, endGame, gameId };
      if (!existingUser) {
        await axios.post(`/user/${username}`);
      }
      const response = await axios.post(`/user/${username}/game`, request);
      return response.data;
    } catch (err) {
      console.error(err)
      return null;
    }
  }
}

export default Service;