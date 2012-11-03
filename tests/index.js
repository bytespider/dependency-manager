var DependencyManager = require('../');


function Apple() {}

function Peeler() {}
Peeler.prototype.peelable = null; // this will be an apple

function Juicer() {}
Juicer.prototype.peeler = null; // this will be a peeler
Juicer.prototype.peelable = null; // this will be a apple


exports['simple example'] = function (test) {
    test.expect(3);

    var di = new DependencyManager();
    di.register(Apple); // has no dependencies
    di.register(Peeler, {
        'peelable': 'Apple'
    });
    di.register(Juicer, {
        'peeler': 'Peeler',
        'peelable': 'Apple'
    });

    var juicer = di.create('Juicer');

    test.ok(juicer instanceof Juicer);
    test.ok(juicer.peeler instanceof Peeler);
    test.ok(juicer.peelable instanceof Apple);

    test.done();
};

exports['require dependencies'] = function (test) {
    test.expect(3);

    var di = new DependencyManager({module_dir: __dirname});
    di.register('./Apple');
    di.register('./Peeler', { 'peelable': 'Apple' });
    di.register('./Juicer', { 'peeler': 'Peeler', 'peelable': 'Apple' });

    var juicer = di.create('Juicer');

    var Juicer = require('./Juicer');
    var Peeler = require('./Peeler');
    var Apple = require('./Apple');

    test.ok(juicer instanceof Juicer);
    test.ok(juicer.peeler instanceof Peeler);
    test.ok(juicer.peelable instanceof Apple);

    test.done();
};