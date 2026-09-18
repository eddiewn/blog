import { sendMail } from "../../api/api";
import { useState } from "react";
const Contact = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    return (
        <>
            <main className="w-4/5 m-auto">
                <div className="flex flex-col lg:flex-row justify-around lg:gap-0 gap-10 min-h-screen ">
                    <form
                        className="w-full max-w-xl p-6 md:p-8 rounded-xl"
                        onSubmit={async(e) => {
                            e.preventDefault();
                            await sendMail({ name, email, message });
                        }}
                    >
                        <h2 className="text-2xl font-bold  mb-6">
                            Get in touch with us
                        </h2>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-400 mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                maxLength={50}
                                placeholder="Your name"
                                className="w-full border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-400 mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold text-gray-400 mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                maxLength={500}
                                placeholder="Write your message..."
                                className="w-full border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-blue-500 transition-colors resize-none"
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                        >
                            Send Message
                        </button>
                    </form>
                    <div className="lg:w-1/3 md:w-full flex flex-col-reverse lg:flex-col justify-center gap-15 lg:gap-10">
                        <div className="h-1/2">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21440.283794178118!2d12.993046985196749!3d55.60841415159667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ssv!2sse!4v1789325070253!5m2!1ssv!2sse"
                                width="100%"
                                height="100%"
                                loading="lazy"
                            ></iframe>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold">Where it all happens</h3>
                            <p className="lg:w-3/5">
                                This is where I write all my posts, right here
                                in Malmö, Sweden. It's where I spend my time
                                learning, building, and sharing what I discover
                                along the way.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Contact;
