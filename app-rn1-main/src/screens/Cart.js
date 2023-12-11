import { Text, View } from "react-native";
import { ProductCardCart } from "../components/ProductCardCart";
import { numberFormat } from "../services/numberFormat";

export const Cart = ({ items, getTotalPrice, removeItemFromCart }) => {
  return <View>
    {items.map((item) => (
      <ProductCardCart 
      key={item.id}
      id={item.id}
      name={item.product.name}
      price={item.product.price}
      qtd={item.qty}
      image={item.product.image}
      removeItemFromCart={removeItemFromCart}
      />
    ))}

    <View>
      <Text>Total: {numberFormat(getTotalPrice())}</Text>
    </View>
  </View>
};
