import Auth from "../components/auth";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-[360px] shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Welcome to CommUnity App</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Auth />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
