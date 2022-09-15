import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ProjectUrl, variant } from '../constants';
import background from "./../assets/images/pexels-rodnae-productions-7841410.jpg";
import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage } from 'formik';
import * as Yup from "yup";
import { IUser } from '../interfaces';
import { Field, useFormik } from "formik";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../hoooks';
import hei from '../assets/images/hei.png';


  interface RouterProps {
      history: string;
  }
  
  //type Props = RouteComponentProps<RouterProps>;

  const Login = () => {
    const fielInputRef = useRef<HTMLInputElement>();
    const [activ, setActiv] = useState(true)
    const theFunction = ()=> setActiv(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");


  const navigate = ()=>{
    window.location.href=(ProjectUrl+"/");
  }




  const functionLog = (username:string, password:string) => {

    login(username, password, navigate, setToken).then((respons)=>{
    })
  }


  return (
    <>
      <section className="h-100 gradient-form sizimg2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                      <div className="text-center">
                        <img src={hei}
                          alt="logo" className=' sizimg'/>
                        <h4 className="mt-1 mb-5 pb-1">{"Se connecter"}</h4>
                      </div>

                      <Form>

                        <Form.Group className="form-outline mb-4">

                          <Form.Control 
                            className="form-control"
                            name="username"  type="text" 
                            placeholder="Entrer l'Identifiant"  
                            value={username} 
                            onChange={(e)=>{setUsername(e.target.value)} }
                          />
                          <Form.Label className="form-label" 
                              htmlFor="username" 
                          >Identifiant</Form.Label>
                        </Form.Group>

                        <Form.Group className="form-outline mb-4">

                          <Form.Control 
                            name="password"  type="password" 
                            placeholder="Entrer le Mot de passe" 
                            value={password} 
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className="form-control" />
                          <Form.Label className="form-label" 
                              htmlFor="password" 
                            >Mot de passe: </Form.Label>
                          </Form.Group>
                        <Form.Group className="text-center pt-1 mb-5 pb-1">
                          <Button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"  onClick={(e)=>{functionLog(username, password)}}>CONNEXION</Button>
                        </Form.Group>

                      </Form>

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
