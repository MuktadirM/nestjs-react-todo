import logo from '../logo.svg';

const Loading = ({message}) => {
    return (<div className="vh-100"> <div className="container py-5 h-100"> 
    <div className="container row d-flex justify-content-center align-items-center h-100"> 
        <div className="col text-center">
            <img src={logo} className="App-logo" alt="logo" /> 
            <h1> {message} </h1> 
        </div>
    </div>
</div>
</div>);
}

export default Loading;