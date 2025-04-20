import Image from 'next/image';
import image from '../assests/aboutImage.png';

export default function About() {
  return (
    <section id="about" className=" text-white px-6 sm:px-10 md:px-16 lg:px-28 pt-12 sm:pt-16 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Left: Text Content */}
        <div className="md:w-1/2 text-base sm:text-lg leading-relaxed text-gray-300">
          <p className="mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <p className="mb-6">
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </p>

          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
            Contact Us
          </button>
        </div>

        {/* Right: Image */}
        <div className="md:w-1/2 w-full">
          <Image
            src={image}
            alt="Team holding championship banner"
            width={600}
            height={400}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
