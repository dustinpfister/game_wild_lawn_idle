var Game = (function () {

    var log = function (mess) {

        if (typeof mess === 'string') {

            console.log('game: ' + mess);

        } else {

            console.log(mess);

        }

    }

    api = {

        lastUpdate : new Date(),
        updateRate : 100,

        // the lawn
        lawn : {},
        index : 0,
        tileSize : 20,
        tileSpace : 1,
        offsetX : 50,
        offsetY : 50,

        update : function () {

            var now = new Date(),
            tile;

            if (now - this.lastUpdate >= this.updateRate) {

                // step index
                this.index += 1;

                if (this.index === this.lawn.points.length) {

                    this.index = 0;

                }

                tile = this.lawn.getPoint(this.index);

                this.lastUpdate = new Date();

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

    // return the api
    return api;

}
    ());
