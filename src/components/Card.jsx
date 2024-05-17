export const Card = ({title, description, btnText, onClick}) => {
  return (
    <div class="card w-96 rounded-sm bg-base-100 border border-base-300 shadow-sm">
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>{description}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-goat" onClick={onClick}>{btnText}</button>
        </div>
      </div>
    </div>
  );
};
