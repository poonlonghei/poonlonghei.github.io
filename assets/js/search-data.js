// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-about-me",
          title: "about me",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "post-one-month-in-walsingham",
        
          title: "One Month in Walsingham",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/one-month-in-walsingham/";
          
        },
      },{id: "post-you-are-so-blessed",
        
          title: "You are so blessed",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/you-are-so-blessed/";
          
        },
      },{id: "news-a-happy-and-blessed-new-year-of-2026-to-you-all",
          title: 'A happy and blessed new year of 2026 to you all!',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%68%61%76%65%7A%70%6F%6F%6E@%69%63%6C%6F%75%64.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-facebook',
        title: 'Facebook',
        section: 'Socials',
        handler: () => {
          window.open("https://facebook.com/poonlhchavez", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/_chavhei03_", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@cyrillusmariae", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
