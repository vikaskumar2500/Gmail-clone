import "./Dashbord.css";
import DashbordHeader from "./DashbordHeader";
import EmailList from "./EmailList";
import EmailType from "./EmailType";

const Dashbord = ({ show }) => {
  return (
    <div className="dashbord">
      <DashbordHeader />
      <div className="dashbord-body">
        <EmailType />
        <EmailList />
      </div>
    </div>
  );
};

export default Dashbord;
