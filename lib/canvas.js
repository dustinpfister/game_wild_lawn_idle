var Canvas = (function () {

    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),

    // log wrap
    log = function (mess) {

        if (typeof mess === 'string') {

            console.log('canvas: ' + mess);

        } else {

            console.log(mess);

        }

    },

    api = {};

    api.setup = function () {

        // append to body
        document.body.appendChild(canvas);

        // set actual matrix size of the canvas
        canvas.width = 640;
        canvas.height = 480;

    };

    // the current state of the given lawn
    api.drawLawn = function (lawn) {

        var s = 32;

        log('drawing lawn');

        this.cls();

        ctx.fillStyle = '#ffff00';
        lawn.points.forEach(function (pt) {

            ctx.fillRect(pt.x * (s + 1) + 50, pt.y * (s + 1) + 50, s, s);

        });

    };

    // clear screen
    api.cls = function () {

        // default the canvas to a solid back background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    };

    api.setup();
    api.cls();

    return api;

}
    ());
