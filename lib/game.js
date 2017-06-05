var Game = (function () {

    var status = {

        mainTick : 0,

        // the current status of the lawn
        lawn : {

            stack : {}, // the stack3 instance
            tileSize : 40,
            tileSpace : 1,
            offsetX : 40,
            offsetY : 40,

        }

    },

    log = function (mess) {

        if (typeof mess === 'string') {

            console.log('game: ' + mess);

        } else {

            console.log(mess);

        }

    },

    Work = (function () {

        var load = [],
        updaing = [],

        processes = {

            // random fert up
            rand_fert : {

                // the condition in which the process is added to load
                condition : function () {

                    if (status.mainTick < 100) {

                        return true;

                    }

                    // just return true for an always process
                    return false;

                },

                tick : function () {

                    log('rand fert up');

                    var i = Math.floor(Math.random() * status.lawn.stack.points.length),
                    tile = status.lawn.stack.getPoint(i);

                    tile.val.fert += 20;
                    if (tile.val.fert > 100) {

                        tile.val.fert = 100;

                    }

                }

            }

        },

        setLoad = function () {

            load = [];

            Object.keys(processes).forEach(function (processName) {

                if (processes[processName].condition()) {

                    load.push(processName);

                }

            });

        },

        // public api
        api_work = {

            // tick the workload
            tick : function () {

                setLoad();

                load.forEach(function (process) {

                    processes[process].tick();

                });

                // step main tick
                status.mainTick += 1;

            }

        };

        return api_work;

    }
        ()),

    api = {

        lastTick : new Date(),
        tickRate : 500,

        status : status, // public ref to status

        /*
        // the lawn
        lawn : {},
        index : 0,
        tileSize : 20,
        tileSpace : 1,
        offsetX : 50,
        offsetY : 50,
         */

        tick : function () {

            var now = new Date(),
            tile;

            // is it time for the next tick?
            if (now - this.lastTick >= this.tickRate) {

                Work.tick();

                /*
                // step index
                this.index += 1;

                if (this.index === this.lawn.points.length) {

                this.index = 0;

                }

                update_fert.call(this);

                 */

                this.lastTick = new Date();

            }

        },

        // setup method that is called once in main.js
        setup : function () {

            // set up the lawn
            status.lawn.stack = new Stack({

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

        //var tile = this.lawn.getPoint(this.index);

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
