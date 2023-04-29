import Hapi from "@hapi/hapi";


const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: "localhost"
    });

    server.route({
        method: "GET",
        path: "/heroes",
        handler: function (request, reply) {
            return "Hello";
        }
    });

    await server.start();
    console.log("[server] Server running on %s", server.info.uri);

};

init();