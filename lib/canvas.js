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

        var cur = Game.status.lawn,
        s = cur.tileSize,
        ts = cur.tileSpace,
        ox = cur.offsetX,
        oy = cur.offsetY,
        lawn = cur.stack;

        this.cls();

        lawn.points.forEach(function (pt) {

            var fert = Math.floor(pt.val.fert / 100 * 125) + 125,
            plant = pt.plant;

            if (pt.plant) {

                ctx.fillStyle = '#00af00';

            } else {

                ctx.fillStyle = 'rgba(' + fert + ',' + fert + ',0,1)';

            }
            /*
            if (Game.index === pt.i) {

            ctx.fillStyle = '#ff0000';

            }
             */

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
