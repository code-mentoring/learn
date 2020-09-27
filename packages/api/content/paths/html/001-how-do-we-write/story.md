# How do we write HTML?

Isn't it so exciting {{firstName}} that we're getting started building something together? I'm so excited 🤩!  Now we get to start digging into the dough and get our hands messy!  I love working in the restaurant, but I'm really excited about putting together this Zine with you!  The great thing about it is that we can always refer back to what we've done as we build out the three pillars. Do you remember them ❓

Great! Let's look at the first way we can start organizing our Zine content...

* * *

## The Paragraph Tag:

Have you ever noticed that when you're reading a book or magazine that the words are always broken up by pictures, quotes and spaces?  Take a look at the words below.  Imagine if you had to read every magazine like this!

|     |
| --- |
| Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut. Id eu nisl nunc mi ipsum faucibus vitae. Scelerisque purus semper eget duis at tellus at urna condimentum. Egestas sed tempus urna et pharetra. Porttitor leo a diam sollicitudin tempor id eu nisl. Tristique risus nec feugiat in. Etiam erat velit scelerisque in dictum non. Duis tristique sollicitudin nibh sit amet commodo. Sed velit dignissim sodales ut eu sem integer vitae justo. Ac turpis egestas maecenas pharetra convallis. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Justo donec enim diam vulputate ut pharetra sit. Enim nec dui nunc mattis. Egestas fringilla phasellus faucibus scelerisque eleifend. Sed euismod nisi porta lorem mollis aliquam ut. Elementum integer enim neque volutpat. Lorem ipsum dolor sit amet consectetur adipiscing. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Tellus mauris a diam maecenas sed enim ut sem. Volutpat consequat mauris nunc congue nisi vitae. Ut eu sem integer vitae justo eget magna fermentum iaculis. Lorem ipsum dolor sit amet. |

Not exactly an easy way to read something, right? It's way better when the words are broken up. In written language, we group sentences around an idea into paragraphs. In HTML, we do the same thing. The only difference is that a web browser weill not understand that we want to break up the text unless we directly tell it to.

The Paragraph tag `<p> </p>` does exactly that for us! Let's try it with the same text from above:

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut.</p>
<p>Id eu nisl nunc mi ipsum faucibus vitae. Scelerisque purus semper eget duis at tellus at urna condimentum. Egestas sed tempus urna et pharetra. Porttitor leo a diam sollicitudin tempor id eu nisl. Tristique risus nec feugiat in. Etiam erat velit scelerisque in dictum non. Duis tristique sollicitudin nibh sit amet commodo.  Sed velit dignissim sodales ut eu sem integer vitae justo. Ac turpis egestas maecenas pharetra convallis. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit.</p>
<p>Justo donec enim diam vulputate ut pharetra sit. Enim nec dui nunc mattis. Egestas fringilla phasellus faucibus scelerisque eleifend. Sed euismod nisi porta lorem mollis aliquam ut. Elementum integer enim neque volutpat. Lorem ipsum dolor sit amet consectetur adipiscing. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Tellus mauris a diam maecenas sed enim ut sem. Volutpat consequat mauris nunc congue nisi vitae. Ut eu sem integer vitae justo eget magna fermentum iaculis. Lorem ipsum dolor sit amet.</p>
```

If we open this up in a web browser, it looks like this:

|     |
| --- |
| Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut.<br><br>Id eu nisl nunc mi ipsum faucibus vitae. Scelerisque purus semper eget duis at tellus at urna condimentum. Egestas sed tempus urna et pharetra. Porttitor leo a diam sollicitudin tempor id eu nisl. Tristique risus nec feugiat in. Etiam erat velit scelerisque in dictum non. Duis tristique sollicitudin nibh sit amet commodo. Sed velit dignissim sodales ut eu sem integer vitae justo. Ac turpis egestas maecenas pharetra convallis. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit.<br><br>Justo donec enim diam vulputate ut pharetra sit. Enim nec dui nunc mattis. Egestas fringilla phasellus faucibus scelerisque eleifend. Sed euismod nisi porta lorem mollis aliquam ut. Elementum integer enim neque volutpat. Lorem ipsum dolor sit amet consectetur adipiscing. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Tellus mauris a diam maecenas sed enim ut sem. Volutpat consequat mauris nunc congue nisi vitae. Ut eu sem integer vitae justo eget magna fermentum iaculis. Lorem ipsum dolor sit amet. |

Much better! The `<p></p>` tag lets us break up the words into meanignful paragraphs, but also specifically tells the browser to start the content inside the tag on a new line.

* * *

## Adding Comments:

This is a great start! Are you beginning to see how we can organize everything we're learning into our Zine?

One thing I've noticed, is that sometimes we might want to include some ideas that aren't quite ready to be published. Also, I wish there was a way we could insert some hidden notes for each other to remind us about what we're trying to accomplish in each paragraph.

Well it just so happens that there is... Comment tags!

Comment tags `<!-- this here is a comment -->` let us put any text we want in the code, but keep it hidden from the person reading. Take a look at this paragraph...

```
<p>Lorem ipsum dolor sit amet, <!-- this is a comment -->  consectetur adipiscing elit</p>
```

When a browser sees this HTML, it shows up like this:

|     |
| --- |
| Lorem ipsum dolor sit amet, consectetur adipiscing elit |

This is great! Now we can hide our notes to each other about what we're doing in the code!

* * *


## The Button Tag:

Now that we can organize our words into readable paragraphs and make hidden comments as we need them, we also need to start looking at how to save information. For instance, we might want to get some feedback from readers about what they think of our Zine articles.

We can use the `<button></button` tag to let them submit their feedback to us.  Take a look at this HTML:

```html
<p>...consequat mauris nunc congue nisi vitae. Ut eu sem integer vitae justo eget magna fermentum iaculis. Lorem ipsum dolor sit amet.</p>
<p>Do you like this article? <button>Like</button></p>
```
Here's what it would look like in the browser:
|     |
| --- |
|<p>...consequat mauris nunc congue nisi vitae. Ut eu sem integer vitae justo eget magna fermentum iaculis. Lorem ipsum dolor sit amet.</p><p>Do you like this article? <button>Like</button></p>|

See how the browser knows to draw a button around the word Like?  It won't do anything when someone clicks it yet, but I hope you can begin to see how we can give the browser instructions to display exactly what we want.
Pretty powerful, right?


Next, we're going to explore how we can let readers move around our Zine site, and even across the internet!