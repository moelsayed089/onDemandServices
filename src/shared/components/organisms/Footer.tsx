import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#0A2E65] text-white px-6 py-10 grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-lg font-semibold mb-2">Stay Connected</p>
            <ul className="flex gap-4 text-gray-300">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p className="text-xl font-bold">Deliverco</p>
            <p>Your go-to platform for on Demand Service!</p>
            <p className="text-gray-400 text-sm">© 2025 Deliverco</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 text-sm">
          {/* Help Center */}
          <div>
            <p className="text-lg font-semibold mb-2">Help Center</p>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/support">Support team</Link>
              </li>
              <li>
                <Link to="/how-it-works">How it works</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-lg font-semibold mb-2">About</p>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/media-kit">Media Kit</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <p className="text-lg font-semibold mb-2">Follow Us</p>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/faq">Facebook</Link>
              </li>
              <li>
                <Link to="/support">Twitter</Link>
              </li>
              <li>
                <Link to="/how-it-works">Instagram</Link>
              </li>
              <li>
                <Link to="/contact">LinkedIn</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
