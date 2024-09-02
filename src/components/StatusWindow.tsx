import IconError from "./../assets/icon-error.png";
import IconSuccess from "./../assets/icon-success.png";

type Props = {
  text: string;
  error?: boolean;
};
const StatusWindow = ({ text, error }: Props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
        className="z-[99999] top-0 right-0 fixed bg-black/50"
      >
        {error ? (
          <div className="WindowError text-center">
            <img width={75} src={IconError} alt="Ícone de erro"></img>
            {text}
          </div>
        ) : (
          <div className="WindowSuccess text-center">
            <img width={65} src={IconSuccess} alt="Ícone de sucesso"></img>
            {text}
          </div>
        )}
      </div>
    </>
  );
};

export default StatusWindow;
