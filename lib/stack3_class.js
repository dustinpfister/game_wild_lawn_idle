/*
 *    stack_3_class.js
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    A module for working with a stack of 2d grids (3d like)
 *
 *    This provides a Stack Class that can be used to work with a grid stack.
 *
 */

var Stack = function (options) {

    this.points = [];

    // if no options start with an empty object
    options = options === undefined ? {}

     : options;

    // defaults or given option
    options.w = options.w === undefined ? 2 : options.w;
    options.h = options.h === undefined ? 2 : options.h;
    options.d = options.d === undefined ? 2 : options.d;

    // set options
    this.w = options.w;
    this.h = options.h;
    this.d = options.d;

    if (options.points) {

        this.points = options.points;

    } else {

        // clear the grid with options
        this.clearGrid(options.forPoint);

    }

},

proto = Stack.prototype;

// clear the stack to empty objects
proto.clearGrid = function (forPoint) {

    var i = 0,
    len = this.w * this.h * this.d;

    this.points = [];
    while (i < len) {

        this.points[i] = {

            i : i,
            x : i % this.w,
            y : Math.floor((i - (Math.floor(i / (this.w * this.h)) * (this.w * this.h))) / this.w),
            z : Math.floor(i / (this.w * this.h)),
            val : {}

        };

        if(forPoint){

            this.points[i].val = forPoint(this.points[i]);

        }

        i += 1;

    }

};

// count how many points have the given value
proto.countVal = function (theVal) {

    var i = 0,
    len = this.w * this.h * this.d,
    count = 0;
    while (i < len) {

        if (this.points[i].val === theVal) {

            count += 1;

        }

        i += 1;

    }

    return count;

};

// get a point in the matrix
proto.getPoint = function (ix, y, z) {

    // if y is undefined assume get by index
    if (y === undefined) {

        // return based on index
        return this.points[ix];

        // else assume get by x,y,z
    } else {

        // default to z = 0 if undefined
        if (z === undefined) {
            z = 0;
        }

        // return based on x,y,z
        return this.points[z * (this.w * this.h) + y * this.w + ix];

    }

};

proto.buildOptions = function () {

    var i = this.points.length,
    options = [];
    while (i--) {

        if (this.points[i].building === undefined) {

            options.push(i);

        }

    }

    return options;

}