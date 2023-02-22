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
  console.log({ blog });
  await axios
    .post(blogSapo, { blog })
    .then((res) => res.data)
    .catch((error) => {
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
};

const fetchBlogs = async () => {
  let fetchHrvs = await axios
    .get(blogHrv, configHrv)
    .then((res) => res.data.blogs.Data);
  if (fetchHrvs) {
    fetchHrvs.map((fetchHrv, index) => {
      let blog = { 
        name: fetchHrv.title,
      };
      const postData = postDataReq(blog);
    });
  }
};
fetchBlogs();
