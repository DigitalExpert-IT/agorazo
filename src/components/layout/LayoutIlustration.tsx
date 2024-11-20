import Image from "next/image";

type Props = {
    illustrationUri: string;
    title: string;
    description: string;
    children?: JSX.Element | null;
  };
  
  export const LayoutIllustration = (props: Props) => {
    const { illustrationUri, title, description, children } = props;
  
    return (
      <div className="relative flex items-center justify-center bg-gradient-to-b from-[#0B1A29] min-h-screen">
        <div className="z-10 flex flex-col items-center justify-center max-w-3xl w-full mx-auto h-full">
          <Image className="mb-6 w-64" src={illustrationUri} alt={title} />
          <div className="text-center space-y-4">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-xl">{description}</p>
            {children}
          </div>
        </div>
      </div>
    );
  };
  