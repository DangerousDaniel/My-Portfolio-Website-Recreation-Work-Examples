import './PopUpWindow.css'

const PopUpWindow = (props) => {

    const NoHandler = () => {
        props.onCancel();
    }

    const YesHandler = () => {
        props.onConfirm();
    }

    return (
        <div className="modal">
        <p>Want to delete this Things To Do item?</p>
        <button className="btn" onClick={YesHandler}>Yes</button>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <button className="btn btn--alt" onClick={NoHandler}>No</button>
    </div>  
    );
}

export default PopUpWindow