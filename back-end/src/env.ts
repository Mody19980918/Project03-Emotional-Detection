import { config } from 'dotenv';
import populateEnv from 'populate-env';

export let env = {
  JWT_SECRET: '',
};

config();
populateEnv(env, { mode: 'halt' });
