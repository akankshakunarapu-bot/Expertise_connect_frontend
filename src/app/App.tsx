import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
// Same file provider configuration to save tools overhead:
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-dark-800 dark:text-gray-100 border dark:border-dark-700 text-xs font-semibold rounded-xl',
          duration: 3500,
        }}
      />
    </Provider>
  );
};
