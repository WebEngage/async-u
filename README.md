# async µ
A micro implementation of [caolan/async](https://github.com/caolan/async) for these four methods only

[async.mapSeries](https://github.com/caolan/async#map) |
[async.mapParallel](https://github.com/caolan/async#map) |
[async.series](https://github.com/caolan/async#seriestasks-callback) |
[async.parallel](https://github.com/caolan/async#parallel)

The interface is identical except for these small differences
- `series()` and `parallel()` do not accept an object as `tasks`
- `series()` tasks are passed the result of their predecessor as the second argument

#### The BIG question?
Why use this module when the [original](https://github.com/caolan/async) is more comprehensive, more battle tested and might be even more efficient.
Well the only reason is the orignal's size - at [17.6 KB uncompressed](https://github.com/caolan/async/blob/master/dist/async.min.js), it may look bloated to those who only need the four methods.

#### Install
```
npm install --save async-u
```

and...
```js
var async = require('async-u');
```

Use a [frontend module bundle](http://www.slant.co/topics/3900/~frontend-javascript-module-bundlers) to package for browsers

#### License - [WTFPL](http://www.wtfpl.net/)
```
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2016 WebEngage <opensource {at} webengage.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
```
