import axios from "axios";
import { url } from "inspector";
import { APIUrl } from "../constants";



const instance = axios.create({
  baseURL: APIUrl,
  timeout: 1000,
});


export const postPutDeletRequest = (
  endPoint:string,
  body:any,
  id:number|null,
  post:boolean,
  put:boolean,
  functionIfTrue:(()=>void)|null, 
  functionIfFalse:(()=>void)|null,
  token:string|undefined,
  )=>{
    if (token==undefined) {
      axios[post?"post":put?"put":"delete"](APIUrl+endPoint+(id==null?"":"/"+id), body)
      .then(
        ()=>{
          if (functionIfTrue!=null) {
            functionIfTrue()
          }
          ;}
      )
      .catch(
        (e)=>{
          if (functionIfFalse!=null) {
            functionIfFalse()
          }
        }
      )
    }else {
      axios[post?"post":put?"put":"delete"](APIUrl+endPoint+(id==null?"":"/"+id), body, {headers: {'Authorization': 'Bearer ' + token}})
      .then(
        ()=>{
          if (functionIfTrue!=null) {
            functionIfTrue()
          }
          ;}
      )
      .catch(
        (e)=>{
          if (functionIfFalse!=null) {
            functionIfFalse()
          }
        }
      )
    }

};


  export const axiosGget = (
    endPoint:string, 
    token:string|undefined,
    takingData:React.Dispatch<React.SetStateAction<any>>, 
    functionIfTrue:(()=>void)|null, 
    functionIfFalse:(()=>void)|null
  )=>{
  
    if (token==undefined) {
      axios(APIUrl+endPoint)
      .then((response) => {
        takingData(response.data);
        if (functionIfTrue!=null) {
          functionIfTrue()
        }
      })
      .catch((error) => {
        if (functionIfFalse!=null) {
          functionIfFalse()
        }
      });
    }else{
      axios(
        APIUrl+endPoint,
        {headers: {'Authorization': 'Bearer ' + token}}
      )
      .then((response) => {
        takingData(response.data);
        if (functionIfTrue!=null) {
          functionIfTrue()
        }
      })
      .catch((error) => {
        if (functionIfFalse!=null) {
          functionIfFalse()
        }
      });
    }
  }










export const axiosGetWithPage = (
  endPoint:string, 
  page:number, 
  page_sise:number,
  token:string|undefined,
  takingData:React.Dispatch<React.SetStateAction<any[]>>, 
  functionIfTrue:(()=>void)|null, 
  functionIfFalse:(()=>void)|null
)=>{

  if (token==undefined) {
    axios(APIUrl+endPoint+"?"+"page="+page+"&page_size="+page_sise)
    .then((response) => {
      takingData(response.data);

      if (functionIfTrue!=null) {
        functionIfTrue()
      }
    })
    .catch((error) => {
      if (functionIfFalse!=null) {
        functionIfFalse()
      }
    });
  }else{
    axios(
      APIUrl+endPoint+"?"+"page="+page+"&page_size="+page_sise,
      {headers: {'Authorization': 'Bearer ' + token}}
    )
    .then((response) => {
      takingData(response.data);

      if (functionIfTrue!=null) {
        functionIfTrue()
      }
    })
    .catch((error) => {
      if (functionIfFalse!=null) {
        functionIfFalse()
      }
    });
  }
}