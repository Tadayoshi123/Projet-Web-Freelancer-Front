import { useEffect, useState, useContext } from "react";
import UserContext from "@/context/UserContext";
import {useRouter} from "next/router";
import useFetch from "@/hooks/useFetch";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";

const Index = () => {  

  const router = useRouter();

  const { isLogged, user } = useContext(UserContext);

  console.log(user);

  const [token, setToken] = useState();

  const [isOpen , setIsOpen] = useState(false);

  const { data, error, loading, fetchData } = useFetch({ url:"/user", method:"GET", body:null, token:token });

  useEffect(() => {
    if (typeof window != undefined) {
      setToken(localStorage.getItem("token"));
    }
    if (token) {
      fetchData();
    }
  }, [router.isReady, token])

  useEffect(() => {
    console.log(data);
  },[data])
  
  return (
    <div>
      {
        isOpen && (
          <Modal title="Modifier mon profil">
            {/* children props ici */}
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
