#Simple dependency injection manager
Creates instances of objects initialised with a graph of dependencies.

    var di = new DependencyManager();
    di.register(Apple); // has no dependencies
    di.register(Peeler, {
        'peelable': 'Apple' // property peelable initialised with Apple
    });
    di.register(Juicer, {
        'peeler': 'Peeler', // property peeler initialised with Peeler
        'peelable': 'Apple' // property peelable initialised with Apple
    });

    var jucer = di.create('Juicer');