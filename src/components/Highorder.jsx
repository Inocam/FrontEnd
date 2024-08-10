import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as ReactRouterRoutes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";

// Lazy-loaded components
const SignIn = lazy(() => import("../pages/login/signin/SignIn"));
const SignUp = lazy(() => import("../pages/login/signup/SignUp"));
const ServicePage = lazy(() =>
  import("../pages/onboarding/service/ServicePage")
);
const NameDecision = lazy(() =>
  import("../pages/onboarding/nickname/NameDecision")
);
const MyPlantPage = lazy(() => import("../pages/mypage/MyPlantPage"));
const MyComponent = lazy(() => import("../pages/mypage/MyComponent"));
const PlantRegistrationPage = lazy(() =>
  import("../pages/mypage/registration/PlantRegistrationPage")
);
const CommunityPage = lazy(() => import("../pages/community/CommunityPage"));
const CommunityWritePage = lazy(() =>
  import("../pages/community/write/CommunityWritePage")
);
const MyProfile = lazy(() => import("../pages/myprofile/MyProfilepage"));
const MainPage = lazy(() => import("../pages/mainpage/MainPage"));
const BoardTest = lazy(() =>
  import("../pages/boardtest/boardtestpage/BoardTest")
);
const BoardResult = lazy(() =>
  import("../pages/boardtest/boardresultpage/BoardResult")
);
const SplashGuidePage = lazy(() =>
  import("../pages/onboarding/guide/SplashGuidePage")
);

// Authentication HOC
const withAuth = (WrappedComponent) => {
  return (props) => {
    const refreshToken = Cookies.get("RefreshToken");
    const location = useLocation();

    if (!refreshToken) {
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

// RouterInfo object
const RouterInfo = [
  { path: "/signin", element: SignIn, requiresAuth: false },
  { path: "/", element: SplashGuidePage, requiresAuth: false },
  { path: "/signup", element: SignUp, requiresAuth: false },
  { path: "/myplant", element: withAuth(MyPlantPage), requiresAuth: true },
  { path: "/myprofile", element: withAuth(MyProfile), requiresAuth: true },
  {
    path: "/plants",
    element: withAuth(PlantRegistrationPage),
    requiresAuth: true,
  },
  { path: "/mainpage", element: withAuth(MainPage), requiresAuth: true },
  { path: "/service", element: withAuth(ServicePage), requiresAuth: true },
  { path: "/users", element: withAuth(NameDecision), requiresAuth: true },
  { path: "/mycomponent", element: withAuth(MyComponent), requiresAuth: true },
  { path: "/community", element: withAuth(CommunityPage), requiresAuth: true },
  {
    path: "/communitywrite",
    element: withAuth(CommunityWritePage),
    requiresAuth: true,
  },
  { path: "/boardtest", element: withAuth(BoardTest), requiresAuth: true },
  { path: "/boardresult", element: withAuth(BoardResult), requiresAuth: true },
];

const RouteWrapper = ({ element: Element }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Element />
  </Suspense>
);

export const Routes = () => {
  return (
    <Router>
      <GlobalStyles />
      <ScrollToTop />
      <RouteChangeTracker />
      <ReactRouterRoutes>
        <Route element={<Layout />}>
          {RouterInfo.map(({ path, element: Element, requiresAuth }) => (
            <Route
              key={path}
              path={path}
              element={<RouteWrapper element={Element} />}
            />
          ))}
          <Route path="*" element={<Navigate replace to="/signin" />} />
        </Route>
      </ReactRouterRoutes>
    </Router>
  );
};
