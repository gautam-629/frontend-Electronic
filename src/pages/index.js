import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Base from "../components/Base";
import axios from "axios";
import Store from "../components/users/Store";
import {
  infoWithImageInRightSection,
  trendingProducts,
  infoWithImageInLeftSection,
  contactForm,
} from "./HomePageComponents";
import { useState } from "react";
function Index() {
  const [products, setProducts] = useState([
    {
      addedDate: "2023-03-06T12:27:58.578Z",
      category: {
        categoryId: "string",
        coverImage: "string",
        description: "string",
        title: "Learn Code With Durgesh",
      },
      description: "string",
      discountedPrice: 5000,
      live: true,
      price: 6000,
      productId: "string",
      productImageName: "string",
      quantity: 0,
      stock: true,
      title: "Product title",
    },
    {
      addedDate: "2023-03-06T12:27:58.578Z",
      category: {
        categoryId: "string",
        coverImage: "string",
        description: "string",
        title: "Learn Code With Durgesh",
      },
      description: "string",
      discountedPrice: 5000,
      live: true,
      price: 6000,
      productId: "string",
      productImageName: "string",
      quantity: 0,
      stock: true,
      title: "Product title",
    },
    {
      addedDate: "2023-03-06T12:27:58.578Z",
      category: {
        categoryId: "string",
        coverImage: "string",
        description: "string",
        title: "Learn Code With Durgesh",
      },
      description: "string",
      discountedPrice: 5000,
      live: true,
      price: 6000,
      productId: "string",
      productImageName: "string",
      quantity: 0,
      stock: true,
      title: "Product title",
    },
  ]);

  return (
    <Base
      title="Shop what you need"
      description={
        "Welcome to Trending Store, We provide best items as you need. "
      }
      buttonEnabled={true}
      buttonText="Start Shoping "
      buttonType="primary"
      buttonLink="/store"
    >
      <div className="my-4">{trendingProducts(products)}</div>
      <div style={{ margin: "100px 0px" }}>
        {infoWithImageInRightSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nisi assumenda asperiores repudiandae accusamus itaque ratione veritatis, inventore sunt laboriosam."
        )}
      </div>
      <div style={{ margin: "100px 0px" }}>
        {infoWithImageInLeftSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nisi assumenda asperiores repudiandae accusamus itaque ratione veritatis, inventore sunt laboriosam."
        )}
      </div>

      <div className="my-4">{contactForm()}</div>

      <div style={{ margin: "100px 0px" }}>
        {infoWithImageInRightSection(
          "https://random.imagecdn.app/500/150",
          "Lorem ipsum dolor sit amet.",
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nisi assumenda asperiores repudiandae accusamus itaque ratione veritatis, inventore sunt laboriosam."
        )}
      </div>
    </Base>
  );
}
export default Index;
