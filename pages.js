const axios = require("axios");
const pageHrv = `https://apis.haravan.com/web/pages.json`;
const pageSapo = `https://609253e5134c4ea1932bea7b7c1e33aa:a2832cfdfc824eb29e2f567437d72d98@f1genz-furniture-luxury-2.mysapo.net/admin/pages.json`;
const configHrv = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer A9A05E018A5242DE4A87F2A55D01646708E18F643D3D5AB2006C9DAFF94CE30E`,
  },
};

const postDataReq = async (page) => {
  const response = await axios.post(pageSapo, { page }).catch((error) => {
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

const fetchPages = async () => {
  let fetchHrvs = await axios.get(pageHrv, configHrv);
  if (fetchHrvs && fetchHrvs.data.pages) {
    console.log(fetchHrvs.data.pages[0]);
    fetchHrvs.data.pages.map(async (fetchHrv, index) => {
      let page = {
        ...fetchHrv,
        content: fetchHrv.body_html,
        published_on: fetchHrv.published_at,
        template_layout: fetchHrv.template_suffix
      }
      const postData = await postDataReq(page);
    });
  }
};
fetchPages();
