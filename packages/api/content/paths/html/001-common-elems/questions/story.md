# Common HTML Tags

Welcome back {{firstName}}! We have covered a lot in the last couple of lessons and things are starting to take shape with our Zine! 

In the last lesson we looked at how to organize our Zine in paragraphs and introduced the Paragraph tag `<p></p>`. 

Our Zine is starting to look really good! But lets dig deeper and see how we can futher organize our Zine and have our content really stand out. We are going to take a look at some of the commonly used HTML tags.

# Span Tag

In the last lesson, we looked at how to break up the content of our Zine into paragraphs using the Paragrah `<p></p>` tag. 

But what if we wanted to isolate a word or a group of words within the Paragraph? Let's take a look at an example, see the blue text in the example below?

><p>Lorem ipsum dolor sit amet, <span style="color: blue">consectetur adipiscing elit</span>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut.</p>

We can isolate words or group of words by using the Span tag `<span></span>` tag. 

Isn't this awesome? Let's take a look and see how it is used:

```html
<p>Lorem ipsum dolor sit amet, <span>consectetur adipiscing elit</span>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut.</p>
```
Just like our Paragraph tag `<p></p>` tag, the Span `<span></span>` tag has an opening and closing tag. We just wrap our word or group of words within the opening and closing Span tags:

```html
<span>consectetur adipiscing elit</span>
```

Looks simple, right? That's because it is! 

Now we can add some styling to make it stand out. 

# Strong Tag

Want a word or group of words to REALLY stand out? How about we add some bold characters to really emphasize our text!

Just like the Span `<span></span>` tag, we can use a similar tag called the Strong `<strong></strong>` tag.

Let see what it looks like: 
><p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut.</p>

Wow! That bold text really stands out.

So how does the Strong `<strong></strong>` tag work you ask? Well, the great news is it works just like the Span tag! Any word(s) within the opening and closing tags `<strong></strong>` will show up bold. Let's look at the example below to see how we write the HTML code:

```html
Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>
```

# Header Tag

So now we have broken up our text into Paragraphs and we know how to isolate word(s) but how can we convey what our content is about?

I know! We can add a title by using an HTML Header!

The Header tag is used to represent the title of the page or content on the page.

Let's give the content within our Paragraph tag a title: 

><h1>Lorem Ipsum</h1>
><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut.</p>

That looks great! Now we know that the paragraph is about Lorum Ipsum.

So, how do we add a header? I'll show you!

Let's examine the HTML code below:

```html
<h1>Lorem Ipsum</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut.</p>
```

You can see we added a Header `<h1></h1>` tag above our Paragraph tag. Any content within the opening and closing tags of the Header tag will be treated as a title.

Usually the `<h1></h1>` tag is reserved for the main title of the page. As a rule of thumb, only one `<h1></h1>` tag should be used per page.

If we want to emphasize other titles on our page, HTML gives us other options we can use. Let's take a look at how we can use different size titles through out our code:

><h1>Lorem Ipsum</h1>
><h2>Lorem Ipsum</h2>
><h3>Lorem Ipsum</h3>
><h4>Lorem Ipsum</h4>
><h5>Lorem Ipsum</h5>
><h6>Lorem Ipsum</h6>

See how the title shrinks in the example above?

We can use other Header tags to emphasize the main title of the page as well as titles of content on our page. Take a look at below at how we can do this:

```html
<h1>Lorem Ipsum</h1>
<h2>Lorem Ipsum</h2>
<h3>Lorem Ipsum</h3>
<h4>Lorem Ipsum</h4>
<h5>Lorem Ipsum</h5>
<h6>Lorem Ipsum</h6>
```

# img Tag

Our lesson on common HTML tags would not be complete without talking about images. Everyone loves to have some great quality images on their website, I know I sure do! I love to share all the creations I make at the bakery.

Adding images to our website is simple! We use the Img `<img />` tag in our HTML to add images. 

Wait, something looks a bit off! In our previous examples, we had an opening and closing tag but the Img Tag `<img />` only has one tag, is this right? Ofcourse it is! The Img `<img />` tag is a `self closing` tag. We can open and close the tag all within one tag by adding a `/` just before the `>` symbol in the opening tag.

Now that we have introduced the Img tag `<img />`, let's take a look at an example:

><h1>Lorem Ipsum</h1>
><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nunc mi ipsum faucibus vitae aliquet. Egestas sed sed risus pretium quam vulputate. Ut diam quam nulla porttitor. Turpis egestas pretium aenean pharetra magna ac. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id leo in vitae turpis massa sed elementum tempus. Cursus turpis massa tincidunt dui ut.</p>
><img src="../img/cupcake.png" alt="cupcake image" />

That's a good looking cupcake we got! Ok, let's take a look at the HTML code on how we added this image:

```html
<img src="..img/cupcake.png" alt="cupcake image" />
```

You maybe wondering what `src` and `alt` are within our Img tag? Well these are `Attributes`. All HTML tags or elements can have some `Attributes`, they provide some more information about our HTML tag. Think about our cupcakes example for a moment. If our HTML tag was a cupcake, we can use `Attributes` to convey what ingredients we are using and how much. `Attributes` usually come with a name and value and are always specified in the start tag. In our example above, the Img `<img />` tag has two attributes, `src` which tells our website which image we are using, and `alt` which helps give a description of the image for screen readers or if the image does not load. For the `src` attribute, we will show you how to add images from our code base or through website URLs in our upcoming `Links` lesson, we will discuss `Absolute` vs `Relative` URLs.

Just one more word on images and self closing tags! You can see in our example code above as to why we use a `self closing` tag. There is no content needed between the opening and closing tags! In our previous examples for the Paragraph tag `<p></p>` or Span tag `<span></span>`, we added words between the tags so that the content was being displayed on our website. For the Img tag `<img />`, we specify what image to display using the `src` attribute, no other information is needed so we can close the tag with a `self closing` tag.

# It's Practice Time!
Phew!!! That was a lot to cover for this lesson. Let's get some practice in and really hit this lesson home! 