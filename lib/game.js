var Game = (function () {

    var log = function (mess) {

        if (typeof mess === 'string') {

            console.log('game: ' + mess);

        } else {

            console.log(mess);

        }

    },

    status = {

        mainTick : 0,

        // the current status of the lawn
        lawn : {

            stack : {}, // the stack3 instance
            tileSize : 25,
            tileSpace : 1,
            offsetX : 40,
            offsetY : 40,

            getPlantTiles : function () {

                var plants = [];

                this.stack.points.forEach(function (point) {

                    if (point.val.plant) {

                        plants.push(point);

                    }

                });

                return plants;

            },

            // count how many tiles have plants
            /*
            plantCount : function () {

            var count = 0;

            this.stack.points.forEach(function (point) {

            if (point.val.plant) {

            count += 1;

            }

            });

            return count;

            },
             */

            // get tiles of the given fert level
            getFerts : function (fertLev) {

                fertLev = fertLev || 0;

                var ferts = [];

                this.stack.points.forEach(function (point) {

                    if (point.val.fert > fertLev) {

                        ferts.push(point);

                    }

                })

                return ferts;

            }

        }

    },

    Work = (function () {

        var load = [],
        updaing = [],

        processes = {

            // begin the process of life
            begin : (function () {

                return {

                    condition : function () {

                        if (status.mainTick % 50 === 0) {

                            return true;

                        }

                        return false;

                    },

                    tick : function () {

                        var plantCount = status.lawn.getPlantTiles().length,
                        ferts,
                        tile,
                        plantOptions;

                        if (plantCount === 0) {

                            ferts = status.lawn.getFerts();

                            log('it begins');
                            log('plant count : ' + plantCount);
                            log('fert tile count : ' + ferts.length);

                            if (ferts.length > 0) {

                                tile = ferts[Math.floor(Math.random() * ferts.length)];

                                plantOptions = Plants.possiblePlants(tile.val.fert);

                                tile.val.plant = new Plants.Plant(plantOptions[0]);

                                log(tile);

                            }

                        }

                    }

                };

            }
                ()),

            // death process
            death : {

                condition : function () {

                    return true;

                },
                tick : function () {

                    var plantTiles = status.lawn.getPlantTiles(),
                    plant,
                    i = plantTiles.length;
                    while (i--) {

                        plant = plantTiles[i].val.plant;

                        if (plant.age) {

                            plant.age += 1;

                        } else {

                            plant.age = 1;

                        }

                        if (plant.age >= plant.max_life) {

                            log('dead plant');

                            // plant is dead
                            plantTiles[i].val.plant = undefined;

                        }

                    }

                }

            },

            // plant spread process
            spread : {

                // when should growth occur
                condition : function () {

                    // growth every ten ticks
                    if (status.mainTick % 10 === 0) {

                        return true;

                    } else {

                        return false;

                    }

                },

                tick : function () {

                    var plantTiles = status.lawn.getPlantTiles(),
                    stack = status.lawn.stack;

                    log('growth process...');

                    // for each plant tile
                    plantTiles.forEach(function (pt) {

                        var spawnPoints = [],
                        point;

                        // if a true spread roll...
                        if (pt.val.plant.spread()) {

                            // get spawn points
                            var x = -1,
                            y = -1;
                            while (y < 2) {

                                x = -1;
                                while (x < 2) {

                                    // discount the parent plant
                                    if (y === 0 && x === 0) {

                                        x += 1;

                                        continue;

                                    }

                                    point = stack.getPoint(pt.x + x, pt.y + y, pt.z);

                                    if (point != undefined) {

                                        if (point.val.fert >= pt.val.plant.fert_min) {

                                            // then a new plant can be there.
                                            spawnPoints.push(point);

                                        }

                                    }

                                    x += 1;

                                }

                                y += 1;

                            }

                            // if we have one or more spawn points
                            if (spawnPoints.length > 0) {

                                // pick a random spawn point
                                point = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];

                                //log(point);

                                point.val.plant = new Plants.Plant(Plants.getPlantByName(pt.val.plant.name));

                            }

                        }

                    });

                }

            },

            // random fert up process
            rand_fert : {

                // the condition in which the process is added to load
                condition : function () {

                    if (status.mainTick < 500) {

                        return true;

                    }

                    // just return true for an always process
                    return false;

                },

                tick : function () {

                    var i = Math.floor(Math.random() * status.lawn.stack.points.length),
                    tile = status.lawn.stack.getPoint(i);

                    tile.val.fert += Math.floor(Math.random() * 5) + 5;
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
        tickRate : 1000,

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
				
				status.lawn.stack.getAround2D(0,0);

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
                    w : 16,
                    h : 16,

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
