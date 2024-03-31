import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useTitleTab(homeTabTitle) {
  const { pathname } = useLocation();
  const parts = pathname.split("/"); // Split the string by "/"
  const route = parts[1];
  //to capitalized the first letter
  const capitalizedPath = route.charAt(0).toUpperCase() + route.slice(1);

  useEffect(
    function () {
      document.title = `${homeTabTitle} | ${capitalizedPath}`;

      return function () {
        document.title = `${homeTabTitle}`;
      };
    },
    [capitalizedPath, homeTabTitle]
  );
}

export default useTitleTab;
