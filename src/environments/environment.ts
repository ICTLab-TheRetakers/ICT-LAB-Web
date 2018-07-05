// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    deviceApi: '/api/devices/',
    issueApi: '/api/issues/',
    notificationsApi: '/api/notifications/',
    readingApi: '/api/readings/',
    reservationApi: '/api/reservations/',
    roleApi: '/api/roles/',
    roomApi: '/api/rooms/',
    userApi: '/api/users/',
    hours: ['8:30-9:20', '9:20-10:10', '10:30-11:20', '11:20-12:10', '12:10-13:00', '13:00-13:50', '13:50-14:40', '15:00-15:50',
        '15:50-16:40', '17:00-17:50', '17:50-18:40', '18:40-19:30', '19:30-20:20', '20:20-21:10', '21:10-22:00'],
};
