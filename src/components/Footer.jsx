import mamcetLogo from "../assets/images/mamcet-logo.png";
import masterLogo from "../assets/images/master-logo.jpg";

export const LoginFooter = () => {
  return (
    <footer className="absolute bottom-0 p-10 text-neutral-content">
      <aside>
        <div className="flex">
          <img
            src={masterLogo}
            alt="master group of institution logo"
            className="w-14"
          />
          <img src={mamcetLogo} alt="mamcet logo" className="w-16" />
        </div>
        <p className="text-gray-600 pt-2">
          Developed @ Selvamm Arts and Science College, Trichy.
        </p>
        <p className="text-gray-400 leading-6 pt-2">
          An AI experimental enterprise resource software developed under the
          guidence of Dr.K.Geetha (HoD), Department of Information Technology
        </p>
      </aside>
    </footer>
  );
};
