import React from 'react';
import Modal from 'react-bootstrap/Modal';
const Loading = (FinishLoading:()=>void) => {
      return (
        <>
          <Modal className='transparant d-flex align-items-center justify-content-center' show={true} onHide={FinishLoading}>
                <button className={"custom_color_3"}  onClick={FinishLoading}>
                  <span className="spinner-border spinner-border-sm marge"></span>
                  {"  "}Chargement en cours
                </button>
          </Modal>
        </>
      );
    }

export default Loading;