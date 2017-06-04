(function () {

    console.log('Starting wild lawn idea');

    var log = function (mess) {

        if (typeof mess === 'string') {

            console.log('main: ' + mess);

        } else {

            console.log(mess);

        }

    },

    lawn,

    start = function () {

        /*
        // set up the lawn
        lawn = new Stack({

        // the dimensions of the lawn
        d : 1,
        w : 10,
        h : 10,

        // defauts for each point in the stack
        forPoint : function () {

        return {

        fert : 0

        };

        }

        });
         */

        Game.setup();

        // load in plants
        Plants.loadFile('json/grass.json', function (data) {

            Plants.loadObj(data);

            log('starting game');
            loop();

        });

    },

    loop = function () {

        Canvas.drawLawn();

    };

    start();

}
    ());
