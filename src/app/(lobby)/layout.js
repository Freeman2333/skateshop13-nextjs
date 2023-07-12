import SiteHeader from "@/components/layouts/site-header";

export default function Layout({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
