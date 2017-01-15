# lwt-dict.cc

> A [Learning With Texts](https://github.com/lwt-project/lwt) German dictionary plugin for easily using definitions from [dict.cc](https://www.dict.cc/)

## Usage

[Download this repository as a zip](https://github.com/PirtleShell/lwt-dict.cc/archive/master.zip) or clone it:

```sh
$ git clone https://github.com/PirtleShell/lwt-dict.cc.git
```

Then place the extracted folder in a folder called `plugins/` in your Learning with Texts installation:

```sh
$ mkdir $MY_LWT_INSTALLATION/plugins
$ mv lwt-dict.cc/ $MY_LWT_INSTALLATION/plugins/
```

Where `$MY_LWT_INSTALLATION` should be something like `/var/www/html/lwt`.

Unfortunately, the current version (v1.6.1) does not allow local dictionaries. Because of this, **you will have to comment out [lines 151-158 of `js/jq_pgm.js`](https://github.com/lwt-project/lwt/blob/master/js/jq_pgm.js#L151)**. Simply put a `/*` at the beginning of line 151 and a `*/` and the end of line 158. If it still gives you trouble, try cleaning your cache.

Now, when you setup your language, set your dictionary as `plugins/lwt-dict.cc/?s=###`.

Ta-daa! Now, much like the standard dictionary that uses Glosbe, you have an easy way to use definitions from dict.cc!

![dict.cc plugin screenshot](https://github.com/PirtleShell/lwt-dict.cc/blob/master/spannend-screenshot.png)

Click the :white_check_mark: and it transfers the selected definition! It also puts the dict.cc subject as a tag for the word. Turn tagging off, by setting `USE_SUBJECT_AS_TAG` to false in `script.js`.

## A note about not breaking any rules

I build this with the full intention of following [dict.cc's Terms of Service](https://www.dict.cc/?s=about%3Afaq#faq16). It states:

> Server-side processing of any kind is not allowed

So this only processes client-side with javascript.

It also states:

> the built-in advertisement has to be visible and clickable without restriction of any kind

Although no one likes ads, dict.cc is an awesome service that [Paul Hemetsberger](http://www.hemetsberger.com/) provides for free. Rather than grumbling about advertisements, think about it as a donation. He teaches you German, you give him 0.0000001 pennies for looking at something your brain probably tunes out anyway. Sorry not sorry!

## License

This is by [Robert Pirtle](https://pirtle.xyz). Its license conforms with LWT's and is [The Unlicense](http://choosealicense.com/licenses/unlicense/).
