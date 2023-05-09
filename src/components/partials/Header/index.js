import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Logo from "../../../../public/images/logo/logo.svg";
import NavItem from "@/components/UI/NavItem";
import Button from "@/components/UI/Button";

const Index = () => {

  
  const router = useRouter();
  
  const { user, isLogged, isAdmin, logout } = useContext(UserContext);

  const [menu, setMenu] = useState([{
      title: "Home",
      link: "/",
      className:styles.nav__item
    }])

  const publicMenu = [
    {
      title: "Home",
      link: "/",
      className:styles.nav__item
    }
  ]

  const authMenu = [
    {
      title: "Profile",
      link: "/account/profil",
      className:styles.nav__item
    }
   ]

  const adminMenu = [
    {
      title: "Dashboard",
      link: "/admin",
      className:styles.nav__item
    },
    {
      title: "User",
      link: "/admin/user",
      className:styles.nav__item
    },
    {
      title: "Job",
      link: "/admin/job",
      className:styles.nav__item
    },
    {
      title: "Skill",
      link: "/admin/skill",
      className:styles.nav__item
    },
    {
      title: "Company",
      link: "/admin/company",
      className:styles.nav__item
    },
  ]

  const freelanceMenu = [
    {
      title: "Dashboard",
      link: "/dashboard/freelance",
      className:styles.nav__item
    }
  ]

  const companyMenu = [
    {
      title: "Dashboard",
      link: "/dashboard/company",
      className:styles.nav__item
    }
  ]

  useEffect(() => {
    if (isAdmin) {
      setMenu([...publicMenu, ...adminMenu])
    } else if (isLogged) {
      if (user.freelance !== null) {
        setMenu([...publicMenu, ...authMenu, ...freelanceMenu])
      } else if (user.company !== null) {
        setMenu([...publicMenu, ...authMenu, ...companyMenu])
      } else {
        setMenu([...publicMenu, ...authMenu])
      }
    } else {
      setMenu([...publicMenu])
    }
    
  }, [user, isLogged, isAdmin])


  return (
    <div className={`${styles.wrapper} flex`}>
      <div className={styles.logo}>
        <img src={Logo.src} alt="FreelancerLogo" />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {
            menu && menu.map((item, index) => (
              <NavItem key={index} item={item} />
            ))
          }
          {
            isLogged ? (
              <>
                
                <li>
                  <Button type="button" title="Logout" className="btn__logout" handleClick={
                    () => logout()
                  } />
                </li>
              </>
            ) : (  
              <>          
                <li className={styles.nav__item}>
                  <Button type="button" title="Login" className="btn__primary" handleClick={
                    () => router.push('/auth/login')
                  }/>
                </li>
              </> 
            )
          }
        </ul>
      </nav>
    </div>
  );
}

export default Index;
