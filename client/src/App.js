import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CategoryScreen from './screens/CategoryScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserOrdersScreen from './screens/UserOrdersScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import CategoryCreateScreen from './screens/CategoryCreateScreen'
import OrderListScreen from './screens/OrderListScreen'
import Dashboard from './screens/Dashboard'
import NotFound from './layout/NotFound/NotFound'



function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/category/:id' component={CategoryScreen} />
          <Route path='/admin/category/create' component={CategoryCreateScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          
          <Route path="/admin/dashboard" component={Dashboard}/>
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/category/:id/edit' component={CategoryEditScreen} />

          <Route path='/admin/categorylist' component={CategoryListScreen} />

          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/myorders' component={UserOrdersScreen} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
