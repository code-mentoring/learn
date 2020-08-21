# Writing text with HTML

Ready to learn how to write text with HTML, **{{firstName}}?**
Today we are going to be looking at the heading and the paragraph tags.

---

## Headings and more Headings

Whenever we want to have a title or a subtitle on our application, we use headings. It's a pre-formatted text that is offered in 6 different sizes.
The bigger the number the smaller is the size. I.e. `h1` is the biggest one and `h6` is the smallest one.

```html
<h1>This is a heading 1</h1>
<h2>This is a heading 2</h2>
<h3>This is a heading 3</h3>
<h4>This is a heading 4</h4>
<h5>This is a heading 5</h5>
<h6>This is a heading 6</h6>
```

---
## What about regular text?

For regular text within the application, we use the `paragraph` tag.

```html
<p>This is a p tag that helps us to add regular text!</p>
```

---
## A few other friends

HTML also offers us a few other tags to use with text.
- `<blockquote cite="add-source-here">...</blockquote>` => Use this tag when you want to quote another text, just like in the books, when they refer to other sources. This tag also gets a property of `cite`, so you can add the origin source.

- `<q>...</q>` => Use this tag for shorter quotes, usually one liner within the text. The browsers usually adds quotes around it.

- `<abbr title="add-name-here">...</abbr>` => Use this when you are going to use an abbreviation or acronym. I.e. when you use UN for United Nations.

- `<address>...</address>` => Like the name suggests, use for addresses. The browser usually adds a line break before and after it and the text show up as italic.

- `<cite>...</cite>` => Use when citing a creative work title. Note, not to be used for people's names, but for the artwork title. The text will also show up as italic.

- `<bdo dir="add-direction">...</bdo>` => This tag is used to override the current text direction. It stands for bi-directional override. i.e. "rtl" - text will show up from right to left.


```html
<p>Here is a quote from Code Mentoring website:</p>
<blockquote cite="https://codementoring.co/">
A community that happens to code.
We’re an international community of weekly meetups that provide free mentoring and coaching for developers.
</blockquote>

<p>And Hamlet said:<q>To be, or not to be? That is the question.</q></p>

<abbr title="United Nations">UN</abbr>

<address>
Visit us:
742 Evergreen Terrace
Springfield, USA
</address>

<p><cite>Hamlet</cite> was written by William Shakespeare.</p>

<bdo dir="rtl">Text will show up from right to left.</bdo>
```

---
## Let's recap

Wow! We learned so much in this lesson! Let's practice to fix it in our minds.

Ok, time to jump into some code! Excited? Don't worry, I'm here to make it easy.

```html
<h1>My Big Title</h1>
```

Write this below. Don't forget to close your element with the `/`!

[<h1>My\sBig\sTitle<\\/h1>](#writeCode)
