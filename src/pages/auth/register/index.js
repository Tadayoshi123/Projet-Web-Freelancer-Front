import {useState} from 'react';
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import useFetch from '@/hooks/useFetch';

const Index = () => {

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const {fetchData, data, error, loading} = useFetch({url:'/auth/register', method:"POST", body:userForm})
    
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    console.log(data);
  }

  return (
    <>
      <Title title="Inscription" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <Input
          label="Firstname"
          type="firstName"
          name="firstName"
          placeholder="veuillez saisir votre prénom"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.firstName}
        />
        <Input
          label="Lastname"
          type="lastName"
          name="lastName"
          placeholder="veuillez saisir votre nom"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.lastName}
        />
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
