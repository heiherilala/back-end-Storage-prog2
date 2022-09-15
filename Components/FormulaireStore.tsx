
import { Field, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { APIUrl, backgroundColor } from "../constants";
import { Application, JobOffer, storeCreate } from "../interfaces";
import { getCurrentUser, postPutDeletRequest } from "../hoooks";
import { useEffect, useState } from "react";
import Loading from "./Loading";
interface props {
  idJobOffer:number;
}

const FormulaireStore: React.FC<props> = (props) => {


  const formik = useFormik({
    initialValues: {
      name: "",
      place: "",
      maxWeigthKg: 0,
      maxVolumeM3: 0,

    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      maxVolumeM3: Yup.number()
        .max(10000, "heure trop élevé (>10000)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      maxWeigthKg: Yup.number()
        .max(1000000, "heure trop élevé (>1000000)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      place: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {

      setLoadingCheck(true);

      
      const objectData:storeCreate = {
        name: values.name,
        place: values.place,
        maxWeigthKg: values.maxWeigthKg,
        maxVolumeM3: values.maxVolumeM3
      };


      try{
        postPutDeletRequest("/stores",objectData,null,true,false,()=>{setLoadingCheck(false)},()=>{},myToken);
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
                    
              <div className="form-group col transparant">
                <label htmlFor="id" className="label_input">
                  heur:
                </label>
                <input
                  id="maxWeigthKg"
                  type="text"
                  className="form-control"
                  placeholder="salaire"
                  value={formik.values.maxWeigthKg}
                  onChange={formik.handleChange}
                />
                {formik.errors.maxWeigthKg ? <p> {formik.errors.maxWeigthKg} </p> : null}


              </div>


              <div className="form-group col transparant">
                <label htmlFor="id" className="label_input">
                  heur:
                </label>
                <input
                  id="maxVolumeM3"
                  type="text"
                  className="form-control"
                  placeholder="salaire"
                  value={formik.values.maxVolumeM3}
                  onChange={formik.handleChange}
                />
                {formik.errors.maxVolumeM3 ? <p> {formik.errors.maxVolumeM3} </p> : null}
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

export default FormulaireStore;
