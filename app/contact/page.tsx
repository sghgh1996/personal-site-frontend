export const metadata = {
  title: "Contact | Your Name",
};

export default function ContactPage() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Contact</h1>
        <p>Email: your@email.com</p>
        <p>Twitter / Instagram / LinkedIn</p>
      </div>

      <form className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Name"
          className="w-full border px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2"
        />
        <textarea
          placeholder="Message"
          className="w-full border px-3 py-2 h-32"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2"
        >
          Send
        </button>
      </form>
    </section>
  );
}
