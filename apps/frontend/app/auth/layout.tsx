type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-background rounded-2xl border shadow-sm p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;