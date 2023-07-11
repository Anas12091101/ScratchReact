import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>

          {!token && (
            <li>
              <NavLink
                to="auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login/Register
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                to="subscribe"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Subscribe
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
