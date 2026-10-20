# Blog

`index.html` is the blog landing page. It lists posts and generates the monthly Archive dropdown from each post card’s date.

To publish a post:

1. Create its HTML page inside `posts/` using an existing post as the layout reference. Keep the terminal boot screen, shared header and footer, responsive article layout, right-side contents and share boxes, and the “Back to blog page” link.
2. Add a visible `By Chavez Cyrillus Mariae Poon` byline beneath the post subtitle and `<meta name="author" content="Chavez Cyrillus Mariae Poon">` in the document head.
3. Give each article heading an `id` and list it in the contents box. Keep the Facebook, X, and Threads SVG share links.
4. Add a card to this page with `data-post-date="YYYY-MM-DD"`, a `.post-title-link`, subtitle, short excerpt, reading time, and relative link to the post. Put the newest post first; the archive and homepage preview use post dates to select and order posts.
5. Include the shared Archive CSS and JavaScript on the post page so its navigation can load the archive from this listing.

Post dates determine the archive month and newest-first order. The site’s shared styles and scripts are in `../assets/`.
