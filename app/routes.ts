import { type RouteConfig, layout, route, index } from "@react-router/dev/routes";

export default [
  layout('./routes/admin/admin-layout.tsx', [
    index('./routes/admin/dashboard.tsx'),             // /admin
    route('all-users', './routes/admin/all-users.tsx') // /admin/all-users
  ]),
  route('sign-in', './routes/root/sign-in.tsx'),       // /sign-in
] satisfies RouteConfig;
