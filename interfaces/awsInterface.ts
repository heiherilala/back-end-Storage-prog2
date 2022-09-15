export interface AgeRange {
    High:number;
    Low:number;
};

export interface Beard {
    Confidence:number;
    Value:boolean;
};

export interface BoundingBox {
    Height:number;
    Left:number;
    Top:number;
    Width:number;
};

export interface Emotion {
    Confidence:number;
    Type:string;
};

export interface Eyeglasses {
    Confidence:number;
    Value:boolean;
};

export interface EyesOpen {
    Confidence:number;
    Value:boolean;
};

export interface Gender {
    Confidence:number;
    Value:string;
};

export interface Landmark {
    Type:string;
    X:number;
    Y:number;
};

export interface MouthOpen {
    Confidence:number;
    Value:boolean;
};

export interface Mustache {
    Confidence:number;
    Value:boolean;
};

export interface Pose {
    Pitch:number;
    Roll:number;
    Yaw:number;
};

export interface Quality{
    Brightness:number;
    Sharpness:number;
};

export interface Smile {
    Confidence:number;
    Value:boolean;
};

export interface Sunglasses {
    Confidence:number;
    Value:boolean;
};

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
};


export interface img {
    fileName: string, 
    base64String: string
}