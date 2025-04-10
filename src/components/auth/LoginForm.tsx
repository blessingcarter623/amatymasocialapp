
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="neumorphic p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <a className="text-xs text-amatyma-red hover:underline" href="#">
                Forgot Password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-amatyma-red hover:bg-amatyma-red/80"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}
            Sign In
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <a
            className="text-amatyma-red hover:underline"
            href="/register"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Register
          </a>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>Demo credentials: demo@amatyma.com / password</p>
      </div>
    </div>
  );
}
