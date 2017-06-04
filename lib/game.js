var Game = (function () {

    var api = {

        // the lawn
        lawn : {},
        tileSize : 20,
        tileSpace : 1,
        offsetX : 50,
        offsetY : 50,

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
