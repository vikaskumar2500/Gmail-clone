import "./EmailType.css";
import { Group, InboxOutlined, LocalOffer } from "@mui/icons-material";

const EmailType = () => {
  return (
    <div className="dashbord-type">
      <div className="primary active-type" >
        <InboxOutlined />
        <span>Primary</span>
      </div>

      <div className="promotions">
        <LocalOffer />
        <span>Promotions</span>
      </div>

      <div className="socials">
        <Group />
        <span>Socials</span>
      </div>
    </div>
  );
};

export default EmailType;
