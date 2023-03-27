import fetch, { fetchDown } from '@/util/fetch';

export default {
  testapi: fetch('/aaaaaa', 'get', {
    ignoreToken: true,
  }),
  blobapi: fetchDown('/aaaaaa', 'get'),
};
