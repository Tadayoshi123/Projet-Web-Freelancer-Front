import { useState, useEffect } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/";
import Title from "@/components/UI/Title";

const Index = () => {

  const [userForm, setUserForm] = useState({
    email: "",
    password:""
  });

  useEffect(() => {
    console.log(userForm);
  },[userForm])


  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3030/api/v1/auth/login", {
      body: JSON.stringify(userForm),
      method: "POST",
      headers: {
        "Content-Type":"Application/json"
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err=>console.log(err)) 
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
