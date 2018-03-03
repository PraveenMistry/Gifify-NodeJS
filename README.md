# Gifify-NodeJS
Convert any video file to an optimized animated GIF. Either in its full length or only a part of it.


# gifify

Convert any video file to an optimized animated GIF. Either in its full length or only a part of it.

## Technology

Nodejs


## Demo time

```shell
gifify screencast.mkv -o screencast.gif --resize 800:-1
```

## Features

- command line interface
- programmatic JavaScript ([Node.JS](http://nodejs.org/)) [stream](http://nodejs.org/api/stream.html) interface
- unix friendly, supports `stdin` & `stdout`
- optimized! uses [pornel/giflossy](https://github.com/pornel/giflossy) to generate light GIFS
- lots of options: movie speed, fps, colors, compression, resize, reverse, from & to, subtitles
- no temp files used, everything happens in memory
- fast! Extracting a 5-second GIF from the middle of a 2-hour movie takes less than 20 seconds

## Requirements

Before using gifify, please install:

- [Node.js](https://nodejs.org) (`$ brew install node`)
- [FFmpeg](http://ffmpeg.org/) [🐓🐓🐓🐓](http://en.wikipedia.org/wiki/FFmpeg#History) (`$ brew install ffmpeg --with-libass --with-fontconfig`)
- [convert](http://www.imagemagick.org/script/convert.php), the famous [ImageMagick](http://www.imagemagick.org/) (`$ brew install imagemagick --with-fontconfig`)
- [pornel/giflossy](https://github.com/pornel/giflossy/releases), it's a [gifsicle](http://www.lcdf.org/gifsicle/) fork (waiting for [gifsicle#16](https://github.com/kohler/gifsicle/pull/16) to be merged) (`$ brew install giflossy`)

## Installation

```shell
npm install -g gifify
```

## Command line usage

```shell
> gifify -h

  Usage: gifify [options] [file]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    --colors <n>            Number of colors, up to 255, defaults to 80
    --compress <n>          Compression (quality) level, from 0 (no compression) to 100, defaults to 40
    --from <position>       Start position, hh:mm:ss or seconds, defaults to 0
    --fps <n>               Frames Per Second, defaults to 10
    -o, --output <file>     Output file, defaults to stdout
    --resize <W:H>          Resize output, use -1 when specifying only width or height. `350:100`, `400:-1`, `-1:200`
    --reverse               Reverses movie
    --speed <n>             Movie speed, defaults to 1
    --subtitles <filepath>  Subtitle filepath to burn to the GIF
    --text <string>         Add some text at the bottom of the movie
    --to <position>         End position, hh:mm:ss or seconds, defaults to end of movie
    --no-loop               Will show every frame once without looping
```

## Programmatic usage

See the [example](./example).

```js
var fs = require('fs');
var gifify = require('gifify');
var path = require('path');

var input = path.join(__dirname, 'movie.mp4');
var output = path.join(__dirname, 'movie.gif');

var gif = fs.createWriteStream(output);

var options = {
  resize: '200:-1',
  from: 30,
  to: 35
};

gifify(input, options).pipe(gif);
```


## Adding some text

You can burn some simple text into your GIF:

```shell
gifify back.mp4 -o back.gif --from 01:48:23.200 --to 01:48:25.300 --text "What?..What?What?"
```

## Subtitles

You can burn subtitles into your GIF, it's that easy:

```shell
gifify 22.mkv -o movie.gif --subtitles 22.ass --from 1995 --to 2002 --resize 600:-1
```

You must create new subtitles files, the timecodes for the complete film will not work for a five seconds GIF.

Create subtitles using [aegisub](http://www.aegisub.org/) and augment the font size for a great effect!

![22](22.gif)

## GIF Performance

```
On modern hardware GIF is the slowest and most expensive video codec. Can we please allow it to be obsoleted?
```
