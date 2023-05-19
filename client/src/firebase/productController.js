import { db } from "./index";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const addNewProduct = async (product) => {
  await addDoc(collection(db, "products"), product);
};

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const productos = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return productos;
};

export const updateProduct = async (product) => {
  await setDoc(doc(db, "products", product.id), {
    name: product.name,
    price: product.price,
    img: product.img,
    stock: product.stock,
  });
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};
