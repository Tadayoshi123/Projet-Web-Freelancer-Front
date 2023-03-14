import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import {useRouter} from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";

const Index = () => {  

  const router = useRouter();

  const { isLogged, user } = useContext(UserContext);
  
  console.log(isLogged, user, "account page");

  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState();

  const [isOpen , setIsOpen] = useState(false);

  const { data, error, loading, fetchData } = useFetch({ url:"/user", method:"GET", body:null, token:token });

  const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate} = useFetch({url:"/user", method:"PUT", body:userForm, token:token})

  useEffect(() => {
    if (typeof window != undefined) {
      setToken(localStorage.getItem("token"));
    }
    if (token) {
      fetchData();
    }
  }, [router.isReady, token])

  useEffect(() => {
    setUserForm(data.user)
  }, [data]);
  
  useEffect(() => {
    if (dataUpdate.success) {
      setIsOpen(false);
      fetchData();
    }
  }, [dataUpdate]);

  if (loading || loadingUpdate) return <Loading />

  if (error) console.log(error);
  if (errorUpdate) console.log(errorUpdate);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault();
    fetchDataUpdate();
    if (dataUpdate.success) {
      setIsOpen(false);
    }
  }
  
  return (
    <div>
      {
        isOpen && (
          <Modal title="Modifier mon profil" closeModal={()=>setIsOpen(false)}>
            <form onSubmit={(e) => {submitForm(e)}}>
              <Input 
              label="firstName" 
              type="text" 
              name="firstName" 
              value={userForm.firstName}
              isRequired={true}
              placeholder="enter your firstName"
              onChange={(e) => handleChange(e)}
              />
              <Input 
              label="lastName" 
              type="text" 
              name="lastName" 
              value={userForm.lastName}
              isRequired={true}
              placeholder="enter your lastName"
              onChange={(e) => handleChange(e)}
              />
              <Input 
              label="email" 
              type="text" 
              name="email" 
              value={userForm.email}
              isRequired={true}
              placeholder="enter your email"
              onChange={(e) => handleChange(e)}
              />
              <Button type="submit" title="modifier" className="btn__primary"/>
           </form>
          </Modal>
        )
      }
      <p>Profil page</p>
      {
        data.user && (
          <>
            <p>Firstname : {data.user.firstName}</p>
            <p>LastName : {data.user.lastName}</p>
            <p>Email : {data.user.email}</p>
          </>
        )
      }
      <Button title="modifier" className="btn__primary" type="button" handleClick={ 
        () => {
          setIsOpen(true);
        }
      } />
    </div>
  );
}

export default Index;
