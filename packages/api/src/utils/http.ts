import { CustomException } from './CustomException';

export const get = async (
  url: string | URL | Request,
  options?: RequestInit,
) => {
  try {
    const response = await fetch(url, options);
    // if (response.ok) return await response.json();
    // else throw new CustomException('Dumb', 'FFF');
    return await response.json();
  } catch (ex) {
    return ex;
  }
};
