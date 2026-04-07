import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, ShoppingBag, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const highlights = [
  { icon: ShieldCheck, title: "Trusted checkout", text: "Secure your orders and keep delivery details ready for faster purchases." },
  { icon: Zap, title: "Faster shopping", text: "Track your favorite mobiles, revisit your cart, and move through checkout quickly." },
  { icon: ShoppingBag, title: "Exclusive offers", text: "See member-only deals and seasonal drops from top mobile brands." },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (field: "email" | "password", value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      toast.error("Please enter both email and password");
      return;
    }

    const result = login(form.email, form.password);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    const nextPath = location.state?.from?.pathname ?? "/";
    navigate(nextPath, { replace: true });
  };

  if (isAuthenticated && user) return null;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[radial-gradient(circle_at_top_left,_hsla(38,92%,50%,0.18),_transparent_32%),linear-gradient(180deg,_hsl(var(--background))_0%,_hsl(220_25%_94%)_100%)]">
      <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <section className="rounded-3xl bg-foreground p-8 text-primary-foreground shadow-xl lg:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-primary/15 p-3">
              <Smartphone className="text-primary" size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Member Access</p>
              <h1 className="text-3xl font-bold lg:text-4xl">Log in to your MobiMart account</h1>
            </div>
          </div>

          <p className="max-w-xl text-base leading-7 text-primary-foreground/72">
            Sign in to continue shopping, save your delivery details, and keep an eye on the latest phone deals in one place.
          </p>

          <div className="mt-10 grid gap-4">
            {highlights.map(item => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4">
                <div className="mt-1 rounded-xl bg-primary/15 p-2">
                  <item.icon className="text-primary" size={18} />
                </div>
                <div>
                  <h2 className="font-semibold text-primary-foreground">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-primary-foreground/68">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center">
          <Card className="w-full rounded-3xl border-white/60 bg-white/90 shadow-xl backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>Use your registered email and password to continue.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => handleChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => handleChange("password", e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full text-base font-semibold">
                  Log In
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                New here?{" "}
                <Link to="/register" className="font-semibold text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Login;
