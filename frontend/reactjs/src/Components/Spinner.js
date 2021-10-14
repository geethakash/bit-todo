
import spinnerImg from '../assets/img/Loading.png';

function Spinner() {
  return ( 
    <div className="flex w-full h-full items-center justify-center z-10">
  <img className="loader" src={spinnerImg} alt="Loading..." />
</div>
   );
}

export default Spinner;
