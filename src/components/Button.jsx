export const Button = ({text, onClick}) => {
    return(
        <button class="btn btn-primary w-full" onClick={onClick}>{text}</button>
    );
}