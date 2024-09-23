import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { CartProvider } from "../../cartContext";
import { GlobalStateProvider, useGlobalState } from "../../GlobalStateContext";


export const metadata = {
  title: "Tape Wears👕 ",
  description: "Tape Wears Website👕 ",
};

const RootLayout = ({ children }) => {
  // const { globalState, setGlobalState } = useGlobalState();
  return (
    <html lang="en">
      <GlobalStateProvider>
        <CartProvider>
          <body >
            <Navbar />
            {children}
            <Footer />
          </body>
        </CartProvider>
      </GlobalStateProvider>
    </html>
  );
}


export default RootLayout;