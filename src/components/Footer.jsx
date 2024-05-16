import mamcetLogo from "../assets/images/mamcet-logo.jpg";
import masterLogo from "../assets/images/master-logo.jpg";

export const LoginFooter = () => {
  return (
    <footer class="absolute bottom-0 p-10 text-neutral-content">
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
          Developed @ M.A.M. College of Engineering & Technology, Trichy.
        </p>
        <p className="text-gray-400 leading-6 pt-2">
          An AI experimental enterprise resource software developed under the
          guidence of Dr.K.Geetha (HoD), Department of Information Technology
        </p>
      </aside>
    </footer>
  );
};
