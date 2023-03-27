import fetch, { fetchBlob } from '@/util/fetch';
import { baseURL } from './config';

export default {
  upload: fetch(baseURL + '/upload', 'post'),
  export: fetchBlob(baseURL + '/export', 'post'),
  import: fetchBlob(baseURL + '/import', 'post'),
  testapi: fetch(baseURL + '/test', 'get', {
    ignoreToken: true,
    ignoreMsg: true,
  }),
};
