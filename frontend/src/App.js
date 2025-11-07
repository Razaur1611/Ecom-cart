
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Landing from './Pages/Landing';
import Orders from './Pages/Orders';
import Contact from './Pages/Contact';
import Shipping from './Pages/Shipping';
import Returns from './Pages/Returns';
import FAQ from './Pages/FAQ';
import SizeGuide from './Pages/SizeGuide';
import TrackOrder from './Pages/TrackOrder';
import About from './Pages/About';
import Careers from './Pages/Careers';
import Stores from './Pages/Stores';
import Blog from './Pages/Blog';
import Press from './Pages/Press';
import Sustainability from './Pages/Sustainability';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Cookies from './Pages/Cookies';
import Accessibility from './Pages/Accessibility';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory category="men" />} />
        <Route path='/womens' element={<ShopCategory category="women" />} />
        <Route path='/kids' element={<ShopCategory category="kid" />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/returns' element={<Returns />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/size-guide' element={<SizeGuide />} />
        <Route path='/track-order' element={<TrackOrder />} />
        <Route path='/about' element={<About />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/stores' element={<Stores />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/press' element={<Press />} />
        <Route path='/sustainability' element={<Sustainability />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/cookies' element={<Cookies />} />
        <Route path='/accessibility' element={<Accessibility />} />
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
