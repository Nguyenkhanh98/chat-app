import Input from "../common/Input";

function OnBoardingComponent({
  about,
  setName,
  setAbout,
  onBoardUser,
  name,
}: any) {
  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <image
          src="/whatsapp.gif"
          alt="whatsapp-gif"
          height={300}
          width={300}
        />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <div></div>
      <h2 className="text-2xl ">Create your profile</h2>
      <div className="flex gap-6 mt-6 ">
        <div className="flex flex-col items-center justify-between mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="flex items-center justify-center">
            <button
              className="bg-search-input-container-background p-5 rounded-lg"
              onClick={onBoardUser}
            >
              Create Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnBoardingComponent;
