import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { ChatPage } from '@/pages/ChatPage';
import { LivePage } from '@/pages/LivePage';
import { FeedPage } from '@/pages/FeedPage';
import { CreatorPage } from '@/pages/CreatorPage';
import { PricingPage } from '@/pages/PricingPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'live',
        element: <LivePage />,
      },
      {
        path: 'create',
        element: <CreatorPage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
