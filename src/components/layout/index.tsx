
import { Header } from "./navbar";
export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <footer></footer>
    </>
  );
};
