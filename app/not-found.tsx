import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl text-navy-200">404</p>
      <h1 className="heading-md mt-4">This page has moved on.</h1>
      <p className="body-lg mt-3 max-w-md">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been
        relocated.
      </p>
      <Link href="/" className="btn-dark mt-8 inline-flex">
        Back to Home
      </Link>
    </section>
  );
}
