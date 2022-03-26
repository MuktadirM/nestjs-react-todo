import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Error() {
    const navigate = useNavigate();
    const { id } = useParams();

    return (<div className="vh-100">
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
            <div className="card" id="list1" style={{borderRadius: ".75rem", backgroundColor: "#eff1f2"}}>
            <div className="card-body py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <span>My Todos</span>
                </p>
            </div>
            <div className="card-body py-4 px-4 px-md-5">
                   <h1>We are Sorry</h1>
                   <p>The page you are looking for does not exist.</p>
                   <p>Please go back to the home page.</p>
                   <button className="btn btn-primary" onClick={() => navigate('/')}> Back To Home </button>
            </div>
        </div>
        </div>
    </div>
</div>
</div>
);
}

