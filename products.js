const axios = require("axios");
const productsHrv = `https://apis.haravan.com/com/products.json`;
const productsSapo = `https://609253e5134c4ea1932bea7b7c1e33aa:a2832cfdfc824eb29e2f567437d72d98@f1genz-furniture-luxury-2.mysapo.net/admin/products.json`;
const configHrv = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer A9A05E018A5242DE4A87F2A55D01646708E18F643D3D5AB2006C9DAFF94CE30E`,
  }, 
};

const postDataReq = async (product) => {
  await axios
    .post(productsSapo, { product })
    .then((res) => res.data.product)
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

const fetchProducts = async () => {
  let fetchHrvs = await axios
    .get(productsHrv, configHrv)
    .then((res) => res.data.products);

  const listVariant = fetchHrvs[0].variants.map((value, key) => ({
    ...value,
    id: value.id,
    inventory_management: 'bizweb',
    inventory_policy: 'continue'
  }));
  if (fetchHrvs) {
    fetchHrvs.map((fetchHrv, index) => {
      let product = {
        name: fetchHrv.title,
        content: fetchHrv.body_html,
        vendor: fetchHrv.vendor,
        product_type: fetchHrv.product_type,
        tags: fetchHrv.tags,
        variants: listVariant,
        published_on: fetchHrv.published_at,
        published: true,
        images: fetchHrv.images,
      };
      const postData = postDataReq(product);
    });
  }
};
fetchProducts();
