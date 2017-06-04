var Plants = (function () {

    // the actual plants array
    var plants = [],

    // log wrap
    log = function (mess) {

        if (typeof mess === 'string') {

            console.log('plants: ' + mess);

        } else {

            console.log(mess);

        }

    },

    api = {

        // load in a plant object
        loadObj : function (obj) {

            console.log(obj);

            // check type
            if (obj.type === "Plants") {}
            else {

                log('Not a plant type object.');

            }

        },

        // load in a JSON file
        loadFile : function (url, done, fail) {

            var req = new XMLHttpRequest(),
            self = this,
            obj = {};

            done = done || function (data) {
                log('Please set a done callback. ');
                self.loadObj(data);
            };
            fail = fail || function () {
                log('Please set a fail callback. ');
            };

            req.open('get', url);

            req.onreadystatechange = function () {

                console.log(this.readyState + ' ' + this.status);

                if (this.readyState === 4 && this.status === 200) {

                    // try to load JSON that may be invalid
                    try {

                        obj = JSON.parse(this.response);

                        // call done with the finished object if we make it this far
                        done(obj);

                    } catch (e) {

                        // fail if there is a problem with the JSON
                        fail();

                    }

                }

                // if an internal error
                if (this.readyState === 4 && this.status === 500) {

                    // fail
                    fail();

                }

            };

            req.send();

        }

    };

    return api;

}
    ());
