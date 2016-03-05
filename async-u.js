
function setImmediate(fn, args) {
    if (Object.prototype.toString.call(fn) === '[object Function]') {
        setTimeout(function() {
            fn.apply(null, args);
        });
    }
}

function mapParallel(array, iteratee, callback) {
    var results = [],
        pending = array && array.length;

    function complete_ (index) {
        return function (err, result) {
            if (!pending || results.hasOwnProperty(index)) {
                return;
            }

            if (err) {
                pending = 0;
                return setImmediate(callback, [err]);
            }

            results[index] = result;
            pending -= 1;

            if (!pending) {
                setImmediate(callback, [null, results]);
            }
        };
    }

    if (!pending) {
        return setImmediate(callback, [null, results]);
    }

    for (var i = 0; i < array.length; i++) {
        // elements should be iterated over in the same order as in `array`
        // shouldn't run in setImmediate
        iteratee(array[i], complete_(i));
    }
}

function mapSeries(array, iteratee, callback) {
    var results = [],
        pending = array && array.length;

    function complete_(index) {
        return function(err, result) {
            if (!pending || results.hasOwnProperty(index)) {
                return;
            }

            if (err) {
                return setImmediate(callback, [err]);
            }

            results[index] = result;
            pending -= 1;

            if (pending) {
                setImmediate(iteratee, [array[index + 1], complete_(index + 1), result]);
            } else {
                setImmediate(callback, [null, results]);
            }
        };
    }

    if (pending) {
        setImmediate(iteratee, [array[0], complete_(0)]);
    } else {
        setImmediate(callback, [null, results]);
    }
}

function parallel(tasks, callback) {
    mapParallel(tasks, function(task, complete) {
        task(complete);
    }, callback);
}

function series(tasks, callback) {
    mapSeries(tasks, function(task, complete, result) {
        task(complete, result);
    }, callback);
}

module.exports = {
    mapParallel  : mapParallel,
    mapSeries    : mapSeries,
    parallel     : parallel,
    series       : series
};
