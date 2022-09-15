
import { Field, FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { APIUrl, backgroundColor } from "../constants";
import { Application, JobOffer } from "../interfaces";
import { getCurrentUser, postPutDeletRequest } from "../hoooks";
import { useEffect, useState } from "react";
import Loading from "./Loading";
interface props {
  idJobOffer:number;
}

const FormulaireAplication: React.FC<props> = (props) => {

  const newDate = new Date;
  const h = newDate.getHours();
  const mn = newDate.getMinutes();
  const y = newDate.getFullYear();
  const d = newDate.getMonth();
  const m = newDate.getDay();
  const dat = "" + y +"-0"+ m +"-0" + d


  const formik = useFormik({
    initialValues: {
      nameEvent: "",
      dateDebut: ""+dat,
      dateFin: ""+dat,
      type: "",
      group: "",
      responsable: "",
      place: "",
      startingHour: h,
      endingHour: ((h+2)%24),
      startingMin: mn,
      endingMin: mn,

    },
    validationSchema: Yup.object({
      nameEvent: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      dateDebut: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      dateFin: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),

      startingMin: Yup.number()
        .max(59, "Minute trop élevé (>59)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      endingHour: Yup.number()
        .max(24, "heure trop élevé (>24)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      endingMin: Yup.number()
        .max(59, "Minute trop élevé (>59)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      startingHour: Yup.number()
        .max(24, "heure trop élevé (>24)")
        .required("Requis")
        .typeError('Saisissez des chiffres'),
      place: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      type: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      group: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      responsable: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
    }),
    onSubmit: (values) => {

      setLoadingCheck(true);

      
      const objectData = {
        candidateDebutName: values.nameEvent,
        dateDebut: values.dateDebut,
        startingHour: values.startingHour,
        responsable: values.responsable,
        dateDebutApplication: dat,
        jobOffer:{idJobOffer:props.idJobOffer},
      };


      try{
        postPutDeletRequest("/applications",objectData,null,true,false,()=>{setLoadingCheck(false)},()=>{},myToken);
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
                    id="nameEvent"
                    type="text"
                    className="form-control"
                    placeholder="Nom complet"
                    value={formik.values.nameEvent}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.nameEvent ? (
                    <p> {formik.errors.nameEvent} </p>
                  ) : null}
                </div>                         

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                Type de l'evenment:
                </label>
                <input
                  
                  id="type"
                  type="textarea"
                  className="form-control"
                  placeholder="Type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                />
                {formik.errors.type ? <p> {formik.errors.type} </p> : null}
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
                Responsable:
                </label>
                <input
                  
                  id="responsable"
                  type="textarea"
                  className="form-control"
                  placeholder="Responsable"
                  value={formik.values.responsable}
                  onChange={formik.handleChange}
                />
                {formik.errors.responsable ? <p> {formik.errors.responsable} </p> : null}
              </div> 

              <div className="form-group">
                <label htmlFor="id" className="label_input">
                Groupe:
                </label>
                <input
                  id="group"
                  type="textarea"
                  className="form-control"
                  placeholder="Group"
                  value={formik.values.group}
                  onChange={formik.handleChange}
                />
                {formik.errors.group ? <p> {formik.errors.group} </p> : null}
              </div> 

              <div className="form-row transparant">

                <div className="form-group col-md-6">
                  <label htmlFor="id" className="label_input">
                    Date début:
                  </label>
                  <input
                    id="dateDebut"
                    type="date"
                    className="form-control"
                    placeholder="dateDebut professionnel"
                    value={formik.values.dateDebut}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.dateDebut ? <p> {formik.errors.dateDebut} </p> : null}
                </div>


                <div className="row row-cols-2 bigWith">
                  <div className="form-group col transparant">
                    <label htmlFor="id" className="label_input">
                      heur:
                    </label>
                    <input
                      id="startingHour"
                      type="text"
                      className="form-control"
                      placeholder="salaire"
                      value={formik.values.startingHour}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.startingHour ? <p> {formik.errors.startingHour} </p> : null}
                  </div>  
                  <div className="form-group col transparant">
                    <label htmlFor="id" className="label_input">
                      Minut:
                    </label>
                    <input
                      id="startingMin"
                      type="text"
                      className="form-control"
                      placeholder="salaire"
                      value={formik.values.startingMin}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.startingMin ? <p> {formik.errors.startingMin} </p> : null}
                  </div>  
                </div>

              </div>

              <div className="form-row">

                <div className="form-group col-md-6">
                  <label htmlFor="id" className="label_input">
                    Date de fin:
                  </label>
                  <input
                    id="dateFin"
                    type="date"
                    className="form-control"
                    placeholder="dateFin professionnel"
                    value={formik.values.dateFin}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.dateFin ? <p> {formik.errors.dateFin} </p> : null}
                </div>
                <div className="row row-cols-2 bigWith">
                  <div className="form-group col transparant">
                    <label htmlFor="id" className="label_input">
                      heur:
                    </label>
                    <input
                      id="endingHour"
                      type="text"
                      className="form-control"
                      placeholder="salaire"
                      value={formik.values.endingHour}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.endingHour ? <p> {formik.errors.endingHour} </p> : null}
                  </div>  
                  <div className="form-group col transparant">
                    <label htmlFor="id" className="label_input">
                      Minut:
                    </label>
                    <input
                      id="endingMin"
                      type="text"
                      className="form-control"
                      placeholder="salaire"
                      value={formik.values.endingMin}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.endingMin ? <p> {formik.errors.endingMin} </p> : null}
                  </div>  
                </div>


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

export default FormulaireAplication;
