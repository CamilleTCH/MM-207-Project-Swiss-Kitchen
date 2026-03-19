import { hashs } from '../global_stuff.mjs'

function createRouter(){
    const routes = {}

    function on(path, handler){
        routes[path] = handler;
    }

    function resolve(){
        const currentHash = window.location.hash.slice(1) || hashs.home;

        const [path, param] = currentHash.split("/");

        const handler = routes[path] || routes["not-found"];

        if (handler){
            handler(param);
        }
    }

    function navigate(destination){
        console.log(`NAVIGATING TO : ${destination}`);
        window.location.hash = destination;
    }

    function start(){
        window.addEventListener("hashchange", resolve);
        resolve();
    }

    const router = {
        on: on,
        resolve: resolve,
        navigate: navigate,
        start: start
    }

    return router;
}

const router = createRouter();

export default router