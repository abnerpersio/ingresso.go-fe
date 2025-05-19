type Props = {
  message: string;
};

export function PageError(props: Props) {
  return (
    <div className="w-full h-min-screen flex flex-col justify-center items-center gap-4 text-center p-3">
      <h3>{props.message}</h3>
    </div>
  );
}
