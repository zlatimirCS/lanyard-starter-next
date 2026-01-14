export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>Main Header</header>
      <main>{children}</main>
      <footer>Main Footer</footer>
    </>
  );
}
