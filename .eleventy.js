const i18n = require("eleventy-plugin-i18n");
const translations = require("./src/_data/i18n/index");

module.exports = config => {
    // i18n stuff
    config.addPlugin(i18n, {
        translations,
        fallbackLocales: {
            "*": "nl-NL",
        },
    });

    // Browsersync
    // Redirect from root to default language root during --serve
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, bs) {
                bs.addMiddleware("*", (req, res) => {
                    if (req.url === "/") {
                        res.writeHead(302, {
                            location: "/nl-NL/",
                        });
                        res.end();
                    }
                });
            },
        },
    });

    // end i18n stuff

    // Filters

    config.addFilter("log", value => {
        console.log(value);
    });

    config.addFilter("getSingleKey", value => Object.keys(value).pop());
    config.addFilter("getSingleValue", value => Object.values(value).pop());

    // end Filters

    config.addPassthroughCopy("./src/static/images/");
    config.addPassthroughCopy("./src/static/docs/");
    config.addPassthroughCopy({ "./src/static/root/": "/" });
    return {
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
        },
    };
};