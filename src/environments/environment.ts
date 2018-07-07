// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    //TODO: Bij gebruik van local database haal het IP weg
    production: false,
    deviceApi: 'http://145.24.222.238/api/devices/',
    issueApi: 'http://145.24.222.238/api/issues/',
    notificationsApi: 'http://145.24.222.238/api/notifications/',
    readingApi: 'http://145.24.222.238/api/readings/',
    reservationApi: 'http://145.24.222.238/api/reservations/',
    roleApi: 'http://145.24.222.238/api/roles/',
    roomApi: 'http://145.24.222.238/api/rooms/',
    userApi: 'http://145.24.222.238/api/users/',
    hours: ['8:30-9:20', '9:20-10:10', '10:30-11:20', '11:20-12:10', '12:10-13:00', '13:00-13:50', '13:50-14:40', '15:00-15:50',
        '15:50-16:40', '17:00-17:50', '17:50-18:40', '18:40-19:30', '19:30-20:20', '20:20-21:10', '21:10-22:00'],
};
