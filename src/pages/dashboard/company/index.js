import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import EditMission from "@/components/EditModals/EditMission";
import MissionCard from "@/components/Card";
import JobCard from "@/components/typeCard/JobCard";
import SkillCard from "@/components/typeCard/SkillCard";
import Notification from "@/components/UI/Notification";


const Index = () => {  
    const [token, setToken] = useState();
    const [isOpen , setIsOpen] = useState(false);
    const [editMission, setEditMission] = useState();
    const [deleteMission, setDeleteMission] = useState();
    const { fetchData : fetchMissions, data : dataMissions, error: errorMissions, loading: loadingMissions } = useFetch({ url: "/mission", method: "GET", token: token })
    const { fetchData : fetchDeleteMission, data : dataDeleteMission, error: errorDeleteMission, loading: loadingDeleteMission } = useFetch({url:`/mission/${deleteMission?._id}`, method:"DELETE", token:token})

    useEffect(() => {  
        const newToken = localStorage.getItem('token');
        if (newToken) {
            setToken(newToken);
        }
    }, [])

    useEffect(() => {
        if (deleteMission) {
            fetchDeleteMission();
        }   
    }, [deleteMission])

    useEffect(() => {
        if (dataDeleteMission) {
            fetchMissions();
        }
    }, [dataDeleteMission])

    useEffect(() => {
        fetchMissions();
    }, [token])

    if (loadingMissions || loadingDeleteMission) {
        return <Loading isLoad={loadingMissions || loadingDeleteMission} />
    }

    return (
        <div className={styles.wrapper}>
            {
                isOpen && (
                    <EditMission setIsOpen={setIsOpen} mission={editMission} updateMissions={fetchMissions} />
                )
            }

            <Button title="Create a mission" className="btn__primary" type="button" handleClick={ 
                () => {
                    setIsOpen(true)
                    setEditMission();
                } } 
            />
            { Array.isArray(dataMissions) && dataMissions.map(Mission => (
                <MissionCard key={Mission._id}>
                    <h3>{Mission.title}</h3>
                    <p>{Mission.description}</p>
                    <p>Mission begins: {new Date(Mission.date.start).toDateString()}</p>
                    <p>Mission ends : {new Date(Mission.date.end).toDateString()}</p> 
                    <p>{Mission.price}€</p>
                    {Mission?.jobs.length > 0 && (
                        <p>Jobs : {Mission?.jobs.map((job) => {
                            return <JobCard key={job.id} title={job.name}/>
                        }
                        )}</p>
                    )}
                    {Mission?.skills.length > 0  && (
                        <p>Skills : {Mission?.skills.map((skill) => {
                            return <SkillCard key={skill.id} title={skill.name}/>
                        }
                        )}</p>
                    )}              
                    <Button title="Edit" className="btn__primary" type="button" handleClick={ 
                        () => {
                            setIsOpen(true);
                            setEditMission(Mission);
                        } 
                    } />
                    <Button title="Delete" className="btn__secondary" type="button" handleClick={
                        () => {
                            setDeleteMission(Mission);
                        }
                    } />
                    {errorDeleteMission && <Notification type="error" message={errorDeleteMission} />}
                    {errorMissions && <Notification type="error" message={errorMissions} />}
                </MissionCard>
            ))}
        </div>
    );
}

export default Index;
