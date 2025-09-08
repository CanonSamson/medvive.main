import AuthLayout from "@/layouts/AuthLayout";

export const metadata = {
  title: "Medvive | patient sign up",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout mode="signup">{children}</AuthLayout>;
}
