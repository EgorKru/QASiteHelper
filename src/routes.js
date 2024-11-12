// routes.js
import * as Components from './components';
import AboutPage from './components/Pages/aboutPage/AboutPage';
import LiveCodingTrainersPage from './components/InternalContentBlocks/LiveCodingTrainersPage';
import CompilerPage from './components/compilator/CompilerPage';

export const routes = [
    { path: "/", element: <Components.HomePage /> },
    { path: "/login", element: <Components.LoginPage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/guides", element: <Components.GuidesPage /> },
    { path: "/trainers", element: <Components.TrainersPage /> },
    { path: "/tests", element: <Components.TestsPage /> },
    { path: "/courses", element: <Components.CoursesPage /> },
    { path: "/consultation", element: <Components.ConsultationPage /> },
    { path: "/events", element: <Components.EventsPage /> },
    { path: "/forum", element: <Components.ForumPage /> },
    { path: "/reviews", element: <Components.ReviewsPage /> },
    { path: "*", element: <div>Ничего не найдено</div> },
    { path: "/livecoding", element: <LiveCodingTrainersPage /> },
    { path: "/compiler", element: <CompilerPage /> },
];
