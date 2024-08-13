import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section id="hero" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Form building simplified</h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Build forms with shadcn/ui, react-hook-form and zod. Create forms with ease and confidence.
                            </p>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    href="/docs"
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="/demo"
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    Demo
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Frontend Form Building</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Acme Inc provides a comprehensive suite of tools and services to help you build, deploy, and scale your digital
                                    projects with ease.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Type safety</h3>
                                <p className="text-sm text-muted-foreground">Build forms with confidence using TypeScript and zod for type safety.</p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Adaptive component rendering</h3>
                                <p className="text-sm text-muted-foreground">Render form components based on the schema definition and user input.</p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Customization</h3>
                                <p className="text-sm text-muted-foreground">
                                    Customize form components with Tailwind CSS and props to suit your design requirements.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Maximized efficiency</h3>
                                <p className="text-sm text-muted-foreground">Build forms with ease and confidence using zod and react-hook-form.</p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Modern looking</h3>
                                <p className="text-sm text-muted-foreground">
                                    Create modern looking forms that are easy to use and understand, with shadcn/ui.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <h3 className="text-lg font-bold">Plug and Play</h3>
                                <p className="text-sm text-muted-foreground">
                                    Easily integrate form components into your project with minimal setup and configuration.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
