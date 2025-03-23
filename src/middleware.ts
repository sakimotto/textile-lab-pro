import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/samples/:path*",
    "/tests/:path*",
    "/clients/:path*",
    "/equipment/:path*",
  ],
};
