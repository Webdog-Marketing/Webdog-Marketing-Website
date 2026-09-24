import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1 className="page-hero__title">This page has gone walkies</h1>
        <p className="page-hero__lede">The link may be old or mistyped.</p>
        <Link href="/" className="btn btn--fluro">Back to the homepage</Link>
      </div>
    </section>
  );
}
