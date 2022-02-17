import {ThemeProvider} from '@chakra-ui/react';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import theme from '../../../theme';
const LibWrapper: React.FC = ({children}) => {
  const id = 'go-fund-ust-contribute-to-fund';
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <div id={id}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <ThemeProvider theme={theme} cssVarsRoot={`#${id}`}>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
};

export default LibWrapper;
