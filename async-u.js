

function setImmediate(fn, args) {
    if (Object.prototype.toString.call(fn) === '[object Function]') {
        setTimeout(function() {
            fn.apply(null, args);
        });
    }
}

function mapParallel(array, iteratee, callback) {
    var results = [],
        cc = 0,
        stop = false;

    function complete_ (index) {
        return function (err, result) {
            if (stop) {
                return;
            }

            if (err) {
                stop = true;
                setImmediate(callback, [err]);
            } else {
                results[index] = result;

                cc += 1;

                if (cc === array.length) {
                    stop = true;
                    setImmediate(callback, [null, results]);
                }
            }
        };
    }

    if (!array.length) {
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
        cc = 0,
        stop = false;

    function complete_(index) {
        return function(err, result) {
            if (err) {
                stop = true;
                setImmediate(callback, [err]);
            } else {
                results[index] = result;

                cc += 1;

                if (cc === array.length) {
                    stop = true;
                    setImmediate(callback, [null, results]);
                } else {
                    setImmediate(iteratee, [array[cc], complete_(cc), result]);
                }
            }
        };
    }

    if (array.length) {
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
    series       : series,
    setImmediate : setImmediate
};
