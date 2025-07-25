---
layout: post
title: Shorten WooCommerce Product Titles
image: "https://1000logos.net/wp-content/uploads/2020/08/WooCommerce-Logo.jpg"
date: 2025-07-17
category: [WooCommerce]
author: Chavez Poon
---

If you are a WooCommerce user, you may have noticed that product titles can sometimes be too long, especially if you have a lot of products with similar names. This can make your product pages look cluttered and unprofessional. Fortunately, there is a simple solution to this problem: shortening WooCommerce product titles.

Shortening product titles can help improve the overall appearance of your product pages and make it easier for customers to find what they are looking for. It can also help with SEO, as shorter titles are often more effective at attracting clicks and improving search engine rankings.

To shorten WooCommerce product titles, you can use a simple code snippet that will automatically truncate the title to a specified length. Here’s an example of how to do this:

```
add_filter('woocommerce_product_title', 'shorten_product_title', 10, 2); function shorten_product_title($title, $id) { $max_length = 30; // Set the maximum length of the title if (strlen($title) > $max_length) { $title = substr($title, 0, $max_length) . '...'; } return $title; }
```

In this code snippet, we use `add_filter` function to modify the product title. The `shorten_product_title` function checks the length of the title and truncates it to the specified maximum length (in this case, 30 characters). If the title is longer than the maximum length, it adds an ellipsis `("...")` to the end of the title to indicate that it has been shortened.

You can add this code snippet to your theme’s functions.php file or use a plugin like Code Snippets to add it without modifying your theme files. Once you have added the code, your WooCommerce product titles will be automatically shortened to the specified length.

It’s important to note that shortening product titles can have an impact on SEO, so it's a good idea to test the changes and monitor your search engine rankings after implementing this code. You may also want to consider using descriptive keywords in your product titles to help improve search engine visibility, even if the titles are shortened.

In conclusion, shortening WooCommerce product titles is a simple and effective way to improve the appearance of your product pages and make it easier for customers to find what they are looking for. By using a simple code snippet, you can automatically truncate product titles to a specified length and improve the overall user experience on your WooCommerce store.
