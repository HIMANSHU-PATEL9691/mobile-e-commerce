import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, CreditCard, Gift, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const perks = [
  "Track orders and checkout faster",
  "Save delivery details for repeat purchases",
  "Access flash deals and latest arrivals first",
];

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(form).some(value => !value.trim())) {
      toast.error("Please complete all fields");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    navigate("/", { replace: true });
  };

  if (isAuthenticated && user) return null;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[linear-gradient(135deg,_hsla(38,92%,50%,0.15),_transparent_35%),radial-gradient(circle_at_top_right,_hsla(220,20%,10%,0.08),_transparent_30%),hsl(var(--background))]">
      <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
        <section className="flex items-center">
          <Card className="w-full rounded-3xl border-white/60 bg-white/90 shadow-xl backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle>Create your account</CardTitle>
              <CardDescription>Join MobiMart to shop, save details, and unlock quicker checkout.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={e => handleChange("name", e.target.value)}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email Address</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => handleChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => handleChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={form.password}
                      onChange={e => handleChange("password", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Repeat password"
                      value={form.confirmPassword}
                      onChange={e => handleChange("confirmPassword", e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full text-base font-semibold">
                  Sign Up
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl bg-foreground p-8 text-primary-foreground shadow-xl lg:p-10">
          <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <UserPlus size={16} />
            New Shopper Benefits
          </div>

          <h1 className="mt-6 text-3xl font-bold leading-tight lg:text-4xl">
            Sign up once and keep every phone purchase smoother.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-primary-foreground/72">
            Build your account to save time at checkout, follow your orders, and stay ready for the next upgrade.
          </p>

          <div className="mt-10 grid gap-4">
            {perks.map(perk => (
              <div key={perk} className="flex items-center gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-4">
                <CheckCircle2 className="text-primary" size={18} />
                <span className="text-sm font-medium text-primary-foreground">{perk}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <Gift className="text-primary" size={22} />
              <h2 className="mt-4 font-semibold">Deal alerts</h2>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/68">
                Keep up with fresh arrivals and store-wide promotions.
              </p>
            </div>

            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <CreditCard className="text-primary" size={22} />
              <h2 className="mt-4 font-semibold">Quick checkout</h2>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/68">
                Reuse your saved account details and finish orders faster.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
