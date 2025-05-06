import Image from 'next/image';
import image from '../assests/aboutImage.png';

export default function About() {
  return (
    <section
      id="about"
      className="text-white px-6 sm:px-10 md:px-16 lg:px-28 pt-12 sm:pt-16 w-full h-screen flex justify-center items-center overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-7xl mx-auto">
        {/* Left: Text Content */}
        <div className="md:w-1/2 text-base sm:text-lg leading-relaxed text-gray-300">
          <p className="mb-6">
          Alpha Gaming Regiment (AGR) is a dedicated and forward-thinking esports organization committed to creating opportunities for emerging, skilled, and hardworking individuals to excel. We believe in cultivating raw talent and providing a platform for players to enhance their abilities and achieve new milestones in competitive gaming. We proudly host online tournaments, delivering dynamic, high-stakes events where players can demonstrate their expertise. As part of our long-term vision, AGR is also actively working towards organizing LAN events, aiming to unite players and fans through memorable in-person experiences. Furthermore, we are committed to fostering a strong, vibrant esports community poised for sustained growth and success.          </p>
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
