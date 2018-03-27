// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    deviceApi: 'http://145.24.222.238/api/devices/',
    issueApi: 'http://145.24.222.238/api/issues/',
    notificationsApi: 'http://145.24.222.238/api/notifications/',
    readingApi: 'http://145.24.222.238/api/readings/',
    reservationApi: 'http://145.24.222.238/apireservations/',
    roleApi: 'http://145.24.222.238/api/roles/',
    roomApi: 'http://145.24.222.238/api/rooms/',
    userApi: 'http://145.24.222.238/api/users/',
};
