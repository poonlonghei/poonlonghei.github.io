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

'''
add_filter('woocommerce_product_title', 'shorten_product_title', 10, 2); function shorten_product_title($title, $id) { $max_length = 30; // Set the maximum length of the title if (strlen($title) > $max_length) { $title = substr($title, 0, $max_length) . '...'; } return $title; }
'''

In this code snippet, we use
