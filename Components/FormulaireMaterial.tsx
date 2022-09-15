
import { Field, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { APIUrl, backgroundColor } from "../constants";
import { Application, JobOffer, materialCreate } from "../interfaces";
import { getCurrentUser, postPutDeletRequest } from "../hoooks";
import { useEffect, useState } from "react";
import Loading from "./Loading";
interface props {
  idJobOffer:number;
}

const FormulaireMaterial: React.FC<props> = (props) => {



  const formik = useFormik({
    initialValues: {
      name: "",
      unit: "",
      description: "",
      limitMax: 0,
      weightKgUnit: 0,
      limitMin: 0,
      volumeM3Unit: 0,

    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      unit: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      limitMin: Yup.number()
        .max(100000, "Minute trop élevé (>100000)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      weightKgUnit: Yup.number()
        .max(100000, "heure trop élevé (>100000)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      volumeM3Unit: Yup.number()
        .max(100000, "Minute trop élevé (>100000)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      limitMax: Yup.number()
        .max(100000, "heure trop élevé (>100000)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      description: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {

      setLoadingCheck(true);

      
      const objectData:materialCreate = {
        name: values.name,
        description: values.description,
        unit: values.unit,
        limitMax: values.limitMax,
        limitMin: values.limitMin,
        weightKgUnit:values.weightKgUnit,
        volumeM3Unit:values.volumeM3Unit
      };


      try{
        postPutDeletRequest("/materials",objectData,null,true,false,()=>{setLoadingCheck(false)},()=>{},myToken);
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


              <div className="form-group">
                <label htmlFor="id" className="label_input">
                  Unité:
                </label>
                <input
                  id="unit"
                  type="text"
                  className="form-control"
                  placeholder="unit professionnel"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                />
                {formik.errors.unit ? <p> {formik.errors.unit} </p> : null}
              </div>


                
            
              <div className="form-group">
                <label htmlFor="id" className="label_input">
                  Limit maximal:
                </label>
                <input
                  id="limitMax"
                  type="text"
                  className="form-control"
                  placeholder="salaire"
                  value={formik.values.limitMax}
                  onChange={formik.handleChange}
                />
                {formik.errors.limitMax ? <p> {formik.errors.limitMax} </p> : null}
              </div> 

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                  Limit minimal:
                </label>
                <input
                  id="limitMin"
                  type="text"
                  className="form-control"
                  placeholder="salaire"
                  value={formik.values.limitMin}
                  onChange={formik.handleChange}
                />
                {formik.errors.limitMin ? <p> {formik.errors.limitMin} </p> : null}
              </div>  
                


              <div className="form-group">
                <label htmlFor="id" className="label_input">
                  Poids par unité (kg):
                </label>
                <input
                  id="weightKgUnit"
                  type="text"
                  className="form-control"
                  placeholder="salaire"
                  value={formik.values.weightKgUnit}
                  onChange={formik.handleChange}
                />
                {formik.errors.weightKgUnit ? <p> {formik.errors.weightKgUnit} </p> : null}
              </div>  
              
              <div className="form-group">
                <label htmlFor="id" className="label_input">
                  Volume par unité (m3):
                </label>
                <input
                  id="volumeM3Unit"
                  type="text"
                  className="form-control"
                  placeholder="salaire"
                  value={formik.values.volumeM3Unit}
                  onChange={formik.handleChange}
                />
                {formik.errors.volumeM3Unit ? <p> {formik.errors.volumeM3Unit} </p> : null}
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

export default FormulaireMaterial;
