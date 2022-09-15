import React from 'react';
import { importedObject } from '../interfaces';
import TrueOrFalse from './TrueOrFalse';

/*
export interface importedObject {
    AgeRange:AgeRange;
    Beard:Beard;
    BoundingBox:BoundingBox;
    Confidence:number;
    Emotions:Emotion[];
    Eyeglasses:Eyeglasses;
    EyesOpen:EyesOpen;
    Gender:Gender;
    Landmarks:Landmark[];
    MouthOpen:MouthOpen;
    Mustache:Mustache;
    Pose:Pose;
    Quality:Quality;
    Smile:Smile;
    Sunglasses:Sunglasses;
}
*/


const DataFace = (data:importedObject) => {
    return (
        <>
            <h2>
            Result:
            </h2>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">AgeRange</label>
                    <input type="text" className="form-control" id="inputEmail4" value={
                        "between "+ data.AgeRange.Low + " and "+ data.AgeRange.High + " years old"
                    }/>
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Gender</label>
                    <input type="text" className="form-control" id="inputPassword4" value={
                        "" + data.Gender.Value + " at " + Math.round(data.Gender.Confidence) + "%"
                    }/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Face details:</label>
                    <div className="form-row">
                        {TrueOrFalse(data.Beard,"Beard")}
                        {TrueOrFalse(data.Eyeglasses,"Eyeglasses")}
                        {TrueOrFalse(data.EyesOpen,"EyesOpen")}
                        {TrueOrFalse(data.MouthOpen,"MouthOpen")}
                        {TrueOrFalse(data.Mustache,"Mustache")}
                        {TrueOrFalse(data.Smile,"Smile")}
                        {TrueOrFalse(data.Sunglasses,"Sunglasses")}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Emotions:</label>
                    <div className="form-row">
                        {data.Emotions.map((donne, key)=>{return(
                            <div>
                                {
                                    donne.Confidence>20?
                                    <span  className="personalBadge badge badge-success" style={{margin:"5px",}}>{""+ donne.Type + " at " + Math.round(donne.Confidence*100)/100+"%" }</span>
                                    :
                                    <span  className="personalBadge badge badge-secondary" style={{margin:"5px",}}>{""+ donne.Type + " at " + Math.round(donne.Confidence*100)/100+"%" }</span>
                                }
                            </div>
                        )})}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Position and size of face:</label>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Height: " + data.BoundingBox.Height}</li>
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Width: " + data.BoundingBox.Width}</li>
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Left: " + data.BoundingBox.Left}</li>
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Top: " + data.BoundingBox.Top}</li>
                    </ul>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Quality:</label>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Brightness: " + data.Quality.Brightness}</li>
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Sharpness: " + data.Quality.Sharpness}</li>
                    </ul>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Pose:</label>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Pitch: " + data.Pose.Pitch}</li>
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Roll: " + data.Pose.Roll}</li>
                        <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>{"  # Yaw: " + data.Pose.Yaw}</li>
                    </ul>
                </div>



                <div className="form-group">
                    <label htmlFor="inputAddress">Coordinate face part:</label>
                    <ul className="list-group list-group-flush">
                        {data.Landmarks.map((donne, key)=>{return(
                            <>
                                {
                                    <li className="list-group-item" style={{fontSize:"small",padding:"2px"}}>
                                        {"# "+ donne.Type + " position at: x = " + donne.X +" and y = " + donne.Y  };
                                    </li>
                                }
                            </>
                        )})}
                    </ul>
                </div>
            </form>
        </>
    );
};

export default DataFace;