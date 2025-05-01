import { Alert } from '@mui/material';

export const components = {
  div: ({
    className,
    children,
    ...rest
  }: React.HTMLProps<HTMLDivElement> & { className?: string }) => {
    if (className?.includes('warning')) {
      return <Alert severity="warning">{children}</Alert>;
    }

    if (className?.includes('info')) {
      return <Alert severity="info">{children}</Alert>;
    }

    if (className?.includes('danger')) {
      return <Alert severity="error">{children}</Alert>;
    }

    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  },
};
