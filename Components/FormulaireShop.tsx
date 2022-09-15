
import { Field, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { APIUrl, backgroundColor } from "../constants";
import { Application, JobOffer, shopCreate } from "../interfaces";
import { getCurrentUser, postPutDeletRequest } from "../hoooks";
import { useEffect, useState } from "react";
import Loading from "./Loading";
interface props {
  idJobOffer:number;
}

const FormulaireShop: React.FC<props> = (props) => {

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      place: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      place: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      description: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {

      setLoadingCheck(true);

      
      const objectData:shopCreate = {
        name:values.name,
        description:values.description,
        place:values.place
      };


      try{
        postPutDeletRequest("/shops",objectData,null,true,false,()=>{setLoadingCheck(false)},()=>{},myToken);
      } catch (error){};
    },
  });

  
  const [myToken,setMyToken] = useState<string>();
  const [activUpdat, setActivUpdat] = useState<boolean>(false);
  
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      const subtitutionValue:string =  user.accessToken
      setMyToken(subtitutionValue);
    }
  }, []);



  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);

  if (true) {
    return (
      <div className="componentForm">
          <div className="d-flex flex-column bd-highlight">
            <div className="">
              {'      '}<h3 className="">Information sur l'evenement</h3>
            </div>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
                <div className="form-group">
                  <label htmlFor="id" className="label_input">
                    Nom de l'evenment:
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Nom complet"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name ? (
                    <p> {formik.errors.name} </p>
                  ) : null}
                </div>                         

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                place:
                </label>
                <input
                  
                  id="place"
                  type="textarea"
                  className="form-control"
                  placeholder="place"
                  value={formik.values.place}
                  onChange={formik.handleChange}
                />
                {formik.errors.place ? <p> {formik.errors.place} </p> : null}
              </div> 
                    
              <div className="form-group">
                <label htmlFor="id" className="label_input">
                Description:
                </label>
                <input
                  id="description"
                  type="textarea"
                  className="form-control"
                  placeholder="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description ? <p> {formik.errors.description} </p> : null}
              </div> 

              <span className="d-flex justify-content-center">
                <button type="submit" className={"btn btn-outline-secondary"}>
                  {"Confirmer".toUpperCase()}
                </button>
              </span>

            </form>

          </div>
          {loadingCheck?Loading(()=>{setLoadingCheck(false)}):<></>}
      </div>
    );
  }else{
    return(<></>)
  }

};

export default FormulaireShop;
