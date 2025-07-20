import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "My First Book",
    description: "Wrote My First Book",
    price: 10,
  },
  {
    id: "p2",
    title: "My Second Book",
    description: "Wrote My Second Book",
    price: 11,
  },
  {
    id: "p3",
    title: "My Third Book",
    description: "Wrote My Third Book",
    price: 5,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((prod) => (
          <ProductItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            price={prod.price}
            description={prod.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
