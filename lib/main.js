(function () {

    console.log('Starting wild lawn idea');

    var log = function (mess) {

        if (typeof mess === 'string') {

            console.log('main: ' + mess);

        } else {

            console.log(mess);

        }

    },

    start = function () {

        // load in plants
        Plants.loadFile('json/grass.json', function (data) {

            Plants.loadObj(data);

            log('starting game');
            loop();

        });

    },

    loop = function () {

        log('killer');

    };

    start();

}
    ());
