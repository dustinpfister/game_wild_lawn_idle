var Game = (function () {

    var log = function (mess) {

        if (typeof mess === 'string') {

            console.log('game: ' + mess);

        } else {

            console.log(mess);

        }

    },

    api = {

        lastTick : new Date(),
        tickRate : 100,

        // the lawn
        lawn : {},
        index : 0,
        tileSize : 20,
        tileSpace : 1,
        offsetX : 50,
        offsetY : 50,

        tick : function () {

            var now = new Date(),
            tile;

            // is it time for the next tick?
            if (now - this.lastTick >= this.tickRate) {

                // step index
                this.index += 1;

                if (this.index === this.lawn.points.length) {

                    this.index = 0;

                }

                update_fert.call(this);

                this.lastTick = new Date();

            }

        },

        // setup method that is called once in main.js
        setup : function () {

            // set up the lawn
            this.lawn = new Stack({

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

        },

        // a user action
        userAction : function (e) {

            console.log(e);

        }

    };

    // internal methods that act on the public api (use with call)
    var update_fert = function () {

        var tile = this.lawn.getPoint(this.index);

        /*
        tile.val.fert += 20;
        if (tile.val.fert > 100) {

        tile.val.fert = 100;

        }
         */

    };

    // return the api
    return api;

}
    ());
