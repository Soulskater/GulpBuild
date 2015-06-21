var path = require("path");

var _path = {
    src: "./src",
    dist: "./dist",
    infrastructure: "./infrastructure",
    packages: "./packages",
    components: "/components",
    scripts: "/js",
    styles: "/less",
    templates: "/templates",
    contents: "/content",

};

_path.componentScripts = path.join(_path.components, _path.scripts);
_path.componentStyles = path.join(_path.components, _path.styles);
_path.componentTemplates = path.join(_path.components, _path.templates);
_path.componentContents = path.join(_path.components, _path.contents);

module.exports = {
    path: _path,
    getSrcPath: function (subPath) {
        return _getPath(_path.src, arguments);
    },
    getDistPath: function (subPath) {
        return _getPath(_path.dist, arguments);
    },
    getInfrastructurePath: function (subPath) {
        return _getPath(_path.infrastructure, arguments);
    },
    bower: {
        json: "./bower.json",
        directory: "./.bowerrc.json",
    }
};

function _getPath(base, arguments){
    var result = base;
    for (var i = 0; i < arguments.length; i++)
    {
        result = path.join(result, arguments[i]);
    }
    return result
}