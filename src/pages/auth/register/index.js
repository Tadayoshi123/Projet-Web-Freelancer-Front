import React from 'react';
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

const Index = () => {

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:""
  })

  return (
    <>
      <Title title="Inscription" Level="h1" />
      <form>
        <Input
          type=""
          required=""
          placeholder=""
        />
        <Button />
      </form>
    </>
  );
}

export default Index;
