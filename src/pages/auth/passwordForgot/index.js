import { useState } from "react";
import useFetch from "@/hooks/useFetch";

import Loading from "@/components/UI/Loading";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Title from "@/components/UI/Title";
import Notification from "@/components/UI/Notification";
import Link from "next/link";

const Index = () => {
  const [userForm, setUserForm] = useState({
    email: "",
  });

  const { fetchData, data, error, loading } = useFetch({
    url: "/auth/password/forgot",
    method: "PUT",
    body: userForm,
    token: null,
  });

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitRequest = (e) => {
    e.preventDefault();
    fetchData();
  };

  if (loading) {
    return <Loading isLoad={loading} />;
  }

  return (
    <>
      <Title title="Forgot password" Level="h1" />
      <form onSubmit={(e) => submitRequest(e)}>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder={"Enter your email"}
          value={userForm.email}
          onChange={(e) => handleChange(e)}
        />
        <Button
          type="submit"
          title="Reset your password"
          className="btn__primary"
        />
      </form>
      <Link href="/auth/login">Back to login</Link>
      {error && <Notification type="error" message={error} />}
      {data && <Notification type="success" message={data.message} />}
    </>
  );
};

export default Index;
