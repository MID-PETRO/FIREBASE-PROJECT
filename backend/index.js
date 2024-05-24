require("dotenv").config();
const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const collectionKey = "productsList";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const getProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const { data } = response;
    const productos = data.products;
    return productos;
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const processProducts = (products) => {
  products.forEach((docKey, index) => {
    firestore
      .collection(collectionKey)
      .doc((index + 1).toString())
      .set(docKey)
      .then((res) => {
        console.log("Document " + (index + 1) + " sucessfully written");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
};

const main = async () => {
  const productsArray = await getProducts();

  if (productsArray) {
    processProducts(productsArray);
  }
};

main();
