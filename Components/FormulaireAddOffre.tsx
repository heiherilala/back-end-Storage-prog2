
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { JobOffer } from "../interfaces";
import { postPutDeletRequest } from "../hoooks";
interface props {
  joboffer: JobOffer |undefined;
  id:number | null;
  fermetur:()=>void;
  dataCompose:any[];
  change:any;
  token:string | undefined;
}

const FormulaireAddOffre: React.FC<props> = (props) => {
  const fermerFormulaire=()=>{props.fermetur(); };
  const change = props.change;
  
  const [activ,setActiv] = useState(true)
  const [number,setNumber] = useState(0)
  useEffect (()=>{
      if (number==0) {
          setNumber(number+1);
      }else{
          setActiv(activ==false)
      }
  },[change]);

  const formik = useFormik({
    initialValues: {
      company: (props.joboffer==undefined?"":props.joboffer.company),
      contract: (props.joboffer==undefined?"":""+props.joboffer.contract),
      description: (props.joboffer==undefined?"":""+props.joboffer.description),
      domain: (props.joboffer==undefined?"":"props.joboffer.domain?.name"),
      location: (props.joboffer==undefined?"":""+props.joboffer.location),
      post: (props.joboffer==undefined?"":""+props.joboffer.post),
      profile: (props.joboffer==undefined?"":""+props.joboffer.profile),
      reference: (props.joboffer==undefined?"":""+props.joboffer.reference),
    },
    validationSchema: Yup.object({
      company: Yup.string()
        .max(50, "Caractère inferieur ou egale à 50")
        .required("Requis"),
      contract: Yup.string()
        .max(50, "Caractère inferieur ou egale à 50")
        .required("Requis"),
      description: Yup.string()
        .max(500, "Caractère inferieur ou egale à 500")
        .required("Requis"),
      location: Yup.string()
        .max(50, "Caractère inferieur ou egale à 500")
        .required("Requis"),
      domain: Yup.string()
        .max(50, "Caractère inferieur ou egale à 50")
        .required("Requis"),
      post: Yup.string()
        .max(50, "Caractère inferieur ou egale à 50")
        .required("Requis"),
      profile: Yup.string()
        .max(100, "Caractère inferieur ou egale à 100")
        .required("Requis"),
      reference: Yup.string()
        .max(1000, "trop long"),
    }),
    onSubmit: (values) => {

      const objectData = {
        reference: values.reference,
        post: values.post,
        profile: values.profile,
        location: values.location,
        description: values.description,
        company: values.company,
        contract: values.contract,
        available:true,
        domain: {
          idDomain: props.dataCompose.find(e=>e.name==values.domain)?.idDomain
        }
      };
      if (props.id==null) {
        try{
          postPutDeletRequest("/job-offers",objectData,null,true,false,()=>fermerFormulaire(),()=>fermerFormulaire(),props.token);
        } catch (error){}
      }else{
          postPutDeletRequest("/job-offers/"+props.id,objectData,null,false,true,()=>fermerFormulaire(),()=>fermerFormulaire(),props.token);
      }
      
    },
  });


  if (true) {
    return (
      <>

        <div className="fonds">
        <div className="fonds2" onClick={()=>{props.fermetur()}}></div>
          <div className="form_fondsDrink">
            <button className="btn_cancel" onClick={()=>{props.fermetur()}}>
              X
            </button>
            <div className="titels">
              {'      '}<h2>FORMULAIRE DES OFFRES</h2>
            </div>
            <form
              action=""
              className="form_class"
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Companie
                </label>
                <input
                  id="company"
                  type="text"
                  className="input_formulaire"
                  placeholder="Votre company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                />
                {formik.errors.company ? (
                  <p> {formik.errors.company} </p>
                ) : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                Contrat
                </label>

                <select
                  id="contract"
                  className="input_formulaire"
                  placeholder="contract"
                  value={formik.values.contract}
                  onChange={formik.handleChange}
                >
                    <option value={"CDI"} label={"CDI"}>
                      {"CDI"}
                    </option>
                    <option value={"CDD"} label={"CDD"}>
                      {"CDD"}
                    </option>
                </select>

                {formik.errors.contract ? <p> {formik.errors.contract} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  className="input_formulaire"
                  placeholder="Une description?"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.description ? <p> {formik.errors.description} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                Lieu
                </label>
                <input
                  id="location"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.location ? <p> {formik.errors.location} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                Poste
                </label>
                <input
                  id="post"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="quelle post?"
                  value={formik.values.post}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.post ? <p> {formik.errors.post} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                Profil
                </label>
                <input
                  id="profile"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="profile rechercher"
                  value={formik.values.profile}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.profile ? <p> {formik.errors.profile} </p> : null}
              </div>

              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                Domaine
                </label>
                <select
                  id="domain"
                  className="input_formulaire"
                  placeholder="domain"
                  value={formik.values.domain}
                  onChange={formik.handleChange}
                >
                  {props.dataCompose.map((donne)=>{return(
                    <option value={donne.name} label={donne.name}>
                      {donne.name}
                    </option>
                  )})}
                </select>
                
                {formik.errors.domain ? <p> {formik.errors.domain} </p> : null}
              </div>


              <div className="form_contenu">
                <label htmlFor="id" className="label_input">
                Référence
                </label>
                <input
                  id="reference"
                  type="textarea"
                  className="input_formulaire bigText"
                  placeholder="reference"
                  value={formik.values.reference}
                  onChange={formik.handleChange}
                />
                
                {formik.errors.reference ? <p> {formik.errors.reference} </p> : null}
              </div>

              <button type="submit" className={"btn_envoie btn_type "}>
                {props.id==null?"Ajouter":"Modifier"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }else{
    return(<></>)
  }

};

export default FormulaireAddOffre;
