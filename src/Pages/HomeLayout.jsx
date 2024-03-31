import { Outlet } from "react-router-dom";
import Header from "../features/home/Header";
import Footer from "../features/home/Footer";

function HomeLayout() {
  return (
    <div>
      <section className=" pb-10 ">
        <Header />
      </section>
      <section className="align-element pt-20 pb-6 ">
        <Outlet />
      </section>
      <section className="mt-20 pt-20  ">
        <Footer />
      </section>
    </div>
  );
}

export default HomeLayout;
