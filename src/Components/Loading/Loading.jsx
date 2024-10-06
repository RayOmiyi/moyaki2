import loadings from '../../assets/loading.gif';
import './Loading.css'
const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadings} alt="Loading..." />
    </div>
  );
};

export default Loading;
