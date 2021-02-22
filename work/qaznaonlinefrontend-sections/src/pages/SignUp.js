import React from 'react';
import {Col, Container, Row, Button, Form} from "react-bootstrap";

const SignUp = () => {
  return <>
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Электронная почта</Form.Label>
              <Form.Control type="email" placeholder="Введите почту" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Новый пароль</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Подтверждение пароля</Form.Label>
              <Form.Control type="password" placeholder="Введите пароль" />
            </Form.Group>
            <Button variant="primary" >
              Выбрать сертификат
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
</>
}

export default SignUp;
