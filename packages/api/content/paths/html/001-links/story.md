#Moving around with Links

Hey **{{firstName}}, HTML Holly here again. It was a crazy day working at the restaurant. But now, it's time to teach myself some HTML.
I missed the train and got late for my code practicing. At least I had a chance to start my reading on my way home. It's funny because today's lesson is all about Links. Here is what I learned at the train,  that links are the way we move around on the Internet. Let's writing this Zine.
---
##Linking and Navigation
The code you have to write to create a link isn't that complicated. To make a link we use the <a> HTML element. 

<a href="somepage.html">This is a Link</a>

Now you will have a clickable This is a Link text. When you hover it with the mouse, the cursor will change its appearance. Once you click it, the browser will follow the instructions you put on the HTML an element and led you to somepage.html content. And that's is how we move around, navigating on the internet. Click on a link and take the train to the next content.

Let's check this syntax out again: 

<a href="somepage.html">This is a Link</a>

In this syntax, a stands for anchor, and href stands for hypertext reference. The concept of hypertext is to have a text that links you to other text, just the behavior you are probably used to when you click in a link it the Internet.
Want a link for the Code Mentoring webpage?Here is how it should be:

<a href="https://codementoring.co/">Code Mentoring</a>

##Absolute vs Relative URL
The internet is like any huge metropolis in the world, it's impossible to know all the streets. Links gave you the directions you need. You can have a place full address, like 290 Brenner Blvd, Toronto. So you can get there by locating this address, no matter where you are. Another situation would be asking for directions to someone on the street, and the person could answer, "Two blocks down from here". An absolute URL is like the first example, with the full address. No matter where you are, the HTML will lead you to that content. 

<a href="https://codementoring.co/">Code Mentoring</a>

Relative URLs are more like the second example, the directions you have depends on the position you are now. If you were somewhere else, it wouldn't make sense. Let's say you have a website with two pages, and you want a link from page 1 to page 2. Page 2 will be a file in the same folder that Page 1 is:

<a href="https://page2.html">Go to Page 2</a>

If you decide to move Page 2 to its own folder named page-2, that link will not work anymore. You have to update it.

<a href="https://page-2/page2.html">Go to Page 2</a>

Hey, HTML Holly here again. It was a crazy day working at the restaurant. But now, it's time to teach myself some HTML.


 I missed the train and got late for my code practicing. At least I had a chance to start my reading on my way home. It's funny because today's lesson is all about Links. Here is what I learned at the train,  that links are the way we move around on the Internet. Let's writing this journal.

The Code Along Zine
##Linking and Navigation
The code you have to write to create a link isn't that complicated. To make a link we use the <a> HTML element. 

<a href="somepage.html">This is a Link</a>

Now you will have a clickable This is a Link text. When you hover it with the mouse, the cursor will change its appearance. Once you click it, the browser will follow the instructions you put on the HTML an element and led ou to somepage.html content. And that's is how we move around, navigating on the internet. Click on a link and take the train to the next content.

Let's check this syntax out again: 
<a href="somepage.html">This is a Link</a>

In this syntax, a stands for anchor, and href stands for hypertext reference. The concept of hypertext is to have a text that links you to other text, just the behavior you are probably used to when you click in a link it the Internet.
Want a link for the Code Mentoring webpage?Here is how it should be:
<a href="https://codementoring.co/">Code Mentoring</a>

##Absolute vs Relative URL
The internet is like any huge metropolis in the world, it's impossible to know all the streets. Links gave you the directions you need. You can have a place full address, like 290 Brenner Blvd, Toronto. So you can get there by locating this address, no matter where you are. Another situation would be asking for directions to someone on the street, and the person could answer, "Two blocks down from here". An absolute URL is like the first example, with the full address. No matter where you are, the HTML will lead you to that content. 
<a href="https://codementoring.co/">Code Mentoring</a>

Relative URLs are more like the second example, the directions you have depends on the position you are now. If you were somewhere else, it wouldn't make sense. Let's say you have a website with two pages, and you want a link from page 1 to page 2. Page 2 will be a file in the same folder that Page 1 is.
<a href="https://page2.html">Go to Page 2</a>
If you decide to move Page 2 to its own folder named page-2, that link will not work anymore. You have to update it.
<a href="https://page-2/page2.html">Go to Page 2</a>

##Hash Links
Some times you don't want to take the train and cross the entire city. Maybe you just want to ride a bus for 4 stops. With hash links, it's possible to create a reference within the page. Here is the syntax: 
<a href="#about">About</a>

You usually find links with this syntax in navigations menus.  In this case, after click in the About link, it will lead you to the About section, within the same page. The About section has to be wrapped by an HTML element with the id = "about", like this:

<div id= "about"> This is the about section</div>

##Clickable images
When you use the <a> HTML element to create a link, it doesn't have to be only text, it also can wrapper an image for example. Let's say we have this bus.png image inside of a folder named img, and we want to use it as a link for a page with the bus schedule. The syntax would be like this:

<a href="//bus-schedule">
	<img source="img/bus.png" />
</a>

##Code is all about practice
Let's create some links to our Zine!