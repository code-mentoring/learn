import { generatePath } from 'react-router';
import { CONFIG } from '../config';

interface Params {
  [key: string]: number | string;
}

export const linkParams = <T extends Params = {}>(
  link: string,
  usePrefix = true
) =>
    (params?: T | false) => {
      const l = `${usePrefix ? CONFIG.prefix : ''}${link}`;
      if (params === false) return l;

      return generatePath(l, params);
    };

export const routes = {
  login: linkParams('/login'),
  logout: linkParams('/logout'),

  // Authed
  home: linkParams('/admins'),
  admins: linkParams('/admins'),
  paths: linkParams('/paths'),
  questions: linkParams('/questions'),
  settings: linkParams('/settings')
};
