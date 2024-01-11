export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    PROFILE: '/profile',
    GAME: '/game',
    GAME_SINGLEPLAYER: '/game/singleplayer',
    GAME_MULTIPLAYER: '/game/multiplayer',
    LOBBY: '/lobby',
  };
  
  export const PROTECTED = [
    ROUTES.PROFILE,
    ROUTES.GAME_SINGLEPLAYER,
    ROUTES.GAME_MULTIPLAYER,
    ROUTES.LOBBY,
    ROUTES.GAME,
  ];