import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";
import { UserType, EmploymentStatus } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("business");
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>("employed");
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    try {
      await signUp(email, password, name, employmentStatus);
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="neumorphic p-8 space-y-6">
        <div className="text-center space-y-2">
          <img 
            src="/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png" 
            alt="Amatyma Brotherhood Circle" 
            className="mx-auto h-16 w-16"
          />
          <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
          <p className="text-muted-foreground text-sm">
            Join the Amatyma business platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>

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
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
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

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="userType" className="text-sm font-medium">
              Account Type
            </label>
            <Select
              value={userType}
              onValueChange={(value) => setUserType(value as UserType)}
            >
              <SelectTrigger className="bg-background border-amatyma-red/20">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Employment Status
            </label>
            <RadioGroup 
              defaultValue="employed" 
              value={employmentStatus}
              onValueChange={(value) => setEmploymentStatus(value as EmploymentStatus)}
              className="flex flex-col space-y-2 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employed" id="employed" />
                <Label htmlFor="employed">Employed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unemployed" id="unemployed" />
                <Label htmlFor="unemployed">Unemployed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="self-employed" id="self-employed" />
                <Label htmlFor="self-employed">Self-Employed</Label>
              </div>
            </RadioGroup>
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
            Register
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <a
            className="text-amatyma-red hover:underline"
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
