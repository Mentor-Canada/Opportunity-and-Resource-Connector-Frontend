import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import bootstrap from './bootstrap.json';
import configurable_language from './a/configurable_language/configurable_language.json';
import user from './a/users/4939e9ae-8341-424d-941e-4bd79bc2f596.json';
import a from './a.json';
import accounts from './a/app/accounts.json';

// @ts-ignore
const apiUrl = API_URL;

const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onGet(apiUrl + '/a/app/bootstrap').reply(200, bootstrap);
mock.onGet(apiUrl + '/a/').reply(200, a);
mock.onGet(apiUrl + '/session/token').reply(200, {});
mock.onGet(apiUrl + '/a/users/4939e9ae-8341-424d-941e-4bd79bc2f596').reply(200, user);
mock.onGet(apiUrl + '/a/configurable_language/configurable_language').reply(200, configurable_language);
mock.onGet(apiUrl + '/en/a/utils/strings').reply(200, {"status":"success","data":[]});
mock.onGet(new RegExp(apiUrl + '/en/a/app/accounts.*')).reply(200, accounts);
