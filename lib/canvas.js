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

        canvas.addEventListener('click', Game.userAction);

    };

    // the current state of the given lawn
    api.drawLawn = function () {

        var s = Game.tileSize,
        ts = Game.tileSpace,
        ox = Game.offsetX,
        oy = Game.offsetY,
        lawn = Game.lawn;

        log('drawing lawn');

        this.cls();

        ctx.fillStyle = '#ffff00';
        lawn.points.forEach(function (pt) {

            ctx.fillRect(pt.x * (s + ts) + ox, pt.y * (s + ts) + oy, s, s);

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