import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
              <div>
              <h4 className="text-lg font-semibold mb-4"> <div className="  flex items-center justify-start ">
               <img src="../../logo/logo.png" alt="Logo" width={120} height={64} />
            </div></h4>
            <p className='text-[#00CAD7]'>Got questions? Call us 24/7!
</p>
<p>03 111 666 144 <br></br>
0317 1777015.
</p>
<p className='text-[#00CAD7]'>Contact info

</p>
<p>info@winstore.pk</p>
<br></br>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <FiFacebook size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FiTwitter size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FiInstagram size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FiLinkedin size={24} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#00CAD7]">Trending</h3>
              <p className="text-gray-300">
                Your one-stop shop for all electronic needs. Quality products at best prices.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#00CAD7]">Information</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Products</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#00CAD7]">Customers Care</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Electronics</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Clothing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Home & Kitchen</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Sports</a></li>
              </ul>
            </div>

            {/* Social Links */}
          <img src="../../footer/card.png" alt="Footer Image" className="md:col-span-4 w-50 mt-8" />
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 text-left text-gray-300">
          <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}