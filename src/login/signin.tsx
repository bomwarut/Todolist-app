import { Button, Flex, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { schema, type FormData, type UserState } from "./usertype";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import { alertsweet } from "../sweetalert";
import { useAuth } from "../auth/authcontext";

export default function SigninComponent() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (values: FormData) => {
    const account = localStorage.getItem("registeredaccount");
    if (!account) {
      alertsweet("Not found registered email please register.");
    } else {
      const getaccountlist = JSON.parse(account);
      const checkemail = getaccountlist.find(
        (item: UserState) =>
          item.email === values.email && item.password !== values.password
      );
      const checkpassword = getaccountlist.find(
        (item: UserState) =>
          item.email !== values.email && item.password === values.password
      );
      if (checkemail || checkpassword) {
        alertsweet(
          checkemail
            ? "Password is incorrect please try again."
            : "Email is incorrect please try again."
        );
      } else {
        login(values);
        toast.success("Welcome");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };

  return (
    <Flex
      gap="middle"
      vertical
      style={{
        width: "fit-content",
        margin: "auto",
        height: "100%",
        textAlign: "center",
      }}
      justify="center"
    >
      <Typography.Title level={2}>Signin</Typography.Title>
      <Form
        name="login"
        style={{ maxWidth: 360 }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            style={{ marginBottom: 10 }}
            block
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
          or <a href="/register">Register now!</a>
          <Toaster />
        </Form.Item>
      </Form>
    </Flex>
  );
}
