import React, { useEffect, useState } from "react";
import "./css/UserHome.css";

export default function UserHome() {
  const token = localStorage.getItem("token");
  const [tn, setTn] = useState(0);
  const [kl, setKl] = useState(0);
  const [kr, setKr] = useState(0);
  const [tel, setTel] = useState(0);
  const [mh, setMh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/user/tamil-nadu-count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setTn(result);
      } catch (error) {}
    };

    fetchData();
  }, [token]);



  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await fetch(
          "http://localhost:8080/user/kerala-count",
          {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }
        );
        if(!response.ok)
        {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setKl(result);
      }catch(error){
          
      }
    }

    fetchData();
  },[token])


  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await fetch(
          "http://localhost:8080/user/karnataka-count",
          {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }
        );
        if(!response.ok)
        {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setKr(result);
      }catch(error){
          
      }
    }

    fetchData();
  },[token])



  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await fetch(
          "http://localhost:8080/user/telangana-count",
          {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }
        );
        if(!response.ok)
        {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setTel(result);
      }catch(error){
          
      }
    }

    fetchData();
  },[token])



  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await fetch(
          "http://localhost:8080/user/maharashtra-count",
          {
            headers:{
              Authorization:`Bearer ${token}`,
            }
          }
        );
        if(!response.ok)
        {
          throw new Error(`HTTP ERROR : ${response.status}`);
        }

        const result = await response.json();
        setMh(result);
      }catch(error){
          
      }
    }

    fetchData();
  },[token])



  return (
    <div className="user-home-container">
      <div className="info">
        What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the industry's standard
        dummy text ever since the 1500s, when an unknown printer took a galley
        of type and scrambled it to make a type specimen book. It has survived
        not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more
        recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum. Why do we use it? It is a long established fact
        that a reader will be distracted by the readable content of a page when
        looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using
        'Content here, content here', making it look like readable English. Many
        desktop publishing packages and web page editors now use Lorem Ipsum as
        their default model text, and a search for 'lorem ipsum' will uncover
        many web sites still in their infancy. Various versions have evolved
        over the years, sometimes by accident, sometimes on purpose (injected
        humour and the like).
      </div>

      <div className="home-card-container">
        <div className="home-card">
          <h5>Tamil Nadu</h5>
          <h3>{tn}</h3>
        </div>
        <div className="home-card">
          <h5>Maharastra</h5>
          <h3>{mh}</h3>
        </div>
        <div className="home-card">
          <h5>Karnataka</h5>
          <h3>{kr}</h3>
        </div>
        <div className="home-card">
          <h5>Kerala</h5>
          <h3>{kl}</h3>
        </div>
        <div className="home-card">
          <h5>Telangana</h5>
          <h3>{tel}</h3>
        </div>
      </div>
    </div>
  );
}
