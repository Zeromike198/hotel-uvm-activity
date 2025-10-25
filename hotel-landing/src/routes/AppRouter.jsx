import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Rooms from '../pages/Rooms';
import RoomDetail from '../pages/RoomDetail';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import About from '../pages/About';
import Admin from '../pages/Admin';
import PageTransition from '../components/PageTransition';

const AppRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/rooms" element={<PageTransition><Rooms /></PageTransition>} />
        <Route path="/rooms/:id" element={<PageTransition><RoomDetail /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
