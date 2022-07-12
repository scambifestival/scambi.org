export default function Card({ children, classes }) {
	return <div className={`rounded-2xl shadow-lg ${classes}`}>{children}</div>;
}
