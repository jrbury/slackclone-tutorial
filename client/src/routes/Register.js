import React from 'react';

import { Container, Header, Input, Button } from 'semantic-ui-react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    })

    console.log(response)
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Input onChange={this.onChange} value={username} placeholder='Username' name="username" fluid />
        <Input onChange={this.onChange} value={email} placeholder='Email' fluid name="email" />
        <Input onChange={this.onChange} value={password} placeholder='Password' type="password" name="password" fluid />

        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

const registerMutation = gql`
mutation($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password)
}
`;

export default graphql(registerMutation)(Register);
