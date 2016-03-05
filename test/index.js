var async = require('..'),
    expect = require('chai').expect;

describe('async.series', function () {
    it('series', function (done) {
        var callOrder = [];
        async.series([
            function (complete) {
                setTimeout(function () {
                    callOrder.push(1);
                    complete(null, 'The quick brown fox');
                }, 25);
            },
            function (complete, result) {
                expect(result).to.equal('The quick brown fox');

                setTimeout(function () {
                    callOrder.push(2);
                    complete(null, ['jumps', 'over', 'the']);
                }, 50);
            },
            function (complete, result) {
                expect(result).to.deep.equal(['jumps', 'over', 'the']);

                setTimeout(function () {
                    callOrder.push(3);
                    complete(null, { dog: { name: 'pangram', lazy: true }});
                }, 15);
            }
        ],
        function (err, results) {
            expect(err).to.equal(null);
            expect(results).to.deep.equal(['The quick brown fox', ['jumps', 'over', 'the'], { dog: { name: 'pangram', lazy: true }}]);
            expect(callOrder).to.deep.equal([1, 2, 3]);
            done();
        });
    });

    it('empty tasks array', function (done) {
        async.series([], function (err, results) {
            expect(err).to.equal(null);
            expect(results).to.deep.equal([]);
            done();
        });
    });

    it('error', function (done) {
        async.series([
            function (complete) {
                complete('error', 1);
            },
            function (complete) {
                expect('second task called').to.not.be.ok;
                complete('error2', 2);
            }
        ],
        function (err, results) {
            expect(err).to.equal('error');
            expect(results).to.be.undefined;
        });
        setTimeout(done, 100);
    });

    it('no callback', function (done) {
        var calls = 0;
        async.series([
            function (complete) {
                setTimeout(function () {
                    calls += 1;
                    complete();
                }, 30);
            },
            function (complete) {
                setTimeout(function () {
                    calls += 1;
                    complete();
                }, 10);
            },
        ]);

        setTimeout(function () {
            expect(calls).to.equal(2);
            done();
        }, 100);
    });
});


describe('async.parallel', function () {
    it('parallel', function (done) {
        var callOrder = [];
        async.parallel([
            function (complete) {
                setTimeout(function () {
                    callOrder.push(1);
                    complete(null, 'The quick brown fox');
                }, 50);
            },
            function (complete) {
                setTimeout(function () {
                    callOrder.push(2);
                    complete(null, ['jumps', 'over', 'the']);
                }, 100);
            },
            function (complete) {
                setTimeout(function () {
                    callOrder.push(3);
                    complete(null, { dog: { name: 'pangram', lazy: true }});
                }, 25);
            }
        ],
        function (err, results) {
            expect(err).to.equal(null);
            expect(results).to.deep.equal(['The quick brown fox', ['jumps', 'over', 'the'], { dog: { name: 'pangram', lazy: true }}]);
            expect(callOrder).to.deep.equal([3, 1, 2]);
            done();
        });
    });

    it('empty tasks array', function (done) {
        async.parallel([], function (err, results) {
            expect(err).to.equal(null);
            expect(results).to.deep.equal([]);
            done();
        });
    });

    it('error', function (done) {
        async.parallel([
            function (complete) {
                complete('error', 1);
            },
            function (complete) {
                complete('error2', 2);
            }
        ],
        function (err, results) {
            expect(err).to.equal('error');
            expect(results).to.be.undefined;
        });
        setTimeout(done, 100);
    });

    it('no callback', function (done) {
        var calls = 0;
        async.parallel([
            function (complete) {
                setTimeout(function () {
                    calls += 1;
                    complete();
                }, 30);
            },
            function (complete) {
                setTimeout(function () {
                    calls += 1;
                    complete();
                }, 10);
            },
        ]);

        setTimeout(function () {
            expect(calls).to.equal(2);
            done();
        }, 100);
    });
});


