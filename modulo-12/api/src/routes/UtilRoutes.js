const BaseRoutes = require("./BaseRoute");
const { join } = require("path");

class UtilRoutes extends BaseRoutes {
    constructor() {
        super();
    }

    index() {
        return {
            path: "/coverage/{param*}",
            method: "GET",
            config: {
                auth: false
            },
            handler: {
                directory: {
                    path: join(__dirname, "../../coverage"),
                    redirectToSlash: true,
                    index: true
                }
            }
        };
    }
}

module.exports = UtilRoutes;