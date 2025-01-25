import SmartPhoneHeader from "./smartPhoneHeader";
import PCHeader from "./pcHeader";

const Header = () => {
  return (
    <>
      {/* PC用ヘッダー */}
      <div className="hidden md:block">
        <PCHeader />
      </div>

      {/* スマートフォン用ヘッダー */}
      <div className="block md:hidden">
        <SmartPhoneHeader />
      </div>
    </>
  );
};

export default Header;
