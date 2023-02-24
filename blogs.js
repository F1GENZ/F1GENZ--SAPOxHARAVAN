const axios = require("axios");
const blogHrv = `https://apis.haravan.com/web/blogs.json`;
const blogSapo = `https://609253e5134c4ea1932bea7b7c1e33aa:a2832cfdfc824eb29e2f567437d72d98@f1genz-furniture-luxury-2.mysapo.net/admin/blogs.json`;
const configHrv = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer A9A05E018A5242DE4A87F2A55D01646708E18F643D3D5AB2006C9DAFF94CE30E`,
  },
};

const postDataReq = async (blog) => {
  const response = await axios.post(blogSapo, { blog }).catch((error) => {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  });
  return response.data;
};

const postArticleReq = async (article) => {
  const articleSapo = `https://609253e5134c4ea1932bea7b7c1e33aa:a2832cfdfc824eb29e2f567437d72d98@f1genz-furniture-luxury-2.mysapo.net/admin/blogs/${article.blog_id}/articles.json`;
  const response = await axios.post(articleSapo, { article }).catch((error) => {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  });
  return response.data;
};

const fetchBlogs = async () => {
  let fetchHrvs = await axios.get(blogHrv, configHrv);
  if (fetchHrvs && fetchHrvs.data.blogs.Data) {
    fetchHrvs.data.blogs.Data.map(async (fetchHrv, index) => {
      let blog = {
        name: fetchHrv.title,
        commentable: fetchHrv.commentable,
        alias: fetchHrv.handle,
        template_layout: fetchHrv.template_suffix,
      };
      const postData = await postDataReq(blog);

      /* Article */
      let fetchArticles = await axios.get(
        `https://apis.haravan.com/web/blogs/${fetchHrv.id}/articles.json`,
        configHrv
      );
      if (fetchArticles && fetchArticles.data.article) {
        console.log(fetchArticles.data.article[0]);
        fetchArticles.data.article.map(async (fetchArticle, indexArticle) => {
          let article = {
            ... fetchArticle,
            title: fetchArticle.title,
            blog_id: postData.blog.id,
            content: fetchArticle.body_html,
            metafield: { description: fetchArticle.meta_description },
            published_on: fetchArticle.published_at,
          };
          const postArticle = await postArticleReq(article);
          console.log(postArticle);
        });
      }
    });
  }
};
fetchBlogs();
