export const Button = ({text, onClick}) => {
    return(
        <button className="btn btn-primary w-full" onClick={onClick}>{text}</button>
    );
}