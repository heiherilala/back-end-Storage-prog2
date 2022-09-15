import React from 'react';
import { activeBack } from '../constants';
import { importedObject } from '../interfaces';

const MarqFace = (
    data:importedObject[],
    faceActive:number | null,
    setFaceActive:React.Dispatch<React.SetStateAction<(number | null)[]>>,
    keyId:number,
    actualisation:()=>void
    ) => {
    if (faceActive==null) {
        return (
            <>
                {data.map((donne, key)=>{
                    return(
                        <div className="oneFace" style={
                            {
                                height: "calc("+donne.BoundingBox.Height+"% * 100)",
                                width: "calc("+donne.BoundingBox.Width+"% * 100)",
                                top: "calc("+donne.BoundingBox.Top+"% * 100)" ,
                                left: "calc("+donne.BoundingBox.Left+"% * 100)" ,
                            }
                        } onClick={
                            ()=>{
                                const newValue = activeBack;
                                newValue[keyId]=key;
                                setFaceActive(newValue)
                                actualisation()
                            }
                        }>
                            {key}
                        </div>
                    )
                })}
            </>

        );
    }else{
        return (
            <>
                {data.map((donne, key)=>{
                    if (faceActive==key) {
                        return(
                            <div className="oneFaceActive" style={
                                {
                                    height: "calc("+donne.BoundingBox.Height+"% * 100)",
                                    width: "calc("+donne.BoundingBox.Width+"% * 100)",
                                    top: "calc("+donne.BoundingBox.Top+"% * 100)" ,
                                    left: "calc("+donne.BoundingBox.Left+"% * 100)" ,
                                }
                            } onClick={
                                ()=>{
                                    const newValue = activeBack;
                                    newValue[keyId]=key;
                                    setFaceActive(newValue);
                                    actualisation();
                                }
                            }>
                                {key}
                            </div>
                        )
                    } else {
                        return(
                            <div className="oneFaceNotActive" style={
                                {
                                    height: "calc("+donne.BoundingBox.Height+"% * 100)",
                                    width: "calc("+donne.BoundingBox.Width+"% * 100)",
                                    top: "calc("+donne.BoundingBox.Top+"% * 100)" ,
                                    left: "calc("+donne.BoundingBox.Left+"% * 100)" ,
                                }
                            } onClick={
                                ()=>{
                                    const newValue = activeBack;
                                    newValue[keyId]=key;
                                    setFaceActive(newValue);
                                    actualisation();
                                }
                            }>
                                {key}
                            </div>
                        )
                    }
                })}
            </>
    
        );
    }

};

export default MarqFace;