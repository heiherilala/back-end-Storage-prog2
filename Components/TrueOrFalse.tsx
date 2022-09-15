import React from 'react';

interface data {
    Confidence:number;
    Value:boolean;
}

const TrueOrFalse = (data:data, name:string) => {
    return (
        <div>
                    {
                        data.Value?
                        <span  className="personalBadge badge badge-success" style={{margin:"5px",}}>{""+name+": "+ data.Value + " at " + Math.round(data.Confidence*100)/100+"%" }</span>
                        :
                        <span  className="personalBadge badge badge-secondary" style={{margin:"5px",}}>{""+name+": "+ data.Value + " at " + Math.round(data.Confidence*100)/100+"%" }</span>
                    }
        </div>
    );
};

export default TrueOrFalse;