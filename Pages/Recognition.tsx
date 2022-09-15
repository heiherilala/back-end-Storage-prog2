import { Discovery, ImportExport, Kafka } from 'aws-sdk';
import React, { useEffect, useRef, useState } from 'react';
import AwsGet from '../ancien/AwsGet';
import ChooseFace from '../Components/ChooseFace';
import DataFace from '../Components/DataFace';
import { activeBack, baba, ProjectUrl } from '../constants';
import { img, importedObject } from '../interfaces';
import Loading from '../Components/Loading';
import MarqFace from '../Components/MarqFace';
import './index.css';
import NavbarHeader from '../Components/NavbarHeader';
import { Carousel } from 'react-bootstrap';
import addImage from '../assets/images/addImag2.png';
import Footer from '../Components/Footer';



  
  

const Recognition = () => {

    const [image, setImage] = useState<string>("");
    const [preview, setPreview] = useState<img[]>([]);
    const [count, setCount] = useState<number>(0);
    const [awsResponsee, setAwsResponsee] = useState<importedObject[]>([baba]);
    const [awsResponseeList, setAwsResponseeList] = useState<importedObject[][]>([]);
    const fielInputRef = useRef<HTMLInputElement|null>(null);
    const [oneString, setOneString] = useState<string>("not modified");
    const [faceActive, setFaceActive] = useState<(number|null)[]>(activeBack);
    const [loadingCheck, setLoadingCheck] = useState<boolean>(false);
    const [smallLoad,setSmallLoad] = useState<boolean>(true);
    
    useEffect(()=>{
        setOneString(awsResponsee!=undefined?awsResponsee[0].Gender.Value:"c'est undifaid");
    },[count])

    
    const imageTo64 = (file: File | Blob): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
            resolve(reader.result as string);
            };

            reader.readAsDataURL(file);
            reader.onerror = reject;
            console.log(reader.result);
            
        });

    useEffect(()=>{
        console.log(awsResponsee);
        console.log(image);
    },[count]);


    const analyze = (key:number) => {
        setAwsResponsee([baba]);
        setLoadingCheck(true);
        if (preview[key]?.base64String.includes("data:image/jpeg;base64,")) {
          setImage(preview[key]?.base64String.split("data:image/jpeg;base64,")[1]);
        } else if (preview[key]?.base64String.includes("data:image/png;base64,")) {
          setImage(preview[key]?.base64String.split("data:image/png;base64,")[1]);
        } else {
          console.log("fichier n'est ni jpeg ni png");
        }
        setCount(current => current + 1);
        console.log("analyze rune");
      };

    const takingImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const file = e.target.files[0];
        const tempFileList: img = {
          fileName: file.name,
          base64String: file.type.indexOf('image') > -1 ? await imageTo64(file) : '',      
        };
        console.log(preview);
        const newValue:img[]=preview;

        if (preview.length==0) {
            newValue.push(tempFileList);  
            newValue.push(tempFileList);
            setPreview(newValue);  
        }else{
            newValue.push(tempFileList);
            setPreview(newValue);  
        }
        console.log(preview);
        actualisData();
        analyze(preview.length-1);
        }
      };


      useEffect(()=>{
        console.log(awsResponsee);
        
        if ((awsResponsee[0]==baba)) {
            setLoadingCheck(true)
        }else{
            const newAwsAdd:importedObject[][] = awsResponseeList;
            newAwsAdd.push(awsResponsee);
            setAwsResponseeList(newAwsAdd);
            actualisData();
        }
      },[awsResponsee]);


      const [index, setIndex] = useState(0);

      const handleSelect = (selectedIndex:any, e:any) => {
        setIndex(selectedIndex);
      };

        const actualisData:()=>void=()=>{
            setSmallLoad(false);
            console.log("ffffffffffffffffffffffffffffffffffffffffffff");
            console.log(faceActive);
            
            const timer = setInterval(()=>{setSmallLoad(true);clearInterval(timer)},50)
        }

    useEffect(
        ()=>{
            actualisData();
        },[awsResponseeList,faceActive]
    )








    return (
        <>
            {NavbarHeader(
                [
                    {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                    {name:"Listes des candicatures",href: (ProjectUrl + "/application")}
                ],
                {name:"Offre d’emploi",href: (ProjectUrl + "/")}
            )}


            <h1 className="headerPage text-success">
                Facial recognition with AWS
            </h1>

            {!smallLoad?<></>:<>

                <div className="d-flex flex-column justify-content-center align-items-center contenerRecognition">
                    <div className="image-contener d-flex flex-column justify-content-center align-items-center">
                        {preview.length==0?
                            <button className='btn btn-outline-secondary activBouton ' onClick={
                                (e)=>{
                                    e.preventDefault();
                                    fielInputRef.current?.click()
                                }
                            }>Add image</button>
                        :
                            <button className='btn btn-outline-secondary nonActivBouton' onClick={
                                (e)=>{
                                    e.preventDefault();
                                    fielInputRef.current?.click()
                                }
                            }>Another image</button>
                        }


                        <input 
                        style={{display:"none"}}
                        type="file" 
                        accept='image/*'
                        ref={fielInputRef}
                        onChange={takingImage}/>
                        {preview.length<2?<></>:
                            <Carousel activeIndex={index} onSelect={handleSelect} slide={false} wrap={false} interval={null}>
                                <Carousel.Item key={""+0}>
                                    <img className='d-block w-100 imageSize' src={preview[0]?.base64String} alt={preview[0]?.fileName} onClick={
                                        (e)=>{
                                            //e.preventDefault();
                                            //fielInputRef.current?.click();
                                        }
                                    }></img>
                                        {(awsResponseeList[0]==null)||(awsResponseeList[0]==undefined)?MarqFace(awsResponsee,faceActive[0],setFaceActive,0,actualisData): MarqFace(awsResponseeList[0],faceActive[0],setFaceActive,0,actualisData)}
                                        <Carousel.Caption>
                                            <h3>First slide label</h3>
                                        </Carousel.Caption>
                                </Carousel.Item>
                                    {(preview.slice(2)).map((donne,keyId)=>(
                                        <Carousel.Item key={""+donne.base64String}>
                                            <img className='d-block w-100 imageSize' src={preview[keyId+2]?.base64String} alt={preview[keyId+2]?.fileName} onClick={
                                                (e)=>{
                                                    //e.preventDefault();
                                                    //fielInputRef.current?.click();
                                                }
                                            }></img>
                                                {(awsResponseeList[keyId+1]==null)||(awsResponseeList[keyId+1]==undefined)?MarqFace(awsResponsee,faceActive[keyId+1],setFaceActive,(keyId+1),actualisData): MarqFace(awsResponseeList[keyId+1],faceActive[keyId+1],setFaceActive,(keyId+1),actualisData)}
                                                <Carousel.Caption>
                                                    <h3>{"N°"+keyId}</h3>
                                                </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}

                                <Carousel.Item key={""+0}>
                                    <img className='d-block w-100 imageSize' src={addImage} alt={preview[0]?.fileName} onClick={
                                        (e)=>{
                                            e.preventDefault();
                                            fielInputRef.current?.click();
                                        }
                                    }></img>
                                        <Carousel.Caption>
                                            <></>
                                        </Carousel.Caption>
                                </Carousel.Item>

                            </Carousel>}
                    </div>






                    <div className="donnePage">
                    
                        {
                            preview.length==0?<></>:(loadingCheck?Loading(()=>{setLoadingCheck(false)}):(
                                    awsResponseeList.map(
                                        (data,key)=>
                                        (
                                            <>
                                                {ChooseFace(data,faceActive[key],setFaceActive,key,actualisData)}
                                            </>
                                        )
                                    )
                                ))
                        }
                        {
                            preview.length==0?<></>:(loadingCheck?<></>:(
                                awsResponseeList.map((data,key)=>{
                                    const number:number|null = faceActive[key];
                                    return(
                                        <>
                                            {number==null?<div></div>:DataFace(awsResponseeList[key][number])}
                                        </>
                                    )
                                })
                            ))
                        }
                    </div>
                </div>
            </>}
            <AwsGet imageData={image} resultat={setAwsResponsee} count={count} setLoadingCheck={setLoadingCheck} />
            <Footer/>
        </>
    );
};

export default Recognition;