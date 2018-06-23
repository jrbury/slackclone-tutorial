import React from 'react';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { Container, Header, Input, Button } from 'semantic-ui-react';

export default observer(class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

    onSubmit = () => {
      const { email, password } = this;

      console.log(email);
      console.log(password);
    };

    onChange = (e) => {
      const { name, value } = e.target;
      this[name] = value;
    };

    render() {
      const { email, password } = this;
      return (
        <Container text>
          <Header as="h2">Login</Header>
          <Input onChange={this.onChange} value={email} placeholder="Email" fluid name="email" />
          <Input
            onChange={this.onChange}
            value={password}
            placeholder="Password"
            type="password"
            name="password"
            fluid
          />

          <Button onClick={this.onSubmit}>Submit</Button>
        </Container>
      );
    }
});
