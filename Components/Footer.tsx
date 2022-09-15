import React from 'react';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="container transparant">
                <div className="row transparant">
                        <div className="col transparant">
                            <div className="footer-info transparant">
                                <div className="footer-content"><p> Entreprise de recrutement</p></div>
                                <div className="copyright-text"> 
                                    <p > &copy; HEI - SARLU</p>                                
                                </div>        
                                                                
                                <p >Email: <a href="mailto:contact@hei.school">contact@hei.school</a> • Tel: +261 34 94 041 16 • <a href="https://www.google.com/maps/place/Haute+School+It+%5BHei%5D/@-18.8707638,47.5347298,15z/data=!4m5!3m4!1s0x0:0x73f917bb47615aa0!8m2!3d-18.8707923!4d47.5347803" target="_blank">2J 161R Ivandry, Antananarivo</a></p>
                            </div>
                        </div>                                      
                        
                </div>
            </div>
        </footer>
    );
};

export default Footer;