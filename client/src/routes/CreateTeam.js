import React from 'react';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { Message, Form, Container, Header, Input, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { name } = this;

    const response = await this.props.mutate({
      variables: { name },
    });

    console.log(response);

    const { ok, errors } = response.data.createTeam;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        console.log(path, message);
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      name,
      errors: { nameError },
    } = this;

    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Header as="h2">Create a Team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input onChange={this.onChange} value={name} placeholder="Name" fluid name="name" />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>

        {errorList.length ? (
          <Message error header="There were some errors with your submission" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
