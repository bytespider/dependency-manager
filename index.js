var path = require('path');

function DependencyManager(config) {
    this.module_dir = config ? path.normalize(config.module_dir + '/') : process.cwd();
    this.map = {};
}
DependencyManager.prototype.register = function (fn, dependencies) {
    if (typeof fn == 'string') {
        fn = require(this.module_dir + fn);
    }

    var prototype_name = fn.name;
    if (!(prototype_name in this.map)) {
        this.map[prototype_name] = {
            prototype_constructor: fn,
            dependencies: dependencies
        }
    }
};
DependencyManager.prototype.create = function (fn_name) {
    if ((fn_name in this.map)) {
        var object = new this.map[fn_name].prototype_constructor;
        var deps = this.map[fn_name].dependencies;

        for (var i in deps) {
            object[i] = this.create(deps[i]);
        }

        return object;
    }

    return null;
}

module.exports = DependencyManager;
