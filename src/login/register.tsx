import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { schema, type FormData, type UserState } from "./usertype";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { alertsweet } from "../sweetalert";

export default function Registercomponent() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const registersuccess = () =>
    setTimeout(() => {
      toast.success("Resgister successfull.");
      navigate("/signin");
    }, 1000);

  const onSubmit = (values: FormData) => {
    const account = localStorage.getItem("registeredaccount");
    if (!account) {
      localStorage.setItem("registeredaccount", JSON.stringify([values]));
      registersuccess();
    } else {
      const getaccountlist = JSON.parse(account);
      const checkemail = getaccountlist.some(
        (item: UserState) => item.email === values.email
      );
      if (checkemail) {
        alertsweet("This email already registered.");
      } else {
        const newaccountlist = [...getaccountlist, values];
        localStorage.setItem(
          "registeredaccount",
          JSON.stringify(newaccountlist)
        );
        registersuccess();
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
      <Typography.Title level={2}>Register</Typography.Title>
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

        <Form.Item>
          <Button
            style={{ marginBottom: 10 }}
            block
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
          <a href="/signin"><LeftOutlined /> Back</a>
          <Toaster />
        </Form.Item>
      </Form>
    </Flex>
  );
}
