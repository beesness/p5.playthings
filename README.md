# p5.playthings

A collection of _hackable templates_ to learn [p5.play](http://p5play.molleindustria.org/).

Compiled by [Matteo](https://twitter.com/@baddeo) + [contributors](https://github.com/beesness/p5.playthings/graphs/contributors).

## How to contribute

1. Fork this repo.
2. Add your hackable plaything to `index.html`. More on this below.
3. Commit + push to your fork.
4. Create a pull request.
5. Done :)

### How to add your hackable plaything

1. Open `index.html`
2. Find the `plaything template`.
3. Copy-paste it where you want your plaything to appear.
3. Uncomment the `<article> ... </article>` block.
4. Write a **short description** for your plaything. Use it in:
    - the `<p class="description">`
    - the `<img alt="">` alt text
    - the `<!-- -->` comment above the `<article>`
5. List the **learning points** of your plaything in the `<div class="learning-goals">`.
6. Add **links** to:
    - view your plaything
    - remix your plaything (source-code)
7. Take a screenshot / animated gif of your plaything and link it to `<img src="">`. A 3x2 image ratio (eg: 600x400 px) would be nice.

### How to preview your plaything on your computer

You just open `index.html` in your browser, right? Unfortunately, p5 won't be able to load images and sounds with this method (as the browser doesn't have access to all your files by default).

So you need to start a _web server_ on the folder where your plaything lives (or one of its parent folders):

1. Open Terminal
2. Navigate to this project folder
3. Type `python -m SimpleHTTPServer 1983`
4. Open your favourite browser and go to `http://localhost:1983`

<!--
## TODO

- responsive jumbotron
- responsive paddings
-->
