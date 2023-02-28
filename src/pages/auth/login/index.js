import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/";
import Title from "@/components/UI/Title";

const Index = () => {

  const [userForm, setUserForm] = useState({
    email: "",
    password:""
  });

  const {fetchData, data, error, loading} = useFetch({url:"/auth/login", method:"POST", body: userForm})


  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = (e) => {
    e.preventDefault();
    fetchData();
    console.log(data);
  }

  return (
    <>
      <Title title="Login" Level="h1" />
      <form onSubmit={(e)=>submitLogin(e)}>
        <Input
        label="Email"
        type="email" 
        name="email" 
        placeholder="veuillez saisir votre email"
        required={true}
        onChange={(e) => handleChange(e)}
        value={userForm.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <Button
          type="submit"
          title="Se connecter"
          className="btn__secondary"
        />
      </form>
    </>
  );

}

export default Index;
