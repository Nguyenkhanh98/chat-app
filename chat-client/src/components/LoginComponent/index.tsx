import { FcGoogle } from "react-icons/fc";

function LoginComponent({ login }: any) {
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <img src="/whatsapp.gif" alt="whatsapp-gif" height={300} width={300} />
        <span className="text-7xl">WhatsApp</span>
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={login}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login With Google</span>
      </button>
    </div>
  );
}

export default LoginComponent;
