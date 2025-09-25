import * as React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // đã có sẵn trong project bạn

type FormState = {
    email: string;
    password: string;
    loading: boolean;
    error?: string;
};

export default function LoginPage() {
    const [form, setForm] = React.useState<FormState>({
        email: "",
        password: "",
        loading: false,
    });

    function onChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setForm((s) => ({ ...s, [e.target.name]: e.target.value, error: undefined }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.email || !form.password) {
            setForm((s) => ({ ...s, error: "Please enter email and password." }));
            return;
        }
        try {
            setForm((s) => ({ ...s, loading: true, error: undefined }));
            // TODO: gọi API login thật ở đây
            await new Promise((r) => setTimeout(r, 900));
            alert(`Logged in as ${form.email}`);
        } catch (err) {
            setForm((s) => ({ ...s, error: "Login failed. Try again." }));
        } finally {
            setForm((s) => ({ ...s, loading: false }));
        }
    }

    return (
        <div className="min-h-screen bg-black text-neutral-100 grid place-items-center">
            <Card>
                <div className="mb-6">
                    <h1 className="text-lg font-semibold">Login to your account</h1>
                    <p className="text-sm text-neutral-400 mt-1">
                        Enter your email below to login to your account
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="me@example.com"
                            value={form.email}
                            onChange={onChange}
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="text-xs text-neutral-400 hover:text-neutral-200">
                                Forgot your password?
                            </a>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChange}
                            autoComplete="current-password"
                        />
                    </div>

                    {form.error && (
                        <p className="text-sm text-red-400">{form.error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={form.loading}
                        className="w-full"
                    >
                        {form.loading ? "Logging in..." : "Login"}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-white text-black border border-neutral-700
                        hover:bg-black hover:text-neutral-300
                        focus:outline-none focus:ring-2 focus:ring-neutral-600
                        font-medium"
                    >
                        Login with Google
                    </Button>


                </form>

                <div className="mt-4 text-center text-sm text-neutral-400">
                    Don’t have an account?{" "}
                    <a href="#" className="underline">
                        Sign up
                    </a>
                </div>
            </Card>
        </div>
    );
}
