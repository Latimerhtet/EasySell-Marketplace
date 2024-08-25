import { Button, Checkbox, Flex, Form, Input, Timeline, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  RedEnvelopeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register, login } from "../API/authAPI";
const FormSample = ({ isLoginPage }) => {
  const [messageApi, contextHolder] = message.useMessage();
  // logging in or registering a user
  const onFinish = async (values) => {
    try {
      if (isLoginPage) {
        const data = await login(values);
        if (data.isSuccess) {
          message.success("Login Successful!");
        }
      } else {
        const data = await register(values);
        if (data.isSuccess) {
          message.success("Registration Successful!");
        }
      }
    } catch (error) {
      if (!isLoginPage) {
        message.error("User already existed!");
      } else {
        message.error("Invalid User credentials");
      }
      console.log(error.message);
    }
  };

  // messages to show when processing and finished

  return (
    <section className="w-screen h-screen flex  justify-center items-center ">
      <Form
        layout="vertical"
        name="register"
        initialValues={{
          remember: true,
        }}
        style={{
          minWidth: 400,
          maxWidth: 500,
        }}
        onFinish={onFinish}
      >
        <p className="text-[#5052b1] font-extrabold space-x-10 text-center  text-2xl mb-8">
          {isLoginPage ? "EASY-SELL - LOGIN" : "EASY-SELL - REGISTER"}
        </p>
        <Form.Item
          label={"Email"}
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Invalid Email!!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<RedEnvelopeOutlined />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        {!isLoginPage && (
          <Form.Item
            label={"Name"}
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
              { min: 3, message: "Username is too short" },
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
        )}
        <Form.Item
          label={"Password"}
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            { min: 5, message: "Password is too weak" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {isLoginPage && <a href="">Forgot password</a>}
          </Flex>
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="w-full block p-2 text-center text-[#5052b1] border-2 border-[#5052b1] rounded-lg hover:bg-[#5052b1] hover:text-white"
          >
            {isLoginPage ? "Login" : "Register"}
          </button>
          or{" "}
          <Link to={isLoginPage ? "/register" : "/login"}>
            {isLoginPage ? "Register now!" : "Login now!"}
          </Link>
        </Form.Item>
      </Form>
    </section>
  );
};

export default FormSample;
