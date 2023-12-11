import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsList } from "./src/screens/ProductList";
import { ProductDetails } from "./src/screens/ProductDetails";
import { Cart } from "./src/screens/Cart";
import { CartIcon } from "./src/components/CartIcon";
import { getProduct } from "./src/services/productsService";

const App = () => {
  const Stack = createNativeStackNavigator();
  const [itensCarrinho, setItensCarrinho] = useState([]);

  const addItemToCart = (id) => {
    const product = getProduct(id);
    setItensCarrinho((prevItems) => {
      const item = prevItems.find((item) => item.id === id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            product,
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id === id) {
            item.qty++;
          }
          return item;
        });
      }
    });
  };

  const removeItemFromCart = (id) => {
    const arrayWithoutItems = itensCarrinho.filter((item) => item.id !== id);

    setItensCarrinho(arrayWithoutItems);
  };

  const getItemsCount = () => {
    return itensCarrinho.reduce((sum, item) => sum + item.qty, 0);
  };

  const getTotalPrice = () => {
    return itensCarrinho.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={ProductsList}
          options={({ navigation }) => ({
            title: "Produtos",
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation} getItemsCount={getItemsCount} />,
            headerStyle: { backgroundColor: "#3498db" }, // Change header background color
            headerTintColor: "#fff", // Change header text color
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          options={({ navigation }) => ({
            title: "Detalhes do produto",
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation} getItemsCount={getItemsCount} />,
            headerStyle: { backgroundColor: "#2ecc71" },
            headerTintColor: "#fff",
          })}
        >
          {(props) => <ProductDetails {...props} addItemToCart={addItemToCart} />}
        </Stack.Screen>
        <Stack.Screen
          name="Cart"
          options={({ navigation }) => ({
            title: "Meu carrinho",
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <CartIcon navigation={navigation} getItemsCount={getItemsCount} />,
            headerStyle: { backgroundColor: "#e74c3c" },
            headerTintColor: "#fff",
          })}
        >
          {(props) => <Cart {...props} items={itensCarrinho} removeItemFromCart={removeItemFromCart} getTotalPrice={getTotalPrice} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    color: "#fff", 
  },
});

export default App;