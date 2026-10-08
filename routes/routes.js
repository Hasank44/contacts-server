import adminRoute from './adminRoute.js';

const routes = [
    { path: '/api/v2/admin', handler: adminRoute },

];

const setRoute = app => {
    routes.forEach(({ path, handler }) => app.use(path, handler));
};

export default setRoute;