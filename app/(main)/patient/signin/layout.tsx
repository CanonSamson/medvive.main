import AuthLayout from "@/layouts/AuthLayout";
import { ReactNode } from "react";

export const metadata = {
  title: "Medvive | patient sign in",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthLayout mode="signin">{children}</AuthLayout>;
}
