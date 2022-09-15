import React from 'react';
import Footer from '../Components/Footer';
import FormulaireActivity from '../Components/FormulaireActivity';
import FormulaireAplication from '../Components/FormulaireAplication';
import FormulaireMaterial from '../Components/FormulaireMaterial';
import FormulaireMove from '../Components/FormulaireMove';
import FormulaireShop from '../Components/FormulaireShop';
import FormulaireStore from '../Components/FormulaireStore';
import NavbarHeader from '../Components/NavbarHeader';
import { ProjectUrl } from '../constants';

const NewEvent = () => {
    return (
        <>

            {NavbarHeader(
                [
                    {name:"Listes des offres d’emplois",href: (ProjectUrl + "/list-job")},
                    {name:"Listes des candicatures",href: (ProjectUrl + "/application")}
                ],
                {name:"Offre d’emploi2",href: (ProjectUrl + "/")}
            )}


            <FormulaireMove  idJobOffer={1}/>

            <Footer/>
        </>
    );
};

export default NewEvent;