import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import bootstrap from './bootstrap.json';
import configurable_language from './a/configurable_language/configurable_language.json';
import user from './a/users/4939e9ae-8341-424d-941e-4bd79bc2f596.json';
import a from './a.json';
import accounts from './a/app/accounts.json';
import inquiries from './a/app/inquiries.json';
import programs from './a/app/program/program.json';
import programDetail from './a/app/program/00d7c633-8459-4eb4-8c8e-cb2b96882736.json';

// @ts-ignore
const apiUrl = API_URL;

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet(`${apiUrl}/a/`).reply(200, a);
mock.onGet(`${apiUrl}/a/app/bootstrap`).reply(200, bootstrap);
mock.onGet(`${apiUrl}/a/app/filter?type=inquiry`).reply(200, []);
mock.onGet(`${apiUrl}/a/app/filter?type=organization`).reply(200, []);
mock.onGet(`${apiUrl}/a/app/filter?type=program`).reply(200, []);
mock.onGet(`${apiUrl}/a/app/organization?sort=title`).reply(200, { status: 'success', data: [] });
mock.onGet(`${apiUrl}/a/app/program/00d7c633-8459-4eb4-8c8e-cb2b96882736/me`).reply(200, { data: { director: true } });
mock.onGet(`${apiUrl}/a/app/program/sources`).reply(200, ['Mentor Connector']);
mock.onGet(`${apiUrl}/a/app/program?sort=title`).reply(200, programs);
mock.onGet(`${apiUrl}/a/configurable_language/configurable_language`).reply(200, configurable_language);
mock.onGet(`${apiUrl}/a/users/4939e9ae-8341-424d-941e-4bd79bc2f596`).reply(200, user);
mock.onGet(`${apiUrl}/en/a/app/inquiry?sort=-created&page%5Blimit%5D=20&page%5Boffset%5D=0`).reply(200, inquiries);
mock.onGet(`${apiUrl}/en/a/app/organization?show=`).reply(200, { status: 'success', data: [] });
mock.onGet(`${apiUrl}/en/a/utils/strings`).reply(200, { status: 'success', data: [] });
mock.onGet(`${apiUrl}/session/token`).reply(200, {});
mock.onGet(new RegExp(`${apiUrl}/(en|fr)/a/app/program/00d7c633-8459-4eb4-8c8e-cb2b96882736.*`)).reply(200, programDetail);
mock.onGet(new RegExp(`${apiUrl}/en/a/app/accounts.*`)).reply(200, accounts);
mock.onGet(new RegExp(`${apiUrl}/en/a/app/program\?.*`)).reply(200, programs);
