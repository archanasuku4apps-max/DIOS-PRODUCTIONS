const axios = require("axios");

async function getGameData(placeId) {
  try {
    // Get Universe ID
    const universeRes = await axios.get(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );

    const universeId = universeRes.data.universeId;

    // Get Game Info
    const gameRes = await axios.get(
      `https://games.roblox.com/v1/games?universeIds=${universeId}`
    );

    const game = gameRes.data.data[0];

console.log(game);

    // Get Game Thumbnail
    const thumbRes = await axios.get(
      `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`
    );

    const thumbnail =
      thumbRes.data.data?.[0]?.imageUrl ||
      "https://tr.rbxcdn.com/default-game-icon.png";

    return {
      universeId,
      name: game.name,
      playing: game.playing,
      maxPlayers: game.maxPlayers,
      visits: game.visits,
      favorites: game.favoritedCount ?? 0,
      thumbnail,
    };
  } catch (error) {
    console.error("Roblox API Error:", error.message);
    return null;
  }
}

module.exports = {
  getGameData,
};
