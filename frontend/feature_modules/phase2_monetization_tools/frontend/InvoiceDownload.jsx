// Invoice download UI
export default function InvoiceDownload({ user }) {
  return <button onClick={() => alert(`Invoice downloaded for ${user}`)}>Download Invoice</button>;
}