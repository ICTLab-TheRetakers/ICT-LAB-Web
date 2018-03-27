// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    baseUrl: 'http://145.24.222.238/api',
    deviceApi: this.baseUrl += '/devices/',
    issueApi: this.baseUrl += '/issues/',
    notificationsApi: this.baseUrl += '/notifications/',
    readingApi: this.baseUrl += '/readings/',
    reservationApi: this.baseUrl += '/reservations/',
    roleApi: this.baseUrl += '/roles/',
    roomApi: this.baseUrl += '/rooms/',
    userApi: this.baseUrl += '/users/',
};
