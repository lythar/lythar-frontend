interface PageHeaderProps {
  title?: string;
  children: React.ReactNode;
}

const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <>
      {title ? (
        <header className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-white">{title}</h1>
          {children}
        </header>
      ) : null}
    </>
  );
};

interface PageLineSeperator {}

const PageLineSeperator = ({}: PageLineSeperator) => {
  return (
    <div className="w-[calc(100%-0.5rem)] h-[4px] my-2 rounded-xl bg-input" />
  );
};

export { PageHeader, PageLineSeperator };
