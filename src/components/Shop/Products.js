import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
const DUMMY_PRODUCTS=[
  {
    id:'p1',
    price:6,
    title: 'My first book',
    description:'the first book i ever wrote'
  },
  {
    id:'p2',
    price:6,
    title: 'My second book',
    description:'the second book i ever wrote'
  }
]

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(item=>(
          <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />))
        }
        
      </ul>
    </section>
  );
};

export default Products;
