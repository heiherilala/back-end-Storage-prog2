
import Modal from 'react-bootstrap/Modal';


interface props {
  finish: ()=>void;
}

const Loading: React.FC<props> = (props) => {

  return (
    <>
      <Modal className='transparant d-flex align-items-center justify-content-center' show={true} onHide={props.finish}>
            <button className={"custom_color_3"}  onClick={()=>{props.finish()}}>
              <span className="spinner-border spinner-border-sm marge"></span>
              {"  "}Chargement en cours
            </button>
      </Modal>
    </>
  );
}

export default Loading;