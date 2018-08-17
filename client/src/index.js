import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import 'semantic-ui-css/semantic.min.css';

import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';

const httpLink = createHttpLink({
  uri: 'http://localhost:8081/graphql',
});

const authLink = setContext((_, { headers }) =>
  // return the headers to the context so httpLink can read them
  ({
    headers: {
      ...headers,
      'x-token': localStorage.getItem('token'),
      'x-refresh': localStorage.getItem('refreshToken'),
    },
  }));

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext();
    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return response;
  }));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: afterwareLink.concat(authLink.concat(httpLink)),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