describe('async.mapSeries', function () {
    it('mapSeries', function (done) {
        var callOrder = [];
        async.mapSeries(
            [1, 3, 2],
            function (element, complete) {
                setTimeout(function (){
                    callOrder.push(element);
                    complete(null, element * 2);
                }, element * 25);
            },
            function (err, results){
                expect(err).to.equal(null);
                expect(results).to.deep.equal([2, 6, 4]);
                expect(callOrder).to.deep.equal([1, 3, 2]);
                done();
            }
        );
    });

    it('error', function (done) {
        async.mapSeries(
            [1, 2, 3],
            function (element, complete){
                complete('error');
            },
            function (err, results) {
                expect(err).to.equal('error');
                expect(results).to.be.undefined;
            }
        );
        setTimeout(done, 50);
    });

    it('undefined array', function (done) {
        var calls = 0;
        async.mapSeries(
            undefined,
            function (element, complete) {
                calls += 1;
                complete();
            },
            function (err, results) {
                expect(err).to.equal(null);
                expect(results).to.deep.equal([]);
                expect(calls).to.equal(0);
            }
        );
        setTimeout(done, 50);
    });
});


describe('async.mapSeries', function () {
    it('mapSeries', function (done) {
        var callOrder = [];
        async.mapSeries(
            [1, 3, 2],
            function (element, complete) {
                setTimeout(function (){
                    callOrder.push(element);
                    complete(null, element * 2);
                }, element * 25);
            },
            function (err, results){
                expect(err).to.equal(null);
                expect(results).to.deep.equal([2, 6, 4]);
                expect(callOrder).to.deep.equal([1, 3, 2]);
                done();
            }
        );
    });

    it('error', function (done) {
        async.mapSeries(
            [1, 2, 3],
            function (element, complete){
                complete('error');
            },
            function (err, results) {
                expect(err).to.equal('error');
                expect(results).to.be.undefined;
            }
        );
        setTimeout(done, 50);
    });

    it('undefined array', function (done) {
        var calls = 0;
        async.mapSeries(
            undefined,
            function (element, complete) {
                calls += 1;
                complete();
            },
            function (err, results) {
                expect(err).to.equal(null);
                expect(results).to.deep.equal([]);
                expect(calls).to.equal(0);
            }
        );
        setTimeout(done, 50);
    });
});



describe('async.mapParallel', function () {
    it('mapParallel', function (done) {
        var callOrder = [];
        async.mapParallel(
            [1, 3, 2],
            function (element, complete) {
                setTimeout(function (){
                    callOrder.push(element);
                    complete(null, element * 2);
                }, element * 25);
            },
            function (err, results){
                expect(err).to.equal(null);
                expect(results).to.deep.equal([2, 6, 4]);
                expect(callOrder).to.deep.equal([1, 2, 3]);
                done();
            }
        );
    });

    it('error', function (done) {
        async.mapParallel(
            [1, 2, 3],
            function (element, complete){
                complete('error');
            },
            function (err, results) {
                expect(err).to.equal('error');
                expect(results).to.be.undefined;
            }
        );
        setTimeout(done, 50);
    });

    it('original untouched', function (done) {
        var original = [1, 2, 3];
        async.mapParallel(
            original,
            function (element, complete){
                complete(null, element * 3);
            },
            function (err, results) {
                expect(err).to.equal(null);
                expect(results).to.deep.equal([3, 6, 9]);
                expect(original).to.deep.equal([1, 2, 3]);
                done();
            }
        );
    });

    it('without callback', function (done) {
        var array = [1, 2, 3],
            callOrder = [];

        async.mapParallel(
            array,
            function (element, complete) {
                callOrder.push(element);
                complete(null, element * 4);

                if(callOrder.length === array.length) {
                    expect(callOrder).to.be.deep.equal(array);
                    done();
                }
            }
        );
    });

    it('undefined array', function (done) {
        var calls = 0;
        async.mapSeries(
            undefined,
            function (element, complete) {
                calls += 1;
                complete();
            },
            function (err, results) {
                expect(err).to.equal(null);
                expect(results).to.deep.equal([]);
                expect(calls).to.equal(0);
            }
        );
        setTimeout(done, 50);
    });
});
