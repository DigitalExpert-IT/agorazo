import React, { ReactNode } from "react";

interface WithRoleProps {
  allowedRoles: string[];
  userRole: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export const WithRole: React.FC<WithRoleProps> = ({
  allowedRoles,
  userRole,
  children,
  fallback = null,
}) => {
  return allowedRoles.includes(userRole) ? <>{children}</> : <>{fallback}</>;
};
