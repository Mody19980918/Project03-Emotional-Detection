export interface rankingData {
  username: string;
  score: number;
  date_created: Date;
}

export interface GameData {
  date_created: string;
  game_type: string;
  id: number;
  score: number;
  users_id: number;
  username: string;
}

export interface UserAccount {
  username: string;
  password: string;
}

export let googleClientId =
  '889880116826-53t8hq7uv8gc7mk30ckj1tchsdq5180m.apps.googleusercontent.com';
