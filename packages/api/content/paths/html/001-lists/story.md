 # HTML is on my wishlist

Hey **{{firstName}}!**, HTML Holly here again.
I'll have a busy week at the restaurant. It happens twice a month when we have more catering orders from the clients. So I have to plan well if I don't want to be behind on my HTML learning. As a study strategy, I decided to begin the weak with a list of subjects I have to learn for the next five days. Checking on my list, I can see this Monday I'm learning more about how to use Lists with HTML. Let's see the final result in my journal.

---


The Code Along Zine
## HTML Lists

A shopping list, a list of ingredients, a wishlist. Lists are useful in a bunch of cases, so it wasn't a surprise for me to realize that HTML has its own special tags to represent lists on a webpage. Sometimes it's pretty obvious we are looking at a list, as in a webpage navigation bar, which is just a list of links. But it's not uncommon dealing with less obvious lists structures, like when you see a collection of products with its images and descriptions in an online store, it's generally a list as well.
Let's take a look at our list of types of lists HTML offers: 


* Unordered list
* Ordered list
* Definition list

---

## Unordered lists 

It's the most often used type of list. You use it when you want to group of related items that you don't care for a specific order. To create an unordered list we use the <ul> HTML tag. Here is the syntax:

`<ul>`
  
  `<li>`flour`</li>`

  `<li>`sugar`</li>`

  `<li>`salt`</li>`

 `<li>`eggs`</li>`
 
`</ul>`

The result in the browser:

<ul>
  <li>flour</li>
  <li>sugar</li>
  <li>salt</li>
 <li>eggs</li>
</ul>

As you can see each item on our list have to be wrapped for an `<li>` element. It's a list element tag that marks the beginning and the end of each element in the list.

---
## Ordered lists

Ordered lists have a very similar syntax, instead of wrapping the list elements with a `<ul> `we use an `<ol> `HTML tag. If you are using the `<ol>` it's because you cares about the order of each element within the list. It works better when you are describing logical steps, or listing a ranking for example. Let say you will create a ranking of your favorite program languages:

`<ol>`

  `<li>`JavaScript`</li>`

  `<li>`Typescript`</li>`

  `<li>`Python`</li>`

`</ol>`

The result in the browser:
<ol>
  <li>JavaScript</li>
  <li>Typescript</li>
  <li>Python</li>
</ol>

---

## Definition lists

Also known as the Description List, it works like a dictionary of terms. Definition lists offer us an option for creating a list with a pair of key values elements. In this kind of list, each element is a description or value, wrapped by a definition term. To create a Description list we use the `<dl>` HTML tag that wraps all the elements in the list. Here list element is considered as a descriptive term, and it is wrapped by the `<dt>` tag. Following each descriptive term comes its definition, which is wrapped by the `<dd> `tag.

`<dl>`

  `<dt>`JavaScript`</dt>`

  `<dd>`Programming language commonly used in web development.`</dd> `

  `<dt>`Typescript`</dt>`

  `<dd>`A superset of JavaScript that support types`</dd>`

`</dl>`


The result in the browser:

<dl>
  <dt>JavaScript</dt>
  <dd>Programming language commonly used in web development.</dd>
  <dt>Typescript</dt>
  <dd>A superset of JavaScript that support types</dd>
</dl>